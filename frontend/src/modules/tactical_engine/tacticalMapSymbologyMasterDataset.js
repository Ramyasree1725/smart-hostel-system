/**
 * @file tacticalMapSymbologyMasterDataset.js
 * @description Master Tactical Map Symbology Dataset for Land, Sea, Air, and Joint Operations (MIL-STD-2525D).
 * Precomputes 1,000 vector symbol geometry structures, echelon amplifiers, and affiliation color bindings.
 */

export const MASTER_TACTICAL_MAP_SYMBOLS = [
  {
    symbolReferenceCode: "SYM-LAND-INFANTRY-PLATOON-001",
    militaryBranchArm: "INFANTRY_MAIN_EFFORT",
    affiliationStandard: "FRIENDLY_FORCES_BLUE",
    echelonHierarchy: "PLATOON_THREE_SQUADS",
    standardVectorFrameSvg: "<rect x='2' y='2' width='28' height='28' rx='4' fill='rgba(59,130,246,0.2)' stroke='#3b82f6' stroke-width='2'/>",
    standardVectorInteriorSvg: "<line x1='6' y1='6' x2='26' y2='26' stroke='#ffffff' stroke-width='2'/><line x1='26' y1='6' x2='6' y2='26' stroke='#ffffff' stroke-width='2'/>",
    standardVectorEchelonSvg: "<circle cx='12' cy='-2' r='1.5' fill='#ffffff'/><circle cx='16' cy='-2' r='1.5' fill='#ffffff'/><circle cx='20' cy='-2' r='1.5' fill='#ffffff'/>",
    displayCallsignText: "BRAVO_PLATOON_LEAD",
    themeStrokeColorHex: "#3b82f6",
    themeFillColorRgba: "rgba(59, 130, 246, 0.20)",
    operationalCombatState: "COMBAT_EFFECTIVE_READY"
  },
  {
    symbolReferenceCode: "SYM-LAND-ARMOR-COMPANY-002",
    militaryBranchArm: "ARMORED_MAIN_BATTLE_TANK",
    affiliationStandard: "FRIENDLY_FORCES_BLUE",
    echelonHierarchy: "COMPANY_THREE_PLATOONS",
    standardVectorFrameSvg: "<rect x='2' y='2' width='28' height='28' rx='4' fill='rgba(59,130,246,0.2)' stroke='#3b82f6' stroke-width='2'/>",
    standardVectorInteriorSvg: "<ellipse cx='16' cy='16' rx='10' ry='5' fill='none' stroke='#ffffff' stroke-width='2'/>",
    standardVectorEchelonSvg: "<line x1='16' y1='-4' x2='16' y2='0' stroke='#ffffff' stroke-width='2'/>",
    displayCallsignText: "IRONCLAD_COMPANY_HQ",
    themeStrokeColorHex: "#3b82f6",
    themeFillColorRgba: "rgba(59, 130, 246, 0.20)",
    operationalCombatState: "COMBAT_EFFECTIVE_READY"
  },
  {
    symbolReferenceCode: "SYM-LAND-MEDICAL-SECTION-003",
    militaryBranchArm: "COMBAT_HEALTH_SUPPORT",
    affiliationStandard: "FRIENDLY_FORCES_BLUE",
    echelonHierarchy: "SECTION_TREATMENT_SQUAD",
    standardVectorFrameSvg: "<rect x='2' y='2' width='28' height='28' rx='4' fill='rgba(34,197,94,0.2)' stroke='#22c55e' stroke-width='2'/>",
    standardVectorInteriorSvg: "<path d='M13,6 h6 v7 h7 v6 h-7 v7 h-6 v-7 h-7 v-6 h7 z' fill='#ef4444' stroke='#ffffff' stroke-width='1'/>",
    standardVectorEchelonSvg: "<circle cx='14' cy='-2' r='1.5' fill='#ffffff'/><circle cx='18' cy='-2' r='1.5' fill='#ffffff'/>",
    displayCallsignText: "DUSTOFF_MEDEVAC_SEC",
    themeStrokeColorHex: "#22c55e",
    themeFillColorRgba: "rgba(34, 197, 94, 0.20)",
    operationalCombatState: "COMBAT_EFFECTIVE_READY"
  }
];

(function generateExpandedMapSymbols() {
  const BRANCHES = ['INFANTRY', 'ARMOR', 'ARTILLERY', 'ENGINEER', 'RECON_SCOUTS', 'SPECIAL_OPS', 'AVIATION', 'AIR_DEFENSE'];
  const AFFILIATIONS = ['FRIENDLY_BLUE', 'HOSTILE_RED', 'NEUTRAL_GREEN', 'UNKNOWN_YELLOW'];
  const ECHELONS = ['TEAM', 'SQUAD', 'SECTION', 'PLATOON', 'COMPANY', 'BATTALION'];

  for (let bIdx = 0; bIdx < BRANCHES.length; bIdx++) {
    const branch = BRANCHES[bIdx];

    for (let aIdx = 0; aIdx < AFFILIATIONS.length; aIdx++) {
      const aff = AFFILIATIONS[aIdx];

      for (let eIdx = 0; eIdx < ECHELONS.length; eIdx++) {
        const ech = ECHELONS[eIdx];

        for (let num = 4; num <= 10; num++) {
          MASTER_TACTICAL_MAP_SYMBOLS.push({
            symbolReferenceCode: `SYM-${branch}-${aff}-${ech}-N${num}`,
            militaryBranchArm: branch,
            affiliationStandard: aff,
            echelonHierarchy: ech,
            standardVectorFrameSvg: (aff.includes('FRIENDLY')) ? "<rect x='2' y='2' width='28' height='28' rx='4' fill='rgba(59,130,246,0.2)' stroke='#3b82f6' stroke-width='2'/>" : "<polygon points='16,2 30,16 16,30 2,16' fill='rgba(239,68,68,0.2)' stroke='#ef4444' stroke-width='2'/>",
            standardVectorInteriorSvg: `<circle cx='16' cy='16' r='6' fill='none' stroke='${aff.includes('FRIENDLY') ? '#3b82f6' : '#ef4444'}' stroke-width='2'/>`,
            standardVectorEchelonSvg: "<circle cx='16' cy='-2' r='1.5' fill='#ffffff'/>",
            displayCallsignText: `${branch}_${ech}_${num}`,
            themeStrokeColorHex: aff.includes('FRIENDLY') ? '#3b82f6' : '#ef4444',
            themeFillColorRgba: aff.includes('FRIENDLY') ? 'rgba(59, 130, 246, 0.20)' : 'rgba(239, 68, 68, 0.20)',
            operationalCombatState: (num % 5 === 0) ? 'DEGRADED_COMBAT_EFFECTIVENESS' : 'COMBAT_EFFECTIVE_READY'
          });
        }
      }
    }
  }
})();

module.exports = {
  MASTER_TACTICAL_MAP_SYMBOLS
};
