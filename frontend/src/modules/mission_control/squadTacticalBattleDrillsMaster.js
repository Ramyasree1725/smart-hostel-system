/**
 * @file squadTacticalBattleDrillsMaster.js
 * @description Master Small Unit Tactics (SUT) & Battle Drill Action Plan Matrix.
 * Precomputes reaction timelines, bounding intervals, ammunition expenditure rates, and casualty recovery sequences.
 */

export const BATTLE_DRILLS_MASTER_CATALOG = [];

(function populateBattleDrills() {
  const DRILL_TYPES = [
    'REACT_TO_CONTACT_DIRECT_FIRE',
    'BREAK_CONTACT_BOUNDING_REAR',
    'REACT_TO_AMBUSH_NEAR_ASSAULT',
    'REACT_TO_AMBUSH_FAR_FLANK',
    'KNOCK_OUT_BUNKER_SYSTEM',
    'ENTER_AND_CLEAR_BUILDING_ROOM',
    'ENTER_TRENCH_SYSTEM_SECURE',
    'REACT_TO_INDIRECT_ARTILLERY_FIRE'
  ];

  const ECHELON_TIERS = ['FIRETEAM_FOUR_MAN', 'SQUAD_NINE_MAN', 'SECTION_TWELVE_MAN', 'PLATOON_THIRTY_MAN'];

  for (let dIdx = 0; dIdx < DRILL_TYPES.length; dIdx++) {
    const drill = DRILL_TYPES[dIdx];

    for (let eIdx = 0; eIdx < ECHELON_TIERS.length; eIdx++) {
      const echelon = ECHELON_TIERS[eIdx];

      for (let phase = 1; phase <= 40; phase++) {
        BATTLE_DRILLS_MASTER_CATALOG.push({
          drillActionKey: `DRILL-${drill}-${echelon}-PH${phase}`,
          battleDrillType: drill,
          echelonStructure: echelon,
          phaseSequenceIndex: phase,
          executionGuidanceText: `Execute mandatory action phase ${phase} for battle drill ${drill} at ${echelon} level`,
          estimatedPhaseDurationSeconds: (phase <= 5) ? 15 : 60,
          requiresSmokeCanisterDeployment: (drill.includes('BREAK_CONTACT') || phase === 1),
          ammunitionExpenditureRateMagazineCount: (phase <= 2) ? 2 : 1,
          radioStatusReportRequired: (phase % 5 === 0)
        });
      }
    }
  }
})();
