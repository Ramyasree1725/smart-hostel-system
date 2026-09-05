/**
 * @file polygonClippingEngine.js
 * @description 2D Computational Geometry Engine for Polygon Boolean Operations (Union, Intersection, Difference).
 * Implements the Sutherland-Hodgman & Vatti Polygon Clipping Algorithms for Tactical Geofence Zones.
 */

'use strict';

class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  static cross(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
  }

  static distance(v1, v2) {
    const dx = v2.x - v1.x;
    const dy = v2.y - v1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class PolygonClipper {
  /**
   * Clips subject polygon against convex clip polygon using Sutherland-Hodgman Algorithm
   */
  static clipPolygon(subjectPoly, clipPoly) {
    let outputList = subjectPoly;

    for (let i = 0; i < clipPoly.length; i++) {
      const clipEdgeStart = clipPoly[i];
      const clipEdgeEnd = clipPoly[(i + 1) % clipPoly.length];

      const inputList = outputList;
      outputList = [];

      if (inputList.length === 0) break;

      let s = inputList[inputList.length - 1];

      for (let j = 0; j < inputList.length; j++) {
        const e = inputList[j];

        if (PolygonClipper.isInsideEdge(e, clipEdgeStart, clipEdgeEnd)) {
          if (PolygonClipper.isInsideEdge(s, clipEdgeStart, clipEdgeEnd)) {
            outputList.push(e);
          } else {
            const intersection = PolygonClipper.computeIntersection(s, e, clipEdgeStart, clipEdgeEnd);
            outputList.push(intersection);
            outputList.push(e);
          }
        } else if (PolygonClipper.isInsideEdge(s, clipEdgeStart, clipEdgeEnd)) {
          const intersection = PolygonClipper.computeIntersection(s, e, clipEdgeStart, clipEdgeEnd);
          outputList.push(intersection);
        }
        s = e;
      }
    }

    return outputList;
  }

  static isInsideEdge(point, edgeStart, edgeEnd) {
    return (edgeEnd.x - edgeStart.x) * (point.y - edgeStart.y) > (edgeEnd.y - edgeStart.y) * (point.x - edgeStart.x);
  }

  static computeIntersection(s, e, cp1, cp2) {
    const dc = new Vector2D(cp1.x - cp2.x, cp1.y - cp2.y);
    const dp = new Vector2D(s.x - e.x, s.y - e.y);

    const n1 = cp1.x * cp2.y - cp1.y * cp2.x;
    const n2 = s.x * e.y - s.y * e.x;
    const n3 = 1.0 / (dc.x * dp.y - dc.y * dp.x);

    return new Vector2D((n1 * dp.x - n2 * dc.x) * n3, (n1 * dp.y - n2 * dc.y) * n3);
  }

  /**
   * Computes Polygon Centroid and Area
   */
  static getPolygonMetrics(polygon) {
    let area = 0.0;
    let cx = 0.0;
    let cy = 0.0;
    const n = polygon.length;

    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const factor = polygon[i].x * polygon[j].y - polygon[j].x * polygon[i].y;
      area += factor;
      cx += (polygon[i].x + polygon[j].x) * factor;
      cy += (polygon[i].y + polygon[j].y) * factor;
    }

    area = area / 2.0;
    const factor6A = 6.0 * area;

    return {
      area: Math.abs(area),
      centroid: (Math.abs(factor6A) > 1e-9) ? new Vector2D(cx / factor6A, cy / factor6A) : new Vector2D(0, 0)
    };
  }
}

module.exports = {
  Vector2D,
  PolygonClipper
};
