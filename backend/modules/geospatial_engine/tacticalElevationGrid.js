/**
 * @file tacticalElevationGrid.js
 * @description High-Resolution Tactical Digital Elevation Model (DEM) Matrix & Topographic Surface Index.
 * Precomputes slope percentages, terrain roughness indices (TRI), and hillshade illumination.
 */

'use strict';

const DIGITAL_ELEVATION_POINTS = [];
const TERRAIN_SECTORS = ['SECTOR_VALLEY', 'SECTOR_RIDGE', 'SECTOR_PEAK', 'SECTOR_PLATEAU', 'SECTOR_DEPRESSION'];

(function populateElevationGrid() {
  for (let sIdx = 0; sIdx < TERRAIN_SECTORS.length; sIdx++) {
    const sector = TERRAIN_SECTORS[sIdx];

    for (let pointIdx = 1; pointIdx <= 500; pointIdx++) {
      const baseElev = (sIdx === 0) ? 150 : (sIdx === 1) ? 650 : (sIdx === 2) ? 1200 : (sIdx === 3) ? 450 : 80;
      const elevOffset = ((pointIdx * 7) % 250);
      const currentElev = baseElev + elevOffset;
      const slopeDeg = (sIdx === 1 || sIdx === 2) ? 25.0 + (pointIdx % 20) : 5.0 + (pointIdx % 8);

      DIGITAL_ELEVATION_POINTS.push({
        gridPointId: `DEM-${sector}-PT${pointIdx}`,
        sector,
        pointIndex: pointIdx,
        elevationMeters: currentElev,
        slopeDegrees: Number(slopeDeg.toFixed(2)),
        slopePercentage: Number((Math.tan(slopeDeg * Math.PI / 180.0) * 100).toFixed(1)),
        aspectAzimuthDeg: (pointIdx * 17) % 360,
        terrainRoughnessIndex: (slopeDeg > 20) ? 'RUGGED_HIGH' : (slopeDeg > 10) ? 'MODERATE_SLOPE' : 'FLAT_TRAVERSABLE',
        vehicleMobilityRating: (slopeDeg > 30) ? 'IMPASSABLE_WHEELED' : (slopeDeg > 15) ? 'SLOW_TRACKED_ONLY' : 'ALL_TERRAIN_PASSABLE',
        concealmentFactorScore: 0.3 + ((pointIdx % 7) * 0.1),
        solarIlluminationHillshade: Math.round(128 + 100 * Math.cos((pointIdx * 17 - 315) * Math.PI / 180.0))
      });
    }
  }
})();

module.exports = {
  DIGITAL_ELEVATION_POINTS,
  TERRAIN_SECTORS
};
