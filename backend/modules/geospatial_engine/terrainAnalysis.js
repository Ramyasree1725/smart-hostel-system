/**
 * @file terrainAnalysis.js
 * @description Tactical Terrain Elevation, Line-of-Sight (LOS) Ray Marching, Fresnel Zone Clearance,
 * Viewshed Coverage Analysis, and Mobility Slope Index for Squad Navigational Routing.
 */

'use strict';

class DigitalElevationMatrix {
  constructor(gridWidth, gridHeight, originLat, originLng, resolutionMeters = 10.0) {
    this.width = gridWidth;
    this.height = gridHeight;
    this.originLat = originLat;
    this.originLng = originLng;
    this.resMeters = resolutionMeters;
    this.data = new Float32Array(gridWidth * gridHeight);
  }

  setElevation(gx, gy, elevationMeters) {
    if (gx >= 0 && gx < this.width && gy >= 0 && gy < this.height) {
      this.data[gy * this.width + gx] = elevationMeters;
    }
  }

  getElevation(gx, gy) {
    if (gx < 0 || gx >= this.width || gy < 0 || gy >= this.height) {
      return 0.0;
    }
    return this.data[gy * this.width + gx];
  }

  /**
   * Bilinear interpolation of elevation for arbitrary continuous coordinates
   */
  sampleBilinear(x, y) {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = Math.min(this.width - 1, x0 + 1);
    const y1 = Math.min(this.height - 1, y0 + 1);

    const fx = x - x0;
    const fy = y - y0;

    const e00 = this.getElevation(x0, y0);
    const e10 = this.getElevation(x1, y0);
    const e01 = this.getElevation(x0, y1);
    const e11 = this.getElevation(x1, y1);

    const top = e00 * (1 - fx) + e10 * fx;
    const bottom = e01 * (1 - fx) + e11 * fx;

    return top * (1 - fy) + bottom * fy;
  }

  /**
   * Computes terrain slope gradient in percentage and degrees using Sobel kernel
   */
  calculateSlope(gx, gy) {
    const dz_dx = (
      (this.getElevation(gx + 1, gy - 1) + 2 * this.getElevation(gx + 1, gy) + this.getElevation(gx + 1, gy + 1)) -
      (this.getElevation(gx - 1, gy - 1) + 2 * this.getElevation(gx - 1, gy) + this.getElevation(gx - 1, gy + 1))
    ) / (8.0 * this.resMeters);

    const dz_dy = (
      (this.getElevation(gx - 1, gy + 1) + 2 * this.getElevation(gx, gy + 1) + this.getElevation(gx + 1, gy + 1)) -
      (this.getElevation(gx - 1, gy - 1) + 2 * this.getElevation(gx, gy - 1) + this.getElevation(gx + 1, gy - 1))
    ) / (8.0 * this.resMeters);

    const gradient = Math.sqrt(dz_dx * dz_dx + dz_dy * dz_dy);
    const slopeDegrees = Math.atan(gradient) * (180.0 / Math.PI);
    const aspectDegrees = (Math.atan2(-dz_dy, dz_dx) * (180.0 / Math.PI) + 360.0) % 360.0;

    return {
      slopePercent: Number((gradient * 100).toFixed(1)),
      slopeDegrees: Number(slopeDegrees.toFixed(2)),
      aspectDegrees: Number(aspectDegrees.toFixed(1))
    };
  }
}

class TacticalLineOfSight {
  /**
   * 3D Ray-Marching Line of Sight with Earth Curvature and Atmospheric Refraction
   */
  static checkVisibility(dem, observer, target, observerHeight = 1.8, targetHeight = 1.8) {
    const dx = target.x - observer.x;
    const dy = target.y - observer.y;
    const distance2D = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.max(20, Math.ceil(distance2D * 2));

    const obsElev = dem.sampleBilinear(observer.x, observer.y) + observerHeight;
    const tgtElev = dem.sampleBilinear(target.x, target.y) + targetHeight;

    const EARTH_RADIUS_EFF = 6371000 * (4.0 / 3.0); // Effective radius with standard 4/3 refraction

    let isVisible = true;
    let maxObscuration = 0.0;
    let obstructionPoint = null;

    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const currX = observer.x + t * dx;
      const currY = observer.y + t * dy;

      const groundElev = dem.sampleBilinear(currX, currY);

      // Distance from observer in meters
      const distM = t * distance2D * dem.resMeters;
      const earthDrop = (distM * distM) / (2 * EARTH_RADIUS_EFF);

      // Ray height at this step
      const rayElev = obsElev + t * (tgtElev - obsElev);

      const clearance = (rayElev - earthDrop) - groundElev;
      if (clearance < 0) {
        isVisible = false;
        if (Math.abs(clearance) > maxObscuration) {
          maxObscuration = Math.abs(clearance);
          obstructionPoint = { x: currX, y: currY, elevation: groundElev, obscurationMeters: maxObscuration };
        }
      }
    }

    return {
      isVisible,
      maxObscurationMeters: Number(maxObscuration.toFixed(2)),
      obstructionPoint
    };
  }

  /**
   * First Fresnel Zone RF Clearance calculation for UHF/VHF Tactical Mesh Radios
   */
  static calculateFresnelZone(frequencyMhz, totalDistanceMeters, obstacleDistanceMeters) {
    const c = 3e8; // speed of light
    const wavelength = c / (frequencyMhz * 1e6);
    const d1 = obstacleDistanceMeters;
    const d2 = totalDistanceMeters - obstacleDistanceMeters;

    if (totalDistanceMeters <= 0 || d1 <= 0 || d2 <= 0) return 0.0;

    // Radius of 1st Fresnel zone: r = sqrt((lambda * d1 * d2) / (d1 + d2))
    const radius = Math.sqrt((wavelength * d1 * d2) / (d1 + d2));
    return Number(radius.toFixed(2));
  }
}

module.exports = {
  DigitalElevationMatrix,
  TacticalLineOfSight
};
