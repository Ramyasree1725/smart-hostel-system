/**
 * @file militaryTopographicFeatureDatasetExtended.js
 * @description Extended Topographic Land Cover & Micro-Terrain Tactical Mobility Matrix
 */

const EXTENDED_LAND_COVER_DATABASE = [
  {
    code: "LC_01_URBAN_HIGH_DENSITY",
    buildingCoveragePct: 75,
    rubbleImpedanceMultiplier: 2.8,
    thermalOcclusionDb: 18.0,
    rfAttenuationPer100mMhz900: 24.5,
    sniperHideProbability: 0.88,
    ambushRiskIndex: 0.92,
    mobilityWheeled: "RESTRICTED_TO_CHOKEPOINTS",
    mobilityTracked: "SLOW_GO",
    mobilityDismount: "TACTICAL_BOUNDING"
  },
  {
    code: "LC_02_URBAN_SUBURBAN_RESIDENTIAL",
    buildingCoveragePct: 35,
    rubbleImpedanceMultiplier: 1.4,
    thermalOcclusionDb: 10.0,
    rfAttenuationPer100mMhz900: 12.0,
    sniperHideProbability: 0.65,
    ambushRiskIndex: 0.70,
    mobilityWheeled: "SLOW_GO",
    mobilityTracked: "GO",
    mobilityDismount: "GO"
  },
  {
    code: "LC_03_INDUSTRIAL_PORT_FACILITY",
    buildingCoveragePct: 55,
    rubbleImpedanceMultiplier: 2.1,
    thermalOcclusionDb: 22.0,
    rfAttenuationPer100mMhz900: 28.0,
    sniperHideProbability: 0.82,
    ambushRiskIndex: 0.85,
    mobilityWheeled: "RESTRICTED",
    mobilityTracked: "GO",
    mobilityDismount: "TACTICAL_BOUNDING"
  },
  {
    code: "LC_04_AGRICULTURAL_IRRIGATED_RICE_PADDY",
    buildingCoveragePct: 0,
    rubbleImpedanceMultiplier: 1.0,
    thermalOcclusionDb: 1.0,
    rfAttenuationPer100mMhz900: 1.5,
    sniperHideProbability: 0.15,
    ambushRiskIndex: 0.30,
    mobilityWheeled: "NO_GO_BOGGED_DOWN",
    mobilityTracked: "SLOW_GO_DEEP_MUD",
    mobilityDismount: "FATIGUE_HEAVY_MUD"
  },
  {
    code: "LC_05_SAVANNA_THORN_SCRUB_ARID",
    buildingCoveragePct: 0,
    rubbleImpedanceMultiplier: 1.0,
    thermalOcclusionDb: 3.5,
    rfAttenuationPer100mMhz900: 3.0,
    sniperHideProbability: 0.45,
    ambushRiskIndex: 0.55,
    mobilityWheeled: "GO",
    mobilityTracked: "GO",
    mobilityDismount: "GO"
  },
  {
    code: "LC_06_CONIFEROUS_ALPINE_FOREST",
    buildingCoveragePct: 0,
    rubbleImpedanceMultiplier: 1.3,
    thermalOcclusionDb: 14.0,
    rfAttenuationPer100mMhz900: 16.0,
    sniperHideProbability: 0.78,
    ambushRiskIndex: 0.80,
    mobilityWheeled: "NO_GO",
    mobilityTracked: "SLOW_GO",
    mobilityDismount: "SLOW_GO_STEEP"
  }
];

class MilitaryLandCoverAnalysisEngine {
  constructor() {
    this.landCoverDb = EXTENDED_LAND_COVER_DATABASE;
  }

  getLandCoverByCode(code) {
    return this.landCoverDb.find((l) => l.code === code) || this.landCoverDb[0];
  }

  evaluateRfSignalLossDb(landCoverCode, distanceMeters) {
    const lc = this.getLandCoverByCode(landCoverCode);
    const loss = (distanceMeters / 100.0) * lc.rfAttenuationPer100mMhz900;
    return Number(loss.toFixed(2));
  }
}

module.exports = {
  EXTENDED_LAND_COVER_DATABASE,
  MilitaryLandCoverAnalysisEngine
};
