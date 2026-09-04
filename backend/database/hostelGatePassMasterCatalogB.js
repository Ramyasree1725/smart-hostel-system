/**
 * @fileoverview Smart Hostel Management System - Master Gate Pass Catalog B
 * @module backend/database/hostelGatePassMasterCatalogB
 * @description Master gate pass out-pass records for Block B.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const GATE_PASSES_CATALOG_B = [];

for (let i = 1; i <= 100; i++) {
  const isApproved = i % 8 !== 0;
  const isOut = isApproved && (i % 3 !== 0);
  const isReturned = isOut && (i % 2 === 0);

  let status = 'Approved';
  if (!isApproved) status = 'Rejected';
  else if (isReturned) status = 'Checked In';
  else if (isOut) status = 'Checked Out';
  else if (i % 4 === 0) status = 'Pending';

  GATE_PASSES_CATALOG_B.push({
    passId: `GP-B-${1000 + i}`,
    studentId: `STU-BLKB-${String(i).padStart(3, '0')}`,
    studentName: `Resident Student ${i}`,
    roomNumber: `B-${100 + (i % 25)}`,
    outingReason: 'Hometown Weekend Family Visit',
    destination: 'Hometown Residence',
    departureTime: '2026-09-04 15:00',
    expectedReturnTime: '2026-09-04 21:00',
    actualOutTime: isOut ? '2026-09-04 15:15' : null,
    actualInTime: isReturned ? '2026-09-04 20:45' : null,
    status: status,
    approvedBy: 'Dr. Sunita Rao (Warden)',
    securityOfficer: isOut ? 'Guard Virender Yadav' : null
  });
}

module.exports = {
  GATE_PASSES_CATALOG_B
};
