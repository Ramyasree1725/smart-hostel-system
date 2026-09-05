/**
 * @file marchPawsCasualtyMatrixLedger.js
 * @description Master MARCH-PAWS Casualty Clinical Decision & Triage Assessment Ledger
 */

const MARCH_PAWS_CLINICAL_DECISION_NODES = [
  {
    decisionNodeId: "DN_M_001",
    tcccPhase: "CARE_UNDER_FIRE",
    marchDomain: "M_MASSIVE_HEMORRHAGE",
    clinicalPresentation: "LIFE_THREATENING_LIMB_ARTERIAL_BLEED",
    assessmentMethod: "RAPID_VISUAL_SWEEP_UNDER_COVER",
    priorityLevel: 1,
    timeConstraintSeconds: 60,
    primaryIntervention: "COMTAC_TOURNIQUET_HIGH_AND_TIGHT",
    secondaryIntervention: "SECOND_TOURNIQUET_SIDE_BY_SIDE_IF_BLEEDING_PERSISTS",
    adjunctEquipment: ["CAT_GEN7_TOURNIQUET", "SAM_XT_TOURNIQUET"],
    contraindications: "DO_NOT_APPLY_OVER_HOLSTERS_POCKETS_JOINTS",
    successCriteria: "CESSATION_OF_BLEEDING_DISTAL_PULSE_ABSENT",
    failureAction: "APPLY_SECOND_TOURNIQUET_PROXIMAL_TO_FIRST",
    medevacPrecedence: "URGENT_SURGICAL",
    specialEquipmentNeeded: "SURGICAL_TEAM_AND_WHOLE_BLOOD",
    triageColorCode: "RED",
    documentationRequirement: "MARK_TIME_ON_TOURNIQUET_AND_FOREHEAD"
  },
  {
    decisionNodeId: "DN_A_002",
    tcccPhase: "TACTICAL_FIELD_CARE",
    marchDomain: "A_AIRWAY_MANAGEMENT",
    clinicalPresentation: "AIRWAY_OBSTRUCTION_MAXILLOFACIAL_TRAUMA",
    assessmentMethod: "LOOK_LISTEN_FEEL_CHECK_FOR_STRIDOR",
    priorityLevel: 2,
    timeConstraintSeconds: 120,
    primaryIntervention: "RECOVERY_POSITION_NASOPHARYNGEAL_AIRWAY_NPA",
    secondaryIntervention: "SURGICAL_CRICOTHYROIDOTOMY",
    adjunctEquipment: ["28F_NPA", "CRIC_KEY_KIT", "10CC_SYRINGE"],
    contraindications: "DO_NOT_USE_NPA_IN_MIDFACE_SMASH_WITH_CSF_LEAK",
    successCriteria: "PATENT_AIRWAY_SPO2_GREATER_THAN_90",
    failureAction: "PERFORM_IMMEDIATE_SURGICAL_CRIC",
    medevacPrecedence: "URGENT_SURGICAL",
    specialEquipmentNeeded: "VENTILATOR_CRIC_SUPPORT",
    triageColorCode: "RED",
    documentationRequirement: "LOG_TIME_OF_AIRWAY_ESTABLISHMENT_DD1380"
  },
  {
    decisionNodeId: "DN_R_003",
    tcccPhase: "TACTICAL_FIELD_CARE",
    marchDomain: "R_RESPIRATION_BREATHING",
    clinicalPresentation: "SUSPECTED_TENSION_PNEUMOTHORAX",
    assessmentMethod: "PROGRESSIVE_DYSPNEA_ABSENT_UNILATERAL_BREATH_SOUNDS",
    priorityLevel: 3,
    timeConstraintSeconds: 180,
    primaryIntervention: "NEEDLE_CHEST_DECOMPRESSION_NCD_10G",
    secondaryIntervention: "FINGER_THORACOSTOMY_OR_CHEST_TUBE",
    adjunctEquipment: ["10G_3_25INCH_CATHETER", "VENTED_CHEST_SEAL"],
    contraindications: "DO_NOT_DELAY_FOR_RADIOGRAPHY",
    successCriteria: "RUSH_OF_AIR_RELIEF_OF_DYSPNEA_IMPROVED_SPO2",
    failureAction: "SECOND_NCD_AT_ALTERNATIVE_ANATOMICAL_SITE",
    medevacPrecedence: "URGENT_SURGICAL",
    specialEquipmentNeeded: "CHEST_DRAIN_VALVE",
    triageColorCode: "RED",
    documentationRequirement: "RECORD_NCD_TIME_AND_ANATOMICAL_LOCATION"
  },
  {
    decisionNodeId: "DN_C_004",
    tcccPhase: "TACTICAL_FIELD_CARE",
    marchDomain: "C_CIRCULATION_RESUSCITATION",
    clinicalPresentation: "HEMORRHAGIC_SHOCK_SBP_UNDER_90",
    assessmentMethod: "WEAK_RADIAL_PULSE_ALTERED_MENTAL_STATUS",
    priorityLevel: 4,
    timeConstraintSeconds: 300,
    primaryIntervention: "TXA_2G_IV_IO_PUSH_AND_LTOWB_TRANSFUSION",
    secondaryIntervention: "PLASMA_AND_RBC_1_TO_1_RATIO",
    adjunctEquipment: ["FAST1_IO_SYSTEM", "BLOOD_WARMER_WARM_LITE"],
    contraindications: "AVOID_HES_AND_LARGE_VOLUME_NORMAL_SALINE",
    successCriteria: "PALPABLE_RADIAL_PULSE_SBP_100_IMPROVED_MENTATION",
    failureAction: "CONTINUE_WHOLE_BLOOD_TRANSFUSION_SEARCH_FOR_OCCULT_BLEED",
    medevacPrecedence: "URGENT_SURGICAL",
    specialEquipmentNeeded: "ACTIVE_BLOOD_BANK_RESERVE",
    triageColorCode: "RED",
    documentationRequirement: "RECORD_TRANSFUSION_LOT_NUMBER_AND_VOLUME"
  },
  {
    decisionNodeId: "DN_H_005",
    tcccPhase: "TACTICAL_FIELD_CARE",
    marchDomain: "H_HYPOTHERMIA_HEAD_TBI",
    clinicalPresentation: "HYPOTHERMIA_RISK_AND_CLOSED_HEAD_INJURY",
    assessmentMethod: "CHECK_CORE_TEMP_PUPIL_REACTIVITY_GCS",
    priorityLevel: 5,
    timeConstraintSeconds: 600,
    primaryIntervention: "ACTIVE_HYPOTHERMIA_PREVENTION_HPMK_ELEVATE_HEAD_30_DEG",
    secondaryIntervention: "HYPERTONIC_SALINE_3_PCT_IF_SIGNS_OF_HERNIATION",
    adjunctEquipment: ["READY_HEAT_BLANKET", "HEAT_REFLECTIVE_SHELL"],
    contraindications: "DO_NOT_PLACE_CHEMICAL_HEATING_SHEETS_DIRECTLY_ON_BARE_SKIN",
    successCriteria: "CORE_TEMP_MAINTAINED_ABOVE_37C_STABLE_GCS",
    failureAction: "ADD_SECONDARY_THERMAL_BARRIER_AGGRESSIVE_WARMING",
    medevacPrecedence: "PRIORITY",
    specialEquipmentNeeded: "NEUROLOGICAL_ICU_CAPABILITY",
    triageColorCode: "YELLOW",
    documentationRequirement: "SERIAL_GCS_LOGGING_EVERY_15_MINUTES"
  }
];

class MarchPawsCasualtyLedgerEngine {
  constructor() {
    this.nodes = MARCH_PAWS_CLINICAL_DECISION_NODES;
  }

  getNodeById(nodeId) {
    return this.nodes.find((n) => n.decisionNodeId === nodeId) || this.nodes[0];
  }
}

module.exports = {
  MARCH_PAWS_CLINICAL_DECISION_NODES,
  MarchPawsCasualtyLedgerEngine
};
