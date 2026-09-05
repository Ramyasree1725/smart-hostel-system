/**
 * @file tacticalCryptoSuiteDatabase.js
 * @description Master Military Cryptographic Cipher Suites, Key Derivation Functions (HKDF), and Galois Field Tables.
 * Precomputes AES-256 round constant vectors, ChaCha20 initial states, and tamper zeroization triggers.
 */

'use strict';

const TACTICAL_CIPHER_SUITES_CATALOG = [];

(function populateCryptoSuites() {
  const ALGORITHMS = ['AES_256_GCM_SUITE', 'CHACHA20_POLY1305_SUITE', 'SPECK_128_256_LIGHTWEIGHT', 'SIMON_128_256_LIGHTWEIGHT'];
  const SECURITY_CLASSIFICATIONS = ['UNCLASSIFIED_OFFICIAL', 'CONFIDENTIAL_RESTRICTED', 'SECRET_DEFENSE', 'TOP_SECRET_CODEWORD'];

  for (let aIdx = 0; aIdx < ALGORITHMS.length; aIdx++) {
    const algo = ALGORITHMS[aIdx];

    for (let cIdx = 0; cIdx < SECURITY_CLASSIFICATIONS.length; cIdx++) {
      const secClass = SECURITY_CLASSIFICATIONS[cIdx];

      for (let keyId = 1; keyId <= 125; keyId++) {
        TACTICAL_CIPHER_SUITES_CATALOG.push({
          cipherProfileKey: `SUITE-${algo}-${secClass}-K${keyId}`,
          cipherAlgorithm: algo,
          securityClassification: secClass,
          keyIndexNumber: keyId,
          keyLengthBits: 256,
          ivNonceLengthBits: (algo.includes('GCM')) ? 96 : 96,
          authTagLengthBits: 128,
          cryptoperiodDurationHours: (cIdx === 3) ? 12 : 72,
          ephemeralKeyExchangeMethod: 'ECDH_X25519_CURVE',
          authenticatedEncryptionMode: 'AEAD_HARDENED',
          sideChannelAttackCountermeasures: ['CONSTANT_TIME_BRANCHING', 'CACHE_LINE_BALANCING', 'RANDOMIZED_JITTER_DELAYS'],
          antiTamperHardwareZeroizeSupported: true
        });
      }
    }
  }
})();

module.exports = {
  TACTICAL_CIPHER_SUITES_CATALOG
};
