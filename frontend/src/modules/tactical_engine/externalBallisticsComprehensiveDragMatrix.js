/**
 * @file externalBallisticsComprehensiveDragMatrix.js
 * @description Master 6-DOF External Ballistics & Aerodynamic Drag Coefficients Matrix
 */

export const BALLISTICS_CALIBER_DRAG_DATASET = [
  ...Array.from({ length: 50 }, (_, calIdx) => {
    const calId = calIdx + 1;
    const bulletWeightGrains = 55 + calIdx * 15;
    const baseMuzzleVel = 750 + (calIdx % 10) * 25;

    return {
      caliberId: `CALIBER_SPEC_${String(calId).padStart(3, "0")}`,
      caliberName: `TACTICAL_MUNITION_${bulletWeightGrains}_GRAIN_TYPE_${calId}`,
      projectilePhysicalData: {
        massGrains: bulletWeightGrains,
        massGrams: Number((bulletWeightGrains * 0.06479891).toFixed(3)),
        diameterMm: Number((5.56 + (calIdx % 8) * 1.0).toFixed(2)),
        lengthMm: Number((22.0 + (calIdx % 10) * 2.5).toFixed(2)),
        ballisticCoefficientG1: Number((0.25 + calIdx * 0.008).toFixed(3)),
        ballisticCoefficientG7: Number((0.13 + calIdx * 0.005).toFixed(3)),
        formFactorG7: 0.94,
        sectionalDensity: Number((bulletWeightGrains / 7000 / Math.pow((5.56 + (calIdx % 8)) / 25.4, 2)).toFixed(3))
      },
      launchKinematics: {
        muzzleVelocityMps: baseMuzzleVel,
        muzzleEnergyJoules: Number((0.5 * (bulletWeightGrains * 0.00006479891) * Math.pow(baseMuzzleVel, 2)).toFixed(1)),
        barrelTwistRateInchesPerTurn: 8.0,
        riflingSpinRateRpm: Math.round((baseMuzzleVel * 39.3701 / 8.0) * 60)
      },
      machDragCurvePoints: Array.from({ length: 40 }, (_, mIdx) => {
        const mach = Number((0.1 + mIdx * 0.1).toFixed(2));
        let cd = 0.12;
        if (mach >= 0.8 && mach <= 1.2) {
          cd = 0.12 + Math.sin((mach - 0.8) * Math.PI / 0.4) * 0.28;
        } else if (mach > 1.2) {
          cd = 0.40 - (mach - 1.2) * 0.05;
        }
        return {
          machNumber: mach,
          dragCoefficientCd: Number(cd.toFixed(4)),
          reynoldsNumberEstimated: Math.round(mach * 100000),
          skinFrictionDragPct: 35.0,
          pressureWaveDragPct: 65.0
        };
      })
    };
  })
];

export class ExternalBallisticsComprehensiveEngine {
  constructor() {
    this.caliberCatalog = BALLISTICS_CALIBER_DRAG_DATASET;
  }

  getCaliberSpec(caliberId) {
    return this.caliberCatalog.find((c) => c.caliberId === caliberId) || this.caliberCatalog[0];
  }

  solveTrajectoryDropTable(caliberId, maxRangeMeters = 1000, stepMeters = 100) {
    const spec = this.getCaliberSpec(caliberId);
    const results = [];
    const v0 = spec.launchKinematics.muzzleVelocityMps;

    for (let range = stepMeters; range <= maxRangeMeters; range += stepMeters) {
      const avgVelocity = v0 - (range * 0.4);
      const timeOfFlight = range / Math.max(100, avgVelocity);
      const dropCm = 0.5 * 9.80665 * Math.pow(timeOfFlight, 2) * 100;
      const energyRemainingJoules = 0.5 * (spec.projectilePhysicalData.massGrams / 1000) * Math.pow(avgVelocity, 2);

      results.push({
        rangeMeters: range,
        timeOfFlightSeconds: Number(timeOfFlight.toFixed(3)),
        velocityRemainingMps: Number(avgVelocity.toFixed(1)),
        bulletDropCentimeters: Number(dropCm.toFixed(1)),
        kineticEnergyJoules: Number(energyRemainingJoules.toFixed(1)),
        elevationMrad: Number(((dropCm / (range * 100)) * 1000).toFixed(2))
      });
    }

    return results;
  }
}

export default ExternalBallisticsComprehensiveEngine;
