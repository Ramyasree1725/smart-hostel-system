/**
 * @fileoverview Smart Hostel Management System - Mess Recipe Catalog Part 1
 * @module backend/database/messAnnualRecipeCatalogPart1
 * @description Master nutritional meal recipe database items 1 to 150.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const MESS_RECIPES_PART1 = [];

const RECIPES_BASE = [
  { name: 'Idli with Sambar & Coconut Chutney', slot: 'Breakfast', cal: 380, protein: 11.5, carbs: 70 },
  { name: 'Poha with Roasted Peanuts & Lemon', slot: 'Breakfast', cal: 340, protein: 9.0, carbs: 62 },
  { name: 'Masala Dosa with Tomato Chutney', slot: 'Breakfast', cal: 450, protein: 13.0, carbs: 75 },
  { name: 'Aloo Paratha with White Butter & Dahi', slot: 'Breakfast', cal: 510, protein: 12.0, carbs: 78 },
  { name: 'Steamed Upma with Green Chutney', slot: 'Breakfast', cal: 320, protein: 8.5, carbs: 58 },
  { name: 'Veg Dum Biryani with Mirchi Ka Salan', slot: 'Lunch', cal: 620, protein: 18.0, carbs: 95 },
  { name: 'Hyderabadi Chicken Biryani with Raita', slot: 'Lunch', cal: 740, protein: 36.0, carbs: 98 },
  { name: 'Paneer Butter Masala with Phulkas', slot: 'Dinner', cal: 540, protein: 22.0, carbs: 80 }
];

for (let i = 1; i <= 150; i++) {
  const tpl = RECIPES_BASE[i % RECIPES_BASE.length];
  MESS_RECIPES_PART1.push({
    recipeId: `REC-P1-${String(i).padStart(4, '0')}`,
    dishName: `${tpl.name} (Batch ${i})`,
    mealSlot: tpl.slot,
    caloriesKcal: tpl.cal,
    proteinGrams: tpl.protein,
    carbsGrams: tpl.carbs,
    isVegetarian: !tpl.name.includes('Chicken'),
    standardServingWeightGrams: 300,
    preparationTimeMinutes: 45,
    masterChef: 'Chef Sanjeev Mishra'
  });
}

module.exports = {
  MESS_RECIPES_PART1
};
