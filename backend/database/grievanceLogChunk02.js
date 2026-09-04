/**
 * @fileoverview Smart Hostel Management System - Grievance Ticket Log Chunk 02
 * @module backend/database/grievanceLogChunk02
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const GRIEVANCE_LOG_CHUNK_02 = [];

const ISSUES_C2 = [
  { title: 'Mess Dinner Food Served Lukewarm', cat: 'Mess & Food Quality', sev: 'HIGH', tech: 'Chef Sanjeev' },
  { title: 'Corridor LED Tube Light Flickering', cat: 'Electrical & Power', sev: 'LOW', tech: 'Ramu Electrician' },
  { title: 'Drinking Water Purifier Filter Inspection', cat: 'Plumbing & Water Supply', sev: 'MEDIUM', tech: 'Narsimha Plumber' },
  { title: 'Study Table Drawer Sliding Rail Alignment', cat: 'Furniture & Carpentry', sev: 'LOW', tech: 'David Carpenter' }
];

for (let i = 1; i <= 100; i++) {
  const tpl = ISSUES_C2[i % ISSUES_C2.length];
  const isRes = i % 4 !== 0;

  GRIEVANCE_LOG_CHUNK_02.push({
    chunkId: 'GRV-CHK-02',
    logIndex: i,
    ticketId: `TKT-C2-${1000 + i}`,
    studentId: `STU-CHUNK02-${String(i).padStart(4, '0')}`,
    studentName: `Resident Student C2-${i}`,
    roomNumber: `B-${100 + (i % 25)}`,
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
  GRIEVANCE_LOG_CHUNK_02
};
