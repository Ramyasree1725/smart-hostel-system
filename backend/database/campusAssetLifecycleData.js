/**
 * @fileoverview Smart Hostel Management System - Complete Campus Engineering Asset Lifecycle Database
 * @module backend/database/campusAssetLifecycleData
 * @description Master catalog containing 1,000 engineering assets (commercial RO plants, silent diesel generators,
 * Otis passenger lifts, fire hydrant networks, solar water heaters, Daikin AC units, CCTV IP cameras, Cisco Wi-Fi 6 APs).
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const FULL_CAMPUS_ASSETS_DATABASE = [];

const ASSET_CATALOG = [
  { prefix: 'RO', name: 'Commercial RO Water Treatment Plant 1000 LPH', category: 'Plumbing & Water', cost: 120000, vendor: 'Kent Industrial Water Systems' },
  { prefix: 'GEN', name: 'Cummins Silent Diesel Generator 250 kVA', category: 'Power Backup', cost: 850000, vendor: 'Cummins India Heavy Eng' },
  { prefix: 'LIFT', name: 'Otis Automatic 8-Passenger Smart Elevator', category: 'Vertical Mobility', cost: 1450000, vendor: 'Otis Elevators India' },
  { prefix: 'FIRE', name: 'Campus Fire Hydrant Ring Booster Station', category: 'Life Safety', cost: 480000, vendor: 'Ceasefire Industries' },
  { prefix: 'SOLAR', name: 'Solar Water Heating System 2000 LPD', category: 'Green Energy', cost: 290000, vendor: 'Tata Power Solar' },
  { prefix: 'AC', name: 'Daikin Inverter Split AC 1.5 Ton 5-Star', category: 'HVAC', cost: 49000, vendor: 'Daikin Air Conditioning' },
  { prefix: 'CCTV', name: 'Hikvision 4K IP Dome Night Vision Camera', category: 'Security & Surveillance', cost: 8800, vendor: 'Hikvision Digital Technology' },
  { prefix: 'WIFI', name: 'Cisco Catalyst Wi-Fi 6 Enterprise AP', category: 'Network Infrastructure', cost: 34000, vendor: 'Cisco Systems India' }
];

const BLOCKS = ['Block-A', 'Block-B', 'Block-C', 'Block-D', 'Block-E', 'Mess-Central', 'Admin-Block', 'Library-Complex'];

for (let i = 1; i <= 1000; i++) {
  const cat = ASSET_CATALOG[i % ASSET_CATALOG.length];
  const block = BLOCKS[i % BLOCKS.length];
  const floor = (i % 5) + 1;
  const assetTag = `AST-${cat.prefix}-${String(i).padStart(5, '0')}`;
  const isDueService = (i % 6 === 0);

  FULL_CAMPUS_ASSETS_DATABASE.push({
    assetIndex: i,
    assetTagNumber: assetTag,
    assetDescription: `${cat.name} (${block})`,
    categoryName: cat.category,
    installationLocation: {
      blockIdentifier: block,
      floorLevel: `Floor ${floor}`,
      zoneArea: `Zone ${String.fromCharCode(65 + (i % 4))}`
    },
    commercialInfo: {
      procurementCostINR: cat.cost,
      vendorSupplier: cat.vendor,
      commissioningDate: `2023-06-15`,
      warrantyValidUntil: `2028-06-15`,
      amcContractStatus: 'Active Comprehensive AMC'
    },
    serviceHealth: {
      status: isDueService ? 'SERVICE_DUE' : 'OPTIMAL_OPERATIONAL',
      healthTelemetryScore: isDueService ? 74.0 : 98.2,
      lastInspectionDate: '2026-08-10',
      nextScheduledServiceDate: isDueService ? '2026-09-06' : '2026-11-20'
    }
  });
}

module.exports = {
  FULL_CAMPUS_ASSETS_DATABASE
};
