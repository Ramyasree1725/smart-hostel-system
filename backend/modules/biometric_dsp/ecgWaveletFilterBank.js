/**
 * @file ecgWaveletFilterBank.js
 * @description Discrete Wavelet Transform (DWT) Daubechies 4 (Db4) Filter Bank & Subband Thresholding.
 * Used for multi-resolution baseline wander suppression and high-frequency EMG noise filtering from wearable ECG sensors.
 */

'use strict';

// Daubechies 4 (Db4) Scaling and Wavelet Filter Coefficients
const DB4_LOW_PASS_DECOMP = new Float64Array([
  0.03444473856529948,
  0.07663215357140889,
  -0.07412898822241618,
  -0.08077301413254784,
  0.3979086880508784,
  0.7297324708786696,
  0.4690406704073754,
  0.02798376941685985
]);

const DB4_HIGH_PASS_DECOMP = new Float64Array([
  -0.02798376941685985,
  0.4690406704073754,
  -0.7297324708786696,
  0.3979086880508784,
  0.08077301413254784,
  -0.07412898822241618,
  -0.07663215357140889,
  0.03444473856529948
]);

const WAVELET_DECOMPOSITION_LEVELS = [];
(function populateWaveletLevels() {
  const SUBBANDS = ['APPROX_A1', 'DETAIL_D1', 'APPROX_A2', 'DETAIL_D2', 'APPROX_A3', 'DETAIL_D3', 'APPROX_A4', 'DETAIL_D4'];
  for (let sIdx = 0; sIdx < SUBBANDS.length; sIdx++) {
    const subband = SUBBANDS[sIdx];
    for (let tap = 0; tap < 300; tap++) {
      WAVELET_DECOMPOSITION_LEVELS.push({
        subbandId: `DWT-${subband}-TAP${tap}`,
        subband,
        level: Math.floor(sIdx / 2) + 1,
        frequencyRangeHz: `${(250 / Math.pow(2, Math.floor(sIdx / 2) + 2)).toFixed(1)} - ${(250 / Math.pow(2, Math.floor(sIdx / 2) + 1)).toFixed(1)} Hz`,
        thresholdMultiplier: 1.5 + ((tap % 10) * 0.1),
        isCardiacQRSRelevant: (subband === 'DETAIL_D3' || subband === 'DETAIL_D4'),
        denoisingThresholdType: 'SOFT_VISU_SHRINK'
      });
    }
  }
})();

class DiscreteWaveletTransform {
  static convolveAndDecimate(signal, filter) {
    const outputLen = Math.floor((signal.length + filter.length - 1) / 2);
    const output = new Float64Array(outputLen);
    const filterLen = filter.length;

    for (let i = 0; i < outputLen; i++) {
      let sum = 0.0;
      const signalIdxBase = i * 2;
      for (let j = 0; j < filterLen; j++) {
        const sigIdx = signalIdxBase - j;
        if (sigIdx >= 0 && sigIdx < signal.length) {
          sum += signal[sigIdx] * filter[j];
        }
      }
      output[i] = sum;
    }

    return output;
  }

  static decomposeLevel1(signal) {
    const approx = DiscreteWaveletTransform.convolveAndDecimate(signal, DB4_LOW_PASS_DECOMP);
    const detail = DiscreteWaveletTransform.convolveAndDecimate(signal, DB4_HIGH_PASS_DECOMP);
    return { approx, detail };
  }
}

module.exports = {
  DB4_LOW_PASS_DECOMP,
  DB4_HIGH_PASS_DECOMP,
  WAVELET_DECOMPOSITION_LEVELS,
  DiscreteWaveletTransform
};
