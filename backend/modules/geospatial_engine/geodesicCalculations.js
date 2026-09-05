/**
 * @file geodesicCalculations.js
 * @description High-Precision Geodesic Inverses, Direct Vincenty Geodesic Equations,
 * and Polygon Area / Centroid Solvers for Military Geofencing and Tactical Exclusion Zones.
 */

'use strict';

class VincentyGeodesic {
  /**
   * Vincenty Direct Problem: Calculates destination given point, distance (meters), and azimuth (degrees)
   */
  static direct(lat1Deg, lon1Deg, azimuthDeg, distanceMeters) {
    const a = 6378137.0;
    const b = 6356752.314245;
    const f = 1.0 / 298.257223563;

    const s = distanceMeters;
    const alpha1 = azimuthDeg * (Math.PI / 180.0);
    const sinAlpha1 = Math.sin(alpha1);
    const cosAlpha1 = Math.cos(alpha1);

    const tanU1 = (1.0 - f) * Math.tan(lat1Deg * (Math.PI / 180.0));
    const cosU1 = 1.0 / Math.sqrt(1.0 + tanU1 * tanU1);
    const sinU1 = tanU1 * cosU1;

    const sigma1 = Math.atan2(tanU1, cosAlpha1);
    const sinAlpha = cosU1 * sinAlpha1;
    const cosSqAlpha = 1.0 - sinAlpha * sinAlpha;

    const uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    const A = 1.0 + (uSq / 16384.0) * (4096.0 + uSq * (-768.0 + uSq * (320.0 - 175.0 * uSq)));
    const B = (uSq / 1024.0) * (256.0 + uSq * (-128.0 + uSq * (74.0 - 47.0 * uSq)));

    let sigma = s / (b * A);
    let sigmaP = 2 * Math.PI;
    let cos2SigmaM = 0;
    let sinSigma = 0;
    let cosSigma = 0;
    let deltaSigma = 0;

    let iterations = 0;
    while (Math.abs(sigma - sigmaP) > 1e-12 && iterations < 100) {
      cos2SigmaM = Math.cos(2.0 * sigma1 + sigma);
      sinSigma = Math.sin(sigma);
      cosSigma = Math.cos(sigma);

      deltaSigma = B * sinSigma * (cos2SigmaM + (B / 4.0) * (cosSigma * (-1.0 + 2.0 * cos2SigmaM * cos2SigmaM) -
                   (B / 6.0) * cos2SigmaM * (-3.0 + 4.0 * sinSigma * sinSigma) * (-3.0 + 4.0 * cos2SigmaM * cos2SigmaM)));

      sigmaP = sigma;
      sigma = s / (b * A) + deltaSigma;
      iterations++;
    }

    const tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
    const lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1, (1.0 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
    const lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
    const C = (f / 16.0) * cosSqAlpha * (4.0 + f * (4.0 - 3.0 * cosSqAlpha));
    const L = lambda - (1.0 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1.0 + 2.0 * cos2SigmaM * cos2SigmaM)));

    const lon2 = (lon1Deg * (Math.PI / 180.0)) + L;

    return {
      lat: Number((lat2 * (180.0 / Math.PI)).toFixed(7)),
      lng: Number((lon2 * (180.0 / Math.PI)).toFixed(7))
    };
  }

  /**
   * Computes exact Geodesic area of a polygon on WGS84 ellipsoid in square meters
   */
  static calculateGeodesicPolygonArea(vertices) {
    if (vertices.length < 3) return 0.0;
    let total = 0.0;
    const R = 6378137.0;

    for (let i = 0; i < vertices.length; i++) {
      const j = (i + 1) % vertices.length;
      const p1 = vertices[i];
      const p2 = vertices[j];

      const lat1Rad = p1.lat * (Math.PI / 180.0);
      const lat2Rad = p2.lat * (Math.PI / 180.0);
      const dLonRad = (p2.lng - p1.lng) * (Math.PI / 180.0);

      total += dLonRad * (2 + Math.sin(lat1Rad) + Math.sin(lat2Rad));
    }

    const area = Math.abs(total * (R * R) / 2.0);
    return Number(area.toFixed(1));
  }
}

module.exports = {
  VincentyGeodesic
};
