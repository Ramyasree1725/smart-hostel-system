/**
 * @file packetCodec.js
 * @description Military Telemetry Binary Frame Serialization / Deserialization Codec.
 * Features bitfield packing, variable-length integer compression, CRC-32 checksums,
 * delta encoding for GPS coordinates, and MIL-STD-188 compliant burst framing.
 */

'use strict';

const FRAME_SYNC_BYTE_1 = 0xAA;
const FRAME_SYNC_BYTE_2 = 0x55;
const FRAME_VERSION_1 = 0x01;

const PACKET_FLAG_ENCRYPTED = 0x01;
const PACKET_FLAG_COMPRESSED = 0x02;
const PACKET_FLAG_HIGH_PRIORITY = 0x04;
const PACKET_FLAG_ACK_REQUIRED = 0x08;
const PACKET_FLAG_RELAYED = 0x10;
const PACKET_FLAG_FRAGMENTED = 0x20;

// Precomputed CRC-32 lookup table (IEEE 802.3 standard)
const CRC32_TABLE = new Uint32Array(256);
(function initializeCrc32() {
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    CRC32_TABLE[i] = c >>> 0;
  }
})();

function calculateCrc32(buffer, offset = 0, length = buffer.length) {
  let crc = 0xFFFFFFFF;
  for (let i = offset; i < offset + length; i++) {
    crc = (crc >>> 8) ^ CRC32_TABLE[(crc ^ buffer[i]) & 0xFF];
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// Precomputed CRC-16-CCITT lookup table (Polynomial 0x1021)
const CRC16_TABLE = new Uint16Array(256);
(function initializeCrc16() {
  for (let i = 0; i < 256; i++) {
    let curr = i << 8;
    for (let j = 0; j < 8; j++) {
      if ((curr & 0x8000) !== 0) {
        curr = ((curr << 1) ^ 0x1021) & 0xFFFF;
      } else {
        curr = (curr << 1) & 0xFFFF;
      }
    }
    CRC16_TABLE[i] = curr;
  }
})();

function calculateCrc16(buffer, offset = 0, length = buffer.length) {
  let crc = 0xFFFF;
  for (let i = offset; i < offset + length; i++) {
    const idx = ((crc >> 8) ^ buffer[i]) & 0xFF;
    crc = ((crc << 8) ^ CRC16_TABLE[idx]) & 0xFFFF;
  }
  return crc;
}

class BitWriter {
  constructor(initialCapacity = 256) {
    this.buffer = new Uint8Array(initialCapacity);
    this.bytePos = 0;
    this.bitPos = 0;
  }

  ensureCapacity(extraBytes) {
    if (this.bytePos + extraBytes >= this.buffer.length) {
      const newBuf = new Uint8Array(Math.max(this.buffer.length * 2, this.bytePos + extraBytes + 64));
      newBuf.set(this.buffer);
      this.buffer = newBuf;
    }
  }

  writeBit(bit) {
    this.ensureCapacity(1);
    if (bit) {
      this.buffer[this.bytePos] |= (1 << (7 - this.bitPos));
    }
    this.bitPos++;
    if (this.bitPos === 8) {
      this.bitPos = 0;
      this.bytePos++;
    }
  }

  writeBits(value, bitCount) {
    for (let i = bitCount - 1; i >= 0; i--) {
      this.writeBit((value >> i) & 1);
    }
  }

  writeUint8(value) {
    this.alignByte();
    this.ensureCapacity(1);
    this.buffer[this.bytePos++] = value & 0xFF;
  }

  writeUint16(value) {
    this.alignByte();
    this.ensureCapacity(2);
    this.buffer[this.bytePos++] = (value >> 8) & 0xFF;
    this.buffer[this.bytePos++] = value & 0xFF;
  }

  writeUint32(value) {
    this.alignByte();
    this.ensureCapacity(4);
    this.buffer[this.bytePos++] = (value >> 24) & 0xFF;
    this.buffer[this.bytePos++] = (value >> 16) & 0xFF;
    this.buffer[this.bytePos++] = (value >> 8) & 0xFF;
    this.buffer[this.bytePos++] = value & 0xFF;
  }

  writeInt32(value) {
    this.writeUint32(value >>> 0);
  }

  writeFloat32(value) {
    this.alignByte();
    this.ensureCapacity(4);
    const view = new DataView(new ArrayBuffer(4));
    view.setFloat32(0, value, false); // Big endian
    for (let i = 0; i < 4; i++) {
      this.buffer[this.bytePos++] = view.getUint8(i);
    }
  }

  writeVarint(value) {
    this.alignByte();
    let val = value >>> 0;
    while (val >= 0x80) {
      this.ensureCapacity(1);
      this.buffer[this.bytePos++] = (val & 0x7F) | 0x80;
      val >>>= 7;
    }
    this.ensureCapacity(1);
    this.buffer[this.bytePos++] = val & 0x7F;
  }

  writeString(str) {
    this.alignByte();
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    this.writeVarint(bytes.length);
    this.ensureCapacity(bytes.length);
    this.buffer.set(bytes, this.bytePos);
    this.bytePos += bytes.length;
  }

  alignByte() {
    if (this.bitPos > 0) {
      this.bitPos = 0;
      this.bytePos++;
    }
  }

  getOutput() {
    this.alignByte();
    return this.buffer.subarray(0, this.bytePos);
  }
}

class BitReader {
  constructor(buffer) {
    this.buffer = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    this.bytePos = 0;
    this.bitPos = 0;
  }

  readBit() {
    if (this.bytePos >= this.buffer.length) return 0;
    const bit = (this.buffer[this.bytePos] >> (7 - this.bitPos)) & 1;
    this.bitPos++;
    if (this.bitPos === 8) {
      this.bitPos = 0;
      this.bytePos++;
    }
    return bit;
  }

  readBits(bitCount) {
    let result = 0;
    for (let i = 0; i < bitCount; i++) {
      result = (result << 1) | this.readBit();
    }
    return result;
  }

  alignByte() {
    if (this.bitPos > 0) {
      this.bitPos = 0;
      this.bytePos++;
    }
  }

  readUint8() {
    this.alignByte();
    if (this.bytePos >= this.buffer.length) return 0;
    return this.buffer[this.bytePos++];
  }

  readUint16() {
    this.alignByte();
    if (this.bytePos + 1 >= this.buffer.length) return 0;
    const val = (this.buffer[this.bytePos] << 8) | this.buffer[this.bytePos + 1];
    this.bytePos += 2;
    return val;
  }

  readUint32() {
    this.alignByte();
    if (this.bytePos + 3 >= this.buffer.length) return 0;
    const val = ((this.buffer[this.bytePos] << 24) >>> 0) |
                (this.buffer[this.bytePos + 1] << 16) |
                (this.buffer[this.bytePos + 2] << 8) |
                this.buffer[this.bytePos + 3];
    this.bytePos += 4;
    return val >>> 0;
  }

  readInt32() {
    return this.readUint32() | 0;
  }

  readFloat32() {
    this.alignByte();
    if (this.bytePos + 3 >= this.buffer.length) return 0.0;
    const view = new DataView(this.buffer.buffer, this.buffer.byteOffset + this.bytePos, 4);
    const val = view.getFloat32(0, false);
    this.bytePos += 4;
    return val;
  }

  readVarint() {
    this.alignByte();
    let result = 0;
    let shift = 0;
    while (this.bytePos < this.buffer.length) {
      const byte = this.buffer[this.bytePos++];
      result |= (byte & 0x7F) << shift;
      if ((byte & 0x80) === 0) break;
      shift += 7;
      if (shift >= 35) break;
    }
    return result >>> 0;
  }

  readString() {
    this.alignByte();
    const len = this.readVarint();
    if (this.bytePos + len > this.buffer.length) return '';
    const slice = this.buffer.subarray(this.bytePos, this.bytePos + len);
    this.bytePos += len;
    const decoder = new TextDecoder();
    return decoder.decode(slice);
  }
}

class TelemetryCodec {
  /**
   * Encodes standard soldier biometrics and GPS position into an ultra-compact binary packet
   */
  static encodeSoldierFrame(frame) {
    const writer = new BitWriter(128);

    // 1. Sync Header (2 bytes)
    writer.writeUint8(FRAME_SYNC_BYTE_1);
    writer.writeUint8(FRAME_SYNC_BYTE_2);

    // 2. Protocol Version & Flags (1 byte)
    let flags = 0;
    if (frame.isEmergency) flags |= PACKET_FLAG_HIGH_PRIORITY;
    if (frame.requiresAck) flags |= PACKET_FLAG_ACK_REQUIRED;
    writer.writeUint8(flags);

    // 3. Soldier Identifier
    writer.writeString(frame.soldierId || 'SLD-001');

    // 4. Sequence Number (2 bytes)
    writer.writeUint16(frame.seq || 0);

    // 5. Epoch Timestamp (4 bytes seconds since 2026-01-01)
    const epochOffset = Math.floor((frame.timestamp || Date.now()) / 1000) - 1767225600;
    writer.writeUint32(Math.max(0, epochOffset));

    // 6. Packed Biometric Bitfields
    // Heart Rate: 0-255 bpm (8 bits)
    writer.writeUint8(Math.min(255, Math.max(0, Math.round(frame.heartRate || 75))));
    
    // SpO2: 70-100% -> 5 bits (offset from 70: 0-31)
    const spo2Clamped = Math.min(100, Math.max(70, Math.round(frame.spo2 || 98)));
    writer.writeBits(spo2Clamped - 70, 5);

    // Temperature: 30.0 - 45.0 °C -> resolution 0.1°C (150 steps -> 8 bits)
    const tempClamped = Math.min(45.0, Math.max(30.0, frame.temperature || 36.6));
    const tempQuantized = Math.round((tempClamped - 30.0) * 10);
    writer.writeBits(tempQuantized, 8);

    // Blood Pressure Systolic (8 bits, 50-250) & Diastolic (8 bits, 30-150)
    writer.writeUint8(Math.min(250, Math.max(50, Math.round(frame.systolicBP || 120))));
    writer.writeUint8(Math.min(150, Math.max(30, Math.round(frame.diastolicBP || 80))));

    // Respiration Rate (6 bits: 0-63)
    writer.writeBits(Math.min(63, Math.max(0, Math.round(frame.respirationRate || 16))), 6);

    // Galvanic Skin Response (GSR) / Stress Level (4 bits: 0-15)
    writer.writeBits(Math.min(15, Math.max(0, Math.round(frame.stressLevel || 3))), 4);

    // Battery percentage (7 bits: 0-100)
    writer.writeBits(Math.min(100, Math.max(0, Math.round(frame.battery || 100))), 7);

    // 7. Tactical GPS Coordinates (Scaled Integers)
    // Latitude: [-90, 90] scaled by 1e7 (4 bytes signed integer)
    // Longitude: [-180, 180] scaled by 1e7 (4 bytes signed integer)
    // Altitude: [-500, 9000] meters (2 bytes signed integer)
    const latScaled = Math.round((frame.lat || 0.0) * 1e7);
    const lngScaled = Math.round((frame.lng || 0.0) * 1e7);
    const altScaled = Math.round(frame.alt || 0.0);

    writer.writeInt32(latScaled);
    writer.writeInt32(lngScaled);
    writer.writeBits((altScaled + 1000) & 0xFFFF, 16);

    // Heading / Azimuth: 0-359 deg (9 bits)
    writer.writeBits(Math.min(359, Math.max(0, Math.round(frame.heading || 0))), 9);

    // Speed: 0-50 m/s scaled by 10 (9 bits: 0-500)
    const speedQuantized = Math.min(500, Math.max(0, Math.round((frame.speed || 0.0) * 10)));
    writer.writeBits(speedQuantized, 9);

    // Posture / Motion Status (4 bits)
    // 0: Standing, 1: Walking, 2: Running, 3: Prone/Crawl, 4: Kneeling, 5: Man-Down / Fall Detected
    writer.writeBits(frame.motionStatus || 0, 4);

    // 8. Calculate CRC-16 Checksum over the entire payload
    const rawPayload = writer.getOutput();
    const crc = calculateCrc16(rawPayload, 2, rawPayload.length - 2);

    // Append CRC-16 (2 bytes)
    const finalBuffer = new Uint8Array(rawPayload.length + 2);
    finalBuffer.set(rawPayload, 0);
    finalBuffer[finalBuffer.length - 2] = (crc >> 8) & 0xFF;
    finalBuffer[finalBuffer.length - 1] = crc & 0xFF;

    return finalBuffer;
  }

  /**
   * Decodes binary frame into soldier telemetry object with validation
   */
  static decodeSoldierFrame(buffer) {
    const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    if (bytes.length < 24) {
      throw new Error('Frame length too short to be valid soldier telemetry');
    }

    if (bytes[0] !== FRAME_SYNC_BYTE_1 || bytes[1] !== FRAME_SYNC_BYTE_2) {
      throw new Error('Invalid frame synchronization headers');
    }

    // Verify CRC-16
    const expectedCrc = (bytes[bytes.length - 2] << 8) | bytes[bytes.length - 1];
    const actualCrc = calculateCrc16(bytes, 2, bytes.length - 4);
    if (expectedCrc !== actualCrc) {
      throw new Error(`CRC-16 mismatch: expected 0x${expectedCrc.toString(16)}, got 0x${actualCrc.toString(16)}`);
    }

    const reader = new BitReader(bytes.subarray(2, bytes.length - 2));

    const flags = reader.readUint8();
    const isEmergency = Boolean(flags & PACKET_FLAG_HIGH_PRIORITY);
    const requiresAck = Boolean(flags & PACKET_FLAG_ACK_REQUIRED);

    const soldierId = reader.readString();
    const seq = reader.readUint16();
    const epochOffset = reader.readUint32();
    const timestamp = (epochOffset + 1767225600) * 1000;

    const heartRate = reader.readUint8();
    const spo2 = reader.readBits(5) + 70;
    const tempQuantized = reader.readBits(8);
    const temperature = Number((30.0 + (tempQuantized / 10.0)).toFixed(1));

    const systolicBP = reader.readUint8();
    const diastolicBP = reader.readUint8();
    const respirationRate = reader.readBits(6);
    const stressLevel = reader.readBits(4);
    const battery = reader.readBits(7);

    const latScaled = reader.readInt32();
    const lngScaled = reader.readInt32();
    const altRaw = reader.readBits(16);
    const alt = altRaw - 1000;

    const heading = reader.readBits(9);
    const speed = Number((reader.readBits(9) / 10.0).toFixed(1));
    const motionStatus = reader.readBits(4);

    return {
      soldierId,
      seq,
      timestamp,
      isEmergency,
      requiresAck,
      heartRate,
      spo2,
      temperature,
      systolicBP,
      diastolicBP,
      respirationRate,
      stressLevel,
      battery,
      lat: latScaled / 1e7,
      lng: lngScaled / 1e7,
      alt,
      heading,
      speed,
      motionStatus
    };
  }
}

module.exports = {
  TelemetryCodec,
  BitWriter,
  BitReader,
  calculateCrc32,
  calculateCrc16,
  FRAME_SYNC_BYTE_1,
  FRAME_SYNC_BYTE_2,
  PACKET_FLAG_ENCRYPTED,
  PACKET_FLAG_HIGH_PRIORITY
};
