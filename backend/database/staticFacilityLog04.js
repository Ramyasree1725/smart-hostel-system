/**
 * @fileoverview Smart Hostel Management System - Static Facility & Safety Compliance Log 04
 * @module backend/database/staticFacilityLog04
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const STATIC_FACILITY_LOGS_04 = [
  {
    logId: 'FAC-LOG-031',
    auditDate: '2026-08-16',
    facilityCategory: 'Fire & Life Safety',
    hostelBlock: 'Block-D',
    floorLevel: 1,
    locationDescription: 'Corridor Fire Extinguisher Bay D1',
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
    hydrostaticTestDueDate: '2027-08-16',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-16T16:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Routine monthly check passed without remarks'
  },
  {
    logId: 'FAC-LOG-032',
    auditDate: '2026-08-16',
    facilityCategory: 'Water Sanitation & Quality',
    hostelBlock: 'Block-D',
    floorLevel: 1,
    locationDescription: 'Floor 1 Drinking Water Station D',
    inspectorStaffId: 'STF-SAF-002',
    inspectorName: 'Sanjay Deshmukh',
    inspectionChecklist: [
      { item: 'TDS level test (ppm < 100)', result: 'PASS', value: '43 ppm' },
      { item: 'pH balance test (6.5 - 8.5)', result: 'PASS', value: '7.4 pH' },
      { item: 'Chiller temperature test (10C - 15C)', result: 'PASS', value: '12.6 C' },
      { item: 'Drip tray drainage clear and clean', result: 'PASS' },
      { item: 'Dispenser tap sanitization', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-16',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-16T16:30:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Drinking water quality certified safe and hygienic'
  },
  {
    logId: 'FAC-LOG-033',
    auditDate: '2026-08-17',
    facilityCategory: 'Electrical Safety & Distribution',
    hostelBlock: 'Block-D',
    floorLevel: 1,
    locationDescription: 'Main Floor DB Panel Board D1',
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
    hydrostaticTestDueDate: '2026-11-17',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-17T17:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Breakers and contactors in optimal operating condition'
  },
  {
    logId: 'FAC-LOG-034',
    auditDate: '2026-08-17',
    facilityCategory: 'Elevator Safety & Mechanism',
    hostelBlock: 'Block-B',
    floorLevel: 0,
    locationDescription: 'Passenger Elevator Shaft B1',
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
    hydrostaticTestDueDate: '2026-09-17',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-17T17:30:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Otis technicians verified rope tension and guide lubrication'
  },
  {
    logId: 'FAC-LOG-035',
    auditDate: '2026-08-18',
    facilityCategory: 'Emergency Lighting & Signage',
    hostelBlock: 'Block-D',
    floorLevel: 2,
    locationDescription: 'All Floor 2 Fire Exit Routes D',
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
    hydrostaticTestDueDate: '2026-09-18',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-18T16:15:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Emergency escape corridors completely clear and unobstructed'
  },
  {
    logId: 'FAC-LOG-036',
    auditDate: '2026-08-18',
    facilityCategory: 'Mess Hygiene & Food Safety (FSSAI)',
    hostelBlock: 'Dining Complex',
    floorLevel: 0,
    locationDescription: 'Dishwashing & Utensil Sanitation Area',
    inspectorStaffId: 'STF-SAF-005',
    inspectorName: 'Ananya Sengupta',
    inspectionChecklist: [
      { item: 'Dishwasher final rinse temperature (> 82C)', result: 'PASS', value: '85 C' },
      { item: 'Detergent automatic dosing concentration', result: 'PASS' },
      { item: 'Stainless steel tray drying racks sanitized', result: 'PASS' },
      { item: 'Floor anti-slip epoxy matting hygiene', result: 'PASS' },
      { item: 'Water softening unit inlet hardness (< 50 ppm)', result: 'PASS', value: '35 ppm' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-18',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-18T18:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Dishwashing unit sterilization parameters certified'
  },
  {
    logId: 'FAC-LOG-037',
    auditDate: '2026-08-19',
    facilityCategory: 'Diesel Generator Backup Systems',
    hostelBlock: 'Central Utility Yard',
    floorLevel: 0,
    locationDescription: 'DG Cooling Tower & Heat Exchanger',
    inspectorStaffId: 'STF-SAF-003',
    inspectorName: 'Rajesh Namboodiri',
    inspectionChecklist: [
      { item: 'Cooling tower water circulation rate (GPM)', result: 'PASS', value: '180 GPM' },
      { item: 'Induced draft fan motor vibration test', result: 'PASS', value: '0.8 mm/s' },
      { item: 'Water biocidal treatment dosage level', result: 'PASS' },
      { item: 'Make-up water float valve operation', result: 'PASS' },
      { item: 'Drift eliminator louvers intact', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-10-19',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-19T17:45:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Cooling tower efficiency verified under full thermal load'
  },
  {
    logId: 'FAC-LOG-038',
    auditDate: '2026-08-19',
    facilityCategory: 'Biometric Access & Turnstiles',
    hostelBlock: 'Health Center',
    floorLevel: 1,
    locationDescription: 'Infirmary Entry Smart Reader',
    inspectorStaffId: 'STF-SAF-006',
    inspectorName: 'Balaji Ramanathan',
    inspectionChecklist: [
      { item: 'Doctor and medical staff RFID whitelist', result: 'PASS' },
      { item: 'Emergency medical breakout push button', result: 'PASS' },
      { item: 'Magnetic door lock holding force (600 lbs)', result: 'PASS' },
      { item: 'Audit trail log real-time reporting', result: 'PASS' },
      { item: 'Tamper switch alarm trigger test', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-19',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-19T18:30:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Infirmary smart access lock passed physical security audit'
  },
  {
    logId: 'FAC-LOG-039',
    auditDate: '2026-08-20',
    facilityCategory: 'HVAC Air Quality & Duct Hygiene',
    hostelBlock: 'Health Center',
    floorLevel: 1,
    locationDescription: 'Infirmary Isolation Ward HVAC',
    inspectorStaffId: 'STF-SAF-002',
    inspectorName: 'Sanjay Deshmukh',
    inspectionChecklist: [
      { item: 'Negative pressure differential test (-2.5 Pa)', result: 'PASS', value: '-3.1 Pa' },
      { item: 'HEPA 99.97% filter DOP leak test', result: 'PASS', value: '0.001% leak' },
      { item: 'Air changes per hour (ACH > 12)', result: 'PASS', value: '14.2 ACH' },
      { item: 'Exhaust air UV disinfection channel', result: 'PASS' },
      { item: 'Room temperature maintained 22C +/- 1C', result: 'PASS', value: '22.2 C' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-11-20',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-20T16:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Infirmary isolation ward negative pressure certified compliant'
  },
  {
    logId: 'FAC-LOG-040',
    auditDate: '2026-08-20',
    facilityCategory: 'Solar PV & Inverter Efficiency',
    hostelBlock: 'Central Utility Yard',
    floorLevel: 4,
    roomLocation: 'Rooftop Solar PV Array Block D',
    inspectorStaffId: 'STF-SAF-003',
    inspectorName: 'Rajesh Namboodiri',
    inspectionChecklist: [
      { item: 'DC string voltage balance across MPPTs', result: 'PASS', value: '621V balance' },
      { item: 'AC total harmonic distortion (THD < 3%)', result: 'PASS', value: '1.3% THD' },
      { item: 'Surge protection device (SPD) status green', result: 'PASS' },
      { item: 'Inverter heat sink fan speed and temp', result: 'PASS', value: '43 C' },
      { item: 'Lightning protection earth pit resistance', result: 'PASS', value: '0.8 Ohms' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-11-20',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-20T17:15:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Block D solar rooftop generating 115 kWh clean electricity daily'
  }
];

function getStaticFacilityLogs04() {
  return STATIC_FACILITY_LOGS_04;
}

function findStaticFacilityLogById04(logId) {
  return STATIC_FACILITY_LOGS_04.find(log => log.logId === logId) || null;
}

function filterStaticFacilityLogsByCategory04(category) {
  return STATIC_FACILITY_LOGS_04.filter(log => log.facilityCategory.toLowerCase().includes(category.toLowerCase()));
}

function getStaticFacilityComplianceMetrics04() {
  const total = STATIC_FACILITY_LOGS_04.length;
  const compliantCount = STATIC_FACILITY_LOGS_04.filter(log => log.overallStatus === 'Compliant').length;
  const avgRating = STATIC_FACILITY_LOGS_04.reduce((sum, log) => sum + log.complianceRatingPercent, 0) / total;
  return {
    logBatch: 'STATIC_FACILITY_LOGS_04',
    totalAudits: total,
    compliantAudits: compliantCount,
    averageCompliancePercent: parseFloat(avgRating.toFixed(1))
  };
}

module.exports = {
  STATIC_FACILITY_LOGS_04,
  getStaticFacilityLogs04,
  findStaticFacilityLogById04,
  filterStaticFacilityLogsByCategory04,
  getStaticFacilityComplianceMetrics04
};
