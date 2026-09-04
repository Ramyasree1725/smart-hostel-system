/**
 * @fileoverview Smart Hostel Management System - Gate Pass Outing Log Chunk 02
 * @module backend/database/gatePassLogChunk02
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const GATE_PASS_LOG_CHUNK_02 = [];

for (let i = 1; i <= 100; i++) {
  const isApproved = i % 8 !== 0;
  const isOut = isApproved && (i % 3 !== 0);
  const isReturned = isOut && (i % 2 === 0);

  let status = 'Approved';
  if (!isApproved) status = 'Rejected';
  else if (isReturned) status = 'Checked In';
  else if (isOut) status = 'Checked Out';
  else if (i % 4 === 0) status = 'Pending';

  GATE_PASS_LOG_CHUNK_02.push({
    chunkId: 'GP-LOG-02',
    logIndex: i,
    passId: `GP-C2-${1000 + i}`,
    studentId: `STU-CHUNK02-${String(i).padStart(4, '0')}`,
    studentName: `Resident Student C2-${i}`,
    roomNumber: `A-${100 + (i % 25)}`,
    outingType: 'HOME_VISIT',
    destination: 'Hometown Family Visit',
    departureTime: '2026-09-04 15:00',
    expectedReturnTime: '2026-09-04 21:00',
    actualOutTime: isOut ? '2026-09-04 15:15' : null,
    actualInTime: isReturned ? '2026-09-04 20:45' : null,
    status: status,
    approvedBy: 'Dr. Sunita Rao (Warden)',
    securityGuard: isOut ? 'Guard Virender Yadav' : null
  });
}

module.exports = {
  GATE_PASS_LOG_CHUNK_02
};
