/**
 * @fileoverview Smart Hostel Management System - Fee Transaction Ledger Chunk 04
 * @module backend/database/feeLedgerChunk04
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const FEE_LEDGER_CHUNK_04 = [];

for (let i = 1; i <= 100; i++) {
  const isRPaid = i % 5 !== 0;
  const isMPaid = i % 4 !== 0;
  const rDue = 45000;
  const mDue = 35000;
  const rPaid = isRPaid ? rDue : 0;
  const mPaid = isMPaid ? mDue : 0;
  const totalDue = (rDue - rPaid) + (mDue - mPaid);

  FEE_LEDGER_CHUNK_04.push({
    ledgerChunkId: 'LEDG-CHK-04',
    transactionIndex: i,
    studentId: `STU-CHUNK04-${String(i).padStart(4, '0')}`,
    studentName: `Resident Student C4-${i}`,
    roomFeeDue: rDue,
    roomFeePaid: rPaid,
    roomFeeStatus: isRPaid ? 'Paid' : 'Unpaid',
    roomReceiptNumber: isRPaid ? `RCP-RM-C4-${1000 + i}` : null,
    roomPaymentDate: isRPaid ? '2026-08-05' : null,
    messFeeDue: mDue,
    messFeePaid: mPaid,
    messFeeStatus: isMPaid ? 'Paid' : 'Unpaid',
    messReceiptNumber: isMPaid ? `RCP-MS-C4-${2000 + i}` : null,
    messPaymentDate: isMPaid ? '2026-08-07' : null,
    cautionDeposit: 10000,
    totalOutstanding: totalDue,
    isAccountClear: totalDue === 0,
    paymentMode: 'NET_BANKING',
    currency: 'INR'
  });
}

module.exports = {
  FEE_LEDGER_CHUNK_04
};
