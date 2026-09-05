/**
 * @file natoCodificationComprehensiveLedger.js
 * @description Master NATO Codification System (NCS) Federal Supply Catalog Ledger
 */

const NATO_CODIFICATION_MASTER_LEDGER = [
  ...Array.from({ length: 200 }, (_, idx) => {
    const itemNum = idx + 1;
    const fscGroups = ["1005", "1010", "1015", "1305", "1310", "1320", "5810", "5820", "5855", "6505", "6510", "6515", "8970"];
    const fsc = fscGroups[idx % fscGroups.length];
    const nsnStr = `${fsc}-99-${String(100 + (idx % 800)).padStart(3, "0")}-${String(1000 + idx).padStart(4, "0")}`;

    return {
      nationalStockNumber: nsnStr,
      catalogIndex: itemNum,
      federalSupplyClass: fsc,
      itemIdentificationName: `TACTICAL_DEFENSE_EQUIPMENT_ITEM_${fsc}_${itemNum}`,
      commercialAndGovernmentEntityCageCode: `CAGE_${String(10000 + (idx % 90000))}`,
      physicalCharacteristics: {
        weightGrams: 50 + (idx % 500) * 100,
        lengthMillimeters: 100 + (idx % 100) * 15,
        widthMillimeters: 50 + (idx % 50) * 8,
        heightMillimeters: 30 + (idx % 30) * 5,
        volumeLiters: Number((0.5 + (idx % 20) * 0.2).toFixed(2)),
        storageTemperatureMinCelsius: -40,
        storageTemperatureMaxCelsius: 65,
        relativeHumidityMaxPct: 95,
        electrostaticSensitive: fsc === "5810" || fsc === "5820"
      },
      logisticsSupplyChain: {
        unitOfIssue: idx % 2 === 0 ? "EA" : "BX",
        unitAcquisitionCostUsd: Number((25.0 + (idx % 50) * 120.0).toFixed(2)),
        procurementLeadTimeDays: 30 + (idx % 180),
        depotReorderPointQuantity: 50 + (idx % 200),
        safetyStockQuantity: 20 + (idx % 50),
        economicOrderQuantity: 100 + (idx % 500),
        annualDemandForecastUnits: 500 + (idx % 2000),
        demilitarizationCode: fsc.startsWith("10") || fsc.startsWith("13") ? "D_DEMIL_REQUIRED" : "A_NO_DEMIL"
      },
      operationalLifecycle: {
        meanTimeBetweenFailuresHours: 2500 + (idx % 5000),
        meanTimeToRepairMinutes: 45 + (idx % 90),
        scheduledMaintenanceIntervalDays: 90,
        expeditedAirdropSuitable: true,
        ruggedizationStandard: "MIL-STD-810H_METHOD_514_8"
      }
    };
  })
];

class NatoComprehensiveLedgerEngine {
  constructor() {
    this.ledger = NATO_CODIFICATION_MASTER_LEDGER;
  }

  getItemByNsn(nsn) {
    return this.ledger.find((i) => i.nationalStockNumber === nsn) || this.ledger[0];
  }

  getItemsByFsc(fsc) {
    return this.ledger.filter((i) => i.federalSupplyClass === fsc);
  }

  calculateTotalInventoryValuation(inventoryCountMap) {
    let totalValuation = 0;
    for (const item of this.ledger) {
      const count = inventoryCountMap[item.nationalStockNumber] || 0;
      totalValuation += count * item.logisticsSupplyChain.unitAcquisitionCostUsd;
    }
    return Number(totalValuation.toFixed(2));
  }
}

module.exports = {
  NATO_CODIFICATION_MASTER_LEDGER,
  NatoComprehensiveLedgerEngine
};
