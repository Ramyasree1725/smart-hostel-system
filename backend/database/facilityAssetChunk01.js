/**
 * @fileoverview Smart Hostel Management System - Facility Engineering Assets Chunk 01
 * @module backend/database/facilityAssetChunk01
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const FACILITY_ASSET_CHUNK_01 = [];

const ASSETS_C1 = [
  { name: 'Commercial RO Water Plant 1000 LPH', cat: 'Water & Plumbing', cost: 120000, vendor: 'Kent RO Systems' },
  { name: 'Cummins Silent DG Set 250 kVA', cat: 'Power Backup', cost: 850000, vendor: 'Cummins India Heavy' },
  { name: 'Otis Automatic 8-Passenger Elevator', cat: 'Vertical Transport', cost: 1400000, vendor: 'Otis Elevators India' },
  { name: 'Campus Fire Hydrant Ring Station', cat: 'Life Safety', cost: 450000, vendor: 'Ceasefire Industries' }
];

for (let i = 1; i <= 100; i++) {
  const tpl = ASSETS_C1[i % ASSETS_C1.length];
  FACILITY_ASSET_CHUNK_01.push({
    chunkId: 'AST-CHK-01',
    assetIndex: i,
    assetTagId: `AST-C1-${String(i).padStart(4, '0')}`,
    equipmentName: `${tpl.name} (#${i})`,
    category: tpl.cat,
    costINR: tpl.cost,
    installationDate: '2023-06-15',
    serviceStatus: (i % 7 === 0) ? 'SERVICE_DUE' : 'OPTIMAL_OPERATIONAL',
    lastServicedDate: '2026-08-10',
    amcContractVendor: tpl.vendor
  });
}

module.exports = {
  FACILITY_ASSET_CHUNK_01
};
