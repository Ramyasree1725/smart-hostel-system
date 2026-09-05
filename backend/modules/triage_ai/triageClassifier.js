/**
 * @file triageClassifier.js
 * @description Tactical Combat Casualty Care (TCCC) & MARCH-PAWS Algorithmic Triage Classifier.
 * Evaluates hemorrhagic shock, tension pneumothorax, traumatic brain injury (TBI), and hypothermia.
 */

'use strict';

const TRIAGE_CATEGORIES = {
  IMMEDIATE: { code: 'RED', priority: 1, maxEvacTimeMin: 60, desc: 'Immediate / Critical (Life-threatening)' },
  DELAYED: { code: 'YELLOW', priority: 2, maxEvacTimeMin: 240, desc: 'Delayed / Urgent (Serious non-life-threatening)' },
  MINIMAL: { code: 'GREEN', priority: 3, maxEvacTimeMin: 1440, desc: 'Minimal / Minor (Walking wounded)' },
  EXPECTANT: { code: 'BLACK', priority: 4, maxEvacTimeMin: Infinity, desc: 'Expectant / Deceased (Mortal injuries)' }
};

const MARCH_STEPS = {
  M: 'Massive Hemorrhage (Arterial bleed, limb amputation)',
  A: 'Airway (Airway obstruction, stridor, burns)',
  R: 'Respiration (Tension pneumothorax, flail chest, sucking chest wound)',
  C: 'Circulation (Hemorrhagic shock, radial pulse check, capillary refill)',
  H: 'Hypothermia / Head Injury (Core temp < 35°C, altered mental status)'
};

class TCCCClassifier {
  /**
   * Calculates Shock Index: SI = Heart Rate (bpm) / Systolic Blood Pressure (mmHg)
   * SI < 0.7: Normal
   * SI 0.7 - 0.9: Mild Shock
   * SI 0.9 - 1.3: Moderate Shock (Transfusion likely required)
   * SI > 1.3: Severe Decompensated Shock (Imminent cardiac arrest)
   */
  static calculateShockIndex(heartRate, systolicBP) {
    if (!systolicBP || systolicBP <= 0) return 2.5; // Severe shock default
    const si = heartRate / systolicBP;
    let severity = 'NORMAL';
    if (si >= 1.3) severity = 'SEVERE_DECOMPENSATED';
    else if (si >= 0.9) severity = 'MODERATE';
    else if (si >= 0.7) severity = 'MILD';

    return {
      shockIndex: Number(si.toFixed(2)),
      severity
    };
  }

  /**
   * Evaluates soldier vital signs and sensory inputs against TCCC guidelines
   */
  static classifyCasualty(vitals, injuryReports = []) {
    const { heartRate, spo2, temperature, systolicBP, respirationRate, conscious = true, ambulating = false } = vitals;
    const reasons = [];
    let assignedCategory = TRIAGE_CATEGORIES.GREEN;

    // 1. Walking Wounded Check
    if (ambulating && conscious && spo2 >= 94 && heartRate < 110 && temperature >= 35.5) {
      return {
        category: TRIAGE_CATEGORIES.GREEN,
        reasons: ['Soldier is fully ambulating with stable hemodynamics'],
        marchPriority: 'ROUTINE',
        recommendedInterventions: ['Self-aid / Buddy-aid reassessment']
      };
    }

    // 2. Expectant (Mortal / No signs of life)
    if (!conscious && heartRate === 0 && respirationRate === 0) {
      return {
        category: TRIAGE_CATEGORIES.BLACK,
        reasons: ['No detectable pulse or respirations'],
        marchPriority: 'EXPECTANT',
        recommendedInterventions: ['Palliative care if resources allow']
      };
    }

    // 3. Immediate (RED) Criteria:
    // A. Massive Hemorrhage / Decompensated Shock
    const siResult = TCCCClassifier.calculateShockIndex(heartRate, systolicBP);
    if (siResult.severity === 'SEVERE_DECOMPENSATED' || systolicBP < 80) {
      reasons.push(`Severe Decompensated Shock (SI: ${siResult.shockIndex}, SBP: ${systolicBP} mmHg)`);
      assignedCategory = TRIAGE_CATEGORIES.IMMEDIATE;
    }

    // B. Critical Hypoxia / Severe Respiratory Distress
    if (spo2 < 85 || respirationRate > 35 || respirationRate < 8) {
      reasons.push(`Critical Respiratory Compromise (SpO2: ${spo2}%, RR: ${respirationRate}/min)`);
      assignedCategory = TRIAGE_CATEGORIES.IMMEDIATE;
    }

    // C. Severe Hypothermia or Extreme Hyperthermia / Heat Stroke
    if (temperature < 34.0) {
      reasons.push(`Lethal Triad Risk: Severe Hypothermia (Core Temp: ${temperature}°C)`);
      assignedCategory = TRIAGE_CATEGORIES.IMMEDIATE;
    } else if (temperature >= 40.5) {
      reasons.push(`Exertional Heat Stroke / Hyperthermia (Core Temp: ${temperature}°C)`);
      assignedCategory = TRIAGE_CATEGORIES.IMMEDIATE;
    }

    // D. Loss of Consciousness
    if (!conscious) {
      reasons.push('Unresponsive / Traumatic Brain Injury (AVPU: U)');
      assignedCategory = TRIAGE_CATEGORIES.IMMEDIATE;
    }

    // 4. Delayed (YELLOW) Criteria:
    if (assignedCategory !== TRIAGE_CATEGORIES.IMMEDIATE) {
      if (siResult.severity === 'MODERATE' || (spo2 >= 85 && spo2 < 92) || (respirationRate >= 24 && respirationRate <= 35) || (temperature >= 38.5 && temperature < 40.5)) {
        reasons.push(`Moderate physiologic distress (SpO2: ${spo2}%, HR: ${heartRate} bpm)`);
        assignedCategory = TRIAGE_CATEGORIES.DELAYED;
      }
    }

    // Interventions mapping
    const interventions = [];
    if (assignedCategory === TRIAGE_CATEGORIES.IMMEDIATE) {
      if (systolicBP < 80) interventions.push('Apply junctional/extremity tourniquet, TXA 2g IV/IO, Whole Blood transfusion');
      if (spo2 < 88) interventions.push('Needle chest decompression (14G 3.25in at 2nd ICS MCL or 5th ICS AAL), high-flow O2');
      if (temperature < 35.0) interventions.push('Active warming: Hypothermia Prevention and Management Kit (HPMK)');
    } else if (assignedCategory === TRIAGE_CATEGORIES.DELAYED) {
      interventions.push('Pressure dressing, IV access, broad-spectrum antibiotics (Moxifloxacin 400mg), serial vitals check');
    }

    return {
      category: assignedCategory,
      reasons,
      shockIndex: siResult.shockIndex,
      marchPriority: assignedCategory === TRIAGE_CATEGORIES.IMMEDIATE ? 'URGENT_SURGICAL' : 'PRIORITY',
      recommendedInterventions: interventions
    };
  }
}

module.exports = {
  TCCCClassifier,
  TRIAGE_CATEGORIES,
  MARCH_STEPS
};
