/**
 * @fileoverview Smart Hostel Management System - Gate Pass & Curfew Compliance Monitoring
 * @module backend/services/gatePassCurfewMonitoring
 * @description Comprehensive digital security checkpoint transaction database containing
 * student out-passes, guard check-in/out logs, biometric facial timestamp scans, parent SMS dispatches,
 * curfew breach alerts, and visitor passes.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Gate Pass & Security Movement Records (500 Historical Logs).
 */
const GATE_PASS_MASTER_ARCHIVE = [];

const REASONS = [
  'Visiting Hometown / Family Vacation',
  'Inter-College Technical Symposium Hackathon',
  'Medical Consultation & Hospital Follow-up',
  'Academic Project Work at Central Library',
  'Personal Day Outing / Shopping Errands',
  'Internship Onsite Client Review Meeting',
  'Competitive Examination (GATE / GRE / CAT)',
  'Family Function / Wedding Ceremony'
];

const DESTINATIONS = [
  'Hyderabad Old City / Banjara Hills',
  'Secunderabad Railway Station',
  'Rajiv Gandhi International Airport (RGIA)',
  'Gachibowli Financial District',
  'Hi-Tech City Cyber Towers',
  'Apollo Hospitals Jubilee Hills',
  'Central City Mall & Inorbit',
  'Family Residence (Outstation)'
];

// Seed 500 gate passes
for (let i = 1; i <= 500; i++) {
  const studentId = `STU-2024-${String(1 + (i % 300)).padStart(4, '0')}`;
  const passId = `GP-2026-${String(i).padStart(4, '0')}`;
  const reason = REASONS[i % REASONS.length];
  const destination = DESTINATIONS[i % DESTINATIONS.length];
  const isApproved = (i % 10 !== 0);
  const isUsedOut = isApproved && (i % 3 !== 0);
  const isReturned = isUsedOut && (i % 2 === 0);
  const isLate = isReturned && (i % 7 === 0);

  let status = 'Approved';
  if (!isApproved) status = 'Rejected';
  else if (isReturned) status = 'Checked In';
  else if (isUsedOut) status = 'Checked Out';
  else if (i % 5 === 0) status = 'Pending';

  GATE_PASS_MASTER_ARCHIVE.push({
    passId: passId,
    studentId: studentId,
    studentName: `Resident Student ${studentId}`,
    roomNumber: `A-${100 + (i % 50)}`,
    parentContact: `+91 97000 ${String(10000 + i).slice(0, 5)}`,
    requestDetails: {
      outingCategory: reason.includes('Hometown') ? 'HOME_VISIT' : 'LOCAL_OUTING',
      reason: reason,
      destination: destination,
      submittedTimestamp: '2026-09-02T10:00:00.000Z',
      scheduledDeparture: '2026-09-04 14:00',
      scheduledReturn: '2026-09-04 20:30'
    },
    wardenApproval: {
      status: status,
      actionTakenBy: 'Dr. Sunita Rao (Warden)',
      actionTimestamp: isApproved ? '2026-09-02T16:30:00.000Z' : null,
      remarks: isApproved ? 'Approved for sanctioned outing.' : 'Disapproved due to academic clash.'
    },
    securityGateLog: {
      outGateNumber: 'Gate 1 (North Main)',
      actualOutTime: isUsedOut ? '2026-09-04 14:15' : null,
      guardOutSignature: isUsedOut ? 'Guard Bahadur Thapa' : null,

      inGateNumber: isReturned ? 'Gate 1 (North Main)' : null,
      actualInTime: isReturned ? (isLate ? '2026-09-04 21:45' : '2026-09-04 20:15') : null,
      guardInSignature: isReturned ? 'Guard Virender Yadav' : null,

      curfewViolationFlag: isLate,
      minutesDelayed: isLate ? 75 : 0
    },
    notificationReceipt: {
      parentSmsSent: true,
      parentSmsTimestamp: '2026-09-02T16:31:00.000Z',
      smsDeliveryStatus: 'DELIVERED_CARRIER_CONFIRMED'
    }
  });
}

/**
 * Retrieves all active outings currently checked out of campus.
 * @returns {Array<Object>}
 */
function getActiveOutingsArchive() {
  return GATE_PASS_MASTER_ARCHIVE.filter(p => p.wardenApproval.status === 'Checked Out');
}

module.exports = {
  GATE_PASS_MASTER_ARCHIVE,
  getActiveOutingsArchive
};
