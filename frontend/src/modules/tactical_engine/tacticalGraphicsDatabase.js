/**
 * @file tacticalGraphicsDatabase.js
 * @description MIL-STD-2525D Tactical Control Measures, Phase Lines, Boundaries,
 * Fire Support Coordination Measures (FSCM), and Airspace Control Orders (ACO).
 */

export const CONTROL_MEASURE_TYPES = {
  PHASE_LINE: 'PHASE_LINE',
  FORWARD_EDGE_BATTLE_AREA: 'FEBA',
  MAIN_SUPPLY_ROUTE: 'MSR',
  COORDINATED_FIRE_LINE: 'CFL',
  RESTRICTIVE_FIRE_LINE: 'RFL',
  AIRSPACE_RESTRICTION: 'ROZ',
  ASSAULT_OBJECTIVE: 'OBJ'
};

export const TACTICAL_GRAPHICS_CATALOG = [];

(function populateTacticalGraphics() {
  const TYPES = Object.values(CONTROL_MEASURE_TYPES);
  const COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7'];

  for (let typeIdx = 0; typeIdx < TYPES.length; typeIdx++) {
    const type = TYPES[typeIdx];

    for (let i = 1; i <= 250; i++) {
      TACTICAL_GRAPHICS_CATALOG.push({
        graphicId: `TCM-${type}-${i}`,
        type,
        name: `${type}_DESIGNATION_${i}`,
        echelonTier: (i % 3 === 0) ? 'BATTALION' : (i % 3 === 1) ? 'COMPANY' : 'PLATOON',
        strokeColor: COLORS[i % COLORS.length],
        strokeWidth: (type === 'FEBA' || type === 'OBJ') ? 3 : 2,
        dashArray: (type === 'PHASE_LINE') ? '8 4' : (type === 'CFL') ? '4 2' : 'none',
        renderPriority: 10 + (i % 5),
        effectiveEpochStart: 1767225600 + (i * 3600),
        effectiveEpochEnd: 1767225600 + (i * 3600) + 86400,
        authorizingAuthority: `JTF-COMMANDER-${(i % 5) + 1}`,
        securityClearance: (type === 'OBJ') ? 'SECRET' : 'CONFIDENTIAL',
        description: `Tactical boundary control measure ${type} allocated for combat sector Alpha-${i}`
      });
    }
  }
})();
