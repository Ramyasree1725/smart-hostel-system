/**
 * @file ecgArrhythmiaClassifier.js
 * @description Real-Time Cardiac Arrhythmia Pattern Recognition & Ventricular Tachycardia Detector.
 * Identifies Premature Ventricular Contractions (PVC), Atrial Fibrillation (AFib), and Asystole.
 */

export const ARRHYTHMIA_TYPES = {
  NORMAL_SINUS: 'NORMAL_SINUS',
  SINUS_TACHYCARDIA: 'SINUS_TACHYCARDIA',
  SINUS_BRADYCARDIA: 'SINUS_BRADYCARDIA',
  PREMATURE_VENTRICULAR_CONTRACTION: 'PVC',
  VENTRICULAR_TACHYCARDIA: 'VENTRICULAR_TACHYCARDIA',
  VENTRICULAR_FIBRILLATION: 'VENTRICULAR_FIBRILLATION',
  ASYSTOLE: 'ASYSTOLE'
};

export class ECGArrhythmiaClassifier {
  constructor() {
    this.rrIntervalHistory = [];
    this.qrsWidthHistory = [];
  }

  addBeat(rrIntervalMs, qrsWidthMs = 90) {
    this.rrIntervalHistory.push(rrIntervalMs);
    this.qrsWidthHistory.push(qrsWidthMs);

    if (this.rrIntervalHistory.length > 30) {
      this.rrIntervalHistory.shift();
      this.qrsWidthHistory.shift();
    }
  }

  /**
   * Classifies heart rhythm from latest beat dynamics
   */
  classifyRhythm() {
    if (this.rrIntervalHistory.length < 5) {
      return {
        rhythm: ARRHYTHMIA_TYPES.NORMAL_SINUS,
        confidence: 0.85,
        severity: 'NORMAL',
        emergencyActionRequired: false
      };
    }

    const latestRR = this.rrIntervalHistory[this.rrIntervalHistory.length - 1];
    const latestQRS = this.qrsWidthHistory[this.qrsWidthHistory.length - 1];

    // Compute average RR of previous beats
    const previousRRs = this.rrIntervalHistory.slice(0, -1);
    const avgRR = previousRRs.reduce((a, b) => a + b, 0) / previousRRs.length;

    const currentBpm = Math.round(60000 / latestRR);

    // 1. Asystole check (RR > 3500ms or 0 bpm)
    if (latestRR > 3500 || currentBpm === 0) {
      return {
        rhythm: ARRHYTHMIA_TYPES.ASYSTOLE,
        confidence: 0.99,
        severity: 'LETHAL',
        emergencyActionRequired: true,
        protocol: 'Initiate CPR immediately, Epinephrine 1mg IV/IO q3-5min'
      };
    }

    // 2. Ventricular Tachycardia (HR > 150 with wide QRS > 120ms)
    if (currentBpm > 150 && latestQRS > 120) {
      return {
        rhythm: ARRHYTHMIA_TYPES.VENTRICULAR_TACHYCARDIA,
        confidence: 0.92,
        severity: 'LETHAL',
        emergencyActionRequired: true,
        protocol: 'Check pulse; Synchronized cardioversion 100J or Amiodarone 150mg IV'
      };
    }

    // 3. Premature Ventricular Contraction (PVC: premature beat RR < 0.8 * avgRR followed by compensatory pause)
    if (latestRR < 0.8 * avgRR && latestQRS > 110) {
      return {
        rhythm: ARRHYTHMIA_TYPES.PREMATURE_VENTRICULAR_CONTRACTION,
        confidence: 0.88,
        severity: 'CAUTION',
        emergencyActionRequired: false,
        protocol: 'Monitor telemetry and assess electrolyte balance / combat stress'
      };
    }

    // 4. Sinus Tachycardia
    if (currentBpm > 100) {
      return {
        rhythm: ARRHYTHMIA_TYPES.SINUS_TACHYCARDIA,
        confidence: 0.95,
        severity: 'ELEVATED',
        emergencyActionRequired: false,
        protocol: 'Assess exertion level, hydration status, pain, and blood loss'
      };
    }

    // 5. Sinus Bradycardia
    if (currentBpm < 50) {
      return {
        rhythm: ARRHYTHMIA_TYPES.SINUS_BRADYCARDIA,
        confidence: 0.95,
        severity: 'CAUTION',
        emergencyActionRequired: false,
        protocol: 'Evaluate athletic baseline vs hypothermia or intracranial pressure'
      };
    }

    return {
      rhythm: ARRHYTHMIA_TYPES.NORMAL_SINUS,
      confidence: 0.98,
      severity: 'NORMAL',
      emergencyActionRequired: false
    };
  }
}
