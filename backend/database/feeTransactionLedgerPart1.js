/**
 * @fileoverview Smart Hostel Management System - Financial Fee Ledger Part 1
 * @module backend/database/feeTransactionLedgerPart1
 * @description Itemized financial transactions for hostel resident accounts 1 to 250.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const FEE_TRANSACTION_LEDGER_PART1 = [];

for (let i = 1; i <= 250; i++) {
  const isRoomPaid = i % 5 !== 0;
  const isMessPaid = i % 4 !== 0;
  const roomAmount = (i % 3 === 0) ? 55000 : 45000;
  const messAmount = 35000;
  const roomPaid = isRoomPaid ? roomAmount : 0;
  const messPaid = isMessPaid ? messAmount : 0;
  const totalDue = (roomAmount - roomPaid) + (messAmount - messPaid);

  FEE_TRANSACTION_LEDGER_PART1.push({
    ledgerId: `TXN-P1-${String(i).padStart(4, '0')}`,
    studentId: `STU-EXT-${String(i).padStart(4, '0')}`,
    studentName: `Resident Student ${i}`,
    roomFee: {
      amountDue: roomAmount,
      amountPaid: roomPaid,
      status: isRoomPaid ? 'Paid' : 'Unpaid',
      receiptNo: isRoomPaid ? `RCP-RM-${10000 + i}` : null,
      paidDate: isRoomPaid ? '2026-08-05' : null
    },
    messFee: {
      amountDue: messAmount,
      amountPaid: messPaid,
      status: isMessPaid ? 'Paid' : 'Unpaid',
      receiptNo: isMessPaid ? `RCP-MS-${20000 + i}` : null,
      paidDate: isMessPaid ? '2026-08-07' : null
    },
    totalOutstandingDues: totalDue,
    isCleared: totalDue === 0,
    paymentMode: 'UPI_DIRECT',
    currency: 'INR'
  });
}

module.exports = {
  FEE_TRANSACTION_LEDGER_PART1
};
