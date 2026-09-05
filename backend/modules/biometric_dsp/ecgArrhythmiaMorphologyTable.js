/**
 * @file ecgArrhythmiaMorphologyTable.js
 * @description Clinical 12-Lead Electrocardiogram Morphology Feature Vectors & Pathological Anomaly Classifications.
 * Precomputes P-wave amplitudes, PR intervals, QRS durations, ST-segment elevations/depressions, and T-wave inversions.
 */

'use strict';

const ECG_MORPHOLOGY_VECTORS = [];

(function populateECGMorphologies() {
  const PATHOLOGY_CLASSES = [
    'ANTERIOR_WALL_MYOCARDIAL_INFARCTION',
    'INFERIOR_WALL_STEMI',
    'LATERAL_WALL_ISCHEMIA',
    'LEFT_BUNDLE_BRANCH_BLOCK_LBBB',
    'RIGHT_BUNDLE_BRANCH_BLOCK_RBBB',
    'WOLFF_PARKINSON_WHITE_WPW',
    'LONG_QT_SYNDROME_TYPE_1',
    'HYPERKALEMIA_TALL_PEAKED_T',
    'HYPOKALEMIA_U_WAVE_PROMINENCE',
    'PERICARDITIS_DIFFUSE_ST_ELEVATION'
  ];

  const LEADS = ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'];

  for (let pIdx = 0; pIdx < PATHOLOGY_CLASSES.length; pIdx++) {
    const pathology = PATHOLOGY_CLASSES[pIdx];

    for (let lIdx = 0; lIdx < LEADS.length; lIdx++) {
      const lead = LEADS[lIdx];

      for (let sample = 1; sample <= 50; sample++) {
        const hasSTElevation = (pIdx === 0 && (lead.startsWith('V1') || lead.startsWith('V2') || lead.startsWith('V3') || lead.startsWith('V4')));
        const hasSTDepression = (pIdx === 2 && (lead === 'II' || lead === 'III' || lead === 'aVF'));
        const wideQRS = (pIdx === 3 || pIdx === 4);

        ECG_MORPHOLOGY_VECTORS.push({
          vectorId: `ECG-MORPH-${pathology}-LEAD_${lead}-S${sample}`,
          pathologyClass: pathology,
          ecgLead: lead,
          sampleIndex: sample,
          pWaveAmplitudeMv: Number((0.15 + (sample % 10) * 0.02).toFixed(2)),
          pWaveDurationMs: 90 + (sample % 15),
          prIntervalMs: (pIdx === 5) ? 100 : 160 + (sample % 20),
          qrsDurationMs: wideQRS ? 145 + (sample % 25) : 85 + (sample % 15),
          qrsVoltageMv: Number((1.2 + ((sample % 8) * 0.15)).toFixed(2)),
          stSegmentElevationMm: hasSTElevation ? Number((3.5 + (sample % 5) * 0.4).toFixed(1)) : 0.0,
          stSegmentDepressionMm: hasSTDepression ? Number((2.0 + (sample % 4) * 0.3).toFixed(1)) : 0.0,
          tWaveInversionDetected: (pIdx === 2 || pIdx === 3),
          qtcCorrectedBazettMs: (pIdx === 6) ? 520 + (sample % 30) : 410 + (sample % 20),
          emergencyInterventionUrgency: (hasSTElevation || wideQRS) ? 'IMMEDIATE_CARDIAC_CATH_EVAC' : 'URGENT_TELEMETRY_MONITOR'
        });
      }
    }
  }
})();

module.exports = {
  ECG_MORPHOLOGY_VECTORS
};
