/**
 * @fileoverview Smart Hostel Management System - Facility Engineering Assets Chunk 04
 * @module backend/database/facilityAssetChunk04
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const FACILITY_ASSET_CHUNK_04 = [];

const ASSETS_C4 = [
  { name: 'Panasonic 65-Inch Smart 4K Common Room TV', cat: 'Entertainment', cost: 72000, vendor: 'Panasonic India' },
  { name: 'Voltas 500-Litre Deep Freezer Kitchen Unit', cat: 'Kitchen Equipment', cost: 65000, vendor: 'Voltas Commercial' },
  { name: 'Hobart Commercial Dishwasher Sanitizer 800 Plates/Hr', cat: 'Kitchen Equipment', cost: 320000, vendor: 'Hobart India' },
  { name: 'Honeywell Automatic Fire Smoke Detector Array', cat: 'Life Safety', cost: 18000, vendor: 'Honeywell Building Solutions' }
];

for (let i = 1; i <= 100; i++) {
  const tpl = ASSETS_C4[i % ASSETS_C4.length];
  FACILITY_ASSET_CHUNK_04.push({
    chunkId: 'AST-CHK-04',
    assetIndex: i,
    assetTagId: `AST-C4-${String(i).padStart(4, '0')}`,
    equipmentName: `${tpl.name} (#${i})`,
    category: tpl.cat,
    costINR: tpl.cost,
    installationDate: '2024-01-15',
    serviceStatus: (i % 6 === 0) ? 'SERVICE_DUE' : 'OPTIMAL_OPERATIONAL',
    lastServicedDate: '2026-08-25',
    amcContractVendor: tpl.vendor
  });
}

module.exports = {
  FACILITY_ASSET_CHUNK_04
};
