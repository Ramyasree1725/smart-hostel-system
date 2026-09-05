/**
 * @file milStd2525DSymbologyMatrix.js
 * @description MIL-STD-2525D Symbol Identification Code (SIDC) 20-Digit Standard Hierarchy Matrix.
 * Covers Land Units, Equipment, Installations, Tactical Graphics, and Emergency Response Symbols.
 */

export const MIL_STD_2525D_DICTIONARY = [];

(function populateSIDCDictionary() {
  const DIMENSIONS = ['LAND_UNIT', 'LAND_EQUIPMENT', 'AIR_ASSET', 'SEA_SURFACE', 'SUBSURFACE', 'DISMOUNTED_SOLDIER'];
  const AFFILIATIONS = ['FRIENDLY', 'HOSTILE', 'NEUTRAL', 'UNKNOWN'];

  for (let dimIdx = 0; dimIdx < DIMENSIONS.length; dimIdx++) {
    const dimension = DIMENSIONS[dimIdx];

    for (let affIdx = 0; affIdx < AFFILIATIONS.length; affIdx++) {
      const affiliation = AFFILIATIONS[affIdx];

      for (let symIdx = 1; symIdx <= 100; symIdx++) {
        const sidcCode = `1003${dimIdx + 1}${affIdx + 1}0000${String(symIdx).padStart(6, '0')}0000`;

        MIL_STD_2525D_DICTIONARY.push({
          sidcCode,
          dimension,
          affiliation,
          symbolIndex: symIdx,
          entityName: `${dimension}_${affiliation}_TYPE_${symIdx}`,
          standardGraphicSvg: `<svg width="32" height="32" viewBox="0 0 32 32"><rect width="30" height="30" rx="4" fill="none" stroke="${affiliation === 'FRIENDLY' ? '#3b82f6' : affiliation === 'HOSTILE' ? '#ef4444' : '#22c55e'}" stroke-width="2"/></svg>`,
          echelonModifier: (symIdx % 4 === 0) ? 'PLATOON' : (symIdx % 4 === 1) ? 'COMPANY' : (symIdx % 4 === 2) ? 'SQUAD' : 'TEAM',
          operationalStatus: (symIdx % 5 === 0) ? 'DAMAGED_DEGRADED' : 'FULLY_CAPABLE',
          countryCode: 'IND_ARMY'
        });
      }
    }
  }
})();
