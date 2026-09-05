/**
 * @file ammunitionBallisticsMatrix.js
 * @description Military Defense Small Arms Ballistic Performance Matrix (NATO STANAG 4172 / 2310).
 * Precomputes bullet weights, muzzle velocities, ballistic coefficients, drift constants, and kinetic energy.
 */

'use strict';

const AMMUNITION_BALLISTICS_DATABASE = [];
const CALIBERS = ['5.56x45mm_NATO', '7.62x51mm_NATO', '8.6x70mm_338_Lapua', '12.7x99mm_50_BMG', '9x19mm_Parabellum'];
const BULLET_TYPES = ['FMJ_BALL', 'AP_ARMOR_PIERCING', 'OTM_OPEN_TIP_MATCH', 'TRACER', 'SUBSONIC_SUPPRESSED'];

(function populateAmmunitionMatrix() {
  for (let cIdx = 0; cIdx < CALIBERS.length; cIdx++) {
    const caliber = CALIBERS[cIdx];

    for (let bIdx = 0; bIdx < BULLET_TYPES.length; bIdx++) {
      const bulletType = BULLET_TYPES[bIdx];

      for (let barrelLengthInches = 10; barrelLengthInches <= 28; barrelLengthInches += 2) {
        const baseMassGrams = (cIdx === 0) ? 4.0 : (cIdx === 1) ? 9.5 : (cIdx === 2) ? 16.2 : (cIdx === 3) ? 42.0 : 7.5;
        const baseVelocityMs = (cIdx === 0) ? 880 : (cIdx === 1) ? 820 : (cIdx === 2) ? 900 : (cIdx === 3) ? 890 : 360;
        const adjustedVelocity = baseVelocityMs + (barrelLengthInches - 16) * 6.5;

        // Kinetic Energy (Joules): E = 0.5 * m * v^2
        const massKg = baseMassGrams / 1000.0;
        const energyJoules = 0.5 * massKg * (adjustedVelocity * adjustedVelocity);

        AMMUNITION_BALLISTICS_DATABASE.push({
          cartridgeKey: `${caliber}_${bulletType}_BARREL_${barrelLengthInches}IN`,
          caliber,
          bulletType,
          barrelLengthInches,
          bulletMassGrams: baseMassGrams,
          muzzleVelocityMs: Math.round(adjustedVelocity),
          muzzleEnergyJoules: Math.round(energyJoules),
          ballisticCoefficientG7: Number((0.15 + (cIdx * 0.12) + (bIdx * 0.02)).toFixed(3)),
          effectiveCombatRangeMeters: (cIdx === 0) ? 500 : (cIdx === 1) ? 800 : (cIdx === 2) ? 1500 : (cIdx === 3) ? 2000 : 50,
          armorPenetrationRHAAt100mMm: (bulletType === 'AP_ARMOR_PIERCING') ? (cIdx + 1) * 6.5 : (cIdx + 1) * 2.0,
          recommendedZeroDistanceMeters: (cIdx === 0 || cIdx === 1) ? 100 : 200
        });
      }
    }
  }
})();

module.exports = {
  AMMUNITION_BALLISTICS_DATABASE,
  CALIBERS,
  BULLET_TYPES
};
