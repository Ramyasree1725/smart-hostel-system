/**
 * @file tacticalCryptoMatrixPhysical.js
 * @description Military Cryptographic Algorithms & S-Box Transformation Matrix
 */

const TACTICAL_CRYPTO_PHYSICAL_RECORDS = [
  {
    algorithmId: "CRYPTO_REC_00001",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1501,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00002",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1502,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00003",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1503,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00004",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1504,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00005",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1505,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00006",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1506,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00007",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1507,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00008",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1508,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00009",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1509,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00010",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1510,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00011",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1511,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00012",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1512,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00013",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1513,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00014",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1514,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00015",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1515,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00016",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1516,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00017",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1517,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00018",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1518,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00019",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1519,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00020",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1520,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00021",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1521,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00022",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1522,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00023",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1523,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00024",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1524,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00025",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1525,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00026",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1526,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00027",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1527,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00028",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1528,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00029",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1529,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00030",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1530,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00031",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1531,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00032",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1532,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00033",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1533,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00034",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1534,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00035",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1535,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00036",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1536,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00037",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1537,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00038",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1538,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00039",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1539,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00040",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1540,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00041",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1541,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00042",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1542,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00043",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1543,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00044",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1544,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00045",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1545,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00046",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1546,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00047",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1547,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00048",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1548,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00049",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1549,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00050",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1550,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00051",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1551,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00052",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1552,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00053",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1553,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00054",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1554,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00055",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1555,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00056",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1556,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00057",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1557,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00058",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1558,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00059",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1559,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00060",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1560,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00061",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1561,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00062",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1562,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00063",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1563,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00064",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1564,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00065",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1565,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00066",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1566,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00067",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1567,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00068",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1568,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00069",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1569,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00070",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1570,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00071",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1571,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00072",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1572,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00073",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1573,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00074",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1574,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00075",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1575,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00076",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1576,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00077",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1577,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00078",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1578,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00079",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1579,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00080",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1580,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00081",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1581,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00082",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1582,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00083",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1583,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00084",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1584,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00085",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1585,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00086",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1586,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00087",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1587,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00088",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1588,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00089",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1589,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00090",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1590,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00091",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1591,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00092",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1592,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00093",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1593,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00094",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1594,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00095",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1595,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00096",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1596,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00097",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1597,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00098",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1598,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00099",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1599,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00100",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1600,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00101",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1601,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00102",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1602,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00103",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1603,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00104",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1604,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00105",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1605,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00106",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1606,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00107",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1607,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00108",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1608,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00109",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1609,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00110",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1610,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00111",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1611,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00112",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1612,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00113",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1613,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00114",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1614,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00115",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1615,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00116",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1616,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00117",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1617,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00118",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1618,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00119",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1619,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00120",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1620,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00121",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1621,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00122",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1622,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00123",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1623,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00124",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1624,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00125",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1625,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00126",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1626,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00127",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1627,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00128",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1628,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00129",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1629,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00130",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1630,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00131",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1631,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00132",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1632,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00133",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1633,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00134",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1634,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00135",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1635,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00136",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1636,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00137",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1637,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00138",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1638,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00139",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1639,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00140",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1640,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00141",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1641,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00142",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1642,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00143",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1643,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00144",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1644,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00145",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1645,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00146",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1646,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00147",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1647,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00148",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1648,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00149",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1649,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00150",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1650,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00151",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1651,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00152",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1652,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00153",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1653,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00154",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1654,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00155",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1655,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00156",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1656,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00157",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1657,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00158",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1658,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00159",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1659,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00160",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1660,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00161",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1661,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00162",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1662,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00163",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1663,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00164",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1664,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00165",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1665,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00166",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1666,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00167",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1667,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00168",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1668,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00169",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1669,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00170",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1670,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00171",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1671,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00172",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1672,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00173",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1673,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00174",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1674,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00175",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1675,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00176",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1676,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00177",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1677,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00178",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1678,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00179",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1679,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00180",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1680,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00181",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1681,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00182",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1682,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00183",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1683,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00184",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1684,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00185",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1685,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00186",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1686,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00187",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1687,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00188",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1688,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00189",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1689,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00190",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1690,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00191",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1691,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00192",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1692,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00193",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1693,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00194",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1694,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00195",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1695,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00196",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1696,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00197",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1697,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00198",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1698,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00199",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1699,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00200",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1700,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00201",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1701,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00202",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1702,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00203",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1703,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00204",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1704,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00205",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1705,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00206",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1706,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00207",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1707,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00208",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1708,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00209",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1709,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00210",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1710,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00211",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1711,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00212",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1712,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00213",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1713,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00214",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1714,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00215",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1715,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00216",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1716,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00217",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1717,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00218",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1718,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00219",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1719,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00220",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1720,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00221",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1721,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00222",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1722,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00223",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1723,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00224",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1724,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00225",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1725,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00226",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1726,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00227",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1727,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00228",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1728,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00229",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1729,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00230",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1730,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00231",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1731,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00232",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1732,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00233",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1733,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00234",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1734,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00235",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1735,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00236",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1736,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00237",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1737,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00238",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1738,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00239",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1739,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00240",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1740,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00241",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1741,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00242",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1742,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00243",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1743,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00244",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1744,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00245",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1745,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00246",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1746,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00247",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1747,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00248",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1748,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00249",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1749,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00250",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1750,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00251",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1751,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00252",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1752,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00253",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1753,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00254",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1754,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00255",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1755,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00256",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1756,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00257",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1757,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00258",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1758,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00259",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1759,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00260",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1760,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00261",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1761,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00262",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1762,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00263",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1763,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00264",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1764,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00265",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1765,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00266",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1766,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00267",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1767,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00268",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1768,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00269",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1769,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00270",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1770,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00271",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1771,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00272",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1772,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00273",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1773,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00274",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1774,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00275",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1775,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00276",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1776,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00277",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1777,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00278",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1778,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00279",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1779,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00280",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1780,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00281",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1781,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00282",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1782,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00283",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1783,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00284",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1784,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00285",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1785,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00286",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1786,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00287",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1787,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00288",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1788,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00289",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1789,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00290",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1790,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00291",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1791,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00292",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1792,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00293",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1793,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00294",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1794,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00295",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1795,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00296",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1796,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00297",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1797,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00298",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1798,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00299",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1799,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00300",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1800,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00301",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1801,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00302",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1802,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00303",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1803,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00304",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1804,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00305",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1805,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00306",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1806,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00307",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1807,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00308",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1808,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00309",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1809,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00310",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1810,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00311",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1811,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00312",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1812,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00313",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1813,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00314",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1814,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00315",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1815,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00316",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1816,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00317",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1817,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00318",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1818,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00319",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1819,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00320",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1820,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00321",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1821,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00322",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1822,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00323",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1823,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00324",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1824,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00325",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1825,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00326",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1826,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00327",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1827,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00328",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1828,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00329",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1829,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00330",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1830,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00331",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1831,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00332",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1832,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00333",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1833,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00334",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1834,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00335",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1835,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00336",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1836,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00337",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1837,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00338",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1838,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00339",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1839,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00340",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1840,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00341",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1841,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00342",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1842,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00343",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1843,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00344",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1844,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00345",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1845,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00346",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1846,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00347",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1847,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00348",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1848,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00349",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1849,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00350",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1850,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00351",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1851,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00352",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1852,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00353",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1853,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00354",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1854,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00355",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1855,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00356",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1856,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00357",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1857,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00358",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1858,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00359",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1859,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00360",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1860,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00361",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1861,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00362",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1862,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00363",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1863,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00364",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1864,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00365",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1865,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00366",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1866,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00367",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1867,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00368",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1868,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00369",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1869,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00370",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1870,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00371",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1871,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00372",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1872,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00373",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1873,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00374",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1874,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00375",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1875,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00376",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1876,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00377",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1877,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00378",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1878,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00379",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1879,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00380",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1880,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00381",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1881,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00382",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1882,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00383",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1883,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00384",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1884,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00385",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1885,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00386",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1886,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00387",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1887,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00388",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1888,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00389",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1889,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00390",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1890,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00391",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1891,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00392",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1892,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00393",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1893,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00394",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1894,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00395",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1895,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00396",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1896,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00397",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1897,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00398",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1898,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00399",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1899,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00400",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1900,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00401",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1901,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00402",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1902,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00403",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1903,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00404",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1904,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00405",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1905,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00406",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1906,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00407",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1907,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00408",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1908,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00409",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1909,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00410",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1910,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00411",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1911,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00412",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1912,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00413",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1913,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00414",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1914,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00415",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1915,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00416",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1916,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00417",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1917,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00418",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1918,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00419",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1919,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00420",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1920,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00421",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1921,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00422",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1922,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00423",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1923,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00424",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1924,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00425",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1925,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00426",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1926,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00427",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1927,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00428",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1928,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00429",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1929,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00430",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1930,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00431",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1931,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00432",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1932,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00433",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1933,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00434",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1934,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00435",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1935,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00436",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1936,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00437",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1937,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00438",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1938,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00439",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1939,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00440",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1940,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00441",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1941,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00442",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1942,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00443",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1943,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00444",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1944,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00445",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1945,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00446",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1946,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00447",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1947,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00448",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1948,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00449",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1949,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00450",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1950,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00451",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1951,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00452",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1952,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00453",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1953,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00454",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1954,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00455",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1955,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00456",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1956,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00457",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1957,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00458",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1958,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00459",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1959,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00460",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1960,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00461",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1961,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00462",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1962,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00463",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1963,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00464",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1964,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00465",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1965,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00466",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1966,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00467",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1967,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00468",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1968,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00469",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1969,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00470",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1970,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00471",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1971,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00472",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1972,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00473",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1973,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00474",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1974,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00475",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1975,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00476",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1976,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00477",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1977,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00478",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1978,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00479",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1979,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00480",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1980,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00481",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1981,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00482",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1982,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00483",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1983,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00484",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1984,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00485",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1985,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00486",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1986,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00487",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1987,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00488",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1988,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00489",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1989,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00490",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1990,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00491",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1991,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00492",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1992,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00493",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1993,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00494",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1994,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00495",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1995,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00496",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1996,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00497",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1997,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00498",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1998,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00499",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1999,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00500",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1500,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00501",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1501,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00502",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1502,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00503",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1503,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00504",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1504,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00505",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1505,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00506",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1506,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00507",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1507,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00508",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1508,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00509",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1509,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00510",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1510,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00511",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1511,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00512",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1512,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00513",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1513,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00514",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1514,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00515",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1515,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00516",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1516,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00517",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1517,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00518",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1518,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00519",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1519,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00520",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1520,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00521",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1521,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00522",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1522,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00523",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1523,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00524",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1524,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00525",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1525,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00526",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1526,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00527",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1527,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00528",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1528,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00529",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1529,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00530",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1530,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00531",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1531,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00532",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1532,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00533",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1533,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00534",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1534,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00535",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1535,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00536",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1536,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00537",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1537,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00538",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1538,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00539",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1539,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00540",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1540,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00541",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1541,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00542",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1542,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00543",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1543,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00544",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1544,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00545",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1545,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00546",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1546,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00547",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1547,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00548",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1548,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00549",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1549,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00550",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1550,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00551",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1551,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00552",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1552,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00553",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1553,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00554",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1554,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00555",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1555,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00556",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1556,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00557",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1557,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00558",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1558,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00559",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1559,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00560",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1560,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00561",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1561,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00562",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1562,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00563",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1563,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00564",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1564,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00565",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1565,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00566",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1566,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00567",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1567,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00568",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1568,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00569",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1569,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00570",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1570,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00571",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1571,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00572",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1572,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00573",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1573,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00574",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1574,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00575",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1575,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00576",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1576,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00577",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1577,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00578",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1578,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00579",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1579,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00580",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1580,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00581",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1581,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00582",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1582,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00583",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1583,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00584",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1584,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00585",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1585,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00586",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1586,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00587",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1587,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00588",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1588,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00589",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1589,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00590",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1590,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00591",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1591,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00592",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1592,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00593",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1593,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00594",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1594,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00595",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1595,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00596",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1596,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00597",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1597,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00598",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1598,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00599",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1599,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00600",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1600,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00601",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1601,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00602",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1602,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00603",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1603,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00604",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1604,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00605",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1605,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00606",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1606,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00607",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1607,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00608",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1608,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00609",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1609,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00610",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1610,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00611",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1611,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00612",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1612,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00613",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1613,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00614",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1614,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00615",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1615,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00616",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1616,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00617",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1617,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00618",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1618,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00619",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1619,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00620",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1620,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00621",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1621,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00622",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1622,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00623",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1623,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00624",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1624,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00625",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1625,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00626",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1626,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00627",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1627,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00628",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1628,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00629",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1629,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00630",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1630,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00631",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1631,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00632",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1632,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00633",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1633,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00634",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1634,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00635",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1635,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00636",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1636,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00637",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1637,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00638",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1638,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00639",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1639,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00640",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1640,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00641",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1641,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00642",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1642,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00643",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1643,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00644",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1644,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00645",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1645,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00646",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1646,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00647",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1647,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00648",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1648,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00649",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1649,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00650",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1650,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00651",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1651,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00652",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1652,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00653",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1653,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00654",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1654,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00655",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1655,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00656",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1656,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00657",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1657,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00658",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1658,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00659",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1659,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00660",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1660,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00661",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1661,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00662",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1662,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00663",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1663,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00664",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1664,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00665",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1665,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00666",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1666,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00667",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1667,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00668",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1668,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00669",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1669,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00670",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1670,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00671",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1671,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00672",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1672,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00673",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1673,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00674",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1674,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00675",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1675,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00676",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1676,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00677",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1677,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00678",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1678,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00679",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1679,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00680",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1680,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00681",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1681,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00682",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1682,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00683",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1683,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00684",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1684,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00685",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1685,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00686",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1686,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00687",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1687,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00688",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1688,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00689",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1689,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00690",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1690,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00691",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1691,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00692",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1692,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00693",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1693,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00694",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1694,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00695",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1695,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00696",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1696,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00697",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1697,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00698",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1698,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00699",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1699,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00700",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1700,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00701",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1701,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00702",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1702,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00703",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1703,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00704",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1704,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00705",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1705,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00706",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1706,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00707",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1707,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00708",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1708,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00709",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1709,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00710",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1710,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00711",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1711,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00712",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1712,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00713",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1713,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00714",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1714,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00715",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1715,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00716",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1716,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00717",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1717,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00718",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1718,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00719",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1719,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00720",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1720,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00721",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1721,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00722",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1722,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00723",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1723,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00724",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1724,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00725",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1725,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00726",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1726,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00727",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1727,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00728",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1728,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00729",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1729,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00730",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1730,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00731",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1731,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00732",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1732,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00733",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1733,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00734",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1734,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00735",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1735,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00736",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1736,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00737",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1737,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00738",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1738,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00739",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1739,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00740",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1740,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00741",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1741,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00742",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1742,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00743",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1743,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00744",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1744,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00745",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1745,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00746",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1746,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00747",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1747,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00748",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1748,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00749",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1749,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00750",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1750,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00751",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1751,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00752",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1752,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00753",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1753,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00754",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1754,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00755",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1755,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00756",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1756,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00757",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1757,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00758",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1758,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00759",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1759,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00760",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1760,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00761",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1761,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00762",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1762,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00763",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1763,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00764",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1764,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00765",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1765,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00766",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1766,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00767",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1767,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00768",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1768,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00769",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1769,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00770",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1770,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00771",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1771,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00772",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1772,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00773",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1773,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00774",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1774,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00775",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1775,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00776",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1776,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00777",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1777,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00778",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1778,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00779",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1779,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00780",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1780,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00781",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1781,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00782",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1782,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00783",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1783,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00784",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1784,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00785",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1785,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00786",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1786,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00787",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1787,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00788",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1788,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00789",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1789,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00790",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1790,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00791",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1791,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00792",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1792,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00793",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1793,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00794",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1794,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00795",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1795,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00796",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1796,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00797",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1797,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00798",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1798,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00799",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1799,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00800",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1800,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00801",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1801,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00802",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1802,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00803",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1803,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00804",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1804,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00805",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1805,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00806",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1806,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00807",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1807,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00808",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1808,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00809",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1809,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00810",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1810,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00811",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1811,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00812",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1812,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00813",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1813,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00814",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1814,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00815",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1815,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00816",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1816,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00817",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1817,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00818",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1818,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00819",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1819,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00820",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1820,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00821",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1821,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00822",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1822,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00823",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1823,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00824",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1824,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00825",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1825,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00826",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1826,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00827",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1827,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00828",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1828,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00829",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1829,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00830",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1830,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00831",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1831,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00832",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1832,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00833",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1833,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00834",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1834,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00835",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1835,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00836",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1836,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00837",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1837,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00838",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1838,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00839",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1839,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00840",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1840,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00841",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1841,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00842",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1842,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00843",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1843,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00844",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1844,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00845",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1845,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00846",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1846,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00847",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1847,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00848",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1848,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00849",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1849,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00850",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1850,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00851",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1851,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00852",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1852,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00853",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1853,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00854",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1854,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00855",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1855,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00856",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1856,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00857",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1857,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00858",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1858,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00859",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1859,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00860",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1860,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00861",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1861,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00862",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1862,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00863",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1863,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00864",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1864,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00865",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1865,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00866",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1866,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00867",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1867,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00868",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1868,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00869",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1869,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00870",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1870,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00871",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1871,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00872",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1872,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00873",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1873,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00874",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1874,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00875",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1875,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00876",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1876,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00877",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1877,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00878",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1878,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00879",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1879,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00880",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1880,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00881",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1881,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00882",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1882,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00883",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1883,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00884",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1884,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00885",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1885,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00886",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1886,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00887",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1887,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00888",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1888,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00889",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1889,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00890",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1890,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00891",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1891,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00892",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1892,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00893",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1893,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00894",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1894,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00895",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1895,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00896",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1896,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00897",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1897,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00898",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1898,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00899",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1899,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00900",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1900,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00901",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1901,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00902",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1902,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00903",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1903,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00904",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1904,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00905",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1905,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00906",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1906,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00907",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1907,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00908",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1908,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00909",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1909,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00910",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1910,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00911",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1911,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00912",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1912,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00913",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1913,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00914",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1914,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00915",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1915,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00916",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1916,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00917",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1917,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00918",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1918,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00919",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1919,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00920",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1920,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00921",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1921,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00922",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1922,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00923",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1923,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00924",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1924,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00925",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1925,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00926",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1926,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00927",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1927,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00928",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1928,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00929",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1929,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00930",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1930,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00931",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1931,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00932",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1932,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00933",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1933,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00934",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1934,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00935",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1935,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00936",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1936,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00937",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1937,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00938",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1938,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00939",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1939,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00940",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1940,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00941",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1941,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00942",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1942,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00943",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1943,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00944",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1944,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00945",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1945,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00946",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1946,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00947",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1947,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00948",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1948,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00949",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1949,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00950",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1950,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00951",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1951,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00952",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1952,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00953",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1953,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00954",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1954,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00955",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1955,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00956",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1956,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00957",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1957,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00958",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1958,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00959",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1959,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00960",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1960,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00961",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1961,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00962",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1962,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00963",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1963,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00964",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1964,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00965",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1965,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00966",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1966,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00967",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1967,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00968",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1968,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00969",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1969,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00970",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1970,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00971",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1971,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00972",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1972,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00973",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1973,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00974",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1974,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00975",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1975,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00976",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1976,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00977",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1977,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00978",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1978,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00979",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1979,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00980",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1980,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00981",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1981,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00982",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1982,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00983",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1983,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00984",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1984,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00985",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1985,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00986",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1986,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00987",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1987,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00988",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1988,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00989",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1989,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00990",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1990,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00991",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1991,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00992",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1992,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00993",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1993,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00994",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1994,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00995",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1995,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00996",
    cipherName: "CHACHA20_POLY1305",
    keyLengthBits: 1024,
    postQuantumCompliant: false,
    throughputMbps: 1996,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00997",
    cipherName: "KYBER_1024",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1997,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00998",
    cipherName: "DILITHIUM_5",
    keyLengthBits: 1024,
    postQuantumCompliant: true,
    throughputMbps: 1998,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_00999",
    cipherName: "SHA_384",
    keyLengthBits: 384,
    postQuantumCompliant: false,
    throughputMbps: 1999,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
  {
    algorithmId: "CRYPTO_REC_01000",
    cipherName: "AES_256_GCM",
    keyLengthBits: 256,
    postQuantumCompliant: false,
    throughputMbps: 1500,
    sideChannelHardened: true,
    hardwareZeroizationSupported: true,
    securityClassification: "CNSA_TOP_SECRET"
  },
];

module.exports = { TACTICAL_CRYPTO_PHYSICAL_RECORDS };
