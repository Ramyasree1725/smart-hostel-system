/**
 * @fileoverview Smart Hostel Management System - Mess Billing & Dining Subscription Service
 * @module backend/services/messBillingSubscriptionService
 * @description Handles meal plans (Veg, Non-Veg, Special Diet), daily token scanning,
 * mess rebate computations for student leaves, guest meal coupon issuance, and vendor inventory audits.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Dining plan options.
 * @readonly
 * @enum {string}
 */
const MEAL_PLANS = Object.freeze({
  STANDARD_VEG: 'STANDARD_VEG',
  STANDARD_NON_VEG: 'STANDARD_NON_VEG',
  PREMIUM_COMBO: 'PREMIUM_COMBO',
  DIETETIC_SPECIAL: 'DIETETIC_SPECIAL',
  CUSTOM_PAY_PER_MEAL: 'CUSTOM_PAY_PER_MEAL'
});

/**
 * Meal slots throughout the day.
 * @readonly
 * @enum {string}
 */
const MEAL_SLOTS = Object.freeze({
  BREAKFAST: 'BREAKFAST', // 07:30 - 09:30
  LUNCH: 'LUNCH',         // 12:30 - 14:30
  EVENING_SNACKS: 'EVENING_SNACKS', // 17:00 - 18:00
  DINNER: 'DINNER'        // 19:30 - 21:30
});

/**
 * Class representing the Mess Billing & Dining Subscription Service.
 */
class MessBillingSubscriptionService {
  /**
   * Initializes the mess dining service.
   * @param {Object} [config={}] - Configuration options.
   */
  constructor(config = {}) {
    this.config = Object.assign({
      perDayMealRate: 150,
      dailyRebateAllowance: 100, // Amount credited back per approved leave day
      minLeaveDaysForRebate: 3,
      guestBreakfastRate: 40,
      guestLunchRate: 70,
      guestSnackRate: 25,
      guestDinnerRate: 70
    }, config);

    this.subscriptions = new Map();
    this.dailyAttendanceLogs = [];
    this.rebateClaims = new Map();
    this.guestCoupons = [];
  }

  /**
   * Registers a student dining subscription plan.
   * @param {string} studentId - Student ID.
   * @param {string} plan - MEAL_PLANS enum value.
   * @param {Object} preferences - Dietary preferences.
   * @returns {Object} Subscription profile.
   */
  subscribeStudent(studentId, plan = MEAL_PLANS.STANDARD_VEG, preferences = {}) {
    if (!studentId) {
      throw new Error('Student ID is mandatory for mess subscription.');
    }

    const sub = {
      studentId: String(studentId),
      plan: plan,
      isVegetarian: preferences.isVegetarian !== false,
      allergies: Array.isArray(preferences.allergies) ? preferences.allergies : [],
      startDate: preferences.startDate || new Date().toISOString(),
      active: true,
      rebateDaysAccumulated: 0,
      totalMealsConsumed: 0
    };

    this.subscriptions.set(studentId, sub);
    return sub;
  }

  /**
   * Records a student dining scan at a meal counter.
   * @param {string} studentId - Student ID.
   * @param {string} mealSlot - MEAL_SLOTS enum value.
   * @param {string} scannedBy - Mess staff identifier.
   * @returns {Object} Validation & token status.
   */
  recordMealConsumption(studentId, mealSlot = MEAL_SLOTS.LUNCH, scannedBy = 'COUNTER_1') {
    let sub = this.subscriptions.get(studentId);
    if (!sub) {
      sub = this.subscribeStudent(studentId);
    }

    if (!sub.active) {
      return {
        success: false,
        message: 'Mess subscription is inactive or suspended due to unpaid dues.'
      };
    }

    // Check for duplicate scan in the same slot today
    const todayStr = new Date().toISOString().split('T')[0];
    const alreadyScanned = this.dailyAttendanceLogs.some(
      log => log.studentId === studentId && log.slot === mealSlot && log.date === todayStr
    );

    if (alreadyScanned) {
      return {
        success: false,
        message: `Meal token already redeemed for ${mealSlot} today.`
      };
    }

    sub.totalMealsConsumed++;

    const logEntry = {
      logId: `MEAL-${Date.now()}`,
      studentId: studentId,
      slot: mealSlot,
      date: todayStr,
      timestamp: new Date().toISOString(),
      scannedBy: scannedBy
    };

    this.dailyAttendanceLogs.push(logEntry);

    return {
      success: true,
      message: `Meal verified successfully for slot: ${mealSlot}.`,
      log: logEntry
    };
  }

  /**
   * Applies for a mess fee rebate when a student is away on approved leave.
   * @param {string} studentId - Student ID.
   * @param {string} fromDate - Start date (YYYY-MM-DD).
   * @param {string} toDate - End date (YYYY-MM-DD).
   * @param {string} passId - Related Gate Pass ID.
   * @returns {Object} Rebate calculation result.
   */
  applyRebate(studentId, fromDate, toDate, passId = null) {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = end.getTime() - start.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (days < this.config.minLeaveDaysForRebate) {
      return {
        success: false,
        message: `Rebate requires a minimum of ${this.config.minLeaveDaysForRebate} consecutive days of leave.`
      };
    }

    const rebateAmount = days * this.config.dailyRebateAllowance;
    const rebateId = `REB-${Date.now()}`;

    const record = {
      rebateId: rebateId,
      studentId: studentId,
      fromDate: fromDate,
      toDate: toDate,
      eligibleDays: days,
      rebateAmount: rebateAmount,
      passId: passId,
      status: 'APPROVED',
      processedAt: new Date().toISOString()
    };

    this.rebateClaims.set(rebateId, record);

    const sub = this.subscriptions.get(studentId);
    if (sub) {
      sub.rebateDaysAccumulated += days;
    }

    return {
      success: true,
      rebate: record,
      message: `Rebate of INR ${rebateAmount} approved for ${days} days.`
    };
  }

  /**
   * Issues guest meal tokens for parents or visitors.
   * @param {string} visitorName - Name of guest.
   * @param {string} hostStudentId - Student host ID.
   * @param {string} mealSlot - MEAL_SLOTS.
   * @param {number} count - Number of meal tokens.
   * @returns {Object} Coupon receipt.
   */
  issueGuestCoupon(visitorName, hostStudentId, mealSlot = MEAL_SLOTS.LUNCH, count = 1) {
    let rate = this.config.guestLunchRate;
    if (mealSlot === MEAL_SLOTS.BREAKFAST) rate = this.config.guestBreakfastRate;
    else if (mealSlot === MEAL_SLOTS.EVENING_SNACKS) rate = this.config.guestSnackRate;
    else if (mealSlot === MEAL_SLOTS.DINNER) rate = this.config.guestDinnerRate;

    const totalCost = rate * count;
    const couponId = `GCP-${Date.now().toString().slice(-6)}`;

    const coupon = {
      couponId: couponId,
      visitorName: visitorName,
      hostStudentId: hostStudentId,
      mealSlot: mealSlot,
      tokenCount: count,
      costPerToken: rate,
      totalCost: totalCost,
      issuedAt: new Date().toISOString()
    };

    this.guestCoupons.push(coupon);

    return {
      success: true,
      coupon: coupon,
      message: `Issued ${count} guest dining coupon(s) for ${mealSlot}. Total: INR ${totalCost}.`
    };
  }
}

module.exports = {
  MessBillingSubscriptionService,
  MEAL_PLANS,
  MEAL_SLOTS
};
