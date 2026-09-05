/**
 * @file tacticalGeofenceEngine.js
 * @description Ray-Casting & Winding Number Point-in-Polygon (PIP) Geofencing Engine
 * Handles Tactical Keep-Out Zones, Weapon Engagement Zones (WEZ), and Casualty Extraction Rings.
 */

export class TacticalGeofenceEngine {
  constructor() {
    this.activeZones = [];
  }

  addZone(zoneId, zoneName, zoneType, polygonCoordinatesLatLon, alertLevel = "WARNING") {
    this.activeZones.push({
      zoneId: zoneId,
      zoneName: zoneName,
      zoneType: zoneType, // e.g. "RESTRICTED_FIRE_AREA", "MINEFIELD_WARNING", "SAFE_PASSAGE_CORRIDOR"
      polygon: polygonCoordinatesLatLon,
      alertLevel: alertLevel
    });
    return true;
  }

  isPointInPolygon(pointLat, pointLon, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].lat, yi = polygon[i].lon;
      const xj = polygon[j].lat, yj = polygon[j].lon;

      const intersect = ((yi > pointLon) !== (yj > pointLon)) &&
        (pointLat < ((xj - xi) * (pointLon - yi)) / (yj - yi) + xi);

      if (intersect) inside = !inside;
    }
    return inside;
  }

  evaluateSoldierPosition(soldierId, lat, lon) {
    const breaches = [];
    for (const zone of this.activeZones) {
      if (this.isPointInPolygon(lat, lon, zone.polygon)) {
        breaches.push({
          soldierId: soldierId,
          zoneId: zone.zoneId,
          zoneName: zone.zoneName,
          zoneType: zone.zoneType,
          alertLevel: zone.alertLevel,
          timestampEpoch: Date.now()
        });
      }
    }

    return {
      soldierId: soldierId,
      currentPosition: { lat: lat, lon: lon },
      inBreach: breaches.length > 0,
      activeBreaches: breaches
    };
  }
}

export default TacticalGeofenceEngine;
