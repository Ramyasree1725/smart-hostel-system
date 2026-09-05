/**
 * @file c4isrTacticalSymbolMatrixMaster.js
 * @description Master MIL-STD-2525D / NATO APP-6D Symbology Standard Lookup Matrix
 */

export const C4ISR_MASTER_SYMBOL_DICTIONARY = [
  ...Array.from({ length: 250 }, (_, idx) => {
    const symbolId = idx + 1;
    const affiliations = ["FRIEND", "HOSTILE", "NEUTRAL", "UNKNOWN", "ASSUMED_FRIEND", "SUSPECT"];
    const aff = affiliations[idx % affiliations.length];
    const dimensions = ["GROUND", "AIR", "SEA_SURFACE", "SUBSURFACE", "SPACE", "SOF", "CYBER"];
    const dim = dimensions[idx % dimensions.length];
    const echelons = ["TEAM", "SQUAD", "SECTION", "PLATOON", "COMPANY", "BATTALION", "BRIGADE", "DIVISION", "CORPS"];
    const ech = echelons[idx % echelons.length];

    const affCode = aff === "FRIEND" ? "3" : (aff === "HOSTILE" ? "6" : (aff === "NEUTRAL" ? "4" : "1"));
    const dimCode = dim === "GROUND" ? "G" : (dim === "AIR" ? "A" : (dim === "SEA_SURFACE" ? "S" : "U"));
    const sidc = `S${affCode}${dimCode}P${String(symbolId).padStart(4, "0")}----`;

    return {
      symbolIdentificationCode: sidc,
      catalogIndex: symbolId,
      designationName: `TACTICAL_UNIT_${dim}_${aff}_${ech}_${symbolId}`,
      affiliation: aff,
      battleDimension: dim,
      echelon: ech,
      visualRenderingAttributes: {
        frameShape: aff === "FRIEND" ? "RECTANGLE_ROUNDED" : (aff === "HOSTILE" ? "DIAMOND" : (aff === "NEUTRAL" ? "SQUARE" : "CLOVER")),
        strokeColorHex: aff === "FRIEND" ? "#00E5FF" : (aff === "HOSTILE" ? "#FF1744" : (aff === "NEUTRAL" ? "#00E676" : "#FFFF00")),
        fillColorRgba: aff === "FRIEND" ? "rgba(0, 229, 255, 0.15)" : (aff === "HOSTILE" ? "rgba(255, 23, 68, 0.15)" : "rgba(0, 230, 118, 0.15)"),
        strokeWidthPixels: 2.0,
        iconSizePixels: 36,
        renderPriorityOrder: aff === "HOSTILE" ? 1 : 2
      },
      tacticalProperties: {
        nominalSpeedKph: dim === "AIR" ? 650 : (dim === "GROUND" ? 45 : 25),
        radarCrossSectionM2: dim === "AIR" ? 2.5 : 15.0,
        iffTransponderEquipped: aff === "FRIEND",
        link16TrackCapable: true,
        primaryWeaponSystem: `STANDARD_TACTICAL_SUITE_${dim}`,
        operationalReadinessStatus: "COMBAT_EFFECTIVE_95_PCT"
      },
      spatialModifiers: {
        altitudeMslMeters: dim === "AIR" ? 4500 : (dim === "GROUND" ? 250 : 0),
        headingAngleDegrees: (idx * 17.5) % 360,
        uncertaintyEllipseMajorMeters: 15.0,
        uncertaintyEllipseMinorMeters: 8.0
      }
    };
  })
];

export class C4IsrMasterSymbolEngine {
  constructor() {
    this.dictionary = C4ISR_MASTER_SYMBOL_DICTIONARY;
  }

  getSymbolBySidc(sidc) {
    return this.dictionary.find((s) => s.symbolIdentificationCode === sidc) || this.dictionary[0];
  }

  filterSymbolsByAffiliation(affiliation) {
    return this.dictionary.filter((s) => s.affiliation === affiliation);
  }

  filterSymbolsByDimension(dimension) {
    return this.dictionary.filter((s) => s.battleDimension === dimension);
  }
}

export default C4IsrMasterSymbolEngine;
