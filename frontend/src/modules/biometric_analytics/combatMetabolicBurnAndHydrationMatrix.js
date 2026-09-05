/**
 * @file combatMetabolicBurnAndHydrationMatrix.js
 * @description Master Soldier Metabolic Energy Expenditure & Hydration Loss Ledger
 */

export const METABOLIC_ACTIVITY_PROFILES = [
  ...Array.from({ length: 100 }, (_, idx) => {
    const actId = idx + 1;
    const bodyWeights = [65, 70, 75, 80, 85, 90, 95];
    const weight = bodyWeights[idx % bodyWeights.length];
    const kitWeights = [15, 25, 35, 45];
    const kit = kitWeights[idx % kitWeights.length];

    return {
      activityProfileId: `MET_ACT_${String(actId).padStart(3, "0")}`,
      profileDescription: `COMBAT_LOAD_MISSION_PROFILE_${weight}KG_KIT_${kit}KG_INDEX_${actId}`,
      physicalParameters: {
        soldierBodyMassKg: weight,
        bodyArmorAndCombatKitKg: kit,
        totalCarriedSystemMassKg: weight + kit,
        terrainInclineGradePct: (idx % 12) * 2.0,
        movementSpeedKph: Number((2.5 + (idx % 6) * 0.8).toFixed(1))
      },
      energyExpenditureCalculus: {
        basalMetabolicRateKcalPerDay: Math.round(10 * weight + 6.25 * 175 - 5 * 25 + 5),
        pandolfEquationWatts: Number((1.5 * weight + 2.0 * (weight + kit) * Math.pow(kit / weight, 2) + 1.5 * Math.pow(3.0, 2)).toFixed(1)),
        hourlyCaloricBurnKcal: 350 + (idx % 15) * 35,
        dailyCaloricRequirementKcal: 3800 + (idx % 12) * 200,
        respiratoryQuotientVCO2VO2: 0.85
      },
      thermalAndSweatKinetics: {
        sweatRateLitersPerHour: Number((0.8 + (idx % 8) * 0.2).toFixed(2)),
        sodiumLossGramsPerHour: Number((0.9 + (idx % 5) * 0.15).toFixed(2)),
        coreTemperatureRiseCelsiusPerHour: Number((0.3 + (idx % 4) * 0.1).toFixed(2)),
        dehydrationThresholdHours: Number((4.0 - (idx % 4) * 0.5).toFixed(1)),
        recommendedElectrolyteFluidReplacementMlPerHour: 800 + (idx % 6) * 100
      }
    };
  })
];

export class CombatMetabolicBurnEngine {
  constructor() {
    this.profiles = METABOLIC_ACTIVITY_PROFILES;
  }

  getProfile(id) {
    return this.profiles.find((p) => p.activityProfileId === id) || this.profiles[0];
  }

  calculateMissionNutritionRequirement(profileId, missionDurationHours) {
    const p = this.getProfile(profileId);
    const totalCalories = p.energyExpenditureCalculus.hourlyCaloricBurnKcal * missionDurationHours;
    const totalWaterLiters = p.thermalAndSweatKinetics.sweatRateLitersPerHour * missionDurationHours;
    const mresRequired = Math.ceil(totalCalories / 1250); // 1250 kcal per standard MRE

    return {
      missionDurationHours: missionDurationHours,
      totalCaloriesExpendedKcal: totalCalories,
      totalHydrationLostLiters: Number(totalWaterLiters.toFixed(2)),
      standardMrePacksNeeded: mresRequired,
      electrolytePacksNeeded: Math.ceil(totalWaterLiters * 1.5)
    };
  }
}

export default CombatMetabolicBurnEngine;
