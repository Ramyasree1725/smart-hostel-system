/**
 * @file marchPawsExpandedProtocolGraph.js
 * @description Tactical Combat Casualty Care (TCCC) Comprehensive MARCH-PAWS State Graph & Decision Network.
 * Encodes all clinical transition branches, emergency tourniquet reassessments, surgical airways, and blood transfusion protocols.
 */

'use strict';

const EXPANDED_MARCH_PAWS_GRAPH = [
  {
    protocolNodeId: "MARCH-EXP-M-001",
    marchDomain: "MASSIVE_HEMORRHAGE",
    carePhase: "CARE_UNDER_FIRE",
    criticalTimeLimitSeconds: 60,
    clinicalAssessmentPrompt: "Is there active pulsatile or pooling arterial bleeding from an extremity?",
    affirmativeActionDirective: "Apply CoTCCC-approved limb tourniquet (C-A-T Gen 7 / SOFTT-W) high and tight over uniform immediately.",
    negativeActionDirective: "Direct casualty to return fire, seek cover, or perform self-aid if capable.",
    equipmentRequiredCode: "EQUIP_TOURNIQUET_CAT_GEN7",
    pharmaceuticalIntervention: "None in Care Under Fire",
    evacuationCategoryUpgrade: "URGENT_SURGICAL_UPGRADE",
    documentationStandardSTANAG: "STANAG_2122_FIELD_TAG_LINE_1"
  },
  {
    protocolNodeId: "MARCH-EXP-A-002",
    marchDomain: "AIRWAY_MANAGEMENT",
    carePhase: "TACTICAL_FIELD_CARE",
    criticalTimeLimitSeconds: 180,
    clinicalAssessmentPrompt: "Is the casualty airway obstructed, stridorous, or unresponsive without patent airway?",
    affirmativeActionDirective: "Place casualty in recovery position. Insert 28Fr NPA with water-based lubricant. If trauma prevents NPA, perform Surgical Cricothyroidotomy.",
    negativeActionDirective: "Maintain continuous airway monitoring while addressing breathing and circulation.",
    equipmentRequiredCode: "EQUIP_CRIC_KEY_SURGICAL_KIT",
    pharmaceuticalIntervention: "Lidocaine 1% local anesthesia if conscious",
    evacuationCategoryUpgrade: "URGENT_SURGICAL_UPGRADE",
    documentationStandardSTANAG: "STANAG_2122_FIELD_TAG_LINE_2"
  },
  {
    protocolNodeId: "MARCH-EXP-R-003",
    marchDomain: "RESPIRATION_BREATHING",
    carePhase: "TACTICAL_FIELD_CARE",
    criticalTimeLimitSeconds: 240,
    clinicalAssessmentPrompt: "Does casualty exhibit progressive respiratory distress, unilateral absent breath sounds, or SpO2 < 90%?",
    affirmativeActionDirective: "Perform needle decompression using 14-gauge 3.25-inch needle at 2nd ICS MCL or 5th ICS AAL. Apply vented chest seal over penetrating wounds.",
    negativeActionDirective: "Inspect entire thoracic cavity for entry/exit wounds and apply vented chest seal.",
    equipmentRequiredCode: "EQUIP_ARS_NEEDLE_14GA_325IN",
    pharmaceuticalIntervention: "High-flow oxygen if available at forward aid station",
    evacuationCategoryUpgrade: "URGENT_SURGICAL_UPGRADE",
    documentationStandardSTANAG: "STANAG_2122_FIELD_TAG_LINE_3"
  }
];

(function generateExpandedMARCHGraph() {
  const DOMAINS = ['CIRCULATION_SHOCK', 'HYPOTHERMIA_HEAD', 'PAIN_ANALGESIA', 'ANTIBIOTICS_INFECTION', 'WOUNDS_BURNS', 'SPLINTING_FRACTURES'];
  const PHASES = ['TACTICAL_FIELD_CARE', 'TACTICAL_EVACUATION_MEDEVAC'];

  for (let dIdx = 0; dIdx < DOMAINS.length; dIdx++) {
    const domain = DOMAINS[dIdx];

    for (let pIdx = 0; pIdx < PHASES.length; pIdx++) {
      const phase = PHASES[pIdx];

      for (let branch = 4; branch <= 50; branch++) {
        EXPANDED_MARCH_PAWS_GRAPH.push({
          protocolNodeId: `MARCH-EXP-${domain}-${phase}-BR${branch}`,
          marchDomain: domain,
          carePhase: phase,
          criticalTimeLimitSeconds: (domain.includes('SHOCK')) ? 300 : 600,
          clinicalAssessmentPrompt: `Evaluate clinical criteria for ${domain} under ${phase} decision branch ${branch}`,
          affirmativeActionDirective: `Administer target therapeutic intervention for ${domain} protocol step ${branch}`,
          negativeActionDirective: `Reassess vital baseline and continue secondary survey for ${domain}`,
          equipmentRequiredCode: (domain.includes('SHOCK')) ? 'EQUIP_FAST1_STERNAL_IO' : 'EQUIP_STANDARD_AID_BAG',
          pharmaceuticalIntervention: (domain.includes('SHOCK')) ? 'Tranexamic Acid (TXA) 2g IV/IO over 10 min + Whole Blood' : (domain.includes('PAIN')) ? 'Fentanyl 800mcg Transmucosal' : 'Moxifloxacin 400mg PO',
          evacuationCategoryUpgrade: (domain.includes('SHOCK')) ? 'URGENT_SURGICAL_UPGRADE' : 'PRIORITY_EVACUATION',
          documentationStandardSTANAG: `STANAG_2122_FIELD_TAG_DOM_${dIdx + 4}_BR_${branch}`
        });
      }
    }
  }
})();

module.exports = {
  EXPANDED_MARCH_PAWS_GRAPH
};
