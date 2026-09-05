/**
 * @file defenseMatrixLookups.js
 * @description Comprehensive Military Tactical Mesh Defense Tables, Sector Grid Reference Tables,
 * Frequency Plans, Radio Network Hierarchies, and Tactical Call-sign Allocations.
 */

'use strict';

const DEFENSE_SECTORS = [];
const GRID_ZONES = ['32U', '33U', '34U', '35U', '36U', '37U', '38U', '39U', '40U', '41U', '42U', '43U'];
const FREQUENCY_BANDS = ['VHF_TACTICAL', 'UHF_LINE_OF_SIGHT', 'SHF_SATCOM', 'HF_BLOS_ALE', 'MICROWAVE_RELAY'];
const CIPHER_SUITES = ['AES-256-GCM', 'CHACHA20-POLY1305', 'TACTICAL-SPECK-128', 'SIMON-64/128'];

// Populate comprehensive tactical sector grid matrix (2,000+ defense nodes)
(function populateDefenseMatrix() {
  for (let zoneIdx = 0; zoneIdx < GRID_ZONES.length; zoneIdx++) {
    const zone = GRID_ZONES[zoneIdx];
    for (let sectorId = 100; sectorId <= 350; sectorId++) {
      const freqIdx = (zoneIdx + sectorId) % FREQUENCY_BANDS.length;
      const cipherIdx = (zoneIdx * 3 + sectorId) % CIPHER_SUITES.length;

      DEFENSE_SECTORS.push({
        sectorCode: `SEC-${zone}-${sectorId}`,
        gridZone: zone,
        centerMGRS: `${zone}MD${sectorId * 2}10`,
        carrierFrequencyMhz: Number((902.0 + ((sectorId % 50) * 0.5)).toFixed(2)),
        frequencyBand: FREQUENCY_BANDS[freqIdx],
        encryptionSuite: CIPHER_SUITES[cipherIdx],
        operationalStatus: (sectorId % 7 === 0) ? 'ACTIVE_CONTESTED' : 'OPERATIONAL_SECURE',
        maxRelayHops: (sectorId % 4) + 4,
        beaconIntervalMs: (sectorId % 3 === 0) ? 2000 : 5000,
        gatewayNodes: [
          `FOB-ALPHA-${zoneIdx + 1}`,
          `RELAY-TOWER-${sectorId % 10 + 1}`,
          `DRONE-ORBITAL-${sectorId % 5 + 1}`
        ],
        echelonDesignation: (sectorId % 5 === 0) ? 'PLATOON_HQ' : 'SQUAD_TACTICAL',
        elevationDatumMeters: 450 + (sectorId * 3) % 1200,
        rfPropagationProfile: {
          pathLossExponent: 2.8 + ((sectorId % 10) * 0.1),
          shadowingStdDev: 3.5 + ((sectorId % 5) * 0.5),
          antennaGainDbi: 5.5,
          polarization: 'VERTICAL'
        },
        triageEvacCorridor: `CORRIDOR-${zone}-${(sectorId % 12) + 1}`,
        weatherClassification: (sectorId % 8 === 0) ? 'FOG_RAIN' : 'CLEAR'
      });
    }
  }
})();

module.exports = {
  DEFENSE_SECTORS,
  GRID_ZONES,
  FREQUENCY_BANDS,
  CIPHER_SUITES
};
