/**
 * @file radioFrequencyProfiles.js
 * @description Military Tactical Radio Frequency Spectrum Allocation, Antenna Radiation Profiles,
 * and Environmental Terrain Atmospheric Attenuation Matrices (ITU-R P.838 / P.676).
 */

'use strict';

const RF_PROPAGATION_PROFILES = [];
const TERRAIN_TYPES = ['URBAN_DENSE', 'JUNGLE_CANOPY', 'DESERT_OPEN', 'MOUNTAINOUS_ROCK', 'SUBURBAN', 'MARITIME_COASTAL'];
const WEATHER_CONDITIONS = ['CLEAR_ATMOSPHERE', 'LIGHT_RAIN', 'HEAVY_MONSOON', 'DENSE_FOG', 'SANDSTORM'];

(function populateRFProfiles() {
  for (let tIdx = 0; tIdx < TERRAIN_TYPES.length; tIdx++) {
    const terrain = TERRAIN_TYPES[tIdx];

    for (let wIdx = 0; wIdx < WEATHER_CONDITIONS.length; wIdx++) {
      const weather = WEATHER_CONDITIONS[wIdx];

      for (let channel = 1; channel <= 120; channel++) {
        const freqMhz = 860.0 + (channel * 0.75);
        const rainAttenuationDbPerKm = (wIdx === 2) ? 1.45 : (wIdx === 1) ? 0.35 : 0.05;
        const foliagePenetrationLossDb = (tIdx === 1) ? 12.5 : (tIdx === 0) ? 18.0 : 2.0;

        RF_PROPAGATION_PROFILES.push({
          profileId: `RF-${terrain}-${weather}-CH${channel}`,
          terrainClassification: terrain,
          weatherCondition: weather,
          carrierFreqMhz: Number(freqMhz.toFixed(3)),
          basePathLossExponent: 2.7 + (tIdx * 0.25),
          foliageLossDb: foliagePenetrationLossDb,
          atmosphericAttenuationDbPerKm: Number(rainAttenuationDbPerKm.toFixed(3)),
          multipathDelaySpreadNs: 50 + (tIdx * 80),
          coherenceBandwidthKhz: Math.round(1000 / (1 + tIdx * 0.8)),
          dopplerSpreadHzAt50Kmh: Number(((50 / 3.6) * (freqMhz * 1e6 / 3e8)).toFixed(2)),
          recommendedModulation: (tIdx === 1 || wIdx >= 2) ? 'BPSK_ROBUST' : 'QPSK_TURBO',
          effectiveRangeMeters: Math.max(300, Math.round(5000 / (1 + (tIdx * 0.4) + (wIdx * 0.3))))
        });
      }
    }
  }
})();

module.exports = {
  RF_PROPAGATION_PROFILES,
  TERRAIN_TYPES,
  WEATHER_CONDITIONS
};
