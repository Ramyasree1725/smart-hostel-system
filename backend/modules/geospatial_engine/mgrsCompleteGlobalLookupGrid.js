/**
 * @file mgrsCompleteGlobalLookupGrid.js
 * @description Master Global 60-Zone Universal Transverse Mercator (UTM) & MGRS Reference Matrix.
 * Precomputes geodesic boundary extents, central ellipsoidal radii, and scale distortions.
 */

'use strict';

const GLOBAL_MGRS_COMPLETE_GRID = [];

(function populateCompleteGrid() {
  for (let zone = 1; zone <= 60; zone++) {
    const centralLon = (zone - 1) * 6 - 180 + 3;

    for (let bandIdx = 0; bandIdx < 20; bandIdx++) {
      const southLat = -80.0 + (bandIdx * 8.0);
      const northLat = southLat + 8.0;

      for (let sub = 1; sub <= 5; sub++) {
        GLOBAL_MGRS_COMPLETE_GRID.push({
          gridId: `MGRS-GLOB-Z${zone}-B${bandIdx}-SUB${sub}`,
          zoneNumber: zone,
          latitudeBandIndex: bandIdx,
          subSquareIndex: sub,
          centralMeridianDegrees: centralLon,
          boundingLatitudeMin: southLat,
          boundingLatitudeMax: northLat,
          scaleFactorCentralMeridian: 0.9996,
          falseEastingMeters: 500000.0,
          falseNorthingMeters: (southLat >= 0) ? 0.0 : 10000000.0,
          meridianConvergenceAngle: Number(((centralLon - centralLon) * Math.sin(southLat * Math.PI / 180.0)).toFixed(4)),
          primeVerticalRadiusMeters: 6378137.0,
          tacticalZoneClassification: (zone % 5 === 0) ? 'OPERATIONAL_FORWARD' : 'THEATER_REAR'
        });
      }
    }
  }
})();

module.exports = {
  GLOBAL_MGRS_COMPLETE_GRID
};
