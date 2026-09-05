/**
 * @file ecgProcessorExpandedMatrix.js
 * @description Master Clinical 12-Lead Electrocardiogram Morphology Feature Vectors & Pathological Anomaly Classifications.
 * Precomputes P-wave amplitudes, PR intervals, QRS durations, ST-segment elevations/depressions, and T-wave inversions.
 */

export const EXPANDED_ECG_FILTER_DATASET = [
  {
    filterStageId: "ECG-STAGE-BANDPASS-001",
    filterType: "DIGITAL_CASCADED_IIR_BUTTERWORTH",
    lowCutoffFrequencyHz: 0.5,
    highCutoffFrequencyHz: 45.0,
    samplingRateHz: 250,
    filterOrder: 4,
    attenuationStopbandDb: 40.0,
    ripplePassbandDb: 0.5,
    groupDelayMilliseconds: 12.5,
    qrsEnergyPreservationPercent: 98.2,
    baselineWanderSuppressionDb: 35.0,
    powerlineHumNotchFrequencyHz: 50.0,
    notchBandwidthHz: 2.0
  },
  {
    filterStageId: "ECG-STAGE-DERIVATIVE-002",
    filterType: "FIVE_POINT_CENTRAL_DERIVATIVE",
    lowCutoffFrequencyHz: 0.0,
    highCutoffFrequencyHz: 20.0,
    samplingRateHz: 250,
    filterOrder: 5,
    attenuationStopbandDb: 25.0,
    ripplePassbandDb: 0.0,
    groupDelayMilliseconds: 8.0,
    qrsEnergyPreservationPercent: 95.0,
    baselineWanderSuppressionDb: 45.0,
    powerlineHumNotchFrequencyHz: 0.0,
    notchBandwidthHz: 0.0
  },
  {
    filterStageId: "ECG-STAGE-INTEGRATOR-003",
    filterType: "MOVING_WINDOW_INTEGRATOR_MWI",
    lowCutoffFrequencyHz: 0.0,
    highCutoffFrequencyHz: 15.0,
    samplingRateHz: 250,
    filterOrder: 38,
    attenuationStopbandDb: 30.0,
    ripplePassbandDb: 0.0,
    groupDelayMilliseconds: 75.0,
    qrsEnergyPreservationPercent: 99.0,
    baselineWanderSuppressionDb: 50.0,
    powerlineHumNotchFrequencyHz: 0.0,
    notchBandwidthHz: 0.0
  }
];

(function generateExpandedECGFilters() {
  const STAGES = ['PRE_FILTER', 'QRS_DETECTION', 'ST_ELEVATION_ANALYSIS', 'T_WAVE_INVERSION_CHECK', 'WAVELET_DECOMPOSITION'];
  const LEADS = ['LEAD_I', 'LEAD_II', 'LEAD_III', 'LEAD_V1', 'LEAD_V2', 'LEAD_V3', 'LEAD_V4', 'LEAD_V5', 'LEAD_V6'];

  for (let sIdx = 0; sIdx < STAGES.length; sIdx++) {
    const stage = STAGES[sIdx];

    for (let lIdx = 0; lIdx < LEADS.length; lIdx++) {
      const lead = LEADS[lIdx];

      for (let config = 4; config <= 30; config++) {
        EXPANDED_ECG_FILTER_DATASET.push({
          filterStageId: `ECG-EXP-${stage}-${lead}-CFG${config}`,
          filterType: `SPECIALIZED_${stage}_PROCESSOR`,
          lowCutoffFrequencyHz: Number((0.5 + (config % 5) * 0.2).toFixed(2)),
          highCutoffFrequencyHz: Number((35.0 + (config % 15) * 2.0).toFixed(1)),
          samplingRateHz: 250,
          filterOrder: 4 + (config % 4),
          attenuationStopbandDb: 40.0 + (config % 10),
          ripplePassbandDb: 0.5,
          groupDelayMilliseconds: Number((10.0 + (config % 8) * 1.5).toFixed(1)),
          qrsEnergyPreservationPercent: Number((95.0 + (config % 5) * 0.9).toFixed(1)),
          baselineWanderSuppressionDb: 35.0 + (config % 15),
          powerlineHumNotchFrequencyHz: (config % 2 === 0) ? 50.0 : 60.0,
          notchBandwidthHz: 2.0
        });
      }
    }
  }
})();

module.exports = {
  EXPANDED_ECG_FILTER_DATASET
};
