/**
 * @fileoverview Smart Hostel Management System - Gate Pass Outing Log Chunk 04
 * @module backend/database/gatePassLogChunk04
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const GATE_PASS_LOG_CHUNK_04 = [];

for (let i = 1; i <= 100; i++) {
  const isApproved = i % 8 !== 0;
  const isOut = isApproved && (i % 3 !== 0);
  const isReturned = isOut && (i % 2 === 0);

  let status = 'Approved';
  if (!isApproved) status = 'Rejected';
  else if (isReturned) status = 'Checked In';
  else if (isOut) status = 'Checked Out';
  else if (i % 4 === 0) status = 'Pending';

  GATE_PASS_LOG_CHUNK_04.push({
    chunkId: 'GP-LOG-04',
    logIndex: i,
    passId: `GP-C4-${1000 + i}`,
    studentId: `STU-CHUNK04-${String(i).padStart(4, '0')}`,
    studentName: `Resident Student C4-${i}`,
    roomNumber: `B-${100 + (i % 25)}`,
    outingType: 'MEDICAL_APPOINTMENT',
    destination: 'City Hospital Clinic',
    departureTime: '2026-09-04 10:00',
    expectedReturnTime: '2026-09-04 16:00',
    actualOutTime: isOut ? '2026-09-04 10:15' : null,
    actualInTime: isReturned ? '2026-09-04 15:45' : null,
    status: status,
    approvedBy: 'Dr. Sunita Rao (Warden)',
    securityGuard: isOut ? 'Guard Ramesh Gurung' : null
  });
}

module.exports = {
  GATE_PASS_LOG_CHUNK_04
};
