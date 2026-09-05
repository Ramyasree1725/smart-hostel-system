/**
 * @file militarySuppliesCatalog.js
 * @description Military Defense Standard NATO Codification System (NCS) & National Stock Number (NSN) Logistics Catalog.
 * Contains tactical ammunition, emergency trauma medical kits, field rations, battery packs, and communication spares.
 */

'use strict';

const NATO_SUPPLY_CLASSES = {
  CLASS_I: 'Subsistence (Rations, Water, Salts)',
  CLASS_II: 'Clothing & Individual Equipment',
  CLASS_III: 'POL (Petroleum, Oils, Lubricants, Battery power)',
  CLASS_V: 'Ammunition & Explosives',
  CLASS_VIII: 'Medical Material & Emergency Trauma'
};

const LOGISTICS_CATALOG = [];
const SUPPLY_TYPES = ['AMMUNITION', 'MEDICAL', 'ENERGY_BATTERY', 'RATIONS', 'COMMS_ANTENNA', 'OPTICS_SENSOR'];

(function populateLogisticsCatalog() {
  for (let classId = 1; classId <= 8; classId++) {
    for (let itemIdx = 1000; itemIdx <= 1350; itemIdx++) {
      const typeIdx = (classId + itemIdx) % SUPPLY_TYPES.length;
      const supplyType = SUPPLY_TYPES[typeIdx];

      LOGISTICS_CATALOG.push({
        nsnCode: `NSN-1305-01-${classId}${itemIdx}-8899`,
        nomenclature: `${supplyType}_TACTICAL_SPEC_${classId}_${itemIdx}`,
        supplyClass: `CLASS_${classId}`,
        category: supplyType,
        unitOfIssue: (supplyType === 'AMMUNITION') ? 'ROUNDS_BOX_500' : 'EACH',
        weightKgPerUnit: Number((0.25 + ((itemIdx % 50) * 0.15)).toFixed(2)),
        volumeCubicMeters: Number((0.001 + ((itemIdx % 20) * 0.0005)).toFixed(4)),
        shelfLifeDays: (supplyType === 'MEDICAL') ? 730 : 3650,
        hazardousMaterial: (supplyType === 'AMMUNITION' || supplyType === 'ENERGY_BATTERY'),
        storageTemperatureLimitsC: {
          min: -40.0,
          max: (supplyType === 'MEDICAL') ? 25.0 : 60.0
        },
        airdropCompatibility: {
          lowVelocityAirdrop: true,
          freeDropCertified: (supplyType === 'RATIONS'),
          parachutedWeightTier: 'LIGHT_DROPPABLE'
        },
        reorderThresholdQuantity: 150 + (itemIdx % 200),
        standardLeadTimeHours: 12 + (itemIdx % 36)
      });
    }
  }
})();

module.exports = {
  NATO_SUPPLY_CLASSES,
  LOGISTICS_CATALOG,
  SUPPLY_TYPES
};
