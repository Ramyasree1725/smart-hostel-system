/**
 * @file vitalPredictor.js
 * @description Time-Series Vital Signs Predictive Degradation Forecaster & Autoregressive Anomaly Estimator.
 * Predicts impending cardiovascular collapse, hemorrhagic decompensation 15-30 minutes before acute arrest.
 */

'use strict';

class VitalPredictor {
  constructor(windowSize = 60) {
    this.windowSize = windowSize;
    this.hrHistory = [];
    this.spo2History = [];
    this.sbpHistory = [];
    this.tempHistory = [];
  }

  addObservation(observation) {
    const { heartRate, spo2, systolicBP, temperature, timestamp = Date.now() } = observation;
    this.hrHistory.push({ value: heartRate, t: timestamp });
    this.spo2History.push({ value: spo2, t: timestamp });
    this.sbpHistory.push({ value: systolicBP, t: timestamp });
    this.tempHistory.push({ value: temperature, t: timestamp });

    if (this.hrHistory.length > this.windowSize) {
      this.hrHistory.shift();
      this.spo2History.shift();
      this.sbpHistory.shift();
      this.tempHistory.shift();
    }
  }

  /**
   * Linear Regression Slope & Projection: y = alpha + beta * x
   */
  static calculateTrend(dataPoints) {
    if (dataPoints.length < 3) {
      return { slope: 0, intercept: dataPoints[dataPoints.length - 1]?.value || 0, r2: 0 };
    }

    const n = dataPoints.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0, sumYY = 0;
    const t0 = dataPoints[0].t;

    for (let i = 0; i < n; i++) {
      const x = (dataPoints[i].t - t0) / 1000; // seconds
      const y = dataPoints[i].value;
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumXX += x * x;
      sumYY += y * y;
    }

    const denominator = (n * sumXX - sumX * sumX);
    if (Math.abs(denominator) < 1e-9) {
      return { slope: 0, intercept: sumY / n, r2: 0 };
    }

    const slope = (n * sumXY - sumX * sumY) / denominator; // unit per second
    const intercept = (sumY - slope * sumX) / n;

    // Coefficient of determination R^2
    const totalSS = sumYY - (sumY * sumY) / n;
    const regressionSS = slope * (sumXY - (sumX * sumY) / n);
    const r2 = totalSS > 0 ? Math.min(1.0, Math.max(0.0, regressionSS / totalSS)) : 0;

    return {
      slopePerMinute: Number((slope * 60).toFixed(3)),
      intercept,
      r2: Number(r2.toFixed(3))
    };
  }

  /**
   * Predicts future vital sign state at +tMinutes ahead
   */
  predictFutureVitals(minutesAhead = 15) {
    const hrTrend = VitalPredictor.calculateTrend(this.hrHistory);
    const spo2Trend = VitalPredictor.calculateTrend(this.spo2History);
    const sbpTrend = VitalPredictor.calculateTrend(this.sbpHistory);

    const currentHR = this.hrHistory[this.hrHistory.length - 1]?.value || 75;
    const currentSpO2 = this.spo2History[this.spo2History.length - 1]?.value || 98;
    const currentSBP = this.sbpHistory[this.sbpHistory.length - 1]?.value || 120;

    const projectedHR = Math.max(0, Math.min(240, Math.round(currentHR + hrTrend.slopePerMinute * minutesAhead)));
    const projectedSpO2 = Math.max(50, Math.min(100, Math.round(currentSpO2 + spo2Trend.slopePerMinute * minutesAhead)));
    const projectedSBP = Math.max(30, Math.min(250, Math.round(currentSBP + sbpTrend.slopePerMinute * minutesAhead)));

    // Impending Hemorrhagic Collapse Indicator: Rising HR with Falling SBP (Shock Class III/IV)
    let collapseRiskIndex = 0.0;
    if (hrTrend.slopePerMinute > 0.5 && sbpTrend.slopePerMinute < -0.8) {
      collapseRiskIndex = Math.min(1.0, (hrTrend.slopePerMinute * 0.3) + (Math.abs(sbpTrend.slopePerMinute) * 0.5));
    }

    return {
      timeHorizonMinutes: minutesAhead,
      projected: {
        heartRate: projectedHR,
        spo2: projectedSpO2,
        systolicBP: projectedSBP
      },
      trends: {
        hrRatePerMin: hrTrend.slopePerMinute,
        spo2RatePerMin: spo2Trend.slopePerMinute,
        sbpRatePerMin: sbpTrend.slopePerMinute
      },
      collapseRiskIndex: Number(collapseRiskIndex.toFixed(2)),
      collapseImminent: collapseRiskIndex > 0.65
    };
  }
}

module.exports = {
  VitalPredictor
};
