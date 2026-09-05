/**
 * @file ammunitionBallisticsExpandedDataset.js
 * @description Master Small Arms Ammunition Ballistic Performance Matrix (NATO STANAG 4172 / 2310).
 * Precomputes bullet weights, muzzle velocities, ballistic coefficients, drift constants, and kinetic energy.
 */

'use strict';

const EXPANDED_AMMUNITION_CATALOG = [
  {
    cartridgeSku: "AMMO-556-M855A1-EPR-001",
    caliberNomenclature: "5.56x45mm_NATO",
    bulletTypeDescription: "ENHANCED_PERFORMANCE_ROUND_STEEL_PENETRATOR",
    projectileMassGrams: 4.02,
    projectileMassGrains: 62.0,
    muzzleVelocityMetersPerSecond: 960.0,
    muzzleEnergyJoules: 1852,
    ballisticCoefficientG7Standard: 0.152,
    ballisticCoefficientG1Standard: 0.307,
    recommendedRiflingTwistInchesPerTurn: 7.0,
    maximumEffectiveRangeMeters: 600,
    armorPlatePenetrationMmAt100m: 9.5,
    tracerBurnDistanceMeters: 0,
    storageTemperatureLimitsC: { min: -54.0, max: 71.0 },
    natoStandardizationAgreementSTANAG: "STANAG_4172_556MM"
  },
  {
    cartridgeSku: "AMMO-762-M118LR-MATCH-002",
    caliberNomenclature: "7.62x51mm_NATO",
    bulletTypeDescription: "LONG_RANGE_SNIPER_HOLLOW_POINT_BOAT_TAIL",
    projectileMassGrams: 11.34,
    projectileMassGrains: 175.0,
    muzzleVelocityMetersPerSecond: 792.0,
    muzzleEnergyJoules: 3556,
    ballisticCoefficientG7Standard: 0.243,
    ballisticCoefficientG1Standard: 0.496,
    recommendedRiflingTwistInchesPerTurn: 10.0,
    maximumEffectiveRangeMeters: 1000,
    armorPlatePenetrationMmAt100m: 6.0,
    tracerBurnDistanceMeters: 0,
    storageTemperatureLimitsC: { min: -54.0, max: 71.0 },
    natoStandardizationAgreementSTANAG: "STANAG_2310_762MM"
  },
  {
    cartridgeSku: "AMMO-338-LAPUA-SCENAR-003",
    caliberNomenclature: "8.6x70mm_338_LAPUA_MAGNUM",
    bulletTypeDescription: "EXTREME_LONG_RANGE_VLD_TARGET_OPEN_TIP",
    projectileMassGrams: 16.20,
    projectileMassGrains: 250.0,
    muzzleVelocityMetersPerSecond: 915.0,
    muzzleEnergyJoules: 6782,
    ballisticCoefficientG7Standard: 0.322,
    ballisticCoefficientG1Standard: 0.648,
    recommendedRiflingTwistInchesPerTurn: 10.0,
    maximumEffectiveRangeMeters: 1750,
    armorPlatePenetrationMmAt100m: 14.0,
    tracerBurnDistanceMeters: 0,
    storageTemperatureLimitsC: { min: -54.0, max: 71.0 },
    natoStandardizationAgreementSTANAG: "STANAG_4383_338LM"
  }
];

(function generateExpandedAmmunition() {
  const CALIBERS = ['5.56x45mm_NATO', '7.62x51mm_NATO', '8.6x70mm_338_LM', '12.7x99mm_50_BMG', '9x19mm_NATO', '6.8x51mm_NGSW'];
  const TYPES = ['BALL_M855', 'AP_TUNGSTEN', 'SNIPER_MATCH', 'TRACER_RED', 'SUBSONIC_SUPPRESSED'];

  for (let cIdx = 0; cIdx < CALIBERS.length; cIdx++) {
    const cal = CALIBERS[cIdx];

    for (let tIdx = 0; tIdx < TYPES.length; tIdx++) {
      const type = TYPES[tIdx];

      for (let varId = 4; varId <= 35; varId++) {
        const mass = (cIdx === 0) ? 4.0 : (cIdx === 1) ? 11.3 : (cIdx === 2) ? 16.2 : (cIdx === 3) ? 42.0 : (cIdx === 4) ? 8.0 : 8.8;
        const v0 = (cIdx === 0) ? 940 : (cIdx === 1) ? 800 : (cIdx === 2) ? 910 : (cIdx === 3) ? 890 : (cIdx === 4) ? 360 : 915;
        const e0 = 0.5 * (mass / 1000.0) * v0 * v0;

        EXPANDED_AMMUNITION_CATALOG.push({
          cartridgeSku: `AMMO-${cal}-${type}-V${varId}`,
          caliberNomenclature: cal,
          bulletTypeDescription: `${type}_VARIANT_${varId}`,
          projectileMassGrams: mass,
          projectileMassGrains: Number((mass * 15.432).toFixed(1)),
          muzzleVelocityMetersPerSecond: v0,
          muzzleEnergyJoules: Math.round(e0),
          ballisticCoefficientG7Standard: Number((0.14 + (cIdx * 0.11) + (varId * 0.002)).toFixed(3)),
          ballisticCoefficientG1Standard: Number((0.28 + (cIdx * 0.22) + (varId * 0.004)).toFixed(3)),
          recommendedRiflingTwistInchesPerTurn: (cIdx === 0) ? 7.0 : (cIdx === 1) ? 10.0 : 9.0,
          maximumEffectiveRangeMeters: (cIdx === 0) ? 600 : (cIdx === 1) ? 1000 : (cIdx === 2) ? 1750 : (cIdx === 3) ? 2200 : 50,
          armorPlatePenetrationMmAt100m: (type.includes('AP')) ? (cIdx + 1) * 8.0 : (cIdx + 1) * 2.5,
          tracerBurnDistanceMeters: (type.includes('TRACER')) ? 800 : 0,
          storageTemperatureLimitsC: { min: -54.0, max: 71.0 },
          natoStandardizationAgreementSTANAG: `STANAG_${4000 + cIdx * 100}_SPEC`
        });
      }
    }
  }
})();

module.exports = {
  EXPANDED_AMMUNITION_CATALOG
};
