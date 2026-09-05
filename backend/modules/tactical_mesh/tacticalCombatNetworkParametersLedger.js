/**
 * @file tacticalCombatNetworkParametersLedger.js
 * @description Master Tactical Combat Net Radio (CNR) Waveform & Modulation Matrix
 */

const CNR_TACTICAL_WAVEFORM_LEDGER = [
  ...Array.from({ length: 100 }, (_, idx) => {
    const waveId = idx + 1;
    const bands = ["VHF_LOW_30_88_MHZ", "VHF_HIGH_118_174_MHZ", "UHF_225_450_MHZ", "SHF_1_2_GHZ", "EHF_20_44_GHZ"];
    const band = bands[idx % bands.length];

    return {
      waveformId: `WAVEFORM_CNR_${String(waveId).padStart(3, "0")}`,
      waveformDesignation: `SOLDIER_RADIO_WAVEFORM_SRW_PROFILE_${waveId}`,
      frequencyBand: band,
      modulationCharacteristics: {
        modulationType: idx % 2 === 0 ? "CONTINUOUS_PHASE_FSK_SOQPSK" : "DIRECT_SEQUENCE_SPREAD_SPECTRUM_QPSK",
        channelBandwidthKhz: 25.0 * ((idx % 4) + 1),
        frequencyHoppingRateHopsSec: 300 + (idx % 10) * 100,
        carrierFrequencyStepKhz: 25.0,
        spectralEfficiencyBitsPerHz: 1.6,
        symbolRateKsps: 64.0 + (idx % 8) * 16.0
      },
      linkBudgetSpecifications: {
        transmitterPowerWatts: 5.0,
        transmitterPowerDbm: 37.0,
        antennaGainTxDbi: 2.15,
        antennaGainRxDbi: 2.15,
        receiverSensitivityDbm: -116.0,
        noiseFigureDb: 4.5,
        fadeMarginDb: 18.0,
        maximumFreeSpaceRangeKm: Number((12.5 + (idx % 20) * 1.5).toFixed(1))
      },
      meshNetworkingCapabilities: {
        maxHopCount: 8,
        dynamicRouteDiscoveryTimeMs: 150,
        voiceCodecBitrateKbps: 2.4, // MELP+ tactical voice
        dataThroughputRawKbps: 128.0 + (idx % 16) * 32.0,
        packetErrorRateThreshold: 0.01,
        qualityOfServiceQueues: 4
      }
    };
  })
];

class TacticalWaveformLedgerEngine {
  constructor() {
    this.ledger = CNR_TACTICAL_WAVEFORM_LEDGER;
  }

  getWaveformById(id) {
    return this.ledger.find((w) => w.waveformId === id) || this.ledger[0];
  }

  filterByBand(band) {
    return this.ledger.filter((w) => w.frequencyBand === band);
  }
}

module.exports = {
  CNR_TACTICAL_WAVEFORM_LEDGER,
  TacticalWaveformLedgerEngine
};
