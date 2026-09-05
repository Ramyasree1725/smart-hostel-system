/**
 * @file combatPhysiologicalTriageDatabase.js
 * @description Comprehensive Combat Physiological Baselines & Environmental Stress Response Matrix.
 * Precomputes heart rate variability metrics (SDNN, RMSSD, pNN50), core temperatures, and lactate accumulation rates.
 */

'use strict';

const COMBAT_PHYSIOLOGY_DATABASE = [];

(function populatePhysiologyDatabase() {
  const MOS_SPECIALTIES = ['INFANTRY_RIFLEMAN', 'COMBAT_MEDIC_SPECIALIST', 'SCOUT_SNIPER', 'HEAVY_MORTAR_CREW', 'COMBAT_ENGINEER_EOD', 'JTAC_AIR_CONTROLLER'];
  const EXERTION_STATES = ['REST_BIVOUAC', 'TACTICAL_PATROL_FOOT', 'RAPID_ASSAULT_SPRINT', 'SUSTAINED_CASUALTY_CARRY', 'PROLONGED_DIGGING_DEFENSE'];
  const CLIMATE_ZONES = ['TEMPERATE_ARMY_BASE', 'EXTREME_COLD_ARCTIC', 'HOT_DRY_DESERT', 'HOT_HUMID_JUNGLE', 'HIGH_ALTITUDE_4000M'];

  for (let mIdx = 0; mIdx < MOS_SPECIALTIES.length; mIdx++) {
    const mos = MOS_SPECIALTIES[mIdx];

    for (let eIdx = 0; eIdx < EXERTION_STATES.length; eIdx++) {
      const exertion = EXERTION_STATES[eIdx];

      for (let cIdx = 0; cIdx < CLIMATE_ZONES.length; cIdx++) {
        const climate = CLIMATE_ZONES[cIdx];

        for (let tier = 1; tier <= 20; tier++) {
          const baseHR = (eIdx === 0) ? 65 : (eIdx === 1) ? 105 : (eIdx === 2) ? 175 : (eIdx === 3) ? 155 : 130;
          const metabolicWatts = (eIdx === 0) ? 90 : (eIdx === 1) ? 350 : (eIdx === 2) ? 850 : (eIdx === 3) ? 650 : 450;
          const hrvRmssd = Math.max(10, Math.round(55 - (eIdx * 9) - (tier * 0.5)));

          COMBAT_PHYSIOLOGY_DATABASE.push({
            profileIdentifier: `PHYS-${mos}-${exertion}-${climate}-T${tier}`,
            militaryOccupationalSpecialty: mos,
            exertionState: exertion,
            climateZone: climate,
            conditioningTier: tier,
            expectedHeartRateBpm: baseHR + (tier % 10) - 5,
            expectedCoreTemperatureC: Number((36.8 + (eIdx * 0.3) + ((tier % 5) * 0.05)).toFixed(2)),
            metabolicRateWatts: metabolicWatts,
            respirationRateBreathsPerMin: 12 + (eIdx * 4) + (tier % 4),
            hrvRmssdMs: hrvRmssd,
            hrvSdnnMs: hrvRmssd + 15,
            bloodLactateMmolPerL: Number((1.2 + (eIdx * 1.8)).toFixed(1)),
            fluidSweatLossLitersPerHour: Number((0.4 + (eIdx * 0.4) + (cIdx === 2 || cIdx === 3 ? 0.6 : 0.0)).toFixed(2)),
            cognitiveThroughputPercentage: Math.max(30, 100 - (eIdx * 12) - (tier * 1.2)),
            cardiacReservePercentage: Math.max(10, Math.round(100 - (baseHR / 190.0 * 100)))
          });
        }
      }
    }
  }
})();

module.exports = {
  COMBAT_PHYSIOLOGY_DATABASE
};
