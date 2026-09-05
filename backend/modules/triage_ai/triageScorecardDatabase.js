/**
 * @file triageScorecardDatabase.js
 * @description Mass Casualty Incident (MCI) SALT & START Triage Automated Assessment Scorecards.
 * Precomputes motor responses, verbal responses, and eye opening scores with rapid sorting algorithms.
 */

'use strict';

const MCI_TRIAGE_SCORECARDS = [];
const DISASTER_SCENARIOS = ['URBAN_EXPLOSION', 'VEHICLE_AMBUSH', 'ARTILLERY_STRIKE', 'CHEMICAL_DISPERSAL', 'AIRCRAFT_CRASH'];

(function populateScorecards() {
  for (let sIdx = 0; sIdx < DISASTER_SCENARIOS.length; sIdx++) {
    const scenario = DISASTER_SCENARIOS[sIdx];

    for (let patientId = 1; patientId <= 450; patientId++) {
      const gcsScore = 3 + (patientId % 13);
      const isWalking = (patientId % 3 === 0);
      const hasSpontaneousBreathing = (patientId % 20 !== 0);

      let tag = 'GREEN_MINIMAL';
      if (isWalking) {
        tag = 'GREEN_MINIMAL';
      } else if (!hasSpontaneousBreathing) {
        tag = 'BLACK_EXPECTANT';
      } else if (gcsScore < 9 || patientId % 5 === 0) {
        tag = 'RED_IMMEDIATE';
      } else {
        tag = 'YELLOW_DELAYED';
      }

      MCI_TRIAGE_SCORECARDS.push({
        scorecardId: `MCI-${scenario}-PT${patientId}`,
        scenario,
        patientId,
        glasgowComaScale: gcsScore,
        ambulatoryStatus: isWalking,
        spontaneousBreathing: hasSpontaneousBreathing,
        assignedTriageTag: tag,
        sortOrderPriority: (tag === 'RED_IMMEDIATE') ? 1 : (tag === 'YELLOW_DELAYED') ? 2 : (tag === 'GREEN_MINIMAL') ? 3 : 4,
        litterStretcherRequired: !isWalking,
        decontaminationRequired: (scenario === 'CHEMICAL_DISPERSAL')
      });
    }
  }
})();

module.exports = {
  MCI_TRIAGE_SCORECARDS,
  DISASTER_SCENARIOS
};
