/**
 * @fileoverview Smart Hostel Management System - Room Inventory & Fixture Tracking Service
 * @module backend/services/roomInventoryService
 * @description Inward/Outward fixture checklist per student allotment (Mattress, Key, Study Lamp,
 * Cupboard Keys, Curtains), damage penalty computation upon checkout, and stockroom inventory.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Standard fixture inventory checklist items.
 */
const STANDARD_FIXTURES = Object.freeze([
  { itemId: 'FIX-01', name: 'Wooden Single Bed Frame', replacementValue: 6000 },
  { itemId: 'FIX-02', name: 'High-Density Foam Mattress & Protector', replacementValue: 4500 },
  { itemId: 'FIX-03', name: 'Study Table & Ergonomic Mesh Chair', replacementValue: 5000 },
  { itemId: 'FIX-04', name: 'Steel Wardrobe with Dual Keys', replacementValue: 7000 },
  { itemId: 'FIX-05', name: 'Ceiling Fan & Speed Regulator', replacementValue: 1800 },
  { itemId: 'FIX-06', name: 'LED Tube Light & Night Lamp', replacementValue: 600 },
  { itemId: 'FIX-07', name: 'Window Curtain Set with Rods', replacementValue: 1200 },
  { itemId: 'FIX-08', name: 'Room Entry Smart RFID Card / Key', replacementValue: 500 }
]);

/**
 * Class representing Room Inventory Service.
 */
class RoomInventoryService {
  /**
   * Initializes inventory tracking.
   */
  constructor() {
    this.allotmentInventories = new Map(); // studentId -> fixture status
  }

  /**
   * Generates a fixture hand-over checklist on check-in.
   * @param {string} studentId - Student ID.
   * @param {string} roomNumber - Room number.
   * @returns {Object} Signed checklist record.
   */
  createCheckinInventory(studentId, roomNumber) {
    const checklist = STANDARD_FIXTURES.map(item => ({
      ...item,
      conditionOnCheckin: 'PRISTINE / GOOD',
      isIssued: true
    }));

    const record = {
      recordId: `INV-${Date.now()}`,
      studentId,
      roomNumber,
      checkinDate: new Date().toISOString(),
      fixtures: checklist,
      studentAcknowledged: true
    };

    this.allotmentInventories.set(studentId, record);
    return record;
  }

  /**
   * Evaluates fixture condition on checkout and calculates damage deductions.
   * @param {string} studentId - Student ID.
   * @param {Array<Object>} inspections - Array of { itemId, condition, isDamaged, damageFee }
   * @returns {Object} Clearance summary.
   */
  evaluateCheckoutClearance(studentId, inspections = []) {
    const record = this.allotmentInventories.get(studentId);
    let totalDeductions = 0;
    const damagedItems = [];

    for (const insp of inspections) {
      if (insp.isDamaged) {
        totalDeductions += (insp.damageFee || 500);
        damagedItems.push(insp);
      }
    }

    return {
      studentId,
      clearanceGranted: totalDeductions === 0,
      totalDamageDeductions: totalDeductions,
      damagedItems,
      checkoutDate: new Date().toISOString()
    };
  }
}

module.exports = {
  RoomInventoryService,
  STANDARD_FIXTURES
};
