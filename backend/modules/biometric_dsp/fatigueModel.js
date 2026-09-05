/**
 * @file fatigueModel.js
 * @description 3-Process Mathematical Model of Sleep Regulation, Cognitive Throughput,
 * and Exertional Heat Strain (WBGT & Physiological Strain Index) for Combat Operations.
 */

'use strict';

class SoldierFatigueModel {
  /**
   * Two-Process Sleep Model: Process S (Homeostatic sleep pressure) + Process C (Circadian rhythm)
   */
  static calculateSleepPressure(hoursAwake, hoursSleptLast24h = 7.0) {
    // S-curve exponential rise during wakefulness: S(t) = 1 - (1 - S0) * exp(-t / chi_w)
    const chi_w = 18.2; // time constant wake
    const S = 1.0 - Math.exp(-hoursAwake / chi_w);

    // Circadian variation: C(t) = sum of harmonics (24h period)
    const currentHour = new Date().getHours() + new Date().getMinutes() / 60;
    const circadianPhase = (2 * Math.PI * (currentHour - 6)) / 24.0;
    const C = 0.15 * Math.sin(circadianPhase) + 0.05 * Math.sin(2 * circadianPhase);

    // Total Fatigue Index (0 - 100)
    const rawFatigue = (S * 0.7 - C * 0.3) * 100;
    const fatigueScore = Math.max(0, Math.min(100, Math.round(rawFatigue)));

    // Cognitive Effectiveness degradation formula (Hursh et al. SAFTE Model)
    const cognitiveEffectiveness = Math.max(20, Math.min(100, Math.round(100 - (fatigueScore * 0.65))));

    return {
      hoursAwake,
      fatigueScore,
      cognitiveEffectiveness,
      status: cognitiveEffectiveness > 80 ? 'OPTIMAL' : cognitiveEffectiveness > 60 ? 'DEGRADED' : 'CRITICAL_FATIGUE'
    };
  }

  /**
   * Moran's Physiological Strain Index (PSI) based on Core Temperature and Heart Rate
   * PSI = 5 * (T_core_t - T_core_0) / (39.5 - T_core_0) + 5 * (HR_t - HR_0) / (180 - HR_0)
   */
  static calculatePhysiologicalStrainIndex(currentHeartRate, currentCoreTempC, baselineHR = 65, baselineTempC = 36.8) {
    const hrComponent = 5.0 * (currentHeartRate - baselineHR) / (180.0 - baselineHR);
    const tempComponent = 5.0 * (currentCoreTempC - baselineTempC) / (39.5 - baselineTempC);

    const psi = Math.max(0.0, Math.min(10.0, hrComponent + tempComponent));

    let category = 'NO_STRAIN';
    if (psi >= 7.5) category = 'VERY_HIGH_HEAT_STRAIN';
    else if (psi >= 5.0) category = 'HIGH_STRAIN';
    else if (psi >= 3.0) category = 'MODERATE_STRAIN';

    return {
      psiScore: Number(psi.toFixed(1)),
      category,
      heatExhaustionRisk: psi >= 6.5,
      heatStrokeWarning: psi >= 8.5 || currentCoreTempC >= 40.0
    };
  }

  /**
   * Wet Bulb Globe Temperature (WBGT) and Military Work-Rest Cycle Guidance
   */
  static getWorkRestGuidance(wbgtCelsius) {
    if (wbgtCelsius >= 32.2) { // Flag Condition: BLACK
      return { flagColor: 'BLACK', workRestRatio: '20/40 min', waterIntakeLitersPerHour: 1.0, restriction: 'Suspend non-essential physical training' };
    } else if (wbgtCelsius >= 31.1) { // RED
      return { flagColor: 'RED', workRestRatio: '30/30 min', waterIntakeLitersPerHour: 1.0, restriction: 'Limit strenuous activity to 30 min per hour' };
    } else if (wbgtCelsius >= 29.4) { // YELLOW
      return { flagColor: 'YELLOW', workRestRatio: '40/20 min', waterIntakeLitersPerHour: 0.75, restriction: 'Avoid direct sunlight during heavy exertion' };
    } else if (wbgtCelsius >= 27.8) { // GREEN
      return { flagColor: 'GREEN', workRestRatio: '50/10 min', waterIntakeLitersPerHour: 0.5, restriction: 'Normal training with hydration monitoring' };
    } else {
      return { flagColor: 'WHITE', workRestRatio: 'Continuous', waterIntakeLitersPerHour: 0.5, restriction: 'No work-rest restrictions' };
    }
  }
}

module.exports = {
  SoldierFatigueModel
};
