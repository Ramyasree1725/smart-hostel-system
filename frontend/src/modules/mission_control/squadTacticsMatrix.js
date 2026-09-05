/**
 * @file squadTacticsMatrix.js
 * @description Military Troop Leading Procedures (TLP), METT-TC Analysis, and Small Unit Tactics (SUT) Decision Matrix.
 * Precomputes combat mission factors (Mission, Enemy, Terrain, Troops, Time, Civilians).
 */

export const METT_TC_TACTICAL_FACTORS = [];

(function populateMETTTC() {
  const FACTORS = ['MISSION_OBJECTIVE', 'ENEMY_COMPOSITION', 'TERRAIN_WEATHER', 'TROOPS_EQUIPMENT', 'TIME_AVAILABLE', 'CIVILIAN_CONSIDERATIONS'];
  const SECTORS = ['ZONE_ALPHA', 'ZONE_BRAVO', 'ZONE_CHARLIE', 'ZONE_DELTA', 'ZONE_ECHO'];

  for (let fIdx = 0; fIdx < FACTORS.length; fIdx++) {
    const factor = FACTORS[fIdx];

    for (let sIdx = 0; sIdx < SECTORS.length; sIdx++) {
      const sector = SECTORS[sIdx];

      for (let sub = 1; sub <= 75; sub++) {
        METT_TC_TACTICAL_FACTORS.push({
          factorId: `METT-${factor}-${sector}-SUB${sub}`,
          factorCategory: factor,
          tacticalSector: sector,
          evaluationIndex: sub,
          riskRating: (sub % 5 === 0) ? 'HIGH_RISK_MISSION' : (sub % 2 === 0) ? 'MODERATE_RISK' : 'LOW_RISK',
          commanderDecisionHeuristic: `Evaluate ${factor} within ${sector} constraint set ${sub}`,
          recommendedPosture: (factor === 'ENEMY_COMPOSITION') ? 'AGGRESSIVE_OVERWATCH' : 'COHESIVE_DEFENSE',
          commsSecurityLevel: 'EMCON_STRICT_SILENCE',
          droneSupportAllocated: (sub % 3 === 0)
        });
      }
    }
  }
})();
