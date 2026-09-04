/**
 * @fileoverview Smart Hostel Management System - Mess Procurement & Inventory Supply Service
 * @module backend/services/messProcurementService
 * @description Raw ingredient procurement, daily dairy/produce orders, vendor price bidding,
 * grain silo level monitoring, expiry date management, and bulk cost analysis.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Essential kitchen staple categories.
 * @readonly
 * @enum {string}
 */
const INGREDIENT_CATEGORIES = Object.freeze({
  GRAINS_AND_PULSES: 'Grains, Rice & Dals',
  DAIRY_PRODUCTS: 'Milk, Curd, Paneer & Butter',
  FRESH_VEGETABLES: 'Fresh Farm Vegetables',
  SPICES_AND_OILS: 'Cooking Oils, Ghee & Spices',
  POULTRY_AND_EGGS: 'Farm Fresh Eggs & Poultry',
  BAKERY_AND_BEVERAGES: 'Bread, Tea Leaves & Coffee'
});

/**
 * Class representing Mess Procurement Service.
 */
class MessProcurementService {
  /**
   * Initializes procurement repository.
   */
  constructor() {
    this.inventory = new Map();
    this.purchaseOrders = [];
    this._initializeStandardInventory();
  }

  /**
   * Seeds standard kitchen inventory items.
   * @private
   */
  _initializeStandardInventory() {
    const staples = [
      { id: 'ING-01', name: 'Sona Masoori Rice (Grade A)', category: INGREDIENT_CATEGORIES.GRAINS_AND_PULSES, stockKg: 1500, unitPrice: 48, minThresholdKg: 300 },
      { id: 'ING-02', name: 'Toor Dal (Unpolished)', category: INGREDIENT_CATEGORIES.GRAINS_AND_PULSES, stockKg: 450, unitPrice: 140, minThresholdKg: 100 },
      { id: 'ING-03', name: 'Pasteurized Toned Milk (Litres)', category: INGREDIENT_CATEGORIES.DAIRY_PRODUCTS, stockKg: 200, unitPrice: 56, minThresholdKg: 50 },
      { id: 'ING-04', name: 'Refined Sunflower Oil (Litres)', category: INGREDIENT_CATEGORIES.SPICES_AND_OILS, stockKg: 350, unitPrice: 130, minThresholdKg: 80 },
      { id: 'ING-05', name: 'Fresh Potatoes & Onions', category: INGREDIENT_CATEGORIES.FRESH_VEGETABLES, stockKg: 600, unitPrice: 30, minThresholdKg: 150 }
    ];

    for (const item of staples) {
      this.inventory.set(item.id, item);
    }
  }

  /**
   * Creates a purchase purchase order for replenishment.
   * @param {string} itemId - Ingredient ID.
   * @param {number} quantity - Quantity to procure.
   * @param {string} vendor - Vendor name.
   * @returns {Object} Purchase order confirmation.
   */
  createPurchaseOrder(itemId, quantity, vendor = 'Wholesale Agro Supplies Ltd') {
    const item = this.inventory.get(itemId);
    if (!item) {
      throw new Error(`Item ${itemId} not found in inventory catalog.`);
    }

    const totalCost = Number(quantity) * item.unitPrice;
    const poNumber = `PO-${Date.now()}`;

    const po = {
      poNumber,
      itemId,
      itemName: item.name,
      quantity,
      unitPrice: item.unitPrice,
      totalCost,
      vendor,
      status: 'ORDER_PLACED',
      createdAt: new Date().toISOString()
    };

    item.stockKg += Number(quantity);
    this.purchaseOrders.push(po);

    return {
      success: true,
      po,
      message: `Purchase order ${poNumber} generated for ${quantity} kg of ${item.name}. Total: INR ${totalCost}.`
    };
  }

  /**
   * Lists inventory items currently running below minimum safety threshold.
   * @returns {Array<Object>} Low stock alerts.
   */
  checkLowStockAlerts() {
    const alerts = [];
    for (const item of this.inventory.values()) {
      if (item.stockKg <= item.minThresholdKg) {
        alerts.push(item);
      }
    }
    return alerts;
  }
}

module.exports = {
  MessProcurementService,
  INGREDIENT_CATEGORIES
};
