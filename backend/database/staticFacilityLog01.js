/**
 * @fileoverview Smart Hostel Management System - Static Facility & Safety Compliance Log 01
 * @module backend/database/staticFacilityLog01
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const STATIC_FACILITY_LOGS_01 = [
  {
    logId: 'FAC-LOG-001',
    auditDate: '2026-08-01',
    facilityCategory: 'Fire & Life Safety',
    hostelBlock: 'Block-A',
    floorLevel: 1,
    locationDescription: 'Corridor Fire Extinguisher Bay A1',
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
    hydrostaticTestDueDate: '2027-08-01',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-01T16:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Routine monthly check passed without remarks'
  },
  {
    logId: 'FAC-LOG-002',
    auditDate: '2026-08-01',
    facilityCategory: 'Water Sanitation & Quality',
    hostelBlock: 'Block-A',
    floorLevel: 1,
    locationDescription: 'Floor 1 Drinking Water Station',
    inspectorStaffId: 'STF-SAF-002',
    inspectorName: 'Sanjay Deshmukh',
    inspectionChecklist: [
      { item: 'TDS level test (ppm < 100)', result: 'PASS', value: '42 ppm' },
      { item: 'pH balance test (6.5 - 8.5)', result: 'PASS', value: '7.4 pH' },
      { item: 'Chiller temperature test (10C - 15C)', result: 'PASS', value: '12.5 C' },
      { item: 'Drip tray drainage clear and clean', result: 'PASS' },
      { item: 'Dispenser tap sanitization', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-01',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-01T16:30:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Drinking water quality certified safe and hygienic'
  },
  {
    logId: 'FAC-LOG-003',
    auditDate: '2026-08-02',
    facilityCategory: 'Electrical Safety & Distribution',
    hostelBlock: 'Block-A',
    floorLevel: 1,
    locationDescription: 'Main Floor DB Panel Board A1',
    inspectorStaffId: 'STF-SAF-003',
    inspectorName: 'Rajesh Namboodiri',
    inspectionChecklist: [
      { item: 'Thermal imaging test for hot connections', result: 'PASS', value: '34 C max' },
      { item: 'ELCB / RCCB 30mA trip test', result: 'PASS', value: 'Trip time 22ms' },
      { item: 'Earthing resistance test (< 2 Ohms)', result: 'PASS', value: '1.2 Ohms' },
      { item: 'Panel door rubber seal and lock', result: 'PASS' },
      { item: 'Danger warning sign and shock chart', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-11-02',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-02T17:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Breakers and contactors in optimal operating condition'
  },
  {
    logId: 'FAC-LOG-004',
    auditDate: '2026-08-02',
    facilityCategory: 'Elevator Safety & Mechanism',
    hostelBlock: 'Block-C',
    floorLevel: 0,
    locationDescription: 'Passenger Elevator Shaft C1',
    inspectorStaffId: 'STF-SAF-004',
    inspectorName: 'Harish Varma',
    inspectionChecklist: [
      { item: 'Automatic Rescue Device (ARD) battery', result: 'PASS' },
      { item: 'Emergency intercom call to security desk', result: 'PASS' },
      { item: 'Infrared door curtain obstacle detection', result: 'PASS' },
      { item: 'Leveling accuracy (+/- 5mm at landing)', result: 'PASS', value: '+2mm' },
      { item: 'Over-speed governor safety gear test', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-02',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-02T17:30:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Otis technicians verified rope tension and guide lubrication'
  },
  {
    logId: 'FAC-LOG-005',
    auditDate: '2026-08-03',
    facilityCategory: 'Emergency Lighting & Signage',
    hostelBlock: 'Block-A',
    floorLevel: 2,
    locationDescription: 'All Floor 2 Fire Exit Routes',
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
    hydrostaticTestDueDate: '2026-09-03',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-03T16:15:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Emergency escape corridors completely clear and unobstructed'
  },
  {
    logId: 'FAC-LOG-006',
    auditDate: '2026-08-03',
    facilityCategory: 'Mess Hygiene & Food Safety (FSSAI)',
    hostelBlock: 'Dining Complex',
    floorLevel: 0,
    locationDescription: 'Main Mess Kitchen & Grain Store',
    inspectorStaffId: 'STF-SAF-005',
    inspectorName: 'Ananya Sengupta',
    inspectionChecklist: [
      { item: 'Food handler medical health cards valid', result: 'PASS' },
      { item: 'Chef uniforms, hairnets and gloves worn', result: 'PASS' },
      { item: 'Raw vs cooked cutting board color codes', result: 'PASS' },
      { item: 'Oil total polar compounds (TPC < 25%)', result: 'PASS', value: '14%' },
      { item: 'Pest control ultrasonic repellers active', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-03',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-03T18:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Mess kitchen certified Grade-A hygiene standard'
  },
  {
    logId: 'FAC-LOG-007',
    auditDate: '2026-08-04',
    facilityCategory: 'Diesel Generator Backup Systems',
    hostelBlock: 'Central Utility Yard',
    floorLevel: 0,
    locationDescription: 'DG Room Yard 1',
    inspectorStaffId: 'STF-SAF-003',
    inspectorName: 'Rajesh Namboodiri',
    inspectionChecklist: [
      { item: 'Engine lube oil level and viscosity', result: 'PASS' },
      { item: 'Coolant level and radiator fin cleanliness', result: 'PASS' },
      { item: 'AMF panel automatic mains failure start (s)', result: 'PASS', value: '6.2s' },
      { item: 'Exhaust silencer acoustic db rating', result: 'PASS', value: '72 dB' },
      { item: 'Fuel day tank level (> 80% volume)', result: 'PASS', value: '92%' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-10-04',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-04T17:45:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Cummins 250 kVA generator load tested at 80% capacity'
  },
  {
    logId: 'FAC-LOG-008',
    auditDate: '2026-08-04',
    facilityCategory: 'Biometric Access & Turnstiles',
    hostelBlock: 'Main Security Gate',
    floorLevel: 0,
    locationDescription: 'Main Pedestrian Turnstile Array',
    inspectorStaffId: 'STF-SAF-006',
    inspectorName: 'Balaji Ramanathan',
    inspectionChecklist: [
      { item: 'Facial recognition capture speed (< 0.5s)', result: 'PASS', value: '0.28s' },
      { item: 'RFID keycard reader responsiveness', result: 'PASS' },
      { item: 'Tailgating anti-passback sensor trigger', result: 'PASS' },
      { item: 'Fire alarm emergency auto-drop barrier', result: 'PASS' },
      { item: 'UPS backup power retention test 4 hours', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-04',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-04T18:30:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Turnstile gates passed emergency barrier drop drill'
  },
  {
    logId: 'FAC-LOG-009',
    auditDate: '2026-08-05',
    facilityCategory: 'HVAC Air Quality & Duct Hygiene',
    hostelBlock: 'Block-D',
    floorLevel: 1,
    locationDescription: 'Central Reading Hall Ducting',
    inspectorStaffId: 'STF-SAF-002',
    inspectorName: 'Sanjay Deshmukh',
    inspectionChecklist: [
      { item: 'Airborne PM2.5 level (< 25 ug/m3)', result: 'PASS', value: '12 ug/m3' },
      { item: 'CO2 carbon dioxide level (< 800 ppm)', result: 'PASS', value: '540 ppm' },
      { item: 'Relative humidity (40% - 60%)', result: 'PASS', value: '52%' },
      { item: 'Supply air diffuser velocity (CFM)', result: 'PASS', value: '450 CFM' },
      { item: 'HEPA filter pressure drop normal', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-11-05',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-05T16:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Indoor air quality meets international ASHRAE standards'
  },
  {
    logId: 'FAC-LOG-010',
    auditDate: '2026-08-05',
    facilityCategory: 'Solar PV & Inverter Efficiency',
    hostelBlock: 'Central Utility Yard',
    floorLevel: 0,
    locationDescription: 'Solar Inverter Control Room',
    inspectorStaffId: 'STF-SAF-003',
    inspectorName: 'Rajesh Namboodiri',
    inspectionChecklist: [
      { item: 'DC string voltage balance across MPPTs', result: 'PASS', value: '620V balance' },
      { item: 'AC total harmonic distortion (THD < 3%)', result: 'PASS', value: '1.4% THD' },
      { item: 'Surge protection device (SPD) status green', result: 'PASS' },
      { item: 'Inverter heat sink fan speed and temp', result: 'PASS', value: '44 C' },
      { item: 'Lightning protection earth pit resistance', result: 'PASS', value: '0.8 Ohms' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-11-05',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-05T17:15:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Rooftop solar system running at 98.4% peak conversion efficiency'
  }
];

function getStaticFacilityLogs01() {
  return STATIC_FACILITY_LOGS_01;
}

function findStaticFacilityLogById01(logId) {
  return STATIC_FACILITY_LOGS_01.find(log => log.logId === logId) || null;
}

function filterStaticFacilityLogsByCategory01(category) {
  return STATIC_FACILITY_LOGS_01.filter(log => log.facilityCategory.toLowerCase().includes(category.toLowerCase()));
}

function getStaticFacilityComplianceMetrics01() {
  const total = STATIC_FACILITY_LOGS_01.length;
  const compliantCount = STATIC_FACILITY_LOGS_01.filter(log => log.overallStatus === 'Compliant').length;
  const avgRating = STATIC_FACILITY_LOGS_01.reduce((sum, log) => sum + log.complianceRatingPercent, 0) / total;
  return {
    logBatch: 'STATIC_FACILITY_LOGS_01',
    totalAudits: total,
    compliantAudits: compliantCount,
    averageCompliancePercent: parseFloat(avgRating.toFixed(1))
  };
}

module.exports = {
  STATIC_FACILITY_LOGS_01,
  getStaticFacilityLogs01,
  findStaticFacilityLogById01,
  filterStaticFacilityLogsByCategory01,
  getStaticFacilityComplianceMetrics01
};
