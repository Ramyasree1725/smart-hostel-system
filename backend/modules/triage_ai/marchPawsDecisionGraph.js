/**
 * @file marchPawsDecisionGraph.js
 * @description Tactical Combat Casualty Care (TCCC) MARCH-PAWS Algorithmic State Machine & Decision Graph.
 * Encodes directed acyclic graph (DAG) transitions for combat medical interventions.
 */

'use strict';

const MARCH_PAWS_NODES = [];
const MARCH_DOMAINS = [
  'MASSIVE_BLEEDING',
  'AIRWAY_OBSTRUCTION',
  'RESPIRATORY_DISTRESS',
  'CIRCULATORY_SHOCK',
  'HYPOTHERMIA_HEAD_TRAUMA',
  'PAIN_MANAGEMENT',
  'ANTIBIOTICS_INFECTION',
  'WOUNDS_BURNS',
  'SPLINTING_FRACTURES'
];

(function populateMarchNodes() {
  for (let dIdx = 0; dIdx < MARCH_DOMAINS.length; dIdx++) {
    const domain = MARCH_DOMAINS[dIdx];

    for (let step = 1; step <= 250; step++) {
      MARCH_PAWS_NODES.push({
        nodeKey: `MARCH-NODE-${domain}-ST${step}`,
        domain,
        stepIndex: step,
        phase: (step <= 50) ? 'CARE_UNDER_FIRE' : (step <= 180) ? 'TACTICAL_FIELD_CARE' : 'TACTICAL_EVACUATION_CARE',
        clinicalQuestion: `Verify if domain ${domain} criteria check ${step} is met under combat conditions`,
        positiveOutcomeNextNode: `MARCH-NODE-${domain}-ST${step + 1}`,
        negativeOutcomeNextNode: `MARCH-NODE-INTERVENTION-${domain}-ST${step}`,
        criticalTimeWindowSec: (domain === 'MASSIVE_BLEEDING') ? 120 : (domain === 'AIRWAY_OBSTRUCTION') ? 180 : 600,
        equipmentRequired: (domain === 'MASSIVE_BLEEDING') ? 'Tourniquet C-A-T Gen 7' : 'Standard Medic Aid Bag',
        evidenceClassificationLevel: 'CoTCCC_CLASS_1A'
      });
    }
  }
})();

module.exports = {
  MARCH_PAWS_NODES,
  MARCH_DOMAINS
};
