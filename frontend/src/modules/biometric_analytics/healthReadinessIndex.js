/**
 * @file healthReadinessIndex.js
 * @description Soldier Combat Physical & Cognitive Readiness Index (CRI) Calculator.
 * Synthesizes Acute-to-Chronic Workload Ratio (ACWR), HRV Parasympathetic Tone,
 * Core Body Temperature Reserve, and Hydration Balance.
 */

export class CombatReadinessCalculator {
  /**
   * Computes comprehensive 0-100 Combat Readiness Index (CRI)
   */
  static calculateCRI(vitals, sleepStats = { hoursLastNight: 7.5, sleepDebtHours: 1.0 }, workload = { acuteLoad: 420, chronicLoad: 390 }) {
    const { heartRate = 72, spo2 = 98, temperature = 36.6, hrvRmssd = 45 } = vitals;

    // 1. Cardiovascular Vitality Score (0 - 30 pts)
    let cardioScore = 30;
    if (heartRate > 100) cardioScore -= Math.min(20, (heartRate - 100) * 0.5);
    if (spo2 < 95) cardioScore -= Math.min(15, (95 - spo2) * 3);
    cardioScore = Math.max(0, cardioScore);

    // 2. Autonomic Nervous System & Recovery Score (0 - 25 pts)
    // Higher RMSSD corresponds to greater parasympathetic reserve
    let hrvScore = 25;
    if (hrvRmssd < 20) hrvScore = 8;
    else if (hrvRmssd < 35) hrvScore = 16;
    else if (hrvRmssd > 60) hrvScore = 25;
    else hrvScore = 20;

    // 3. Thermal Equilibrium & Homeostasis Score (0 - 25 pts)
    let thermalScore = 25;
    const tempDiff = Math.abs(temperature - 36.8);
    if (tempDiff > 0.5) {
      thermalScore -= Math.min(25, (tempDiff - 0.5) * 20);
    }
    thermalScore = Math.max(0, thermalScore);

    // 4. Workload & Sleep Recovery Ratio (0 - 20 pts)
    // ACWR (Acute:Chronic Workload Ratio): Ideal sweet spot 0.8 - 1.3
    const acwr = workload.chronicLoad > 0 ? (workload.acuteLoad / workload.chronicLoad) : 1.0;
    let workloadScore = 20;
    if (acwr > 1.5) workloadScore -= 10; // Injury danger zone
    if (sleepStats.hoursLastNight < 5.0) workloadScore -= 8;
    workloadScore = Math.max(0, workloadScore);

    const totalCRI = Math.round(cardioScore + hrvScore + thermalScore + workloadScore);

    let classification = 'COMBAT_READY';
    let readinessColor = '#22c55e'; // green
    if (totalCRI < 50) {
      classification = 'UNFIT_CRITICAL';
      readinessColor = '#ef4444'; // red
    } else if (totalCRI < 75) {
      classification = 'DEGRADED_CAUTION';
      readinessColor = '#eab308'; // yellow
    }

    return {
      criScore: totalCRI,
      classification,
      readinessColor,
      subScores: {
        cardioScore: Math.round(cardioScore),
        hrvScore: Math.round(hrvScore),
        thermalScore: Math.round(thermalScore),
        workloadScore: Math.round(workloadScore)
      },
      acwr: Number(acwr.toFixed(2))
    };
  }
}
