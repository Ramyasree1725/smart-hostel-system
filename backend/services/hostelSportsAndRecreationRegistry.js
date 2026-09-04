/**
 * @fileoverview Smart Hostel Management System - Sports, Recreation & Gymnasium Registry
 * @module backend/services/hostelSportsAndRecreationRegistry
 * @description Master catalog of hostel sports facilities (Indoor Badminton Courts, Table Tennis,
 * Gymnasium equipment, Basketball court bookings, sports equipment lending, and inter-hostel league tournaments).
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Master Sports Inventory & Equipment Catalog (500 Items).
 */
const SPORTS_EQUIPMENT_DATABASE = [];

const SPORTS_ITEMS = [
  { name: 'Yonex Carbon Graphite Badminton Racket Set', category: 'Badminton', condition: 'EXCELLENT', replacementINR: 3500 },
  { name: 'Yonex Mavis 350 Nylon Shuttlecock Box (Pack of 6)', category: 'Badminton', condition: 'NEW_STOCK', replacementINR: 850 },
  { name: 'Stag 4-Star Table Tennis Racket & Ball Set', category: 'Table Tennis', condition: 'EXCELLENT', replacementINR: 2200 },
  { name: 'Spalding Official Composite Basketball (Size 7)', category: 'Basketball', condition: 'GOOD', replacementINR: 2800 },
  { name: 'Nivia Premier League Football (Size 5)', category: 'Football', condition: 'GOOD', replacementINR: 1900 },
  { name: 'SS English Willow Cricket Bat & Ball Kit', category: 'Cricket', condition: 'GOOD', replacementINR: 6500 },
  { name: 'Olympic 20kg Barbells & Cast Iron Weight Plates (100kg set)', category: 'Gymnasium', condition: 'PRISTINE', replacementINR: 18000 },
  { name: 'Commercial Motorized Treadmill 4.0 HP AC Motor', category: 'Gymnasium', condition: 'OPERATIONAL', replacementINR: 95000 }
];

// Generate 500 equipment items
for (let i = 1; i <= 500; i++) {
  const template = SPORTS_ITEMS[i % SPORTS_ITEMS.length];
  const serialNumber = `SPT-${template.category.slice(0, 3).toUpperCase()}-${String(i).padStart(4, '0')}`;
  const isLent = (i % 6 === 0);

  SPORTS_EQUIPMENT_DATABASE.push({
    serialNumber: serialNumber,
    itemName: `${template.name} #${i}`,
    sportCategory: template.category,
    conditionGrade: template.condition,
    replacementValueINR: template.replacementINR,
    currentStatus: isLent ? 'CHECKED_OUT' : 'AVAILABLE_IN_LOCKER',
    currentHolderStudentId: isLent ? `STU-2024-${String(1 + (i % 100)).padStart(4, '0')}` : null,
    checkedOutTimestamp: isLent ? '2026-09-04T16:00:00.000Z' : null,
    maxPermittedLendingHours: 4,
    sportsOfficerSupervisor: 'Coach Virender Negi (Physical Education Director)'
  });
}

module.exports = {
  SPORTS_EQUIPMENT_DATABASE
};
