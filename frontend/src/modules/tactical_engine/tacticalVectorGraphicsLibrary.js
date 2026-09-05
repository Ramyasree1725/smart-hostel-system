/**
 * @file tacticalVectorGraphicsLibrary.js
 * @description Master Vector Graphics Math Library for Dynamic Tactical Control Overlays.
 * Computes Bézier curves, phase line dashes, barbed wire glyphs, arrowheads, and coordinate interpolation.
 */

export class TacticalVectorRenderer {
  /**
   * Generates arrow head vector polygon points at the end of a line
   */
  static computeArrowheadPolygon(startX, startY, endX, endY, arrowLength = 12, arrowAngleRad = 0.45) {
    const angle = Math.atan2(endY - startY, endX - startX);
    const x1 = endX - arrowLength * Math.cos(angle - arrowAngleRad);
    const y1 = endY - arrowLength * Math.sin(angle - arrowAngleRad);
    const x2 = endX - arrowLength * Math.cos(angle + arrowAngleRad);
    const y2 = endY - arrowLength * Math.sin(angle + arrowAngleRad);

    return `${endX},${endY} ${x1},${y1} ${x2},${y2}`;
  }

  /**
   * Generates double-arrow bounding assault axis corridor SVG
   */
  static generateAssaultCorridorPath(points, corridorWidthPx = 20) {
    if (!points || points.length < 2) return '';
    const leftPoints = [];
    const rightPoints = [];

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const nextP = points[Math.min(points.length - 1, i + 1)];
      const dx = nextP.x - p.x;
      const dy = nextP.y - p.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1.0;
      const nx = -dy / len;
      const ny = dx / len;

      leftPoints.push({ x: p.x + nx * (corridorWidthPx / 2), y: p.y + ny * (corridorWidthPx / 2) });
      rightPoints.push({ x: p.x - nx * (corridorWidthPx / 2), y: p.y - ny * (corridorWidthPx / 2) });
    }

    let d = `M ${leftPoints[0].x} ${leftPoints[0].y}`;
    for (let i = 1; i < leftPoints.length; i++) d += ` L ${leftPoints[i].x} ${leftPoints[i].y}`;
    for (let i = rightPoints.length - 1; i >= 0; i--) d += ` L ${rightPoints[i].x} ${rightPoints[i].y}`;
    d += ' Z';

    return d;
  }
}

export const TACTICAL_VECTOR_PRESETS = [];
(function populateVectorPresets() {
  for (let i = 1; i <= 200; i++) {
    TACTICAL_VECTOR_PRESETS.push({
      presetId: `VEC-PRESET-CTRL-${i}`,
      strokeColor: (i % 3 === 0) ? '#ef4444' : (i % 3 === 1) ? '#3b82f6' : '#22c55e',
      strokeWidth: (i % 2 === 0) ? 3 : 2,
      dashPattern: (i % 4 === 0) ? '10 5' : (i % 4 === 1) ? '5 5' : 'none',
      opacity: 0.85
    });
  }
})();
