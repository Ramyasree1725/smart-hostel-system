/**
 * @fileoverview Smart Hostel Management System - Security Guard Shift Logs & Duty Roster Master
 * @module backend/database/securityGuardShiftLogsData
 * @description Master repository containing 1,000 security guard shift assignments,
 * biometric guard sign-ins, gate post rotations, incident logs, and perimeter patrol audits.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const FULL_GUARD_SHIFTS_DATABASE = [];

const GUARDS = [
  { name: 'Guard Bahadur Thapa', badge: 'SEC-01', phone: '+91 98765 20003' },
  { name: 'Guard Virender Yadav', badge: 'SEC-02', phone: '+91 98765 20004' },
  { name: 'Guard Manbir Singh', badge: 'SEC-03', phone: '+91 98765 20005' },
  { name: 'Guard Ramesh Gurung', badge: 'SEC-04', phone: '+91 98765 20006' },
  { name: 'Inspector Ram Singh (Head Officer)', badge: 'SEC-LEAD', phone: '+91 98765 20002' }
];

const POSTS = [
  'Main Campus Gate 1 (North Entrance)',
  'South Gate 2 (Staff & Delivery Entrance)',
  'Block C & D Women\'s Security Kiosk',
  'Night Patrol Perimeter Beat 1',
  'Central CCTV Control Room'
];

for (let i = 1; i <= 1000; i++) {
  const g = GUARDS[i % GUARDS.length];
  const p = POSTS[i % POSTS.length];
  const shiftType = (i % 3 === 0) ? 'NIGHT_PATROL (22:00 - 06:00)' : ((i % 2 === 0) ? 'EVENING (14:00 - 22:00)' : 'MORNING (06:00 - 14:00)');
  const shiftId = `SHF-2026-${String(i).padStart(5, '0')}`;

  FULL_GUARD_SHIFTS_DATABASE.push({
    shiftIndex: i,
    shiftId: shiftId,
    securityOfficer: g.name,
    badgeNumber: g.badge,
    contactNumber: g.phone,
    assignedPost: p,
    shiftTiming: shiftType,
    biometricSignIn: {
      isVerified: true,
      timestamp: '2026-09-04T05:55:00.000Z',
      terminalId: 'BIO-GATE-01'
    },
    dailyIncidentNotes: (i % 20 === 0) ? 'Curfew late arrival reported and logged in portal.' : 'Routine duty completed with zero safety incidents.',
    supervisorSignedOff: true
  });
}

module.exports = {
  FULL_GUARD_SHIFTS_DATABASE
};
