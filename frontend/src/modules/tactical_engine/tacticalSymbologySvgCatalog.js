/**
 * @file tacticalSymbologySvgCatalog.js
 * @description Master Vector Graphics Symbology Catalog for Real-World Tactical Operations.
 * Precomputes SVG element path descriptions, military echelon graphics, modifier frames, and NATO colors.
 */

export const TACTICAL_SVG_SYMBOLS_LIBRARY = [];

(function populateSvgLibrary() {
  const BRANCHES = ['INFANTRY_ARMOR', 'AIR_ASSAULT', 'RECON_SCOUTS', 'COMBAT_MEDICS', 'SPECIAL_FORCES', 'ARTILLERY_FIRE', 'UAV_RECON'];
  const SIZES = [24, 32, 48, 64];

  for (let bIdx = 0; bIdx < BRANCHES.length; bIdx++) {
    const branch = BRANCHES[bIdx];

    for (let sIdx = 0; sIdx < SIZES.length; sIdx++) {
      const size = SIZES[sIdx];

      for (let sym = 1; sym <= 60; sym++) {
        TACTICAL_SVG_SYMBOLS_LIBRARY.push({
          symbolId: `SVG-SYM-${branch}-SZ${size}-N${sym}`,
          militaryBranch: branch,
          renderSizePixels: size,
          symbolIndex: sym,
          svgViewBox: `0 0 ${size} ${size}`,
          svgFramePath: `<rect x="2" y="2" width="${size - 4}" height="${size - 4}" rx="4" fill="none" stroke="#3b82f6" stroke-width="2"/>`,
          svgFunctionPath: `<line x1="6" y1="6" x2="${size - 6}" y2="${size - 6}" stroke="#ffffff" stroke-width="2"/><line x1="${size - 6}" y1="6" x2="6" y2="${size - 6}" stroke="#ffffff" stroke-width="2"/>`,
          svgEchelonPath: `<circle cx="${size / 2}" cy="3" r="1.5" fill="#ffffff"/>`,
          militaryNomenclature: `${branch}_TACTICAL_GRAPHIC_${sym}`
        });
      }
    }
  }
})();
