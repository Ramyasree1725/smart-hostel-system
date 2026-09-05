/**
 * @file tacticalGraphicsPathEngine.js
 * @description Vector Geometric Path Synthesizer for Tactical Control Measures (Phase Lines, Minefields, Infiltration Routes).
 * Generates SVG spline curves, jagged teeth patterns, and arrowheads for tactical map layers.
 */

export class TacticalPathEngine {
  /**
   * Generates jagged 'teeth' pattern for Obstacle / Minefield boundary lines
   */
  static generateObstacleTeethSvg(points, toothHeightPx = 10, toothSpacingPx = 15) {
    if (!points || points.length < 2) return '';
    let pathStr = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const numTeeth = Math.floor(dist / toothSpacingPx);

      const nx = -dy / dist;
      const ny = dx / dist;

      for (let t = 0; t < numTeeth; t++) {
        const fraction1 = (t + 0.5) / numTeeth;
        const fraction2 = (t + 1.0) / numTeeth;

        const midX = p1.x + dx * fraction1 + nx * toothHeightPx;
        const midY = p1.y + dy * fraction1 + ny * toothHeightPx;

        const endX = p1.x + dx * fraction2;
        const endY = p1.y + dy * fraction2;

        pathStr += ` L ${midX} ${midY} L ${endX} ${endY}`;
      }
    }

    return pathStr;
  }

  /**
   * Generates Catmull-Rom Smooth Spline Path for Infiltration / Evacuation Routes
   */
  static generateSmoothSpline(points, tension = 0.5) {
    if (!points || points.length < 2) return '';
    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = i > 0 ? points[i - 1] : points[0];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = i < points.length - 2 ? points[i + 2] : p2;

      const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension;
      const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;
      const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension;
      const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return d;
  }
}

export const TACTICAL_PATH_PATTERNS = [];
(function populatePatterns() {
  for (let p = 1; p <= 150; p++) {
    TACTICAL_PATH_PATTERNS.push({
      patternKey: `PATTERN_PATH_PRESET_${p}`,
      strokeColor: (p % 2 === 0) ? '#3b82f6' : '#ef4444',
      strokeWidth: (p % 3 === 0) ? 3 : 2,
      dashArray: (p % 4 === 0) ? '6 4' : 'none',
      markerEnd: 'url(#arrowhead)'
    });
  }
})();
