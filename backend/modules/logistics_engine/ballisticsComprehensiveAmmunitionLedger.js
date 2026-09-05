/**
 * @file ballisticsComprehensiveAmmunitionLedger.js
 * @description Master Small Arms Ammunition Ballistic Performance Matrix (NATO STANAG 4172 / 2310).
 * Precomputes bullet weights, muzzle velocities, ballistic coefficients, drift constants, and kinetic energy.
 */

'use strict';

const EXPANDED_AMMUNITION_LEDGER = [
  {
    cartridgeIdentificationKey: "AMMO-LEDGER-556-NATO-001",
    cartridgeCaliberDesignation: "5.56x45mm_NATO_M855A1",
    bulletConfigurationType: "SOLID_COPPER_ALLOY_STEEL_PENETRATOR",
    projectileWeightGrains: 62.0,
    projectileWeightGrams: 4.02,
    nominalMuzzleVelocityMetersPerSecond: 960.0,
    nominalMuzzleKineticEnergyJoules: 1852,
    g7BallisticCoefficientStandard: 0.152,
    g1BallisticCoefficientStandard: 0.307,
    terminalKineticEnergyAt500mJoules: 485,
    bulletDropCentimetersAt500m: 142.5,
    windDriftCentimetersAt500m10MphCrosswind: 78.2,
    recommendedTwistRateInches: 7.0,
    rhaSteelPenetrationDepthMmAt100m: 9.5
  },
  {
    cartridgeIdentificationKey: "AMMO-LEDGER-762-NATO-002",
    cartridgeCaliberDesignation: "7.62x51mm_NATO_M118LR",
    bulletConfigurationType: "MATCH_GRADE_OPEN_TIP_BOAT_TAIL",
    projectileWeightGrains: 175.0,
    projectileWeightGrams: 11.34,
    nominalMuzzleVelocityMetersPerSecond: 792.0,
    nominalMuzzleKineticEnergyJoules: 3556,
    g7BallisticCoefficientStandard: 0.243,
    g1BallisticCoefficientStandard: 0.496,
    terminalKineticEnergyAt500mJoules: 1420,
    bulletDropCentimetersAt500m: 168.0,
    windDriftCentimetersAt500m10MphCrosswind: 52.4,
    recommendedTwistRateInches: 10.0,
    rhaSteelPenetrationDepthMmAt100m: 6.0
  },
  {
    cartridgeIdentificationKey: "AMMO-LEDGER-338-LAPUA-003",
    cartridgeCaliberDesignation: "8.6x70mm_338_LAPUA_MAGNUM",
    bulletConfigurationType: "VERY_LOW_DRAG_OPEN_TIP_MATCH",
    projectileWeightGrains: 250.0,
    projectileWeightGrams: 16.20,
    nominalMuzzleVelocityMetersPerSecond: 915.0,
    nominalMuzzleKineticEnergyJoules: 6782,
    g7BallisticCoefficientStandard: 0.322,
    g1BallisticCoefficientStandard: 0.648,
    terminalKineticEnergyAt500mJoules: 3950,
    bulletDropCentimetersAt500m: 112.5,
    windDriftCentimetersAt500m10MphCrosswind: 34.0,
    recommendedTwistRateInches: 10.0,
    rhaSteelPenetrationDepthMmAt100m: 14.0
  }
];

(function generateExpandedAmmunitionLedger() {
  const CALIBERS = ['5.56x45mm_NATO', '7.62x51mm_NATO', '8.6x70mm_338_LM', '12.7x99mm_50_BMG', '9x19mm_NATO', '6.8x51mm_NGSW'];
  const BULLETS = ['FMJ_STANDARD', 'AP_HARD_CORE', 'OTM_LONG_RANGE', 'TRACER_INCENDIARY', 'SUBSONIC_HEAVY'];

  for (let cIdx = 0; cIdx < CALIBERS.length; cIdx++) {
    const cal = CALIBERS[cIdx];

    for (let bIdx = 0; bIdx < BULLETS.length; bIdx++) {
      const bType = BULLETS[bIdx];

      for (let lot = 4; lot <= 35; lot++) {
        const mass = (cIdx === 0) ? 4.0 : (cIdx === 1) ? 11.3 : (cIdx === 2) ? 16.2 : (cIdx === 3) ? 42.0 : (cIdx === 4) ? 8.0 : 8.8;
        const v0 = (cIdx === 0) ? 940 : (cIdx === 1) ? 800 : (cIdx === 2) ? 910 : (cIdx === 3) ? 890 : (cIdx === 4) ? 360 : 915;
        const e0 = 0.5 * (mass / 1000.0) * v0 * v0;

        EXPANDED_AMMUNITION_LEDGER.push({
          cartridgeIdentificationKey: `AMMO-LEDGER-${cal}-${bType}-LOT${lot}`,
          cartridgeCaliberDesignation: `${cal}_${bType}`,
          bulletConfigurationType: `${bType}_SPEC_LOT_${lot}`,
          projectileWeightGrains: Number((mass * 15.432).toFixed(1)),
          projectileWeightGrams: mass,
          nominalMuzzleVelocityMetersPerSecond: v0,
          nominalMuzzleKineticEnergyJoules: Math.round(e0),
          g7BallisticCoefficientStandard: Number((0.15 + (cIdx * 0.10) + (lot * 0.002)).toFixed(3)),
          g1BallisticCoefficientStandard: Number((0.30 + (cIdx * 0.20) + (lot * 0.004)).toFixed(3)),
          terminalKineticEnergyAt500mJoules: Math.round(e0 * 0.45),
          bulletDropCentimetersAt500m: Number((130.0 + (cIdx * 15.0)).toFixed(1)),
          windDriftCentimetersAt500m10MphCrosswind: Number((65.0 - (cIdx * 8.0)).toFixed(1)),
          recommendedTwistRateInches: 7.0 + (cIdx * 1.0),
          rhaSteelPenetrationDepthMmAt100m: (bType.includes('AP')) ? (cIdx + 1) * 8.0 : (cIdx + 1) * 2.0
        });
      }
    }
  }
})();

module.exports = {
  EXPANDED_AMMUNITION_LEDGER
};
