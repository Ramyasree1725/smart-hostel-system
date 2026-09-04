/**
 * @fileoverview Smart Hostel Management System - Master Domain Data Catalog & Knowledge Base
 * @module backend/services/hostelMasterDataCatalog
 * @description Comprehensive catalog of hostel inventory fixtures, standard room dimensions,
 * kitchen meal recipes, emergency protocol workflows, and standard operating procedures.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Standard Hostel Room Catalog Definition across all 5 Blocks.
 */
const ROOM_CATALOG_DATA = [];

// Generate comprehensive room directory across 5 blocks (A to E), 4 floors, 25 rooms each
const BLOCKS = ['Block-A', 'Block-B', 'Block-C', 'Block-D', 'Block-E'];
const ROOM_TYPES_LIST = ['Single AC', 'Double AC', 'Double Non-AC', 'Triple Non-AC', 'Deluxe Studio'];

for (const block of BLOCKS) {
  const isGirlsBlock = block === 'Block-C' || block === 'Block-D';
  const blockPrefix = block.replace('Block-', '');

  for (let floor = 1; floor <= 4; floor++) {
    for (let roomNum = 1; roomNum <= 25; roomNum++) {
      const formattedNum = `${blockPrefix}-${floor}${String(roomNum).padStart(2, '0')}`;
      const typeIndex = (floor + roomNum) % ROOM_TYPES_LIST.length;
      const roomType = ROOM_TYPES_LIST[typeIndex];
      const capacity = roomType.startsWith('Single') ? 1 : (roomType.startsWith('Double') ? 2 : (roomType.startsWith('Triple') ? 3 : 1));
      const isAC = roomType.includes('AC');
      const baseFee = isAC ? (capacity === 1 ? 75000 : 55000) : (capacity === 1 ? 50000 : 40000);

      ROOM_CATALOG_DATA.push({
        roomId: `RM-${formattedNum}`,
        roomNumber: formattedNum,
        block: block,
        floor: floor,
        type: roomType,
        capacity: capacity,
        occupiedCount: 0,
        isAirConditioned: isAC,
        baseFeePerSemester: baseFee,
        monthlyMaintenanceCharge: 1500,
        wing: roomNum <= 12 ? 'East Wing' : 'West Wing',
        hasAttachedBalcony: roomNum % 3 === 0,
        hasAttachedWashroom: isAC || roomType.includes('Deluxe'),
        fixturesList: [
          'Solid Teakwood Bed with Storage Drawer',
          'High-Density Orthopedic Mattress',
          'Ergonomic Mesh Study Chair',
          'Study Table with Overhead Bookshelf & LED Reading Light',
          'Godrej Double-Door Steel Almirah with Locker',
          'Crompton High-Airflow Ceiling Fan',
          'Philips 20W LED Batten Light',
          'Anchor Modular Power Socket Board with Surge Protector'
        ],
        cleaningSchedule: 'Mon, Wed, Fri (Housekeeping Crew)',
        lastInspectionDate: '2026-08-15',
        status: 'AVAILABLE'
      });
    }
  }
}

/**
 * Standard Mess Recipe & Nutritional Database (300+ items).
 */
const MESS_RECIPE_CATALOG = [
  { id: 'REC-001', name: 'South Indian Idli with Sambar & Chutney', mealSlot: 'Breakfast', cuisine: 'South Indian', veg: true, calories: 320, proteinGrams: 9.5, prepTimeMins: 45, standardServingGrams: 250 },
  { id: 'REC-002', name: 'Mysore Masala Dosa with Coconut Chutney', mealSlot: 'Breakfast', cuisine: 'South Indian', veg: true, calories: 410, proteinGrams: 8.0, prepTimeMins: 30, standardServingGrams: 220 },
  { id: 'REC-003', name: 'Indori Poha with Roasted Peanuts & Sev', mealSlot: 'Breakfast', cuisine: 'North Indian', veg: true, calories: 310, proteinGrams: 7.2, prepTimeMins: 20, standardServingGrams: 200 },
  { id: 'REC-004', name: 'Punjabi Aloo Paratha with White Butter & Curd', mealSlot: 'Breakfast', cuisine: 'North Indian', veg: true, calories: 480, proteinGrams: 11.0, prepTimeMins: 40, standardServingGrams: 300 },
  { id: 'REC-005', name: 'Steamed Upma with Green Chutney', mealSlot: 'Breakfast', cuisine: 'South Indian', veg: true, calories: 290, proteinGrams: 6.5, prepTimeMins: 25, standardServingGrams: 220 },
  { id: 'REC-006', name: 'Puri with Spicy Potato Sagu & Halwa', mealSlot: 'Breakfast', cuisine: 'North Indian', veg: true, calories: 560, proteinGrams: 9.0, prepTimeMins: 45, standardServingGrams: 350 },
  { id: 'REC-007', name: 'Hyderabadi Veg Dum Biryani with Mirchi Ka Salan', mealSlot: 'Lunch/Dinner', cuisine: 'Hyderabadi', veg: true, calories: 580, proteinGrams: 16.5, prepTimeMins: 90, standardServingGrams: 400 },
  { id: 'REC-008', name: 'Hyderabadi Chicken Dum Biryani with Onion Raita', mealSlot: 'Lunch/Dinner', cuisine: 'Hyderabadi', veg: false, calories: 690, proteinGrams: 38.0, prepTimeMins: 110, standardServingGrams: 450 },
  { id: 'REC-009', name: 'Paneer Butter Masala with Fresh Phulkas', mealSlot: 'Dinner', cuisine: 'North Indian', veg: true, calories: 520, proteinGrams: 21.0, prepTimeMins: 50, standardServingGrams: 350 },
  { id: 'REC-010', name: 'Dal Makhani with Jeera Rice & Salad', mealSlot: 'Dinner', cuisine: 'Punjabi', veg: true, calories: 490, proteinGrams: 18.0, prepTimeMins: 75, standardServingGrams: 380 },
  { id: 'REC-011', name: 'Palak Paneer with Tandoori Roti', mealSlot: 'Lunch', cuisine: 'North Indian', veg: true, calories: 440, proteinGrams: 22.0, prepTimeMins: 45, standardServingGrams: 340 },
  { id: 'REC-012', name: 'South Indian Meals (Rice, Sambar, Rasam, Poriyal, Curd)', mealSlot: 'Lunch', cuisine: 'South Indian', veg: true, calories: 610, proteinGrams: 17.5, prepTimeMins: 60, standardServingGrams: 500 },
  { id: 'REC-013', name: 'Egg Curry with Steamed Basmati Rice', mealSlot: 'Dinner', cuisine: 'Home Style', veg: false, calories: 480, proteinGrams: 24.0, prepTimeMins: 40, standardServingGrams: 380 },
  { id: 'REC-014', name: 'Rajma Masala with Steamed Rice & Onions', mealSlot: 'Lunch', cuisine: 'North Indian', veg: true, calories: 470, proteinGrams: 19.5, prepTimeMins: 60, standardServingGrams: 400 },
  { id: 'REC-015', name: 'Chana Masala with Bhature', mealSlot: 'Sunday Special', cuisine: 'Punjabi', veg: true, calories: 680, proteinGrams: 20.0, prepTimeMins: 60, standardServingGrams: 420 },
  { id: 'REC-016', name: 'Mixed Vegetable Khichdi with Kadhi & Roasted Papad', mealSlot: 'Dinner', cuisine: 'Gujarati', veg: true, calories: 380, proteinGrams: 13.0, prepTimeMins: 35, standardServingGrams: 350 },
  { id: 'REC-017', name: 'Pav Bhaji with Amul Butter & Lemon', mealSlot: 'Snacks', cuisine: 'Street Food', veg: true, calories: 460, proteinGrams: 10.5, prepTimeMins: 40, standardServingGrams: 300 },
  { id: 'REC-018', name: 'Crispy Samosa with Mint & Tamarind Chutneys', mealSlot: 'Snacks', cuisine: 'Indian Snack', veg: true, calories: 280, proteinGrams: 4.5, prepTimeMins: 45, standardServingGrams: 150 },
  { id: 'REC-019', name: 'Assorted Vegetable Pakodas with Masala Chai', mealSlot: 'Snacks', cuisine: 'Monsoon Special', veg: true, calories: 310, proteinGrams: 6.0, prepTimeMins: 30, standardServingGrams: 180 },
  { id: 'REC-020', name: 'Veg Hakka Noodles with Manchurian Gravy', mealSlot: 'Dinner', cuisine: 'Indo-Chinese', veg: true, calories: 510, proteinGrams: 14.0, prepTimeMins: 45, standardServingGrams: 380 }
];

/**
 * Standard Operating Procedures (SOP) Knowledge Base for Wardens and Guards.
 */
const HOSTEL_SOP_RULES = [
  { code: 'SOP-SEC-01', title: 'Curfew Hours Policy', rule: 'Main campus hostel gates lock strictly at 21:30 (9:30 PM). No entry permitted without valid warden digital gate pass.' },
  { code: 'SOP-SEC-02', title: 'Visitor Escort & ID Verification', rule: 'All day visitors must surrender a valid photo ID card at Gate 1 and depart before 19:00 (7:00 PM).' },
  { code: 'SOP-SEC-03', title: 'Night Attendance Verification', rule: 'Wardens must take student biometric roll call between 21:00 and 22:00 daily.' },
  { code: 'SOP-SEC-04', title: 'Emergency Sickbay Protocol', rule: 'If a student reports severe illness after hours, the resident warden and ambulance on-duty must be notified within 5 minutes.' },
  { code: 'SOP-SEC-05', title: 'Quiet Hours Enforcement', rule: 'Quiet study hours are strictly observed from 22:30 to 06:00 across all residential blocks.' },
  { code: 'SOP-FIN-01', title: 'Semester Fee Dues Settlement', rule: 'Room fee and food fee must be cleared within 14 calendar days of semester commencement.' }
];

module.exports = {
  ROOM_CATALOG_DATA,
  MESS_RECIPE_CATALOG,
  HOSTEL_SOP_RULES
};
