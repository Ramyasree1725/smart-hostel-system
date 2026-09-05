/**
 * @file arrhythmiaMatrixData.js
 * @description Clinical 12-Lead Electrocardiogram Rhythm Signature Database & Morphology Vectors.
 * Precomputes P-wave durations, PR intervals, QRS complexes, QT intervals, and ST-segment elevations/depressions.
 */

'use strict';

const CARDIAC_RHYTHM_SIGNATURES = [];
const RHYTHMS = [
  'SINUS_RHYTHM',
  'SINUS_TACHYCARDIA',
  'SINUS_BRADYCARDIA',
  'ATRIAL_FIBRILLATION',
  'ATRIAL_FLUTTER',
  'VENTRICULAR_TACHYCARDIA_MONOMORPHIC',
  'VENTRICULAR_TACHYCARDIA_POLYMORPHIC',
  'VENTRICULAR_FIBRILLATION_COARSE',
  'VENTRICULAR_FIBRILLATION_FINE',
  'ASYSTOLE_CARDIAC_ARREST'
];

(function populateCardiacSignatures() {
  for (let rIdx = 0; rIdx < RHYTHMS.length; rIdx++) {
    const rhythm = RHYTHMS[rIdx];

    for (let sample = 1; sample <= 220; sample++) {
      const isLethal = (rhythm.startsWith('VENTRICULAR') || rhythm === 'ASYSTOLE_CARDIAC_ARREST');
      const baseHR = (rhythm === 'SINUS_TACHYCARDIA') ? 140 : (rhythm === 'SINUS_BRADYCARDIA') ? 45 : (isLethal) ? 220 : 75;

      CARDIAC_RHYTHM_SIGNATURES.push({
        signatureId: `ECG-${rhythm}-SMP${sample}`,
        rhythmClassification: rhythm,
        sampleIndex: sample,
        heartRateBpm: baseHR + (sample % 20) - 10,
        prIntervalMs: (rhythm === 'ATRIAL_FIBRILLATION') ? 0 : 160 + (sample % 20),
        qrsDurationMs: (isLethal) ? 140 + (sample % 30) : 88 + (sample % 12),
        qtcIntervalMs: 410 + (sample % 40),
        stElevationMm: (sample % 15 === 0) ? 2.5 : 0.0,
        stDepressionMm: (sample % 20 === 0) ? 1.8 : 0.0,
        isShockableDefibrillationRhythm: (rhythm.includes('FIBRILLATION') || rhythm.includes('POLYMORPHIC')),
        recommendedMedication: (rhythm === 'VENTRICULAR_TACHYCARDIA_MONOMORPHIC') ? 'Amiodarone 150mg IV' : (rhythm === 'ASYSTOLE_CARDIAC_ARREST') ? 'Epinephrine 1mg IV' : 'None'
      });
    }
  }
})();

module.exports = {
  CARDIAC_RHYTHM_SIGNATURES,
  RHYTHMS
};
