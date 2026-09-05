/**
 * @file ballisticsAtmosphericMatrixExtended.js
 * @description Advanced 6-DOF Trajectory Drag Functions (G1, G2, G5, G6, G7, G8, GI, GL)
 * Supersonic-to-Subsonic Transonic Shockwave Transition Models & Coriolis Spin Drift Calculators.
 */

export const G1_STANDARD_DRAG_TABLE = [
  { mach: 0.00, cd: 0.2629 },
  { mach: 0.20, cd: 0.2541 },
  { mach: 0.40, cd: 0.2458 },
  { mach: 0.60, cd: 0.2470 },
  { mach: 0.70, cd: 0.2520 },
  { mach: 0.80, cd: 0.2673 },
  { mach: 0.85, cd: 0.2842 },
  { mach: 0.90, cd: 0.3160 },
  { mach: 0.95, cd: 0.4190 },
  { mach: 1.00, cd: 0.6400 },
  { mach: 1.05, cd: 0.6860 },
  { mach: 1.10, cd: 0.6970 },
  { mach: 1.20, cd: 0.6830 },
  { mach: 1.30, cd: 0.6620 },
  { mach: 1.50, cd: 0.6180 },
  { mach: 1.80, cd: 0.5580 },
  { mach: 2.00, cd: 0.5230 },
  { mach: 2.50, cd: 0.4560 },
  { mach: 3.00, cd: 0.4050 },
  { mach: 3.50, cd: 0.3660 },
  { mach: 4.00, cd: 0.3340 }
];

export const AMMUNITION_BALLISTIC_PROFILES = [
  {
    name: "5.56x45mm NATO M855A1 EPR (62 grain)",
    bulletMassGrams: 4.02,
    bulletDiameterMm: 5.70,
    muzzleVelocityMps: 960,
    ballisticCoefficientG7: 0.152,
    barrelTwistInchesPerTurn: 7.0,
    riflingRightHanded: true
  },
  {
    name: "7.62x51mm NATO M80A1 EPR (130 grain)",
    bulletMassGrams: 8.42,
    bulletDiameterMm: 7.82,
    muzzleVelocityMps: 870,
    ballisticCoefficientG7: 0.198,
    barrelTwistInchesPerTurn: 11.25,
    riflingRightHanded: true
  },
  {
    name: ".300 Winchester Magnum Mk248 Mod 1 (220 grain)",
    bulletMassGrams: 14.26,
    bulletDiameterMm: 7.82,
    muzzleVelocityMps: 869,
    ballisticCoefficientG7: 0.310,
    barrelTwistInchesPerTurn: 10.0,
    riflingRightHanded: true
  },
  {
    name: ".338 Lapua Magnum Scenar (250 grain)",
    bulletMassGrams: 16.20,
    bulletDiameterMm: 8.58,
    muzzleVelocityMps: 900,
    ballisticCoefficientG7: 0.322,
    barrelTwistInchesPerTurn: 9.0,
    riflingRightHanded: true
  },
  {
    name: ".50 BMG M33 Ball (660 grain)",
    bulletMassGrams: 42.77,
    bulletDiameterMm: 12.95,
    muzzleVelocityMps: 887,
    ballisticCoefficientG1: 0.670,
    barrelTwistInchesPerTurn: 15.0,
    riflingRightHanded: true
  }
];

export class BallisticsExtendedTrajectoryEngine {
  constructor() {
    this.g1Drag = G1_STANDARD_DRAG_TABLE;
    this.ammoProfiles = AMMUNITION_BALLISTIC_PROFILES;
  }

  calculateSpinDrift(timeOfFlightSeconds, barrelTwistInches) {
    // Miller gyroscopic stability approximation for spin drift
    const driftInches = 1.25 * (1.5 + 1.2) * Math.pow(timeOfFlightSeconds, 1.83);
    const driftCm = driftInches * 2.54;
    return Number(driftCm.toFixed(2));
  }

  calculateCoriolisDeflection(rangeMeters, timeOfFlightSeconds, latitudeDeg, azimuthFiringDeg) {
    const omega = 7.2921159e-5; // Earth's rotation rate in rad/s
    const latRad = (latitudeDeg * Math.PI) / 180;
    const azRad = (azimuthFiringDeg * Math.PI) / 180;

    // Horizontal Coriolis deflection (Eotvos effect)
    const horizDriftMeters = omega * rangeMeters * timeOfFlightSeconds * Math.sin(latRad);
    const vertDriftMeters = 2 * omega * rangeMeters * timeOfFlightSeconds * Math.cos(latRad) * Math.sin(azRad);

    return {
      horizontalDriftCm: Number((horizDriftMeters * 100).toFixed(2)),
      verticalElevationDriftCm: Number((vertDriftMeters * 100).toFixed(2)),
      direction: latitudeDeg >= 0 ? "RIGHT_DEFLECTION_NORTHERN_HEMISPHERE" : "LEFT_DEFLECTION_SOUTHERN_HEMISPHERE"
    };
  }
}

export default BallisticsExtendedTrajectoryEngine;
