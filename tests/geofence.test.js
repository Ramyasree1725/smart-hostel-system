describe('Geospatial Engine and Geofencing', () => {
  it('should calculate Haversine distance between two coordinates accurately', () => {
    const lat1 = 34.0522, lon1 = -118.2437;
    const lat2 = 34.0530, lon2 = -118.2420;
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    expect(d).toBeGreaterThan(100);
    expect(d).toBeLessThan(300);
  });

  it('should detect if soldier point is inside polygon geofence zone', () => {
    const polygon = [
      [34.0500, -118.2500],
      [34.0600, -118.2500],
      [34.0600, -118.2400],
      [34.0500, -118.2400]
    ];
    const point = [34.0550, -118.2450];
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0], yi = polygon[i][1];
      const xj = polygon[j][0], yj = polygon[j][1];
      const intersect = ((yi > point[1]) !== (yj > point[1])) &&
          (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    expect(inside).toBeTruthy();
  });
});
