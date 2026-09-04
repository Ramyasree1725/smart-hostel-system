/**
 * @fileoverview Smart Hostel Management System - Complete Room Details Dataset Part 1
 * @module backend/database/roomFullDetailsDatasetPart1
 * @description Detailed records for hostel rooms across Blocks A and B.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const ROOM_FULL_DETAILS_PART1 = [];

for (let i = 1; i <= 250; i++) {
  const fl = (i % 5) + 1;
  const rm = (i % 40) + 1;
  const blk = i <= 125 ? 'Block-A' : 'Block-B';
  const prefix = blk === 'Block-A' ? 'A' : 'B';
  const roomNum = `${prefix}-${fl}${String(rm).padStart(2, '0')}`;
  const isAC = (fl === 1 || rm % 3 === 0);
  const cap = (rm % 4 === 0) ? 3 : ((rm % 2 === 0) ? 2 : 1);
  const occ = (i % 6 === 0) ? 0 : cap;

  ROOM_FULL_DETAILS_PART1.push({
    roomIndex: i,
    roomNumber: roomNum,
    block: blk,
    floor: fl,
    genderRestriction: 'MALE',
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
      wifiSignalStrengthDb: -52,
      lastInspectedDate: '2026-08-20'
    }
  });
}

module.exports = {
  ROOM_FULL_DETAILS_PART1
};
