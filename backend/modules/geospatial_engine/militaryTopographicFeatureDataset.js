/**
 * @file militaryTopographicFeatureDataset.js
 * @description Military Topographic Feature Dataset, Digital Elevation Model (DEM) Resolution Matrices,
 * Slope Gradient Classifications, and Cross-Country Mobility (CCM) Impedance Models.
 */

const TERRAIN_MOBILITY_IMPEDANCE_CATALOG = [
  {
    terrainType: "PAVED_HIGHWAY_SURFACE",
    surfaceRoughnessMeters: 0.01,
    frictionCoefficient: 0.85,
    maxWheeledSpeedKph: 110,
    maxTrackedSpeedKph: 72,
    infantryDismountSpeedKph: 5.2,
    radarReflectivityDb: -15,
    thermalContrastModifier: 1.0
  },
  {
    terrainType: "UNPAVED_GRAVEL_ROAD",
    surfaceRoughnessMeters: 0.05,
    frictionCoefficient: 0.65,
    maxWheeledSpeedKph: 65,
    maxTrackedSpeedKph: 55,
    infantryDismountSpeedKph: 4.8,
    radarReflectivityDb: -18,
    thermalContrastModifier: 0.9
  },
  {
    terrainType: "OPEN_GRASSLAND_FIRM_SOIL",
    surfaceRoughnessMeters: 0.12,
    frictionCoefficient: 0.55,
    maxWheeledSpeedKph: 45,
    maxTrackedSpeedKph: 48,
    infantryDismountSpeedKph: 4.2,
    radarReflectivityDb: -22,
    thermalContrastModifier: 0.8
  },
  {
    terrainType: "MODERATE_FOREST_DECIDUOUS",
    surfaceRoughnessMeters: 0.45,
    frictionCoefficient: 0.40,
    maxWheeledSpeedKph: 15,
    maxTrackedSpeedKph: 28,
    infantryDismountSpeedKph: 3.1,
    radarReflectivityDb: -8,
    thermalContrastModifier: 0.4
  },
  {
    terrainType: "DENSE_JUNGLE_CANOPY",
    surfaceRoughnessMeters: 0.90,
    frictionCoefficient: 0.25,
    maxWheeledSpeedKph: 0,
    maxTrackedSpeedKph: 8,
    infantryDismountSpeedKph: 1.5,
    radarReflectivityDb: -3,
    thermalContrastModifier: 0.2
  },
  {
    terrainType: "ROCKY_MOUNTAIN_TALUS_SLOPE",
    surfaceRoughnessMeters: 0.75,
    frictionCoefficient: 0.35,
    maxWheeledSpeedKph: 0,
    maxTrackedSpeedKph: 12,
    infantryDismountSpeedKph: 2.0,
    radarReflectivityDb: -5,
    thermalContrastModifier: 1.2
  },
  {
    terrainType: "DEEP_DESERT_SAND_DUNES",
    surfaceRoughnessMeters: 0.25,
    frictionCoefficient: 0.30,
    maxWheeledSpeedKph: 18,
    maxTrackedSpeedKph: 24,
    infantryDismountSpeedKph: 2.5,
    radarReflectivityDb: -25,
    thermalContrastModifier: 1.5
  },
  {
    terrainType: "SWAMP_MARSH_WETLAND",
    surfaceRoughnessMeters: 0.60,
    frictionCoefficient: 0.15,
    maxWheeledSpeedKph: 0,
    maxTrackedSpeedKph: 5,
    infantryDismountSpeedKph: 1.2,
    radarReflectivityDb: -10,
    thermalContrastModifier: 0.5
  }
];

const SLOPE_GO_NO_GO_THRESHOLDS = [
  { slopeDegMin: 0, slopeDegMax: 5, wheeledStatus: "GO", trackedStatus: "GO", dismountFatigueMultiplier: 1.0 },
  { slopeDegMin: 5, slopeDegMax: 15, wheeledStatus: "GO", trackedStatus: "GO", dismountFatigueMultiplier: 1.4 },
  { slopeDegMin: 15, slopeDegMax: 25, wheeledStatus: "SLOW_GO", trackedStatus: "GO", dismountFatigueMultiplier: 2.1 },
  { slopeDegMin: 25, slopeDegMax: 35, wheeledStatus: "NO_GO", trackedStatus: "SLOW_GO", dismountFatigueMultiplier: 3.2 },
  { slopeDegMin: 35, slopeDegMax: 45, wheeledStatus: "NO_GO", trackedStatus: "NO_GO", dismountFatigueMultiplier: 4.8 },
  { slopeDegMin: 45, slopeDegMax: 90, wheeledStatus: "CLIFF_IMPASSABLE", trackedStatus: "CLIFF_IMPASSABLE", dismountFatigueMultiplier: 8.0 }
];

class MilitaryCrossCountryMobilityEngine {
  constructor() {
    this.terrainCatalog = TERRAIN_MOBILITY_IMPEDANCE_CATALOG;
    this.slopeThresholds = SLOPE_GO_NO_GO_THRESHOLDS;
  }

  evaluateRouteSegment(terrainType, slopeAngleDeg, unitType = "INFANTRY_DISMOUNT") {
    const terrain = this.terrainCatalog.find((t) => t.terrainType === terrainType) || this.terrainCatalog[2];
    const slope = this.slopeThresholds.find((s) => slopeAngleDeg >= s.slopeDegMin && slopeAngleDeg < s.slopeDegMax) || this.slopeThresholds[0];

    let speedKph = terrain.infantryDismountSpeedKph / slope.dismountFatigueMultiplier;
    let mobilityStatus = "GO";

    if (unitType === "WHEELED_VEHICLE") {
      speedKph = terrain.maxWheeledSpeedKph;
      mobilityStatus = slope.wheeledStatus;
      if (mobilityStatus === "NO_GO" || mobilityStatus === "CLIFF_IMPASSABLE") speedKph = 0;
    } else if (unitType === "TRACKED_VEHICLE") {
      speedKph = terrain.maxTrackedSpeedKph;
      mobilityStatus = slope.trackedStatus;
      if (mobilityStatus === "NO_GO" || mobilityStatus === "CLIFF_IMPASSABLE") speedKph = 0;
    }

    return {
      terrainType: terrain.terrainType,
      slopeDeg: slopeAngleDeg,
      unitType: unitType,
      mobilityStatus: mobilityStatus,
      effectiveSpeedKph: Number(speedKph.toFixed(2)),
      frictionCoefficient: terrain.frictionCoefficient,
      radarSignatureDb: terrain.radarReflectivityDb
    };
  }
}

module.exports = {
  TERRAIN_MOBILITY_IMPEDANCE_CATALOG,
  SLOPE_GO_NO_GO_THRESHOLDS,
  MilitaryCrossCountryMobilityEngine
};
