/**
 * @file hrvAutonomicNervousSystemMatrix.js
 * @description Master Heart Rate Variability (HRV) Autonomic Nervous System Sympathovagal Balance Database.
 * Precomputes LF/HF power spectral densities, Poincare plot descriptors (SD1, SD2), and stress resilience scores across soldier cohorts.
 */

export const AUTONOMIC_HRV_SPECTRAL_MATRIX = [];

(function populateAutonomicMatrix() {
  const AGE_GROUPS = ['AGE_18_24', 'AGE_25_30', 'AGE_31_35', 'AGE_36_40', 'AGE_41_45'];
  const STRESS_TIERS = ['ZONE_REST_RECOVERY', 'ZONE_MILD_PATROL', 'ZONE_MODERATE_TACTICAL', 'ZONE_HIGH_COMBAT_STRESS', 'ZONE_ACUTE_FATIGUE_OVERLOAD'];

  for (let aIdx = 0; aIdx < AGE_GROUPS.length; aIdx++) {
    const ageGroup = AGE_GROUPS[aIdx];

    for (let sIdx = 0; sIdx < STRESS_TIERS.length; sIdx++) {
      const stressTier = STRESS_TIERS[sIdx];

      for (let cohort = 1; cohort <= 50; cohort++) {
        const nominalLF = 850 + (sIdx * 320) - (aIdx * 45) + (cohort % 30);
        const nominalHF = Math.max(100, 750 - (sIdx * 140) - (aIdx * 40) - (cohort % 20));
        const ratio = nominalLF / nominalHF;

        AUTONOMIC_HRV_SPECTRAL_MATRIX.push({
          matrixRecordId: `HRV-ANS-${ageGroup}-${stressTier}-C${cohort}`,
          soldierAgeBracket: ageGroup,
          combatStressZone: stressTier,
          cohortSampleId: cohort,
          lowFrequencyPowerDensityMs2: nominalLF,
          highFrequencyPowerDensityMs2: nominalHF,
          sympathovagalBalanceRatio: Number(ratio.toFixed(2)),
          poincareSD1InstantaneousVariabilityMs: Number((Math.sqrt(nominalHF * 0.5)).toFixed(1)),
          poincareSD2LongTermVariabilityMs: Number((Math.sqrt(nominalLF * 1.5)).toFixed(1)),
          parasympatheticToneStatus: (ratio < 1.0) ? 'OPTIMAL_RECOVERY' : (ratio < 2.5) ? 'BALANCED_READINESS' : 'SYMPATHETIC_HYPERAROUSAL',
          recommendedCombatRestAction: (ratio > 3.0) ? 'ENFORCE_TACTICAL_NAP_HYDRATION' : 'CONTINUE_MISSION_PROFILE'
        });
      }
    }
  }
})();
