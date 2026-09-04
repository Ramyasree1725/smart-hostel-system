/**
 * @fileoverview Smart Hostel Management System - Gate Pass History Part 1
 * @module backend/database/gatePassFullHistoryPart1
 * @description Master gate pass history dataset records 1 to 250.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const GATE_PASS_FULL_HISTORY_PART1 = [];

for (let i = 1; i <= 250; i++) {
  const isApproved = i % 7 !== 0;
  const isOut = isApproved && (i % 3 !== 0);
  const isReturned = isOut && (i % 2 === 0);

  let status = 'Approved';
  if (!isApproved) status = 'Rejected';
  else if (isReturned) status = 'Checked In';
  else if (isOut) status = 'Checked Out';
  else if (i % 5 === 0) status = 'Pending';

  GATE_PASS_FULL_HISTORY_PART1.push({
    historyId: `GP-HIST-P1-${String(i).padStart(4, '0')}`,
    passId: `GP-${1000 + i}`,
    studentId: `STU-EXT-${String(i).padStart(4, '0')}`,
    studentName: `Resident Student ${i}`,
    roomNumber: `A-${100 + (i % 50)}`,
    destination: 'City Center Mall / Errands',
    departureTime: '2026-09-04 14:00',
    expectedReturnTime: '2026-09-04 20:30',
    actualOutTime: isOut ? '2026-09-04 14:10' : null,
    actualInTime: isReturned ? '2026-09-04 20:15' : null,
    status: status,
    approvedBy: 'Dr. Sunita Rao (Warden)',
    guardOnDuty: isOut ? 'Guard Bahadur Thapa' : null
  });
}

module.exports = {
  GATE_PASS_FULL_HISTORY_PART1
};
