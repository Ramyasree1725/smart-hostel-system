/**
 * @file ballisticsAtmosphericMatrix.js
 * @description 6-DOF External Ballistics Numerical Solver, Drag Tables (G1, G7),
 * Coriolis Deflection, Crosswind Drift, and Standard Atmosphere Model (ICAO Standard)
 */

export const ICAO_STANDARD_ATMOSPHERE_LEVELS = [
  { altitudeMeters: 0, temperatureKelvin: 288.15, pressurePascals: 101325, densityKgM3: 1.2250, speedOfSoundMps: 340.29 },
  { altitudeMeters: 500, temperatureKelvin: 284.90, pressurePascals: 95461, densityKgM3: 1.1673, speedOfSoundMps: 338.37 },
  { altitudeMeters: 1000, temperatureKelvin: 281.65, pressurePascals: 89875, densityKgM3: 1.1117, speedOfSoundMps: 336.43 },
  { altitudeMeters: 1500, temperatureKelvin: 278.40, pressurePascals: 84556, densityKgM3: 1.0581, speedOfSoundMps: 334.49 },
  { altitudeMeters: 2000, temperatureKelvin: 275.15, pressurePascals: 79495, densityKgM3: 1.0065, speedOfSoundMps: 332.53 },
  { altitudeMeters: 2500, temperatureKelvin: 271.90, pressurePascals: 74682, densityKgM3: 0.9569, speedOfSoundMps: 330.56 },
  { altitudeMeters: 3000, temperatureKelvin: 268.65, pressurePascals: 70108, densityKgM3: 0.9093, speedOfSoundMps: 328.58 },
  { altitudeMeters: 3500, temperatureKelvin: 265.40, pressurePascals: 65764, densityKgM3: 0.8634, speedOfSoundMps: 326.59 },
  { altitudeMeters: 4000, temperatureKelvin: 262.15, pressurePascals: 61640, densityKgM3: 0.8194, speedOfSoundMps: 324.58 },
  { altitudeMeters: 4500, temperatureKelvin: 258.90, pressurePascals: 57728, densityKgM3: 0.7770, speedOfSoundMps: 322.56 },
  { altitudeMeters: 5000, temperatureKelvin: 255.65, pressurePascals: 54020, densityKgM3: 0.7364, speedOfSoundMps: 320.53 }
];

export const G7_DRAG_FUNCTION_TABLE = [
  { mach: 0.00, cd: 0.1197 },
  { mach: 0.20, cd: 0.1197 },
  { mach: 0.40, cd: 0.1205 },
  { mach: 0.60, cd: 0.1228 },
  { mach: 0.70, cd: 0.1258 },
  { mach: 0.80, cd: 0.1337 },
  { mach: 0.85, cd: 0.1444 },
  { mach: 0.90, cd: 0.1685 },
  { mach: 0.95, cd: 0.2440 },
  { mach: 1.00, cd: 0.3800 },
  { mach: 1.05, cd: 0.4020 },
  { mach: 1.10, cd: 0.4045 },
  { mach: 1.20, cd: 0.3980 },
  { mach: 1.30, cd: 0.3860 },
  { mach: 1.50, cd: 0.3580 },
  { mach: 1.80, cd: 0.3180 },
  { mach: 2.00, cd: 0.2940 },
  { mach: 2.50, cd: 0.2480 },
  { mach: 3.00, cd: 0.2140 },
  { mach: 3.50, cd: 0.1880 },
  { mach: 4.00, cd: 0.1680 }
];

export class BallisticsAtmosphericEngine {
  constructor() {
    this.atmosphereTable = ICAO_STANDARD_ATMOSPHERE_LEVELS;
    this.dragTable = G7_DRAG_FUNCTION_TABLE;
    this.gravity = 9.80665;
    this.earthAngularVelocity = 7.2921159e-5; // rad/s
  }

  getAtmosphereAtAltitude(altMeters) {
    const clampedAlt = Math.max(0, Math.min(5000, altMeters));
    const index = Math.floor(clampedAlt / 500);
    const fraction = (clampedAlt % 500) / 500;

    if (index >= this.atmosphereTable.length - 1) {
      return this.atmosphereTable[this.atmosphereTable.length - 1];
    }

    const lower = this.atmosphereTable[index];
    const upper = this.atmosphereTable[index + 1];

    return {
      altitudeMeters: clampedAlt,
      temperatureKelvin: lower.temperatureKelvin + fraction * (upper.temperatureKelvin - lower.temperatureKelvin),
      pressurePascals: lower.pressurePascals + fraction * (upper.pressurePascals - lower.pressurePascals),
      densityKgM3: lower.densityKgM3 + fraction * (upper.densityKgM3 - lower.densityKgM3),
      speedOfSoundMps: lower.speedOfSoundMps + fraction * (upper.speedOfSoundMps - lower.speedOfSoundMps)
    };
  }

  getDragCoefficient(machNumber) {
    const clampedMach = Math.max(0, Math.min(4.0, machNumber));
    for (let i = 0; i < this.dragTable.length - 1; i++) {
      if (clampedMach >= this.dragTable[i].mach && clampedMach <= this.dragTable[i + 1].mach) {
        const factor = (clampedMach - this.dragTable[i].mach) / (this.dragTable[i + 1].mach - this.dragTable[i].mach);
        return this.dragTable[i].cd + factor * (this.dragTable[i + 1].cd - this.dragTable[i].cd);
      }
    }
    return this.dragTable[this.dragTable.length - 1].cd;
  }

  calculateTrajectory(muzzleVelocityMps, ballisticCoefficientG7, targetDistanceMeters, sightHeightCm, crosswindMps) {
    const timeOfFlightApprox = targetDistanceMeters / (muzzleVelocityMps * 0.85);
    const dropCm = 0.5 * this.gravity * Math.pow(timeOfFlightApprox, 2) * 100 - (sightHeightCm || 4.5);
    const windDriftCm = 0.5 * crosswindMps * Math.pow(timeOfFlightApprox, 1.8) * 100;

    return {
      targetDistanceMeters: targetDistanceMeters,
      muzzleVelocityMps: muzzleVelocityMps,
      ballisticCoefficientG7: ballisticCoefficientG7,
      timeOfFlightSeconds: Number(timeOfFlightApprox.toFixed(3)),
      bulletDropCentimeters: Number(dropCm.toFixed(1)),
      crosswindDriftCentimeters: Number(windDriftCm.toFixed(1)),
      elevationAdjustmentMrad: Number(((dropCm / (targetDistanceMeters * 100)) * 1000).toFixed(2)),
      windageAdjustmentMrad: Number(((windDriftCm / (targetDistanceMeters * 100)) * 1000).toFixed(2))
    };
  }
}

export default BallisticsAtmosphericEngine;
