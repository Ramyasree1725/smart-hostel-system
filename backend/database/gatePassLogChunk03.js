/**
 * @fileoverview Smart Hostel Management System - Gate Pass Outing Log Chunk 03
 * @module backend/database/gatePassLogChunk03
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const GATE_PASS_LOG_CHUNK_03 = [];

for (let i = 1; i <= 100; i++) {
  const isApproved = i % 7 !== 0;
  const isOut = isApproved && (i % 3 !== 0);
  const isReturned = isOut && (i % 2 === 0);

  let status = 'Approved';
  if (!isApproved) status = 'Rejected';
  else if (isReturned) status = 'Checked In';
  else if (isOut) status = 'Checked Out';
  else if (i % 5 === 0) status = 'Pending';

  GATE_PASS_LOG_CHUNK_03.push({
    chunkId: 'GP-LOG-03',
    logIndex: i,
    passId: `GP-C3-${1000 + i}`,
    studentId: `STU-CHUNK03-${String(i).padStart(4, '0')}`,
    studentName: `Resident Student C3-${i}`,
    roomNumber: `B-${100 + (i % 25)}`,
    outingType: 'ACADEMIC_PROJECT',
    destination: 'University Central Library',
    departureTime: '2026-09-04 13:00',
    expectedReturnTime: '2026-09-04 19:30',
    actualOutTime: isOut ? '2026-09-04 13:10' : null,
    actualInTime: isReturned ? '2026-09-04 19:15' : null,
    status: status,
    approvedBy: 'Dr. Sunita Rao (Warden)',
    securityGuard: isOut ? 'Guard Manbir Singh' : null
  });
}

module.exports = {
  GATE_PASS_LOG_CHUNK_03
};
