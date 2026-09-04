/**
 * @fileoverview Smart Hostel Management System - Interactive Mess Menu & Nutritional Planner
 * @module frontend/src/modules/messMenuInteractiveEngine
 * @description Frontend widget for browsing the 7-day rotational mess menu, checking meal timings,
 * calculating daily nutritional values, and submitting feedback ratings to the warden desk.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Standard 7-Day Weekly Mess Schedule for display.
 */
const WEEKLY_MESS_SCHEDULE = Object.freeze({
  Monday: {
    breakfast: 'Idli, Medu Vada, Sambar, Coconut Chutney, Tea / Coffee',
    lunch: 'Steamed Rice, Dal Fry, Paneer Butter Masala / Chicken Curry, Phulka, Curd, Salad',
    snacks: 'Veg Cutlet, Mint Chutney, Hot Adrak Chai',
    dinner: 'Jeera Rice, Punjabi Rajma Masala, Aloo Gobi, Phulka, Gulab Jamun'
  },
  Tuesday: {
    breakfast: 'Kanda Poha with Peanuts, Sev, Sprouts, Boiled Egg / Fresh Fruit, Tea',
    lunch: 'Rice, Mysore Rasam, Mixed Veg Korma, Tawa Chapati, Papad, Spiced Buttermilk',
    snacks: 'Crispy Samosa, Sweet Tamarind Chutney, Filter Coffee',
    dinner: 'Hyderabadi Veg Biryani / Egg Biryani, Mirchi Ka Salan, Onion Raita, Shahi Tukda'
  },
  Wednesday: {
    breakfast: 'Crispy Masala Dosa, Tomato Chutney, Sambar, Fresh Fruit, Milk / Tea',
    lunch: 'Rice, Chana Masala, Bhindi Fry, Tandoori Roti, Dal Tadka, Sweet Curd',
    snacks: 'Mumbai Pav Bhaji with Butter, Lemon Onion Salad, Hot Tea',
    dinner: 'Veg Fried Rice, Schezwan Chilli Paneer / Chicken, Veg Manchurian, Ice Cream'
  },
  Thursday: {
    breakfast: 'Aloo Paratha with White Butter, Mixed Pickle, Fresh Dahi, Banana, Tea',
    lunch: 'Rice, Palak Dal, Kadai Veg, Butter Phulka, Tomato Saar, Fruit Custard',
    snacks: 'Hot Onion Pakoda, Fried Green Chillies, Masala Chai',
    dinner: 'South Indian Special Thali, Poriyal, Rasam, Curd Rice, Moong Dal Halwa'
  },
  Friday: {
    breakfast: 'Rava Upma with Coconut Chutney, Boiled Egg / Apple, Filter Coffee',
    lunch: 'Jeera Rice, Dal Makhani, Dum Aloo / Butter Chicken, Garlic Naan, Salad',
    snacks: 'Veg Grilled Sandwich, Tomato Ketchup, Hot Tea',
    dinner: 'Kashmiri Pulao, Paneer Tikka Masala, Rumali Roti, Semiya Payasam'
  },
  Saturday: {
    breakfast: 'Onion Uttapam with Sambar, Peanut Chutney, Sprouts, Tea',
    lunch: 'Lemon Rice, Curd Rice, Potato Kara Varuval, Mor Kuzhambu, Appalam',
    snacks: 'Mirchi Bajji / Veg Puff, Hot Filter Coffee',
    dinner: 'Whole Wheat Roti, Mixed Veg Kurma, Dal Tadka, Steamed Rice, Sweet Lassi'
  },
  Sunday: {
    breakfast: 'Puri with Spicy Aloo Bhaji, Sooji Halwa, Fresh Milk & Tea',
    lunch: 'Special Hyderabadi Dum Biryani (Veg/Chicken), Mirchi Ka Salan, Onion Raita, Sweet',
    snacks: 'Osmania Biscuits, Irani Chai',
    dinner: 'Light Moong Dal Khichdi, Gujarati Kadhi, Roasted Papad, Pickle, Seasonal Fruit'
  }
});

/**
 * Retrieves meals for a specific day.
 * @param {string} day
 * @returns {Object}
 */
function getMenuForDayOfWeek(day) {
  const normalized = day ? day.charAt(0).toUpperCase() + day.slice(1).toLowerCase() : 'Monday';
  return WEEKLY_MESS_SCHEDULE[normalized] || WEEKLY_MESS_SCHEDULE.Monday;
}

module.exports = {
  WEEKLY_MESS_SCHEDULE,
  getMenuForDayOfWeek
};
