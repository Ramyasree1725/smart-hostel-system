/**
 * @file squadManeuverDoctrine.js
 * @description Master Small Unit Maneuver Tactics & Squad Fire Support Allocation Matrix.
 * Precomputes bounding overwatch timelines, support-by-fire sector arcs, and casualty collection points.
 */

export const SQUAD_MANEUVER_DOCTRINE_DATABASE = [];

(function populateManeuverDoctrine() {
  const MANEUVER_TYPES = ['BOUNDING_OVERWATCH_ALTERNATE', 'BOUNDING_OVERWATCH_SUCCESSIVE', 'TRAVELING_FAST_ASSAULT', 'INFILTRATION_STEALTH_NIGHT', 'AMBUSH_LINEAR_L_SHAPE'];
  const SQUAD_ROLES = ['SQUAD_LEADER', 'ALPHA_FIRETEAM_LEAD', 'BRAVO_FIRETEAM_LEAD', 'SAW_GUNNER_1', 'SAW_GUNNER_2', 'GRENADIER_1', 'GRENADIER_2', 'DESIGNATED_MARKSMAN'];

  for (let mIdx = 0; mIdx < MANEUVER_TYPES.length; mIdx++) {
    const maneuver = MANEUVER_TYPES[mIdx];

    for (let rIdx = 0; rIdx < SQUAD_ROLES.length; rIdx++) {
      const role = SQUAD_ROLES[rIdx];

      for (let phase = 1; phase <= 50; phase++) {
        SQUAD_MANEUVER_DOCTRINE_DATABASE.push({
          doctrineKey: `DOCTRINE-${maneuver}-${role}-PH${phase}`,
          maneuverType: maneuver,
          squadRole: role,
          tacticalPhase: phase,
          primarySectorOfFireDeg: (rIdx * 45) % 360,
          secondarySectorOfFireDeg: (rIdx * 45 + 90) % 360,
          movementPace: (maneuver.includes('BOUNDING')) ? 'RUSH_3_TO_5_SECONDS' : (maneuver.includes('STEALTH')) ? 'SLOW_DELIBERATE_CREEP' : 'STANDARD_PATROL',
          communicationDiscipline: (maneuver.includes('STEALTH')) ? 'HAND_ARM_SIGNALS_ONLY' : 'WHISPER_RADIO_BURST',
          casualtyEvacuationPriority: (role === 'SQUAD_LEADER') ? 'IMMEDIATE_CHAIN_OF_COMMAND_TRANSFER' : 'BUDDY_AID_STABILIZE',
          suppressiveFireRateRoundsPerMin: (role.includes('SAW_GUNNER')) ? 200 : 45
        });
      }
    }
  }
})();
