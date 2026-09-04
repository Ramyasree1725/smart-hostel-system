/**
 * @fileoverview Smart Hostel Management System - Static Facility & Safety Compliance Log 05
 * @module backend/database/staticFacilityLog05
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const STATIC_FACILITY_LOGS_05 = [
  {
    logId: 'FAC-LOG-041',
    auditDate: '2026-08-21',
    facilityCategory: 'Fire & Life Safety',
    hostelBlock: 'Dining Complex',
    floorLevel: 0,
    locationDescription: 'Kitchen Wet Chemical Fire Suppression System',
    inspectorStaffId: 'STF-SAF-001',
    inspectorName: 'Devraj Chauhan',
    inspectionChecklist: [
      { item: 'Ansul R-102 wet chemical cylinder pressure', result: 'PASS' },
      { item: 'Thermal fusible link rating (360F/182C)', result: 'PASS' },
      { item: 'Manual pull station clear of obstacles', result: 'PASS' },
      { item: 'Gas supply automatic shut-off valve linkage', result: 'PASS' },
      { item: 'Discharge nozzles aligned over deep fryers and ranges', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2027-08-21',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-21T16:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Kitchen hood automatic fire suppression system certified 100% operational'
  },
  {
    logId: 'FAC-LOG-042',
    auditDate: '2026-08-21',
    facilityCategory: 'Water Sanitation & Quality',
    hostelBlock: 'Central Utility Yard',
    floorLevel: 0,
    locationDescription: 'STP Plant Recycled Water Quality Hub',
    inspectorStaffId: 'STF-SAF-002',
    inspectorName: 'Sanjay Deshmukh',
    inspectionChecklist: [
      { item: 'Treated water turbidity (< 2 NTU)', result: 'PASS', value: '1.1 NTU' },
      { item: 'Biological Oxygen Demand BOD (< 10 mg/L)', result: 'PASS', value: '6.4 mg/L' },
      { item: 'Chemical Oxygen Demand COD (< 50 mg/L)', result: 'PASS', value: '28.0 mg/L' },
      { item: 'Residual Chlorine for gardening line (> 1.0 ppm)', result: 'PASS', value: '1.4 ppm' },
      { item: 'Fecal coliform count (Nil / 100ml)', result: 'PASS', value: '0 MPN' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-21',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-21T16:30:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Pollution control board norms for non-potable reuse fully met'
  },
  {
    logId: 'FAC-LOG-043',
    auditDate: '2026-08-22',
    facilityCategory: 'Electrical Safety & Distribution',
    hostelBlock: 'Central Utility Yard',
    floorLevel: 0,
    locationDescription: 'Main 11kV Substation Switchgear Room',
    inspectorStaffId: 'STF-SAF-003',
    inspectorName: 'Rajesh Namboodiri',
    inspectionChecklist: [
      { item: 'Vacuum Circuit Breaker (VCB) SF6 / Vacuum gauge', result: 'PASS' },
      { item: 'Over-current and earth fault numeric relay test', result: 'PASS' },
      { item: 'Rubber insulating matting (15kV rated, IS 15652)', result: 'PASS' },
      { item: 'Substation SF6 room exhaust ventilation', result: 'PASS' },
      { item: 'Insulated rescue hook and First Aid shock kit', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-11-22',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-22T17:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'High voltage HT yard safety equipment inspected and certified'
  },
  {
    logId: 'FAC-LOG-044',
    auditDate: '2026-08-22',
    facilityCategory: 'Elevator Safety & Mechanism',
    hostelBlock: 'Block-D',
    floorLevel: 0,
    locationDescription: 'Service / Freight Elevator Shaft',
    inspectorStaffId: 'STF-SAF-004',
    inspectorName: 'Harish Varma',
    inspectionChecklist: [
      { item: 'Capacity test 1000 kg with full test weights', result: 'PASS', value: '1000 kg' },
      { item: 'Door interlock safety microswitch contact', result: 'PASS' },
      { item: 'Buffer springs in elevator pit intact', result: 'PASS' },
      { item: 'Car top inspection control switch operation', result: 'PASS' },
      { item: 'Brake liner thickness (> 8mm)', result: 'PASS', value: '11.5mm' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-22',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-22T17:30:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Service lift heavy duty load test passed'
  },
  {
    logId: 'FAC-LOG-045',
    auditDate: '2026-08-23',
    facilityCategory: 'Emergency Lighting & Signage',
    hostelBlock: 'Dining Complex',
    floorLevel: 1,
    locationDescription: 'Mess Hall Emergency Egress Doors',
    inspectorStaffId: 'STF-SAF-001',
    inspectorName: 'Devraj Chauhan',
    inspectionChecklist: [
      { item: 'Double-leaf emergency exit panic push bars', result: 'PASS' },
      { item: 'LED backlit emergency route guidance', result: 'PASS' },
      { item: 'External egress staircase illumination', result: 'PASS' },
      { item: 'Alarm strobe light audible buzzer sync', result: 'PASS' },
      { item: 'Evacuation assembly point ground marking', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-23',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-23T16:15:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Dining complex mass evacuation pathways verified'
  },
  {
    logId: 'FAC-LOG-046',
    auditDate: '2026-08-23',
    facilityCategory: 'Mess Hygiene & Food Safety (FSSAI)',
    hostelBlock: 'Dining Complex',
    floorLevel: 0,
    locationDescription: 'Dry Spice & Grain Silo Store',
    inspectorStaffId: 'STF-SAF-005',
    inspectorName: 'Ananya Sengupta',
    inspectionChecklist: [
      { item: 'FIFO First-In First-Out inventory tracking', result: 'PASS' },
      { item: 'Grain moisture meter testing (< 12%)', result: 'PASS', value: '9.8%' },
      { item: 'Pallet distance from wall (> 15cm airflow gap)', result: 'PASS' },
      { item: 'Rodent proof metal door kick-plates', result: 'PASS' },
      { item: 'Pheromone insect monitoring traps active', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-23',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-23T18:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Raw ingredient grain store certified pest-free and dry'
  },
  {
    logId: 'FAC-LOG-047',
    auditDate: '2026-08-24',
    facilityCategory: 'Diesel Generator Backup Systems',
    hostelBlock: 'Central Utility Yard',
    floorLevel: 0,
    locationDescription: 'DG Acoustic Canopy Enclosure Yard 1',
    inspectorStaffId: 'STF-SAF-003',
    inspectorName: 'Rajesh Namboodiri',
    inspectionChecklist: [
      { item: 'Rockwool acoustic insulation lining integrity', result: 'PASS' },
      { item: 'Rainproof motorized intake louvers', result: 'PASS' },
      { item: 'Anti-vibration rubber bellows & mounts', result: 'PASS' },
      { item: 'Battery trickle charger overcharge protection', result: 'PASS' },
      { item: 'Oil drip containment tray clean and dry', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-10-24',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-24T17:45:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Soundproof canopy acoustic attenuation verified (< 75 dBA at 1 meter)'
  },
  {
    logId: 'FAC-LOG-048',
    auditDate: '2026-08-24',
    facilityCategory: 'Biometric Access & Turnstiles',
    hostelBlock: 'Server & IT Center',
    floorLevel: 1,
    locationDescription: 'Data Center Biometric Airlock Door',
    inspectorStaffId: 'STF-SAF-006',
    inspectorName: 'Balaji Ramanathan',
    inspectionChecklist: [
      { item: 'Dual authentication (Fingerprint + PIN passcode)', result: 'PASS' },
      { item: 'Mantrap airlock interlocking door control', result: 'PASS' },
      { item: 'High-security electric strike release time', result: 'PASS' },
      { item: 'CCTV camera face capture event sync', result: 'PASS' },
      { item: 'Anti-spoofing live tissue detection algorithm', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-09-24',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-24T18:30:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Server room physical security meets Tier-3 data center standard'
  },
  {
    logId: 'FAC-LOG-049',
    auditDate: '2026-08-25',
    facilityCategory: 'HVAC Air Quality & Duct Hygiene',
    hostelBlock: 'Server & IT Center',
    floorLevel: 1,
    locationDescription: 'Precision Air Conditioning (PAC) Server Unit',
    inspectorStaffId: 'STF-SAF-002',
    inspectorName: 'Sanjay Deshmukh',
    inspectionChecklist: [
      { item: 'Server room temperature (20C +/- 1C)', result: 'PASS', value: '20.1 C' },
      { item: 'Relative humidity (45% - 55%)', result: 'PASS', value: '49%' },
      { item: 'Dual PAC unit automatic redundancy rotation', result: 'PASS' },
      { item: 'Under-floor airflow static pressure (Pa)', result: 'PASS', value: '25 Pa' },
      { item: 'Water leak sensing rope beneath raised floor', result: 'PASS' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-11-25',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-25T16:00:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Precision climate control operating at 100% uptime'
  },
  {
    logId: 'FAC-LOG-050',
    auditDate: '2026-08-25',
    facilityCategory: 'Solar PV & Inverter Efficiency',
    hostelBlock: 'Dining Complex',
    floorLevel: 2,
    roomLocation: 'Rooftop Solar Water Heating Array',
    inspectorStaffId: 'STF-SAF-003',
    inspectorName: 'Rajesh Namboodiri',
    inspectionChecklist: [
      { item: 'Evacuated glass tube integrity (zero breakage)', result: 'PASS' },
      { item: 'Manifold hot water output temperature (65C - 75C)', result: 'PASS', value: '71 C' },
      { item: 'Magnesium sacrificial anode corrosion check', result: 'PASS' },
      { item: 'Pressure and temperature relief safety valve', result: 'PASS' },
      { item: 'Polyurethane foam tank insulation thermal loss (< 2C)', result: 'PASS', value: '1.2 C' }
    ],
    overallStatus: 'Compliant',
    hydrostaticTestDueDate: '2026-11-25',
    correctiveActionRequired: false,
    correctiveActionDetails: 'None',
    supervisorApprovalDate: '2026-08-25T17:15:00.000Z',
    complianceRatingPercent: 100,
    remarks: 'Mess solar hot water array supplying 5000 liters at 71C daily'
  }
];

function getStaticFacilityLogs05() {
  return STATIC_FACILITY_LOGS_05;
}

function findStaticFacilityLogById05(logId) {
  return STATIC_FACILITY_LOGS_05.find(log => log.logId === logId) || null;
}

function filterStaticFacilityLogsByCategory05(category) {
  return STATIC_FACILITY_LOGS_05.filter(log => log.facilityCategory.toLowerCase().includes(category.toLowerCase()));
}

function getStaticFacilityComplianceMetrics05() {
  const total = STATIC_FACILITY_LOGS_05.length;
  const compliantCount = STATIC_FACILITY_LOGS_05.filter(log => log.overallStatus === 'Compliant').length;
  const avgRating = STATIC_FACILITY_LOGS_05.reduce((sum, log) => sum + log.complianceRatingPercent, 0) / total;
  return {
    logBatch: 'STATIC_FACILITY_LOGS_05',
    totalAudits: total,
    compliantAudits: compliantCount,
    averageCompliancePercent: parseFloat(avgRating.toFixed(1))
  };
}

module.exports = {
  STATIC_FACILITY_LOGS_05,
  getStaticFacilityLogs05,
  findStaticFacilityLogById05,
  filterStaticFacilityLogsByCategory05,
  getStaticFacilityComplianceMetrics05
};
