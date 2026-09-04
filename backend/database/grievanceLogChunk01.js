/**
 * @fileoverview Smart Hostel Management System - Grievance Ticket Log Chunk 01
 * @module backend/database/grievanceLogChunk01
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const GRIEVANCE_LOG_CHUNK_01 = [];

const ISSUES_C1 = [
  { title: 'Ceiling Fan Making Squeaking Noise in Room', cat: 'Electrical & Power', sev: 'MEDIUM', tech: 'Ramu Electrician' },
  { title: 'Bathroom Tap Leaking Water Continuously', cat: 'Plumbing & Water Supply', sev: 'HIGH', tech: 'Narsimha Plumber' },
  { title: 'Wi-Fi Signal Drops Randomly Near Room', cat: 'WiFi & Network Infrastructure', sev: 'MEDIUM', tech: 'Anand LAN Admin' },
  { title: 'Wardrobe Locker Key Sticking in Lock', cat: 'Furniture & Carpentry', sev: 'LOW', tech: 'David Carpenter' }
];

for (let i = 1; i <= 100; i++) {
  const tpl = ISSUES_C1[i % ISSUES_C1.length];
  const isRes = i % 4 !== 0;

  GRIEVANCE_LOG_CHUNK_01.push({
    chunkId: 'GRV-CHK-01',
    logIndex: i,
    ticketId: `TKT-C1-${1000 + i}`,
    studentId: `STU-CHUNK01-${String(i).padStart(4, '0')}`,
    studentName: `Resident Student C1-${i}`,
    roomNumber: `A-${100 + (i % 25)}`,
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
  GRIEVANCE_LOG_CHUNK_01
};
