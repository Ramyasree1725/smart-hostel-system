/**
 * @fileoverview Smart Hostel Management System - Master Grievance Catalog A
 * @module backend/database/hostelGrievanceMasterCatalogA
 * @description Grievance records 1 to 100 for Block A.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const GRIEVANCES_CATALOG_A = [];

const ISSUES_A = [
  { title: 'Ceiling Fan Making High Noise in Room', cat: 'Electrical & Power', sev: 'MEDIUM', tech: 'Ramu Electrician' },
  { title: 'Bathroom Tap Leaking Water Continuously', cat: 'Plumbing & Water Supply', sev: 'HIGH', tech: 'Narsimha Plumber' },
  { title: 'Wi-Fi Signal Drops Randomly Near Room', cat: 'WiFi & Network Infrastructure', sev: 'MEDIUM', tech: 'Anand LAN Admin' },
  { title: 'Wardrobe Locker Key Sticking in Lock', cat: 'Furniture & Carpentry', sev: 'LOW', tech: 'David Carpenter' }
];

for (let i = 1; i <= 100; i++) {
  const tpl = ISSUES_A[i % ISSUES_A.length];
  const isRes = i % 4 !== 0;

  GRIEVANCES_CATALOG_A.push({
    ticketId: `TKT-A-${1000 + i}`,
    studentId: `STU-BLKA-${String(i).padStart(3, '0')}`,
    studentName: `Resident Student ${i}`,
    roomNumber: `A-${100 + (i % 25)}`,
    issueTitle: `${tpl.title} (#${i})`,
    category: tpl.cat,
    severity: tpl.sev,
    status: isRes ? 'Resolved' : 'In Progress',
    loggedDate: '2026-09-02',
    resolvedDate: isRes ? '2026-09-02' : null,
    assignedTechnician: tpl.tech,
    feedbackRating: isRes ? 5 : null
  });
}

module.exports = {
  GRIEVANCES_CATALOG_A
};
