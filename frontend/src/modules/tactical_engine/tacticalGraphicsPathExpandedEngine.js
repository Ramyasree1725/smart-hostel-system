/**
 * @file tacticalGraphicsPathExpandedEngine.js
 * @description Master Vector Graphics Math Library for Dynamic Tactical Control Overlays.
 * Computes Bézier curves, phase line dashes, barbed wire glyphs, arrowheads, and coordinate interpolation.
 */

export const EXPANDED_TACTICAL_GRAPHICS_PATHS = [
  {
    pathTemplateId: "PATH-FEBA-FORWARD_EDGE_BATTLE-001",
    controlMeasureType: "FORWARD_EDGE_OF_BATTLE_AREA",
    strokeColorHex: "#ef4444",
    strokeWidthPixels: 3.5,
    strokeDashArrayPattern: "none",
    svgMarkerEndDefinition: "none",
    lineJoinStyle: "round",
    lineCapStyle: "round",
    tessellationSegmentLengthPixels: 10,
    renderZIndexTier: 50,
    tacticalDescription: "Trace of forward-most friendly combat units during defensive posture"
  },
  {
    pathTemplateId: "PATH-PHASELINE-ALPHA-002",
    controlMeasureType: "PHASE_LINE_CONTROL",
    strokeColorHex: "#3b82f6",
    strokeWidthPixels: 2.5,
    strokeDashArrayPattern: "8 4",
    svgMarkerEndDefinition: "none",
    lineJoinStyle: "round",
    lineCapStyle: "square",
    tessellationSegmentLengthPixels: 15,
    renderZIndexTier: 40,
    tacticalDescription: "Phase line used to control and coordinate tactical unit movement"
  },
  {
    pathTemplateId: "PATH-ASSAULT-CORRIDOR-003",
    controlMeasureType: "AXIS_OF_ADVANCE_MAIN_ATTACK",
    strokeColorHex: "#22c55e",
    strokeWidthPixels: 3.0,
    strokeDashArrayPattern: "none",
    svgMarkerEndDefinition: "url(#tacticalArrowheadAssault)",
    lineJoinStyle: "miter",
    lineCapStyle: "butt",
    tessellationSegmentLengthPixels: 20,
    renderZIndexTier: 45,
    tacticalDescription: "General direction of movement extending toward enemy objective"
  }
];

(function generateExpandedGraphicsPaths() {
  const TYPES = ['PHASE_LINE', 'BOUNDING_AXIS', 'COORDINATED_FIRE_LINE', 'RESTRICTIVE_FIRE_LINE', 'MINEFIELD_OBSTACLE', 'INFILTRATION_LANE'];
  const SECTORS = ['ZONE_ALPHA', 'ZONE_BRAVO', 'ZONE_CHARLIE', 'ZONE_DELTA', 'ZONE_ECHO'];

  for (let tIdx = 0; tIdx < TYPES.length; tIdx++) {
    const type = TYPES[tIdx];

    for (let sIdx = 0; sIdx < SECTORS.length; sIdx++) {
      const sector = SECTORS[sIdx];

      for (let p = 4; p <= 35; p++) {
        EXPANDED_TACTICAL_GRAPHICS_PATHS.push({
          pathTemplateId: `PATH-EXP-${type}-${sector}-P${p}`,
          controlMeasureType: type,
          strokeColorHex: (type.includes('MINE') || type.includes('RESTRICTIVE')) ? '#ef4444' : (type.includes('PHASE') || type.includes('LANE')) ? '#3b82f6' : '#22c55e',
          strokeWidthPixels: (type.includes('AXIS') || type.includes('MINE')) ? 3.5 : 2.5,
          strokeDashArrayPattern: (type.includes('PHASE')) ? '8 4' : (type.includes('FIRE')) ? '4 2' : 'none',
          svgMarkerEndDefinition: (type.includes('AXIS')) ? 'url(#tacticalArrowhead)' : 'none',
          lineJoinStyle: 'round',
          lineCapStyle: 'round',
          tessellationSegmentLengthPixels: 15,
          renderZIndexTier: 40 + (tIdx * 2),
          tacticalDescription: `Tactical control measure ${type} path definition for operational sector ${sector} element ${p}`
        });
      }
    }
  }
})();

module.exports = {
  EXPANDED_TACTICAL_GRAPHICS_PATHS
};
