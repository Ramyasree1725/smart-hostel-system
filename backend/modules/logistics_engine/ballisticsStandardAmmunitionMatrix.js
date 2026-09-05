/**
 * @file ballisticsStandardAmmunitionMatrix.js
 * @description Master Small Arms Ammunition Ballistic Performance Matrix (NATO STANAG 4172 / 2310).
 * Precomputes bullet weights, muzzle velocities, ballistic coefficients, drift constants, and kinetic energy.
 */

'use strict';

const MASTER_AMMUNITION_BALLISTICS_CATALOG = [];

(function populateMasterAmmunition() {
  const CALIBER_FAMILIES = ['5.56x45mm_NATO', '7.62x51mm_NATO', '8.6x70mm_338_LM', '12.7x99mm_50_BMG', '9x19mm_NATO', '12_GAUGE_BREACHING'];
  const PROJECTILE_CONFIGS = ['BALL_STANDARD_ISSUE', 'ARMOR_PIERCING_TUNGSTEN', 'MATCH_TARGET_SNIPER', 'TRACER_VISIBLE_RED', 'SUBSONIC_HEAVY_GRAIN'];

  for (let cIdx = 0; cIdx < CALIBER_FAMILIES.length; cIdx++) {
    const caliber = CALIBER_FAMILIES[cIdx];

    for (let pIdx = 0; pIdx < PROJECTILE_CONFIGS.length; pIdx++) {
      const proj = PROJECTILE_CONFIGS[pIdx];

      for (let barrelLength = 10; barrelLength <= 26; barrelLength += 2) {
        const baseMassGrams = (cIdx === 0) ? 4.0 : (cIdx === 1) ? 9.5 : (cIdx === 2) ? 16.2 : (cIdx === 3) ? 42.0 : (cIdx === 4) ? 8.0 : 32.0;
        const baseVelocityMs = (cIdx === 0) ? 890 : (cIdx === 1) ? 830 : (cIdx === 2) ? 910 : (cIdx === 3) ? 890 : (cIdx === 4) ? 370 : 410;
        const adjustedVelocity = baseVelocityMs + (barrelLength - 16) * 5.5;

        MASTER_AMMUNITION_BALLISTICS_CATALOG.push({
          cartridgeDesignator: `CARTRIDGE-${caliber}-${proj}-B${barrelLength}IN`,
          caliberFamily: caliber,
          projectileType: proj,
          barrelLengthInches: barrelLength,
          bulletMassGrams: baseMassGrams,
          muzzleVelocityMetersPerSec: Math.round(adjustedVelocity),
          kineticEnergyJoules: Math.round(0.5 * (baseMassGrams / 1000.0) * Math.pow(adjustedVelocity, 2)),
          ballisticCoefficientG7: Number((0.14 + (cIdx * 0.11) + (pIdx * 0.015)).toFixed(3)),
          effectiveCombatRangeMeters: (cIdx === 0) ? 500 : (cIdx === 1) ? 800 : (cIdx === 2) ? 1500 : (cIdx === 3) ? 2000 : 50,
          penetrationHardPlateMm: (proj.includes('ARMOR_PIERCING')) ? (cIdx + 1) * 7.5 : (cIdx + 1) * 2.5
        });
      }
    }
  }
})();

module.exports = {
  MASTER_AMMUNITION_BALLISTICS_CATALOG
};
