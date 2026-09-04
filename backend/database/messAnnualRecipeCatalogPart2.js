/**
 * @fileoverview Smart Hostel Management System - Mess Recipe Catalog Part 2
 * @module backend/database/messAnnualRecipeCatalogPart2
 * @description Master nutritional meal recipe database items 151 to 300.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const MESS_RECIPES_PART2 = [];

const RECIPES_BASE_2 = [
  { name: 'Dal Makhani with Jeera Basmati Rice', slot: 'Dinner', cal: 520, protein: 18.0, carbs: 85 },
  { name: 'Palak Paneer with Tandoori Roti', slot: 'Lunch', cal: 480, protein: 21.0, carbs: 76 },
  { name: 'South Indian Meal Thali with Rasam', slot: 'Lunch', cal: 590, protein: 17.5, carbs: 90 },
  { name: 'Egg Curry with Steamed Rice', slot: 'Dinner', cal: 490, protein: 24.0, carbs: 78 },
  { name: 'Rajma Masala with Steamed Rice', slot: 'Lunch', cal: 470, protein: 19.0, carbs: 82 },
  { name: 'Chole Bhature with Pickled Onions', slot: 'Sunday Special', cal: 680, protein: 20.0, carbs: 95 },
  { name: 'Pav Bhaji with Amul Butter', slot: 'Evening Snacks', cal: 440, protein: 9.5, carbs: 64 },
  { name: 'Samosa with Mint & Tamarind Chutneys', slot: 'Evening Snacks', cal: 290, protein: 4.5, carbs: 40 }
];

for (let i = 151; i <= 300; i++) {
  const tpl = RECIPES_BASE_2[i % RECIPES_BASE_2.length];
  MESS_RECIPES_PART2.push({
    recipeId: `REC-P2-${String(i).padStart(4, '0')}`,
    dishName: `${tpl.name} (Batch ${i})`,
    mealSlot: tpl.slot,
    caloriesKcal: tpl.cal,
    proteinGrams: tpl.protein,
    carbsGrams: tpl.carbs,
    isVegetarian: !tpl.name.includes('Egg'),
    standardServingWeightGrams: 320,
    preparationTimeMinutes: 50,
    masterChef: 'Chef Sanjeev Mishra'
  });
}

module.exports = {
  MESS_RECIPES_PART2
};
