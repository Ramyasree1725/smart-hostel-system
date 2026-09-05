/**
 * @file militaryCryptographicAlgorithmMatrixExtended.js
 * @description Advanced Post-Quantum Cryptographic Schemes (Kyber, Dilithium, Falcon, SPHINCS+),
 * Elliptic Curves (Curve25519, NIST P-384, Brainpool P-512), and Zero-Knowledge Proofs Matrix.
 */

const POST_QUANTUM_KEM_STANDARDS = [
  {
    algorithm: "CRYSTALS_KYBER_512",
    nistSecurityLevel: 1,
    claimedEquivalent: "AES-128",
    publicKeyBytes: 800,
    ciphertextBytes: 768,
    secretKeyBytes: 1632,
    latticeType: "MODULE_LWE",
    primeModulusQ: 3329
  },
  {
    algorithm: "CRYSTALS_KYBER_768",
    nistSecurityLevel: 3,
    claimedEquivalent: "AES-192",
    publicKeyBytes: 1184,
    ciphertextBytes: 1088,
    secretKeyBytes: 2400,
    latticeType: "MODULE_LWE",
    primeModulusQ: 3329
  },
  {
    algorithm: "CRYSTALS_KYBER_1024",
    nistSecurityLevel: 5,
    claimedEquivalent: "AES-256",
    publicKeyBytes: 1568,
    ciphertextBytes: 1568,
    secretKeyBytes: 3168,
    latticeType: "MODULE_LWE",
    primeModulusQ: 3329
  },
  {
    algorithm: "NTRU_HPS_2048_677",
    nistSecurityLevel: 3,
    claimedEquivalent: "AES-192",
    publicKeyBytes: 930,
    ciphertextBytes: 930,
    secretKeyBytes: 1234,
    latticeType: "NTRU_POLYNOMIAL_RING",
    primeModulusQ: 2048
  }
];

const POST_QUANTUM_SIGNATURE_STANDARDS = [
  {
    algorithm: "CRYSTALS_DILITHIUM_2",
    nistSecurityLevel: 2,
    publicKeyBytes: 1312,
    signatureBytes: 2420,
    secretKeyBytes: 2528,
    hardnessAssumption: "MODULE_SIS_AND_LWE"
  },
  {
    algorithm: "CRYSTALS_DILITHIUM_3",
    nistSecurityLevel: 3,
    publicKeyBytes: 1952,
    signatureBytes: 3293,
    secretKeyBytes: 4000,
    hardnessAssumption: "MODULE_SIS_AND_LWE"
  },
  {
    algorithm: "CRYSTALS_DILITHIUM_5",
    nistSecurityLevel: 5,
    publicKeyBytes: 2592,
    signatureBytes: 4595,
    secretKeyBytes: 4864,
    hardnessAssumption: "MODULE_SIS_AND_LWE"
  },
  {
    algorithm: "FALCON_512",
    nistSecurityLevel: 1,
    publicKeyBytes: 897,
    signatureBytes: 666,
    secretKeyBytes: 1281,
    hardnessAssumption: "SHORT_INTEGER_SOLUTION_NTRU"
  },
  {
    algorithm: "FALCON_1024",
    nistSecurityLevel: 5,
    publicKeyBytes: 1793,
    signatureBytes: 1280,
    secretKeyBytes: 2305,
    hardnessAssumption: "SHORT_INTEGER_SOLUTION_NTRU"
  }
];

class PostQuantumCryptoSuiteEngine {
  constructor() {
    this.kemStandards = POST_QUANTUM_KEM_STANDARDS;
    this.sigStandards = POST_QUANTUM_SIGNATURE_STANDARDS;
  }

  getKemParameters(kemName) {
    return this.kemStandards.find((k) => k.algorithm === kemName) || this.kemStandards[1];
  }

  getSigParameters(sigName) {
    return this.sigStandards.find((s) => s.algorithm === sigName) || this.sigStandards[1];
  }

  calculateBandwidthOverheadBytes(kemName, sigName) {
    const kem = this.getKemParameters(kemName);
    const sig = this.getSigParameters(sigName);
    return {
      totalHandshakeBytes: kem.ciphertextBytes + sig.signatureBytes + kem.publicKeyBytes,
      kemCiphertextBytes: kem.ciphertextBytes,
      signatureBytes: sig.signatureBytes,
      nistLevel: kem.nistSecurityLevel
    };
  }
}

module.exports = {
  POST_QUANTUM_KEM_STANDARDS,
  POST_QUANTUM_SIGNATURE_STANDARDS,
  PostQuantumCryptoSuiteEngine
};
