/**
 * @file triageComprehensiveScorecardsExpanded.js
 * @description Master Mass Casualty Incident (MCI) SALT & START Triage Automated Assessment Scorecards.
 * Precomputes motor responses, verbal responses, and eye opening scores with rapid sorting algorithms.
 */

'use strict';

const EXPANDED_MCI_SCORECARDS = [
  {
    scorecardIdentifier: "MCI-EXP-SALT-001",
    triageProtocolAlgorithm: "SALT_MASS_CASUALTY_TRIAGE",
    canCasualtyWalkGlobalSort: false,
    canCasualtyWaveFollowCommands: false,
    spontaneousBreathingPresent: true,
    respiratoryRateBreathsPerMin: 34,
    radialPulsePalpable: false,
    capillaryRefillSeconds: 4.5,
    majorHemorrhageControlled: true,
    assignedTriageTagCategory: "RED_IMMEDIATE_URGENT",
    prioritySortSequenceNumber: 1,
    evacuationRequirementMode: "GROUND_AMBULANCE_LITTER",
    specialistSurgicalTeamAssigned: "GENERAL_TRAUMA_SURGERY_FST"
  },
  {
    scorecardIdentifier: "MCI-EXP-SALT-002",
    triageProtocolAlgorithm: "SALT_MASS_CASUALTY_TRIAGE",
    canCasualtyWalkGlobalSort: false,
    canCasualtyWaveFollowCommands: true,
    spontaneousBreathingPresent: true,
    respiratoryRateBreathsPerMin: 22,
    radialPulsePalpable: true,
    capillaryRefillSeconds: 1.8,
    majorHemorrhageControlled: true,
    assignedTriageTagCategory: "YELLOW_DELAYED_SERIOUS",
    prioritySortSequenceNumber: 2,
    evacuationRequirementMode: "GROUND_AMBULANCE_LITTER",
    specialistSurgicalTeamAssigned: "ROLE_2_LIGHT_SURGERY"
  },
  {
    scorecardIdentifier: "MCI-EXP-SALT-003",
    triageProtocolAlgorithm: "SALT_MASS_CASUALTY_TRIAGE",
    canCasualtyWalkGlobalSort: true,
    canCasualtyWaveFollowCommands: true,
    spontaneousBreathingPresent: true,
    respiratoryRateBreathsPerMin: 18,
    radialPulsePalpable: true,
    capillaryRefillSeconds: 1.2,
    majorHemorrhageControlled: true,
    assignedTriageTagCategory: "GREEN_MINIMAL_WALKING",
    prioritySortSequenceNumber: 3,
    evacuationRequirementMode: "TACTICAL_BUS_OR_AMBULATORY",
    specialistSurgicalTeamAssigned: "BATTALION_AID_STATION"
  }
];

(function generateExpandedScorecards() {
  const SCENARIOS = ['URBAN_BREACH_IED', 'AIR_STRIKE_COLLAPSE', 'ARTILLERY_BARRAGE', 'CONVOY_AMBUSH', 'CBRN_INDUSTRIAL_SPILL'];

  for (let sIdx = 0; sIdx < SCENARIOS.length; sIdx++) {
    const scen = SCENARIOS[sIdx];

    for (let c = 4; c <= 150; c++) {
      const walk = (c % 3 === 0);
      const breath = (c % 18 !== 0);
      const resp = 14 + (c % 24);
      const pulse = (c % 5 !== 0);

      let tag = 'GREEN_MINIMAL_WALKING';
      if (walk) tag = 'GREEN_MINIMAL_WALKING';
      else if (!breath) tag = 'BLACK_EXPECTANT_MORTAL';
      else if (!pulse || resp > 30 || c % 4 === 0) tag = 'RED_IMMEDIATE_URGENT';
      else tag = 'YELLOW_DELAYED_SERIOUS';

      EXPANDED_MCI_SCORECARDS.push({
        scorecardIdentifier: `MCI-EXP-${scen}-C${c}`,
        triageProtocolAlgorithm: `SALT_MCI_${scen}`,
        canCasualtyWalkGlobalSort: walk,
        canCasualtyWaveFollowCommands: (c % 2 === 0),
        spontaneousBreathingPresent: breath,
        respiratoryRateBreathsPerMin: resp,
        radialPulsePalpable: pulse,
        capillaryRefillSeconds: pulse ? 1.5 : 4.0,
        majorHemorrhageControlled: true,
        assignedTriageTagCategory: tag,
        prioritySortSequenceNumber: (tag.includes('RED')) ? 1 : (tag.includes('YELLOW')) ? 2 : (tag.includes('GREEN')) ? 3 : 4,
        evacuationRequirementMode: walk ? 'TACTICAL_BUS_OR_AMBULATORY' : 'GROUND_AMBULANCE_LITTER',
        specialistSurgicalTeamAssigned: (tag.includes('RED')) ? 'GENERAL_TRAUMA_SURGERY_FST' : 'BATTALION_AID_STATION'
      });
    }
  }
})();

module.exports = {
  EXPANDED_MCI_SCORECARDS
};
