/**
 * @fileoverview Smart Hostel Management System - Food Waste Management & Sustainability Service
 * @module backend/services/foodWasteManagementService
 * @description Quantifies post-consumer food wastage, biogas digester yields, procurement optimization,
 * surplus redistribution to community shelters, and eco-sustainability analytics.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Sustainability disposal destinations.
 * @readonly
 * @enum {string}
 */
const DISPOSAL_METHODS = Object.freeze({
  BIOGAS_GENERATOR: 'Biogas Generation',
  COMPOSTING_UNIT: 'Organic Composting',
  COMMUNITY_FOOD_BANK: 'Surplus NGO Redistribution',
  PIGGERY_FEED: 'Livestock Animal Feed'
});

/**
 * Class representing Food Waste Management Service.
 */
class FoodWasteManagementService {
  /**
   * Initializes food waste tracking.
   * @param {Object} [config={}] - Configuration options.
   */
  constructor(config = {}) {
    this.config = Object.assign({
      maxAcceptableWasteKgPerDay: 40,
      biogasKwhPerKgWaste: 0.25,
      compostYieldRatio: 0.35
    }, config);

    this.dailyLogs = [];
  }

  /**
   * Logs daily kitchen and plate wastage.
   * @param {Object} entry - Daily wastage metrics.
   * @returns {Object} Log entry receipt.
   */
  logDailyWaste(entry) {
    const {
      date = new Date().toISOString().split('T')[0],
      kitchenPrepWasteKg = 12.5,
      platePostConsumerWasteKg = 22.0,
      disposalMethod = DISPOSAL_METHODS.BIOGAS_GENERATOR,
      surplusDonatedKg = 15.0,
      loggedBy = 'MESS_SUPERVISOR'
    } = entry;

    const totalWasteKg = kitchenPrepWasteKg + platePostConsumerWasteKg;
    const biogasEnergyGeneratedKwh = parseFloat((totalWasteKg * this.config.biogasKwhPerKgWaste).toFixed(2));
    const isExceededThreshold = totalWasteKg > this.config.maxAcceptableWasteKgPerDay;

    const logRecord = {
      logId: `WST-${Date.now()}`,
      date,
      kitchenPrepWasteKg,
      platePostConsumerWasteKg,
      totalWasteKg,
      surplusDonatedKg,
      disposalMethod,
      biogasEnergyGeneratedKwh,
      isExceededThreshold,
      loggedBy,
      timestamp: new Date().toISOString()
    };

    this.dailyLogs.push(logRecord);

    return {
      success: true,
      log: logRecord,
      message: `Waste logged: ${totalWasteKg} kg (${biogasEnergyGeneratedKwh} kWh clean energy offset).`
    };
  }

  /**
   * Generates a monthly sustainability report.
   * @returns {Object} Sustainability statistics.
   */
  generateSustainabilityReport() {
    let totalWaste = 0;
    let totalEnergy = 0;
    let totalDonated = 0;

    for (const l of this.dailyLogs) {
      totalWaste += l.totalWasteKg;
      totalEnergy += l.biogasEnergyGeneratedKwh;
      totalDonated += l.surplusDonatedKg;
    }

    return {
      totalDaysTracked: this.dailyLogs.length,
      totalWasteRecycledKg: totalWaste,
      totalCleanEnergyProducedKwh: totalEnergy,
      totalSurplusMealsDonatedKg: totalDonated,
      co2EmissionsOffsetKg: parseFloat((totalEnergy * 0.82).toFixed(2))
    };
  }
}

module.exports = {
  FoodWasteManagementService,
  DISPOSAL_METHODS
};
