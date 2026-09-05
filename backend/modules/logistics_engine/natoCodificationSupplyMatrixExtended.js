/**
 * @file natoCodificationSupplyMatrixExtended.js
 * @description NATO Extended National Stock Number (NSN) Catalog, Federal Supply Groups (FSG 10-99),
 * Weapon Spare Assemblies, Precision Guided Munitions, and Combat Logistics Replenishment Simulator.
 */

const EXTENDED_NATO_NSN_CATALOG = [
  {
    nsn: "1005-01-382-7055",
    itemName: "CARBINE, 5.56 MILLIMETER, M4A1",
    fsc: "1005",
    fsg: "10",
    cageCode: "19200",
    shelfLifeMonths: 360,
    unitOfIssue: "EA",
    unitCostUsd: 1200.0,
    criticalReserveQuantity: 25,
    standardMaintenanceIntervalRounds: 5000,
    demilitarizationCode: "D"
  },
  {
    nsn: "1005-01-580-0863",
    itemName: "RIFLE, 7.62 MILLIMETER, MK17 SCAR-H",
    fsc: "1005",
    fsg: "10",
    cageCode: "3G534",
    shelfLifeMonths: 360,
    unitOfIssue: "EA",
    unitCostUsd: 3800.0,
    criticalReserveQuantity: 10,
    standardMaintenanceIntervalRounds: 8000,
    demilitarizationCode: "D"
  },
  {
    nsn: "1305-01-540-3599",
    itemName: "CARTRIDGE, 5.56MM BALL M855A1 EPR",
    fsc: "1305",
    fsg: "13",
    cageCode: "10001",
    shelfLifeMonths: 240,
    unitOfIssue: "BX (840 Rds)",
    unitCostUsd: 580.0,
    criticalReserveQuantity: 500,
    standardMaintenanceIntervalRounds: 0,
    demilitarizationCode: "E"
  },
  {
    nsn: "1305-01-580-3622",
    itemName: "CARTRIDGE, 7.62MM BALL M80A1 EPR",
    fsc: "1305",
    fsg: "13",
    cageCode: "10001",
    shelfLifeMonths: 240,
    unitOfIssue: "BX (400 Rds)",
    unitCostUsd: 620.0,
    criticalReserveQuantity: 300,
    standardMaintenanceIntervalRounds: 0,
    demilitarizationCode: "E"
  },
  {
    nsn: "6515-01-521-7976",
    itemName: "COMBAT APPLICATION TOURNIQUET (C-A-T) GEN 7",
    fsc: "6515",
    fsg: "65",
    cageCode: "0U700",
    shelfLifeMonths: 60,
    unitOfIssue: "EA",
    unitCostUsd: 29.5,
    criticalReserveQuantity: 150,
    standardMaintenanceIntervalRounds: 0,
    demilitarizationCode: "A"
  },
  {
    nsn: "6510-01-562-3325",
    itemName: "GAUZE, HEMOSTATIC, COMBAT GAUZE Z-FOLD",
    fsc: "6510",
    fsg: "65",
    cageCode: "3C8M0",
    shelfLifeMonths: 60,
    unitOfIssue: "EA",
    unitCostUsd: 45.0,
    criticalReserveQuantity: 200,
    standardMaintenanceIntervalRounds: 0,
    demilitarizationCode: "A"
  },
  {
    nsn: "5855-01-582-3974",
    itemName: "NIGHT VISION GOGGLE, AN/PVS-31A BNVD",
    fsc: "5855",
    fsg: "58",
    cageCode: "21439",
    shelfLifeMonths: 180,
    unitOfIssue: "EA",
    unitCostUsd: 11500.0,
    criticalReserveQuantity: 12,
    standardMaintenanceIntervalRounds: 1000,
    demilitarizationCode: "D"
  },
  {
    nsn: "5820-01-580-0442",
    itemName: "RADIO SET, MULTIBAND INTER/INTRA TEAM (MBITR) PRC-148/152A",
    fsc: "5820",
    fsg: "58",
    cageCode: "00135",
    shelfLifeMonths: 180,
    unitOfIssue: "EA",
    unitCostUsd: 6500.0,
    criticalReserveQuantity: 20,
    standardMaintenanceIntervalRounds: 500,
    demilitarizationCode: "D"
  }
];

class NatoExtendedSupplyMatrixEngine {
  constructor() {
    this.nsnCatalog = EXTENDED_NATO_NSN_CATALOG;
  }

  findItemByNsn(nsnString) {
    return this.nsnCatalog.find((item) => item.nsn === nsnString) || null;
  }

  evaluateDepotReplenishmentSchedule(currentInventoryMap) {
    const replenishmentOrders = [];

    for (const item of this.nsnCatalog) {
      const currentQty = currentInventoryMap[item.nsn] || 0;
      if (currentQty <= item.criticalReserveQuantity) {
        const orderQty = item.criticalReserveQuantity * 3 - currentQty;
        replenishmentOrders.push({
          nsn: item.nsn,
          itemName: item.itemName,
          fsc: item.fsc,
          currentQuantity: currentQty,
          orderedQuantity: orderQty,
          totalEstimatedCostUsd: Number((orderQty * item.unitCostUsd).toFixed(2)),
          priority: currentQty === 0 ? "URGENT_COMBAT_CRITICAL" : "ROUTINE_DEPOT_REORDER"
        });
      }
    }

    return replenishmentOrders;
  }
}

module.exports = {
  EXTENDED_NATO_NSN_CATALOG,
  NatoExtendedSupplyMatrixEngine
};
