/**
 * @fileoverview Smart Hostel Management System - Gate Pass History Part 2
 * @module backend/database/gatePassFullHistoryPart2
 * @description Master gate pass history dataset records 251 to 500.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const GATE_PASS_FULL_HISTORY_PART2 = [];

for (let i = 251; i <= 500; i++) {
  const isApproved = i % 8 !== 0;
  const isOut = isApproved && (i % 3 !== 0);
  const isReturned = isOut && (i % 2 === 0);

  let status = 'Approved';
  if (!isApproved) status = 'Rejected';
  else if (isReturned) status = 'Checked In';
  else if (isOut) status = 'Checked Out';
  else if (i % 4 === 0) status = 'Pending';

  GATE_PASS_FULL_HISTORY_PART2.push({
    historyId: `GP-HIST-P2-${String(i).padStart(4, '0')}`,
    passId: `GP-${1000 + i}`,
    studentId: `STU-EXT-${String(i).padStart(4, '0')}`,
    studentName: `Resident Student ${i}`,
    roomNumber: `C-${100 + (i % 50)}`,
    destination: 'Hometown Family Visit',
    departureTime: '2026-09-04 15:00',
    expectedReturnTime: '2026-09-04 21:00',
    actualOutTime: isOut ? '2026-09-04 15:15' : null,
    actualInTime: isReturned ? '2026-09-04 20:45' : null,
    status: status,
    approvedBy: 'Dr. Sunita Rao (Warden)',
    guardOnDuty: isOut ? 'Guard Virender Yadav' : null
  });
}

module.exports = {
  GATE_PASS_FULL_HISTORY_PART2
};
