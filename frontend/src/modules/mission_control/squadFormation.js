/**
 * @file squadFormation.js
 * @description Tactical Infantry Squad Formation Matrix Geometry & Staggered Spacing Solver.
 * Solves relative offset positions for Wedge, Column, Echelon Left/Right, Vee, and Line formations.
 */

export const FORMATION_TYPES = {
  WEDGE: 'WEDGE',
  COLUMN: 'COLUMN',
  ECHELON_LEFT: 'ECHELON_LEFT',
  ECHELON_RIGHT: 'ECHELON_RIGHT',
  VEE: 'VEE',
  LINE: 'LINE',
  DIAMOND: 'DIAMOND'
};

export class SquadFormationSolver {
  /**
   * Calculates local Cartesian relative offsets (X = lateral meters, Y = longitudinal meters)
   */
  static getFormationOffsets(formationType, soldierIndex, squadIntervalMeters = 10.0) {
    if (soldierIndex === 0) {
      // Squad Leader (Point / Apex)
      return { lateralX: 0.0, longitudinalY: 0.0 };
    }

    const rank = Math.ceil(soldierIndex / 2);
    const isLeft = (soldierIndex % 2) === 1;
    const sign = isLeft ? -1 : 1;

    switch (formationType) {
      case FORMATION_TYPES.WEDGE:
        // Trailing 45-degree angle backwards
        return {
          lateralX: sign * rank * (squadIntervalMeters * Math.sin(Math.PI / 4)),
          longitudinalY: -rank * (squadIntervalMeters * Math.cos(Math.PI / 4))
        };

      case FORMATION_TYPES.COLUMN:
        // Single file trailing behind leader
        return {
          lateralX: (soldierIndex % 2 === 0 ? 1 : -1) * 1.5, // Slight stagger
          longitudinalY: -soldierIndex * squadIntervalMeters
        };

      case FORMATION_TYPES.ECHELON_RIGHT:
        // 45-degree flank to right rear
        return {
          lateralX: soldierIndex * squadIntervalMeters * 0.707,
          longitudinalY: -soldierIndex * squadIntervalMeters * 0.707
        };

      case FORMATION_TYPES.ECHELON_LEFT:
        // 45-degree flank to left rear
        return {
          lateralX: -soldierIndex * squadIntervalMeters * 0.707,
          longitudinalY: -soldierIndex * squadIntervalMeters * 0.707
        };

      case FORMATION_TYPES.LINE:
        // Abreast abreast horizontally for assault
        return {
          lateralX: sign * rank * squadIntervalMeters,
          longitudinalY: 0.0
        };

      case FORMATION_TYPES.VEE:
        // Reversed wedge (flanks forward)
        return {
          lateralX: sign * rank * (squadIntervalMeters * 0.707),
          longitudinalY: rank * (squadIntervalMeters * 0.707)
        };

      case FORMATION_TYPES.DIAMOND:
      default:
        // 360-degree perimeter security
        const angle = ((soldierIndex - 1) * (2 * Math.PI / 7)) - (Math.PI / 2);
        return {
          lateralX: squadIntervalMeters * Math.cos(angle),
          longitudinalY: squadIntervalMeters * Math.sin(angle)
        };
    }
  }

  /**
   * Transforms local formation offsets into global WGS84 Geodetic Coordinates given Squad Leader position & heading
   */
  static solveWorldCoordinates(squadLeaderPos, headingDegrees, formationType, squadMembers, intervalMeters = 10.0) {
    const headingRad = headingDegrees * (Math.PI / 180.0);
    const cosH = Math.cos(headingRad);
    const sinH = Math.sin(headingRad);

    const METERS_PER_DEG_LAT = 111132.954;
    const METERS_PER_DEG_LNG = 111132.954 * Math.cos(squadLeaderPos.lat * (Math.PI / 180.0));

    return squadMembers.map((soldier, idx) => {
      const offset = SquadFormationSolver.getFormationOffsets(formationType, idx, intervalMeters);

      // Rotate local offsets by heading azimuth
      const worldNorthMeters = offset.longitudinalY * cosH - offset.lateralX * sinH;
      const worldEastMeters = offset.longitudinalY * sinH + offset.lateralX * cosH;

      const targetLat = squadLeaderPos.lat + (worldNorthMeters / METERS_PER_DEG_LAT);
      const targetLng = squadLeaderPos.lng + (worldEastMeters / METERS_PER_DEG_LNG);

      return {
        soldierId: soldier.id || `SLD-${idx + 1}`,
        role: idx === 0 ? 'POINT_LEAD' : (idx % 2 === 1 ? 'LEFT_FLANK' : 'RIGHT_FLANK'),
        assignedPosition: {
          lat: Number(targetLat.toFixed(7)),
          lng: Number(targetLng.toFixed(7))
        },
        offsetMeters: offset
      };
    });
  }
}
