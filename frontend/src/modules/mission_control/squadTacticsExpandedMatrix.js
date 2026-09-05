/**
 * @file squadTacticsExpandedMatrix.js
 * @description Military Troop Leading Procedures (TLP), METT-TC Analysis, and Small Unit Tactics (SUT) Decision Matrix.
 * Precomputes combat mission factors (Mission, Enemy, Terrain, Troops, Time, Civilians).
 */

export const EXPANDED_SQUAD_TACTICS_MATRIX = [
  {
    decisionActionId: "TACTIC-TLP-RECEIPT_OF_MISSION-001",
    tacticalProcedureStage: "TROOP_LEADING_PROCEDURES_TLP",
    actionName: "RECEIPT_OF_MISSION_AND_WARNORD",
    echelonLevel: "SQUAD_AND_FIRETEAM",
    estimatedExecutionMinutes: 15,
    criticalDeliverable: "WARNING_ORDER_1_TO_PLATOON",
    communicationProtocol: "ENCRYPTED_VOICE_AND_DATA_BURST",
    securityPostureRequirement: "360_DEGREE_HASTY_PERIMETER",
    ammunitionReadinessState: "WEAPONS_ON_SAFE_MAGAZINES_LOCKED",
    droneSurveillanceRequested: true,
    riskMitigationHeuristic: "Continuous observation post coverage on primary danger avenues",
    tcccMedicReadinessCheck: "Ensure casualty collection point (CCP) grid designated"
  },
  {
    decisionActionId: "TACTIC-TLP-ISSUE_WARNORD-002",
    tacticalProcedureStage: "TROOP_LEADING_PROCEDURES_TLP",
    actionName: "ISSUE_WARNING_ORDER_TO_SUBORDINATES",
    echelonLevel: "FIRETEAM_LEADERS",
    estimatedExecutionMinutes: 20,
    criticalDeliverable: "SQUAD_WARNORD_DISTRIBUTION",
    communicationProtocol: "FACE_TO_FACE_WHISPER_CONFERENCE",
    securityPostureRequirement: "INTERLOCKING_SECTORS_OF_FIRE",
    ammunitionReadinessState: "WEAPONS_ON_SAFE_MAGAZINES_LOCKED",
    droneSurveillanceRequested: false,
    riskMitigationHeuristic: "Maintain noise and light discipline under night vision goggles",
    tcccMedicReadinessCheck: "Confirm all individual first aid kits (IFAK) restocked"
  },
  {
    decisionActionId: "TACTIC-TLP-MAKE_TENTATIVE_PLAN-003",
    tacticalProcedureStage: "TROOP_LEADING_PROCEDURES_TLP",
    actionName: "MAKE_TENTATIVE_OPERATIONAL_PLAN",
    echelonLevel: "SQUAD_LEADER",
    estimatedExecutionMinutes: 30,
    criticalDeliverable: "TERRAIN_MODEL_MAP_OVERLAY",
    communicationProtocol: "DIGITAL_MAP_DATA_LINK",
    securityPostureRequirement: "CONCEALED_TREE_LINE_OVERWATCH",
    ammunitionReadinessState: "WEAPONS_ON_SAFE_MAGAZINES_LOCKED",
    droneSurveillanceRequested: true,
    riskMitigationHeuristic: "Identify alternate infiltration corridors avoiding open terrain",
    tcccMedicReadinessCheck: "Designate litter bearers and primary/alternate MEDEVAC LZ"
  }
];

(function generateExpandedTactics() {
  const STAGES = ['METT_TC_ANALYSIS', 'RECONNAISSANCE_RECON', 'COMPLETE_PLAN_ORDERS', 'SUPERVISE_REHEARSALS', 'ACTIONS_ON_OBJECTIVE'];
  const SUT_DRILLS = ['REACT_TO_CONTACT', 'BREAK_CONTACT', 'KNOCK_OUT_BUNKER', 'ENTER_CLEAR_BUILDING', 'REACT_TO_AMBUSH'];

  for (let sIdx = 0; sIdx < STAGES.length; sIdx++) {
    const stage = STAGES[sIdx];

    for (let dIdx = 0; dIdx < SUT_DRILLS.length; dIdx++) {
      const drill = SUT_DRILLS[dIdx];

      for (let step = 4; step <= 45; step++) {
        EXPANDED_SQUAD_TACTICS_MATRIX.push({
          decisionActionId: `TACTIC-EXP-${stage}-${drill}-ST${step}`,
          tacticalProcedureStage: stage,
          actionName: `EXECUTE_${drill}_STEP_${step}`,
          echelonLevel: (step % 2 === 0) ? 'SQUAD_LEVEL' : 'FIRETEAM_LEVEL',
          estimatedExecutionMinutes: 10 + (step % 20),
          criticalDeliverable: `TACTICAL_DELIVERABLE_${drill}_${step}`,
          communicationProtocol: 'ENCRYPTED_DATA_BURST',
          securityPostureRequirement: (drill.includes('CONTACT')) ? 'MAXIMUM_RETURN_SUPPRESSIVE_FIRE' : '360_DEGREE_SECURITY',
          ammunitionReadinessState: 'WEAPONS_LOADED_READY_FOR_ENGAGEMENT',
          droneSurveillanceRequested: (step % 3 === 0),
          riskMitigationHeuristic: `Deploy smoke canisters and establish bounding overwatch during ${drill}`,
          tcccMedicReadinessCheck: `Prepare combat medic aid bag for potential casualties in ${drill}`
        });
      }
    }
  }
})();

module.exports = {
  EXPANDED_SQUAD_TACTICS_MATRIX
};
