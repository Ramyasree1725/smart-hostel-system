/**
 * @file natoSupplyDepotMatrixLedger.js
 * @description Master NATO Supply Depot & Ammunition Lot Tracking Ledger
 */

const NATO_SUPPLY_DEPOT_CATALOG = [
  {
    lotNumber: "LOT_556_LC_24A_001",
    nsn: "1305-01-540-3599",
    fscCode: "1305",
    nomenclature: "CARTRIDGE_5_56MM_BALL_M855A1_EPR",
    manufacturerCage: "10001",
    manufacturingDateEpoch: 1704067200000,
    expirationDateEpoch: 2335305600000,
    depotLocation: "FORWARD_OPERATING_BASE_ALPHA",
    totalQuantityReceivedUnits: 250000,
    currentQuantityAvailableUnits: 185400,
    allocatedToSquadsUnits: 45000,
    damagedOrExpendedUnits: 19600,
    storageBunkerId: "MAGAZINE_BUNKER_04",
    storageTemperatureNominalC: 21.0,
    storageHumidityNominalPct: 45.0,
    inspectionStatus: "CERTIFIED_SERVICEABLE_CODE_A",
    securityClassification: "CONFIDENTIAL_MUNITIONS",
    unitOfIssue: "ROUND",
    unitWeightGrams: 12.0,
    packagingStandard: "M2A1_STEEL_AMMO_CAN_840_RDS",
    palletsCount: 42,
    reorderLeadTimeDays: 14,
    criticalThresholdUnits: 50000,
    resupplyTriggerStatus: "OPTIMAL_STOCK_LEVEL"
  },
  {
    lotNumber: "LOT_762_LC_24B_002",
    nsn: "1305-01-580-3622",
    fscCode: "1305",
    nomenclature: "CARTRIDGE_7_62MM_BALL_M80A1_EPR_LINKED",
    manufacturerCage: "10001",
    manufacturingDateEpoch: 1704067200000,
    expirationDateEpoch: 2335305600000,
    depotLocation: "FORWARD_OPERATING_BASE_ALPHA",
    totalQuantityReceivedUnits: 120000,
    currentQuantityAvailableUnits: 78500,
    allocatedToSquadsUnits: 32000,
    damagedOrExpendedUnits: 9500,
    storageBunkerId: "MAGAZINE_BUNKER_04",
    storageTemperatureNominalC: 21.0,
    storageHumidityNominalPct: 45.0,
    inspectionStatus: "CERTIFIED_SERVICEABLE_CODE_A",
    securityClassification: "CONFIDENTIAL_MUNITIONS",
    unitOfIssue: "ROUND_LINKED_4_BALL_1_TRACER",
    unitWeightGrams: 24.5,
    packagingStandard: "M19A1_STEEL_AMMO_CAN_400_RDS",
    palletsCount: 28,
    reorderLeadTimeDays: 14,
    criticalThresholdUnits: 25000,
    resupplyTriggerStatus: "OPTIMAL_STOCK_LEVEL"
  },
  {
    lotNumber: "LOT_CAT7_NAR_24C_003",
    nsn: "6515-01-521-7976",
    fscCode: "6515",
    nomenclature: "COMBAT_APPLICATION_TOURNIQUET_GEN_7",
    manufacturerCage: "0U700",
    manufacturingDateEpoch: 1704067200000,
    expirationDateEpoch: 1861920000000,
    depotLocation: "MEDICAL_LOGISTICS_DEPOT_ECHO",
    totalQuantityReceivedUnits: 2500,
    currentQuantityAvailableUnits: 1840,
    allocatedToSquadsUnits: 580,
    damagedOrExpendedUnits: 80,
    storageBunkerId: "CLIMATE_CONTROLLED_ROOM_02",
    storageTemperatureNominalC: 22.0,
    storageHumidityNominalPct: 40.0,
    inspectionStatus: "CERTIFIED_SERVICEABLE_CODE_A",
    securityClassification: "UNCLASSIFIED_MEDICAL",
    unitOfIssue: "EACH",
    unitWeightGrams: 82.0,
    packagingStandard: "BOX_OF_100_UNITS",
    palletsCount: 2,
    reorderLeadTimeDays: 7,
    criticalThresholdUnits: 400,
    resupplyTriggerStatus: "OPTIMAL_STOCK_LEVEL"
  },
  {
    lotNumber: "LOT_TXA_PFI_24D_004",
    nsn: "6505-01-600-4521",
    fscCode: "6505",
    nomenclature: "TRANEXAMIC_ACID_INJECTION_1000MG_10ML_VIAL",
    manufacturerCage: "00135",
    manufacturingDateEpoch: 1704067200000,
    expirationDateEpoch: 1798761600000,
    depotLocation: "MEDICAL_LOGISTICS_DEPOT_ECHO",
    totalQuantityReceivedUnits: 1200,
    currentQuantityAvailableUnits: 890,
    allocatedToSquadsUnits: 260,
    damagedOrExpendedUnits: 50,
    storageBunkerId: "CLIMATE_CONTROLLED_ROOM_01",
    storageTemperatureNominalC: 20.0,
    storageHumidityNominalPct: 35.0,
    inspectionStatus: "CERTIFIED_SERVICEABLE_CODE_A",
    securityClassification: "CONTROLLED_PHARMACEUTICAL",
    unitOfIssue: "VIAL_10ML",
    unitWeightGrams: 28.0,
    packagingStandard: "BOX_OF_10_VIALS",
    palletsCount: 1,
    reorderLeadTimeDays: 5,
    criticalThresholdUnits: 200,
    resupplyTriggerStatus: "OPTIMAL_STOCK_LEVEL"
  },
  {
    lotNumber: "LOT_PRC163_L3H_24E_005",
    nsn: "5820-01-678-9012",
    fscCode: "5820",
    nomenclature: "AN_PRC_163_DUAL_CHANNEL_HANDHELD_RADIO",
    manufacturerCage: "21439",
    manufacturingDateEpoch: 1704067200000,
    expirationDateEpoch: 2019686400000,
    depotLocation: "COMMUNICATIONS_COMSEC_VAULT",
    totalQuantityReceivedUnits: 150,
    currentQuantityAvailableUnits: 112,
    allocatedToSquadsUnits: 35,
    damagedOrExpendedUnits: 3,
    storageBunkerId: "SECURE_VAULT_03",
    storageTemperatureNominalC: 21.0,
    storageHumidityNominalPct: 40.0,
    inspectionStatus: "CERTIFIED_SERVICEABLE_CODE_A",
    securityClassification: "SECRET_CRYPTO_DEVICE",
    unitOfIssue: "SET_COMPLETE",
    unitWeightGrams: 1100.0,
    packagingStandard: "HARDENED_PELICAN_CASE_4_UNITS",
    palletsCount: 1,
    reorderLeadTimeDays: 30,
    criticalThresholdUnits: 20,
    resupplyTriggerStatus: "OPTIMAL_STOCK_LEVEL"
  }
];

class NatoSupplyDepotLedgerEngine {
  constructor() {
    this.lots = NATO_SUPPLY_DEPOT_CATALOG;
  }

  getLotByNumber(lotNumber) {
    return this.lots.find((l) => l.lotNumber === lotNumber) || this.lots[0];
  }
}

module.exports = {
  NATO_SUPPLY_DEPOT_CATALOG,
  NatoSupplyDepotLedgerEngine
};
