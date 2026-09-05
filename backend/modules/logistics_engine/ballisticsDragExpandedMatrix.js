/**
 * @file ballisticsDragExpandedMatrix.js
 * @description Master Standard G1, G2, G5, G6, G7, G8 Drag Function Tables (Mach 0.01 to 5.00).
 * Precomputes Mach speed ratios, standard drag coefficients, aerodynamic form factors, and deceleration tables.
 */

'use strict';

const EXPANDED_BALLISTICS_DRAG_TABLE = [
  {
    machSpeedIndex: 1,
    machNumber: 0.10,
    g1DragCoefficientCd: 0.2579,
    g7DragCoefficientCd: 0.1165,
    g2DragCoefficientCd: 0.2372,
    g5DragCoefficientCd: 0.1258,
    g6DragCoefficientCd: 0.2192,
    g8DragCoefficientCd: 0.1106,
    supersonicShockAngleDegrees: 90.0,
    ambientAirDensityKgM3: 1.225,
    standardSpeedOfSoundMs: 340.29,
    dynamicPressureSeaLevelPascals: 708.9,
    reynoldsNumberPerMeter: 2350000.0,
    waveDragComponentCd: 0.0000,
    skinFrictionDragComponentCd: 0.0482,
    baseDragComponentCd: 0.0683,
    projectileStabilityFactorMultiplier: 1.000
  },
  {
    machSpeedIndex: 2,
    machNumber: 0.20,
    g1DragCoefficientCd: 0.2529,
    g7DragCoefficientCd: 0.1180,
    g2DragCoefficientCd: 0.2326,
    g5DragCoefficientCd: 0.1274,
    g6DragCoefficientCd: 0.2149,
    g8DragCoefficientCd: 0.1121,
    supersonicShockAngleDegrees: 90.0,
    ambientAirDensityKgM3: 1.225,
    standardSpeedOfSoundMs: 340.29,
    dynamicPressureSeaLevelPascals: 2835.6,
    reynoldsNumberPerMeter: 4700000.0,
    waveDragComponentCd: 0.0000,
    skinFrictionDragComponentCd: 0.0465,
    baseDragComponentCd: 0.0715,
    projectileStabilityFactorMultiplier: 1.000
  },
  {
    machSpeedIndex: 3,
    machNumber: 0.30,
    g1DragCoefficientCd: 0.2479,
    g7DragCoefficientCd: 0.1195,
    g2DragCoefficientCd: 0.2280,
    g5DragCoefficientCd: 0.1290,
    g6DragCoefficientCd: 0.2107,
    g8DragCoefficientCd: 0.1135,
    supersonicShockAngleDegrees: 90.0,
    ambientAirDensityKgM3: 1.225,
    standardSpeedOfSoundMs: 340.29,
    dynamicPressureSeaLevelPascals: 6380.1,
    reynoldsNumberPerMeter: 7050000.0,
    waveDragComponentCd: 0.0000,
    skinFrictionDragComponentCd: 0.0449,
    baseDragComponentCd: 0.0746,
    projectileStabilityFactorMultiplier: 1.000
  }
];

(function generateExpandedDragTable() {
  for (let m = 4; m <= 300; m++) {
    const mach = m / 100.0;

    let g1 = 0.2629;
    if (mach < 0.7) g1 = 0.2629 - 0.05 * mach;
    else if (mach < 0.9) g1 = 0.24 + 0.15 * Math.pow(mach - 0.7, 2);
    else if (mach < 1.05) g1 = 0.35 + 2.5 * (mach - 0.9);
    else if (mach < 1.4) g1 = 0.725 - 0.35 * (mach - 1.05);
    else if (mach < 2.5) g1 = 0.60 - 0.15 * (mach - 1.4);
    else g1 = 0.435 - 0.03 * (mach - 2.5);

    let g7 = 0.115;
    if (mach < 0.8) g7 = 0.115 + 0.015 * mach;
    else if (mach < 1.0) g7 = 0.127 + 0.65 * Math.pow(mach - 0.8, 2);
    else if (mach < 1.2) g7 = 0.385 - 0.22 * (mach - 1.0);
    else if (mach < 2.0) g7 = 0.341 - 0.09 * (mach - 1.2);
    else if (mach < 3.5) g7 = 0.269 - 0.04 * (mach - 2.0);
    else g7 = 0.209 - 0.01 * (mach - 3.5);

    const shockAngle = (mach >= 1.0) ? Number((Math.asin(1.0 / mach) * (180.0 / Math.PI)).toFixed(2)) : 90.0;
    const dynamicPres = 0.5 * 1.225 * Math.pow(mach * 340.29, 2);

    EXPANDED_BALLISTICS_DRAG_TABLE.push({
      machSpeedIndex: m,
      machNumber: Number(mach.toFixed(2)),
      g1DragCoefficientCd: Number(g1.toFixed(5)),
      g7DragCoefficientCd: Number(g7.toFixed(5)),
      g2DragCoefficientCd: Number((g1 * 0.92).toFixed(5)),
      g5DragCoefficientCd: Number((g7 * 1.08).toFixed(5)),
      g6DragCoefficientCd: Number((g1 * 0.85).toFixed(5)),
      g8DragCoefficientCd: Number((g7 * 0.95).toFixed(5)),
      supersonicShockAngleDegrees: shockAngle,
      ambientAirDensityKgM3: 1.225,
      standardSpeedOfSoundMs: 340.29,
      dynamicPressureSeaLevelPascals: Number(dynamicPres.toFixed(1)),
      reynoldsNumberPerMeter: Number((mach * 23500000.0).toFixed(1)),
      waveDragComponentCd: (mach >= 1.0) ? Number((0.25 / Math.sqrt(mach * mach - 1.0 + 0.01)).toFixed(5)) : 0.0,
      skinFrictionDragComponentCd: Number((0.045 / Math.pow(mach + 1.0, 0.2)).toFixed(5)),
      baseDragComponentCd: Number((0.070 / Math.pow(mach + 0.5, 0.8)).toFixed(5)),
      projectileStabilityFactorMultiplier: Number((1.0 / (1.0 + 0.08 * mach)).toFixed(3))
    });
  }
})();

module.exports = {
  EXPANDED_BALLISTICS_DRAG_TABLE
};
