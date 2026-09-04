/**
 * @fileoverview Smart Hostel Management System - Facility Engineering Assets Chunk 02
 * @module backend/database/facilityAssetChunk02
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const FACILITY_ASSET_CHUNK_02 = [];

const ASSETS_C2 = [
  { name: 'Commercial Solar Water Heater 2000 LPD', cat: 'Renewable Energy', cost: 280000, vendor: 'Tata Power Solar' },
  { name: 'Daikin Inverter Split AC 1.5 Ton 5-Star', cat: 'HVAC', cost: 48000, vendor: 'Daikin Air Conditioning' },
  { name: 'Hikvision 4K IP Dome Camera', cat: 'Surveillance', cost: 8500, vendor: 'Hikvision Digital Technology' },
  { name: 'Cisco Catalyst Wi-Fi 6 Enterprise AP', cat: 'Network Infrastructure', cost: 32000, vendor: 'Cisco Systems India' }
];

for (let i = 1; i <= 100; i++) {
  const tpl = ASSETS_C2[i % ASSETS_C2.length];
  FACILITY_ASSET_CHUNK_02.push({
    chunkId: 'AST-CHK-02',
    assetIndex: i,
    assetTagId: `AST-C2-${String(i).padStart(4, '0')}`,
    equipmentName: `${tpl.name} (#${i})`,
    category: tpl.cat,
    costINR: tpl.cost,
    installationDate: '2023-08-20',
    serviceStatus: (i % 6 === 0) ? 'SERVICE_DUE' : 'OPTIMAL_OPERATIONAL',
    lastServicedDate: '2026-08-15',
    amcContractVendor: tpl.vendor
  });
}

module.exports = {
  FACILITY_ASSET_CHUNK_02
};
