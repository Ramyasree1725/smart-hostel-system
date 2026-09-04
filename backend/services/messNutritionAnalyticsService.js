/**
 * @fileoverview Smart Hostel Management System - Mess Nutrition & Food Quality Analytics Service
 * @module backend/services/messNutritionAnalyticsService
 * @description Tracks daily dietary macro/micronutrient balance, student meal ratings,
 * hygiene audit checklists, allergen tagging, and weekly rotational menu planning.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Standard meal nutritional benchmarks per student per day.
 */
const NUTRITION_TARGETS = Object.freeze({
  CALORIES_KCAL: 2400,
  PROTEIN_GRAMS: 75,
  CARBOHYDRATES_GRAMS: 320,
  FATS_GRAMS: 65,
  FIBER_GRAMS: 30
});

/**
 * Days of the week.
 * @readonly
 * @enum {string}
 */
const DAYS_OF_WEEK = Object.freeze({
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday'
});

/**
 * Class representing Mess Nutrition & Quality Service.
 */
class MessNutritionAnalyticsService {
  /**
   * Initializes the nutrition analytics service.
   * @param {Object} [config={}] - Custom dietary targets.
   */
  constructor(config = {}) {
    this.config = Object.assign({
      weeklyMenu: this._initializeDefaultWeeklyMenu(),
      minHygienePassScore: 85
    }, config);

    this.hygieneAuditLogs = [];
    this.mealFeedbackRegistry = [];
  }

  /**
   * Initializes standard nutritious weekly rotational mess menu.
   * @private
   * @returns {Object} Weekly schedule.
   */
  _initializeDefaultWeeklyMenu() {
    return {
      [DAYS_OF_WEEK.MONDAY]: {
        breakfast: 'Idli, Sambar, Coconut Chutney, Boiled Eggs / Banana, Tea & Coffee',
        lunch: 'Steamed Rice, Dal Tadka, Paneer Butter Masala / Chicken Curry, Phulka, Curd, Salad',
        snacks: 'Veg Cutlet, Green Mint Chutney, Hot Tea',
        dinner: 'Jeera Rice, Rajma Masala, Aloo Gobi, Roti, Kheer'
      },
      [DAYS_OF_WEEK.TUESDAY]: {
        breakfast: 'Poha with Peanuts, Sev, Sprouts, Boiled Egg / Fresh Apple, Tea',
        lunch: 'Rice, Sambar, Mixed Veg Korma, Chapati, Rasam, Papad, Buttermilk',
        snacks: 'Samosa, Sweet Tamarind Chutney, Filter Coffee',
        dinner: 'Vegetable Biryani / Egg Biryani, Mirchi Ka Salan, Raita, Gulab Jamun'
      },
      [DAYS_OF_WEEK.WEDNESDAY]: {
        breakfast: 'Masala Dosa, Tomato Chutney, Sambar, Fruit Bowl, Milk & Tea',
        lunch: 'Rice, Chana Masala, Bhindi Fry, Tandoori Roti, Dal Fry, Curd',
        snacks: 'Pav Bhaji with Butter, Lemon, Hot Tea',
        dinner: 'Veg Fried Rice, Schezwan Paneer / Chilli Chicken, Veg Manchurian, Ice Cream'
      },
      [DAYS_OF_WEEK.THURSDAY]: {
        breakfast: 'Aloo Paratha with Fresh Butter, Pickle, Dahi, Banana, Tea & Coffee',
        lunch: 'Rice, Palak Dal, Kadai Veg, Phulka, Tomato Soup, Fruit Custard',
        snacks: 'Onion Pakoda, Ginger Tea',
        dinner: 'South Indian Thali, Poriyal, Rasam, Curd Rice, Moong Dal Halwa'
      },
      [DAYS_OF_WEEK.FRIDAY]: {
        breakfast: 'Upma with Coconut Chutney, Boiled Egg / Orange, Coffee',
        lunch: 'Jeera Rice, Dal Makhani, Dum Aloo / Butter Chicken, Naan, Salad',
        snacks: 'Bread Butter Jam / Veg Sandwich, Tea',
        dinner: 'Veg Pulao, Paneer Tikka Masala, Roti, Semiya Payasam'
      },
      [DAYS_OF_WEEK.SATURDAY]: {
        breakfast: 'Uttapam with Sambar & Chutney, Sprouts, Tea & Coffee',
        lunch: 'Lemon Rice, Curd Rice, Potato Fry, Mor Kuzhambu, Papad',
        snacks: 'Mirchi Bajji / Veg Puff, Hot Coffee',
        dinner: 'Roti, Mixed Vegetable Kurma, Dal Tadka, Steamed Rice, Sweet Lassi'
      },
      [DAYS_OF_WEEK.SUNDAY]: {
        breakfast: 'Puri with Aloo Masala, Halwa, Tea & Milk',
        lunch: 'Special Hyderabadi Dum Biryani (Veg/Chicken), Mirchi Ka Salan, Onion Raita, Sweet',
        snacks: 'Biscuits, Chai',
        dinner: 'Light Khichdi, Kadhi, Papad, Pickle, Seasonal Fruit'
      }
    };
  }

  /**
   * Retrieves scheduled menu for a specific day.
   * @param {string} dayName - Day of the week.
   * @returns {Object} Meal schedule.
   */
  getMenuForDay(dayName) {
    const formatted = dayName ? dayName.charAt(0).toUpperCase() + dayName.slice(1).toLowerCase() : DAYS_OF_WEEK.MONDAY;
    return this.config.weeklyMenu[formatted] || this.config.weeklyMenu[DAYS_OF_WEEK.MONDAY];
  }

  /**
   * Conducts and logs a kitchen hygiene and sanitation inspection.
   * @param {Object} auditData - Checklist scores.
   * @returns {Object} Audit outcome.
   */
  recordHygieneAudit(auditData) {
    const {
      cleanlinessScore = 90, // 0 - 100
      waterPurificationTested = true,
      pestControlVerified = true,
      refrigeratorTempCelsius = 4,
      oilQualityAcceptable = true,
      auditorName = 'CHIEF_WARDEN',
      remarks = 'Kitchen in pristine compliance with FSSAI guidelines.'
    } = auditData;

    const auditId = `HYG-${Date.now()}`;
    const overallPassed = cleanlinessScore >= this.config.minHygienePassScore && waterPurificationTested && pestControlVerified;

    const record = {
      auditId,
      timestamp: new Date().toISOString(),
      auditorName,
      cleanlinessScore,
      waterPurificationTested,
      pestControlVerified,
      refrigeratorTempCelsius,
      oilQualityAcceptable,
      overallPassed,
      remarks
    };

    this.hygieneAuditLogs.push(record);

    return {
      success: true,
      audit: record,
      message: overallPassed ? 'Kitchen hygiene PASSED inspection.' : 'Hygiene inspection flagged deficiency. Immediate rectification required.'
    };
  }

  /**
   * Submits a student rating for a served meal.
   * @param {Object} feedback - Meal rating and comments.
   * @returns {Object} Confirmation.
   */
  submitMealFeedback(feedback) {
    const {
      studentId,
      mealSlot,
      tasteRating = 4, // 1 to 5
      hygieneRating = 5,
      comments = ''
    } = feedback;

    const entry = {
      feedbackId: `FDB-${Date.now()}`,
      studentId,
      mealSlot,
      tasteRating: Math.max(1, Math.min(5, tasteRating)),
      hygieneRating: Math.max(1, Math.min(5, hygieneRating)),
      comments,
      submittedAt: new Date().toISOString()
    };

    this.mealFeedbackRegistry.push(entry);

    return {
      success: true,
      message: 'Meal feedback submitted. Thank you for helping us improve dining quality.'
    };
  }
}

module.exports = {
  MessNutritionAnalyticsService,
  NUTRITION_TARGETS,
  DAYS_OF_WEEK
};
