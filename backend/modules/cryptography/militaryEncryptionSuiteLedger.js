/**
 * @file militaryEncryptionSuiteLedger.js
 * @description Master Type-1 / NSA Suite B / Post-Quantum Cryptographic Suite Parameters Ledger
 */

const MILITARY_ENCRYPTION_SUITE_DEFINITIONS = [
  {
    suiteIdentifier: "SUITE_TOP_SECRET_CNSA_001",
    displayName: "COMMERCIAL_NATIONAL_SECURITY_ALGORITHM_SUITE_TS",
    symmetricCipher: "AES_256_GCM_AUTHENTICATED",
    symmetricKeyBits: 256,
    initializationVectorBytes: 12,
    authenticationTagBits: 128,
    blockSizeBytes: 16,
    hashingAlgorithm: "SHA_384_SECURE_HASH",
    hashDigestBytes: 48,
    asymmetricCurve: "ECDH_NIST_CURVE_P_384",
    asymmetricKeyBits: 384,
    digitalSignatureAlgorithm: "ECDSA_WITH_SHA_384",
    postQuantumKemAlgorithm: "CRYSTALS_KYBER_1024",
    postQuantumSignatureAlgorithm: "CRYSTALS_DILITHIUM_5",
    quantumSecurityStrengthBits: 256,
    classicalSecurityStrengthBits: 256,
    rekeyIntervalPackets: 1000000,
    rekeyIntervalSeconds: 3600,
    antiReplaySlidingWindowSize: 2048,
    fipsCertificationLevel: "FIPS_140_3_LEVEL_4_HARDENED",
    sideChannelCountermeasures: "MASKING_AND_CONSTANT_TIME_EXECUTION",
    zeroizeOnTamperSupported: true
  },
  {
    suiteIdentifier: "SUITE_SECRET_CNSA_002",
    displayName: "COMMERCIAL_NATIONAL_SECURITY_ALGORITHM_SUITE_SECRET",
    symmetricCipher: "AES_256_CBC_HMAC_SHA256",
    symmetricKeyBits: 256,
    initializationVectorBytes: 16,
    authenticationTagBits: 256,
    blockSizeBytes: 16,
    hashingAlgorithm: "SHA_256_SECURE_HASH",
    hashDigestBytes: 32,
    asymmetricCurve: "ECDH_NIST_CURVE_P_256",
    asymmetricKeyBits: 256,
    digitalSignatureAlgorithm: "ECDSA_WITH_SHA_256",
    postQuantumKemAlgorithm: "CRYSTALS_KYBER_768",
    postQuantumSignatureAlgorithm: "CRYSTALS_DILITHIUM_3",
    quantumSecurityStrengthBits: 192,
    classicalSecurityStrengthBits: 128,
    rekeyIntervalPackets: 500000,
    rekeyIntervalSeconds: 7200,
    antiReplaySlidingWindowSize: 1024,
    fipsCertificationLevel: "FIPS_140_3_LEVEL_3",
    sideChannelCountermeasures: "CONSTANT_TIME_EXECUTION",
    zeroizeOnTamperSupported: true
  },
  {
    suiteIdentifier: "SUITE_TACTICAL_UHF_LOW_SWAP_003",
    displayName: "LIGHTWEIGHT_TACTICAL_CHACHA20_POLY1305_SUITE",
    symmetricCipher: "CHACHA20_POLY1305_AEAD",
    symmetricKeyBits: 256,
    initializationVectorBytes: 12,
    authenticationTagBits: 128,
    blockSizeBytes: 64,
    hashingAlgorithm: "BLAKE2B_256",
    hashDigestBytes: 32,
    asymmetricCurve: "X25519_MONTGOMERY",
    asymmetricKeyBits: 256,
    digitalSignatureAlgorithm: "ED25519_EDWARDS",
    postQuantumKemAlgorithm: "NTRU_HPS_2048_677",
    postQuantumSignatureAlgorithm: "FALCON_512",
    quantumSecurityStrengthBits: 128,
    classicalSecurityStrengthBits: 128,
    rekeyIntervalPackets: 250000,
    rekeyIntervalSeconds: 14400,
    antiReplaySlidingWindowSize: 512,
    fipsCertificationLevel: "FIPS_140_3_LEVEL_2_TACTICAL",
    sideChannelCountermeasures: "ARX_CONSTANT_TIME_PRIMITIVES",
    zeroizeOnTamperSupported: false
  }
];

class MilitaryEncryptionSuiteLedgerEngine {
  constructor() {
    this.suites = MILITARY_ENCRYPTION_SUITE_DEFINITIONS;
  }

  getSuiteById(id) {
    return this.suites.find((s) => s.suiteIdentifier === id) || this.suites[0];
  }
}

module.exports = {
  MILITARY_ENCRYPTION_SUITE_DEFINITIONS,
  MilitaryEncryptionSuiteLedgerEngine
};
