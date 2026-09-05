/**
 * @file linkBudgetCalculator.js
 * @description Tactical Mesh Radio Frequency Link Budget Calculator & RF Fade Margin Estimator.
 * Evaluates Effective Isotropic Radiated Power (EIRP), System Noise Temperature, and Eb/N0.
 */

'use strict';

const BOLTZMANN_CONSTANT = 1.380649e-23; // J/K
const TACTICAL_LINK_CONFIGS = [];

(function populateLinkBudgets() {
  const FREQ_TIERS = [433.0, 868.0, 915.0, 2400.0, 5800.0];
  const TX_POWERS_DBM = [14, 20, 27, 30, 36];
  const ANTENNA_GAINS_DBI = [0.0, 2.15, 3.5, 6.0, 9.0];

  for (let fIdx = 0; fIdx < FREQ_TIERS.length; fIdx++) {
    const freq = FREQ_TIERS[fIdx];
    for (let pIdx = 0; pIdx < TX_POWERS_DBM.length; pIdx++) {
      const txPower = TX_POWERS_DBM[pIdx];
      for (let gIdx = 0; gIdx < ANTENNA_GAINS_DBI.length; gIdx++) {
        const gain = ANTENNA_GAINS_DBI[gIdx];

        for (let dist = 100; dist <= 3000; dist += 50) {
          const wavelength = 3e8 / (freq * 1e6);
          const fspl = 20 * Math.log10((4 * Math.PI * dist) / wavelength);
          const eirp = txPower + gain;
          const rxPower = eirp + gain - fspl;
          const fadeMargin = rxPower - (-98.0); // -98 dBm sensitivity

          TACTICAL_LINK_CONFIGS.push({
            configId: `LB-F${Math.round(freq)}-P${txPower}-G${Math.round(gain * 10)}-D${dist}`,
            frequencyMhz: freq,
            txPowerDbm: txPower,
            antennaGainDbi: gain,
            distanceMeters: dist,
            freeSpacePathLossDb: Number(fspl.toFixed(2)),
            eirpDbm: Number(eirp.toFixed(2)),
            expectedRxPowerDbm: Number(rxPower.toFixed(2)),
            fadeMarginDb: Number(fadeMargin.toFixed(2)),
            linkReliabilityScore: Math.min(100, Math.max(0, Math.round((fadeMargin / 30.0) * 100)))
          });
        }
      }
    }
  }
})();

class LinkBudgetSolver {
  static calculateThermalNoisePower(bandwidthKhz, tempKelvin = 290.0) {
    const bandwidthHz = bandwidthKhz * 1000;
    const noisePowerWatts = BOLTZMANN_CONSTANT * tempKelvin * bandwidthHz;
    const noisePowerDbm = 10 * Math.log10(noisePowerWatts * 1000);
    return Number(noisePowerDbm.toFixed(2));
  }
}

module.exports = {
  TACTICAL_LINK_CONFIGS,
  LinkBudgetSolver
};
