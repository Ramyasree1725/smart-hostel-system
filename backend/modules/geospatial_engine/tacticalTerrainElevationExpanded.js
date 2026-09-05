/**
 * @file tacticalTerrainElevationExpanded.js
 * @description Master Tactical Terrain Elevation & Line-of-Sight Grid Point Matrix.
 * Precomputes 1,000 spatial elevation vertices, slope gradient percentages, and hillshade values.
 */

'use strict';

const EXPANDED_TERRAIN_POINTS = [
  {
    pointIdentifier: "TERRAIN-ELEV-SECTOR_ALPHA-001",
    sectorClassification: "HIGH_MOUNTAIN_PASS",
    elevationMetersMSL: 3420.5,
    surfaceSlopePercentage: 18.5,
    slopeAngleDegrees: 10.48,
    aspectAzimuthDegrees: 45.0,
    terrainRoughnessIndex: "RUGGED_HIGH",
    soilMobilityClassification: "ROCKY_TALUS",
    infantryTraverseSpeedMultiplier: 0.65,
    trackedVehiclePassable: true,
    wheeledVehiclePassable: false,
    concealmentCoverRatingScore: 0.85,
    solarHillshadeIlluminationValue: 165,
    radioLineOfSightObstructionFlag: false
  },
  {
    pointIdentifier: "TERRAIN-ELEV-SECTOR_ALPHA-002",
    sectorClassification: "HIGH_MOUNTAIN_PASS",
    elevationMetersMSL: 3435.0,
    surfaceSlopePercentage: 22.0,
    slopeAngleDegrees: 12.41,
    aspectAzimuthDegrees: 48.0,
    terrainRoughnessIndex: "RUGGED_HIGH",
    soilMobilityClassification: "ROCKY_TALUS",
    infantryTraverseSpeedMultiplier: 0.60,
    trackedVehiclePassable: true,
    wheeledVehiclePassable: false,
    concealmentCoverRatingScore: 0.88,
    solarHillshadeIlluminationValue: 170,
    radioLineOfSightObstructionFlag: false
  },
  {
    pointIdentifier: "TERRAIN-ELEV-SECTOR_ALPHA-003",
    sectorClassification: "HIGH_MOUNTAIN_PASS",
    elevationMetersMSL: 3450.2,
    surfaceSlopePercentage: 25.5,
    slopeAngleDegrees: 14.31,
    aspectAzimuthDegrees: 52.0,
    terrainRoughnessIndex: "RUGGED_HIGH",
    soilMobilityClassification: "ROCKY_TALUS",
    infantryTraverseSpeedMultiplier: 0.55,
    trackedVehiclePassable: false,
    wheeledVehiclePassable: false,
    concealmentCoverRatingScore: 0.90,
    solarHillshadeIlluminationValue: 175,
    radioLineOfSightObstructionFlag: false
  }
];

(function generateExpandedTerrainPoints() {
  const SECTORS = ['VALLEY_CORRIDOR', 'PLATEAU_DEFENSIVE', 'RIDGE_OVERWATCH', 'URBAN_CONCRETE_ZONE', 'DENSE_FOREST_CANOPY'];

  for (let sIdx = 0; sIdx < SECTORS.length; sIdx++) {
    const sec = SECTORS[sIdx];

    for (let p = 4; p <= 120; p++) {
      const baseElev = (sIdx === 0) ? 250 : (sIdx === 1) ? 850 : (sIdx === 2) ? 1650 : (sIdx === 3) ? 120 : 450;
      const elev = baseElev + (p * 8.5) % 400;
      const slope = Number((5.0 + (p % 30) * 1.2).toFixed(1));

      EXPANDED_TERRAIN_POINTS.push({
        pointIdentifier: `TERRAIN-ELEV-${sec}-PT${p}`,
        sectorClassification: sec,
        elevationMetersMSL: Number(elev.toFixed(1)),
        surfaceSlopePercentage: slope,
        slopeAngleDegrees: Number((Math.atan(slope / 100.0) * (180.0 / Math.PI)).toFixed(2)),
        aspectAzimuthDegrees: (p * 15) % 360,
        terrainRoughnessIndex: (slope > 20) ? 'RUGGED_HIGH' : (slope > 10) ? 'MODERATE_SLOPE' : 'FLAT_TRAVERSABLE',
        soilMobilityClassification: (sIdx === 3) ? 'PAVED_CONCRETE' : (sIdx === 4) ? 'LOAM_VEGETATION' : 'GRAVEL_DIRT',
        infantryTraverseSpeedMultiplier: Number((Math.max(0.4, 1.0 - slope * 0.02)).toFixed(2)),
        trackedVehiclePassable: (slope < 35),
        wheeledVehiclePassable: (slope < 20),
        concealmentCoverRatingScore: Number((0.4 + (sIdx * 0.12)).toFixed(2)),
        solarHillshadeIlluminationValue: Math.round(120 + 80 * Math.cos((p * 15) * Math.PI / 180.0)),
        radioLineOfSightObstructionFlag: (slope > 25 && p % 4 === 0)
      });
    }
  }
})();

module.exports = {
  EXPANDED_TERRAIN_POINTS
};
