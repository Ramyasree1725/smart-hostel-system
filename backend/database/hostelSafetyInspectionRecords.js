/**
 * @fileoverview Smart Hostel Management System - Disaster Safety & Inspection Audit Master
 * @module backend/database/hostelSafetyInspectionRecords
 * @description Master catalog containing 1,000 fire protection hardware inspections, emergency exit lighting audits,
 * smoke detector battery checks, and hydrostatic pressure testing records.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const FULL_SAFETY_INSPECTIONS_DATABASE = [];

const HARDWARE_TYPES = [
  'ABC Dry Chemical Powder Extinguisher 6kg',
  'Carbon Dioxide CO2 Extinguisher 4.5kg',
  'Mechanical Foam AFFF Extinguisher 9 Litres',
  'Emergency Exit LED Photoluminescent Signage',
  'Photoelectric Smoke Detector & Alarm'
];

const BLOCKS = ['Block-A', 'Block-B', 'Block-C', 'Block-D', 'Block-E', 'Mess-Hall', 'Auditorium'];

for (let i = 1; i <= 1000; i++) {
  const hw = HARDWARE_TYPES[i % HARDWARE_TYPES.length];
  const blk = BLOCKS[i % BLOCKS.length];
  const fl = (i % 5) + 1;
  const serial = `SAFE-${String(i).padStart(5, '0')}`;

  FULL_SAFETY_INSPECTIONS_DATABASE.push({
    inspectionIndex: i,
    equipmentSerial: serial,
    equipmentType: hw,
    location: `${blk} - Floor ${fl} Pillar ${String.fromCharCode(65 + (i % 6))}`,
    lastPressureTestDate: '2026-07-20',
    nextDueInspectionDate: '2027-01-20',
    pressureGaugeStatus: 'OPTIMAL_GREEN_ZONE',
    safetySealVerified: true,
    inspectorOfficial: 'Inspector Arvind Joshi (Fire & Disaster Management Directorate)'
  });
}

module.exports = {
  FULL_SAFETY_INSPECTIONS_DATABASE
};
