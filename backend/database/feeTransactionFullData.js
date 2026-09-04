/**
 * @fileoverview Smart Hostel Management System - Financial Fee Transactions Master Archive
 * @module backend/database/feeTransactionFullData
 * @description Master institutional financial database containing 1,200 student billing ledger accounts,
 * itemized room rent, mess subscriptions, fine receipts, rebate records, and payment logs.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const FULL_FEE_TRANSACTION_DATABASE = [];

for (let i = 1; i <= 1200; i++) {
  const studentId = `STU-2024-${String(i).padStart(4, '0')}`;
  const roomBase = (i % 3 === 0) ? 55000 : ((i % 5 === 0) ? 75000 : 45000);
  const messBase = 35000;
  const isRoomPaid = (i % 5 !== 0);
  const isMessPaid = (i % 4 !== 0);
  const fines = (i % 15 === 0) ? 500 : 0;

  const roomPaid = isRoomPaid ? roomBase : 0;
  const messPaid = isMessPaid ? messBase : 0;
  const totalPending = (roomBase - roomPaid) + (messBase - messPaid) + fines;

  FULL_FEE_TRANSACTION_DATABASE.push({
    ledgerIndex: i,
    transactionLedgerId: `TXN-LEDG-${String(i).padStart(5, '0')}`,
    studentId: studentId,
    academicSession: '2024-2025',
    currency: 'INR',
    feeBreakdown: {
      roomAccommodationAmount: roomBase,
      roomFeePaid: roomPaid,
      roomFeeStatus: isRoomPaid ? 'Paid' : 'Unpaid',
      roomPaymentReceipt: isRoomPaid ? `RCP-RM-${100000 + i}` : null,
      roomPaidTimestamp: isRoomPaid ? '2026-08-05T11:00:00.000Z' : null,

      messSubscriptionAmount: messBase,
      messFeePaid: messPaid,
      messFeeStatus: isMessPaid ? 'Paid' : 'Unpaid',
      messPaymentReceipt: isMessPaid ? `RCP-MS-${200000 + i}` : null,
      messPaidTimestamp: isMessPaid ? '2026-08-07T15:30:00.000Z' : null,

      cautionSecurityDeposit: 10000,
      annualMaintenanceCharge: 2500,
      assessedDisciplinaryFine: fines,
      fineJustification: fines > 0 ? 'Curfew late arrival fine' : 'None',
      messAbsenceRebateCredit: (i % 8 === 0) ? 1200 : 0
    },
    totalOutstandingDues: totalPending,
    isAccountClear: totalPending === 0,
    digitalAuditTrail: [
      { event: 'SEMESTER_INVOICE_GENERATED', amount: roomBase + messBase, timestamp: '2024-08-01T09:00:00.000Z' },
      ...(isRoomPaid ? [{ event: 'ROOM_FEE_PAYMENT_SETTLED', amount: roomBase, mode: 'UPI_COLLECT', timestamp: '2026-08-05T11:00:00.000Z' }] : []),
      ...(isMessPaid ? [{ event: 'MESS_FEE_PAYMENT_SETTLED', amount: messBase, mode: 'NET_BANKING', timestamp: '2026-08-07T15:30:00.000Z' }] : [])
    ]
  });
}

function getTreasurySummaryStatistics() {
  let totalBilled = 0;
  let totalCollected = 0;
  let totalRoomCollected = 0;
  let totalMessCollected = 0;

  for (const item of FULL_FEE_TRANSACTION_DATABASE) {
    const fb = item.feeBreakdown;
    totalBilled += fb.roomAccommodationAmount + fb.messSubscriptionAmount + fb.assessedDisciplinaryFine;
    totalCollected += fb.roomFeePaid + fb.messFeePaid;
    totalRoomCollected += fb.roomFeePaid;
    totalMessCollected += fb.messFeePaid;
  }

  return {
    totalAccounts: FULL_FEE_TRANSACTION_DATABASE.length,
    currency: 'INR',
    totalBilled,
    totalCollected,
    totalPending: totalBilled - totalCollected,
    collectionRatePercent: parseFloat(((totalCollected / totalBilled) * 100).toFixed(2)),
    roomFeeTotalCollected: totalRoomCollected,
    messFeeTotalCollected: totalMessCollected
  };
}

module.exports = {
  FULL_FEE_TRANSACTION_DATABASE,
  getTreasurySummaryStatistics
};
