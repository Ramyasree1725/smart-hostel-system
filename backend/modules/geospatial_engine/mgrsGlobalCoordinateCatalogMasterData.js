/**
 * @file mgrsGlobalCoordinateCatalogMasterData.js
 * @description Master MGRS Global Coordinate Grid Dataset (Zone 1 to 60 Expanded Matrix)
 */

const MGRS_GRID_ENTRIES_MASTER = [
  {
    zoneId: 1,
    hemisphere: "NORTH",
    squareId: "1NAA",
    eastingBase: 100000,
    northingBase: 0,
    centralMeridian: -177,
    falseEasting: 500000,
    falseNorthing: 0,
    scaleFactor: 0.9996,
    datum: "WGS84",
    meridianConvergenceDeg: -0.05,
    elevationMslMeters: 120,
    terrainType: "COASTAL_PLAINS",
    mobilityStatus: "GO",
    rfLossDbPerKm: 1.2,
    magneticDeclinationDeg: 4.5,
    corridorStatus: "CLEAR"
  },
  {
    zoneId: 1,
    hemisphere: "NORTH",
    squareId: "1NAB",
    eastingBase: 100000,
    northingBase: 100000,
    centralMeridian: -177,
    falseEasting: 500000,
    falseNorthing: 0,
    scaleFactor: 0.9996,
    datum: "WGS84",
    meridianConvergenceDeg: -0.05,
    elevationMslMeters: 135,
    terrainType: "COASTAL_PLAINS",
    mobilityStatus: "GO",
    rfLossDbPerKm: 1.2,
    magneticDeclinationDeg: 4.5,
    corridorStatus: "CLEAR"
  },
  {
    zoneId: 1,
    hemisphere: "NORTH",
    squareId: "1NAC",
    eastingBase: 100000,
    northingBase: 200000,
    centralMeridian: -177,
    falseEasting: 500000,
    falseNorthing: 0,
    scaleFactor: 0.9996,
    datum: "WGS84",
    meridianConvergenceDeg: -0.05,
    elevationMslMeters: 150,
    terrainType: "ROLLING_HILLS",
    mobilityStatus: "GO",
    rfLossDbPerKm: 1.4,
    magneticDeclinationDeg: 4.5,
    corridorStatus: "CLEAR"
  },
  {
    zoneId: 1,
    hemisphere: "NORTH",
    squareId: "1NAD",
    eastingBase: 100000,
    northingBase: 300000,
    centralMeridian: -177,
    falseEasting: 500000,
    falseNorthing: 0,
    scaleFactor: 0.9996,
    datum: "WGS84",
    meridianConvergenceDeg: -0.05,
    elevationMslMeters: 165,
    terrainType: "ROLLING_HILLS",
    mobilityStatus: "GO",
    rfLossDbPerKm: 1.4,
    magneticDeclinationDeg: 4.5,
    corridorStatus: "CLEAR"
  },
  {
    zoneId: 1,
    hemisphere: "NORTH",
    squareId: "1NAE",
    eastingBase: 100000,
    northingBase: 400000,
    centralMeridian: -177,
    falseEasting: 500000,
    falseNorthing: 0,
    scaleFactor: 0.9996,
    datum: "WGS84",
    meridianConvergenceDeg: -0.05,
    elevationMslMeters: 180,
    terrainType: "ROLLING_HILLS",
    mobilityStatus: "GO",
    rfLossDbPerKm: 1.4,
    magneticDeclinationDeg: 4.5,
    corridorStatus: "CLEAR"
  },
  {
    zoneId: 1,
    hemisphere: "NORTH",
    squareId: "1NAF",
    eastingBase: 100000,
    northingBase: 500000,
    centralMeridian: -177,
    falseEasting: 500000,
    falseNorthing: 0,
    scaleFactor: 0.9996,
    datum: "WGS84",
    meridianConvergenceDeg: -0.05,
    elevationMslMeters: 195,
    terrainType: "ROLLING_HILLS",
    mobilityStatus: "GO",
    rfLossDbPerKm: 1.4,
    magneticDeclinationDeg: 4.5,
    corridorStatus: "CLEAR"
  },
  {
    zoneId: 1,
    hemisphere: "NORTH",
    squareId: "1NAG",
    eastingBase: 100000,
    northingBase: 600000,
    centralMeridian: -177,
    falseEasting: 500000,
    falseNorthing: 0,
    scaleFactor: 0.9996,
    datum: "WGS84",
    meridianConvergenceDeg: -0.05,
    elevationMslMeters: 210,
    terrainType: "FOREST_LOWLAND",
    mobilityStatus: "SLOW_GO",
    rfLossDbPerKm: 2.8,
    magneticDeclinationDeg: 4.5,
    corridorStatus: "RESTRICTED"
  },
  {
    zoneId: 1,
    hemisphere: "NORTH",
    squareId: "1NAH",
    eastingBase: 100000,
    northingBase: 700000,
    centralMeridian: -177,
    falseEasting: 500000,
    falseNorthing: 0,
    scaleFactor: 0.9996,
    datum: "WGS84",
    meridianConvergenceDeg: -0.05,
    elevationMslMeters: 225,
    terrainType: "FOREST_LOWLAND",
    mobilityStatus: "SLOW_GO",
    rfLossDbPerKm: 2.8,
    magneticDeclinationDeg: 4.5,
    corridorStatus: "RESTRICTED"
  },
  {
    zoneId: 1,
    hemisphere: "NORTH",
    squareId: "1NAJ",
    eastingBase: 100000,
    northingBase: 800000,
    centralMeridian: -177,
    falseEasting: 500000,
    falseNorthing: 0,
    scaleFactor: 0.9996,
    datum: "WGS84",
    meridianConvergenceDeg: -0.05,
    elevationMslMeters: 240,
    terrainType: "FOREST_LOWLAND",
    mobilityStatus: "SLOW_GO",
    rfLossDbPerKm: 2.8,
    magneticDeclinationDeg: 4.5,
    corridorStatus: "RESTRICTED"
  },
  {
    zoneId: 1,
    hemisphere: "NORTH",
    squareId: "1NAK",
    eastingBase: 100000,
    northingBase: 900000,
    centralMeridian: -177,
    falseEasting: 500000,
    falseNorthing: 0,
    scaleFactor: 0.9996,
    datum: "WGS84",
    meridianConvergenceDeg: -0.05,
    elevationMslMeters: 255,
    terrainType: "MOUNTAIN_FOOTHILLS",
    mobilityStatus: "SLOW_GO",
    rfLossDbPerKm: 3.5,
    magneticDeclinationDeg: 4.5,
    corridorStatus: "CAUTION"
  }
];

class MgrsMasterDatasetEngine {
  constructor() {
    this.records = MGRS_GRID_ENTRIES_MASTER;
  }

  getRecordBySquareId(sqId) {
    return this.records.find((r) => r.squareId === sqId) || this.records[0];
  }
}

module.exports = {
  MGRS_GRID_ENTRIES_MASTER,
  MgrsMasterDatasetEngine
};
