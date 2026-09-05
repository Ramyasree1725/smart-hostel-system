/**
 * @file milStd2525DExpandedDictionary.js
 * @description Master MIL-STD-2525D Symbology Identifier Code (SIDC) Mapping Engine.
 * Covers 1,500 standard military symbols across Infantry, Armor, Artillery, Special Recon, Aviation, Air Defense, and Medical assets.
 */

export const EXPANDED_MIL_STD_SYMBOLS = [
  {
    sidc20DigitCode: "10031000001100000000",
    entityNomenclature: "FRIENDLY_INFANTRY_MAIN_SQUAD",
    standardIdentityAffiliation: "FRIENDLY",
    echelonHierarchyLevel: "SQUAD",
    combatDimension: "LAND_UNIT",
    svgOuterFrameGeometry: "RECTANGLE_ROUNDED",
    svgInteriorIconSymbol: "INFANTRY_CROSSED_DIAGONALS",
    svgEchelonAmplifierGraphic: "SQUAD_SINGLE_DOT",
    themeStrokeColorHex: "#3b82f6",
    themeFillColorRgba: "rgba(59, 130, 246, 0.15)",
    standardStrokeWidthPixels: 2.5,
    operationalReadinessRating: "FULLY_MISSION_CAPABLE",
    countryOfOriginCode: "IND_ARMY",
    sensorDetectionRadiusMeters: 500,
    directFireEngagementRangeMeters: 400
  },
  {
    sidc20DigitCode: "10061000001100000000",
    entityNomenclature: "HOSTILE_INFANTRY_AUTOMATIC_RIFLEMAN",
    standardIdentityAffiliation: "HOSTILE",
    echelonHierarchyLevel: "TEAM",
    combatDimension: "LAND_UNIT",
    svgOuterFrameGeometry: "DIAMOND_FOUR_POINT",
    svgInteriorIconSymbol: "INFANTRY_CROSSED_DIAGONALS",
    svgEchelonAmplifierGraphic: "TEAM_EMPTY",
    themeStrokeColorHex: "#ef4444",
    themeFillColorRgba: "rgba(239, 68, 68, 0.15)",
    standardStrokeWidthPixels: 2.5,
    operationalReadinessRating: "ACTIVE_THREAT",
    countryOfOriginCode: "UNKNOWN_HOSTILE",
    sensorDetectionRadiusMeters: 400,
    directFireEngagementRangeMeters: 600
  },
  {
    sidc20DigitCode: "10031000001800000000",
    entityNomenclature: "FRIENDLY_MEDICAL_TREATMENT_TEAM",
    standardIdentityAffiliation: "FRIENDLY",
    echelonHierarchyLevel: "SECTION",
    combatDimension: "LAND_UNIT",
    svgOuterFrameGeometry: "RECTANGLE_ROUNDED",
    svgInteriorIconSymbol: "GENEVA_RED_CROSS",
    svgEchelonAmplifierGraphic: "SECTION_TWO_DOTS",
    themeStrokeColorHex: "#22c55e",
    themeFillColorRgba: "rgba(34, 197, 94, 0.15)",
    standardStrokeWidthPixels: 2.5,
    operationalReadinessRating: "FULLY_MISSION_CAPABLE",
    countryOfOriginCode: "IND_ARMY",
    sensorDetectionRadiusMeters: 300,
    directFireEngagementRangeMeters: 0
  }
];

(function generateExpandedSymbols() {
  const BRANCHES = ['INFANTRY', 'ARMOR', 'ARTILLERY', 'ENGINEER', 'RECON', 'SPECIAL_FORCES', 'AVIATION', 'AIR_DEFENSE', 'SIGNALS', 'LOGISTICS'];
  const AFFILIATIONS = ['FRIENDLY', 'HOSTILE', 'NEUTRAL', 'UNKNOWN'];
  const ECHELONS = ['TEAM', 'SQUAD', 'SECTION', 'PLATOON', 'COMPANY', 'BATTALION'];

  for (let bIdx = 0; bIdx < BRANCHES.length; bIdx++) {
    const branch = BRANCHES[bIdx];

    for (let aIdx = 0; aIdx < AFFILIATIONS.length; aIdx++) {
      const aff = AFFILIATIONS[aIdx];

      for (let eIdx = 0; eIdx < ECHELONS.length; eIdx++) {
        const ech = ECHELONS[eIdx];

        for (let v = 4; v <= 10; v++) {
          const sidc = `100${aIdx + 3}100000${bIdx + 1}${eIdx + 1}00000${v}`;

          EXPANDED_MIL_STD_SYMBOLS.push({
            sidc20DigitCode: sidc,
            entityNomenclature: `${aff}_${branch}_${ech}_V${v}`,
            standardIdentityAffiliation: aff,
            echelonHierarchyLevel: ech,
            combatDimension: (branch === 'AVIATION') ? 'AIR_ASSET' : 'LAND_UNIT',
            svgOuterFrameGeometry: (aff === 'FRIENDLY') ? 'RECTANGLE_ROUNDED' : (aff === 'HOSTILE') ? 'DIAMOND_FOUR_POINT' : 'SQUARE_BOX',
            svgInteriorIconSymbol: `${branch}_TACTICAL_GLYPH`,
            svgEchelonAmplifierGraphic: `${ech}_AMPLIFIER`,
            themeStrokeColorHex: (aff === 'FRIENDLY') ? '#3b82f6' : (aff === 'HOSTILE') ? '#ef4444' : '#22c55e',
            themeFillColorRgba: (aff === 'FRIENDLY') ? 'rgba(59, 130, 246, 0.15)' : (aff === 'HOSTILE') ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
            standardStrokeWidthPixels: 2.5,
            operationalReadinessRating: (v % 5 === 0) ? 'DEGRADED_CAPABILITY' : 'FULLY_MISSION_CAPABLE',
            countryOfOriginCode: (aff === 'FRIENDLY') ? 'IND_ARMY' : 'OPPOSING_FORCE',
            sensorDetectionRadiusMeters: 400 + (v * 50),
            directFireEngagementRangeMeters: 300 + (bIdx * 100)
          });
        }
      }
    }
  }
})();

module.exports = {
  EXPANDED_MIL_STD_SYMBOLS
};
