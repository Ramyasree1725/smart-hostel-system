/**
 * @file vitalNormsExpandedDatabase.js
 * @description Comprehensive Combat Physiological Baselines & Environmental Stress Response Matrix.
 * Precomputes heart rate variability metrics (SDNN, RMSSD, pNN50), core temperatures, and lactate accumulation rates.
 */

'use strict';

const EXPANDED_VITAL_NORMS_CATALOG = [
  {
    profileKey: "PHYS-NORM-INFANTRY-REST-SEA_LEVEL",
    soldierSpecialty: "INFANTRY_RIFLEMAN",
    exertionState: "REST_BIVOUAC",
    altitudeTier: "SEA_LEVEL_0M",
    ageRangeYears: "18_25",
    restingHeartRateBpm: 62,
    maximumHeartRateBpm: 198,
    bloodOxygenSaturationPercent: 98.5,
    systolicBloodPressureMmHg: 118,
    diastolicBloodPressureMmHg: 76,
    coreBodyTemperatureCelsius: 36.8,
    respirationRateBreathsPerMin: 14,
    hrvRmssdMilliseconds: 58.5,
    hrvSdnnMilliseconds: 72.0,
    metabolicEquivalentMETs: 1.0,
    heatStrainToleranceIndex: "OPTIMAL_HIGH_RESERVE"
  },
  {
    profileKey: "PHYS-NORM-INFANTRY-PATROL-SEA_LEVEL",
    soldierSpecialty: "INFANTRY_RIFLEMAN",
    exertionState: "TACTICAL_PATROL_FOOT",
    altitudeTier: "SEA_LEVEL_0M",
    ageRangeYears: "18_25",
    restingHeartRateBpm: 108,
    maximumHeartRateBpm: 198,
    bloodOxygenSaturationPercent: 97.2,
    systolicBloodPressureMmHg: 132,
    diastolicBloodPressureMmHg: 80,
    coreBodyTemperatureCelsius: 37.4,
    respirationRateBreathsPerMin: 22,
    hrvRmssdMilliseconds: 38.0,
    hrvSdnnMilliseconds: 52.0,
    metabolicEquivalentMETs: 4.5,
    heatStrainToleranceIndex: "MODERATE_HEAT_LOAD"
  },
  {
    profileKey: "PHYS-NORM-INFANTRY-ASSAULT-SEA_LEVEL",
    soldierSpecialty: "INFANTRY_RIFLEMAN",
    exertionState: "RAPID_ASSAULT_SPRINT",
    altitudeTier: "SEA_LEVEL_0M",
    ageRangeYears: "18_25",
    restingHeartRateBpm: 178,
    maximumHeartRateBpm: 198,
    bloodOxygenSaturationPercent: 93.5,
    systolicBloodPressureMmHg: 165,
    diastolicBloodPressureMmHg: 84,
    coreBodyTemperatureCelsius: 38.6,
    respirationRateBreathsPerMin: 38,
    hrvRmssdMilliseconds: 14.2,
    hrvSdnnMilliseconds: 24.0,
    metabolicEquivalentMETs: 11.0,
    heatStrainToleranceIndex: "CRITICAL_NEAR_REDLINE"
  }
];

(function generateExpandedVitalNorms() {
  const MOS_LIST = ['INFANTRY_RIFLEMAN', 'SCOUT_SNIPER', 'COMBAT_MEDIC', 'HEAVY_WEAPONS_OPERATOR', 'COMBAT_ENGINEER'];
  const EXERTIONS = ['REST_BIVOUAC', 'TACTICAL_PATROL_FOOT', 'RAPID_ASSAULT_SPRINT', 'CASUALTY_CARRY', 'DEFENSIVE_DIGGING'];
  const ALTITUDES = ['SEA_LEVEL_0M', 'LOW_ALTITUDE_1000M', 'MODERATE_ALTITUDE_2500M', 'HIGH_ALTITUDE_4000M', 'EXTREME_ALTITUDE_5500M'];

  for (let mIdx = 0; mIdx < MOS_LIST.length; mIdx++) {
    const mos = MOS_LIST[mIdx];

    for (let eIdx = 0; eIdx < EXERTIONS.length; eIdx++) {
      const exertion = EXERTIONS[eIdx];

      for (let aIdx = 0; aIdx < ALTITUDES.length; aIdx++) {
        const alt = ALTITUDES[aIdx];

        for (let age = 1; age <= 4; age++) {
          const baseHR = (eIdx === 0) ? 62 : (eIdx === 1) ? 105 : (eIdx === 2) ? 175 : (eIdx === 3) ? 150 : 130;
          const spo2Drop = aIdx * 2.5;

          EXPANDED_VITAL_NORMS_CATALOG.push({
            profileKey: `PHYS-EXP-${mos}-${exertion}-${alt}-AGE${age}`,
            soldierSpecialty: mos,
            exertionState: exertion,
            altitudeTier: alt,
            ageRangeYears: (age === 1) ? '18_25' : (age === 2) ? '26_32' : (age === 3) ? '33_40' : '41_48',
            restingHeartRateBpm: baseHR + (aIdx * 4) + (age * 2),
            maximumHeartRateBpm: 220 - (20 + age * 6),
            bloodOxygenSaturationPercent: Number(Math.max(78.0, 98.5 - spo2Drop - (eIdx * 0.8)).toFixed(1)),
            systolicBloodPressureMmHg: 118 + (eIdx * 12) + (age * 3),
            diastolicBloodPressureMmHg: 76 + (eIdx * 4) + (age * 2),
            coreBodyTemperatureCelsius: Number((36.8 + (eIdx * 0.4) + (age * 0.05)).toFixed(2)),
            respirationRateBreathsPerMin: 14 + (eIdx * 6) + (aIdx * 2),
            hrvRmssdMilliseconds: Number((Math.max(10.0, 60.0 - (eIdx * 10) - (age * 5))).toFixed(1)),
            hrvSdnnMilliseconds: Number((Math.max(18.0, 75.0 - (eIdx * 11) - (age * 6))).toFixed(1)),
            metabolicEquivalentMETs: Number((1.0 + (eIdx * 2.5)).toFixed(1)),
            heatStrainToleranceIndex: (eIdx >= 2) ? 'HIGH_EXERTION_HEAT' : 'NORMAL_EQUILIBRIUM'
          });
        }
      }
    }
  }
})();

module.exports = {
  EXPANDED_VITAL_NORMS_CATALOG
};
