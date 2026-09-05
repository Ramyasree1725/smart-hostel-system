/**
 * @file tacticalGridMatrix.js
 * @description Military Grid Reference System 100,000-meter Square & Sector Key Matrix.
 * Covers operational military zones with predefined boundary extents, central ellipsoidal meridians,
 * false northings, false eastings, and tactical exclusion geometries.
 */

'use strict';

const TACTICAL_GRID_ZONES = [];

(function populateGridMatrix() {
  const ZONES = [
    '31N', '32N', '33N', '34N', '35N', '36N', '37N', '38N', '39N', '40N',
    '31S', '32S', '33S', '34S', '35S', '36S', '37S', '38S', '39S', '40S'
  ];

  for (let zIdx = 0; zIdx < ZONES.length; zIdx++) {
    const zoneStr = ZONES[zIdx];
    const isNorth = zoneStr.endsWith('N');
    const zoneNum = parseInt(zoneStr, 10);

    for (let sqIdx = 100; sqIdx <= 220; sqIdx++) {
      const centralLon = (zoneNum - 1) * 6 - 180 + 3;
      const baseLat = isNorth ? 10.0 + (sqIdx % 50) * 0.8 : -10.0 - (sqIdx % 50) * 0.8;

      TACTICAL_GRID_ZONES.push({
        gridIdentifier: `MGRS-${zoneStr}-${sqIdx}`,
        utmZone: zoneNum,
        hemisphere: isNorth ? 'NORTH' : 'SOUTH',
        centralMeridianDeg: centralLon,
        boundingExtent: {
          minLat: Number(baseLat.toFixed(4)),
          maxLat: Number((baseLat + 1.2).toFixed(4)),
          minLng: Number((centralLon - 2.5).toFixed(4)),
          maxLng: Number((centralLon + 2.5).toFixed(4))
        },
        falseEastingMeters: 500000.0,
        falseNorthingMeters: isNorth ? 0.0 : 10000000.0,
        scaleFactorK0: 0.9996,
        convergenceAngleDeg: Number(((centralLon - centralLon) * Math.sin(baseLat * Math.PI / 180)).toFixed(4)),
        gridDeclinationDeg: 1.25,
        tacticalStatus: (sqIdx % 10 === 0) ? 'HOSTILE_SURVEILLANCE_ACTIVE' : 'ALLIED_SECURE_CORRIDOR'
      });
    }
  }
})();

module.exports = {
  TACTICAL_GRID_ZONES
};
