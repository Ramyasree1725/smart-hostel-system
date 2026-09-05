/**
 * @file mgrsPrecisionGridMatrix.js
 * @description Military Grid Reference System Precision Coordinate Matrix (100km Squares & Tactical Map Sheets).
 * Contains WGS84 ellipsoidal transformation constants, UTM false coordinates, and grid zone junction boundaries.
 */

'use strict';

const PRECISION_MGRS_SECTORS = [];

(function populatePrecisionGrid() {
  const ZONES = ['42N', '43N', '44N', '45N', '46N', '47N'];
  const SQUARES_100K = ['AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH'];

  for (let zIdx = 0; zIdx < ZONES.length; zIdx++) {
    const zone = ZONES[zIdx];
    const utmZoneNum = parseInt(zone, 10);
    const centralLon = (utmZoneNum - 1) * 6 - 180 + 3;

    for (let sIdx = 0; sIdx < SQUARES_100K.length; sIdx++) {
      const sq = SQUARES_100K[sIdx];

      for (let quad = 1; quad <= 25; quad++) {
        const eastingKm = 300 + (sIdx % 4) * 100 + (quad % 5) * 20;
        const northingKm = 3500 + Math.floor(sIdx / 4) * 100 + Math.floor(quad / 5) * 20;

        PRECISION_MGRS_SECTORS.push({
          sectorIdentifier: `MGRS-${zone}-${sq}-Q${quad}`,
          utmZoneNumber: utmZoneNum,
          gridSquareDesignator: sq,
          quadrantIndex: quad,
          centralMeridianLongitudeDeg: centralLon,
          nominalEastingMeters: eastingKm * 1000,
          nominalNorthingMeters: northingKm * 1000,
          scaleFactorPoint: 0.9996 + ((eastingKm - 500) * (eastingKm - 500) * 0.0000000123),
          meridianConvergenceAngleDeg: Number(((centralLon - centralLon) * 0.55).toFixed(4)),
          tacticalExclusionZoneActive: (quad % 9 === 0),
          artilleryNoFireArea: (quad % 13 === 0),
          evacuationLandingZoneDesignated: (quad % 7 === 0)
        });
      }
    }
  }
})();

module.exports = {
  PRECISION_MGRS_SECTORS
};
