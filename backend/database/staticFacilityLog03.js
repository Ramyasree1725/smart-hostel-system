/**
 * @fileoverview Smart Hostel Management System - Static Facility & Safety Compliance Log 03
 * @module backend/database/staticFacilityLog03
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const STATIC_FACILITY_LOGS_03 = [
  {
    logId: 'FAC-LOG-021',
    auditDate: '2026-08-11',
    facilityCategory: 'Fire & Life Safety',
    hostelBlock: 'Block-C',
    floorLevel: 1,
    locationDescription: 'Corridor Fire Extinguisher Bay C1',
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
    hydrostaticTestDueDate: '2027-08-11',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-11T16:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Routine monthly check passed without remarks'
  },
  {
    logId: 'FAC-LOG-022',
    auditDate: '2026-08-11',
    facilityCategory: 'Water Sanitation & Quality',
    hostelBlock: 'Block-C',
    floorLevel: 1,
    locationDescription: 'Floor 1 Drinking Water Station C',
    inspectorStaffId: 'STF-SAF-002',
    inspectorName: 'Sanjay Deshmukh',
    inspectionChecklist: [
      { item: 'TDS level test (ppm < 100)', result: 'PASS', value: '41 ppm' },
      { item: 'pH balance test (6.5 - 8.5)', result: 'PASS', value: '7.4 pH' },
      { item: 'Chiller temperature test (10C - 15C)', result: 'PASS', value: '12.8 C' },
      { item: 'Drip tray drainage clear and clean', result: 'PASS' },
      { item: 'Dispenser tap sanitization', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-11',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-11T16:30:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Drinking water quality certified safe and hygienic'
  },
  {
    logId: 'FAC-LOG-023',
    auditDate: '2026-08-12',
    facilityCategory: 'Electrical Safety & Distribution',
    hostelBlock: 'Block-C',
    floorLevel: 1,
    locationDescription: 'Main Floor DB Panel Board C1',
    inspectorStaffId: 'STF-SAF-003',
    inspectorName: 'Rajesh Namboodiri',
    inspectionChecklist: [
      { item: 'Thermal imaging test for hot connections', result: 'PASS', value: '32 C max' },
      { item: 'ELCB / RCCB 30mA trip test', result: 'PASS', value: 'Trip time 20ms' },
      { item: 'Earthing resistance test (< 2 Ohms)', result: 'PASS', value: '1.0 Ohms' },
      { item: 'Panel door rubber seal and lock', result: 'PASS' },
      { item: 'Danger warning sign and shock chart', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-11-12',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-12T17:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Breakers and contactors in optimal operating condition'
  },
  {
    logId: 'FAC-LOG-024',
    auditDate: '2026-08-12',
    facilityCategory: 'Elevator Safety & Mechanism',
    hostelBlock: 'Block-A',
    floorLevel: 0,
    locationDescription: 'Passenger Elevator Shaft A1',
    inspectorStaffId: 'STF-SAF-004',
    inspectorName: 'Harish Varma',
    inspectionChecklist: [
      { item: 'Automatic Rescue Device (ARD) battery', result: 'PASS' },
      { item: 'Emergency intercom call to security desk', result: 'PASS' },
      { item: 'Infrared door curtain obstacle detection', result: 'PASS' },
      { item: 'Leveling accuracy (+/- 5mm at landing)', result: 'PASS', value: '0mm' },
      { item: 'Over-speed governor safety gear test', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-12',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-12T17:30:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Otis technicians verified rope tension and guide lubrication'
  },
  {
    logId: 'FAC-LOG-025',
    auditDate: '2026-08-13',
    facilityCategory: 'Emergency Lighting & Signage',
    hostelBlock: 'Block-C',
    floorLevel: 2,
    locationDescription: 'All Floor 2 Fire Exit Routes C',
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
    hydrostaticTestDueDate: '2026-09-13',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-13T16:15:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Emergency escape corridors completely clear and unobstructed'
  },
  {
    logId: 'FAC-LOG-026',
    auditDate: '2026-08-13',
    facilityCategory: 'Mess Hygiene & Food Safety (FSSAI)',
    hostelBlock: 'Dining Complex',
    floorLevel: 0,
    locationDescription: 'Vegetable Processing & Cutting Bay',
    inspectorStaffId: 'STF-SAF-005',
    inspectorName: 'Ananya Sengupta',
    inspectionChecklist: [
      { item: 'Vegetable ozone washer sanitizing cycle', result: 'PASS' },
      { item: 'Drainage grease trap clean and clear', result: 'PASS' },
      { item: 'Fly catcher UV grid voltage check', result: 'PASS', value: '4500V' },
      { item: 'Perishable cold storage temperature (+4C)', result: 'PASS', value: '3.8 C' },
      { item: 'Handwashing sensor taps with antibacterial soap', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-13',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-13T18:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Vegetable sanitation protocol strictly followed'
  },
  {
    logId: 'FAC-LOG-027',
    auditDate: '2026-08-14',
    facilityCategory: 'Diesel Generator Backup Systems',
    hostelBlock: 'Central Utility Yard',
    floorLevel: 0,
    locationDescription: 'DG Fuel Bulk Storage Tank Bay',
    inspectorStaffId: 'STF-SAF-003',
    inspectorName: 'Rajesh Namboodiri',
    inspectionChecklist: [
      { item: 'Bulk underground fuel storage level (5000L)', result: 'PASS', value: '4,450 L' },
      { item: 'Fuel transfer pump pressure and leak test', result: 'PASS' },
      { item: 'Flame arrester breather pipe vent clean', result: 'PASS' },
      { item: 'Foam fire extinguisher 50L mobile trolley', result: 'PASS' },
      { item: 'Static grounding reel connection intact', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-10-14',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-14T17:45:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Diesel bulk fuel storage audited with zero containment leaks'
  },
  {
    logId: 'FAC-LOG-028',
    auditDate: '2026-08-14',
    facilityCategory: 'Biometric Access & Turnstiles',
    hostelBlock: 'Student Activity Center',
    floorLevel: 1,
    locationDescription: 'Gymnasium & Library Entry Barriers',
    inspectorStaffId: 'STF-SAF-006',
    inspectorName: 'Balaji Ramanathan',
    inspectionChecklist: [
      { item: 'Student access permission rule verification', result: 'PASS' },
      { item: 'Optical sensor beam alignment', result: 'PASS' },
      { item: 'Anti-pinch safety mechanism responsiveness', result: 'PASS' },
      { item: 'Occupancy capacity limiter sync', result: 'PASS' },
      { item: 'Manual security override key mechanism', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-14',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-14T18:30:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Activity center turnstile access logs reconciled with resident DB'
  },
  {
    logId: 'FAC-LOG-029',
    auditDate: '2026-08-15',
    facilityCategory: 'HVAC Air Quality & Duct Hygiene',
    hostelBlock: 'Student Activity Center',
    floorLevel: 2,
    locationDescription: 'Library Central Study Zone',
    inspectorStaffId: 'STF-SAF-002',
    inspectorName: 'Sanjay Deshmukh',
    inspectionChecklist: [
      { item: 'Airborne PM2.5 level (< 25 ug/m3)', result: 'PASS', value: '8 ug/m3' },
      { item: 'CO2 carbon dioxide level (< 800 ppm)', result: 'PASS', value: '480 ppm' },
      { item: 'Relative humidity (40% - 60%)', result: 'PASS', value: '50%' },
      { item: 'Supply air diffuser velocity (CFM)', result: 'PASS', value: '520 CFM' },
      { item: 'Acoustic silencer baffle integrity', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-11-15',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-15T16:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Library air quality index certified Grade-A Clean Air'
  },
  {
    logId: 'FAC-LOG-030',
    auditDate: '2026-08-15',
    facilityCategory: 'Solar PV & Inverter Efficiency',
    hostelBlock: 'Central Utility Yard',
    floorLevel: 4,
    roomLocation: 'Rooftop Solar PV Array Block C',
    inspectorStaffId: 'STF-SAF-003',
    inspectorName: 'Rajesh Namboodiri',
    inspectionChecklist: [
      { item: 'DC string voltage balance across MPPTs', result: 'PASS', value: '622V balance' },
      { item: 'AC total harmonic distortion (THD < 3%)', result: 'PASS', value: '1.2% THD' },
      { item: 'Surge protection device (SPD) status green', result: 'PASS' },
      { item: 'Inverter heat sink fan speed and temp', result: 'PASS', value: '41 C' },
      { item: 'Lightning protection earth pit resistance', result: 'PASS', value: '0.7 Ohms' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-11-15',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-15T17:15:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Block C solar rooftop operating at maximum rated generation'
  }
];

function getStaticFacilityLogs03() {
  return STATIC_FACILITY_LOGS_03;
}

function findStaticFacilityLogById03(logId) {
  return STATIC_FACILITY_LOGS_03.find(log => log.logId === logId) || null;
}

function filterStaticFacilityLogsByCategory03(category) {
  return STATIC_FACILITY_LOGS_03.filter(log => log.facilityCategory.toLowerCase().includes(category.toLowerCase()));
}

function getStaticFacilityComplianceMetrics03() {
  const total = STATIC_FACILITY_LOGS_03.length;
  const compliantCount = STATIC_FACILITY_LOGS_03.filter(log => log.overallStatus === 'Compliant').length;
  const avgRating = STATIC_FACILITY_LOGS_03.reduce((sum, log) => sum + log.complianceRatingPercent, 0) / total;
  return {
    logBatch: 'STATIC_FACILITY_LOGS_03',
    totalAudits: total,
    compliantAudits: compliantCount,
    averageCompliancePercent: parseFloat(avgRating.toFixed(1))
  };
}

module.exports = {
  STATIC_FACILITY_LOGS_03,
  getStaticFacilityLogs03,
  findStaticFacilityLogById03,
  filterStaticFacilityLogsByCategory03,
  getStaticFacilityComplianceMetrics03
};
