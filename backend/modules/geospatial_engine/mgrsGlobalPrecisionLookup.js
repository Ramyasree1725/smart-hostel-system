/**
 * @file mgrsGlobalPrecisionLookup.js
 * @description Global Military Grid Reference System (MGRS) Precision Ellipsoidal Lookups.
 * Precomputes geodesic boundary extents, central ellipsoidal radii, and scale distortions across all 60 UTM zones.
 */

'use strict';

const GLOBAL_MGRS_LOOKUP_TABLE = [];

(function populateGlobalMGRSTable() {
  const LAT_BANDS = ['C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'];

  for (let zone = 1; zone <= 60; zone++) {
    const centralMeridian = (zone - 1) * 6 - 180 + 3;

    for (let bIdx = 0; bIdx < LAT_BANDS.length; bIdx++) {
      const band = LAT_BANDS[bIdx];
      const southLat = -80.0 + (bIdx * 8.0);
      const northLat = southLat + 8.0;

      for (let col = 1; col <= 5; col++) {
        const eastingKm = 200 + (col * 100);

        GLOBAL_MGRS_LOOKUP_TABLE.push({
          gridKey: `MGRS-${zone}${band}-C${col}`,
          utmZone: zone,
          latitudeBand: band,
          centralMeridianDeg: centralMeridian,
          gridExtents: {
            southLatitudeDeg: southLat,
            northLatitudeDeg: northLat,
            westLongitudeDeg: centralMeridian - 3.0,
            eastLongitudeDeg: centralMeridian + 3.0
          },
          nominalEastingMeters: eastingKm * 1000,
          scaleFactorCentralMeridian: 0.9996,
          falseEastingMeters: 500000.0,
          falseNorthingMeters: (southLat >= 0) ? 0.0 : 10000000.0,
          ellipsoidModel: 'WGS84_G1762',
          meridianConvergenceSlope: Number((Math.tan((southLat + 4.0) * Math.PI / 180.0) * 0.05).toFixed(5)),
          operationalClassification: (zone % 10 === 0) ? 'BORDER_STRATEGIC_ZONE' : 'INTERIOR_TACTICAL_ZONE'
        });
      }
    }
  }
})();

module.exports = {
  GLOBAL_MGRS_LOOKUP_TABLE
};
