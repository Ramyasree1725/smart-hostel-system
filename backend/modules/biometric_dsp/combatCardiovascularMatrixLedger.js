/**
 * @file combatCardiovascularMatrixLedger.js
 * @description Master Database of Combat Cardiovascular & Hemodynamic Signatures
 */

const COMBAT_CARDIOVASCULAR_SIGNATURES = [
  {
    profileId: "CCV_0001",
    stateName: "NOMINAL_RESTING_HOMEODYNAMICS",
    heartRateNominalBpm: 68,
    heartRateVariabilityRmssdMs: 48.5,
    heartRateVariabilitySdnnMs: 62.0,
    systolicBloodPressureMmhg: 118,
    diastolicBloodPressureMmhg: 76,
    meanArterialPressureMmhg: 90.0,
    pulsePressureMmhg: 42,
    strokeVolumeIndexMlM2: 45.0,
    cardiacOutputLitersPerMin: 5.2,
    systemicVascularResistanceDynsCm5: 1150,
    pulseWaveVelocityMps: 6.8,
    arterialComplianceMlMmhg: 1.6,
    perfusionIndexPercent: 3.8,
    spO2Percentage: 98.5,
    respiratoryRateBreathsPerMin: 14,
    endTidalCO2Mmhg: 38.0,
    coreBodyTemperatureCelsius: 37.0,
    lactateConcentrationMmolL: 1.1,
    oxygenDeliveryIndexMlMinM2: 580,
    shockIndex: 0.58,
    modifiedShockIndex: 0.76,
    triageCategory: "CATEGORY_GREEN_FIT_FOR_DUTY",
    criticalActionGuideline: "ROUTINE_MONITORING_STANDARD_HYDRATION"
  },
  {
    profileId: "CCV_0002",
    stateName: "MODERATE_EXERTION_TACTICAL_MANEUVER",
    heartRateNominalBpm: 124,
    heartRateVariabilityRmssdMs: 24.0,
    heartRateVariabilitySdnnMs: 35.0,
    systolicBloodPressureMmhg: 142,
    diastolicBloodPressureMmhg: 82,
    meanArterialPressureMmhg: 102.0,
    pulsePressureMmhg: 60,
    strokeVolumeIndexMlM2: 52.0,
    cardiacOutputLitersPerMin: 8.8,
    systemicVascularResistanceDynsCm5: 850,
    pulseWaveVelocityMps: 8.2,
    arterialComplianceMlMmhg: 1.4,
    perfusionIndexPercent: 4.2,
    spO2Percentage: 97.0,
    respiratoryRateBreathsPerMin: 24,
    endTidalCO2Mmhg: 36.0,
    coreBodyTemperatureCelsius: 37.6,
    lactateConcentrationMmolL: 2.4,
    oxygenDeliveryIndexMlMinM2: 820,
    shockIndex: 0.87,
    modifiedShockIndex: 1.22,
    triageCategory: "CATEGORY_GREEN_FIT_FOR_DUTY",
    criticalActionGuideline: "CONTINUOUS_PATROL_MONITOR_ELECTROLYTES"
  },
  {
    profileId: "CCV_0003",
    stateName: "ACUTE_COMBAT_STRESS_SYMPATHETIC_SURGE",
    heartRateNominalBpm: 165,
    heartRateVariabilityRmssdMs: 11.2,
    heartRateVariabilitySdnnMs: 16.5,
    systolicBloodPressureMmhg: 168,
    diastolicBloodPressureMmhg: 96,
    meanArterialPressureMmhg: 120.0,
    pulsePressureMmhg: 72,
    strokeVolumeIndexMlM2: 48.0,
    cardiacOutputLitersPerMin: 10.5,
    systemicVascularResistanceDynsCm5: 1450,
    pulseWaveVelocityMps: 11.4,
    arterialComplianceMlMmhg: 1.0,
    perfusionIndexPercent: 2.1,
    spO2Percentage: 96.0,
    respiratoryRateBreathsPerMin: 32,
    endTidalCO2Mmhg: 32.0,
    coreBodyTemperatureCelsius: 38.2,
    lactateConcentrationMmolL: 4.2,
    oxygenDeliveryIndexMlMinM2: 950,
    shockIndex: 0.98,
    modifiedShockIndex: 1.38,
    triageCategory: "CATEGORY_YELLOW_HEIGHTENED_VIGILANCE",
    criticalActionGuideline: "COMBAT_BREATHING_TACTICAL_COVER_REASSESS"
  },
  {
    profileId: "CCV_0004",
    stateName: "EARLY_COMPENSATED_HEMORRHAGIC_SHOCK",
    heartRateNominalBpm: 118,
    heartRateVariabilityRmssdMs: 14.5,
    heartRateVariabilitySdnnMs: 22.0,
    systolicBloodPressureMmhg: 105,
    diastolicBloodPressureMmhg: 74,
    meanArterialPressureMmhg: 84.3,
    pulsePressureMmhg: 31,
    strokeVolumeIndexMlM2: 32.0,
    cardiacOutputLitersPerMin: 4.2,
    systemicVascularResistanceDynsCm5: 1600,
    pulseWaveVelocityMps: 7.5,
    arterialComplianceMlMmhg: 1.1,
    perfusionIndexPercent: 1.4,
    spO2Percentage: 94.5,
    respiratoryRateBreathsPerMin: 26,
    endTidalCO2Mmhg: 30.0,
    coreBodyTemperatureCelsius: 36.2,
    lactateConcentrationMmolL: 3.8,
    oxygenDeliveryIndexMlMinM2: 420,
    shockIndex: 1.12,
    modifiedShockIndex: 1.40,
    triageCategory: "CATEGORY_RED_URGENT_INTERVENTION",
    criticalActionGuideline: "APPLY_TOURNIQUET_PREPARE_TXA_INFUSION"
  },
  {
    profileId: "CCV_0005",
    stateName: "DECOMPENSATING_HEMORRHAGIC_SHOCK_CLASS_3",
    heartRateNominalBpm: 138,
    heartRateVariabilityRmssdMs: 7.8,
    heartRateVariabilitySdnnMs: 12.0,
    systolicBloodPressureMmhg: 82,
    diastolicBloodPressureMmhg: 54,
    meanArterialPressureMmhg: 63.3,
    pulsePressureMmhg: 28,
    strokeVolumeIndexMlM2: 21.0,
    cardiacOutputLitersPerMin: 2.8,
    systemicVascularResistanceDynsCm5: 1850,
    pulseWaveVelocityMps: 6.2,
    arterialComplianceMlMmhg: 0.8,
    perfusionIndexPercent: 0.6,
    spO2Percentage: 88.0,
    respiratoryRateBreathsPerMin: 36,
    endTidalCO2Mmhg: 22.0,
    coreBodyTemperatureCelsius: 35.1,
    lactateConcentrationMmolL: 7.5,
    oxygenDeliveryIndexMlMinM2: 240,
    shockIndex: 1.68,
    modifiedShockIndex: 2.18,
    triageCategory: "CATEGORY_RED_CRITICAL_PRIORITY_1",
    criticalActionGuideline: "IMMEDIATE_WHOLE_BLOOD_TRANSFUSION_9LINE_MEDEVAC"
  }
];

class CombatCardiovascularLedgerEngine {
  constructor() {
    this.signatures = COMBAT_CARDIOVASCULAR_SIGNATURES;
  }

  getSignatureByProfileId(id) {
    return this.signatures.find((s) => s.profileId === id) || this.signatures[0];
  }
}

module.exports = {
  COMBAT_CARDIOVASCULAR_SIGNATURES,
  CombatCardiovascularLedgerEngine
};
