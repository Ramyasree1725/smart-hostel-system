/**
 * @fileoverview Smart Hostel Management System - Campus Engineering Assets Part 1
 * @module backend/database/campusEngineeringAssetsPart1
 * @description Engineering asset registry records 1 to 250.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const CAMPUS_ASSETS_PART1 = [];

const ASSET_CATALOG = [
  { name: 'Commercial RO Water Plant 1000 LPH', cat: 'Water & Plumbing', cost: 120000 },
  { name: 'Cummins Silent DG Set 250 kVA', cat: 'Power Backup', cost: 850000 },
  { name: 'Otis Automatic 8-Passenger Elevator', cat: 'Vertical Transport', cost: 1400000 },
  { name: 'Campus Fire Hydrant Ring Station', cat: 'Life Safety', cost: 450000 }
];

for (let i = 1; i <= 250; i++) {
  const tpl = ASSET_CATALOG[i % ASSET_CATALOG.length];
  CAMPUS_ASSETS_PART1.push({
    assetUid: `AST-P1-${String(i).padStart(4, '0')}`,
    assetTag: `AST-TAG-${10000 + i}`,
    description: `${tpl.name} (#${i})`,
    category: tpl.cat,
    costINR: tpl.cost,
    installationDate: '2023-06-15',
    status: (i % 7 === 0) ? 'SERVICE_DUE' : 'OPTIMAL_OPERATIONAL',
    lastServicedDate: '2026-08-10',
    assignedEngineer: 'Rajesh Verma (Lead Engineer)'
  });
}

module.exports = {
  CAMPUS_ASSETS_PART1
};
