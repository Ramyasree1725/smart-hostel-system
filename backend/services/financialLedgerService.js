/**
 * @fileoverview Smart Hostel Management System - Financial Ledger & Fee Reconciliation Service
 * @module backend/services/financialLedgerService
 * @description Manages double-entry fee transactions, semester billing, security deposits,
 * fine assessments, refund processing, and automated payment receipts.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Transaction type definitions.
 * @readonly
 * @enum {string}
 */
const TRANSACTION_TYPES = Object.freeze({
  ROOM_FEE_PAYMENT: 'ROOM_FEE_PAYMENT',
  MESS_FEE_PAYMENT: 'MESS_FEE_PAYMENT',
  SECURITY_DEPOSIT: 'SECURITY_DEPOSIT',
  LATE_PAYMENT_FINE: 'LATE_PAYMENT_FINE',
  FACILITY_DAMAGE_FINE: 'FACILITY_DAMAGE_FINE',
  SECURITY_DEPOSIT_REFUND: 'SECURITY_DEPOSIT_REFUND',
  MESS_REBATE_CREDIT: 'MESS_REBATE_CREDIT',
  SCHOLARSHIP_CREDIT: 'SCHOLARSHIP_CREDIT',
  MAINTENANCE_SURCHARGE: 'MAINTENANCE_SURCHARGE'
});

/**
 * Payment processing states.
 * @readonly
 * @enum {string}
 */
const PAYMENT_STATUS = Object.freeze({
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  PARTIALLY_REFUNDED: 'PARTIALLY_REFUNDED',
  CANCELLED: 'CANCELLED'
});

/**
 * Payment modes accepted by hostel treasury.
 * @readonly
 * @enum {string}
 */
const PAYMENT_MODES = Object.freeze({
  UPI: 'UPI',
  NET_BANKING: 'NET_BANKING',
  DEBIT_CARD: 'DEBIT_CARD',
  CREDIT_CARD: 'CREDIT_CARD',
  DEMAND_DRAFT: 'DEMAND_DRAFT',
  CASH_COUNTER: 'CASH_COUNTER',
  BANK_TRANSFER_NEFT: 'BANK_TRANSFER_NEFT'
});

/**
 * Class representing the Financial Ledger Service.
 */
class FinancialLedgerService {
  /**
   * Initializes the financial ledger.
   * @param {Object} [options={}] - Configurable ledger options.
   */
  constructor(options = {}) {
    this.options = Object.assign({
      lateFeeDailyRate: 50,
      maxLateFeeCap: 2500,
      standardSecurityDeposit: 10000,
      currency: 'INR',
      semesterGracePeriodDays: 14,
      autoGenerateReceipts: true
    }, options);

    this.studentAccounts = new Map();
    this.ledgerEntries = [];
    this.auditTrail = [];
    this.receiptIndex = new Map();
  }

  /**
   * Creates or initializes a student financial billing account.
   * @param {string} studentId - Student identifier.
   * @param {Object} accountMeta - Initial balance and metadata.
   * @returns {Object} Created student billing profile.
   */
  createStudentAccount(studentId, accountMeta = {}) {
    if (!studentId) {
      throw new Error('Student ID is required to create a ledger account.');
    }

    if (this.studentAccounts.has(studentId)) {
      return this.studentAccounts.get(studentId);
    }

    const newAccount = {
      studentId: String(studentId),
      studentName: accountMeta.studentName || 'Unknown Student',
      roomNumber: accountMeta.roomNumber || 'Unassigned',
      block: accountMeta.block || 'A',
      roomFeeDue: Number(accountMeta.roomFeeDue) || 45000,
      roomFeePaid: Number(accountMeta.roomFeePaid) || 0,
      foodFeeDue: Number(accountMeta.foodFeeDue) || 35000,
      foodFeePaid: Number(accountMeta.foodFeePaid) || 0,
      securityDepositHeld: Number(accountMeta.securityDepositHeld) || 0,
      accumulatedFines: 0,
      totalCredits: 0,
      accountCreatedAt: new Date().toISOString(),
      lastTransactionAt: null,
      notes: []
    };

    this.studentAccounts.set(studentId, newAccount);
    return newAccount;
  }

  /**
   * Retrieves full ledger balance for a student.
   * @param {string} studentId - Student ID.
   * @returns {Object} Detailed financial breakdown.
   */
  getStudentBalance(studentId) {
    let account = this.studentAccounts.get(studentId);
    if (!account) {
      account = this.createStudentAccount(studentId);
    }

    const roomPending = Math.max(0, account.roomFeeDue - account.roomFeePaid);
    const foodPending = Math.max(0, account.foodFeeDue - account.foodFeePaid);
    const totalPending = roomPending + foodPending + account.accumulatedFines - account.totalCredits;

    const roomStatus = roomPending === 0 ? 'Paid' : (account.roomFeePaid > 0 ? 'Partially Paid' : 'Unpaid');
    const foodStatus = foodPending === 0 ? 'Paid' : (account.foodFeePaid > 0 ? 'Partially Paid' : 'Unpaid');

    return {
      studentId: account.studentId,
      studentName: account.studentName,
      roomNumber: account.roomNumber,
      currency: this.options.currency,
      roomFee: {
        total: account.roomFeeDue,
        paid: account.roomFeePaid,
        pending: roomPending,
        status: roomStatus
      },
      foodFee: {
        total: account.foodFeeDue,
        paid: account.foodFeePaid,
        pending: foodPending,
        status: foodStatus
      },
      securityDeposit: {
        held: account.securityDepositHeld,
        required: this.options.standardSecurityDeposit
      },
      accumulatedFines: account.accumulatedFines,
      availableCredits: account.totalCredits,
      totalOutstandingDues: Math.max(0, totalPending),
      isFullyClear: totalPending <= 0
    };
  }

  /**
   * Records a fee payment transaction for a student.
   * @param {Object} paymentData - Payment transaction payload.
   * @returns {Object} Payment confirmation and digital receipt.
   */
  recordPayment(paymentData) {
    const {
      studentId,
      amount,
      feeCategory = 'ROOM', // 'ROOM' or 'FOOD' or 'FINE' or 'DEPOSIT'
      paymentMode = PAYMENT_MODES.UPI,
      transactionRef = null,
      collectedBy = 'SYSTEM_PORTAL'
    } = paymentData;

    if (!studentId || !amount || amount <= 0) {
      return { success: false, message: 'Invalid payment parameters.' };
    }

    let account = this.studentAccounts.get(studentId);
    if (!account) {
      account = this.createStudentAccount(studentId);
    }

    const receiptId = `RCP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const txRef = transactionRef || `TXN-ONL-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    let allocatedTo = '';
    if (feeCategory.toUpperCase().includes('ROOM')) {
      account.roomFeePaid += Number(amount);
      allocatedTo = 'Hostel Room Accommodation Fee';
    } else if (feeCategory.toUpperCase().includes('FOOD') || feeCategory.toUpperCase().includes('MESS')) {
      account.foodFeePaid += Number(amount);
      allocatedTo = 'Hostel Mess & Dining Subscription';
    } else if (feeCategory.toUpperCase().includes('DEPOSIT')) {
      account.securityDepositHeld += Number(amount);
      allocatedTo = 'Hostel Caution Security Deposit';
    } else if (feeCategory.toUpperCase().includes('FINE')) {
      account.accumulatedFines = Math.max(0, account.accumulatedFines - Number(amount));
      allocatedTo = 'Disciplinary / Late Fine Settlement';
    } else {
      account.totalCredits += Number(amount);
      allocatedTo = 'General Student Hostel Wallet Credit';
    }

    account.lastTransactionAt = new Date().toISOString();

    const transactionRecord = {
      receiptNumber: receiptId,
      transactionId: txRef,
      studentId: studentId,
      studentName: account.studentName,
      amount: Number(amount),
      currency: this.options.currency,
      feeCategory: feeCategory,
      allocatedTo: allocatedTo,
      paymentMode: paymentMode,
      status: PAYMENT_STATUS.SUCCESS,
      timestamp: account.lastTransactionAt,
      collectedBy: collectedBy
    };

    this.ledgerEntries.push(transactionRecord);
    this.receiptIndex.set(receiptId, transactionRecord);

    return {
      success: true,
      receipt: transactionRecord,
      updatedBalance: this.getStudentBalance(studentId),
      message: `Payment of ${this.options.currency} ${amount} successfully recorded for ${account.studentName}.`
    };
  }

  /**
   * Levies a disciplinary, damage, or late payment fine.
   * @param {string} studentId - Student ID.
   * @param {number} amount - Fine amount.
   * @param {string} reason - Justification.
   * @param {string} issuedBy - Authority name.
   * @returns {Object} Fine assessment record.
   */
  assessFine(studentId, amount, reason, issuedBy = 'WARDEN_DESK') {
    if (!studentId || !amount || amount <= 0) {
      return { success: false, message: 'Valid student ID and positive fine amount required.' };
    }

    let account = this.studentAccounts.get(studentId);
    if (!account) {
      account = this.createStudentAccount(studentId);
    }

    account.accumulatedFines += Number(amount);

    const fineRecord = {
      fineId: `FINE-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      studentId: studentId,
      studentName: account.studentName,
      amount: Number(amount),
      reason: reason || 'Hostel code of conduct violation',
      issuedBy: issuedBy,
      issuedAt: new Date().toISOString()
    };

    this.auditTrail.push(fineRecord);

    return {
      success: true,
      fine: fineRecord,
      newTotalFines: account.accumulatedFines,
      message: `Fine of ${this.options.currency} ${amount} assessed against ${account.studentName}.`
    };
  }

  /**
   * Generates a treasury summary report for administration.
   * @returns {Object} Aggregate financial metrics.
   */
  generateTreasuryReport() {
    let totalRoomExpected = 0;
    let totalRoomCollected = 0;
    let totalFoodExpected = 0;
    let totalFoodCollected = 0;
    let totalSecurityHeld = 0;
    let totalFinesOutstanding = 0;

    for (const acc of this.studentAccounts.values()) {
      totalRoomExpected += acc.roomFeeDue;
      totalRoomCollected += acc.roomFeePaid;
      totalFoodExpected += acc.foodFeeDue;
      totalFoodCollected += acc.foodFeePaid;
      totalSecurityHeld += acc.securityDepositHeld;
      totalFinesOutstanding += acc.accumulatedFines;
    }

    const totalExpectedRevenue = totalRoomExpected + totalFoodExpected;
    const totalCollectedRevenue = totalRoomCollected + totalFoodCollected;
    const totalPendingDues = Math.max(0, totalExpectedRevenue - totalCollectedRevenue);

    return {
      generatedAt: new Date().toISOString(),
      currency: this.options.currency,
      totalAccountsTracked: this.studentAccounts.size,
      totalTransactionsProcessed: this.ledgerEntries.length,
      revenueSummary: {
        totalExpectedRevenue,
        totalCollectedRevenue,
        totalPendingDues,
        collectionEfficiencyRate: totalExpectedRevenue > 0 ? parseFloat(((totalCollectedRevenue / totalExpectedRevenue) * 100).toFixed(2)) : 0
      },
      roomFeeBreakdown: {
        expected: totalRoomExpected,
        collected: totalRoomCollected,
        outstanding: Math.max(0, totalRoomExpected - totalRoomCollected)
      },
      messFeeBreakdown: {
        expected: totalFoodExpected,
        collected: totalFoodCollected,
        outstanding: Math.max(0, totalFoodExpected - totalFoodCollected)
      },
      ancillary: {
        securityDepositsHeld: totalSecurityHeld,
        unpaidFines: totalFinesOutstanding
      }
    };
  }
}

module.exports = {
  FinancialLedgerService,
  TRANSACTION_TYPES,
  PAYMENT_STATUS,
  PAYMENT_MODES
};
