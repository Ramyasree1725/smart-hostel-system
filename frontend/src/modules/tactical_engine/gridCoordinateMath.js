/**
 * @file gridCoordinateMath.js
 * @description Tactical Geodesy, Great-Circle Navigation, Dead Reckoning,
 * Cross-Track Error Calculation, and Azimuth Bearing Solvers for Infantry Squads.
 */

export class TacticalGeodesy {
  static EARTH_RADIUS_METERS = 6371008.8;

  static toRadians(degrees) {
    return degrees * (Math.PI / 180.0);
  }

  static toDegrees(radians) {
    return radians * (180.0 / Math.PI);
  }

  /**
   * Computes Forward Initial Bearing (Azimuth in degrees 0-360) from Point A to Point B
   */
  static calculateBearing(fromLat, fromLng, toLat, toLng) {
    const lat1 = TacticalGeodesy.toRadians(fromLat);
    const lat2 = TacticalGeodesy.toRadians(toLat);
    const dLng = TacticalGeodesy.toRadians(toLng - fromLng);

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    const initialBearing = TacticalGeodesy.toDegrees(Math.atan2(y, x));
    return (initialBearing + 360.0) % 360.0;
  }

  /**
   * Computes Great Circle Distance in meters between two coordinates (Haversine Formula)
   */
  static calculateDistance(fromLat, fromLng, toLat, toLng) {
    const lat1 = TacticalGeodesy.toRadians(fromLat);
    const lat2 = TacticalGeodesy.toRadians(toLat);
    const dLat = TacticalGeodesy.toRadians(toLat - fromLat);
    const dLng = TacticalGeodesy.toRadians(toLng - fromLng);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return TacticalGeodesy.EARTH_RADIUS_METERS * c;
  }

  /**
   * Dead Reckoning Projection: Computes destination coordinate given starting point, distance (m), and bearing (deg)
   */
  static projectDestination(fromLat, fromLng, distanceMeters, bearingDeg) {
    const delta = distanceMeters / TacticalGeodesy.EARTH_RADIUS_METERS;
    const theta = TacticalGeodesy.toRadians(bearingDeg);

    const lat1 = TacticalGeodesy.toRadians(fromLat);
    const lng1 = TacticalGeodesy.toRadians(fromLng);

    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(delta) + Math.cos(lat1) * Math.sin(delta) * Math.cos(theta));
    const lng2 = lng1 + Math.atan2(Math.sin(theta) * Math.sin(delta) * Math.cos(lat1), Math.cos(delta) - Math.sin(lat1) * Math.sin(lat2));

    return {
      lat: Number(TacticalGeodesy.toDegrees(lat2).toFixed(7)),
      lng: Number(TacticalGeodesy.toDegrees(lng2).toFixed(7))
    };
  }

  /**
   * Cross-Track Error (XTE): Distance in meters that a soldier has deviated off the planned navigation line between start and end waypoints
   */
  static calculateCrossTrackError(soldierLat, soldierLng, startWpLat, startWpLng, endWpLat, endWpLng) {
    const d13 = TacticalGeodesy.calculateDistance(startWpLat, startWpLng, soldierLat, soldierLng) / TacticalGeodesy.EARTH_RADIUS_METERS;
    const θ13 = TacticalGeodesy.toRadians(TacticalGeodesy.calculateBearing(startWpLat, startWpLng, soldierLat, soldierLng));
    const θ12 = TacticalGeodesy.toRadians(TacticalGeodesy.calculateBearing(startWpLat, startWpLng, endWpLat, endWpLng));

    const dxt = Math.asin(Math.sin(d13) * Math.sin(θ13 - θ12));
    return Number((dxt * TacticalGeodesy.EARTH_RADIUS_METERS).toFixed(1));
  }
}
