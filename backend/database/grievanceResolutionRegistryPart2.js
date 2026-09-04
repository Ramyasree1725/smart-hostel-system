/**
 * @fileoverview Smart Hostel Management System - Grievance Master Registry Part 2
 * @module backend/database/grievanceResolutionRegistryPart2
 * @description Master grievance tickets dataset records 251 to 500.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const GRIEVANCE_REGISTRY_PART2 = [];

const ISSUES_2 = [
  { title: 'Mess Dinner Food Served Lukewarm', cat: 'Mess & Food Quality', sev: 'HIGH', tech: 'Chef Sanjeev' },
  { title: 'Corridor LED Tube Light Flickering', cat: 'Electrical & Power', sev: 'LOW', tech: 'Ramu Electrician' },
  { title: 'Drinking Water Purifier Filter Inspection', cat: 'Plumbing & Water Supply', sev: 'MEDIUM', tech: 'Narsimha Plumber' },
  { title: 'Study Table Drawer Sliding Rail Alignment', cat: 'Furniture & Carpentry', sev: 'LOW', tech: 'David Carpenter' }
];

for (let i = 251; i <= 500; i++) {
  const tpl = ISSUES_2[i % ISSUES_2.length];
  const isRes = i % 4 !== 0;

  GRIEVANCE_REGISTRY_PART2.push({
    ticketUid: `TKT-P2-${String(i).padStart(4, '0')}`,
    ticketId: `TKT-${1000 + i}`,
    studentId: `STU-EXT-${String(i).padStart(4, '0')}`,
    studentName: `Resident Student ${i}`,
    roomNumber: `C-${100 + (i % 50)}`,
    title: `${tpl.title} (#${i})`,
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
  GRIEVANCE_REGISTRY_PART2
};
