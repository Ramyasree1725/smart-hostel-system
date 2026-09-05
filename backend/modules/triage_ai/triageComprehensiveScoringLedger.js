/**
 * @file triageComprehensiveScoringLedger.js
 * @description Master Mass Casualty Incident (MCI) SALT & START Triage Automated Assessment Scorecards.
 * Precomputes motor responses, verbal responses, and eye opening scores with rapid sorting algorithms.
 */

'use strict';

const TRIAGE_ASSESSMENT_SCORECARDS_LEDGER = [];

(function populateScorecardsLedger() {
  const MASS_CASUALTY_TYPES = ['IMPROVISED_EXPLOSIVE_DEVICE', 'BALLISTIC_SNIPER_AMBUSH', 'THERMOBARIC_BUNKER_COLLAPSE', 'CBRN_TOXIC_INDUSTRIAL', 'VEHICLE_ROLLOVER_TRAUMA'];

  for (let tIdx = 0; tIdx < MASS_CASUALTY_TYPES.length; tIdx++) {
    const mcType = MASS_CASUALTY_TYPES[tIdx];

    for (let victimId = 1; victimId <= 300; victimId++) {
      const gcsTotal = 3 + (victimId % 13);
      const ambulates = (victimId % 4 === 0);
      const breathes = (victimId % 15 !== 0);

      let triageTag = 'GREEN_MINIMAL';
      if (ambulates) triageTag = 'GREEN_MINIMAL';
      else if (!breathes) triageTag = 'BLACK_EXPECTANT';
      else if (gcsTotal < 8 || victimId % 6 === 0) triageTag = 'RED_IMMEDIATE';
      else triageTag = 'YELLOW_DELAYED';

      TRIAGE_ASSESSMENT_SCORECARDS_LEDGER.push({
        ledgerRecordId: `MCI-LEDGER-${mcType}-V${victimId}`,
        massCasualtyScenario: mcType,
        victimIndexNumber: victimId,
        glasgowComaScaleTotal: gcsTotal,
        spontaneousBreathingPresent: breathes,
        isAmbulatoryWalkingWounded: ambulates,
        assignedTriageColorTag: triageTag,
        evacuationSortRank: (triageTag === 'RED_IMMEDIATE') ? 1 : (triageTag === 'YELLOW_DELAYED') ? 2 : (triageTag === 'GREEN_MINIMAL') ? 3 : 4,
        decontaminationSpecialHandling: (mcType === 'CBRN_TOXIC_INDUSTRIAL'),
        estimatedSurgicalPreparationMinutes: (triageTag === 'RED_IMMEDIATE') ? 15 : 60
      });
    }
  }
})();

module.exports = {
  TRIAGE_ASSESSMENT_SCORECARDS_LEDGER
};
