/**
 * @file combatMultiModalPhysiologyMatrixExtended.js
 * @description Multi-Variate Combat Physiological Dynamics Matrix, Autonomic Nervous System Sympathovagal Balance (LF/HF Ratio),
 * Microvascular Perfusion Index (PI), and Extreme Environmental Stress Response Models.
 */

const PHYSIOLOGICAL_TACTICAL_STRESS_PROFILES = [
  {
    profileId: "BASELINE_RESTING_DORMANT",
    metabolicRateMets: 1.0,
    hrvSdnnMs: { min: 45, nominal: 65, max: 95 },
    hrvRmssdMs: { min: 35, nominal: 52, max: 80 },
    hrvLfHfRatio: { min: 0.8, nominal: 1.2, max: 1.8 },
    pulseWaveVelocityMps: { min: 5.5, nominal: 6.8, max: 7.5 },
    skinConductanceLevelUs: { min: 1.5, nominal: 3.2, max: 4.8 },
    respiratorySinusArrhythmiaAmpMs: { min: 60, nominal: 120, max: 180 },
    cortisolEstimateNmolL: { min: 140, nominal: 220, max: 350 },
    catecholamineAdrenalinePgMl: { min: 20, nominal: 45, max: 70 }
  },
  {
    profileId: "URBAN_PATROL_VIGILANT",
    metabolicRateMets: 3.5,
    hrvSdnnMs: { min: 30, nominal: 45, max: 60 },
    hrvRmssdMs: { min: 20, nominal: 32, max: 45 },
    hrvLfHfRatio: { min: 2.0, nominal: 3.2, max: 4.5 },
    pulseWaveVelocityMps: { min: 6.8, nominal: 7.9, max: 8.8 },
    skinConductanceLevelUs: { min: 4.5, nominal: 7.8, max: 11.2 },
    respiratorySinusArrhythmiaAmpMs: { min: 30, nominal: 60, max: 90 },
    cortisolEstimateNmolL: { min: 280, nominal: 420, max: 580 },
    catecholamineAdrenalinePgMl: { min: 60, nominal: 120, max: 200 }
  },
  {
    profileId: "ACTIVE_FIREFIGHT_DIRECT_ENGAGEMENT",
    metabolicRateMets: 8.5,
    hrvSdnnMs: { min: 12, nominal: 18, max: 28 },
    hrvRmssdMs: { min: 8, nominal: 12, max: 18 },
    hrvLfHfRatio: { min: 5.0, nominal: 8.5, max: 14.0 },
    pulseWaveVelocityMps: { min: 9.0, nominal: 11.2, max: 13.5 },
    skinConductanceLevelUs: { min: 12.0, nominal: 22.5, max: 38.0 },
    respiratorySinusArrhythmiaAmpMs: { min: 5, nominal: 15, max: 25 },
    cortisolEstimateNmolL: { min: 600, nominal: 950, max: 1400 },
    catecholamineAdrenalinePgMl: { min: 350, nominal: 750, max: 1800 }
  },
  {
    profileId: "POST_CONCUSSION_BLAST_OVERPRESSURE",
    metabolicRateMets: 2.0,
    hrvSdnnMs: { min: 15, nominal: 22, max: 32 },
    hrvRmssdMs: { min: 10, nominal: 16, max: 24 },
    hrvLfHfRatio: { min: 3.5, nominal: 6.0, max: 9.0 },
    pulseWaveVelocityMps: { min: 8.0, nominal: 9.5, max: 11.0 },
    skinConductanceLevelUs: { min: 8.0, nominal: 14.0, max: 22.0 },
    respiratorySinusArrhythmiaAmpMs: { min: 10, nominal: 25, max: 40 },
    cortisolEstimateNmolL: { min: 500, nominal: 800, max: 1100 },
    catecholamineAdrenalinePgMl: { min: 200, nominal: 450, max: 800 }
  },
  {
    profileId: "HIGH_ALTITUDE_HYPOXIA_4000M",
    metabolicRateMets: 4.0,
    hrvSdnnMs: { min: 20, nominal: 32, max: 45 },
    hrvRmssdMs: { min: 14, nominal: 22, max: 30 },
    hrvLfHfRatio: { min: 2.5, nominal: 4.2, max: 6.5 },
    pulseWaveVelocityMps: { min: 7.5, nominal: 8.8, max: 10.2 },
    skinConductanceLevelUs: { min: 3.0, nominal: 5.5, max: 8.5 },
    respiratorySinusArrhythmiaAmpMs: { min: 20, nominal: 40, max: 65 },
    cortisolEstimateNmolL: { min: 350, nominal: 550, max: 750 },
    catecholamineAdrenalinePgMl: { min: 100, nominal: 220, max: 400 }
  }
];

class CombatMultiModalPhysiologyEngine {
  constructor() {
    this.profiles = PHYSIOLOGICAL_TACTICAL_STRESS_PROFILES;
  }

  calculateAutonomicSympathovagalTone(sdnn, rmssd, lfPower, hfPower) {
    const lfHfRatio = hfPower > 0 ? lfPower / hfPower : 5.0;
    let toneState = "BALANCED_PARASYMPATHETIC_DOMINANT";

    if (lfHfRatio > 6.0 || sdnn < 20) {
      toneState = "ACUTE_SYMPATHETIC_OVERDRIVE_PANIC_COMBAT";
    } else if (lfHfRatio > 2.5) {
      toneState = "HEIGHTENED_TACTICAL_AROUSAL";
    }

    return {
      lfHfRatio: Number(lfHfRatio.toFixed(2)),
      autonomicToneState: toneState,
      parasympatheticIndexRmssd: rmssd,
      overallVariabilitySdnn: sdnn
    };
  }

  detectBlastWaveInducedCardiorespiratoryReflex(hrDropBpm, bpDropMmhg, apneaSeconds) {
    const isJarischBezoldActive = hrDropBpm >= 25 && bpDropMmhg >= 20 && apneaSeconds >= 4;
    return {
      vagalBradycardiaReflexTriggered: isJarischBezoldActive,
      heartRateDrop: hrDropBpm,
      bloodPressureDrop: bpDropMmhg,
      apneaDurationSeconds: apneaSeconds,
      urgencyLevel: isJarischBezoldActive ? "CRITICAL_BLAST_TRAUMA_ALERT" : "NORMAL_RESPONSIVENESS"
    };
  }
}

module.exports = {
  PHYSIOLOGICAL_TACTICAL_STRESS_PROFILES,
  CombatMultiModalPhysiologyEngine
};
