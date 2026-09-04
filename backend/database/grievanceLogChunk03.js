/**
 * @fileoverview Smart Hostel Management System - Grievance Ticket Log Chunk 03
 * @module backend/database/grievanceLogChunk03
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const GRIEVANCE_LOG_CHUNK_03 = [];

const ISSUES_C3 = [
  { title: 'Room Window Latch Replacement Needed', cat: 'Furniture & Carpentry', sev: 'LOW', tech: 'David Carpenter' },
  { title: 'Washroom Exhaust Fan Stopped Working', cat: 'Electrical & Power', sev: 'MEDIUM', tech: 'Ramu Electrician' },
  { title: 'Shower Head Water Pressure Very Low', cat: 'Plumbing & Water Supply', sev: 'MEDIUM', tech: 'Narsimha Plumber' },
  { title: 'Mess Breakfast Sambar Taste Feedback', cat: 'Mess & Food Quality', sev: 'LOW', tech: 'Chef Sanjeev' }
];

for (let i = 1; i <= 100; i++) {
  const tpl = ISSUES_C3[i % ISSUES_C3.length];
  const isRes = i % 4 !== 0;

  GRIEVANCE_LOG_CHUNK_03.push({
    chunkId: 'GRV-CHK-03',
    logIndex: i,
    ticketId: `TKT-C3-${1000 + i}`,
    studentId: `STU-CHUNK03-${String(i).padStart(4, '0')}`,
    studentName: `Resident Student C3-${i}`,
    roomNumber: `C-${100 + (i % 25)}`,
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
  GRIEVANCE_LOG_CHUNK_03
};
