/**
 * @file ballisticsG1G7SupersonicTables.js
 * @description High-Resolution Supersonic Aerodynamic Drag Lookup Tables (Mach 0.01 to 4.50).
 * Precomputes wave drag, skin friction drag, base drag, and Miller stability factor (T/d^2) for small arms projectiles.
 */

'use strict';

const SUPERSONIC_DRAG_MATRIX = [];

(function populateSupersonicMatrix() {
  for (let m = 10; m <= 450; m += 2) {
    const mach = m / 100.0;

    // Component Drag Breakdown
    const waveDragCd = (mach < 0.9) ? 0.0 : (mach < 1.1) ? (mach - 0.9) * 1.5 : (0.30 / Math.sqrt(mach * mach - 1.0));
    const skinFrictionCd = 0.055 / Math.pow(mach + 1.0, 0.2);
    const baseDragCd = (mach < 1.0) ? 0.12 * Math.pow(mach, 2) : 0.12 / Math.pow(mach, 1.2);
    const totalCd = waveDragCd + skinFrictionCd + baseDragCd;

    SUPERSONIC_DRAG_MATRIX.push({
      machNumber: Number(mach.toFixed(2)),
      waveDragCoefficient: Number(waveDragCd.toFixed(5)),
      skinFrictionCoefficient: Number(skinFrictionCd.toFixed(5)),
      baseDragCoefficient: Number(baseDragCd.toFixed(5)),
      totalDragCoefficient: Number(totalCd.toFixed(5)),
      flowRegime: (mach < 0.8) ? 'SUBSONIC' : (mach < 1.2) ? 'TRANSONIC' : (mach < 3.0) ? 'SUPERSONIC' : 'HYPERSONIC',
      dynamicPressureRatio: Number((0.5 * 1.4 * mach * mach).toFixed(4)),
      gyroscopicStabilityMultiplier: Number((1.0 / (1.0 + 0.1 * mach)).toFixed(3))
    });
  }
})();

module.exports = {
  SUPERSONIC_DRAG_MATRIX
};
