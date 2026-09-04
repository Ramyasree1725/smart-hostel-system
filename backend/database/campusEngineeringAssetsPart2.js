/**
 * @fileoverview Smart Hostel Management System - Campus Engineering Assets Part 2
 * @module backend/database/campusEngineeringAssetsPart2
 * @description Engineering asset registry records 251 to 500.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const CAMPUS_ASSETS_PART2 = [];

const ASSET_CATALOG_2 = [
  { name: 'Commercial Solar Water Heater 2000 LPD', cat: 'Renewable Energy', cost: 280000 },
  { name: 'Daikin Inverter Split AC 1.5 Ton 5-Star', cat: 'HVAC', cost: 48000 },
  { name: 'Hikvision 4K IP Dome Night Vision Camera', cat: 'Surveillance', cost: 8500 },
  { name: 'Cisco Catalyst Wi-Fi 6 Enterprise AP', cat: 'Network Infrastructure', cost: 32000 }
];

for (let i = 251; i <= 500; i++) {
  const tpl = ASSET_CATALOG_2[i % ASSET_CATALOG_2.length];
  CAMPUS_ASSETS_PART2.push({
    assetUid: `AST-P2-${String(i).padStart(4, '0')}`,
    assetTag: `AST-TAG-${10000 + i}`,
    description: `${tpl.name} (#${i})`,
    category: tpl.cat,
    costINR: tpl.cost,
    installationDate: '2023-08-20',
    status: (i % 6 === 0) ? 'SERVICE_DUE' : 'OPTIMAL_OPERATIONAL',
    lastServicedDate: '2026-08-15',
    assignedEngineer: 'Rajesh Verma (Lead Engineer)'
  });
}

module.exports = {
  CAMPUS_ASSETS_PART2
};
