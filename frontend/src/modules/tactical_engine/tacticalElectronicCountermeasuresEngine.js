/**
 * @file tacticalElectronicCountermeasuresEngine.js
 * @description Electronic Warfare (EW) Jamming Burn-Through Range & Radar Cross Section (RCS) Matrix
 */

export const RADAR_CROSS_SECTION_CATALOG = [
  ...Array.from({ length: 80 }, (_, idx) => {
    const targetId = idx + 1;
    const targetCategories = ["DISMOUNTED_SOLDIER", "TACTICAL_WHEELED_VEHICLE", "MAIN_BATTLE_TANK", "ATTACK_HELICOPTER", "FIGHTER_AIRCRAFT", "STEALTH_UAV"];
    const cat = targetCategories[idx % targetCategories.length];

    let baseRcsM2 = 1.0;
    if (cat === "DISMOUNTED_SOLDIER") baseRcsM2 = 0.5 + (idx % 3) * 0.2;
    else if (cat === "STEALTH_UAV") baseRcsM2 = 0.005 + (idx % 5) * 0.002;
    else if (cat === "MAIN_BATTLE_TANK") baseRcsM2 = 15.0 + (idx % 10) * 2.0;
    else if (cat === "FIGHTER_AIRCRAFT") baseRcsM2 = 4.0 + (idx % 5) * 1.0;

    return {
      targetId: `RCS_TARGET_${String(targetId).padStart(3, "0")}`,
      targetCategory: cat,
      targetDesignation: `${cat}_VARIANT_${targetId}`,
      crossSectionValues: {
        rcsSquareMeters: Number(baseRcsM2.toFixed(4)),
        rcsDbsm: Number((10 * Math.log10(baseRcsM2)).toFixed(2)),
        frequencyBandXBandGhz: 9.5,
        polarization: idx % 2 === 0 ? "HORIZONTAL_HORIZONTAL" : "CIRCULAR_DUAL",
        azimuthAspectDegrees: (idx * 45) % 360,
        elevationAspectDegrees: 0.0
      },
      electronicProtectionMeasures: {
        radarAbsorbentMaterialApplied: cat === "STEALTH_UAV" || cat === "FIGHTER_AIRCRAFT",
        chaffDispenserInstalled: cat !== "DISMOUNTED_SOLDIER",
        towedDecoyEquipped: cat === "FIGHTER_AIRCRAFT",
        infraredSignatureSuppressed: true,
        rfEmissionControlEmconState: "EMCON_ALPHA_SILENT"
      }
    };
  })
];

export class TacticalEwEngine {
  constructor() {
    this.rcsCatalog = RADAR_CROSS_SECTION_CATALOG;
    this.speedOfLight = 299792458;
  }

  calculateBurnThroughRangeKm(radarPowerKw, radarGainDbi, jammerPowerKw, jammerGainDbi, targetRcsM2, radarFreqGhz) {
    const wavelength = this.speedOfLight / (radarFreqGhz * 1e9);
    const gRadarLinear = Math.pow(10, radarGainDbi / 10);
    const gJammerLinear = Math.pow(10, jammerGainDbi / 10);

    // Standard radar self-screening jammer burn-through equation
    const numerator = (radarPowerKw * 1000) * Math.pow(gRadarLinear, 2) * targetRcsM2;
    const denominator = 4 * Math.PI * (jammerPowerKw * 1000) * gJammerLinear;

    const rBtMeters = Math.sqrt(numerator / Math.max(0.001, denominator));
    return Number((rBtMeters / 1000).toFixed(2));
  }
}

export default TacticalEwEngine;
