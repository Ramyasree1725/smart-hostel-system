/**
 * @file tacticalRelayFrequencyHoppingLedger.js
 * @description Master Tactical Frequency Hopping Spread Spectrum (FHSS) Relay Matrix
 */

const FHSS_TACTICAL_HOP_PATTERNS = [
  {
    patternId: "FHSS_PAT_001",
    bandDesignation: "UHF_TACTICAL_MILITARY_225_400MHZ",
    numberOfHopFrequencies: 7000,
    hopRateHopsPerSecond: 300,
    hopDwellTimeMicroseconds: 3333,
    channelSpacingKhz: 25.0,
    pseudoRandomSeedSequence: "PRNG_GOLD_CODE_POLY_DEGREE_31",
    antiJamProcessingGainDb: 38.4,
    frequencyExclusionBandsKhz: [
      { startKhz: 243000, endKhz: 243050, reason: "MILITARY_AIR_DISTRESS_EMERGENCY" },
      { startKhz: 282800, endKhz: 282850, reason: "SAR_SCENE_OF_ACTION" }
    ],
    interleavingDepthFrames: 8,
    forwardErrorCorrectionCodec: "REED_SOLOMON_255_223_CONVOLUTIONAL_RATE_1_2",
    powerControlMode: "DYNAMIC_CLOSED_LOOP_RSSI_BASED",
    maxEirpWatts: 20.0
  },
  {
    patternId: "FHSS_PAT_002",
    bandDesignation: "VHF_LOW_SINCGARS_30_88MHZ",
    numberOfHopFrequencies: 2320,
    hopRateHopsPerSecond: 100,
    hopDwellTimeMicroseconds: 10000,
    channelSpacingKhz: 25.0,
    pseudoRandomSeedSequence: "TRANSEC_VARIABLE_KEY_HOP_TABLE",
    antiJamProcessingGainDb: 33.6,
    frequencyExclusionBandsKhz: [
      { startKhz: 40500, endKhz: 40550, reason: "RECON_BEACON" }
    ],
    interleavingDepthFrames: 4,
    forwardErrorCorrectionCodec: "CONVOLUTIONAL_VITERBI_K7_R1_2",
    powerControlMode: "MANUAL_OR_AUTOMATIC_STEPPING",
    maxEirpWatts: 50.0
  },
  {
    patternId: "FHSS_PAT_003",
    bandDesignation: "SHF_WIDEBAND_SOLDIER_SRW_1_2_GHZ",
    numberOfHopFrequencies: 16000,
    hopRateHopsPerSecond: 1200,
    hopDwellTimeMicroseconds: 833,
    channelSpacingKhz: 125.0,
    pseudoRandomSeedSequence: "AES_CTR_HIGH_SPEED_STREAM_GEN",
    antiJamProcessingGainDb: 42.0,
    frequencyExclusionBandsKhz: [
      { startKhz: 1227600, endKhz: 1227650, reason: "GPS_L2_CIVIL_AND_MILITARY" },
      { startKhz: 1575420, endKhz: 1575470, reason: "GPS_L1_C_A_AND_P_Y" }
    ],
    interleavingDepthFrames: 16,
    forwardErrorCorrectionCodec: "TURBO_CODE_3GPP_RATE_1_3_LDPC",
    powerControlMode: "FAST_SUB_MILLISECOND_ADAPTIVE",
    maxEirpWatts: 5.0
  }
];

class TacticalRelayFrequencyHoppingEngine {
  constructor() {
    this.patterns = FHSS_TACTICAL_HOP_PATTERNS;
  }

  getPatternById(id) {
    return this.patterns.find((p) => p.patternId === id) || this.patterns[0];
  }
}

module.exports = {
  FHSS_TACTICAL_HOP_PATTERNS,
  TacticalRelayFrequencyHoppingEngine
};
