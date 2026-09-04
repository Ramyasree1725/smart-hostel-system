/**
 * @fileoverview Smart Hostel Management System - Master Grievance Catalog B
 * @module backend/database/hostelGrievanceMasterCatalogB
 * @description Grievance records 1 to 100 for Block B.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const GRIEVANCES_CATALOG_B = [];

const ISSUES_B = [
  { title: 'Mess Dinner Food Served Lukewarm', cat: 'Mess & Food Quality', sev: 'HIGH', tech: 'Chef Sanjeev' },
  { title: 'Corridor LED Tube Light Flickering', cat: 'Electrical & Power', sev: 'LOW', tech: 'Ramu Electrician' },
  { title: 'Drinking Water Purifier Filter Inspection', cat: 'Plumbing & Water Supply', sev: 'MEDIUM', tech: 'Narsimha Plumber' },
  { title: 'Study Table Drawer Sliding Rail Alignment', cat: 'Furniture & Carpentry', sev: 'LOW', tech: 'David Carpenter' }
];

for (let i = 1; i <= 100; i++) {
  const tpl = ISSUES_B[i % ISSUES_B.length];
  const isRes = i % 4 !== 0;

  GRIEVANCES_CATALOG_B.push({
    ticketId: `TKT-B-${1000 + i}`,
    studentId: `STU-BLKB-${String(i).padStart(3, '0')}`,
    studentName: `Resident Student ${i}`,
    roomNumber: `B-${100 + (i % 25)}`,
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
  GRIEVANCES_CATALOG_B
};
