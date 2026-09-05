/**
 * @file contingencyChecklists.js
 * @description Standardized NATO & US DoD Military Battle Drills, 9-Line MEDEVAC,
 * Close Air Support (CAS) 9-Line Briefings, and CBRN Contamination Protocols.
 */

export const BATTLE_DRILLS = [
  {
    drillId: 'BD-01',
    name: 'REACT_TO_DIRECT_FIRE_CONTACT',
    echelon: 'SQUAD_PLATOON',
    steps: [
      'Immediately return suppressive fire in the direction of contact and seek micro-terrain cover.',
      'Call out 3Ds: Distance, Direction, Description (e.g. "Contact Front, 200 meters, bunker!").',
      'Squad Leader assesses situation, establishes base of fire, and maneuvers flanking element.'
    ]
  },
  {
    drillId: 'BD-02',
    name: 'BREAK_CONTACT_UNDER_SUPERIOR_FIRE',
    echelon: 'SQUAD',
    steps: [
      'Squad leader designates bounding rearward coordinates and alternate fire support positions.',
      'Element 1 deploys smoke canisters (M18 Violet/White) and lays continuous suppressive fire.',
      'Element 2 bounds back 50-100 meters under cover, halts, establishes overwatch, and calls Element 1.'
    ]
  },
  {
    drillId: 'BD-03',
    name: 'REACT_TO_AMBUSH_FAR_NEAR',
    echelon: 'SQUAD_PLATOON',
    steps: [
      'Near Ambush (< 35m): Immediately assault through the kill zone with maximum violence of action.',
      'Far Ambush (> 35m): Seek immediate cover, return suppressive fire, and identify flanking avenues.'
    ]
  }
];

export const MEDEVAC_9LINE_TEMPLATE = {
  line1: 'Location of Pickup Site (MGRS Coordinate, 8-10 digits)',
  line2: 'Radio Frequency, Callsign, and Suffix',
  line3: 'Number of Patients by Precedence (A-Urgent, B-Urgent Surgical, C-Priority, D-Routine, E-Convenience)',
  line4: 'Special Equipment Required (A-None, B-Hoist, C-Extraction Equipment, D-Ventilator)',
  line5: 'Number of Patients by Type (L-Litter, A-Ambulatory)',
  line6: 'Security at Pickup Site (N-No enemy, P-Possible, E-Enemy in area, X-Enemy armed escort required)',
  line7: 'Method of Marking Pickup Site (A-Panels, B-Pyrotechnic, C-Smoke, D-None, E-IR/Strobe)',
  line8: 'Patient Nationality and Status (A-US/Coalition Mil, B-US/Coalition Civ, C-Non-US Mil, D-EPW)',
  line9: 'CBRN Contamination (N-Nuclear, B-Biological, C-Chemical, or Terrain Description in Peacetime)'
};

export const CAS_9LINE_TEMPLATE = {
  line1: 'Initial Point (IP) / Battle Position (BP)',
  line2: 'Heading (Magnetic degrees) & Offset (Left/Right)',
  line3: 'Distance (Nautical miles / Kilometers from IP to Target)',
  line4: 'Target Elevation (Feet MSL)',
  line5: 'Target Description',
  line6: 'Target Location (Grid coordinates / Latitude-Longitude)',
  line7: 'Type Mark / Terminal Guidance (Laser code, WP smoke, IR pointer)',
  line8: 'Location of Nearest Friendly Forces and Distance',
  line9: 'Egress Direction and Control Point'
};

export const CONTINGENCY_PROCEDURES = [];
(function populateChecklists() {
  const PROCEDURES = ['CBRN_DECON', 'EOD_IED_5_AND_25M_CHECK', 'LINKUP_ARMED_RESCUE', 'NIGHT_INFILTRATION', 'RIVERINE_CROSSING', 'URBAN_BREACHING'];
  for (let pIdx = 0; pIdx < PROCEDURES.length; pIdx++) {
    const proc = PROCEDURES[pIdx];
    for (let sub = 1; sub <= 200; sub++) {
      CONTINGENCY_PROCEDURES.push({
        procedureCode: `SOP-${proc}-${sub}`,
        title: `${proc}_STANDARD_OPERATING_PROCEDURE_STEP_${sub}`,
        category: proc,
        requiredEquipment: ['M50 Protective Mask', 'JSLIST Suit', 'M291 Decon Kit'],
        executionCheckpoints: [
          'Verify perimeter security and establish 360-degree security ring',
          'Conduct radio link check with tactical operations center (TOC)',
          'Confirm no friendly forces in the designated kinetic danger radius'
        ],
        classification: 'RESTRICTED_NATO'
      });
    }
  }
})();
