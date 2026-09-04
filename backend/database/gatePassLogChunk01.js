/**
 * @fileoverview Smart Hostel Management System - Gate Pass Outing Log Chunk 01
 * @module backend/database/gatePassLogChunk01
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const GATE_PASS_LOG_CHUNK_01 = [];

for (let i = 1; i <= 100; i++) {
  const isApproved = i % 7 !== 0;
  const isOut = isApproved && (i % 3 !== 0);
  const isReturned = isOut && (i % 2 === 0);

  let status = 'Approved';
  if (!isApproved) status = 'Rejected';
  else if (isReturned) status = 'Checked In';
  else if (isOut) status = 'Checked Out';
  else if (i % 5 === 0) status = 'Pending';

  GATE_PASS_LOG_CHUNK_01.push({
    chunkId: 'GP-LOG-01',
    logIndex: i,
    passId: `GP-C1-${1000 + i}`,
    studentId: `STU-CHUNK01-${String(i).padStart(4, '0')}`,
    studentName: `Resident Student C1-${i}`,
    roomNumber: `A-${100 + (i % 25)}`,
    outingType: 'LOCAL_OUTING',
    destination: 'City Shopping Center',
    departureTime: '2026-09-04 14:00',
    expectedReturnTime: '2026-09-04 20:30',
    actualOutTime: isOut ? '2026-09-04 14:10' : null,
    actualInTime: isReturned ? '2026-09-04 20:15' : null,
    status: status,
    approvedBy: 'Dr. Sunita Rao (Warden)',
    securityGuard: isOut ? 'Guard Bahadur Thapa' : null
  });
}

module.exports = {
  GATE_PASS_LOG_CHUNK_01
};
