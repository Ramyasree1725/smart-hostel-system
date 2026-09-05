/**
 * @file squadFormationCoordinatesMatrix.js
 * @description Master Tactical Squad Formation Geometry Matrix & Dynamic Offsets.
 * Precomputes relative coordinate displacements for 8-man and 12-man infantry rifle squads across all combat formations.
 */

export const SQUAD_FORMATION_GEOMETRY_MATRIX = [];

(function populateFormationMatrix() {
  const FORMATION_NAMES = ['TACTICAL_WEDGE', 'SQUAD_COLUMN_STAGGERED', 'ECHELON_RIGHT', 'ECHELON_LEFT', 'ASSAULT_LINE', 'DEFENSIVE_DIAMOND_360', 'VEE_FORMATION'];
  const INTERVAL_DISTANCES_METERS = [5.0, 10.0, 15.0, 20.0, 25.0];

  for (let fIdx = 0; fIdx < FORMATION_NAMES.length; fIdx++) {
    const formation = FORMATION_NAMES[fIdx];

    for (let dIdx = 0; dIdx < INTERVAL_DISTANCES_METERS.length; dIdx++) {
      const interval = INTERVAL_DISTANCES_METERS[dIdx];

      for (let soldierNum = 1; soldierNum <= 12; soldierNum++) {
        const sign = (soldierNum % 2 === 1) ? -1 : 1;
        const rank = Math.ceil(soldierNum / 2);
        const lateralOffset = (formation === 'ASSAULT_LINE') ? sign * rank * interval : (formation === 'TACTICAL_WEDGE') ? sign * rank * (interval * 0.707) : (formation === 'SQUAD_COLUMN_STAGGERED') ? sign * 1.5 : sign * rank * interval;
        const longitudinalOffset = (formation === 'ASSAULT_LINE') ? 0.0 : (formation === 'TACTICAL_WEDGE') ? -rank * (interval * 0.707) : (formation === 'SQUAD_COLUMN_STAGGERED') ? -soldierNum * interval : -rank * interval;

        SQUAD_FORMATION_GEOMETRY_MATRIX.push({
          matrixKey: `FORM-${formation}-INT${interval}-M${soldierNum}`,
          formationType: formation,
          soldierPositionNumber: soldierNum,
          intervalMeters: interval,
          relativeLateralOffsetMeters: Number(lateralOffset.toFixed(2)),
          relativeLongitudinalOffsetMeters: Number(longitudinalOffset.toFixed(2)),
          sectorOfResponsibilityAzimuthOffsetDeg: (soldierNum === 1) ? 0 : (sign === -1) ? 315 : 45,
          movementSpeedMultiplier: (formation === 'ASSAULT_LINE') ? 0.75 : 1.0,
          vulnerabilityToEnfiladeFire: (formation.includes('COLUMN')) ? 'HIGH_ENFILADE_VULNERABILITY' : 'LOW_DISPERSED'
        });
      }
    }
  }
})();
