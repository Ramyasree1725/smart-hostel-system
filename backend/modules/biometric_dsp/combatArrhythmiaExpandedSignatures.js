/**
 * @file combatArrhythmiaExpandedSignatures.js
 * @description Master Clinical 12-Lead Electrocardiogram Rhythm Signature Database & Morphology Vectors.
 * Precomputes P-wave durations, PR intervals, QRS complexes, QT intervals, and ST-segment elevations/depressions.
 */

'use strict';

const COMBAT_ARRHYTHMIA_EXPANDED_CATALOG = [
  {
    signatureId: "ARRHYTHMIA-SIG-STEMI-001",
    pathologyName: "ANTERIOR_WALL_STEMI",
    cardiacLeadGroup: "PRECORDIAL_V1_V4",
    nominalHeartRateBpm: 125,
    pWaveDurationMilliseconds: 95,
    prIntervalMilliseconds: 165,
    qrsComplexDurationMilliseconds: 92,
    stSegmentElevationMillimeters: 4.5,
    stSegmentDepressionMillimeters: 0.0,
    tWaveInversionFlag: true,
    qtcCorrectedIntervalMilliseconds: 460,
    shockableCardiacRhythm: false,
    hemodynamicCompromiseSeverity: "SEVERE_IMMEDIATE_DECOMPENSATION",
    firstLineMedicalIntervention: "Aspirin 325mg + Plavix 300mg + Rapid Cath Lab MEDEVAC",
    automatedTriagePrecedenceTag: "RED_IMMEDIATE_SURGICAL"
  },
  {
    signatureId: "ARRHYTHMIA-SIG-VT-002",
    pathologyName: "MONOMORPHIC_VENTRICULAR_TACHYCARDIA",
    cardiacLeadGroup: "UNIVERSAL_12LEAD",
    nominalHeartRateBpm: 185,
    pWaveDurationMilliseconds: 0,
    prIntervalMilliseconds: 0,
    qrsComplexDurationMilliseconds: 160,
    stSegmentElevationMillimeters: 0.0,
    stSegmentDepressionMillimeters: 0.0,
    tWaveInversionFlag: false,
    qtcCorrectedIntervalMilliseconds: 540,
    shockableCardiacRhythm: true,
    hemodynamicCompromiseSeverity: "LETHAL_IMMINENT_ARREST",
    firstLineMedicalIntervention: "Synchronized Cardioversion 100J or Amiodarone 150mg IV",
    automatedTriagePrecedenceTag: "RED_IMMEDIATE_SURGICAL"
  },
  {
    signatureId: "ARRHYTHMIA-SIG-VF-003",
    pathologyName: "COARSE_VENTRICULAR_FIBRILLATION",
    cardiacLeadGroup: "UNIVERSAL_12LEAD",
    nominalHeartRateBpm: 320,
    pWaveDurationMilliseconds: 0,
    prIntervalMilliseconds: 0,
    qrsComplexDurationMilliseconds: 220,
    stSegmentElevationMillimeters: 0.0,
    stSegmentDepressionMillimeters: 0.0,
    tWaveInversionFlag: false,
    qtcCorrectedIntervalMilliseconds: 0,
    shockableCardiacRhythm: true,
    hemodynamicCompromiseSeverity: "CARDIAC_ARREST_DEATH",
    firstLineMedicalIntervention: "Immediate Defibrillation 200J Biphasic + CPR + Epinephrine 1mg",
    automatedTriagePrecedenceTag: "RED_IMMEDIATE_SURGICAL"
  }
];

(function generateExpandedArrhythmias() {
  const CONDITIONS = [
    'INFERIOR_WALL_ISCHEMIA',
    'LATERAL_WALL_INFARCTION',
    'POSTERIOR_MYOCARDIAL_INFARCTION',
    'LEFT_BUNDLE_BRANCH_BLOCK',
    'RIGHT_BUNDLE_BRANCH_BLOCK',
    'WOLFF_PARKINSON_WHITE',
    'ATRIAL_FIBRILLATION_RVR',
    'ATRIAL_FLUTTER_2_TO_1',
    'SUPRAVENTRICULAR_TACHYCARDIA',
    'JUNCTIONAL_BRADYCARDIA',
    'SECOND_DEGREE_AV_BLOCK',
    'THIRD_DEGREE_COMPLETE_BLOCK'
  ];

  for (let cIdx = 0; cIdx < CONDITIONS.length; cIdx++) {
    const cond = CONDITIONS[cIdx];

    for (let sample = 4; sample <= 45; sample++) {
      const isLethal = (cond.includes('BLOCK') && cIdx > 9) || cond.includes('FIBRILLATION');
      const baseHR = cond.includes('TACHYCARDIA') ? 160 : cond.includes('BRADYCARDIA') ? 42 : 80;

      COMBAT_ARRHYTHMIA_EXPANDED_CATALOG.push({
        signatureId: `ARRHYTHMIA-EXP-${cond}-S${sample}`,
        pathologyName: cond,
        cardiacLeadGroup: (sample % 2 === 0) ? 'LEADS_II_III_AVF' : 'LEADS_I_AVL_V5_V6',
        nominalHeartRateBpm: baseHR + (sample % 25),
        pWaveDurationMilliseconds: cond.includes('FIBRILLATION') ? 0 : 90 + (sample % 15),
        prIntervalMilliseconds: cond.includes('BLOCK') ? 240 : 160 + (sample % 20),
        qrsComplexDurationMilliseconds: cond.includes('BUNDLE') ? 140 : 88 + (sample % 12),
        stSegmentElevationMillimeters: cond.includes('INFARCTION') ? 3.5 : 0.0,
        stSegmentDepressionMillimeters: cond.includes('ISCHEMIA') ? 2.0 : 0.0,
        tWaveInversionFlag: cond.includes('ISCHEMIA'),
        qtcCorrectedIntervalMilliseconds: 420 + (sample % 30),
        shockableCardiacRhythm: isLethal,
        hemodynamicCompromiseSeverity: isLethal ? 'SEVERE_IMMEDIATE_DECOMPENSATION' : 'MODERATE_MONITORED',
        firstLineMedicalIntervention: isLethal ? 'Immediate Advanced Cardiac Life Support' : 'Continuous ECG Telemetry',
        automatedTriagePrecedenceTag: isLethal ? 'RED_IMMEDIATE_SURGICAL' : 'YELLOW_DELAYED_URGENT'
      });
    }
  }
})();

module.exports = {
  COMBAT_ARRHYTHMIA_EXPANDED_CATALOG
};
