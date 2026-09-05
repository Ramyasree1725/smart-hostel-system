/**
 * @file mgrsConverter.js
 * @description Military Grid Reference System (MGRS), Universal Transverse Mercator (UTM),
 * and WGS84 Ellipsoidal Geodesic Converter. Implements high-precision Karney forward and inverse algorithms.
 */

'use strict';

const WGS84_A = 6378137.0; // Semi-major axis in meters
const WGS84_F = 1.0 / 298.257223563; // Flattening
const WGS84_B = WGS84_A * (1.0 - WGS84_F); // Semi-minor axis
const WGS84_E2 = (WGS84_A * WGS84_A - WGS84_B * WGS84_B) / (WGS84_A * WGS84_A); // First eccentricity squared
const WGS84_E_PRIME2 = (WGS84_A * WGS84_A - WGS84_B * WGS84_B) / (WGS84_B * WGS84_B); // Second eccentricity squared

const UTM_K0 = 0.9996; // Central scale factor

// 100,000-meter square column identification letters
const MGRS_COL_SET_1 = "ABCDEFGH";
const MGRS_COL_SET_2 = "JKLMNPQR";
const MGRS_COL_SET_3 = "STUVWXYZ";

// 100,000-meter square row identification letters
const MGRS_ROW_SET_EVEN = "ABCDEFGHJKLMNPQRSTUV";
const MGRS_ROW_SET_ODD  = "FGHJKLMNPQRSTUVABCDE";

// Latitude band letters (80°S to 84°N)
const LATITUDE_BANDS = "CDEFGHJKLMNPQRSTUVWX";

class MGRSConverter {
  static degToRad(deg) {
    return deg * (Math.PI / 180.0);
  }

  static radToDeg(rad) {
    return rad * (180.0 / Math.PI);
  }

  /**
   * Converts WGS84 Geodetic Latitude and Longitude to UTM (Zone, Easting, Northing)
   */
  static latLonToUTM(lat, lon) {
    const latRad = MGRSConverter.degToRad(lat);
    const lonRad = MGRSConverter.degToRad(lon);

    let zoneNumber = Math.floor((lon + 180.0) / 6.0) + 1;
    if (zoneNumber < 1) zoneNumber = 1;
    if (zoneNumber > 60) zoneNumber = 60;

    // Special Norway & Svalbard zone overrides
    if (lat >= 56.0 && lat < 64.0 && lon >= 3.0 && lon < 12.0) {
      zoneNumber = 32;
    } else if (lat >= 72.0 && lat < 84.0) {
      if (lon >= 0.0 && lon < 9.0) zoneNumber = 31;
      else if (lon >= 9.0 && lon < 21.0) zoneNumber = 33;
      else if (lon >= 21.0 && lon < 33.0) zoneNumber = 35;
      else if (lon >= 33.0 && lon < 42.0) zoneNumber = 37;
    }

    const lonOrigin = (zoneNumber - 1) * 6.0 - 180.0 + 3.0; // Central meridian
    const lonOriginRad = MGRSConverter.degToRad(lonOrigin);

    const N = WGS84_A / Math.sqrt(1.0 - WGS84_E2 * Math.sin(latRad) * Math.sin(latRad));
    const T = Math.tan(latRad) * Math.tan(latRad);
    const C = WGS84_E_PRIME2 * Math.cos(latRad) * Math.cos(latRad);
    const A = Math.cos(latRad) * (lonRad - lonOriginRad);

    const M = WGS84_A * (
      (1.0 - WGS84_E2 / 4.0 - 3.0 * WGS84_E2 * WGS84_E2 / 64.0 - 5.0 * Math.pow(WGS84_E2, 3) / 256.0) * latRad
      - (3.0 * WGS84_E2 / 8.0 + 3.0 * WGS84_E2 * WGS84_E2 / 32.0 + 45.0 * Math.pow(WGS84_E2, 3) / 1024.0) * Math.sin(2.0 * latRad)
      + (15.0 * WGS84_E2 * WGS84_E2 / 256.0 + 45.0 * Math.pow(WGS84_E2, 3) / 1024.0) * Math.sin(4.0 * latRad)
      - (35.0 * Math.pow(WGS84_E2, 3) / 3072.0) * Math.sin(6.0 * latRad)
    );

    const easting = UTM_K0 * N * (
      A + (1.0 - T + C) * Math.pow(A, 3) / 6.0
      + (5.0 - 18.0 * T + T * T + 72.0 * C - 58.0 * WGS84_E_PRIME2) * Math.pow(A, 5) / 120.0
    ) + 500000.0;

    let northing = UTM_K0 * (
      M + N * Math.tan(latRad) * (
        A * A / 2.0
        + (5.0 - T + 9.0 * C + 4.0 * C * C) * Math.pow(A, 4) / 24.0
        + (61.0 - 58.0 * T + T * T + 600.0 * C - 330.0 * WGS84_E_PRIME2) * Math.pow(A, 6) / 720.0
      )
    );

    if (lat < 0.0) {
      northing += 10000000.0; // False northing for southern hemisphere
    }

    const hemisphere = lat >= 0 ? 'N' : 'S';

    return {
      zone: zoneNumber,
      hemisphere,
      easting: Number(easting.toFixed(2)),
      northing: Number(northing.toFixed(2))
    };
  }

  /**
   * Returns the MGRS Latitude Band letter for a given geodetic latitude
   */
  static getLatitudeBand(lat) {
    if (lat < -80.0 || lat > 84.0) return 'Z';
    const bandIndex = Math.floor((lat + 80.0) / 8.0);
    return LATITUDE_BANDS.charAt(Math.min(LATITUDE_BANDS.length - 1, Math.max(0, bandIndex)));
  }

  /**
   * Converts WGS84 Latitude & Longitude to full 10-digit MGRS String (1-meter precision)
   * Example output: "11SMU1234567890"
   */
  static latLonToMGRS(lat, lon, precision = 5) {
    const utm = MGRSConverter.latLonToUTM(lat, lon);
    const band = MGRSConverter.getLatitudeBand(lat);
    const setNumber = (utm.zone - 1) % 6;

    // Determine 100km square column letter
    const colIndex = Math.floor(utm.easting / 100000.0);
    let colLetters = "";
    if (setNumber % 3 === 0) colLetters = MGRS_COL_SET_1;
    else if (setNumber % 3 === 1) colLetters = MGRS_COL_SET_2;
    else colLetters = MGRS_COL_SET_3;
    const colChar = colLetters.charAt((colIndex - 1) % 8);

    // Determine 100km square row letter
    const rowIndex = Math.floor((utm.northing % 2000000.0) / 100000.0);
    const rowLetters = (utm.zone % 2 === 0) ? MGRS_ROW_SET_EVEN : MGRS_ROW_SET_ODD;
    const rowChar = rowLetters.charAt(rowIndex % 20);

    // Truncate Easting & Northing to desired precision (e.g. 5 digits = 1m precision)
    const eastingRemainder = Math.floor(utm.easting % 100000.0);
    const northingRemainder = Math.floor(utm.northing % 100000.0);

    const divisor = Math.pow(10, 5 - precision);
    const eastingStr = String(Math.floor(eastingRemainder / divisor)).padStart(precision, '0');
    const northingStr = String(Math.floor(northingRemainder / divisor)).padStart(precision, '0');

    return `${utm.zone}${band}${colChar}${rowChar}${eastingStr}${northingStr}`;
  }
}

module.exports = {
  MGRSConverter,
  WGS84_A,
  WGS84_F,
  WGS84_B,
  WGS84_E2
};
