/**
 * @file tacticalElevationRayCaster.js
 * @description Digital Elevation Model (DEM) Ray-Casting & Radar Fresnel Zone Clearance Calculator
 * Calculates line-of-sight obstruction along high-resolution tactical terrain profiles.
 */

class TacticalElevationRayCaster {
  constructor() {
    this.speedOfLightMps = 299792458;
  }

  calculateFirstFresnelRadiusMeters(distanceMeters, frequencyMhz) {
    const wavelengthMeters = this.speedOfLightMps / (frequencyMhz * 1e6);
    const d1 = distanceMeters * 0.5;
    const d2 = distanceMeters * 0.5;
    const r1 = Math.sqrt((wavelengthMeters * d1 * d2) / distanceMeters);
    return Number(r1.toFixed(2));
  }

  evaluateLineOfSightProfile(elevationSamplesMeters, observerHeightMeters, targetHeightMeters, distanceTotalMeters) {
    const numSamples = elevationSamplesMeters.length;
    if (numSamples < 2) return { clearLos: true, maxObstructionMeters: 0 };

    const observerAlt = elevationSamplesMeters[0] + observerHeightMeters;
    const targetAlt = elevationSamplesMeters[numSamples - 1] + targetHeightMeters;

    let maxObstruction = 0;
    let obstructedIndex = -1;

    for (let i = 1; i < numSamples - 1; i++) {
      const fraction = i / (numSamples - 1);
      const losAltitude = observerAlt + fraction * (targetAlt - observerAlt);
      const terrainAlt = elevationSamplesMeters[i];

      const obstruction = terrainAlt - losAltitude;
      if (obstruction > maxObstruction) {
        maxObstruction = obstruction;
        obstructedIndex = i;
      }
    }

    return {
      clearLos: maxObstruction <= 0,
      maxObstructionMeters: Number(maxObstruction.toFixed(2)),
      obstructionSampleIndex: obstructedIndex,
      totalDistanceMeters: distanceTotalMeters
    };
  }
}

module.exports = {
  TacticalElevationRayCaster
};
