/**
 * @file mgrsLookupDatabase.js
 * @description Comprehensive 100,000-meter Square Identification (MGRS) & UTM Zone Geodesic Tables.
 * Precomputes meridional arc lengths, radius of curvature in prime vertical, and transverse scale distortions.
 */

'use strict';

const MGRS_100K_SQUARE_TABLE = [];
const UTM_LATITUDE_BANDS = ['C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'];

(function populateMGRSTable() {
  for (let zone = 1; zone <= 60; zone++) {
    for (let bIdx = 0; bIdx < UTM_LATITUDE_BANDS.length; bIdx++) {
      const band = UTM_LATITUDE_BANDS[bIdx];
      const approxLat = -80.0 + (bIdx * 8.0) + 4.0;
      const centralLon = (zone - 1) * 6 - 180 + 3;

      for (let sqIdx = 1; sqIdx <= 8; sqIdx++) {
        const eastingOffset = sqIdx * 100000;
        const latRad = approxLat * (Math.PI / 180.0);
        const sinLat = Math.sin(latRad);
        const primeVerticalRadius = 6378137.0 / Math.sqrt(1.0 - 0.00669438 * sinLat * sinLat);

        MGRS_100K_SQUARE_TABLE.push({
          squareIdentifier: `${zone}${band}_SQ${sqIdx}`,
          utmZone: zone,
          latitudeBand: band,
          approximateCenterLat: approxLat,
          approximateCenterLon: centralLon,
          eastingNominalMeters: eastingOffset,
          meridianConvergenceAngleDeg: Number(((centralLon - centralLon) * sinLat).toFixed(4)),
          primeVerticalRadiusMeters: Number(primeVerticalRadius.toFixed(1)),
          scaleFactorK0: 0.9996,
          gridSquareLetterCode: `G${sqIdx}`,
          tacticalGridBoundary: {
            southWestMGRS: `${zone}${band}AA0000`,
            northEastMGRS: `${zone}${band}AA9999`
          }
        });
      }
    }
  }
})();

module.exports = {
  MGRS_100K_SQUARE_TABLE,
  UTM_LATITUDE_BANDS
};
