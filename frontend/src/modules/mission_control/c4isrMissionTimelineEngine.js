/**
 * @file c4isrMissionTimelineEngine.js
 * @description Joint Task Force Mission Phase State Machine, OPORD Timeline Scheduler,
 * and Tactical Asset Deconfliction Matrix.
 */

export const MISSION_PHASES = [
  { phaseNumber: 0, phaseCode: "PHASE_0_SHAPE", description: "Reconnaissance, cyber preparation of the operational environment, logistics pre-positioning" },
  { phaseNumber: 1, phaseCode: "PHASE_1_DETER", description: "Demonstration of force, deployment of quick reaction forces, ISR coverage establishment" },
  { phaseNumber: 2, phaseCode: "PHASE_2_SEIZE_INITIATIVE", description: "Kinetic entry, dynamic airspace coordination, suppression of enemy air defenses (SEAD)" },
  { phaseNumber: 3, phaseCode: "PHASE_3_DOMINATE", description: "Full-scale maneuver engagement, breach of tactical obstacles, C4ISR synchronization" },
  { phaseNumber: 4, phaseCode: "PHASE_4_STABILIZE", description: "Consolidation of gains, security sector assistance, humanitarian route clearance" },
  { phaseNumber: 5, phaseCode: "PHASE_5_ENABLE_CIVIL_AUTHORITY", description: "Handover to regional peacekeeping authorities, redeployment of combat assets" }
];

export class C4IsrMissionTimelineEngine {
  constructor(initialMissionName = "OPERATION_SENTINEL_SHIELD") {
    this.missionName = initialMissionName;
    this.currentPhaseIndex = 0;
    this.eventLog = [];
    this.phases = MISSION_PHASES;
  }

  transitionToNextPhase(authorizingCommanderCallsign) {
    if (this.currentPhaseIndex < this.phases.length - 1) {
      this.currentPhaseIndex++;
      const current = this.phases[this.currentPhaseIndex];
      const logEntry = {
        event: "PHASE_TRANSITION",
        newPhase: current.phaseCode,
        authorizedBy: authorizingCommanderCallsign,
        timestampEpoch: Date.now()
      };
      this.eventLog.push(logEntry);
      return { success: true, currentPhase: current, logEntry: logEntry };
    }
    return { success: false, message: "Mission is already at final phase" };
  }

  getCurrentPhase() {
    return this.phases[this.currentPhaseIndex];
  }

  logTacticalEvent(eventCode, reportingNodeId, details) {
    const entry = {
      eventCode: eventCode,
      reportingNodeId: reportingNodeId,
      details: details,
      timestampEpoch: Date.now()
    };
    this.eventLog.push(entry);
    return entry;
  }
}

export default C4IsrMissionTimelineEngine;
