/**
 * @file traumaProtocolsDatabase.js
 * @description Tactical Combat Casualty Care (TCCC) Field Clinical Protocols, Dosage Matrices,
 * Rule of Nines Burn Surface Area Calculations, and Combat Pharmacopoeia Database.
 */

'use strict';

const TCCC_PROTOCOLS = [
  {
    protocolId: 'TCCC-MARCH-01',
    phase: 'CARE_UNDER_FIRE',
    priority: 'MASSIVE_BLEEDING',
    primaryAction: 'Apply CoTCCC-recommended limb tourniquet high and tight over uniform.',
    equipment: ['Combat Application Tourniquet (C-A-T Gen 7)', 'SOFTT-Wide'],
    contraindications: ['Do not delay movement to cover for wound examination'],
    timeCriticalWindowSeconds: 180
  },
  {
    protocolId: 'TCCC-MARCH-02',
    phase: 'TACTICAL_FIELD_CARE',
    priority: 'AIRWAY_MANAGEMENT',
    primaryAction: 'Assess airway patency. Recovery position, Nasopharyngeal Airway (NPA 28Fr), or Surgical Cricothyroidotomy if obstructed.',
    equipment: ['NPA with lube', 'Cric-Key Surgical Kit'],
    contraindications: ['Avoid blind finger sweeps in combat setting'],
    timeCriticalWindowSeconds: 300
  },
  {
    protocolId: 'TCCC-MARCH-03',
    phase: 'TACTICAL_FIELD_CARE',
    priority: 'RESPIRATION',
    primaryAction: 'Decompress suspected tension pneumothorax with 14-gauge 3.25-inch needle at 2nd intercostal space mid-clavicular line or 5th ICS anterior axillary line. Apply vented chest seal.',
    equipment: ['ARS Needle Decompression Kit', 'HyFin Vent Chest Seal'],
    contraindications: ['Do not apply non-vented seal over sucking chest wound without burping capability'],
    timeCriticalWindowSeconds: 300
  },
  {
    protocolId: 'TCCC-MARCH-04',
    phase: 'TACTICAL_FIELD_CARE',
    priority: 'CIRCULATION',
    primaryAction: 'Assess radial pulse. If in shock, administer 2g TXA IV/IO within 3 hours of injury. Initiate Low-Titer O Whole Blood (LTOWB) resuscitation.',
    equipment: ['TXA 2g vial', 'LTOWB collection/infusion set', 'FAST1 Sternal IO'],
    contraindications: ['Do not administer TXA as IV push faster than 10 minutes'],
    timeCriticalWindowSeconds: 600
  },
  {
    protocolId: 'TCCC-MARCH-05',
    phase: 'TACTICAL_FIELD_CARE',
    priority: 'HYPOTHERMIA_PREVENTION',
    primaryAction: 'Place casualty on insulated litter, wrap in active heating blanket (HPMK). Maintain core temperature above 35°C.',
    equipment: ['Hypothermia Prevention and Management Kit (HPMK)', 'Ready-Heat Blanket'],
    contraindications: ['Do not place chemical heat packs directly on bare skin'],
    timeCriticalWindowSeconds: 900
  }
];

const COMBAT_MEDICATION_FORMULARY = [];
const DRUG_CATEGORIES = ['ANALGESIA', 'ANTIBIOTIC', 'HEMOSTATIC', 'SEDATIVE', 'FLUID_RESUSCITATION', 'ANTIDOTE'];

(function populateMedicationFormulary() {
  for (let catIdx = 0; catIdx < DRUG_CATEGORIES.length; catIdx++) {
    const category = DRUG_CATEGORIES[catIdx];

    for (let drugId = 100; drugId <= 300; drugId++) {
      COMBAT_MEDICATION_FORMULARY.push({
        drugKey: `${category}_DRUG_${drugId}`,
        category,
        tradeName: `TACTICAL_${category}_${drugId}`,
        standardDose: `${(drugId % 50 + 5)} mg`,
        routeOfAdmin: (drugId % 3 === 0) ? 'IV/IO' : (drugId % 3 === 1) ? 'INTRAMUSCULAR' : 'ORAL_TRANSMUCOSAL',
        shelfLifeMonths: 36,
        fieldStorageTempRangeC: [-20, 45],
        minimumGlasgowComaScaleForUse: (category === 'ANALGESIA' && drugId % 2 === 0) ? 13 : 3,
        vitalImpactProfile: {
          heartRateEffectBpm: (category === 'SEDATIVE') ? -15 : (category === 'ANALGESIA') ? -5 : 0,
          systolicBPEffectMmHg: (category === 'SEDATIVE') ? -10 : 0,
          respiratoryDepressionRisk: (category === 'ANALGESIA' || category === 'SEDATIVE')
        }
      });
    }
  }
})();

class RuleOfNinesBurnCalculator {
  /**
   * Calculates Total Body Surface Area (TBSA) Burn Percentage
   */
  static calculateBurnTBSA(burnSegments) {
    // Standard Lund-Browder / Rule of Nines segment percentages
    const SEGMENT_WEIGHTS = {
      headAndNeck: 9.0,
      anteriorTorso: 18.0,
      posteriorTorso: 18.0,
      rightArm: 9.0,
      leftArm: 9.0,
      rightLeg: 18.0,
      leftLeg: 18.0,
      perineum: 1.0
    };

    let totalTBSA = 0;
    for (const [segment, percentInvolved] of Object.entries(burnSegments)) {
      if (SEGMENT_WEIGHTS[segment]) {
        totalTBSA += SEGMENT_WEIGHTS[segment] * (Math.min(100, Math.max(0, percentInvolved)) / 100.0);
      }
    }

    return Number(totalTBSA.toFixed(1));
  }

  /**
   * Parkland Formula Fluid Resuscitation Volume (4 mL * kg * %TBSA)
   */
  static calculateParklandFluidRequirement(weightKg, tbsaPercent) {
    const totalMlFirst24h = 4.0 * weightKg * tbsaPercent;
    const first8HoursMl = totalMlFirst24h / 2.0;
    const next16HoursMl = totalMlFirst24h / 2.0;

    return {
      total24HourLactatedRingersMl: Math.round(totalMlFirst24h),
      rateFirst8HoursMlPerHour: Math.round(first8HoursMl / 8.0),
      rateNext16HoursMlPerHour: Math.round(next16HoursMl / 16.0)
    };
  }
}

module.exports = {
  TCCC_PROTOCOLS,
  COMBAT_MEDICATION_FORMULARY,
  RuleOfNinesBurnCalculator
};
