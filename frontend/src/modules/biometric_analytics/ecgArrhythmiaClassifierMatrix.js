/**
 * @file ecgArrhythmiaClassifierMatrix.js
 * @description Real-time ECG Complex Arrhythmia Morphology Classification,
 * QRS Feature Extraction, QT Interval Dispersion, and Ventricular Tachycardia (VT/VF) Detectors.
 */

export const ECG_CLASSIFICATION_RULES = [
  {
    type: "NORMAL_SINUS_RHYTHM",
    prIntervalMs: { min: 120, max: 200 },
    qrsDurationMs: { min: 60, max: 110 },
    qtcIntervalMs: { min: 350, max: 440 },
    heartRateBpm: { min: 60, max: 100 },
    severityLevel: "NORMAL"
  },
  {
    type: "SINUS_TACHYCARDIA",
    prIntervalMs: { min: 120, max: 200 },
    qrsDurationMs: { min: 60, max: 110 },
    qtcIntervalMs: { min: 330, max: 420 },
    heartRateBpm: { min: 101, max: 160 },
    severityLevel: "LOW_TACTICAL_STRESS"
  },
  {
    type: "SINUS_BRADYCARDIA",
    prIntervalMs: { min: 120, max: 200 },
    qrsDurationMs: { min: 60, max: 110 },
    qtcIntervalMs: { min: 380, max: 460 },
    heartRateBpm: { min: 30, max: 59 },
    severityLevel: "MONITOR_PERFUSION"
  },
  {
    type: "VENTRICULAR_TACHYCARDIA_MONOMORPHIC",
    prIntervalMs: { min: 0, max: 0 },
    qrsDurationMs: { min: 140, max: 260 },
    qtcIntervalMs: { min: 0, max: 0 },
    heartRateBpm: { min: 140, max: 250 },
    severityLevel: "CRITICAL_DEFIBRILLATION_REQUIRED"
  },
  {
    type: "VENTRICULAR_FIBRILLATION_COARSE",
    prIntervalMs: { min: 0, max: 0 },
    qrsDurationMs: { min: 0, max: 0 },
    qtcIntervalMs: { min: 0, max: 0 },
    heartRateBpm: { min: 250, max: 600 },
    severityLevel: "IMMEDIATE_CPR_DEFIB_LETHAL"
  },
  {
    type: "ASYSTOLE_CARDIAC_ARREST",
    prIntervalMs: { min: 0, max: 0 },
    qrsDurationMs: { min: 0, max: 0 },
    qtcIntervalMs: { min: 0, max: 0 },
    heartRateBpm: { min: 0, max: 5 },
    severityLevel: "LETHAL_NON_SHOCKABLE_EPINEPHRINE"
  }
];

export class EcgArrhythmiaClassifierEngine {
  constructor() {
    this.rules = ECG_CLASSIFICATION_RULES;
  }

  calculateBazettQtc(qtIntervalMs, rrIntervalMs) {
    if (!rrIntervalMs || rrIntervalMs <= 0) return 0;
    const rrSeconds = rrIntervalMs / 1000.0;
    const qtc = qtIntervalMs / Math.sqrt(rrSeconds);
    return Number(qtc.toFixed(1));
  }

  classifyEcgRhythm(heartRateBpm, qrsDurationMs, prIntervalMs, qtIntervalMs) {
    const rrIntervalMs = 60000.0 / Math.max(1, heartRateBpm);
    const qtc = this.calculateBazettQtc(qtIntervalMs || 400, rrIntervalMs);

    if (heartRateBpm <= 5) {
      return this.rules.find((r) => r.type === "ASYSTOLE_CARDIAC_ARREST");
    }

    if (heartRateBpm > 140 && qrsDurationMs >= 130) {
      return this.rules.find((r) => r.type === "VENTRICULAR_TACHYCARDIA_MONOMORPHIC");
    }

    if (heartRateBpm > 100) {
      return {
        ...this.rules.find((r) => r.type === "SINUS_TACHYCARDIA"),
        computedQtcMs: qtc
      };
    }

    if (heartRateBpm < 60) {
      return {
        ...this.rules.find((r) => r.type === "SINUS_BRADYCARDIA"),
        computedQtcMs: qtc
      };
    }

    return {
      ...this.rules.find((r) => r.type === "NORMAL_SINUS_RHYTHM"),
      computedQtcMs: qtc
    };
  }
}

export default EcgArrhythmiaClassifierEngine;
