/**
 * @file traumaSeverityInjuryScores.js
 * @description Comprehensive Combat Trauma Injury Severity Database & Physiological Collapse Scoring.
 * Computes Revised Trauma Score (RTS), Glasgow Coma Scale (GCS), and Abbreviated Injury Scale (AIS) across 2,000 anatomical trauma scenarios.
 */

'use strict';

const ANATOMICAL_INJURY_SCENARIOS = [];

(function populateTraumaScenarios() {
  const BODY_REGIONS = ['CRANIOFACIAL_NEURO', 'THORACIC_PULMONARY', 'ABDOMINAL_VISCERAL', 'PELVIC_VASCULAR', 'EXTREMITY_MUSCULOSKELETAL', 'SYSTEMIC_BLAST_POLYTRAUMA'];
  const SEVERITY_GRADES = ['GRADE_1_SUPERFICIAL', 'GRADE_2_MODERATE', 'GRADE_3_SERIOUS_ORGAN', 'GRADE_4_SEVERE_LIFE_THREAT', 'GRADE_5_CRITICAL_NEAR_FATAL', 'GRADE_6_UNSURVIVABLE'];

  for (let bIdx = 0; bIdx < BODY_REGIONS.length; bIdx++) {
    const region = BODY_REGIONS[bIdx];

    for (let gIdx = 0; gIdx < SEVERITY_GRADES.length; gIdx++) {
      const grade = SEVERITY_GRADES[gIdx];

      for (let caseId = 1; caseId <= 60; caseId++) {
        const aisScore = gIdx + 1;
        const gcsValue = Math.max(3, Math.min(15, 15 - (gIdx * 2) - (caseId % 3)));
        const systolicBP = Math.max(50, 120 - (gIdx * 12) - (caseId % 10));
        const respRate = Math.max(6, 16 + (gIdx * 3) - (caseId % 5));

        // Revised Trauma Score: RTS = 0.9368*GCS_coded + 0.7326*SBP_coded + 0.2908*RR_coded
        const gcsCoded = (gcsValue >= 13) ? 4 : (gcsValue >= 9) ? 3 : (gcsValue >= 6) ? 2 : (gcsValue >= 4) ? 1 : 0;
        const sbpCoded = (systolicBP >= 89) ? 4 : (systolicBP >= 76) ? 3 : (systolicBP >= 50) ? 2 : (systolicBP >= 1) ? 1 : 0;
        const rrCoded = (respRate >= 10 && respRate <= 29) ? 4 : (respRate > 29) ? 3 : (respRate >= 6) ? 2 : (respRate >= 1) ? 1 : 0;

        const rts = 0.9368 * gcsCoded + 0.7326 * sbpCoded + 0.2908 * rrCoded;

        ANATOMICAL_INJURY_SCENARIOS.push({
          scenarioKey: `TRAUMA-${region}-${grade}-CASE${caseId}`,
          bodyRegion: region,
          severityGrade: grade,
          caseIndex: caseId,
          aisScore,
          glasgowComaScale: gcsValue,
          systolicBloodPressureMmHg: systolicBP,
          respiratoryRateBpm: respRate,
          revisedTraumaScoreRTS: Number(rts.toFixed(3)),
          probabilityOfSurvivalPercent: Number((1.0 / (1.0 + Math.exp(-( -1.2470 + 0.9544 * rts ))) * 100).toFixed(1)),
          triageTagAssigned: (aisScore >= 4 || rts < 6.0) ? 'RED_IMMEDIATE' : (aisScore >= 2) ? 'YELLOW_DELAYED' : 'GREEN_MINIMAL',
          surgicalNeed: (aisScore >= 3) ? 'FORWARD_RESUSCITATIVE_SURGERY' : 'FIELD_AID_STATION',
          wholeBloodUnitsProjected: (aisScore >= 4) ? 4 : (aisScore === 3) ? 2 : 0
        });
      }
    }
  }
})();

module.exports = {
  ANATOMICAL_INJURY_SCENARIOS
};
