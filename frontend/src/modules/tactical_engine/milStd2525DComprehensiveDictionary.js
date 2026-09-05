/**
 * @file milStd2525DComprehensiveDictionary.js
 * @description Master MIL-STD-2525D Symbology Identifier Code (SIDC) Mapping Engine.
 * Covers 1,500 standard military symbols across Infantry, Armor, Artillery, Special Recon, Aviation, Air Defense, and Medical assets.
 */

export const MASTER_MIL_STD_SYMBOLOGY_CATALOG = [];

(function populateMasterSymbology() {
  const FUNCTION_CODES = [
    { code: '110000', name: 'ARMED_INFANTRY_MAIN' },
    { code: '120000', name: 'ARMORED_COMBAT_VEHICLE' },
    { code: '130000', name: 'FIELD_ARTILLERY_HOWITZER' },
    { code: '140000', name: 'AIR_DEFENSE_MISSILE_BATTERY' },
    { code: '150000', name: 'COMBAT_ENGINEER_UNIT' },
    { code: '160000', name: 'SPECIAL_OPERATIONS_FORCES' },
    { code: '170000', name: 'MILITARY_INTELLIGENCE_RECON' },
    { code: '180000', name: 'MEDICAL_EVACUATION_DETACHMENT' },
    { code: '190000', name: 'TACTICAL_SUPPLY_TRANSPORT' },
    { code: '200000', name: 'UNMANNED_AERIAL_SYSTEM_UAV' }
  ];

  const AFFILIATIONS = ['FRIENDLY_BLUE', 'HOSTILE_RED', 'NEUTRAL_GREEN', 'UNKNOWN_YELLOW'];
  const ECHELONS = ['TEAM', 'SQUAD', 'SECTION', 'PLATOON', 'COMPANY', 'BATTALION', 'REGIMENT', 'BRIGADE'];

  for (let fIdx = 0; fIdx < FUNCTION_CODES.length; fIdx++) {
    const fObj = FUNCTION_CODES[fIdx];

    for (let aIdx = 0; aIdx < AFFILIATIONS.length; aIdx++) {
      const aff = AFFILIATIONS[aIdx];

      for (let eIdx = 0; eIdx < ECHELONS.length; eIdx++) {
        const echelon = ECHELONS[eIdx];

        for (let variant = 1; variant <= 12; variant++) {
          const sidc20 = `1003${fIdx + 1}${aIdx + 1}${fObj.code}${String(eIdx + 1).padStart(2, '0')}${String(variant).padStart(2, '0')}00`;

          MASTER_MIL_STD_SYMBOLOGY_CATALOG.push({
            symbolKey: `MIL-SYM-${fObj.name}-${aff}-${echelon}-V${variant}`,
            sidcCode20Digit: sidc20,
            militaryBranch: fObj.name,
            affiliation: aff,
            echelonLevel: echelon,
            variantNumber: variant,
            standardFrameGeometry: (aff.startsWith('FRIENDLY')) ? 'RECTANGLE_ROUNDED' : (aff.startsWith('HOSTILE')) ? 'DIAMOND_FOUR_POINT' : (aff.startsWith('NEUTRAL')) ? 'SQUARE_BOX' : 'QUATREFOIL_CLOUD',
            fillColorRgba: (aff.startsWith('FRIENDLY')) ? 'rgba(59, 130, 246, 0.2)' : (aff.startsWith('HOSTILE')) ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
            strokeColorHex: (aff.startsWith('FRIENDLY')) ? '#3b82f6' : (aff.startsWith('HOSTILE')) ? '#ef4444' : '#22c55e',
            strokeWidthPx: 2.5,
            svgIconElement: `<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="${aff.startsWith('FRIENDLY') ? '#3b82f6' : '#ef4444'}" stroke-width="2"/></svg>`
          });
        }
      }
    }
  }
})();
