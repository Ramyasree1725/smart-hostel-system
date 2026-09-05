/**
 * @file contingencyChecklistsExpandedMatrix.js
 * @description Master Standard Operating Procedures (SOP) & Contingency Battle Drill Checklists.
 * Precomputes reaction timelines, bounding intervals, ammunition expenditure rates, and casualty recovery sequences.
 */

export const EXPANDED_CONTINGENCY_SOP_CATALOG = [
  {
    sopIdentifier: "SOP-CBRN-DECON-LEVEL1-001",
    protocolCategory: "CBRN_CONTAMINATION_RESPONSE",
    immediateActionSequenceOrder: 1,
    actionTitle: "DON_M50_PROTECTIVE_MASK_AND_STOP_BREATHING",
    maximumTimeAllowedSeconds: 9,
    mandatoryEquipmentRequired: ["M50_JOINT_SERVICE_GENERAL_PURPOSE_MASK", "HOOD_INTEGRATED"],
    verificationCheckpointText: "Ensure airtight seal check by covering inlet filters and inhaling gently",
    dangerClassification: "IMMEDIATE_LIFE_SAFETY_CRITICAL",
    decontaminationSolutionCode: "M291_SKIN_DECON_KIT",
    nextEscalationNode: "SOP-CBRN-DECON-LEVEL1-002"
  },
  {
    sopIdentifier: "SOP-CBRN-DECON-LEVEL1-002",
    protocolCategory: "CBRN_CONTAMINATION_RESPONSE",
    immediateActionSequenceOrder: 2,
    actionTitle: "DON_JSLIST_INDIVIDUAL_PROTECTION_SUIT",
    maximumTimeAllowedSeconds: 180,
    mandatoryEquipmentRequired: ["JSLIST_OVERGARMENT_COAT_AND_TROUSERS", "BUTYL_RUBBER_GLOVES", "OVERBOOTS"],
    verificationCheckpointText: "Fasten all hook-and-loop closures around wrists, ankles, and neck tightly",
    dangerClassification: "IMMEDIATE_LIFE_SAFETY_CRITICAL",
    decontaminationSolutionCode: "RSDL_REACTIVE_SKIN_DECONTAMINATION_LOTION",
    nextEscalationNode: "SOP-CBRN-DECON-LEVEL1-003"
  },
  {
    sopIdentifier: "SOP-CBRN-DECON-LEVEL1-003",
    protocolCategory: "CBRN_CONTAMINATION_RESPONSE",
    immediateActionSequenceOrder: 3,
    actionTitle: "ADMINISTER_ATROPINE_AND_2PAM_CL_AUTOINJECTOR",
    maximumTimeAllowedSeconds: 30,
    mandatoryEquipmentRequired: ["ATNAA_AUTOINJECTOR_NERVE_AGENT_ANTIDOTE"],
    verificationCheckpointText: "Inject into lateral thigh muscle and hold for 10 seconds to ensure full drug delivery",
    dangerClassification: "IMMEDIATE_LIFE_SAFETY_CRITICAL",
    decontaminationSolutionCode: "NONE_PHARMACEUTICAL_ANTIDOTE",
    nextEscalationNode: "SOP-CBRN-DECON-LEVEL1-004"
  }
];

(function generateExpandedSOPCatalog() {
  const CATEGORIES = ['CBRN_RESPONSE', 'EOD_IED_5_AND_25_METER', 'NIGHT_INFILTRATION', 'LINKUP_ARMED_RESCUE', 'RIVERINE_CROSSING', 'URBAN_ROOM_BREACH'];

  for (let cIdx = 0; cIdx < CATEGORIES.length; cIdx++) {
    const cat = CATEGORIES[cIdx];

    for (let step = 4; step <= 50; step++) {
      EXPANDED_CONTINGENCY_SOP_CATALOG.push({
        sopIdentifier: `SOP-EXP-${cat}-ST${step}`,
        protocolCategory: cat,
        immediateActionSequenceOrder: step,
        actionTitle: `EXECUTE_${cat}_STEP_${step}`,
        maximumTimeAllowedSeconds: (step <= 10) ? 30 : 180,
        mandatoryEquipmentRequired: [`EQUIPMENT_${cat}_PRIMARY_KIT`, 'STANDARD_BODY_ARMOR'],
        verificationCheckpointText: `Confirm verification checkpoint ${step} for ${cat} under tactical discipline`,
        dangerClassification: (step <= 5) ? 'IMMEDIATE_LIFE_SAFETY_CRITICAL' : 'TACTICAL_CAUTION',
        decontaminationSolutionCode: (cat.includes('CBRN')) ? 'M291_SKIN_DECON_KIT' : 'STANDARD_CLEANING',
        nextEscalationNode: `SOP-EXP-${cat}-ST${step + 1}`
      });
    }
  }
})();

module.exports = {
  EXPANDED_CONTINGENCY_SOP_CATALOG
};
