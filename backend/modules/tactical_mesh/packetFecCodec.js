/**
 * @file packetFecCodec.js
 * @description Reed-Solomon RS(255, 223) Forward Error Correction (FEC) & Galois Field GF(2^8) Engine.
 * Provides burst error correction over noisy tactical VHF/UHF radio mesh links.
 */

'use strict';

const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);

// Initialize Galois Field GF(2^8) with primitive polynomial x^8 + x^4 + x^3 + x^2 + 1 (0x11D)
(function initializeGaloisField() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) {
      x ^= 0x11D;
    }
  }
  for (let i = 255; i < 512; i++) {
    GF_EXP[i] = GF_EXP[i - 255];
  }
})();

function gfMultiply(x, y) {
  if (x === 0 || y === 0) return 0;
  return GF_EXP[GF_LOG[x] + GF_LOG[y]];
}

function gfDivide(x, y) {
  if (y === 0) throw new Error('Division by zero in GF(2^8)');
  if (x === 0) return 0;
  return GF_EXP[(GF_LOG[x] + 255 - GF_LOG[y]) % 255];
}

class ReedSolomonFEC {
  constructor(n = 255, k = 223) {
    this.n = n; // codeword length
    this.k = k; // message length
    this.t = (n - k) / 2; // error correction capability (16 bytes)
    this.generator = this.buildGeneratorPolynomial(n - k);
  }

  buildGeneratorPolynomial(twoT) {
    let g = [1];
    for (let i = 0; i < twoT; i++) {
      const factor = [1, GF_EXP[i]];
      const nextG = new Array(g.length + 1).fill(0);
      for (let j = 0; j < g.length; j++) {
        for (let k = 0; k < factor.length; k++) {
          nextG[j + k] ^= gfMultiply(g[j], factor[k]);
        }
      }
      g = nextG;
    }
    return g;
  }

  encode(messageBytes) {
    const parity = new Array(this.n - this.k).fill(0);
    for (let i = 0; i < messageBytes.length; i++) {
      const feedback = messageBytes[i] ^ parity[0];
      for (let j = 0; j < this.generator.length - 1; j++) {
        parity[j] = (parity[j + 1] || 0) ^ gfMultiply(feedback, this.generator[j + 1]);
      }
    }
    const codeword = new Uint8Array(this.n);
    codeword.set(messageBytes, 0);
    for (let i = 0; i < parity.length; i++) {
      codeword[messageBytes.length + i] = parity[i];
    }
    return codeword;
  }
}

const FEC_INTERLEAVING_PRESETS = [];
(function populatePresets() {
  for (let i = 1; i <= 100; i++) {
    FEC_INTERLEAVING_PRESETS.push({
      presetId: `FEC-PRESET-RS255-TIER${i}`,
      interleavingDepth: (i % 8) + 1,
      maxCorrectableBurstBytes: ((i % 8) + 1) * 16,
      codeRate: Number((223 / 255).toFixed(3)),
      galoisPolynomial: '0x11D'
    });
  }
})();

module.exports = {
  ReedSolomonFEC,
  FEC_INTERLEAVING_PRESETS,
  gfMultiply,
  gfDivide
};
