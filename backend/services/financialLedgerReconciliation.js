/**
 * @fileoverview Smart Hostel Management System - Financial Ledger & Double-Entry Reconciliation
 * @module backend/services/financialLedgerReconciliation
 * @description Comprehensive institutional financial transaction ledger containing
 * semester invoices, payment journal entries, caution deposit accounting, mess rebate credits,
 * late fee penalties, and audited reconciliation records.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Chart of Accounts in the Hostel Financial Treasury.
 */
const CHART_OF_ACCOUNTS = Object.freeze({
  ACCOUNTS_RECEIVABLE_ROOM: '1100 - Hostel Room Accommodation Fee Receivable',
  ACCOUNTS_RECEIVABLE_MESS: '1200 - Mess & Dining Subscription Receivable',
  ACCOUNTS_RECEIVABLE_MAINTENANCE: '1300 - Campus Infrastructure Maintenance Receivable',
  SECURITY_DEPOSITS_LIABILITY: '2100 - Student Caution Security Deposit Liability',
  MESS_REBATE_EXPENSE: '5100 - Student Absence Mess Rebate Expense',
  FINE_PENALTY_INCOME: '4100 - Disciplinary & Curfew Late Fine Revenue',
  BANK_SETTLEMENT_ACCOUNT: '1010 - University Central Treasury Settlement Bank'
});

/**
 * Master Financial Ledger Records (1,000 Detailed Student Accounts).
 */
const FINANCIAL_LEDGER_DATABASE = [];

// Seed 1,000 ledger balance records
for (let i = 1; i <= 1000; i++) {
  const studentId = `STU-2024-${String(i).padStart(4, '0')}`;
  const roomBase = (i % 3 === 0) ? 55000 : ((i % 5 === 0) ? 75000 : 45000);
  const messBase = 35000;
  const isRoomPaid = (i % 6 !== 0);
  const isMessPaid = (i % 5 !== 0);
  const fines = (i % 14 === 0) ? 500 : ((i % 25 === 0) ? 1200 : 0);

  const roomPaidAmt = isRoomPaid ? roomBase : 0;
  const messPaidAmt = isMessPaid ? messBase : 0;
  const totalDue = (roomBase - roomPaidAmt) + (messBase - messPaidAmt) + fines;

  FINANCIAL_LEDGER_DATABASE.push({
    ledgerId: `LEDG-2024-${String(i).padStart(4, '0')}`,
    studentId: studentId,
    fiscalYear: '2024-2025',
    semester: (i % 2 === 0) ? 'Semester 2' : 'Semester 1',
    currency: 'INR',
    feeStructure: {
      roomAccommodationFee: roomBase,
      roomFeePaid: roomPaidAmt,
      roomFeeStatus: isRoomPaid ? 'Paid' : 'Unpaid',
      roomPaymentReceiptRef: isRoomPaid ? `RCP-RM-${100000 + i}` : null,
      roomPaymentTimestamp: isRoomPaid ? '2026-08-05T10:30:00.000Z' : null,

      messSubscriptionFee: messBase,
      messFeePaid: messPaidAmt,
      messFeeStatus: isMessPaid ? 'Paid' : 'Unpaid',
      messPaymentReceiptRef: isMessPaid ? `RCP-MS-${200000 + i}` : null,
      messPaymentTimestamp: isMessPaid ? '2026-08-07T14:15:00.000Z' : null,

      cautionSecurityDepositHeld: 10000,
      amenityMaintenanceFee: 2500,
      amenityFeePaid: true,

      assessedFines: fines,
      finesReason: fines > 0 ? 'Curfew late check-in penalty' : 'None',
      unallocatedWalletCredit: (i % 10 === 0) ? 1500 : 0
    },
    totalOutstandingPayable: totalDue,
    isFullySettled: totalDue === 0,
    lastAuditReconciledDate: '2026-09-01',
    paymentHistory: [
      ...(isRoomPaid ? [{
        txnId: `TXN-ONL-RM-${i}`,
        type: 'ROOM_FEE',
        amount: roomBase,
        mode: 'UPI_GATEWAY',
        status: 'SUCCESS',
        timestamp: '2026-08-05T10:30:00.000Z'
      }] : []),
      ...(isMessPaid ? [{
        txnId: `TXN-ONL-MS-${i}`,
        type: 'MESS_FEE',
        amount: messBase,
        mode: 'NET_BANKING',
        status: 'SUCCESS',
        timestamp: '2026-08-07T14:15:00.000Z'
      }] : [])
    ]
  });
}

/**
 * Calculates aggregate financial statistics across the entire university hostel system.
 * @returns {Object} Institutional revenue summary.
 */
function getInstitutionalFinancialMetrics() {
  let totalRoomBilled = 0;
  let totalRoomCollected = 0;
  let totalMessBilled = 0;
  let totalMessCollected = 0;
  let totalFinesAssessed = 0;
  let totalCautionDepositsHeld = 0;
  let fullyPaidAccounts = 0;
  let defaulterAccounts = 0;

  for (const account of FINANCIAL_LEDGER_DATABASE) {
    totalRoomBilled += account.feeStructure.roomAccommodationFee;
    totalRoomCollected += account.feeStructure.roomFeePaid;
    totalMessBilled += account.feeStructure.messSubscriptionFee;
    totalMessCollected += account.feeStructure.messFeePaid;
    totalFinesAssessed += account.feeStructure.assessedFines;
    totalCautionDepositsHeld += account.feeStructure.cautionSecurityDepositHeld;

    if (account.isFullySettled) {
      fullyPaidAccounts++;
    } else {
      defaulterAccounts++;
    }
  }

  const grandTotalBilled = totalRoomBilled + totalMessBilled + totalFinesAssessed;
  const grandTotalCollected = totalRoomCollected + totalMessCollected;
  const collectionEfficiencyPercent = grandTotalBilled > 0
    ? parseFloat(((grandTotalCollected / grandTotalBilled) * 100).toFixed(2))
    : 0;

  return {
    totalAccountsTracked: FINANCIAL_LEDGER_DATABASE.length,
    currency: 'INR',
    grandTotalBilled,
    grandTotalCollected,
    grandTotalOutstanding: grandTotalBilled - grandTotalCollected,
    collectionEfficiencyPercent,
    roomFeeMetrics: {
      billed: totalRoomBilled,
      collected: totalRoomCollected,
      pending: totalRoomBilled - totalRoomCollected
    },
    messFeeMetrics: {
      billed: totalMessBilled,
      collected: totalMessCollected,
      pending: totalMessBilled - totalMessCollected
    },
    ancillaryTreasury: {
      totalCautionDepositsHeld,
      totalFinesAssessed
    },
    accountCounts: {
      fullyPaid: fullyPaidAccounts,
      withDues: defaulterAccounts
    }
  };
}

module.exports = {
  CHART_OF_ACCOUNTS,
  FINANCIAL_LEDGER_DATABASE,
  getInstitutionalFinancialMetrics
};
