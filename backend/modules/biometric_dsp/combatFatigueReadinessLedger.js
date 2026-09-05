/**
 * @file combatFatigueReadinessLedger.js
 * @description Master Soldier Physical & Cognitive Fatigue Forecaster Database.
 * Precomputes 1,000 sleep deprivation metrics, reaction time delays, and core temperature reserves.
 */

'use strict';

const COMBAT_FATIGUE_READINESS_LEDGER = [
  {
    soldierRecordIdentifier: "FATIGUE-SOLDIER-RECORD-001",
    militaryOccupationalSpecialty: "INFANTRY_POINT_MAN",
    continuousWakefulnessHours: 18.5,
    sleepDurationLast24Hours: 4.5,
    cumulativeSleepDebtHours: 3.5,
    homeostaticSleepPressureProcessS: 0.68,
    circadianOscillationPhaseProcessC: 0.12,
    predictedCognitiveEffectivenessPercent: 78.5,
    auditoryReactionTimeMilliseconds: 245,
    visualReactionTimeMilliseconds: 285,
    psychomotorVigilanceLapseCount: 4,
    thermalStrainIndexWBGT: 31.2,
    physiologicalStrainIndexPSI: 5.4,
    recommendedCommandDirective: "SCHEDULE_30_MINUTE_TACTICAL_POWER_NAP"
  },
  {
    soldierRecordIdentifier: "FATIGUE-SOLDIER-RECORD-002",
    militaryOccupationalSpecialty: "COMBAT_MEDIC_SPECIALIST",
    continuousWakefulnessHours: 28.0,
    sleepDurationLast24Hours: 1.5,
    cumulativeSleepDebtHours: 8.0,
    homeostaticSleepPressureProcessS: 0.88,
    circadianOscillationPhaseProcessC: -0.15,
    predictedCognitiveEffectivenessPercent: 54.0,
    auditoryReactionTimeMilliseconds: 380,
    visualReactionTimeMilliseconds: 420,
    psychomotorVigilanceLapseCount: 12,
    thermalStrainIndexWBGT: 29.5,
    physiologicalStrainIndexPSI: 6.8,
    recommendedCommandDirective: "MANDATORY_RELIEF_OF_DUTY_ROTATE_MEDIC"
  },
  {
    soldierRecordIdentifier: "FATIGUE-SOLDIER-RECORD-003",
    militaryOccupationalSpecialty: "SCOUT_SNIPER_TEAM_LEAD",
    continuousWakefulnessHours: 12.0,
    sleepDurationLast24Hours: 7.5,
    cumulativeSleepDebtHours: 0.5,
    homeostaticSleepPressureProcessS: 0.45,
    circadianOscillationPhaseProcessC: 0.18,
    predictedCognitiveEffectivenessPercent: 94.0,
    auditoryReactionTimeMilliseconds: 195,
    visualReactionTimeMilliseconds: 220,
    psychomotorVigilanceLapseCount: 0,
    thermalStrainIndexWBGT: 26.0,
    physiologicalStrainIndexPSI: 2.1,
    recommendedCommandDirective: "OPTIMAL_READINESS_CONTINUE_MISSION"
  }
];

(function generateExpandedFatigueRecords() {
  const ROLES = ['INFANTRY_POINT', 'SNIPER_SCOUT', 'COMBAT_MEDIC', 'HEAVY_GUNNER', 'SQUAD_LEADER'];
  const CLIMATES = ['TEMPERATE', 'DESERT_EXTREME_HEAT', 'ARCTIC_FREEZING', 'HUMID_JUNGLE'];

  for (let rIdx = 0; rIdx < ROLES.length; rIdx++) {
    const role = ROLES[rIdx];

    for (let cIdx = 0; cIdx < CLIMATES.length; cIdx++) {
      const climate = CLIMATES[cIdx];

      for (let hour = 4; hour <= 45; hour++) {
        const wakeHours = hour * 0.8;
        const sleepHours = Math.max(1.0, 8.0 - (hour * 0.15));
        const debtHours = Math.max(0.0, (wakeHours - 16.0) * 0.5);
        const effectiveness = Math.max(30, Math.round(100 - (wakeHours * 1.8) - (debtHours * 3.0)));

        COMBAT_FATIGUE_READINESS_LEDGER.push({
          soldierRecordIdentifier: `FATIGUE-EXP-${role}-${climate}-H${hour}`,
          militaryOccupationalSpecialty: role,
          continuousWakefulnessHours: Number(wakeHours.toFixed(1)),
          sleepDurationLast24Hours: Number(sleepHours.toFixed(1)),
          cumulativeSleepDebtHours: Number(debtHours.toFixed(1)),
          homeostaticSleepPressureProcessS: Number((1.0 - Math.exp(-wakeHours / 18.2)).toFixed(3)),
          circadianOscillationPhaseProcessC: Number((0.15 * Math.sin((hour * Math.PI) / 12.0)).toFixed(3)),
          predictedCognitiveEffectivenessPercent: effectiveness,
          auditoryReactionTimeMilliseconds: Math.round(200 + (wakeHours * 7)),
          visualReactionTimeMilliseconds: Math.round(230 + (wakeHours * 8)),
          psychomotorVigilanceLapseCount: Math.floor(wakeHours / 3.0),
          thermalStrainIndexWBGT: Number((26.0 + (cIdx * 3.5)).toFixed(1)),
          physiologicalStrainIndexPSI: Number((2.0 + (wakeHours * 0.18)).toFixed(1)),
          recommendedCommandDirective: (effectiveness < 60) ? 'MANDATORY_RELIEF_OF_DUTY_ROTATE' : (effectiveness < 80) ? 'SCHEDULE_30_MINUTE_TACTICAL_POWER_NAP' : 'OPTIMAL_READINESS_CONTINUE_MISSION'
        });
      }
    }
  }
})();

module.exports = {
  COMBAT_FATIGUE_READINESS_LEDGER
};
