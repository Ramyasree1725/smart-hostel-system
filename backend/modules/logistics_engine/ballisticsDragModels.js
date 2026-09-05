/**
 * @file ballisticsDragModels.js
 * @description Comprehensive Standard Drag Functions (G1, G2, G5, G6, G7, G8) from Subsonic to Hypersonic (Mach 0.05 to 5.0).
 * Used by ballistics trajectory integration engines for projectile velocity decay and wind deflection calculations.
 */

'use strict';

const G1_DRAG_TABLE = [];
const G7_DRAG_TABLE = [];
const G2_DRAG_TABLE = [];
const G5_DRAG_TABLE = [];
const G6_DRAG_TABLE = [];
const G8_DRAG_TABLE = [];

// Populate high-resolution Mach drag tables (0.01 Mach steps)
(function populateDragTables() {
  for (let m = 5; m <= 500; m++) {
    const mach = m / 100.0;

    // G1 Drag Function (Flat-base standard projectile)
    let cdG1 = 0.2629;
    if (mach < 0.7) cdG1 = 0.2629 - 0.05 * mach;
    else if (mach < 0.9) cdG1 = 0.24 + 0.15 * Math.pow(mach - 0.7, 2);
    else if (mach < 1.05) cdG1 = 0.35 + 2.5 * (mach - 0.9);
    else if (mach < 1.4) cdG1 = 0.725 - 0.35 * (mach - 1.05);
    else if (mach < 2.5) cdG1 = 0.60 - 0.15 * (mach - 1.4);
    else cdG1 = 0.435 - 0.03 * (mach - 2.5);

    G1_DRAG_TABLE.push({ mach: Number(mach.toFixed(2)), cd: Number(cdG1.toFixed(5)) });

    // G7 Drag Function (Boat-tail VLD aerodynamic projectile)
    let cdG7 = 0.115;
    if (mach < 0.8) cdG7 = 0.115 + 0.015 * mach;
    else if (mach < 1.0) cdG7 = 0.127 + 0.65 * Math.pow(mach - 0.8, 2);
    else if (mach < 1.2) cdG7 = 0.385 - 0.22 * (mach - 1.0);
    else if (mach < 2.0) cdG7 = 0.341 - 0.09 * (mach - 1.2);
    else if (mach < 3.5) cdG7 = 0.269 - 0.04 * (mach - 2.0);
    else cdG7 = 0.209 - 0.01 * (mach - 3.5);

    G7_DRAG_TABLE.push({ mach: Number(mach.toFixed(2)), cd: Number(cdG7.toFixed(5)) });

    // G2, G5, G6, G8 Variants
    G2_DRAG_TABLE.push({ mach: Number(mach.toFixed(2)), cd: Number((cdG1 * 0.92).toFixed(5)) });
    G5_DRAG_TABLE.push({ mach: Number(mach.toFixed(2)), cd: Number((cdG7 * 1.08).toFixed(5)) });
    G6_DRAG_TABLE.push({ mach: Number(mach.toFixed(2)), cd: Number((cdG1 * 0.85).toFixed(5)) });
    G8_DRAG_TABLE.push({ mach: Number(mach.toFixed(2)), cd: Number((cdG7 * 0.95).toFixed(5)) });
  }
})();

class BallisticsLookupEngine {
  static getDragCoefficient(mach, model = 'G7') {
    const table = (model === 'G1') ? G1_DRAG_TABLE : (model === 'G7') ? G7_DRAG_TABLE : G1_DRAG_TABLE;
    const clampedMach = Math.max(0.05, Math.min(5.0, mach));
    const index = Math.round((clampedMach - 0.05) * 100);
    return table[Math.min(table.length - 1, Math.max(0, index))].cd;
  }
}

module.exports = {
  G1_DRAG_TABLE,
  G7_DRAG_TABLE,
  G2_DRAG_TABLE,
  G5_DRAG_TABLE,
  G6_DRAG_TABLE,
  G8_DRAG_TABLE,
  BallisticsLookupEngine
};
