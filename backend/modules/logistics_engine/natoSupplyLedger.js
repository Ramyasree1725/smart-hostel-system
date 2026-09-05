/**
 * @file natoSupplyLedger.js
 * @description Military Defense Standard NATO Stock Number (NSN) Logistics Ledger & Depot Inventory Ledger.
 * Contains ammunition, field rations, emergency medical supplies, water purification, and communication components.
 */

'use strict';

const NATO_DEPOT_LEDGER = [];
const SUPPLY_DEPOTS = ['DEPOT_FOB_ALPHA', 'DEPOT_FOB_BRAVO', 'DEPOT_MAIN_LOGISTICS_BASE', 'DEPOT_COMBAT_OUTPOST_1', 'DEPOT_COMBAT_OUTPOST_2'];
const ITEM_CATEGORIES = ['CLASS_I_SUBSISTENCE', 'CLASS_II_EQUIPMENT', 'CLASS_III_POL_BATTERY', 'CLASS_V_AMMUNITION', 'CLASS_VIII_MEDICAL'];

(function populateDepotLedger() {
  for (let dIdx = 0; dIdx < SUPPLY_DEPOTS.length; dIdx++) {
    const depot = SUPPLY_DEPOTS[dIdx];

    for (let cIdx = 0; cIdx < ITEM_CATEGORIES.length; cIdx++) {
      const category = ITEM_CATEGORIES[cIdx];

      for (let item = 1; item <= 80; item++) {
        const onHandQty = 50 + (item * 15);
        const reorderQty = 100 + (item * 10);

        NATO_DEPOT_LEDGER.push({
          ledgerEntryId: `LEDGER-${depot}-${category}-ITM${item}`,
          depotId: depot,
          category,
          nsnCode: `NSN-8465-01-${dIdx}${cIdx}${item}-9988`,
          itemName: `NATO_TACTICAL_${category}_ITEM_${item}`,
          quantityOnHand: onHandQty,
          quantityReservedForMission: Math.floor(onHandQty * 0.25),
          quantityAvailable: Math.ceil(onHandQty * 0.75),
          reorderThreshold: reorderQty,
          needsUrgentResupply: (onHandQty < reorderQty),
          unitCostUSD: 15.0 + (item * 4.5),
          cubeCubicFeet: Number((0.1 + (item * 0.05)).toFixed(2)),
          weightLbs: Number((1.5 + (item * 0.75)).toFixed(2)),
          storageCondition: 'SECURE_AIR_CONDITIONED'
        });
      }
    }
  }
})();

module.exports = {
  NATO_DEPOT_LEDGER,
  SUPPLY_DEPOTS,
  ITEM_CATEGORIES
};
