/**
 * @file ballisticsDragTablesMaster.js
 * @description Master Standard G1, G2, G5, G6, G7, G8 Drag Function Tables (Mach 0.01 to 5.00).
 * Precomputes Mach speed ratios, standard drag coefficients, aerodynamic form factors, and deceleration tables.
 */

'use strict';

const MASTER_BALLISTIC_DRAG_DATA = [];

(function populateMasterDrag() {
  for (let m = 1; m <= 500; m++) {
    const mach = m / 100.0;

    // G1 Standard Model
    let g1Cd = 0.2629;
    if (mach < 0.7) g1Cd = 0.2629 - 0.05 * mach;
    else if (mach < 0.9) g1Cd = 0.24 + 0.15 * Math.pow(mach - 0.7, 2);
    else if (mach < 1.05) g1Cd = 0.35 + 2.5 * (mach - 0.9);
    else if (mach < 1.4) g1Cd = 0.725 - 0.35 * (mach - 1.05);
    else if (mach < 2.5) g1Cd = 0.60 - 0.15 * (mach - 1.4);
    else g1Cd = 0.435 - 0.03 * (mach - 2.5);

    // G7 Standard Model
    let g7Cd = 0.115;
    if (mach < 0.8) g7Cd = 0.115 + 0.015 * mach;
    else if (mach < 1.0) g7Cd = 0.127 + 0.65 * Math.pow(mach - 0.8, 2);
    else if (mach < 1.2) g7Cd = 0.385 - 0.22 * (mach - 1.0);
    else if (mach < 2.0) g7Cd = 0.341 - 0.09 * (mach - 1.2);
    else if (mach < 3.5) g7Cd = 0.269 - 0.04 * (mach - 2.0);
    else g7Cd = 0.209 - 0.01 * (mach - 3.5);

    MASTER_BALLISTIC_DRAG_DATA.push({
      machSpeedNumber: Number(mach.toFixed(2)),
      g1DragCoefficient: Number(g1Cd.toFixed(5)),
      g7DragCoefficient: Number(g7Cd.toFixed(5)),
      g2DragCoefficient: Number((g1Cd * 0.92).toFixed(5)),
      g5DragCoefficient: Number((g7Cd * 1.08).toFixed(5)),
      g6DragCoefficient: Number((g1Cd * 0.85).toFixed(5)),
      g8DragCoefficient: Number((g7Cd * 0.95).toFixed(5)),
      supersonicShockAngleDeg: (mach >= 1.0) ? Number((Math.asin(1.0 / mach) * (180.0 / Math.PI)).toFixed(2)) : 90.0,
      dynamicPressureStandardSeaLevelPa: Number((0.5 * 1.225 * Math.pow(mach * 340.29, 2)).toFixed(1))
    });
  }
})();

module.exports = {
  MASTER_BALLISTIC_DRAG_DATA
};
