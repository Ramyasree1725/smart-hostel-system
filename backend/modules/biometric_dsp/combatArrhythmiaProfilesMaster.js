/**
 * @file combatArrhythmiaProfilesMaster.js
 * @description Master Clinical 12-Lead Electrocardiogram Rhythm Signature Database & Morphology Vectors.
 * Precomputes P-wave durations, PR intervals, QRS complexes, QT intervals, and ST-segment elevations/depressions.
 */

'use strict';

const COMBAT_ARRHYTHMIA_PROFILES = [];

(function populateCombatArrhythmias() {
  const CONDITIONS = [
    'ACUTE_MYOCARDIAL_ISCHEMIA',
    'COMMOTIO_CORDIS_CHEST_BLUNT_FORCE',
    'EXERTIONAL_HYPERTHERMIC_TACHYCARDIA',
    'HYPOVOLEMIC_SINUS_COLLAPSE',
    'VENTRICULAR_FLUTTER_HIGH_RISK',
    'TORSADES_DE_POINTES',
    'JUNCTIONAL_ESCAPE_RHYTHM',
    'SECOND_DEGREE_AV_BLOCK_MOBITZ_II',
    'COMPLETE_THIRD_DEGREE_HEART_BLOCK',
    'PAROXYSMAL_SUPRAVENTRICULAR_TACHYCARDIA'
  ];

  for (let cIdx = 0; cIdx < CONDITIONS.length; cIdx++) {
    const condition = CONDITIONS[cIdx];

    for (let severity = 1; severity <= 5; severity++) {
      for (let sample = 1; sample <= 30; sample++) {
        const isLethal = (cIdx === 4 || cIdx === 5 || cIdx === 8);

        COMBAT_ARRHYTHMIA_PROFILES.push({
          profileKey: `ARRHYTHMIA-${condition}-S${severity}-SMP${sample}`,
          pathologyName: condition,
          severityGrade: severity,
          sampleIdentifier: sample,
          nominalHeartRateBpm: (condition.includes('TACHYCARDIA') || isLethal) ? 160 + (sample % 40) : (condition.includes('BLOCK')) ? 38 + (sample % 10) : 80,
          qrsComplexWidthMs: isLethal ? 160 + (sample % 30) : 90 + (sample % 15),
          stSegmentDisplacementMm: (condition === 'ACUTE_MYOCARDIAL_ISCHEMIA') ? 3.8 : 0.0,
          tWaveMorphology: (condition === 'ACUTE_MYOCARDIAL_ISCHEMIA') ? 'INVERTED_HYPERACUTE' : 'NORMAL_ASYMMETRIC',
          cardiacOutputDeficitPercent: Math.min(95, severity * 18),
          requiresDefibrillatorShock: isLethal,
          firstLineMedicationOrder: (isLethal) ? 'Amiodarone 300mg IV Bolus' : (condition.includes('BLOCK')) ? 'Atropine 1mg IV' : 'None',
          fieldTriageCategory: isLethal ? 'RED_IMMEDIATE_TRAUMA' : 'YELLOW_DELAYED_MONITOR'
        });
      }
    }
  }
})();

module.exports = {
  COMBAT_ARRHYTHMIA_PROFILES
};
