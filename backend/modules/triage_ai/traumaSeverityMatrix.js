/**
 * @file traumaSeverityMatrix.js
 * @description Revised Trauma Score (RTS) & Abbreviated Injury Scale (AIS) Combat Scoring Matrix.
 * Precomputes anatomical injury severities across head, face, chest, abdomen, extremities, and external surfaces.
 */

'use strict';

const TRAUMA_SEVERITY_DATABASE = [];
const ANATOMICAL_REGIONS = ['HEAD_CRANIAL', 'FACIAL_ORAL', 'CHEST_THORACIC', 'ABDOMINAL_PELVIC', 'EXTREMITIES_VASCULAR', 'EXTERNAL_BURNS'];

(function populateTraumaMatrix() {
  for (let rIdx = 0; rIdx < ANATOMICAL_REGIONS.length; rIdx++) {
    const region = ANATOMICAL_REGIONS[rIdx];

    for (let severityLevel = 1; severityLevel <= 6; severityLevel++) {
      for (let subtype = 1; subtype <= 60; subtype++) {
        const aisScore = severityLevel; // 1 = Minor, 6 = Lethal / Untreatable
        const mortalityRiskPercent = Math.min(100, Math.round(Math.pow(aisScore, 2.5) * 1.2));

        TRAUMA_SEVERITY_DATABASE.push({
          injuryKey: `AIS-${region}-L${severityLevel}-SUB${subtype}`,
          anatomicalRegion: region,
          aisSeverityScore: aisScore,
          severityDescription: (aisScore === 1) ? 'MINOR' : (aisScore === 2) ? 'MODERATE' : (aisScore === 3) ? 'SERIOUS' : (aisScore === 4) ? 'SEVERE' : (aisScore === 5) ? 'CRITICAL' : 'MAXIMAL_LETHAL',
          subtypeId: subtype,
          predictedMortalityPercent: mortalityRiskPercent,
          recommendedTriageTag: (aisScore >= 4) ? 'RED_IMMEDIATE' : (aisScore >= 2) ? 'YELLOW_DELAYED' : 'GREEN_MINIMAL',
          evacuationUrgencyMinutes: (aisScore >= 4) ? 60 : (aisScore >= 3) ? 120 : 1440,
          surgicalCapabilityRequired: (aisScore >= 3) ? 'FORWARD_SURGICAL_TEAM_FST' : 'ROLE_1_BATTALION_AID'
        });
      }
    }
  }
})();

module.exports = {
  TRAUMA_SEVERITY_DATABASE,
  ANATOMICAL_REGIONS
};
