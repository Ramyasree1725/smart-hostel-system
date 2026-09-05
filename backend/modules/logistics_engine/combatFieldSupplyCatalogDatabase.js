/**
 * @file combatFieldSupplyCatalogDatabase.js
 * @description Master Logistics Inventory & Automated Forward Resupply Demand Forecasting Matrix
 */

const FIELD_SUPPLY_ITEMS_MASTER = [
  {
    itemId: "SUP_556_M855A1",
    nomenclature: "5.56x45mm Enhanced Performance Round (EPR)",
    weightPerUnitKg: 0.012,
    cubeVolumeCubicMeters: 0.00002,
    packagingStandard: "Ammo Can M27 (840 Rds)",
    canWeightKg: 14.2,
    burnRatePerEngagementRounds: 180,
    emergencyThresholdCans: 10
  },
  {
    itemId: "SUP_762_M80A1",
    nomenclature: "7.62x51mm Linked Ball Ammunition M80A1",
    weightPerUnitKg: 0.024,
    cubeVolumeCubicMeters: 0.00004,
    packagingStandard: "Ammo Can M19A1 (400 Rds Linked)",
    canWeightKg: 16.5,
    burnRatePerEngagementRounds: 450,
    emergencyThresholdCans: 8
  },
  {
    itemId: "SUP_40MM_M433",
    nomenclature: "40x46mm High Explosive Dual Purpose (HEDP)",
    weightPerUnitKg: 0.23,
    cubeVolumeCubicMeters: 0.00025,
    packagingStandard: "Ammo Can PA120 (32 Rds)",
    canWeightKg: 12.8,
    burnRatePerEngagementRounds: 12,
    emergencyThresholdCans: 4
  },
  {
    itemId: "SUP_MRE_CASE_A",
    nomenclature: "Meal Ready-to-Eat (MRE) Case A (Menus 1-12)",
    weightPerUnitKg: 0.85,
    cubeVolumeCubicMeters: 0.002,
    packagingStandard: "Case of 12 Meals",
    canWeightKg: 10.2,
    burnRatePerEngagementRounds: 0,
    emergencyThresholdCans: 20
  },
  {
    itemId: "SUP_BATTERY_BB2590",
    nomenclature: "Rechargeable Lithium-Ion Battery BB-2590/U (15Ah, 28.8V)",
    weightPerUnitKg: 1.4,
    cubeVolumeCubicMeters: 0.0012,
    packagingStandard: "Protective Box (4 Units)",
    canWeightKg: 6.0,
    burnRatePerEngagementRounds: 0,
    emergencyThresholdCans: 15
  },
  {
    itemId: "SUP_CAT_GEN7_TOURNIQUET",
    nomenclature: "Combat Application Tourniquet Gen 7",
    weightPerUnitKg: 0.08,
    cubeVolumeCubicMeters: 0.0001,
    packagingStandard: "Box of 20 Units",
    canWeightKg: 1.8,
    burnRatePerEngagementRounds: 0,
    emergencyThresholdCans: 10
  }
];

class CombatSupplyDemandForecaster {
  constructor() {
    this.supplyCatalog = FIELD_SUPPLY_ITEMS_MASTER;
  }

  getItemById(itemId) {
    return this.supplyCatalog.find((i) => i.itemId === itemId) || this.supplyCatalog[0];
  }

  estimateEngagementSupplyBurn(squadSize, plannedEngagementsCount) {
    const estimates = [];

    for (const item of this.supplyCatalog) {
      if (item.burnRatePerEngagementRounds > 0) {
        const totalRounds = squadSize * plannedEngagementsCount * item.burnRatePerEngagementRounds;
        const totalWeightKg = totalRounds * item.weightPerUnitKg;

        estimates.push({
          itemId: item.itemId,
          nomenclature: item.nomenclature,
          totalRoundsExpended: totalRounds,
          totalWeightKg: Number(totalWeightKg.toFixed(1)),
          recommendedCansToCarry: Math.ceil(totalWeightKg / item.canWeightKg)
        });
      }
    }

    return estimates;
  }
}

module.exports = {
  FIELD_SUPPLY_ITEMS_MASTER,
  CombatSupplyDemandForecaster
};
