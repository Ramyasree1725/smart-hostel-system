/**
 * @fileoverview Smart Hostel Management System - Master Room Catalog Part A
 * @module backend/database/hostelRoomMasterCatalogA
 * @description Detailed inventory records for rooms in Block A.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const ROOMS_BLOCK_A_CATALOG = [];

for (let i = 1; i <= 100; i++) {
  const fl = (i % 4) + 1;
  const rmNum = `A-${fl}${String((i % 25) + 1).padStart(2, '0')}`;
  const isAC = (fl === 1 || i % 3 === 0);
  const cap = (i % 2 === 0) ? 2 : 1;
  const isVacant = (i % 6 === 0);

  ROOMS_BLOCK_A_CATALOG.push({
    roomId: `RM-A-${String(i).padStart(3, '0')}`,
    roomNumber: rmNum,
    block: 'Block-A',
    floor: fl,
    genderRestriction: 'MALE',
    roomType: isAC ? (cap === 1 ? 'Single Premium AC' : 'Double Deluxe AC') : (cap === 1 ? 'Single Standard' : 'Double Standard'),
    capacity: cap,
    currentOccupants: isVacant ? 0 : cap,
    status: isVacant ? 'VACANT' : 'FULLY_OCCUPIED',
    isAirConditioned: isAC,
    baseFeeSemesterINR: isAC ? (cap === 1 ? 75000 : 55000) : (cap === 1 ? 50000 : 45000),
    amenities: [
      'Wooden Single Bed Frame',
      'Comfort Foam Mattress',
      'Study Table with Lamp',
      'Ergonomic Mesh Chair',
      'Steel Double Almirah',
      'Ceiling Fan 1200mm'
    ],
    inspectionStatus: 'OK',
    lastSanitizedDate: '2026-08-25'
  });
}

module.exports = {
  ROOMS_BLOCK_A_CATALOG
};
