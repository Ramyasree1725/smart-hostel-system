/**
 * @fileoverview Smart Hostel Management System - Master Gate Pass Catalog A
 * @module backend/database/hostelGatePassMasterCatalogA
 * @description Master gate pass out-pass records for Block A.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const GATE_PASSES_CATALOG_A = [];

for (let i = 1; i <= 100; i++) {
  const isApproved = i % 7 !== 0;
  const isOut = isApproved && (i % 3 !== 0);
  const isReturned = isOut && (i % 2 === 0);

  let status = 'Approved';
  if (!isApproved) status = 'Rejected';
  else if (isReturned) status = 'Checked In';
  else if (isOut) status = 'Checked Out';
  else if (i % 5 === 0) status = 'Pending';

  GATE_PASSES_CATALOG_A.push({
    passId: `GP-A-${1000 + i}`,
    studentId: `STU-BLKA-${String(i).padStart(3, '0')}`,
    studentName: `Resident Student ${i}`,
    roomNumber: `A-${100 + (i % 25)}`,
    outingReason: 'City Errands & Personal Shopping',
    destination: 'City Center Mall',
    departureTime: '2026-09-04 14:00',
    expectedReturnTime: '2026-09-04 20:30',
    actualOutTime: isOut ? '2026-09-04 14:10' : null,
    actualInTime: isReturned ? '2026-09-04 20:15' : null,
    status: status,
    approvedBy: 'Dr. Sunita Rao (Warden)',
    securityOfficer: isOut ? 'Guard Bahadur Thapa' : null
  });
}

module.exports = {
  GATE_PASSES_CATALOG_A
};
