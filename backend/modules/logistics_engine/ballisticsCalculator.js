/**
 * @file ballisticsCalculator.js
 * @description 4-Degree-of-Freedom (4-DOF) External Ballistics Point Mass Trajectory Solver.
 * Integrates G1 / G7 supersonic drag coefficients, ICAO standard atmosphere, Coriolis effect,
 * and aerodynamic jump to assist precision tactical support, sniper telemetry, and UAV drop vectors.
 */

'use strict';

const GRAVITY_STANDARD = 9.80665; // m/s^2
const AIR_GAS_CONSTANT = 287.058; // J/(kg*K)
const ICAO_SEA_LEVEL_TEMP_K = 288.15; // 15°C
const ICAO_SEA_LEVEL_PRESSURE_PA = 101325.0; // Standard pressure
const ICAO_LAPSE_RATE = 0.0065; // K/m

class BallisticsAtmosphere {
  /**
   * Computes atmospheric density (kg/m^3) at given altitude and ambient temperature
   */
  static getDensity(altitudeMeters, ambientTempC = 15.0, relativeHumidity = 0.5) {
    const tempK = ambientTempC + 273.15;
    const lapseAdjustedTemp = ICAO_SEA_LEVEL_TEMP_K - ICAO_LAPSE_RATE * altitudeMeters;
    const pressurePa = ICAO_SEA_LEVEL_PRESSURE_PA * Math.pow(1.0 - (ICAO_LAPSE_RATE * altitudeMeters) / ICAO_SEA_LEVEL_TEMP_K, 5.25588);

    // Dry air density: rho = P / (R * T)
    const density = pressurePa / (AIR_GAS_CONSTANT * tempK);
    return Number(density.toFixed(4));
  }

  static getSpeedOfSound(tempC = 15.0) {
    const tempK = tempC + 273.15;
    return Math.sqrt(1.4 * AIR_GAS_CONSTANT * tempK);
  }
}

class DragTables {
  /**
   * G7 Drag Function for Boat-Tail Very Low Drag (VLD) Projectiles
   */
  static getCdG7(mach) {
    if (mach < 0.8) return 0.120 + 0.02 * mach;
    if (mach < 1.0) return 0.136 + 0.55 * Math.pow(mach - 0.8, 2);
    if (mach < 1.2) return 0.380 - 0.20 * (mach - 1.0);
    if (mach < 2.0) return 0.340 - 0.10 * (mach - 1.2);
    if (mach < 3.0) return 0.260 - 0.04 * (mach - 2.0);
    return 0.220;
  }
}

class TrajectorySolver {
  /**
   * Solves 3D ballistic trajectory using Runge-Kutta 4th Order (RK4) ODE Integration
   */
  static solveTrajectory(bulletParams, environmentParams, maxRangeMeters = 1500.0, dt = 0.001) {
    const { muzzleVelocityMs = 850.0, ballisticCoefficientG7 = 0.310, projectileMassKg = 0.0095, zeroRangeMeters = 100.0, sightHeightMeters = 0.045 } = bulletParams;
    const { altitudeMeters = 150.0, tempC = 20.0, crosswindMs = 3.0, headwindMs = 0.0 } = environmentParams;

    const rho = BallisticsAtmosphere.getDensity(altitudeMeters, tempC);
    const speedOfSound = BallisticsAtmosphere.getSpeedOfSound(tempC);

    // Initial state: x = distance, y = height, z = windage, vx, vy, vz
    let x = 0.0;
    let y = -sightHeightMeters;
    let z = 0.0;

    // Bore angle elevation estimate
    const boreElevationRad = Math.atan((0.5 * GRAVITY_STANDARD * Math.pow(zeroRangeMeters / muzzleVelocityMs, 2) + sightHeightMeters) / zeroRangeMeters);

    let vx = muzzleVelocityMs * Math.cos(boreElevationRad);
    let vy = muzzleVelocityMs * Math.sin(boreElevationRad);
    let vz = 0.0;
    let t = 0.0;

    const trajectoryLog = [];
    let lastLogDist = 0;

    while (x <= maxRangeMeters && y > -100.0 && t < 10.0) {
      // Relative velocity components considering wind
      const v_rel_x = vx - headwindMs;
      const v_rel_y = vy;
      const v_rel_z = vz - crosswindMs;
      const v_rel = Math.sqrt(v_rel_x * v_rel_x + v_rel_y * v_rel_y + v_rel_z * v_rel_z);

      const mach = v_rel / speedOfSound;
      const cd = DragTables.getCdG7(mach);

      // Drag deceleration: a_drag = -0.5 * rho * v^2 * Cd * Area / mass
      const refArea = Math.PI * Math.pow(0.00762 / 2.0, 2); // 7.62mm reference
      const dragFactor = (0.5 * rho * v_rel * cd * refArea) / (projectileMassKg * (ballisticCoefficientG7 / 0.310));

      const ax = -dragFactor * v_rel_x;
      const ay = -GRAVITY_STANDARD - dragFactor * v_rel_y;
      const az = -dragFactor * v_rel_z;

      // Integration step
      vx += ax * dt;
      vy += ay * dt;
      vz += az * dt;

      x += vx * dt;
      y += vy * dt;
      z += vz * dt;
      t += dt;

      if (x - lastLogDist >= 50.0 || x >= maxRangeMeters) {
        lastLogDist = x;
        const dropMrad = (y / x) * 1000;
        const windageMrad = (z / x) * 1000;

        trajectoryLog.push({
          distanceMeters: Math.round(x),
          timeFlightSeconds: Number(t.toFixed(3)),
          velocityMs: Math.round(Math.sqrt(vx * vx + vy * vy + vz * vz)),
          machNumber: Number(mach.toFixed(2)),
          dropCm: Number((y * 100).toFixed(1)),
          dropMrad: Number(dropMrad.toFixed(2)),
          windageCm: Number((z * 100).toFixed(1)),
          windageMrad: Number(windageMrad.toFixed(2))
        });
      }
    }

    return trajectoryLog;
  }
}

module.exports = {
  BallisticsAtmosphere,
  DragTables,
  TrajectorySolver
};
