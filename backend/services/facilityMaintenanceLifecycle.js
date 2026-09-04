/**
 * @fileoverview Smart Hostel Management System - Facility Maintenance & Asset Lifecycle Registry
 * @module backend/services/facilityMaintenanceLifecycle
 * @description Master engineering asset database containing comprehensive tracking of HVAC systems,
 * commercial RO water treatment units, silent diesel generators, Otis passenger elevators,
 * fire protection infrastructure, CCTV surveillance networks, and preventive maintenance task schedules.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Master Hostel Engineering Assets Database (500 Registered Equipment Units).
 */
const FACILITY_ASSETS_DATABASE = [];

const ASSET_TYPES = [
  { prefix: 'RO', name: 'Commercial RO Water Treatment Plant 1000 LPH', category: 'Water & Plumbing', cost: 125000, vendor: 'Kent Industrial RO Systems', intervalDays: 30 },
  { prefix: 'GEN', name: 'Cummins Silent Diesel Generator 250 kVA', category: 'Power Backup', cost: 850000, vendor: 'Cummins India Heavy Engineering', intervalDays: 60 },
  { prefix: 'LIFT', name: 'Otis 8-Passenger Automatic Smart Elevator', category: 'Vertical Transport', cost: 1400000, vendor: 'Otis Elevator Company India', intervalDays: 30 },
  { prefix: 'FIRE', name: 'Campus Fire Hydrant Ring Main & Booster Pump', category: 'Fire & Life Safety', cost: 450000, vendor: 'Ceasefire Industries Security', intervalDays: 90 },
  { prefix: 'SOLAR', name: 'Commercial Solar Water Heating Collector 2000 LPD', category: 'Renewable Energy', cost: 280000, vendor: 'Tata Power Solar Systems', intervalDays: 120 },
  { prefix: 'AC', name: 'Daikin Inverter Split AC 1.5 Ton 5-Star', category: 'HVAC & Cooling', cost: 48000, vendor: 'Daikin Airconditioning India', intervalDays: 90 },
  { prefix: 'CCTV', name: 'Hikvision 4K IP Dome Camera with Night Vision', category: 'Surveillance & Security', cost: 8500, vendor: 'Hikvision Digital Technology', intervalDays: 180 },
  { prefix: 'WIFI', name: 'Cisco Catalyst Enterprise Wi-Fi 6 Access Point', category: 'Network Infrastructure', cost: 32000, vendor: 'Cisco Systems India', intervalDays: 180 }
];

const BLOCKS_LIST = ['Block-A', 'Block-B', 'Block-C', 'Block-D', 'Block-E', 'Mess-Central', 'Admin-Building', 'Sports-Complex'];

// Generate 500 detailed facility asset records
for (let i = 1; i <= 500; i++) {
  const assetTemplate = ASSET_TYPES[i % ASSET_TYPES.length];
  const block = BLOCKS_LIST[i % BLOCKS_LIST.length];
  const floor = (i % 5) + 1;
  const assetId = `AST-${assetTemplate.prefix}-${String(i).padStart(4, '0')}`;
  const installYear = 2022 + (i % 4);
  const isDueForService = (i % 7 === 0);

  FACILITY_ASSETS_DATABASE.push({
    assetId: assetId,
    assetName: `${assetTemplate.name} (${block})`,
    category: assetTemplate.category,
    location: {
      block: block,
      floor: `Floor ${floor}`,
      roomOrZone: `Zone ${String.fromCharCode(65 + (i % 4))}`
    },
    purchaseAndWarranty: {
      procurementCostINR: assetTemplate.cost,
      vendorName: assetTemplate.vendor,
      installationDate: `${installYear}-06-15`,
      warrantyExpiryDate: `${installYear + 5}-06-15`,
      annualMaintenanceContract: 'Active AMC (Comprehensive)'
    },
    operationalStatus: isDueForService ? 'MAINTENANCE_DUE' : 'FULLY_OPERATIONAL',
    maintenanceMetrics: {
      inspectionFrequencyDays: assetTemplate.intervalDays,
      lastServicedDate: '2026-08-10',
      nextScheduledServiceDate: isDueForService ? '2026-09-05' : '2026-11-15',
      lifetimeServiceEventsCount: 8 + (i % 12),
      cumulativeMaintenanceCostINR: 12000 + (i % 25) * 1500
    },
    telemetryHealthScore: isDueForService ? 72.0 : 96.5,
    assignedTechnician: {
      engineerName: 'Rajesh Verma (Lead Facility Engineer)',
      phone: '+91 98765 33001',
      contractorAgency: 'Apex Campus Facility Management Pvt Ltd'
    }
  });
}

/**
 * Retrieves facility assets with pending maintenance schedules.
 * @returns {Array<Object>}
 */
function getDueMaintenanceAssets() {
  return FACILITY_ASSETS_DATABASE.filter(a => a.operationalStatus === 'MAINTENANCE_DUE');
}

module.exports = {
  FACILITY_ASSETS_DATABASE,
  getDueMaintenanceAssets
};
