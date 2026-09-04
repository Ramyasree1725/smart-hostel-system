/**
 * @fileoverview Smart Hostel Management System - Room Master Topology Chunk 05
 * @module backend/database/roomInventoryChunk05
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const ROOM_INVENTORY_CHUNK_05 = [];

for (let i = 1; i <= 100; i++) {
  const fl = (i % 3) + 1;
  const rm = `E-${fl}${String((i % 25) + 1).padStart(2, '0')}`;
  const isAC = (fl === 1 || i % 2 === 0);
  const cap = 1;
  const isVacant = (i % 5 === 0);

  ROOM_INVENTORY_CHUNK_05.push({
    chunkId: 'CHK-RM-05',
    roomIndex: i,
    roomNumber: rm,
    blockName: 'Block-E',
    floorLevel: fl,
    genderGroup: 'CO_ED',
    roomCategory: isAC ? 'Scholar Studio AC' : 'Standard Non-AC',
    totalBedCapacity: cap,
    currentOccupancyCount: isVacant ? 0 : cap,
    roomStatus: isVacant ? 'VACANT' : 'FULLY_OCCUPIED',
    isAirConditioned: isAC,
    baseFeeSemesterINR: isAC ? 75000 : 50000,
    wardenAssigned: 'Prof. A. Banerjee',
    hasPrivateWashroom: isAC,
    hasBalcony: true,
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
  ROOM_INVENTORY_CHUNK_05
};
