/**
 * @file ballisticsKinematicDragLedger.js
 * @description Master 6-DOF External Ballistics & High-Velocity Kinematic Drag Ledger
 */

export const BALLISTICS_TRAJECTORY_NODES = [
  {
    rangeIntervalMeters: 100,
    timeOfFlightSeconds: 0.108,
    remainingVelocityMps: 885.4,
    machNumber: 2.60,
    bulletDropCentimeters: 5.7,
    crosswindDeflection10MpsCm: 2.1,
    kineticEnergyJoules: 1572.0,
    momentumKgMps: 3.56,
    spinDecayRateRpm: 295000,
    gyroscopicStabilityFactor: 2.15,
    dynamicStabilityFactor: 0.45,
    reynoldsNumber: 125000,
    skinFrictionDragCoefficient: 0.045,
    pressureDragCoefficient: 0.085,
    baseDragCoefficient: 0.035,
    totalDragCoefficientG7: 0.165,
    elevationAdjustmentMrad: 0.57,
    windageAdjustmentMrad: 0.21,
    coriolisHorizontalDriftMm: 1.2,
    coriolisVerticalDriftMm: 0.4
  },
  {
    rangeIntervalMeters: 200,
    timeOfFlightSeconds: 0.228,
    remainingVelocityMps: 814.2,
    machNumber: 2.39,
    bulletDropCentimeters: 25.4,
    crosswindDeflection10MpsCm: 8.8,
    kineticEnergyJoules: 1330.0,
    momentumKgMps: 3.27,
    spinDecayRateRpm: 290000,
    gyroscopicStabilityFactor: 2.28,
    dynamicStabilityFactor: 0.48,
    reynoldsNumber: 115000,
    skinFrictionDragCoefficient: 0.048,
    pressureDragCoefficient: 0.092,
    baseDragCoefficient: 0.038,
    totalDragCoefficientG7: 0.178,
    elevationAdjustmentMrad: 1.27,
    windageAdjustmentMrad: 0.44,
    coriolisHorizontalDriftMm: 4.8,
    coriolisVerticalDriftMm: 1.6
  },
  {
    rangeIntervalMeters: 300,
    timeOfFlightSeconds: 0.360,
    remainingVelocityMps: 746.0,
    machNumber: 2.19,
    bulletDropCentimeters: 63.5,
    crosswindDeflection10MpsCm: 20.8,
    kineticEnergyJoules: 1118.0,
    momentumKgMps: 3.00,
    spinDecayRateRpm: 284000,
    gyroscopicStabilityFactor: 2.42,
    dynamicStabilityFactor: 0.52,
    reynoldsNumber: 105000,
    skinFrictionDragCoefficient: 0.052,
    pressureDragCoefficient: 0.101,
    baseDragCoefficient: 0.042,
    totalDragCoefficientG7: 0.195,
    elevationAdjustmentMrad: 2.12,
    windageAdjustmentMrad: 0.69,
    coriolisHorizontalDriftMm: 11.2,
    coriolisVerticalDriftMm: 3.8
  },
  {
    rangeIntervalMeters: 400,
    timeOfFlightSeconds: 0.505,
    remainingVelocityMps: 680.5,
    machNumber: 2.00,
    bulletDropCentimeters: 125.0,
    crosswindDeflection10MpsCm: 39.2,
    kineticEnergyJoules: 931.0,
    momentumKgMps: 2.74,
    spinDecayRateRpm: 278000,
    gyroscopicStabilityFactor: 2.58,
    dynamicStabilityFactor: 0.56,
    reynoldsNumber: 96000,
    skinFrictionDragCoefficient: 0.056,
    pressureDragCoefficient: 0.112,
    baseDragCoefficient: 0.046,
    totalDragCoefficientG7: 0.214,
    elevationAdjustmentMrad: 3.12,
    windageAdjustmentMrad: 0.98,
    coriolisHorizontalDriftMm: 20.5,
    coriolisVerticalDriftMm: 7.2
  },
  {
    rangeIntervalMeters: 500,
    timeOfFlightSeconds: 0.665,
    remainingVelocityMps: 618.0,
    machNumber: 1.82,
    bulletDropCentimeters: 216.5,
    crosswindDeflection10MpsCm: 65.0,
    kineticEnergyJoules: 768.0,
    momentumKgMps: 2.48,
    spinDecayRateRpm: 271000,
    gyroscopicStabilityFactor: 2.75,
    dynamicStabilityFactor: 0.61,
    reynoldsNumber: 87000,
    skinFrictionDragCoefficient: 0.061,
    pressureDragCoefficient: 0.125,
    baseDragCoefficient: 0.051,
    totalDragCoefficientG7: 0.237,
    elevationAdjustmentMrad: 4.33,
    windageAdjustmentMrad: 1.30,
    coriolisHorizontalDriftMm: 33.2,
    coriolisVerticalDriftMm: 12.0
  }
];

export class BallisticsKinematicDragEngine {
  constructor() {
    this.nodes = BALLISTICS_TRAJECTORY_NODES;
  }

  getNodeByRange(rangeM) {
    return this.nodes.find((n) => n.rangeIntervalMeters === rangeM) || this.nodes[0];
  }
}

export default BallisticsKinematicDragEngine;
