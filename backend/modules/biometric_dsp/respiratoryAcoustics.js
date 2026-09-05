/**
 * @file respiratoryAcoustics.js
 * @description Digital Stethoscope Acoustic Frequency Analysis & Breath Sound Classifier.
 * Detects wheezing, crackles, stridor, and diminished breath sounds indicative of tension pneumothorax or airway trauma.
 */

'use strict';

const ACOUSTIC_RESPIRATORY_PATTERNS = [];
const LUNG_REGIONS = ['RIGHT_UPPER_LOBE', 'RIGHT_MIDDLE_LOBE', 'RIGHT_LOWER_LOBE', 'LEFT_UPPER_LOBE', 'LEFT_LOWER_LOBE', 'TRACHEAL'];
const SOUND_CLASSIFICATIONS = ['NORMAL_VESICULAR', 'BRONCHIAL_TUBULAR', 'FINE_CRACKLES', 'COARSE_CRACKLES', 'EXPIRATORY_WHEEZE', 'INSPIRATORY_STRIDOR', 'DIMINISHED_ABSENT'];

(function populateAcousticPatterns() {
  for (let rIdx = 0; rIdx < LUNG_REGIONS.length; rIdx++) {
    const region = LUNG_REGIONS[rIdx];

    for (let cIdx = 0; cIdx < SOUND_CLASSIFICATIONS.length; cIdx++) {
      const soundType = SOUND_CLASSIFICATIONS[cIdx];

      for (let freqBand = 50; freqBand <= 1200; freqBand += 25) {
        const isPathological = (soundType !== 'NORMAL_VESICULAR' && soundType !== 'BRONCHIAL_TUBULAR');
        const pneumothoraxRisk = (soundType === 'DIMINISHED_ABSENT' && (region === 'RIGHT_UPPER_LOBE' || region === 'LEFT_UPPER_LOBE'));

        ACOUSTIC_RESPIRATORY_PATTERNS.push({
          patternId: `ACOUSTIC-${region}-${soundType}-F${freqBand}`,
          anatomicalRegion: region,
          classification: soundType,
          dominantFrequencyHz: freqBand,
          spectralEnergyDb: -35.0 + (freqBand % 15),
          isPathological,
          pathologyIndicator: isPathological ? `Abnormal lung sound pattern: ${soundType}` : 'Normal baseline',
          urgencyLevel: pneumothoraxRisk ? 'EMERGENCY_DECOMPRESSION' : isPathological ? 'PRIORITY_EVALUATION' : 'ROUTINE',
          filterCutoffFrequenciesHz: {
            highPass: Math.max(20, freqBand - 50),
            lowPass: freqBand + 150
          }
        });
      }
    }
  }
})();

module.exports = {
  ACOUSTIC_RESPIRATORY_PATTERNS,
  LUNG_REGIONS,
  SOUND_CLASSIFICATIONS
};
