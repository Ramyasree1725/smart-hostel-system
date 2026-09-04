/**
 * @fileoverview Smart Hostel Management System - Sports & Gym Inventory Chunk 01
 * @module backend/database/sportsInventoryChunk01
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const SPORTS_INVENTORY_CHUNK_01 = [];

const SPORTS_C1 = [
  { name: 'Yonex Carbon Graphite Badminton Racket', cat: 'Badminton', cost: 3500 },
  { name: 'Stag 4-Star Table Tennis Racket Set', cat: 'Table Tennis', cost: 2200 },
  { name: 'Spalding Official Basketball Size 7', cat: 'Basketball', cost: 2800 },
  { name: 'Nivia Premier League Football Size 5', cat: 'Football', cost: 1900 }
];

for (let i = 1; i <= 100; i++) {
  const tpl = SPORTS_C1[i % SPORTS_C1.length];
  SPORTS_INVENTORY_CHUNK_01.push({
    chunkId: 'SPT-CHK-01',
    itemIndex: i,
    itemTag: `SPT-C1-${String(i).padStart(4, '0')}`,
    itemName: `${tpl.name} (#${i})`,
    category: tpl.cat,
    replacementCostINR: tpl.cost,
    condition: 'EXCELLENT',
    status: (i % 5 === 0) ? 'CHECKED_OUT' : 'AVAILABLE_IN_LOCKER',
    currentHolder: (i % 5 === 0) ? `Resident STU-${1000 + i}` : null
  });
}

module.exports = {
  SPORTS_INVENTORY_CHUNK_01
};
