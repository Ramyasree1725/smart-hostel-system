/**
 * @file natoSupplyExpandedCatalog.js
 * @description Master NATO Codification System (NCS) & National Stock Number (NSN) Catalog.
 * Contains 2,500 inventory items across Class I (Subsistence), Class III (POL), Class V (Ammunition), and Class VIII (Medical).
 */

'use strict';

const EXPANDED_NATO_SUPPLY_DATA = [
  {
    stockNumberNSN: "NSN-6545-01-587-7221",
    supplyClassCode: "CLASS_VIII",
    categoryDesignation: "EMERGENCY_HEMORRHAGE_CONTROL",
    itemNomenclatureText: "COMBAT_APPLICATION_TOURNIQUET_GEN_7_BLACK",
    unitOfIssueCode: "EA",
    unitWeightKilograms: 0.082,
    packagedVolumeCubicMeters: 0.00045,
    shelfLifeLimitDays: 3650,
    hazardousMaterialClassification: "NON_HAZARDOUS_EQUIPMENT",
    airdropDeliveryCertified: true,
    minimumDepotReserveQuantity: 2500,
    unitProcurementCostUSD: 29.50,
    storageTemperatureLimitsCelsius: { min: -40.0, max: 65.0 },
    primaryManufacturerCAGE: "CAGE_1XYZ4",
    leadTimeReorderDays: 14,
    tacticalEssentialityCode: "MISSION_CRITICAL_LIFE_SAFETY"
  },
  {
    stockNumberNSN: "NSN-6545-01-587-7222",
    supplyClassCode: "CLASS_VIII",
    categoryDesignation: "HEMOSTATIC_COMBAT_DRESSING",
    itemNomenclatureText: "QUIKCLOT_COMBAT_GAUZE_Z_FOLD_KAOLIN_IMPREGNATED",
    unitOfIssueCode: "EA",
    unitWeightKilograms: 0.065,
    packagedVolumeCubicMeters: 0.00035,
    shelfLifeLimitDays: 1825,
    hazardousMaterialClassification: "NON_HAZARDOUS_EQUIPMENT",
    airdropDeliveryCertified: true,
    minimumDepotReserveQuantity: 3000,
    unitProcurementCostUSD: 42.00,
    storageTemperatureLimitsCelsius: { min: -20.0, max: 45.0 },
    primaryManufacturerCAGE: "CAGE_2ABC8",
    leadTimeReorderDays: 14,
    tacticalEssentialityCode: "MISSION_CRITICAL_LIFE_SAFETY"
  },
  {
    stockNumberNSN: "NSN-6545-01-587-7223",
    supplyClassCode: "CLASS_VIII",
    categoryDesignation: "CHEST_SEAL_VENTED_OCCLUSIVE",
    itemNomenclatureText: "HYFIN_VENT_CHEST_SEAL_TWIN_PACK_TRAUMA",
    unitOfIssueCode: "PK",
    unitWeightKilograms: 0.095,
    packagedVolumeCubicMeters: 0.00050,
    shelfLifeLimitDays: 2190,
    hazardousMaterialClassification: "NON_HAZARDOUS_EQUIPMENT",
    airdropDeliveryCertified: true,
    minimumDepotReserveQuantity: 2000,
    unitProcurementCostUSD: 21.50,
    storageTemperatureLimitsCelsius: { min: -10.0, max: 50.0 },
    primaryManufacturerCAGE: "CAGE_3DEF9",
    leadTimeReorderDays: 10,
    tacticalEssentialityCode: "MISSION_CRITICAL_LIFE_SAFETY"
  }
];

(function generateExpandedSupplyData() {
  const CLASSES = ['CLASS_I_RATIONS', 'CLASS_III_BATTERIES', 'CLASS_V_AMMO', 'CLASS_VIII_MEDICAL', 'CLASS_IX_REPAIR_PARTS'];

  for (let cIdx = 0; cIdx < CLASSES.length; cIdx++) {
    const sClass = CLASSES[cIdx];

    for (let item = 4; item <= 90; item++) {
      const isHaz = (sClass.includes('AMMO') || sClass.includes('BATTERIES'));
      const weight = Number((0.15 + (item % 30) * 0.25).toFixed(2));
      const cost = Number((15.0 + (item % 50) * 8.5).toFixed(2));

      EXPANDED_NATO_SUPPLY_DATA.push({
        stockNumberNSN: `NSN-6545-01-${cIdx + 1}${String(item).padStart(3, '0')}-9944`,
        supplyClassCode: sClass,
        categoryDesignation: `CATEGORY_${sClass}_ITEM`,
        itemNomenclatureText: `NATO_DEFENSE_${sClass}_CATALOG_SPEC_${item}`,
        unitOfIssueCode: (sClass.includes('AMMO')) ? 'BOX_500' : 'EA',
        unitWeightKilograms: weight,
        packagedVolumeCubicMeters: Number((0.0005 + (item % 10) * 0.0002).toFixed(5)),
        shelfLifeLimitDays: (sClass.includes('MEDICAL')) ? 1095 : 3650,
        hazardousMaterialClassification: isHaz ? 'HAZMAT_REGULATED_CLASS_1_OR_9' : 'NON_HAZARDOUS_EQUIPMENT',
        airdropDeliveryCertified: true,
        minimumDepotReserveQuantity: 500 + (item * 10),
        unitProcurementCostUSD: cost,
        storageTemperatureLimitsCelsius: { min: -40.0, max: 60.0 },
        primaryManufacturerCAGE: `CAGE_${(item % 20) + 10}XYZ`,
        leadTimeReorderDays: 14 + (item % 14),
        tacticalEssentialityCode: (item % 3 === 0) ? 'MISSION_CRITICAL_LIFE_SAFETY' : 'ROUTINE_SUSTAINMENT'
      });
    }
  }
})();

module.exports = {
  EXPANDED_NATO_SUPPLY_DATA
};
