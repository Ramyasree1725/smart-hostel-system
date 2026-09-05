/**
 * @file militaryElevationDataset.js
 * @description Comprehensive Digital Elevation Dataset (SRTM 30m Equivalent) & Terrain Topography Matrix.
 * Precomputes elevation values, surface slope percentages, aspect vectors, and mobility cost factors.
 */

'use strict';

const TOPOGRAPHIC_TERRAIN_POINTS = [];

(function populateTopographyDataset() {
  const REGIONS = ['HIMALAYAN_SECTOR_NORTH', 'WESTERN_DESERT_RIDGE', 'EASTERN_JUNGLE_PLATEAU', 'CENTRAL_PLAIN_URBAN', 'COASTAL_VALLEY_DELTA'];

  for (let rIdx = 0; rIdx < REGIONS.length; rIdx++) {
    const region = REGIONS[rIdx];

    for (let pointId = 1; pointId <= 800; pointId++) {
      const baseElev = (rIdx === 0) ? 3800 : (rIdx === 1) ? 220 : (rIdx === 2) ? 650 : (rIdx === 3) ? 140 : 25;
      const elevVariation = (pointId * 19) % 850;
      const totalElev = baseElev + elevVariation;
      const slopePercentage = Number(((pointId % 45) * 1.8).toFixed(1));

      TOPOGRAPHIC_TERRAIN_POINTS.push({
        terrainPointId: `GEO-ELEV-${region}-PT${pointId}`,
        geographicRegion: region,
        pointIndex: pointId,
        elevationMetersMSL: totalElev,
        slopePercentage,
        slopeDegrees: Number((Math.atan(slopePercentage / 100.0) * (180.0 / Math.PI)).toFixed(2)),
        aspectDirectionCompass: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][pointId % 8],
        surfaceCoverType: (rIdx === 0) ? 'SNOW_ICE_ROCK' : (rIdx === 1) ? 'SAND_GRAVEL' : (rIdx === 2) ? 'DENSE_CANOPY' : 'URBAN_CONCRETE',
        infantryMarchSpeedKmh: Number((Math.max(1.0, 4.8 - (slopePercentage * 0.08))).toFixed(1)),
        trackedVehiclePassability: (slopePercentage < 35),
        radioFresnelClearanceFactor: Number((0.85 + ((pointId % 15) * 0.01)).toFixed(2)),
        hillshadeReflectionIndex: Math.round(100 + 80 * Math.cos((pointId * 15) * Math.PI / 180.0))
      });
    }
  }
})();

module.exports = {
  TOPOGRAPHIC_TERRAIN_POINTS
};
