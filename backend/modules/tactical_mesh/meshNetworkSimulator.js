/**
 * @file meshNetworkSimulator.js
 * @description Tactical Mesh Radio Propagation, Log-Distance Shadow Fading Simulator,
 * and Dynamic Topology Convergence Benchmarking for Dismounted Soldier Platoons.
 */

'use strict';

class RFPropagationModel {
  /**
   * Log-Distance Path Loss with Lognormal Shadowing:
   * PL(d) = PL(d0) + 10 * n * log10(d / d0) + X_sigma
   */
  static calculatePathLoss(distanceMeters, carrierFreqMhz = 915.0, pathLossExponent = 3.2, shadowStdDevDb = 4.0) {
    const d0 = 1.0; // 1 meter reference distance
    const wavelength = 3e8 / (carrierFreqMhz * 1e6);
    
    // Free space path loss at 1m: PL(d0) = 20*log10(4*pi*d0 / lambda)
    const pl0 = 20 * Math.log10((4 * Math.PI * d0) / wavelength);

    if (distanceMeters <= d0) return Number(pl0.toFixed(2));

    const pathLossDb = pl0 + 10 * pathLossExponent * Math.log10(distanceMeters / d0);
    // Gaussian random shadowing component (Box-Muller transform)
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1 || 0.0001)) * Math.cos(2.0 * Math.PI * u2);
    const shadowing = z0 * shadowStdDevDb;

    return Number((pathLossDb + shadowing).toFixed(2));
  }

  /**
   * Computes Received Signal Strength Indicator (RSSI) in dBm
   */
  static calculateRssi(txPowerDbm = 20.0, txGainDbi = 2.15, rxGainDbi = 2.15, pathLossDb = 90.0) {
    const rssi = txPowerDbm + txGainDbi + rxGainDbi - pathLossDb;
    return Number(rssi.toFixed(1));
  }
}

class MeshPlatoonSimulator {
  constructor(soldierCount = 12, operationalAreaKm = 2.0) {
    this.soldiers = [];
    this.areaSize = operationalAreaKm * 1000; // meters
    this.initializePlatoon(soldierCount);
  }

  initializePlatoon(count) {
    for (let i = 1; i <= count; i++) {
      this.soldiers.push({
        id: `SLD-${String(i).padStart(3, '0')}`,
        callsign: `EAGLE-${i}`,
        x: (Math.random() - 0.5) * this.areaSize,
        y: (Math.random() - 0.5) * this.areaSize,
        z: 0,
        txPowerDbm: 20,
        batteryPercent: 100,
        activeLinks: []
      });
    }
  }

  stepSimulation(mobilitySpeedMs = 1.5) {
    // Random walk with tactical cohesion
    for (const soldier of this.soldiers) {
      const angle = Math.random() * 2 * Math.PI;
      soldier.x += Math.cos(angle) * mobilitySpeedMs;
      soldier.y += Math.sin(angle) * mobilitySpeedMs;
      soldier.batteryPercent = Math.max(0, soldier.batteryPercent - 0.005);
    }

    // Recalculate link matrix
    const links = [];
    for (let i = 0; i < this.soldiers.length; i++) {
      for (let j = i + 1; j < this.soldiers.length; j++) {
        const s1 = this.soldiers[i];
        const s2 = this.soldiers[j];

        const dx = s2.x - s1.x;
        const dy = s2.y - s1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const pathLoss = RFPropagationModel.calculatePathLoss(dist);
        const rssi = RFPropagationModel.calculateRssi(s1.txPowerDbm, 2.15, 2.15, pathLoss);

        if (rssi > -95.0) { // Receiver sensitivity threshold
          links.push({
            nodeA: s1.id,
            nodeB: s2.id,
            distanceMeters: Math.round(dist),
            rssi,
            linkQualityPercent: Math.min(100, Math.max(0, Math.round((rssi + 95.0) * 2.5)))
          });
        }
      }
    }

    return {
      activeSoldierCount: this.soldiers.length,
      totalActiveLinks: links.length,
      networkLinks: links
    };
  }
}

module.exports = {
  RFPropagationModel,
  MeshPlatoonSimulator
};
