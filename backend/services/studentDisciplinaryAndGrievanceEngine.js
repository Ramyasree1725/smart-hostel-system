/**
 * @fileoverview Smart Hostel Management System - Student Disciplinary & Grievance Master Engine
 * @module backend/services/studentDisciplinaryAndGrievanceEngine
 * @description Master catalog of student maintenance complaints, infrastructure repair tickets,
 * NLP category classifications, warden SLAs, proctorial hearing cases, and student feedback satisfaction ratings.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Grievance Master Archive (500 Registered Support Tickets).
 */
const GRIEVANCE_MASTER_DATABASE = [];

const COMPLAINT_TITLES = [
  { title: 'Ceiling Fan Making Squeaking Noise in Room', cat: 'Electrical & Power', sev: 'MEDIUM', hours: 24 },
  { title: 'Bathroom Tap Leaking Continuously in Washroom', cat: 'Plumbing & Water Supply', sev: 'HIGH', hours: 12 },
  { title: 'Wi-Fi Signal Weak on 3rd Floor East Wing', cat: 'WiFi & Network Infrastructure', sev: 'MEDIUM', hours: 24 },
  { title: 'Door Lock Cylinder Jammed / Key Sticking', cat: 'Furniture & Carpentry', sev: 'HIGH', hours: 12 },
  { title: 'Mess Lunch Food Served Cold Today', cat: 'Mess & Food Quality', sev: 'HIGH', hours: 8 },
  { title: 'Corridor Tube Light Flickering Near Room 204', cat: 'Electrical & Power', sev: 'LOW', hours: 48 },
  { title: 'Water Cooler on 2nd Floor Not Chilling', cat: 'Plumbing & Water Supply', sev: 'MEDIUM', hours: 24 },
  { title: 'Window Glass Latch Broken Due to High Winds', cat: 'Furniture & Carpentry', sev: 'MEDIUM', hours: 24 },
  { title: 'Room Cleaning Housekeeping Requested', cat: 'Sanitation & Housekeeping', sev: 'LOW', hours: 48 },
  { title: 'Study Table Drawer Railing Off Track', cat: 'Furniture & Carpentry', sev: 'LOW', hours: 48 }
];

// Seed 500 grievance tickets
for (let i = 1; i <= 500; i++) {
  const template = COMPLAINT_TITLES[i % COMPLAINT_TITLES.length];
  const ticketId = `TKT-2026-${String(i).padStart(4, '0')}`;
  const studentId = `STU-2024-${String(1 + (i % 250)).padStart(4, '0')}`;
  const isResolved = (i % 5 !== 0);

  GRIEVANCE_MASTER_DATABASE.push({
    ticketId: ticketId,
    studentId: studentId,
    studentName: `Resident ${studentId}`,
    roomNumber: `B-${100 + (i % 50)}`,
    title: `${template.title} #${i}`,
    category: template.cat,
    severity: template.sev,
    slaTargetHours: template.hours,
    status: isResolved ? 'Resolved' : 'In Progress',
    loggedDate: '2026-09-02T08:30:00.000Z',
    targetResolutionDate: '2026-09-03T08:30:00.000Z',
    actualResolvedDate: isResolved ? '2026-09-02T17:45:00.000Z' : null,
    assignedTechnician: {
      name: 'Ramu Electrician / Plumber Team',
      phone: '+91 98765 44001',
      assignedDate: '2026-09-02T09:00:00.000Z'
    },
    resolutionSummary: isResolved ? 'Replaced worn gasket and tightened brass fittings. Verified no leaks.' : null,
    studentFeedbackRating: isResolved ? (4 + (i % 2)) : null,
    studentFeedbackComments: isResolved ? 'Prompt repair by hostel maintenance team.' : null
  });
}

/**
 * Calculates grievance resolution statistics.
 * @returns {Object}
 */
function getGrievanceAnalyticsSummary() {
  const total = GRIEVANCE_MASTER_DATABASE.length;
  const resolved = GRIEVANCE_MASTER_DATABASE.filter(g => g.status === 'Resolved').length;
  const inProgress = total - resolved;

  return {
    totalTicketsLogged: total,
    resolvedTickets: resolved,
    inProgressTickets: inProgress,
    resolutionEfficiencyPercentage: parseFloat(((resolved / total) * 100).toFixed(2))
  };
}

module.exports = {
  GRIEVANCE_MASTER_DATABASE,
  getGrievanceAnalyticsSummary
};
