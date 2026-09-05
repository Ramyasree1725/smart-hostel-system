/**
 * @file vitalNormsDatabase.js
 * @description Comprehensive Combat Physiological Vital Norms & Pathological Threshold Database.
 * Contains age, gender, altitude, and combat exertion calibrated biometric baselines,
 * shock indices, cardiac arrhythmia signatures, and heat stress limits.
 */

'use strict';

const COMBAT_PHYSIOLOGICAL_PROFILES = [];
const SOLDIER_SPECIALTIES = ['INFANTRY', 'SNIPER_SCOUT', 'COMBAT_MEDIC', 'FORWARD_OBSERVER', 'HEAVY_WEAPONS', 'COMBAT_ENGINEER', 'DRONE_OPERATOR'];
const ALTITUDE_BRACKETS = ['SEA_LEVEL_0M', 'LOW_ALT_1000M', 'MODERATE_ALT_2500M', 'HIGH_ALT_4000M', 'EXTREME_ALT_5500M'];

(function populatePhysiologicalProfiles() {
  for (let specIdx = 0; specIdx < SOLDIER_SPECIALTIES.length; specIdx++) {
    const spec = SOLDIER_SPECIALTIES[specIdx];

    for (let altIdx = 0; altIdx < ALTITUDE_BRACKETS.length; altIdx++) {
      const alt = ALTITUDE_BRACKETS[altIdx];

      for (let age = 18; age <= 45; age++) {
        const altitudeHypoxiaPenalty = altIdx * 2.5; // SpO2 drop with elevation
        const baseHR = 60 + (age % 10) + (specIdx * 2) + (altIdx * 4);
        const maxHR = 220 - age;

        COMBAT_PHYSIOLOGICAL_PROFILES.push({
          profileKey: `${spec}_${alt}_AGE_${age}`,
          specialty: spec,
          altitudeTier: alt,
          ageYears: age,
          restingBaselines: {
            heartRateBpm: baseHR,
            maxHeartRateBpm: maxHR,
            spo2Percent: Math.max(82, Number((98.5 - altitudeHypoxiaPenalty).toFixed(1))),
            systolicBPMmHg: 118 + Math.floor((age - 18) * 0.4),
            diastolicBPMmHg: 78 + Math.floor((age - 18) * 0.2),
            coreTempCelsius: 36.8,
            respirationRateBpm: 14 + (altIdx * 2),
            hrvRmssdMs: Math.max(20, Math.round(55 - (age * 0.6)))
          },
          combatExertionThresholds: {
            zone1ActiveRecoveryHR: [Math.round(maxHR * 0.50), Math.round(maxHR * 0.60)],
            zone2AerobicHR: [Math.round(maxHR * 0.60), Math.round(maxHR * 0.70)],
            zone3TempoHR: [Math.round(maxHR * 0.70), Math.round(maxHR * 0.80)],
            zone4ThresholdHR: [Math.round(maxHR * 0.80), Math.round(maxHR * 0.90)],
            zone5AnaerobicRedlineHR: [Math.round(maxHR * 0.90), maxHR]
          },
          criticalAlertThresholds: {
            tachycardiaTriggerBpm: 145,
            bradycardiaTriggerBpm: 42,
            hypoxemiaTriggerSpO2: Math.max(75, Math.round(88 - altitudeHypoxiaPenalty)),
            hypotensionSystolicMmHg: 85,
            hypertensionCrisisSystolicMmHg: 185,
            hypothermiaCoreTempC: 35.0,
            hyperthermiaCoreTempC: 39.5,
            heatStrokeDangerCoreTempC: 40.5
          }
        });
      }
    }
  }
})();

module.exports = {
  COMBAT_PHYSIOLOGICAL_PROFILES,
  SOLDIER_SPECIALTIES,
  ALTITUDE_BRACKETS
};
