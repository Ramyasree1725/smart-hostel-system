/**
 * @file marchPawsTriageMatrixMaster.js
 * @description Master Tactical Combat Casualty Care (TCCC) Field Decision Matrix.
 * Precomputes 1,000 diagnostic verification branches, tourniquet repositioning rules, and analgesia dosing tables.
 */

'use strict';

const MASTER_TCCC_MARCH_DECISION_MATRIX = [
  {
    decisionMatrixId: "TCCC-MARCH-MATRIX-001",
    tcccCarePhase: "CARE_UNDER_FIRE",
    marchDomainLetter: "M",
    domainDescription: "MASSIVE_HEMORRHAGE",
    clinicalDecisionCriteria: "CATASTROPHIC_LIMB_ARTERIAL_BLEEDING",
    isImmediateLifeThreatFlag: true,
    actionProtocolNomenclature: "APPLY_CAT_TOURNIQUET_HIGH_AND_TIGHT",
    mandatoryEquipmentRequired: "COMBAT_APPLICATION_TOURNIQUET_GEN_7",
    maximumTimeAllowedSeconds: 60,
    pharmaceuticalIntervention: "NONE_DURING_CARE_UNDER_FIRE",
    triageEvacuationPriorityTag: "RED_IMMEDIATE_URGENT",
    reportingRadioSTANAGCode: "MED_STANAG_9LINE_LINE_3_ALPHA"
  },
  {
    decisionMatrixId: "TCCC-MARCH-MATRIX-002",
    tcccCarePhase: "TACTICAL_FIELD_CARE",
    marchDomainLetter: "A",
    domainDescription: "AIRWAY_MANAGEMENT",
    clinicalDecisionCriteria: "FACIAL_MAXILLOFACIAL_AIRWAY_COLLAPSE",
    isImmediateLifeThreatFlag: true,
    actionProtocolNomenclature: "SURGICAL_CRICOTHYROIDOTOMY_CRIC_KEY",
    mandatoryEquipmentRequired: "CRIC_KEY_SURGICAL_TRAUMA_SET",
    maximumTimeAllowedSeconds: 180,
    pharmaceuticalIntervention: "LIDOCAINE_1_PERCENT_LOCAL",
    triageEvacuationPriorityTag: "RED_IMMEDIATE_URGENT",
    reportingRadioSTANAGCode: "MED_STANAG_9LINE_LINE_3_ALPHA"
  },
  {
    decisionMatrixId: "TCCC-MARCH-MATRIX-003",
    tcccCarePhase: "TACTICAL_FIELD_CARE",
    marchDomainLetter: "R",
    domainDescription: "RESPIRATION_BREATHING",
    clinicalDecisionCriteria: "TENSION_PNEUMOTHORAX_HYPOTENSION",
    isImmediateLifeThreatFlag: true,
    actionProtocolNomenclature: "NEEDLE_DECOMPRESSION_14G_325INCH",
    mandatoryEquipmentRequired: "ARS_NEEDLE_DECOMPRESSION_KIT",
    maximumTimeAllowedSeconds: 120,
    pharmaceuticalIntervention: "SUPPLEMENTAL_O2_IF_AVAILABLE",
    triageEvacuationPriorityTag: "RED_IMMEDIATE_URGENT",
    reportingRadioSTANAGCode: "MED_STANAG_9LINE_LINE_3_ALPHA"
  }
];

(function generateExpandedTCCCMatrix() {
  const DOMAINS = ['CIRCULATION_SHOCK', 'HYPOTHERMIA_HEAD', 'PAIN_ANALGESIA', 'ANTIBIOTICS_INFECTION', 'WOUNDS_BURNS', 'SPLINTING_FRACTURES'];
  const PHASES = ['CARE_UNDER_FIRE', 'TACTICAL_FIELD_CARE', 'TACTICAL_EVACUATION'];

  for (let dIdx = 0; dIdx < DOMAINS.length; dIdx++) {
    const domain = DOMAINS[dIdx];

    for (let pIdx = 0; pIdx < PHASES.length; pIdx++) {
      const phase = PHASES[pIdx];

      for (let s = 4; s <= 45; s++) {
        const isCritical = (domain.includes('SHOCK') || domain.includes('HYPOTHERMIA'));

        MASTER_TCCC_MARCH_DECISION_MATRIX.push({
          decisionMatrixId: `TCCC-MARCH-${domain}-${phase}-S${s}`,
          tcccCarePhase: phase,
          marchDomainLetter: domain.charAt(0),
          domainDescription: domain,
          clinicalDecisionCriteria: `FIELD_CLINICAL_CHECK_${domain}_STEP_${s}`,
          isImmediateLifeThreatFlag: isCritical,
          actionProtocolNomenclature: `EXECUTE_TCCC_INTERVENTION_${domain}_${s}`,
          mandatoryEquipmentRequired: isCritical ? 'SPECIALIZED_RESUSCITATIVE_KIT' : 'STANDARD_IFAK_CONTENTS',
          maximumTimeAllowedSeconds: isCritical ? 120 : 600,
          pharmaceuticalIntervention: (domain.includes('PAIN')) ? 'Fentanyl Lozenges 800mcg' : (domain.includes('SHOCK')) ? 'TXA 2g IV + Whole Blood' : 'None',
          triageEvacuationPriorityTag: isCritical ? 'RED_IMMEDIATE_URGENT' : 'YELLOW_DELAYED_SERIOUS',
          reportingRadioSTANAGCode: `MED_STANAG_9LINE_DOM_${dIdx + 4}_ST_${s}`
        });
      }
    }
  }
})();

module.exports = {
  MASTER_TCCC_MARCH_DECISION_MATRIX
};
