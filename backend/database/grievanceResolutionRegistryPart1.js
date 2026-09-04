/**
 * @fileoverview Smart Hostel Management System - Grievance Master Registry Part 1
 * @module backend/database/grievanceResolutionRegistryPart1
 * @description Master grievance tickets dataset records 1 to 250.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const GRIEVANCE_REGISTRY_PART1 = [];

const ISSUES_1 = [
  { title: 'Ceiling Fan Making Squeaking Noise in Room', cat: 'Electrical & Power', sev: 'MEDIUM', tech: 'Ramu Electrician' },
  { title: 'Bathroom Tap Leaking Water Continuously', cat: 'Plumbing & Water Supply', sev: 'HIGH', tech: 'Narsimha Plumber' },
  { title: 'Wi-Fi Signal Drops Randomly Near Room', cat: 'WiFi & Network Infrastructure', sev: 'MEDIUM', tech: 'Anand LAN Admin' },
  { title: 'Wardrobe Locker Key Sticking in Lock', cat: 'Furniture & Carpentry', sev: 'LOW', tech: 'David Carpenter' }
];

for (let i = 1; i <= 250; i++) {
  const tpl = ISSUES_1[i % ISSUES_1.length];
  const isRes = i % 4 !== 0;

  GRIEVANCE_REGISTRY_PART1.push({
    ticketUid: `TKT-P1-${String(i).padStart(4, '0')}`,
    ticketId: `TKT-${1000 + i}`,
    studentId: `STU-EXT-${String(i).padStart(4, '0')}`,
    studentName: `Resident Student ${i}`,
    roomNumber: `A-${100 + (i % 50)}`,
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
  GRIEVANCE_REGISTRY_PART1
};
