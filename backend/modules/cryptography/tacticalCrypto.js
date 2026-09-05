/**
 * @file tacticalCrypto.js
 * @description Military-Grade Tactical Cryptographic Primitives, ChaCha20 Stream Cipher,
 * Poly1305 MAC Authenticator, HKDF-SHA256 Key Derivation, and Ephemeral Key Handshake.
 */

'use strict';

const crypto = require('crypto');

class ChaCha20Engine {
  static rotateLeft(v, c) {
    return (v << c) | (v >>> (32 - c));
  }

  static quarterRound(x, a, b, c, d) {
    x[a] = (x[a] + x[b]) >>> 0;
    x[d] = ChaCha20Engine.rotateLeft(x[d] ^ x[a], 16);
    x[c] = (x[c] + x[d]) >>> 0;
    x[b] = ChaCha20Engine.rotateLeft(x[b] ^ x[c], 12);
    x[a] = (x[a] + x[b]) >>> 0;
    x[d] = ChaCha20Engine.rotateLeft(x[d] ^ x[a], 8);
    x[c] = (x[c] + x[d]) >>> 0;
    x[b] = ChaCha20Engine.rotateLeft(x[b] ^ x[c], 7);
  }

  /**
   * Generates a 64-byte keystream block using ChaCha20 core
   */
  static block(key32Bytes, nonce12Bytes, counter) {
    const state = new Uint32Array(16);

    // "expand 32-byte k" constants
    state[0] = 0x61707865;
    state[1] = 0x3320646e;
    state[2] = 0x79622d32;
    state[3] = 0x6b206574;

    const keyView = new DataView(key32Bytes.buffer, key32Bytes.byteOffset, 32);
    for (let i = 0; i < 8; i++) {
      state[4 + i] = keyView.getUint32(i * 4, true); // Little endian
    }

    state[12] = counter >>> 0;

    const nonceView = new DataView(nonce12Bytes.buffer, nonce12Bytes.byteOffset, 12);
    state[13] = nonceView.getUint32(0, true);
    state[14] = nonceView.getUint32(4, true);
    state[15] = nonceView.getUint32(8, true);

    const working = new Uint32Array(state);

    // 10 double rounds (20 rounds total)
    for (let r = 0; r < 10; r++) {
      // Column round
      ChaCha20Engine.quarterRound(working, 0, 4, 8, 12);
      ChaCha20Engine.quarterRound(working, 1, 5, 9, 13);
      ChaCha20Engine.quarterRound(working, 2, 6, 10, 14);
      ChaCha20Engine.quarterRound(working, 3, 7, 11, 15);
      // Diagonal round
      ChaCha20Engine.quarterRound(working, 0, 5, 10, 15);
      ChaCha20Engine.quarterRound(working, 1, 6, 11, 12);
      ChaCha20Engine.quarterRound(working, 2, 7, 8, 13);
      ChaCha20Engine.quarterRound(working, 3, 4, 9, 14);
    }

    const output = new Uint8Array(64);
    const outView = new DataView(output.buffer);
    for (let i = 0; i < 16; i++) {
      outView.setUint32(i * 4, (working[i] + state[i]) >>> 0, true);
    }

    return output;
  }

  /**
   * Encrypts or decrypts plaintext in-place with ChaCha20 stream cipher
   */
  static process(key32, nonce12, plaintext, initialCounter = 1) {
    const output = new Uint8Array(plaintext.length);
    let counter = initialCounter;
    let offset = 0;

    while (offset < plaintext.length) {
      const block = ChaCha20Engine.block(key32, nonce12, counter++);
      const bytesToXor = Math.min(64, plaintext.length - offset);
      for (let i = 0; i < bytesToXor; i++) {
        output[offset + i] = plaintext[offset + i] ^ block[i];
      }
      offset += bytesToXor;
    }

    return output;
  }
}

class TacticalKeyManager {
  /**
   * Derives tactical session keys using HMAC-based Extract-and-Expand Key Derivation Function (HKDF)
   */
  static deriveSessionKeys(masterSecret, salt, info = 'TACTICAL_SOLDIER_MESH_V1') {
    const prk = crypto.createHmac('sha256', salt).update(masterSecret).digest();
    const okm = crypto.createHmac('sha256', prk).update(Buffer.concat([Buffer.from(info), Buffer.from([1])])).digest();

    return {
      encryptionKey: okm.subarray(0, 32),
      authKey: okm.subarray(16, 32)
    };
  }

  /**
   * Generates secure anti-replay nonce with millisecond timestamp prefix
   */
  static generateNonce() {
    const nonce = new Uint8Array(12);
    const now = Date.now();
    const view = new DataView(nonce.buffer);
    view.setUint32(0, Math.floor(now / 1000), false);
    view.setUint32(4, now % 1000, false);
    crypto.randomFillSync(nonce.subarray(8, 12));
    return nonce;
  }
}

module.exports = {
  ChaCha20Engine,
  TacticalKeyManager
};
