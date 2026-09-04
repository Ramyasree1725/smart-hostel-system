/**
 * @fileoverview Smart Hostel Management System - Room Master Topology Chunk 01
 * @module backend/database/roomInventoryChunk01
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const ROOM_INVENTORY_CHUNK_01 = [];

for (let i = 1; i <= 100; i++) {
  const fl = (i % 4) + 1;
  const rm = `A-${fl}${String((i % 25) + 1).padStart(2, '0')}`;
  const isAC = (fl === 1 || i % 3 === 0);
  const cap = (i % 2 === 0) ? 2 : 1;
  const isVacant = (i % 6 === 0);

  ROOM_INVENTORY_CHUNK_01.push({
    chunkId: 'CHK-RM-01',
    roomIndex: i,
    roomNumber: rm,
    blockName: 'Block-A',
    floorLevel: fl,
    genderGroup: 'MALE',
    roomCategory: isAC ? 'Executive AC' : 'Standard Non-AC',
    totalBedCapacity: cap,
    currentOccupancyCount: isVacant ? 0 : cap,
    roomStatus: isVacant ? 'VACANT' : 'FULLY_OCCUPIED',
    isAirConditioned: isAC,
    baseFeeSemesterINR: isAC ? 55000 : 45000,
    wardenAssigned: 'Dr. K. V. Sharma',
    hasPrivateWashroom: isAC,
    hasBalcony: (i % 3 === 0),
    amenityChecklist: [
      'Wooden Single Bed with Storage',
      'Orthopedic Mattress',
      'Laminated Study Desk',
      'Ergonomic Mesh Chair',
      'Dual Door Almirah',
      'Ceiling Fan 1200mm'
    ],
    inspectionStatus: 'OK_PASSED',
    lastSanitizedDate: '2026-08-25'
  });
}

module.exports = {
  ROOM_INVENTORY_CHUNK_01
};
