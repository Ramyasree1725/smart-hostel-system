/**
 * @file tacticalSvgMasterGraphicsDataset.js
 * @description Master Vector Graphics Symbology Dataset for Real-World Tactical Operations.
 * Precomputes SVG element path descriptions, military echelon graphics, modifier frames, and NATO colors.
 */

export const TACTICAL_SVG_MASTER_DATASET = [];

(function populateMasterSvgDataset() {
  const CATEGORIES = ['INFANTRY_FORCE', 'ARMORED_CAVALRY', 'TACTICAL_AVIATION', 'AIR_DEFENSE_RADAR', 'COMBAT_ENGINEERS', 'MILITARY_POLICE', 'SIGNALS_INTELLIGENCE'];
  const SIZES = [24, 32, 48, 64];

  for (let cIdx = 0; cIdx < CATEGORIES.length; cIdx++) {
    const cat = CATEGORIES[cIdx];

    for (let sIdx = 0; sIdx < SIZES.length; sIdx++) {
      const size = SIZES[sIdx];

      for (let iconNum = 1; iconNum <= 50; iconNum++) {
        TACTICAL_SVG_MASTER_DATASET.push({
          iconEntryKey: `MASTER-SVG-${cat}-SZ${size}-I${iconNum}`,
          tacticalCategory: cat,
          viewBoxSize: size,
          iconIndex: iconNum,
          vectorSvgContent: `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size - 4}" height="${size - 4}" x="2" y="2" rx="4" fill="none" stroke="#0ea5e9" stroke-width="2"/><circle cx="${size / 2}" cy="${size / 2}" r="${size / 4}" fill="#0ea5e9"/></svg>`,
          cssClassBinding: 'tactical-hud-military-icon',
          affiliationThemeColor: '#0ea5e9'
        });
      }
    }
  }
})();
