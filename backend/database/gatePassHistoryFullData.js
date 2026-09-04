/**
 * @fileoverview Smart Hostel Management System - Complete Gate Pass & Outing History Database
 * @module backend/database/gatePassHistoryFullData
 * @description Master repository containing 1,000 digital gate pass outing requests,
 * warden approval records, guard check-in/out timestamps, and curfew violation logs.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const FULL_GATE_PASS_DATABASE = [];

const REASONS_LIST = [
  'Hometown Vacation Visit',
  'Inter-College Hackathon Competition',
  'Hospital Medical Checkup',
  'Academic Project Research at Main Library',
  'Personal Shopping & Errands',
  'Internship Technical Interview',
  'National Competitive Exam (GATE/CAT)',
  'Family Event & Gathering'
];

const DESTINATIONS_LIST = [
  'Hyderabad Old City / Banjara Hills',
  'Secunderabad Railway Junction',
  'Rajiv Gandhi Airport (RGIA)',
  'Gachibowli Financial District',
  'Hi-Tech City Cyber Gateway',
  'Apollo Hospital Jubilee Hills',
  'Central City Mall Commercial Hub',
  'Outstation Hometown Residence'
];

for (let i = 1; i <= 1000; i++) {
  const studentId = `STU-2024-${String(1 + (i % 500)).padStart(4, '0')}`;
  const passId = `GP-2026-${String(i).padStart(5, '0')}`;
  const reason = REASONS_LIST[i % REASONS_LIST.length];
  const destination = DESTINATIONS_LIST[i % DESTINATIONS_LIST.length];

  const isApproved = (i % 8 !== 0);
  const isUsedOut = isApproved && (i % 3 !== 0);
  const isReturned = isUsedOut && (i % 2 === 0);
  const isLate = isReturned && (i % 9 === 0);

  let status = 'Approved';
  if (!isApproved) status = 'Rejected';
  else if (isReturned) status = 'Checked In';
  else if (isUsedOut) status = 'Checked Out';
  else if (i % 5 === 0) status = 'Pending';

  FULL_GATE_PASS_DATABASE.push({
    passIndex: i,
    passId: passId,
    studentId: studentId,
    studentName: `Resident Student ${studentId}`,
    hostelRoom: `A-${100 + (i % 50)}`,
    emergencyContact: `+91 97000 ${String(10000 + i).slice(0, 5)}`,
    applicationData: {
      type: reason.includes('Hometown') ? 'HOME_VISIT' : 'LOCAL_DAY_OUTING',
      reason: reason,
      destination: destination,
      scheduledDeparture: '2026-09-04 14:00',
      scheduledReturn: '2026-09-04 20:30',
      submittedTimestamp: '2026-09-02T09:30:00.000Z'
    },
    wardenEvaluation: {
      status: status,
      wardenName: 'Dr. Sunita Rao (Warden)',
      evaluatedTimestamp: isApproved ? '2026-09-02T16:00:00.000Z' : null,
      wardenRemarks: isApproved ? 'Outing approved.' : 'Rejected due to academic hours.'
    },
    securityLog: {
      outGate: 'Gate 1 (North Entrance)',
      outTimestamp: isUsedOut ? '2026-09-04 14:10' : null,
      guardOut: isUsedOut ? 'Guard Bahadur Thapa' : null,

      inGate: isReturned ? 'Gate 1 (North Entrance)' : null,
      inTimestamp: isReturned ? (isLate ? '2026-09-04 21:50' : '2026-09-04 20:10') : null,
      guardIn: isReturned ? 'Guard Virender Yadav' : null,

      isCurfewBreached: isLate,
      minutesOverdue: isLate ? 80 : 0
    },
    parentNotification: {
      isSmsDelivered: true,
      deliveredTimestamp: '2026-09-02T16:01:00.000Z',
      carrierAck: 'SUCCESS_DELIVERED'
    }
  });
}

function getActiveOutsidePasses() {
  return FULL_GATE_PASS_DATABASE.filter(p => p.wardenEvaluation.status === 'Checked Out');
}

module.exports = {
  FULL_GATE_PASS_DATABASE,
  getActiveOutsidePasses
};
