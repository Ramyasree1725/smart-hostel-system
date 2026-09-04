/**
 * @fileoverview Smart Hostel Management System - Complete Grievance & Maintenance Master Database
 * @module backend/database/grievanceResolutionFullData
 * @description Master repository containing 1,000 student maintenance grievance records,
 * NLP classification categories, assigned technicians, SLA timestamps, and student satisfaction feedback ratings.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const FULL_GRIEVANCE_DATABASE = [];

const GRIEVANCE_TYPES = [
  { title: 'Ceiling Fan Making High Noise in Room', cat: 'Electrical & Power', sev: 'MEDIUM', sla: 24, tech: 'Ramu Electrician' },
  { title: 'Washroom Water Tap Continuous Leakage', cat: 'Plumbing & Water Supply', sev: 'HIGH', sla: 12, tech: 'Narsimha Plumber' },
  { title: 'Wi-Fi Access Point Signal Drops in Wing', cat: 'WiFi & Network Infrastructure', sev: 'MEDIUM', sla: 24, tech: 'Anand LAN Admin' },
  { title: 'Wardrobe Door Lock Cylinder Sticking', cat: 'Furniture & Carpentry', sev: 'HIGH', sla: 12, tech: 'David Carpenter' },
  { title: 'Mess Lunch Curd Freshness Issue Reported', cat: 'Mess & Food Quality', sev: 'HIGH', sla: 8, tech: 'Chef Sanjeev' },
  { title: 'Corridor Tube Light Needs Replacement', cat: 'Electrical & Power', sev: 'LOW', sla: 48, tech: 'Ramu Electrician' },
  { title: 'Drinking Water Cooler Filter Inspection', cat: 'Plumbing & Water Supply', sev: 'MEDIUM', sla: 24, tech: 'Narsimha Plumber' },
  { title: 'Window Mosquito Mesh Torn by Winds', cat: 'Furniture & Carpentry', sev: 'LOW', sla: 48, tech: 'David Carpenter' }
];

for (let i = 1; i <= 1000; i++) {
  const gType = GRIEVANCE_TYPES[i % GRIEVANCE_TYPES.length];
  const ticketId = `TKT-2026-${String(i).padStart(5, '0')}`;
  const studentId = `STU-2024-${String(1 + (i % 400)).padStart(4, '0')}`;
  const isResolved = (i % 4 !== 0);

  FULL_GRIEVANCE_DATABASE.push({
    ticketIndex: i,
    ticketId: ticketId,
    studentId: studentId,
    studentName: `Resident ${studentId}`,
    roomNumber: `B-${100 + (i % 50)}`,
    title: `${gType.title} (#${i})`,
    category: gType.cat,
    severity: gType.sev,
    slaTargetHours: gType.sla,
    status: isResolved ? 'Resolved' : 'In Progress',
    loggedTimestamp: '2026-09-01T08:00:00.000Z',
    targetResolutionTimestamp: '2026-09-02T08:00:00.000Z',
    actualResolvedTimestamp: isResolved ? '2026-09-01T16:30:00.000Z' : null,
    assignedTechnician: {
      name: gType.tech,
      phone: '+91 98765 55001',
      assignedTimestamp: '2026-09-01T08:30:00.000Z'
    },
    resolutionSummary: isResolved ? 'Inspected on-site, replaced worn component and tested functionality.' : null,
    studentFeedback: {
      ratingScore: isResolved ? (4 + (i % 2)) : null,
      comments: isResolved ? 'Quick turnaround by hostel maintenance staff.' : null
    }
  });
}

function getGrievanceSummaryStats() {
  const total = FULL_GRIEVANCE_DATABASE.length;
  const resolved = FULL_GRIEVANCE_DATABASE.filter(g => g.status === 'Resolved').length;
  return {
    totalTickets: total,
    resolvedCount: resolved,
    inProgressCount: total - resolved,
    resolutionRatePercent: parseFloat(((resolved / total) * 100).toFixed(2))
  };
}

module.exports = {
  FULL_GRIEVANCE_DATABASE,
  getGrievanceSummaryStats
};
