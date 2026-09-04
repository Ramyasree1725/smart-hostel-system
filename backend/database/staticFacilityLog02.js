/**
 * @fileoverview Smart Hostel Management System - Static Facility & Safety Compliance Log 02
 * @module backend/database/staticFacilityLog02
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const STATIC_FACILITY_LOGS_02 = [
  {
    logId: 'FAC-LOG-011',
    auditDate: '2026-08-06',
    facilityCategory: 'Fire & Life Safety',
    hostelBlock: 'Block-B',
    floorLevel: 1,
    locationDescription: 'Corridor Fire Extinguisher Bay B1',
    inspectorStaffId: 'STF-SAF-001',
    inspectorName: 'Devraj Chauhan',
    inspectionChecklist: [
      { item: 'Pressure gauge needle in green zone', result: 'PASS' },
      { item: 'Safety pin and plastic seal intact', result: 'PASS' },
      { item: 'Nozzle and discharge horn unobstructed', result: 'PASS' },
      { item: 'Mounting bracket secure and visible', result: 'PASS' },
      { item: 'Instruction label clear and legible', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2027-08-06',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-06T16:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Routine monthly check passed without remarks'
  },
  {
    logId: 'FAC-LOG-012',
    auditDate: '2026-08-06',
    facilityCategory: 'Water Sanitation & Quality',
    hostelBlock: 'Block-B',
    floorLevel: 1,
    locationDescription: 'Floor 1 Drinking Water Station',
    inspectorStaffId: 'STF-SAF-002',
    inspectorName: 'Sanjay Deshmukh',
    inspectionChecklist: [
      { item: 'TDS level test (ppm < 100)', result: 'PASS', value: '45 ppm' },
      { item: 'pH balance test (6.5 - 8.5)', result: 'PASS', value: '7.3 pH' },
      { item: 'Chiller temperature test (10C - 15C)', result: 'PASS', value: '13.0 C' },
      { item: 'Drip tray drainage clear and clean', result: 'PASS' },
      { item: 'Dispenser tap sanitization', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-06',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-06T16:30:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Drinking water quality certified safe and hygienic'
  },
  {
    logId: 'FAC-LOG-013',
    auditDate: '2026-08-07',
    facilityCategory: 'Electrical Safety & Distribution',
    hostelBlock: 'Block-B',
    floorLevel: 1,
    locationDescription: 'Main Floor DB Panel Board B1',
    inspectorStaffId: 'STF-SAF-003',
    inspectorName: 'Rajesh Namboodiri',
    inspectionChecklist: [
      { item: 'Thermal imaging test for hot connections', result: 'PASS', value: '33 C max' },
      { item: 'ELCB / RCCB 30mA trip test', result: 'PASS', value: 'Trip time 21ms' },
      { item: 'Earthing resistance test (< 2 Ohms)', result: 'PASS', value: '1.1 Ohms' },
      { item: 'Panel door rubber seal and lock', result: 'PASS' },
      { item: 'Danger warning sign and shock chart', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-11-07',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-07T17:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Breakers and contactors in optimal operating condition'
  },
  {
    logId: 'FAC-LOG-014',
    auditDate: '2026-08-07',
    facilityCategory: 'Elevator Safety & Mechanism',
    hostelBlock: 'Block-D',
    floorLevel: 0,
    locationDescription: 'Passenger Elevator Shaft D1',
    inspectorStaffId: 'STF-SAF-004',
    inspectorName: 'Harish Varma',
    inspectionChecklist: [
      { item: 'Automatic Rescue Device (ARD) battery', result: 'PASS' },
      { item: 'Emergency intercom call to security desk', result: 'PASS' },
      { item: 'Infrared door curtain obstacle detection', result: 'PASS' },
      { item: 'Leveling accuracy (+/- 5mm at landing)', result: 'PASS', value: '+1mm' },
      { item: 'Over-speed governor safety gear test', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-07',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-07T17:30:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Otis technicians verified rope tension and guide lubrication'
  },
  {
    logId: 'FAC-LOG-015',
    auditDate: '2026-08-08',
    facilityCategory: 'Emergency Lighting & Signage',
    hostelBlock: 'Block-B',
    floorLevel: 2,
    locationDescription: 'All Floor 2 Fire Exit Routes B',
    inspectorStaffId: 'STF-SAF-001',
    inspectorName: 'Devraj Chauhan',
    inspectionChecklist: [
      { item: 'Photoluminescent exit directional signage', result: 'PASS' },
      { item: 'Battery backup illumination test 90 mins', result: 'PASS' },
      { item: 'Staircase pathway clear of obstructions', result: 'PASS' },
      { item: 'Fire doors auto-closer latching test', result: 'PASS' },
      { item: 'Panic hardware push bar smooth release', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-08',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-08T16:15:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Emergency escape corridors completely clear and unobstructed'
  },
  {
    logId: 'FAC-LOG-016',
    auditDate: '2026-08-08',
    facilityCategory: 'Mess Hygiene & Food Safety (FSSAI)',
    hostelBlock: 'Dining Complex',
    floorLevel: 1,
    locationDescription: 'Student Dining Hall & Serving Counters',
    inspectorStaffId: 'STF-SAF-005',
    inspectorName: 'Ananya Sengupta',
    inspectionChecklist: [
      { item: 'Serving counter bain-marie temperature (> 65C)', result: 'PASS', value: '74 C' },
      { item: 'Drinking water dispenser UV status', result: 'PASS' },
      { item: 'Cutlery washing machine high-temp rinse (> 80C)', result: 'PASS', value: '84 C' },
      { item: 'Dining table food-grade surface sanitization', result: 'PASS' },
      { item: 'Waste segregation wet/dry bins labelled', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-08',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-08T18:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Dining hall cleanliness and dish sanitation audit 100% compliant'
  },
  {
    logId: 'FAC-LOG-017',
    auditDate: '2026-08-09',
    facilityCategory: 'Diesel Generator Backup Systems',
    hostelBlock: 'Central Utility Yard',
    floorLevel: 0,
    locationDescription: 'DG Room Yard 1 - Synchronizing Panel',
    inspectorStaffId: 'STF-SAF-003',
    inspectorName: 'Rajesh Namboodiri',
    inspectionChecklist: [
      { item: 'Frequency stability 50 Hz +/- 0.5 Hz', result: 'PASS', value: '50.1 Hz' },
      { item: 'Voltage regulation 415V line-to-line', result: 'PASS', value: '416V' },
      { item: 'Exhaust emissions smoke opacity test', result: 'PASS', value: 'Bosch unit 1.2' },
      { item: 'Battery charging alternator 27.4V DC float', result: 'PASS', value: '27.4V' },
      { item: 'Emergency stop push button immediate cut', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-10-09',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-09T17:45:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Generator electrical and mechanical parameters certified healthy'
  },
  {
    logId: 'FAC-LOG-018',
    auditDate: '2026-08-09',
    facilityCategory: 'Biometric Access & Turnstiles',
    hostelBlock: 'Dining Complex',
    floorLevel: 1,
    locationDescription: 'Mess Entry Turnstiles',
    inspectorStaffId: 'STF-SAF-006',
    inspectorName: 'Balaji Ramanathan',
    inspectionChecklist: [
      { item: 'SpeedFace biometric recognition rate', result: 'PASS', value: '99.8%' },
      { item: 'Meal subscription barcode scanner check', result: 'PASS' },
      { item: 'Gate mechanical turn rotation dampener', result: 'PASS' },
      { item: 'Local cache sync to central cloud database', result: 'PASS', value: '< 200ms' },
      { item: 'Power loss fail-safe free rotation mode', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-09',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-09T18:30:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Mess automated meal turnstiles passed throughput audit'
  },
  {
    logId: 'FAC-LOG-019',
    auditDate: '2026-08-10',
    facilityCategory: 'HVAC Air Quality & Duct Hygiene',
    hostelBlock: 'Student Activity Center',
    floorLevel: 1,
    locationDescription: 'Hostel Seminar & Movie Theater HVAC',
    inspectorStaffId: 'STF-SAF-002',
    inspectorName: 'Sanjay Deshmukh',
    inspectionChecklist: [
      { item: 'Airborne PM2.5 level (< 25 ug/m3)', result: 'PASS', value: '10 ug/m3' },
      { item: 'CO2 carbon dioxide level (< 800 ppm)', result: 'PASS', value: '510 ppm' },
      { item: 'Relative humidity (40% - 60%)', result: 'PASS', value: '48%' },
      { item: 'Supply air diffuser velocity (CFM)', result: 'PASS', value: '650 CFM' },
      { item: 'UV-C germicidal coil irradiator active', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-11-10',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-10T16:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Auditorium HVAC environmental parameters certified excellent'
  },
  {
    logId: 'FAC-LOG-020',
    auditDate: '2026-08-10',
    facilityCategory: 'Solar PV & Inverter Efficiency',
    hostelBlock: 'Central Utility Yard',
    floorLevel: 4,
    roomLocation: 'Rooftop Solar PV Array Block B',
    inspectorStaffId: 'STF-SAF-003',
    inspectorName: 'Rajesh Namboodiri',
    inspectionChecklist: [
      { item: 'DC string voltage balance across MPPTs', result: 'PASS', value: '618V balance' },
      { item: 'AC total harmonic distortion (THD < 3%)', result: 'PASS', value: '1.3% THD' },
      { item: 'Surge protection device (SPD) status green', result: 'PASS' },
      { item: 'Inverter heat sink fan speed and temp', result: 'PASS', value: '42 C' },
      { item: 'Lightning protection earth pit resistance', result: 'PASS', value: '0.7 Ohms' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-11-10',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-10T17:15:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Block B solar rooftop generating 110 kWh clean electricity daily'
  }
];

function getStaticFacilityLogs02() {
  return STATIC_FACILITY_LOGS_02;
}

function findStaticFacilityLogById02(logId) {
  return STATIC_FACILITY_LOGS_02.find(log => log.logId === logId) || null;
}

function filterStaticFacilityLogsByCategory02(category) {
  return STATIC_FACILITY_LOGS_02.filter(log => log.facilityCategory.toLowerCase().includes(category.toLowerCase()));
}

function getStaticFacilityComplianceMetrics02() {
  const total = STATIC_FACILITY_LOGS_02.length;
  const compliantCount = STATIC_FACILITY_LOGS_02.filter(log => log.overallStatus === 'Compliant').length;
  const avgRating = STATIC_FACILITY_LOGS_02.reduce((sum, log) => sum + log.complianceRatingPercent, 0) / total;
  return {
    logBatch: 'STATIC_FACILITY_LOGS_02',
    totalAudits: total,
    compliantAudits: compliantCount,
    averageCompliancePercent: parseFloat(avgRating.toFixed(1))
  };
}

module.exports = {
  STATIC_FACILITY_LOGS_02,
  getStaticFacilityLogs02,
  findStaticFacilityLogById02,
  filterStaticFacilityLogsByCategory02,
  getStaticFacilityComplianceMetrics02
};
