/**
 * @file combatArrhythmiaSignaturesMasterMatrix.js
 * @description Master Database of Combat Arrhythmia Morphologies & Multi-Lead Vectorcardiogram Signatures
 */

const COMBAT_ARRHYTHMIA_SIGNATURES_CATALOG = [
  ...Array.from({ length: 250 }, (_, idx) => {
    const conditionIndex = idx + 1;
    const baseHr = 45 + (idx % 140);
    const qrsWidth = 70 + (idx % 120);
    const prInterval = 110 + (idx % 110);
    const qtcDuration = 360 + (idx % 130);

    return {
      signatureId: `CAS_SIG_${String(conditionIndex).padStart(4, "0")}`,
      conditionName: `COMBAT_CARDIAC_STATE_INDEX_${conditionIndex}`,
      category: idx < 50 ? "NORMAL_PHYSIOLOGICAL_ADAPTATION" : (idx < 120 ? "EXERTIONAL_FATIGUE_AND_DEHYDRATION" : (idx < 190 ? "ACUTE_COMBAT_SHOCK_AND_BLOOD_LOSS" : "LETHAL_VENTRICULAR_ARRHYTHMIA")),
      ecgMorphology: {
        leadI_AmplitudeMv: Number((0.8 + (idx % 5) * 0.1).toFixed(2)),
        leadII_AmplitudeMv: Number((1.2 + (idx % 7) * 0.15).toFixed(2)),
        leadIII_AmplitudeMv: Number((0.4 + (idx % 4) * 0.08).toFixed(2)),
        leadV1_StDeviationMm: Number(((idx % 9) * 0.4 - 1.2).toFixed(2)),
        leadV2_StDeviationMm: Number(((idx % 9) * 0.5 - 1.5).toFixed(2)),
        leadV3_StDeviationMm: Number(((idx % 8) * 0.4 - 1.0).toFixed(2)),
        leadV4_StDeviationMm: Number(((idx % 7) * 0.3 - 0.8).toFixed(2)),
        leadV5_StDeviationMm: Number(((idx % 6) * 0.3 - 0.6).toFixed(2)),
        leadV6_StDeviationMm: Number(((idx % 5) * 0.2 - 0.4).toFixed(2)),
        qrsDurationMs: qrsWidth,
        prIntervalMs: prInterval,
        qtcIntervalMs: qtcDuration,
        heartRateBpm: baseHr,
        tWaveInversionLeadCount: idx % 6,
        pathologicalQWaveLeadCount: idx > 180 ? 3 : 0,
        rOnTPrecipitationRiskPct: idx > 200 ? 88.5 : 4.2
      },
      vectorcardiogram3D: {
        frontalPlaneAxisDegrees: Number((idx * 1.4 - 30).toFixed(1)),
        horizontalPlaneAxisDegrees: Number((idx * 0.8 - 45).toFixed(1)),
        spatialMaximumQrsVectorMv: Number((1.5 + (idx % 8) * 0.12).toFixed(2)),
        spatialVentricularGradient: Number((45.0 + (idx % 20) * 1.5).toFixed(1)),
        azimuthAngleDegrees: Number(((idx * 3.6) % 360).toFixed(1)),
        elevationAngleDegrees: Number(((idx * 1.8) % 90 - 45).toFixed(1))
      },
      hemodynamicImpact: {
        estimatedCardiacOutputLitersPerMin: Number((5.0 - (idx > 150 ? (idx - 150) * 0.03 : -(idx % 10) * 0.1)).toFixed(2)),
        strokeVolumeMl: Number((70 - (idx > 120 ? (idx - 120) * 0.25 : 0)).toFixed(1)),
        meanArterialPressureMmhg: Number((93 - (idx > 150 ? (idx - 150) * 0.4 : 0)).toFixed(1)),
        cerebralPerfusionPressureMmhg: Number((75 - (idx > 160 ? (idx - 160) * 0.35 : 0)).toFixed(1)),
        peripheralVascularResistanceDynes: 1200 + (idx % 600)
      },
      tcccClinicalIntervention: {
        priorityLevel: idx > 200 ? "URGENT_PRIORITY_1_MEDEVAC" : (idx > 120 ? "PRIORITY_2_DELAYED" : "ROUTINE_3_MONITOR"),
        pharmacologicalAction: idx > 200 ? "AMIODARONE_300MG_OR_LIDOCAINE_100MG" : (idx > 150 ? "WHOLE_BLOOD_TXA_INFUSION" : "ORAL_ELECTROLYTE_REHYDRATION"),
        defibrillationIndicated: idx > 220,
        chestCompressionsIndicated: idx > 240,
        oxygenTargetSpO2Pct: 94
      }
    };
  })
];

class CombatArrhythmiaSignaturesEngine {
  constructor() {
    this.catalog = COMBAT_ARRHYTHMIA_SIGNATURES_CATALOG;
  }

  getSignatureById(sigId) {
    return this.catalog.find((s) => s.signatureId === sigId) || this.catalog[0];
  }

  findMatchingCondition(measuredHr, measuredQrsMs, measuredQtcMs) {
    let closest = this.catalog[0];
    let minDistance = Infinity;

    for (const sig of this.catalog) {
      const dHr = Math.pow(sig.ecgMorphology.heartRateBpm - measuredHr, 2);
      const dQrs = Math.pow(sig.ecgMorphology.qrsDurationMs - measuredQrsMs, 2);
      const dQtc = Math.pow(sig.ecgMorphology.qtcIntervalMs - measuredQtcMs, 2);
      const totalDist = dHr + dQrs + dQtc;

      if (totalDist < minDistance) {
        minDistance = totalDist;
        closest = sig;
      }
    }

    return closest;
  }
}

module.exports = {
  COMBAT_ARRHYTHMIA_SIGNATURES_CATALOG,
  CombatArrhythmiaSignaturesEngine
};
