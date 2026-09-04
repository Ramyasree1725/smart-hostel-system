/**
 * @fileoverview Smart Hostel Management System - Facility Maintenance & Asset Lifecycle Service
 * @module backend/services/facilityMaintenanceService
 * @description Preventive maintenance schedules for HVAC, geysers, water purifiers, elevator maintenance,
 * generator servicing, spare parts inventory, and warranty tracking.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Hostel facility asset classes.
 * @readonly
 * @enum {string}
 */
const ASSET_CATEGORIES = Object.freeze({
  HVAC_AIR_CONDITIONING: 'HVAC & Air Conditioning',
  WATER_PURIFIER_RO: 'Commercial RO Water Plants',
  GEYSER_SOLAR_WATER: 'Solar Water Heaters & Geysers',
  ELEVATOR_LIFT: 'Elevators & Escalators',
  DIESEL_GENERATOR_BACKUP: 'Backup Diesel Generator 250kVA',
  FIRE_SAFETY_SYSTEM: 'Fire Alarm & Hydrant Extinguishers',
  CCTV_SURVEILLANCE: 'CCTV Cameras & NVR Systems'
});

/**
 * Maintenance frequencies.
 * @readonly
 * @enum {string}
 */
const MAINTENANCE_INTERVALS = Object.freeze({
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  BI_ANNUALLY: 'BI_ANNUALLY',
  ANNUALLY: 'ANNUALLY'
});

/**
 * Class representing Facility Maintenance Service.
 */
class FacilityMaintenanceService {
  /**
   * Initializes facility maintenance.
   */
  constructor() {
    this.assets = new Map();
    this.scheduledTasks = [];
    this.serviceLogs = [];
    this._bootstrapDefaultAssets();
  }

  /**
   * Seeds default hostel assets.
   * @private
   */
  _bootstrapDefaultAssets() {
    const defaultAssets = [
      { id: 'AST-RO-01', name: 'Commercial RO Plant A-Block (1000 LPH)', category: ASSET_CATEGORIES.WATER_PURIFIER_RO, interval: MAINTENANCE_INTERVALS.MONTHLY, nextService: '2026-10-01' },
      { id: 'AST-GEN-01', name: 'Cummins 250kVA Silent DG Set', category: ASSET_CATEGORIES.DIESEL_GENERATOR_BACKUP, interval: MAINTENANCE_INTERVALS.MONTHLY, nextService: '2026-09-25' },
      { id: 'AST-LIFT-01', name: 'Otis Passenger Lift 8-Person', category: ASSET_CATEGORIES.ELEVATOR_LIFT, interval: MAINTENANCE_INTERVALS.MONTHLY, nextService: '2026-09-15' },
      { id: 'AST-FIRE-01', name: 'Main Campus Fire Hydrant Pump & Extinguishers', category: ASSET_CATEGORIES.FIRE_SAFETY_SYSTEM, interval: MAINTENANCE_INTERVALS.QUARTERLY, nextService: '2026-11-01' }
    ];

    for (const a of defaultAssets) {
      this.assets.set(a.id, a);
    }
  }

  /**
   * Logs a completed maintenance service check.
   * @param {string} assetId - Asset ID.
   * @param {Object} report - Service notes, technician, cost.
   * @returns {Object} Service receipt.
   */
  completeServiceTask(assetId, report) {
    const asset = this.assets.get(assetId);
    if (!asset) {
      return { success: false, message: 'Asset not found.' };
    }

    const {
      technicianCompany = 'Authorized Vendor AMC',
      serviceCost = 1500,
      partsReplaced = [],
      status = 'OPERATIONAL',
      nextScheduledDate = '2026-10-15'
    } = report;

    const logEntry = {
      logId: `SRV-${Date.now()}`,
      assetId,
      assetName: asset.name,
      completedAt: new Date().toISOString(),
      technicianCompany,
      serviceCost,
      partsReplaced,
      status,
      nextScheduledDate
    };

    asset.nextService = nextScheduledDate;
    this.serviceLogs.push(logEntry);

    return {
      success: true,
      serviceRecord: logEntry,
      message: `Service completed for ${asset.name}. Next service set for ${nextScheduledDate}.`
    };
  }

  /**
   * Lists all upcoming scheduled maintenance tasks.
   * @returns {Array<Object>} Asset schedules.
   */
  getUpcomingMaintenance() {
    return Array.from(this.assets.values());
  }
}

module.exports = {
  FacilityMaintenanceService,
  ASSET_CATEGORIES,
  MAINTENANCE_INTERVALS
};
