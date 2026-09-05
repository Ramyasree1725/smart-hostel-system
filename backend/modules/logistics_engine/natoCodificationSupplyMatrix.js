/**
 * @file natoCodificationSupplyMatrix.js
 * @description NATO Codification System (NCS), National Stock Number (NSN),
 * Federal Supply Classification (FSC), and Tactical Combat Resupply Logistics Matrix.
 */

const NATO_SUPPLY_GROUPS_CATALOG = [
  {
    groupCode: "10",
    groupName: "WEAPONS",
    classes: [
      { fscCode: "1005", className: "Guns through 30mm", defaultDepotThreshold: 50, criticalThreshold: 10 },
      { fscCode: "1010", className: "Guns over 30mm through 75mm", defaultDepotThreshold: 20, criticalThreshold: 4 },
      { fscCode: "1015", className: "Guns 75mm through 125mm", defaultDepotThreshold: 15, criticalThreshold: 3 },
      { fscCode: "1025", className: "Guns over 150mm through 200mm", defaultDepotThreshold: 10, criticalThreshold: 2 },
      { fscCode: "1055", className: "Launchers, Rocket and Pyrotechnic", defaultDepotThreshold: 35, criticalThreshold: 8 }
    ]
  },
  {
    groupCode: "13",
    groupName: "AMMUNITION_AND_EXPLOSIVES",
    classes: [
      { fscCode: "1305", className: "Ammunition, through 30mm (5.56x45mm NATO, 7.62x51mm NATO, 9x19mm Parabellum, .50 BMG)", defaultDepotThreshold: 1000000, criticalThreshold: 200000 },
      { fscCode: "1310", className: "Ammunition, over 30mm up to 75mm (40mm HEDP / HE rounds)", defaultDepotThreshold: 25000, criticalThreshold: 5000 },
      { fscCode: "1315", className: "Ammunition, 75mm through 125mm (105mm / 120mm Tank APFSDS)", defaultDepotThreshold: 10000, criticalThreshold: 2000 },
      { fscCode: "1320", className: "Ammunition, Artillery 155mm M795 / M982 Excalibur", defaultDepotThreshold: 15000, criticalThreshold: 3000 },
      { fscCode: "1330", className: "Grenades, Hand and Smoke (M67 Frag, M18 Smoke)", defaultDepotThreshold: 12000, criticalThreshold: 2500 }
    ]
  },
  {
    groupCode: "58",
    groupName: "COMMUNICATION_DETECTION_AND_RADIATION_EQUIPMENT",
    classes: [
      { fscCode: "5810", className: "Communications Security Equipment and Components (COMSEC/Type 1 Crypto)", defaultDepotThreshold: 150, criticalThreshold: 30 },
      { fscCode: "5820", className: "Radio and Television Communication Equipment (PRC-152A, PRC-163, SINCGARS)", defaultDepotThreshold: 400, criticalThreshold: 80 },
      { fscCode: "5855", className: "Night Vision Equipment, Active and Passive (AN/PVS-31A, AN/PAS-13G TWS)", defaultDepotThreshold: 300, criticalThreshold: 60 },
      { fscCode: "5865", className: "Electronic Countermeasures, Counter-Countermeasures and Q-36 Radar", defaultDepotThreshold: 50, criticalThreshold: 10 }
    ]
  },
  {
    groupCode: "65",
    groupName: "MEDICAL_DENTAL_AND_VETERINARY_EQUIPMENT_AND_SUPPLIES",
    classes: [
      { fscCode: "6510", className: "Surgical Dressing Materials (Combat Gauze, ChitoGauze, Emergency Bandages)", defaultDepotThreshold: 5000, criticalThreshold: 1000 },
      { fscCode: "6515", className: "Medical and Surgical Instruments (CAT Gen 7 Tourniquets, 14G Decompression Needles)", defaultDepotThreshold: 4000, criticalThreshold: 800 },
      { fscCode: "6505", className: "Pharmaceuticals (TXA Tranexamic Acid, Ketamine, Fentanyl Lozenges, Morphine)", defaultDepotThreshold: 2000, criticalThreshold: 400 }
    ]
  },
  {
    groupCode: "89",
    groupName: "SUBSISTENCE_FIELD_RATIONS",
    classes: [
      { fscCode: "8970", className: "Composite Food Packages (Meal Ready-to-Eat MRE, First Strike Rations FSR)", defaultDepotThreshold: 50000, criticalThreshold: 10000 },
      { fscCode: "8960", className: "Beverages, Water Purification Tablets and Electrolyte Replenishment Powders", defaultDepotThreshold: 100000, criticalThreshold: 20000 }
    ]
  }
];

class NatoSupplyChainEngine {
  constructor(catalog = NATO_SUPPLY_GROUPS_CATALOG) {
    this.catalog = catalog;
  }

  evaluateStockLevel(fscCode, currentQuantity) {
    for (const group of this.catalog) {
      const match = group.classes.find((c) => c.fscCode === fscCode);
      if (match) {
        let status = "OPTIMAL";
        if (currentQuantity <= match.criticalThreshold) {
          status = "CRITICAL_RED_SHORTAGE";
        } else if (currentQuantity <= match.defaultDepotThreshold * 0.5) {
          status = "YELLOW_AMBER_RESUPPLY_NEEDED";
        }

        return {
          groupCode: group.groupCode,
          groupName: group.groupName,
          fscCode: match.fscCode,
          className: match.className,
          currentQuantity: currentQuantity,
          criticalThreshold: match.criticalThreshold,
          stockStatus: status,
          replenishmentDelta: Math.max(0, match.defaultDepotThreshold - currentQuantity)
        };
      }
    }

    return { error: `FSC Code ${fscCode} not registered in NATO Codification System` };
  }

  calculateDailyMreConsumption(personnelCount, operationalIntensity) {
    let multiplier = 2.0;
    if (operationalIntensity === "HIGH_COMBAT") multiplier = 3.0;
    else if (operationalIntensity === "INTENSE_PROLONGED") multiplier = 3.5;

    const dailyMrePacks = Math.ceil(personnelCount * multiplier);
    const dailyWaterLiters = personnelCount * (multiplier >= 3.0 ? 6.5 : 4.0);

    return {
      personnelCount: personnelCount,
      operationalTempo: operationalIntensity,
      dailyMrePacksRequired: dailyMrePacks,
      dailyWaterLitersRequired: dailyWaterLiters,
      palletsMreRequired30Days: Math.ceil((dailyMrePacks * 30) / 576), // 576 cases per pallet
      palletsWaterRequired30Days: Math.ceil((dailyWaterLiters * 30) / 960) // 960L per water bladder/pallet
    };
  }
}

module.exports = {
  NATO_SUPPLY_GROUPS_CATALOG,
  NatoSupplyChainEngine
};
