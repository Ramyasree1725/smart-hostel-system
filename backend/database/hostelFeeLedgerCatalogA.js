/**
 * @fileoverview Smart Hostel Management System - Master Fee Ledger Catalog A
 * @module backend/database/hostelFeeLedgerCatalogA
 * @description Master financial ledger records for Block A residents.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const FEE_LEDGER_CATALOG_A = [];

for (let i = 1; i <= 100; i++) {
  const isRoomPaid = i % 5 !== 0;
  const isMessPaid = i % 4 !== 0;
  const roomAmount = 45000;
  const messAmount = 35000;
  const roomPaid = isRoomPaid ? roomAmount : 0;
  const messPaid = isMessPaid ? messAmount : 0;
  const totalPending = (roomAmount - roomPaid) + (messAmount - messPaid);

  FEE_LEDGER_CATALOG_A.push({
    ledgerId: `LEDG-A-${String(i).padStart(4, '0')}`,
    studentId: `STU-BLKA-${String(i).padStart(3, '0')}`,
    studentName: `Resident Student ${i}`,
    roomFee: {
      amountDue: roomAmount,
      amountPaid: roomPaid,
      status: isRoomPaid ? 'Paid' : 'Unpaid',
      receiptRef: isRoomPaid ? `RCP-RM-A-${1000 + i}` : null,
      timestamp: isRoomPaid ? '2026-08-05' : null
    },
    messFee: {
      amountDue: messAmount,
      amountPaid: messPaid,
      status: isMessPaid ? 'Paid' : 'Unpaid',
      receiptRef: isMessPaid ? `RCP-MS-A-${2000 + i}` : null,
      timestamp: isMessPaid ? '2026-08-07' : null
    },
    cautionDeposit: 10000,
    totalOutstanding: totalPending,
    isCleared: totalPending === 0,
    paymentMode: 'UPI_COLLECT',
    currency: 'INR'
  });
}

module.exports = {
  FEE_LEDGER_CATALOG_A
};
