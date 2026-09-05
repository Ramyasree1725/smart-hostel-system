/**
 * @file stanagTacticalProtocolMasterLedger.js
 * @description STANAG 4586 and Link 16 J-Series Comprehensive Military Field Packet Ledger
 */

const LINK16_PACKET_FIELD_MASTER = [
  {
    fieldId: 1,
    jCode: "J0.0",
    name: "INITIAL_ENTRY_NET_SYNC",
    category: "NETWORK_MANAGEMENT",
    bitOffset: 0,
    bitLength: 16,
    dataType: "BITFIELD_HEX",
    scaleMultiplier: 1.0,
    unit: "HEX_MASK",
    minRange: 0x0000,
    maxRange: 0xFFFF,
    priority: 1,
    encryptionRequired: true,
    crcProtection: "CRC_16_CCITT",
    description: "Frame synchronization header for Link 16 TDMA time slot alignment"
  },
  {
    fieldId: 2,
    jCode: "J0.0",
    name: "NETWORK_IDENTIFIER_NET_ID",
    category: "NETWORK_MANAGEMENT",
    bitOffset: 16,
    bitLength: 8,
    dataType: "UNSIGNED_INTEGER",
    scaleMultiplier: 1.0,
    unit: "NET_ID",
    minRange: 1,
    maxRange: 127,
    priority: 1,
    encryptionRequired: true,
    crcProtection: "CRC_16_CCITT",
    description: "Unique tactical combat net identifier"
  },
  {
    fieldId: 3,
    jCode: "J0.0",
    name: "TIME_SLOT_SEQUENCE_INDEX",
    category: "NETWORK_MANAGEMENT",
    bitOffset: 24,
    bitLength: 16,
    dataType: "UNSIGNED_INTEGER",
    scaleMultiplier: 1.0,
    unit: "SLOT_INDEX",
    minRange: 0,
    maxRange: 65535,
    priority: 1,
    encryptionRequired: true,
    crcProtection: "CRC_16_CCITT",
    description: "Discrete time slot index within recurring 12-second Link 16 epoch"
  },
  {
    fieldId: 4,
    jCode: "J0.1",
    name: "ROUND_TRIP_TIMING_ORIGINATOR",
    category: "TIME_SYNCHRONIZATION",
    bitOffset: 0,
    bitLength: 19,
    dataType: "OCTAL_JU_TRACK",
    scaleMultiplier: 1.0,
    unit: "TRACK_ID",
    minRange: 0,
    maxRange: 524287,
    priority: 1,
    encryptionRequired: true,
    crcProtection: "CRC_16_CCITT",
    description: "5-digit octal identifier of transmitting Link 16 participant"
  },
  {
    fieldId: 5,
    jCode: "J0.1",
    name: "ROUND_TRIP_TIMING_RESPONDER",
    category: "TIME_SYNCHRONIZATION",
    bitOffset: 19,
    bitLength: 19,
    dataType: "OCTAL_JU_TRACK",
    scaleMultiplier: 1.0,
    unit: "TRACK_ID",
    minRange: 0,
    maxRange: 524287,
    priority: 1,
    encryptionRequired: true,
    crcProtection: "CRC_16_CCITT",
    description: "5-digit octal identifier of transponding Link 16 participant"
  },
  {
    fieldId: 6,
    jCode: "J0.1",
    name: "PROPAGATION_DELAY_FRACTIONAL_NS",
    category: "TIME_SYNCHRONIZATION",
    bitOffset: 38,
    bitLength: 24,
    dataType: "SCALED_FLOAT",
    scaleMultiplier: 0.1,
    unit: "NANOSECONDS",
    minRange: 0.0,
    maxRange: 1677721.5,
    priority: 1,
    encryptionRequired: true,
    crcProtection: "CRC_16_CCITT",
    description: "High-precision RF propagation time-of-flight measurement"
  },
  {
    fieldId: 7,
    jCode: "J2.2",
    name: "AIR_PPLI_TRACK_NUMBER",
    category: "PRECISE_PARTICIPANT_LOCATION",
    bitOffset: 0,
    bitLength: 19,
    dataType: "OCTAL_JU_TRACK",
    scaleMultiplier: 1.0,
    unit: "TRACK_ID",
    minRange: 0,
    maxRange: 524287,
    priority: 2,
    encryptionRequired: true,
    crcProtection: "CRC_16_CCITT",
    description: "Track number of friendly tactical airborne participant"
  },
  {
    fieldId: 8,
    jCode: "J2.2",
    name: "AIR_PPLI_WGS84_LATITUDE",
    category: "PRECISE_PARTICIPANT_LOCATION",
    bitOffset: 19,
    bitLength: 21,
    dataType: "SIGNED_SCALED_FLOAT",
    scaleMultiplier: 0.0000858,
    unit: "DEGREES",
    minRange: -90.0,
    maxRange: 90.0,
    priority: 2,
    encryptionRequired: true,
    crcProtection: "CRC_16_CCITT",
    description: "Quantized geodetic latitude coordinate of aircraft"
  },
  {
    fieldId: 9,
    jCode: "J2.2",
    name: "AIR_PPLI_WGS84_LONGITUDE",
    category: "PRECISE_PARTICIPANT_LOCATION",
    bitOffset: 40,
    bitLength: 22,
    dataType: "SIGNED_SCALED_FLOAT",
    scaleMultiplier: 0.0000858,
    unit: "DEGREES",
    minRange: -180.0,
    maxRange: 180.0,
    priority: 2,
    encryptionRequired: true,
    crcProtection: "CRC_16_CCITT",
    description: "Quantized geodetic longitude coordinate of aircraft"
  },
  {
    fieldId: 10,
    jCode: "J2.2",
    name: "AIR_PPLI_PRESSURE_ALTITUDE",
    category: "PRECISE_PARTICIPANT_LOCATION",
    bitOffset: 62,
    bitLength: 12,
    dataType: "UNSIGNED_INTEGER",
    scaleMultiplier: 25.0,
    unit: "FEET",
    minRange: 0,
    maxRange: 102375,
    priority: 2,
    encryptionRequired: true,
    crcProtection: "CRC_16_CCITT",
    description: "Barometric standard pressure altitude quantized to 25ft increments"
  }
];

class StanagMasterLedgerEngine {
  constructor() {
    this.fields = LINK16_PACKET_FIELD_MASTER;
  }

  getFieldById(id) {
    return this.fields.find((f) => f.fieldId === id) || this.fields[0];
  }
}

module.exports = {
  LINK16_PACKET_FIELD_MASTER,
  StanagMasterLedgerEngine
};
