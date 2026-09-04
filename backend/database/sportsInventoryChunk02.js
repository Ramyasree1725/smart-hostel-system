/**
 * @fileoverview Smart Hostel Management System - Sports & Gym Inventory Chunk 02
 * @module backend/database/sportsInventoryChunk02
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const SPORTS_INVENTORY_CHUNK_02 = [];

const SPORTS_C2 = [
  { name: 'SS English Willow Cricket Bat Full Size', cat: 'Cricket', cost: 6500 },
  { name: 'Olympic 20kg Barbells & Cast Iron Plates 50kg', cat: 'Gymnasium', cost: 14000 },
  { name: 'Commercial Motorized Treadmill 4.0 HP', cat: 'Gymnasium', cost: 95000 },
  { name: 'Carrom Board 32-Inch Championship Edition', cat: 'Indoor Games', cost: 4200 }
];

for (let i = 1; i <= 100; i++) {
  const tpl = SPORTS_C2[i % SPORTS_C2.length];
  SPORTS_INVENTORY_CHUNK_02.push({
    chunkId: 'SPT-CHK-02',
    itemIndex: i,
    itemTag: `SPT-C2-${String(i).padStart(4, '0')}`,
    itemName: `${tpl.name} (#${i})`,
    category: tpl.cat,
    replacementCostINR: tpl.cost,
    condition: 'EXCELLENT',
    status: (i % 5 === 0) ? 'CHECKED_OUT' : 'AVAILABLE_IN_LOCKER',
    currentHolder: (i % 5 === 0) ? `Resident STU-${2000 + i}` : null
  });
}

module.exports = {
  SPORTS_INVENTORY_CHUNK_02
};
