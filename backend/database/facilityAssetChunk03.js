/**
 * @fileoverview Smart Hostel Management System - Facility Engineering Assets Chunk 03
 * @module backend/database/facilityAssetChunk03
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const FACILITY_ASSET_CHUNK_03 = [];

const ASSETS_C3 = [
  { name: 'Grundfos Water Hydro-Pneumatic Booster Pump', cat: 'Water Supply', cost: 95000, vendor: 'Grundfos Pumps India' },
  { name: 'Schneider Electric Smart Power Distribution Panel', cat: 'Electrical', cost: 160000, vendor: 'Schneider Electric' },
  { name: 'Commercial Industrial Washing Machine 15kg', cat: 'Laundry Services', cost: 185000, vendor: 'IFB Industrial' },
  { name: 'Biometric Access Control Turnstile Gate', cat: 'Perimeter Security', cost: 110000, vendor: 'ZKTeco India' }
];

for (let i = 1; i <= 100; i++) {
  const tpl = ASSETS_C3[i % ASSETS_C3.length];
  FACILITY_ASSET_CHUNK_03.push({
    chunkId: 'AST-CHK-03',
    assetIndex: i,
    assetTagId: `AST-C3-${String(i).padStart(4, '0')}`,
    equipmentName: `${tpl.name} (#${i})`,
    category: tpl.cat,
    costINR: tpl.cost,
    installationDate: '2023-11-10',
    serviceStatus: (i % 7 === 0) ? 'SERVICE_DUE' : 'OPTIMAL_OPERATIONAL',
    lastServicedDate: '2026-08-20',
    amcContractVendor: tpl.vendor
  });
}

module.exports = {
  FACILITY_ASSET_CHUNK_03
};
