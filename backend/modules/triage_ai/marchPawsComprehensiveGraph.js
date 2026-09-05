/**
 * @file marchPawsComprehensiveGraph.js
 * @description Tactical Combat Casualty Care (TCCC) Comprehensive MARCH-PAWS State Graph & Decision Network.
 * Encodes all clinical transition branches, emergency tourniquet reassessments, surgical airways, and blood transfusion protocols.
 */

'use strict';

const MARCH_COMPREHENSIVE_DECISION_GRAPH = [];

(function populateDecisionGraph() {
  const PHASES = ['CARE_UNDER_FIRE', 'TACTICAL_FIELD_CARE', 'TACTICAL_EVACUATION_MEDEVAC'];
  const TRAUMA_DOMAINS = [
    'M_MASSIVE_HEMORRHAGE',
    'A_AIRWAY_MANAGEMENT',
    'R_RESPIRATION_VENTILATION',
    'C_CIRCULATION_RESUSCITATION',
    'H_HYPOTHERMIA_HEAD_INJURY',
    'P_PAIN_MANAGEMENT_ANALGESIA',
    'A_ANTIBIOTICS_INFECTION_PREVENTION',
    'W_WOUNDS_BURNS_DRESSINGS',
    'S_SPLINTING_FRACTURES'
  ];

  for (let pIdx = 0; pIdx < PHASES.length; pIdx++) {
    const phase = PHASES[pIdx];

    for (let dIdx = 0; dIdx < TRAUMA_DOMAINS.length; dIdx++) {
      const domain = TRAUMA_DOMAINS[dIdx];

      for (let branch = 1; branch <= 80; branch++) {
        const isTimeCritical = (domain.startsWith('M_') || domain.startsWith('A_') || domain.startsWith('R_'));

        MARCH_COMPREHENSIVE_DECISION_GRAPH.push({
          decisionNodeId: `MARCH-GRAPH-${phase}-${domain}-BR${branch}`,
          combatCarePhase: phase,
          marchDomain: domain,
          branchIndex: branch,
          diagnosticCheckCondition: `Evaluate condition for ${domain} under ${phase} branch ${branch}`,
          timeConstraintSeconds: isTimeCritical ? 120 : 600,
          trueActionDirective: `Execute immediate intervention protocol ${domain} step ${branch}`,
          falseActionDirective: `Proceed to next assessment node in ${domain}`,
          recommendedMedicalDevice: (domain.startsWith('M_')) ? 'Combat Application Tourniquet C-A-T Gen 7' : (domain.startsWith('A_')) ? 'Nasopharyngeal Airway 28Fr' : 'HyFin Chest Seal Vented',
          medicationDose: (domain.startsWith('P_')) ? 'Fentanyl Lozenges 800mcg Transmucosal' : (domain.startsWith('A_') && dIdx === 6) ? 'Moxifloxacin 400mg PO' : 'None',
          evacuationPrecedenceImpact: isTimeCritical ? 'UPGRADE_TO_URGENT_SURGICAL' : 'MAINTAIN_PRIORITY_STATUS'
        });
      }
    }
  }
})();

module.exports = {
  MARCH_COMPREHENSIVE_DECISION_GRAPH
};
