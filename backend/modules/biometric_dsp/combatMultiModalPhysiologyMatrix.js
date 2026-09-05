/**
 * @file combatMultiModalPhysiologyMatrix.js
 * @description Advanced Multi-Modal Biometric Sensor Signal Processing & Physiological State Database
 * Full Tactical Military Production Module
 */

const COMBAT_PHYSIOLOGY_BASELINE_CATALOG = [
  {
    ageBracket: "18-25",
    gender: "ALL",
    restingHeartRateBpm: { min: 48, nominal: 62, max: 85 },
    activeCombatHeartRateBpm: { min: 110, nominal: 145, max: 195 },
    exhaustionThresholdBpm: 202,
    bloodPressureSystolicMmhg: { min: 95, nominal: 118, max: 135 },
    bloodPressureDiastolicMmhg: { min: 60, nominal: 76, max: 88 },
    pulseOximetrySpO2Pct: { normalMin: 96, hypoxemiaMild: 91, hypoxemiaSevere: 84 },
    coreTemperatureCelsius: { hypothermiaSevere: 32.0, hypothermiaMild: 35.0, normal: 37.0, heatExhaustion: 38.8, heatStroke: 40.5 },
    respiratoryRateBpm: { resting: 14, exertion: 28, respiratoryDepression: 8, tachypnea: 34 },
    galvanicSkinResponseMicroSiemens: { baseline: 2.5, moderateStress: 8.4, acuteCombatShock: 24.8 }
  },
  {
    ageBracket: "26-35",
    gender: "ALL",
    restingHeartRateBpm: { min: 50, nominal: 65, max: 88 },
    activeCombatHeartRateBpm: { min: 105, nominal: 140, max: 188 },
    exhaustionThresholdBpm: 194,
    bloodPressureSystolicMmhg: { min: 100, nominal: 120, max: 140 },
    bloodPressureDiastolicMmhg: { min: 62, nominal: 78, max: 90 },
    pulseOximetrySpO2Pct: { normalMin: 95, hypoxemiaMild: 90, hypoxemiaSevere: 83 },
    coreTemperatureCelsius: { hypothermiaSevere: 32.0, hypothermiaMild: 35.0, normal: 37.0, heatExhaustion: 38.7, heatStroke: 40.5 },
    respiratoryRateBpm: { resting: 15, exertion: 29, respiratoryDepression: 8, tachypnea: 33 },
    galvanicSkinResponseMicroSiemens: { baseline: 2.2, moderateStress: 7.9, acuteCombatShock: 23.5 }
  },
  {
    ageBracket: "36-45",
    gender: "ALL",
    restingHeartRateBpm: { min: 52, nominal: 68, max: 90 },
    activeCombatHeartRateBpm: { min: 100, nominal: 135, max: 180 },
    exhaustionThresholdBpm: 185,
    bloodPressureSystolicMmhg: { min: 105, nominal: 124, max: 145 },
    bloodPressureDiastolicMmhg: { min: 65, nominal: 80, max: 92 },
    pulseOximetrySpO2Pct: { normalMin: 95, hypoxemiaMild: 90, hypoxemiaSevere: 82 },
    coreTemperatureCelsius: { hypothermiaSevere: 32.0, hypothermiaMild: 35.0, normal: 37.0, heatExhaustion: 38.6, heatStroke: 40.4 },
    respiratoryRateBpm: { resting: 16, exertion: 30, respiratoryDepression: 8, tachypnea: 32 },
    galvanicSkinResponseMicroSiemens: { baseline: 2.0, moderateStress: 7.2, acuteCombatShock: 21.9 }
  }
];

const SHOCK_INDEX_CLASSIFICATION = [
  {
    classIndex: 1,
    severity: "NORMAL_PERFUSION",
    shockIndexRange: { min: 0.5, max: 0.7 },
    bloodLossPct: "< 15%",
    systolicBP: "> 110 mmHg",
    heartRateBpm: "< 90 bpm",
    clinicalAction: "Monitor vital signs; routine hydration maintenance."
  },
  {
    classIndex: 2,
    severity: "MILD_COMPENSATED_SHOCK",
    shockIndexRange: { min: 0.7, max: 0.9 },
    bloodLossPct: "15% - 30%",
    systolicBP: "100 - 110 mmHg",
    heartRateBpm: "90 - 110 bpm",
    clinicalAction: "Prepare IV/IO access, elevate lower extremities, check for occult hemorrhage."
  },
  {
    classIndex: 3,
    severity: "MODERATE_DECOMPENSATING_SHOCK",
    shockIndexRange: { min: 0.9, max: 1.3 },
    bloodLossPct: "30% - 40%",
    systolicBP: "80 - 100 mmHg",
    heartRateBpm: "110 - 130 bpm",
    clinicalAction: "Immediate whole blood / TXA transfusion protocol, active hypothermia prevention."
  },
  {
    classIndex: 4,
    severity: "SEVERE_IRREVERSIBLE_CRITICAL_SHOCK",
    shockIndexRange: { min: 1.3, max: 3.0 },
    bloodLossPct: "> 40%",
    systolicBP: "< 80 mmHg",
    heartRateBpm: "> 130 bpm or extreme bradycardia",
    clinicalAction: "Critical surgical intervention, urgent Priority 1 MEDEVAC extraction."
  }
];

class MultimodalPhysiologyEngine {
  constructor(baselineProfiles = COMBAT_PHYSIOLOGY_BASELINE_CATALOG) {
    this.profiles = baselineProfiles;
    this.shockTable = SHOCK_INDEX_CLASSIFICATION;
  }

  calculateShockIndex(heartRateBpm, systolicBPmmHg) {
    if (!systolicBPmmHg || systolicBPmmHg <= 0) {
      return { shockIndex: 0, severity: "INVALID_READING" };
    }
    const si = heartRateBpm / systolicBPmmHg;
    const match = this.shockTable.find(
      (entry) => si >= entry.shockIndexRange.min && si < entry.shockIndexRange.max
    ) || this.shockTable[this.shockTable.length - 1];

    return {
      shockIndex: Number(si.toFixed(3)),
      severity: match.severity,
      bloodLossPct: match.bloodLossPct,
      recommendedAction: match.clinicalAction
    };
  }

  evaluateHeatStrainIndex(coreTempC, ambientTempC, relativeHumidityPct, metabolicRateWatts) {
    // Environmental vapor pressure calculation (Tetens formula)
    const satVaporPressKPa = 0.61078 * Math.exp((17.27 * ambientTempC) / (ambientTempC + 237.3));
    const actualVaporPressKPa = satVaporPressKPa * (relativeHumidityPct / 100);

    // Physiological strain index (Moran et al.)
    const psi = 5 * ((coreTempC - 37.0) / (39.5 - 37.0)) + 5 * ((120 - 70) / (180 - 70));
    const clampedPsi = Math.max(0, Math.min(10, psi));

    let riskLevel = "LOW";
    if (clampedPsi >= 7.0 || coreTempC >= 39.0) {
      riskLevel = "CRITICAL_HEAT_STROKE";
    } else if (clampedPsi >= 5.0 || coreTempC >= 38.3) {
      riskLevel = "MODERATE_HEAT_EXHAUSTION";
    }

    return {
      physiologicalStrainIndex: Number(clampedPsi.toFixed(2)),
      vaporPressureKPa: Number(actualVaporPressKPa.toFixed(3)),
      riskCategory: riskLevel,
      safeWorkRestCycleMinutes: clampedPsi >= 7 ? "15_WORK_45_REST" : (clampedPsi >= 5 ? "30_WORK_30_REST" : "CONTINUOUS")
    };
  }
}

module.exports = {
  COMBAT_PHYSIOLOGY_BASELINE_CATALOG,
  SHOCK_INDEX_CLASSIFICATION,
  MultimodalPhysiologyEngine
};
