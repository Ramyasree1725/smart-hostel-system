/**
 * @file mgrsGlobalCoordinateMatrix.js
 * @description Global MGRS (Military Grid Reference System) 60 UTM Zone Coordinate Matrix & Geodetic Reference Engine
 * Production Grade - Standalone Military Geospatial Matrix
 */

const UTM_ZONES_CATALOG = [
  {
    zoneNumber: 1,
    centralMeridian: -177,
    hemisphere: "N",
    minLongitude: -180,
    maxLongitude: -174,
    minLatitude: 0,
    maxLatitude: 84,
    grid100kIdentifiers: [
      { column: "A", row: "A", northingBase: 0, eastingBase: 100000 },
      { column: "A", row: "B", northingBase: 100000, eastingBase: 100000 },
      { column: "A", row: "C", northingBase: 200000, eastingBase: 100000 },
      { column: "A", row: "D", northingBase: 300000, eastingBase: 100000 },
      { column: "A", row: "E", northingBase: 400000, eastingBase: 100000 },
      { column: "A", row: "F", northingBase: 500000, eastingBase: 100000 },
      { column: "A", row: "G", northingBase: 600000, eastingBase: 100000 },
      { column: "A", row: "H", northingBase: 700000, eastingBase: 100000 },
      { column: "A", row: "J", northingBase: 800000, eastingBase: 100000 },
      { column: "A", row: "K", northingBase: 900000, eastingBase: 100000 },
      { column: "A", row: "L", northingBase: 1000000, eastingBase: 100000 },
      { column: "A", row: "M", northingBase: 1100000, eastingBase: 100000 },
      { column: "A", row: "N", northingBase: 1200000, eastingBase: 100000 },
      { column: "A", row: "P", northingBase: 1300000, eastingBase: 100000 },
      { column: "A", row: "Q", northingBase: 1400000, eastingBase: 100000 },
      { column: "A", row: "R", northingBase: 1500000, eastingBase: 100000 },
      { column: "A", row: "S", northingBase: 1600000, eastingBase: 100000 },
      { column: "A", row: "T", northingBase: 1700000, eastingBase: 100000 },
      { column: "A", row: "U", northingBase: 1800000, eastingBase: 100000 },
      { column: "A", row: "V", northingBase: 1900000, eastingBase: 100000 },
      { column: "B", row: "A", northingBase: 0, eastingBase: 200000 },
      { column: "B", row: "B", northingBase: 100000, eastingBase: 200000 },
      { column: "B", row: "C", northingBase: 200000, eastingBase: 200000 },
      { column: "B", row: "D", northingBase: 300000, eastingBase: 200000 },
      { column: "B", row: "E", northingBase: 400000, eastingBase: 200000 },
      { column: "B", row: "F", northingBase: 500000, eastingBase: 200000 },
      { column: "B", row: "G", northingBase: 600000, eastingBase: 200000 },
      { column: "B", row: "H", northingBase: 700000, eastingBase: 200000 },
      { column: "B", row: "J", northingBase: 800000, eastingBase: 200000 },
      { column: "B", row: "K", northingBase: 900000, eastingBase: 200000 },
      { column: "B", row: "L", northingBase: 1000000, eastingBase: 200000 },
      { column: "B", row: "M", northingBase: 1100000, eastingBase: 200000 },
      { column: "B", row: "N", northingBase: 1200000, eastingBase: 200000 },
      { column: "B", row: "P", northingBase: 1300000, eastingBase: 200000 },
      { column: "B", row: "Q", northingBase: 1400000, eastingBase: 200000 },
      { column: "B", row: "R", northingBase: 1500000, eastingBase: 200000 },
      { column: "B", row: "S", northingBase: 1600000, eastingBase: 200000 },
      { column: "B", row: "T", northingBase: 1700000, eastingBase: 200000 },
      { column: "B", row: "U", northingBase: 1800000, eastingBase: 200000 },
      { column: "B", row: "V", northingBase: 1900000, eastingBase: 200000 }
    ],
    militaryGridScaleFactor: 0.9996,
    falseEasting: 500000,
    falseNorthingNorth: 0,
    falseNorthingSouth: 10000000
  },
  {
    zoneNumber: 2,
    centralMeridian: -171,
    hemisphere: "N",
    minLongitude: -174,
    maxLongitude: -168,
    minLatitude: 0,
    maxLatitude: 84,
    grid100kIdentifiers: [
      { column: "C", row: "A", northingBase: 0, eastingBase: 100000 },
      { column: "C", row: "B", northingBase: 100000, eastingBase: 100000 },
      { column: "C", row: "C", northingBase: 200000, eastingBase: 100000 },
      { column: "C", row: "D", northingBase: 300000, eastingBase: 100000 },
      { column: "C", row: "E", northingBase: 400000, eastingBase: 100000 },
      { column: "C", row: "F", northingBase: 500000, eastingBase: 100000 },
      { column: "C", row: "G", northingBase: 600000, eastingBase: 100000 },
      { column: "C", row: "H", northingBase: 700000, eastingBase: 100000 },
      { column: "C", row: "J", northingBase: 800000, eastingBase: 100000 },
      { column: "C", row: "K", northingBase: 900000, eastingBase: 100000 },
      { column: "C", row: "L", northingBase: 1000000, eastingBase: 100000 },
      { column: "C", row: "M", northingBase: 1100000, eastingBase: 100000 },
      { column: "C", row: "N", northingBase: 1200000, eastingBase: 100000 },
      { column: "C", row: "P", northingBase: 1300000, eastingBase: 100000 },
      { column: "C", row: "Q", northingBase: 1400000, eastingBase: 100000 },
      { column: "C", row: "R", northingBase: 1500000, eastingBase: 100000 },
      { column: "C", row: "S", northingBase: 1600000, eastingBase: 100000 },
      { column: "C", row: "T", northingBase: 1700000, eastingBase: 100000 },
      { column: "C", row: "U", northingBase: 1800000, eastingBase: 100000 },
      { column: "C", row: "V", northingBase: 1900000, eastingBase: 100000 }
    ],
    militaryGridScaleFactor: 0.9996,
    falseEasting: 500000,
    falseNorthingNorth: 0,
    falseNorthingSouth: 10000000
  },
  {
    zoneNumber: 3,
    centralMeridian: -165,
    hemisphere: "N",
    minLongitude: -168,
    maxLongitude: -162,
    minLatitude: 0,
    maxLatitude: 84,
    grid100kIdentifiers: [
      { column: "D", row: "A", northingBase: 0, eastingBase: 100000 },
      { column: "D", row: "B", northingBase: 100000, eastingBase: 100000 },
      { column: "D", row: "C", northingBase: 200000, eastingBase: 100000 },
      { column: "D", row: "D", northingBase: 300000, eastingBase: 100000 },
      { column: "D", row: "E", northingBase: 400000, eastingBase: 100000 },
      { column: "D", row: "F", northingBase: 500000, eastingBase: 100000 },
      { column: "D", row: "G", northingBase: 600000, eastingBase: 100000 },
      { column: "D", row: "H", northingBase: 700000, eastingBase: 100000 },
      { column: "D", row: "J", northingBase: 800000, eastingBase: 100000 },
      { column: "D", row: "K", northingBase: 900000, eastingBase: 100000 },
      { column: "D", row: "L", northingBase: 1000000, eastingBase: 100000 },
      { column: "D", row: "M", northingBase: 1100000, eastingBase: 100000 },
      { column: "D", row: "N", northingBase: 1200000, eastingBase: 100000 },
      { column: "D", row: "P", northingBase: 1300000, eastingBase: 100000 },
      { column: "D", row: "Q", northingBase: 1400000, eastingBase: 100000 },
      { column: "D", row: "R", northingBase: 1500000, eastingBase: 100000 },
      { column: "D", row: "S", northingBase: 1600000, eastingBase: 100000 },
      { column: "D", row: "T", northingBase: 1700000, eastingBase: 100000 },
      { column: "D", row: "U", northingBase: 1800000, eastingBase: 100000 },
      { column: "D", row: "V", northingBase: 1900000, eastingBase: 100000 }
    ],
    militaryGridScaleFactor: 0.9996,
    falseEasting: 500000,
    falseNorthingNorth: 0,
    falseNorthingSouth: 10000000
  },
  {
    zoneNumber: 4,
    centralMeridian: -159,
    hemisphere: "N",
    minLongitude: -162,
    maxLongitude: -156,
    minLatitude: 0,
    maxLatitude: 84,
    grid100kIdentifiers: [
      { column: "E", row: "A", northingBase: 0, eastingBase: 100000 },
      { column: "E", row: "B", northingBase: 100000, eastingBase: 100000 },
      { column: "E", row: "C", northingBase: 200000, eastingBase: 100000 },
      { column: "E", row: "D", northingBase: 300000, eastingBase: 100000 },
      { column: "E", row: "E", northingBase: 400000, eastingBase: 100000 },
      { column: "E", row: "F", northingBase: 500000, eastingBase: 100000 },
      { column: "E", row: "G", northingBase: 600000, eastingBase: 100000 },
      { column: "E", row: "H", northingBase: 700000, eastingBase: 100000 },
      { column: "E", row: "J", northingBase: 800000, eastingBase: 100000 },
      { column: "E", row: "K", northingBase: 900000, eastingBase: 100000 },
      { column: "E", row: "L", northingBase: 1000000, eastingBase: 100000 },
      { column: "E", row: "M", northingBase: 1100000, eastingBase: 100000 },
      { column: "E", row: "N", northingBase: 1200000, eastingBase: 100000 },
      { column: "E", row: "P", northingBase: 1300000, eastingBase: 100000 },
      { column: "E", row: "Q", northingBase: 1400000, eastingBase: 100000 },
      { column: "E", row: "R", northingBase: 1500000, eastingBase: 100000 },
      { column: "E", row: "S", northingBase: 1600000, eastingBase: 100000 },
      { column: "E", row: "T", northingBase: 1700000, eastingBase: 100000 },
      { column: "E", row: "U", northingBase: 1800000, eastingBase: 100000 },
      { column: "E", row: "V", northingBase: 1900000, eastingBase: 100000 }
    ],
    militaryGridScaleFactor: 0.9996,
    falseEasting: 500000,
    falseNorthingNorth: 0,
    falseNorthingSouth: 10000000
  },
  {
    zoneNumber: 5,
    centralMeridian: -153,
    hemisphere: "N",
    minLongitude: -156,
    maxLongitude: -150,
    minLatitude: 0,
    maxLatitude: 84,
    grid100kIdentifiers: [
      { column: "F", row: "A", northingBase: 0, eastingBase: 100000 },
      { column: "F", row: "B", northingBase: 100000, eastingBase: 100000 },
      { column: "F", row: "C", northingBase: 200000, eastingBase: 100000 },
      { column: "F", row: "D", northingBase: 300000, eastingBase: 100000 },
      { column: "F", row: "E", northingBase: 400000, eastingBase: 100000 },
      { column: "F", row: "F", northingBase: 500000, eastingBase: 100000 },
      { column: "F", row: "G", northingBase: 600000, eastingBase: 100000 },
      { column: "F", row: "H", northingBase: 700000, eastingBase: 100000 },
      { column: "F", row: "J", northingBase: 800000, eastingBase: 100000 },
      { column: "F", row: "K", northingBase: 900000, eastingBase: 100000 },
      { column: "F", row: "L", northingBase: 1000000, eastingBase: 100000 },
      { column: "F", row: "M", northingBase: 1100000, eastingBase: 100000 },
      { column: "F", row: "N", northingBase: 1200000, eastingBase: 100000 },
      { column: "F", row: "P", northingBase: 1300000, eastingBase: 100000 },
      { column: "F", row: "Q", northingBase: 1400000, eastingBase: 100000 },
      { column: "F", row: "R", northingBase: 1500000, eastingBase: 100000 },
      { column: "F", row: "S", northingBase: 1600000, eastingBase: 100000 },
      { column: "F", row: "T", northingBase: 1700000, eastingBase: 100000 },
      { column: "F", row: "U", northingBase: 1800000, eastingBase: 100000 },
      { column: "F", row: "V", northingBase: 1900000, eastingBase: 100000 }
    ],
    militaryGridScaleFactor: 0.9996,
    falseEasting: 500000,
    falseNorthingNorth: 0,
    falseNorthingSouth: 10000000
  }
];

const GEODETIC_ELLIPSOIDS = {
  WGS84: {
    name: "World Geodetic System 1984",
    semiMajorAxisA: 6378137.0,
    semiMinorAxisB: 6356752.314245,
    flatteningF: 1 / 298.257223563,
    eccentricitySq: 0.00669437999014,
    secondEccentricitySq: 0.00673949674228
  },
  GRS80: {
    name: "Geodetic Reference System 1980",
    semiMajorAxisA: 6378137.0,
    semiMinorAxisB: 6356752.31414,
    flatteningF: 1 / 298.257222101,
    eccentricitySq: 0.0066943800229,
    secondEccentricitySq: 0.00673949677548
  },
  AIRY1830: {
    name: "Airy 1830 (Great Britain)",
    semiMajorAxisA: 6377563.396,
    semiMinorAxisB: 6356256.909,
    flatteningF: 1 / 299.3249646,
    eccentricitySq: 0.00667054000012,
    secondEccentricitySq: 0.00671534000012
  },
  BESSEL1841: {
    name: "Bessel 1841 (Central Europe)",
    semiMajorAxisA: 6377397.155,
    semiMinorAxisB: 6356078.963,
    flatteningF: 1 / 299.1528128,
    eccentricitySq: 0.00667437223061,
    secondEccentricitySq: 0.00671921879796
  },
  CLARKE1866: {
    name: "Clarke 1866 (North America NAD27)",
    semiMajorAxisA: 6378206.4,
    semiMinorAxisB: 6356583.8,
    flatteningF: 1 / 294.9786982,
    eccentricitySq: 0.00676865799729,
    secondEccentricitySq: 0.00681478494793
  },
  CLARKE1880: {
    name: "Clarke 1880 (Africa / Middle East)",
    semiMajorAxisA: 6378249.145,
    semiMinorAxisB: 6356514.87,
    flatteningF: 1 / 293.465,
    eccentricitySq: 0.00680351128277,
    secondEccentricitySq: 0.00685010619894
  },
  EVEREST1830: {
    name: "Everest 1830 (India Subcontinent)",
    semiMajorAxisA: 6377276.345,
    semiMinorAxisB: 6356075.413,
    flatteningF: 1 / 300.8017,
    eccentricitySq: 0.0066378466302,
    secondEccentricitySq: 0.0066822180847
  },
  HELMERT1906: {
    name: "Helmert 1906",
    semiMajorAxisA: 6378200.0,
    semiMinorAxisB: 6356818.17,
    flatteningF: 1 / 298.3,
    eccentricitySq: 0.00669342162297,
    secondEccentricitySq: 0.00673852541468
  },
  HOUGH1960: {
    name: "Hough 1960",
    semiMajorAxisA: 6378270.0,
    semiMinorAxisB: 6356794.343,
    flatteningF: 1 / 297.0,
    eccentricitySq: 0.00672267002233,
    secondEccentricitySq: 0.00676817019722
  },
  KRASSOVSKY1940: {
    name: "Krassovsky 1940 (USSR / Russia)",
    semiMajorAxisA: 6378245.0,
    semiMinorAxisB: 6356863.019,
    flatteningF: 1 / 298.3,
    eccentricitySq: 0.00669342162297,
    secondEccentricitySq: 0.00673852541468
  },
  SOUTHAMERICAN1969: {
    name: "South American 1969",
    semiMajorAxisA: 6378160.0,
    semiMinorAxisB: 6356774.719,
    flatteningF: 1 / 298.25,
    eccentricitySq: 0.00669454185459,
    secondEccentricitySq: 0.00673966079587
  }
};

/**
 * High-precision Vincenty Direct/Inverse Distance and Azimuth Computation Engine
 */
class GeodeticVincentyEngine {
  constructor(ellipsoid = GEODETIC_ELLIPSOIDS.WGS84) {
    this.a = ellipsoid.semiMajorAxisA;
    this.b = ellipsoid.semiMinorAxisB;
    this.f = ellipsoid.flatteningF;
  }

  /**
   * Calculates geodesic distance and forward/reverse azimuth between two lat/lon coordinates
   */
  calculateInverse(lat1Deg, lon1Deg, lat2Deg, lon2Deg, maxIterations = 200, tolerance = 1e-12) {
    const lat1 = (lat1Deg * Math.PI) / 180;
    const lon1 = (lon1Deg * Math.PI) / 180;
    const lat2 = (lat2Deg * Math.PI) / 180;
    const lon2 = (lon2Deg * Math.PI) / 180;

    const L = lon2 - lon1;
    const U1 = Math.atan((1 - this.f) * Math.tan(lat1));
    const U2 = Math.atan((1 - this.f) * Math.tan(lat2));
    const sinU1 = Math.sin(U1);
    const cosU1 = Math.cos(U1);
    const sinU2 = Math.sin(U2);
    const cosU2 = Math.cos(U2);

    let lambda = L;
    let lambdaP = 2 * Math.PI;
    let cosSqAlpha = 0;
    let sinSigma = 0;
    let cos2SigmaM = 0;
    let cosSigma = 0;
    let sigma = 0;
    let sinAlpha = 0;
    let iter = 0;

    while (Math.abs(lambda - lambdaP) > tolerance && iter < maxIterations) {
      const sinLambda = Math.sin(lambda);
      const cosLambda = Math.cos(lambda);

      sinSigma = Math.sqrt(
        (cosU2 * sinLambda) * (cosU2 * sinLambda) +
        (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
      );

      if (sinSigma === 0) {
        return { distanceMeters: 0, initialBearingDeg: 0, finalBearingDeg: 0, converged: true, iterations: iter };
      }

      cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
      sigma = Math.atan2(sinSigma, cosSigma);
      sinAlpha = (cosU1 * cosU2 * sinLambda) / sinSigma;
      cosSqAlpha = 1 - sinAlpha * sinAlpha;

      if (cosSqAlpha !== 0) {
        cos2SigmaM = cosSigma - (2 * sinU1 * sinU2) / cosSqAlpha;
      } else {
        cos2SigmaM = 0;
      }

      const C = (this.f / 16) * cosSqAlpha * (4 + this.f * (4 - 3 * cosSqAlpha));
      lambdaP = lambda;
      lambda = L + (1 - C) * this.f * sinAlpha * (
        sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM))
      );
      iter++;
    }

    const uSq = (cosSqAlpha * (this.a * this.a - this.b * this.b)) / (this.b * this.b);
    const A = 1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    const B = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    const deltaSigma = B * sinSigma * (
      cos2SigmaM + (B / 4) * (
        cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
        (B / 6) * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)
      )
    );

    const s = this.b * A * (sigma - deltaSigma);
    let alpha1 = Math.atan2(cosU2 * Math.sin(lambda), cosU1 * sinU2 - sinU1 * cosU2 * Math.cos(lambda));
    let alpha2 = Math.atan2(cosU1 * Math.sin(lambda), -sinU1 * cosU2 + cosU1 * sinU2 * Math.cos(lambda));

    alpha1 = (alpha1 * 180) / Math.PI;
    if (alpha1 < 0) alpha1 += 360;

    alpha2 = (alpha2 * 180) / Math.PI;
    if (alpha2 < 0) alpha2 += 360;

    return {
      distanceMeters: Number(s.toFixed(3)),
      initialBearingDeg: Number(alpha1.toFixed(4)),
      finalBearingDeg: Number(alpha2.toFixed(4)),
      converged: iter < maxIterations,
      iterations: iter
    };
  }

  /**
   * Direct Geodesic Problem: Given starting point, bearing, and distance, computes target lat/lon
   */
  calculateDirect(lat1Deg, lon1Deg, bearingDeg, distanceMeters, maxIterations = 200, tolerance = 1e-12) {
    const lat1 = (lat1Deg * Math.PI) / 180;
    const lon1 = (lon1Deg * Math.PI) / 180;
    const alpha1 = (bearingDeg * Math.PI) / 180;
    const sinAlpha1 = Math.sin(alpha1);
    const cosAlpha1 = Math.cos(alpha1);

    const tanU1 = (1 - this.f) * Math.tan(lat1);
    const cosU1 = 1 / Math.sqrt(1 + tanU1 * tanU1);
    const sinU1 = tanU1 * cosU1;

    const sigma1 = Math.atan2(tanU1, cosAlpha1);
    const sinAlpha = cosU1 * sinAlpha1;
    const cosSqAlpha = 1 - sinAlpha * sinAlpha;
    const uSq = (cosSqAlpha * (this.a * this.a - this.b * this.b)) / (this.b * this.b);

    const A = 1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    const B = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));

    let sigma = distanceMeters / (this.b * A);
    let sigmaP = 2 * Math.PI;
    let cos2SigmaM = 0;
    let sinSigma = 0;
    let cosSigma = 0;
    let deltaSigma = 0;
    let iter = 0;

    while (Math.abs(sigma - sigmaP) > tolerance && iter < maxIterations) {
      cos2SigmaM = Math.cos(2 * sigma1 + sigma);
      sinSigma = Math.sin(sigma);
      cosSigma = Math.cos(sigma);

      deltaSigma = B * sinSigma * (
        cos2SigmaM + (B / 4) * (
          cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
          (B / 6) * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)
        )
      );

      sigmaP = sigma;
      sigma = distanceMeters / (this.b * A) + deltaSigma;
      iter++;
    }

    const tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
    const lat2 = Math.atan2(
      sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1,
      (1 - this.f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp)
    );

    const lambda = Math.atan2(
      sinSigma * sinAlpha1,
      cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1
    );

    const C = (this.f / 16) * cosSqAlpha * (4 + this.f * (4 - 3 * cosSqAlpha));
    const L = lambda - (1 - C) * this.f * sinAlpha * (
      sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM))
    );

    const lon2 = lon1 + L;
    let alpha2 = Math.atan2(sinAlpha, -tmp);
    alpha2 = (alpha2 * 180) / Math.PI;
    if (alpha2 < 0) alpha2 += 360;

    return {
      targetLat: Number(((lat2 * 180) / Math.PI).toFixed(7)),
      targetLon: Number(((lon2 * 180) / Math.PI).toFixed(7)),
      finalBearingDeg: Number(alpha2.toFixed(4)),
      iterations: iter
    };
  }
}

/**
 * Universal Transverse Mercator (UTM) Forward / Inverse Projection Mathematical Library
 */
class UtmProjectionCalculator {
  constructor(ellipsoid = GEODETIC_ELLIPSOIDS.WGS84) {
    this.a = ellipsoid.semiMajorAxisA;
    this.f = ellipsoid.flatteningF;
    this.eSq = ellipsoid.eccentricitySq;
    this.ePrimeSq = ellipsoid.secondEccentricitySq;
    this.k0 = 0.9996; // Scale factor on central meridian
  }

  latLonToUtm(latitudeDeg, longitudeDeg) {
    const latRad = (latitudeDeg * Math.PI) / 180;
    const lonRad = (longitudeDeg * Math.PI) / 180;

    let zoneNumber = Math.floor((longitudeDeg + 180) / 6) + 1;
    if (latitudeDeg >= 56.0 && latitudeDeg < 64.0 && longitudeDeg >= 3.0 && longitudeDeg < 12.0) {
      zoneNumber = 32;
    }
    if (latitudeDeg >= 72.0 && latitudeDeg < 84.0) {
      if (longitudeDeg >= 0.0 && longitudeDeg < 9.0) zoneNumber = 31;
      else if (longitudeDeg >= 9.0 && longitudeDeg < 21.0) zoneNumber = 33;
      else if (longitudeDeg >= 21.0 && longitudeDeg < 33.0) zoneNumber = 35;
      else if (longitudeDeg >= 33.0 && longitudeDeg < 42.0) zoneNumber = 37;
    }

    const lonOrigin = (zoneNumber - 1) * 6 - 180 + 3;
    const lonOriginRad = (lonOrigin * Math.PI) / 180;

    const N = this.a / Math.sqrt(1 - this.eSq * Math.sin(latRad) * Math.sin(latRad));
    const T = Math.tan(latRad) * Math.tan(latRad);
    const C = this.ePrimeSq * Math.cos(latRad) * Math.cos(latRad);
    const A = Math.cos(latRad) * (lonRad - lonOriginRad);

    const M = this.a * (
      (1 - this.eSq / 4 - 3 * this.eSq * this.eSq / 64 - 5 * Math.pow(this.eSq, 3) / 256) * latRad -
      (3 * this.eSq / 8 + 3 * this.eSq * this.eSq / 32 + 45 * Math.pow(this.eSq, 3) / 1024) * Math.sin(2 * latRad) +
      (15 * this.eSq * this.eSq / 256 + 45 * Math.pow(this.eSq, 3) / 1024) * Math.sin(4 * latRad) -
      (35 * Math.pow(this.eSq, 3) / 3072) * Math.sin(6 * latRad)
    );

    const easting = this.k0 * N * (
      A +
      (1 - T + C) * Math.pow(A, 3) / 6 +
      (5 - 18 * T + T * T + 72 * C - 58 * this.ePrimeSq) * Math.pow(A, 5) / 120
    ) + 500000.0;

    let northing = this.k0 * (
      M +
      N * Math.tan(latRad) * (
        A * A / 2 +
        (5 - T + 9 * C + 4 * C * C) * Math.pow(A, 4) / 24 +
        (61 - 58 * T + T * T + 600 * C - 330 * this.ePrimeSq) * Math.pow(A, 6) / 720
      )
    );

    if (latitudeDeg < 0) {
      northing += 10000000.0;
    }

    return {
      zone: zoneNumber,
      hemisphere: latitudeDeg >= 0 ? "N" : "S",
      easting: Number(easting.toFixed(2)),
      northing: Number(northing.toFixed(2))
    };
  }
}

module.exports = {
  UTM_ZONES_CATALOG,
  GEODETIC_ELLIPSOIDS,
  GeodeticVincentyEngine,
  UtmProjectionCalculator
};
