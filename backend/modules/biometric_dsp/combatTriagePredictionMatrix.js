/**
 * @file combatTriagePredictionMatrix.js
 * @description Machine Learning Regression Weights & Predictive Casualty Survivability Matrix
 * Evaluates multi-variate combat telemetry to forecast physiological decompensation in field care.
 */

const PREDICTIVE_SURVIVABILITY_WEIGHTS = {
  shockIndexWeight: 0.35,
  hypoxemiaSpO2Weight: 0.25,
  coreTempDeviationWeight: 0.15,
  gcsDeficitWeight: 0.15,
  galvanicSurgeWeight: 0.10
};

class CombatTriagePredictionEngine {
  constructor(weights = PREDICTIVE_SURVIVABILITY_WEIGHTS) {
    this.weights = weights;
  }

  predictCasualtyDecompensationRisk(vitalPacket) {
    const { heartRate, systolicBP, spO2, coreTempC, gcsScore, gsrMicroSiemens } = vitalPacket;

    // Shock index penalty (0 to 1)
    const si = heartRate / Math.max(40, systolicBP);
    const siPenalty = Math.min(1.0, Math.max(0.0, (si - 0.7) / 1.0));

    // SpO2 penalty
    const spO2Penalty = Math.min(1.0, Math.max(0.0, (96 - spO2) / 20));

    // Core temp penalty (deviation from 37.0 C)
    const tempDev = Math.abs(coreTempC - 37.0);
    const tempPenalty = Math.min(1.0, tempDev / 4.0);

    // GCS penalty (15 is normal, 3 is lowest)
    const gcsPenalty = Math.min(1.0, Math.max(0.0, (15 - gcsScore) / 12));

    // GSR surge penalty
    const gsrPenalty = Math.min(1.0, Math.max(0.0, (gsrMicroSiemens - 5.0) / 25.0));

    const totalDecompensationIndex = (
      siPenalty * this.weights.shockIndexWeight +
      spO2Penalty * this.weights.hypoxemiaSpO2Weight +
      tempPenalty * this.weights.coreTempDeviationWeight +
      gcsPenalty * this.weights.gcsDeficitWeight +
      gsrPenalty * this.weights.galvanicSurgeWeight
    );

    let priorityLevel = "CATEGORY_4_MINIMAL";
    let windowOfInterventionMinutes = 360;

    if (totalDecompensationIndex >= 0.70) {
      priorityLevel = "CATEGORY_1_IMMEDIATE_LIFE_THREAT";
      windowOfInterventionMinutes = 15;
    } else if (totalDecompensationIndex >= 0.40) {
      priorityLevel = "CATEGORY_2_DELAYED_SERIOUS";
      windowOfInterventionMinutes = 60;
    } else if (totalDecompensationIndex >= 0.20) {
      priorityLevel = "CATEGORY_3_EXPECTANT_MONITORING";
      windowOfInterventionMinutes = 180;
    }

    return {
      decompensationRiskIndex: Number(totalDecompensationIndex.toFixed(3)),
      triagePriority: priorityLevel,
      recommendedInterventionWindowMinutes: windowOfInterventionMinutes,
      vitalBreakdown: {
        shockIndex: Number(si.toFixed(2)),
        spO2Pct: spO2,
        coreTempCelsius: coreTempC,
        gcs: gcsScore
      }
    };
  }
}

module.exports = {
  PREDICTIVE_SURVIVABILITY_WEIGHTS,
  CombatTriagePredictionEngine
};
