/**
 * @fileoverview Smart Hostel Management System - Complete Room Details Dataset Part 2
 * @module backend/database/roomFullDetailsDatasetPart2
 * @description Detailed records for hostel rooms across Blocks C, D, and E.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const ROOM_FULL_DETAILS_PART2 = [];

for (let i = 251; i <= 500; i++) {
  const fl = (i % 5) + 1;
  const rm = (i % 40) + 1;
  const blk = i <= 375 ? 'Block-C' : (i <= 440 ? 'Block-D' : 'Block-E');
  const prefix = blk.replace('Block-', '');
  const roomNum = `${prefix}-${fl}${String(rm).padStart(2, '0')}`;
  const isAC = (fl === 1 || rm % 2 === 0);
  const cap = (rm % 3 === 0) ? 2 : 1;
  const occ = (i % 5 === 0) ? 0 : cap;

  ROOM_FULL_DETAILS_PART2.push({
    roomIndex: i,
    roomNumber: roomNum,
    block: blk,
    floor: fl,
    genderRestriction: (blk === 'Block-E' ? 'CO_ED' : 'FEMALE'),
    capacity: cap,
    occupiedBeds: occ,
    vacantBeds: cap - occ,
    status: occ === 0 ? 'VACANT' : (occ < cap ? 'PARTIALLY_OCCUPIED' : 'FULLY_OCCUPIED'),
    isAirConditioned: isAC,
    semesterFeeINR: isAC ? (cap === 1 ? 75000 : 55000) : (cap === 1 ? 50000 : 45000),
    amenitiesList: [
      'Wooden Cot with Underbed Storage',
      'Comfort Foam Mattress',
      'Study Table with Reading Light',
      'Ergonomic Mesh Chair',
      'Dual Door Steel Cupboard',
      'Ceiling Fan 1200mm'
    ],
    inspectionTelemetry: {
      powerStatus: 'OK',
      waterSupplyStatus: 'OK',
      wifiSignalStrengthDb: -48,
      lastInspectedDate: '2026-08-22'
    }
  });
}

module.exports = {
  ROOM_FULL_DETAILS_PART2
};
