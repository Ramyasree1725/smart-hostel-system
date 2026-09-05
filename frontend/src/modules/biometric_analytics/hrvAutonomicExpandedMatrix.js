/**
 * @file hrvAutonomicExpandedMatrix.js
 * @description Master Heart Rate Variability (HRV) Autonomic Nervous System Sympathovagal Balance Database.
 * Precomputes LF/HF power spectral densities, Poincare plot descriptors (SD1, SD2), and stress resilience scores across soldier cohorts.
 */

export const EXPANDED_AUTONOMIC_HRV_DATA = [
  {
    profileSampleKey: "HRV-AUTONOMIC-INFANTRY-REST-001",
    soldierRoleClassification: "INFANTRY_POINT_LEAD",
    stressEnvironmentalZone: "ZONE_OPTIMAL_RECOVERY",
    soldierAgeBracketYears: "18_24",
    lowFrequencyPowerDensityMs2: 850.5,
    highFrequencyPowerDensityMs2: 920.0,
    sympathovagalBalanceRatio: 0.92,
    poincareSD1InstantaneousVariabilityMs: 21.4,
    poincareSD2LongTermVariabilityMs: 35.7,
    parasympatheticVagalToneRating: "OPTIMAL_HIGH_RECOVERY",
    predictedCognitiveThroughputScore: 96,
    recommendedCombatAction: "FULL_MISSION_CAPABLE_NO_RESTRICTION"
  },
  {
    profileSampleKey: "HRV-AUTONOMIC-INFANTRY-PATROL-002",
    soldierRoleClassification: "INFANTRY_POINT_LEAD",
    stressEnvironmentalZone: "ZONE_MODERATE_PATROL",
    soldierAgeBracketYears: "18_24",
    lowFrequencyPowerDensityMs2: 1250.0,
    highFrequencyPowerDensityMs2: 620.0,
    sympathovagalBalanceRatio: 2.01,
    poincareSD1InstantaneousVariabilityMs: 17.6,
    poincareSD2LongTermVariabilityMs: 43.2,
    parasympatheticVagalToneRating: "MODERATE_SYMPATHETIC_LOAD",
    predictedCognitiveThroughputScore: 84,
    recommendedCombatAction: "CONTINUE_STANDARD_TACTICAL_PATROL"
  },
  {
    profileSampleKey: "HRV-AUTONOMIC-INFANTRY-COMBAT-003",
    soldierRoleClassification: "INFANTRY_POINT_LEAD",
    stressEnvironmentalZone: "ZONE_ACUTE_COMBAT_STRESS",
    soldierAgeBracketYears: "18_24",
    lowFrequencyPowerDensityMs2: 2450.0,
    highFrequencyPowerDensityMs2: 210.0,
    sympathovagalBalanceRatio: 11.67,
    poincareSD1InstantaneousVariabilityMs: 10.2,
    poincareSD2LongTermVariabilityMs: 60.5,
    parasympatheticVagalToneRating: "EXTREME_SYMPATHETIC_HYPERAROUSAL",
    predictedCognitiveThroughputScore: 62,
    recommendedCombatAction: "MONITOR_FOR_TUNNEL_VISION_AND_ACUTE_FATIGUE"
  }
];

(function generateExpandedAutonomicData() {
  const ROLES = ['SNIPER_SCOUT', 'COMBAT_MEDIC', 'HEAVY_GUNNER', 'SQUAD_LEADER', 'JTAC_CONTROLLER'];
  const ZONES = ['ZONE_BIVOUAC_REST', 'ZONE_FOOT_PATROL', 'ZONE_DIRECT_FIRE_COMBAT', 'ZONE_PROLONGED_DEFENSE', 'ZONE_POST_MISSION_DEBRIEF'];

  for (let rIdx = 0; rIdx < ROLES.length; rIdx++) {
    const role = ROLES[rIdx];

    for (let zIdx = 0; zIdx < ZONES.length; zIdx++) {
      const zone = ZONES[zIdx];

      for (let s = 4; s <= 45; s++) {
        const lf = 750 + (zIdx * 380) + (s % 20) * 15;
        const hf = Math.max(80, 850 - (zIdx * 160) - (s % 15) * 10);
        const ratio = Number((lf / hf).toFixed(2));

        EXPANDED_AUTONOMIC_HRV_DATA.push({
          profileSampleKey: `HRV-AUTONOMIC-${role}-${zone}-S${s}`,
          soldierRoleClassification: role,
          stressEnvironmentalZone: zone,
          soldierAgeBracketYears: (s % 3 === 0) ? '18_24' : (s % 3 === 1) ? '25_32' : '33_42',
          lowFrequencyPowerDensityMs2: lf,
          highFrequencyPowerDensityMs2: hf,
          sympathovagalBalanceRatio: ratio,
          poincareSD1InstantaneousVariabilityMs: Number((Math.sqrt(hf * 0.5)).toFixed(1)),
          poincareSD2LongTermVariabilityMs: Number((Math.sqrt(lf * 1.5)).toFixed(1)),
          parasympatheticVagalToneRating: (ratio < 1.2) ? 'OPTIMAL_HIGH_RECOVERY' : (ratio < 3.0) ? 'MODERATE_SYMPATHETIC_LOAD' : 'EXTREME_SYMPATHETIC_HYPERAROUSAL',
          predictedCognitiveThroughputScore: Math.max(35, Math.round(100 - ratio * 4.5)),
          recommendedCombatAction: (ratio > 5.0) ? 'ENFORCE_HYDRATION_AND_REST_ROTATION' : 'FULL_MISSION_CAPABLE_NO_RESTRICTION'
        });
      }
    }
  }
})();

module.exports = {
  EXPANDED_AUTONOMIC_HRV_DATA
};
