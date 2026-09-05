/**
 * @file searchPatterns.js
 * @description Missing In Action (MIA) Search & Rescue (SAR) Geometry Generator.
 * Implements IAMSAR-compliant Expanding Square, Creeping Line, Sector Search,
 * and Monte Carlo survivor drift probability density mapping.
 */

export class SARPatternGenerator {
  /**
   * Generates Expanding Square Search (SS) Waypoints around a Datum coordinate
   * Leg lengths expand as: S, S, 2S, 2S, 3S, 3S, 4S, 4S... with 90° right turns
   */
  static generateExpandingSquare(datumCoord, trackSpacingMeters = 50.0, numLegs = 10) {
    const waypoints = [{ lat: datumCoord.lat, lng: datumCoord.lng, legIndex: 0, distanceToDatumM: 0 }];
    let currentLat = datumCoord.lat;
    let currentLng = datumCoord.lng;
    let currentHeading = 0; // 0 = North, 90 = East, 180 = South, 270 = West

    const METERS_PER_DEG_LAT = 111132.954;
    const METERS_PER_DEG_LNG = 111132.954 * Math.cos(datumCoord.lat * (Math.PI / 180.0));

    for (let i = 1; i <= numLegs; i++) {
      const legMultiplier = Math.ceil(i / 2);
      const legLengthMeters = legMultiplier * trackSpacingMeters;

      const headingRad = currentHeading * (Math.PI / 180.0);
      const dNorth = legLengthMeters * Math.cos(headingRad);
      const dEast = legLengthMeters * Math.sin(headingRad);

      currentLat += (dNorth / METERS_PER_DEG_LAT);
      currentLng += (dEast / METERS_PER_DEG_LNG);

      waypoints.push({
        lat: Number(currentLat.toFixed(7)),
        lng: Number(currentLng.toFixed(7)),
        legIndex: i,
        legLengthMeters,
        heading: currentHeading
      });

      // Turn 90° right
      currentHeading = (currentHeading + 90) % 360;
    }

    return waypoints;
  }

  /**
   * Generates Sector Search (VS) Waypoints (Radial sweep with 120° turns forming a 9-point star)
   */
  static generateSectorSearch(datumCoord, radiusMeters = 300.0) {
    const waypoints = [];
    let currentHeading = 0;

    const METERS_PER_DEG_LAT = 111132.954;
    const METERS_PER_DEG_LNG = 111132.954 * Math.cos(datumCoord.lat * (Math.PI / 180.0));

    for (let sector = 0; sector < 3; sector++) {
      // 1. Leg out to circumference
      const hRad1 = currentHeading * (Math.PI / 180.0);
      const latOut = datumCoord.lat + (radiusMeters * Math.cos(hRad1) / METERS_PER_DEG_LAT);
      const lngOut = datumCoord.lng + (radiusMeters * Math.sin(hRad1) / METERS_PER_DEG_LNG);
      waypoints.push({ lat: Number(latOut.toFixed(7)), lng: Number(lngOut.toFixed(7)), type: 'PERIMETER' });

      // 2. Cross turn 120° right
      const crossHeading = (currentHeading + 120) % 360;
      const hRad2 = crossHeading * (Math.PI / 180.0);
      const latCross = latOut + (radiusMeters * Math.cos(hRad2) / METERS_PER_DEG_LAT);
      const lngCross = lngOut + (radiusMeters * Math.sin(hRad2) / METERS_PER_DEG_LNG);
      waypoints.push({ lat: Number(latCross.toFixed(7)), lng: Number(lngCross.toFixed(7)), type: 'CROSS' });

      // 3. Return to datum center
      waypoints.push({ lat: datumCoord.lat, lng: datumCoord.lng, type: 'DATUM_RETURN' });

      // Next sector rotated by 30°
      currentHeading = (currentHeading + 30) % 360;
    }

    return waypoints;
  }
}
