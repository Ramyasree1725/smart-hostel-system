/**
 * @fileoverview Smart Hostel Management System - Extended Fee Management Controller
 * @module backend/controllers/feeManagementControllerExtended
 * @description Comprehensive institutional financial operations controller managing
 * student fee invoicing, online UPI checkout intent generation, double-entry ledger reconciliation,
 * mess rebate credit processing, penalty fee assessment, and printable digital receipts.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const { FINANCIAL_LEDGER_DATABASE, getInstitutionalFinancialMetrics } = require('../services/financialLedgerReconciliation');

/**
 * Controller class for student financial accounts and payments.
 */
class FeeManagementControllerExtended {
  /**
   * Initializes fee controller.
   */
  constructor() {
    this.accounts = [...FINANCIAL_LEDGER_DATABASE];
    this.transactionJournal = [];
    this.receiptRepository = new Map();
  }

  /**
   * Retrieves complete financial status for a student by ID.
   * @param {string} studentId
   * @returns {Object|null}
   */
  getStudentFeeProfile(studentId) {
    if (!studentId) return null;
    const q = String(studentId).trim().toUpperCase();
    const account = this.accounts.find(a => a.studentId.toUpperCase() === q);
    if (!account) return null;

    const fees = account.feeStructure;
    const roomDue = Math.max(0, fees.roomAccommodationFee - fees.roomFeePaid);
    const messDue = Math.max(0, fees.messSubscriptionFee - fees.messFeePaid);
    const totalDue = roomDue + messDue + fees.assessedFines - fees.unallocatedWalletCredit;

    return {
      studentId: account.studentId,
      fiscalYear: account.fiscalYear,
      semester: account.semester,
      currency: account.currency,
      roomFee: {
        totalAmount: fees.roomAccommodationFee,
        paidAmount: fees.roomFeePaid,
        pendingAmount: roomDue,
        status: fees.roomFeeStatus,
        receiptRef: fees.roomPaymentReceiptRef
      },
      messFee: {
        totalAmount: fees.messSubscriptionFee,
        paidAmount: fees.messFeePaid,
        pendingAmount: messDue,
        status: fees.messFeeStatus,
        receiptRef: fees.messPaymentReceiptRef
      },
      cautionDeposit: {
        heldAmount: fees.cautionSecurityDepositHeld,
        status: 'HELD_IN_ESCROW'
      },
      fines: {
        totalAssessed: fees.assessedFines,
        reason: fees.finesReason
      },
      walletCredit: fees.unallocatedWalletCredit,
      totalOutstandingDues: Math.max(0, totalDue),
      isFullyClear: totalDue <= 0,
      paymentHistory: account.paymentHistory
    };
  }

  /**
   * Processes an incoming payment transaction.
   * @param {Object} paymentPayload - { studentId, category, amount, mode, txnRef }
   * @returns {Object} Payment receipt
   */
  processPaymentTransaction(paymentPayload) {
    const {
      studentId,
      category = 'ROOM',
      amount = 0,
      mode = 'UPI_INSTANT',
      txnRef = null
    } = paymentPayload;

    const account = this.accounts.find(a => a.studentId.toUpperCase() === String(studentId).toUpperCase());
    if (!account) {
      return { success: false, message: `Account not found for student ${studentId}.` };
    }

    const payAmount = Number(amount);
    if (payAmount <= 0) {
      return { success: false, message: 'Payment amount must be greater than zero.' };
    }

    const receiptNumber = `RCP-${category.slice(0, 2)}-${Date.now().toString().slice(-6)}`;
    const finalTxnRef = txnRef || `TXN-ONL-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    if (category.toUpperCase().includes('ROOM')) {
      account.feeStructure.roomFeePaid += payAmount;
      account.feeStructure.roomFeeStatus = 'Paid';
      account.feeStructure.roomPaymentReceiptRef = receiptNumber;
      account.feeStructure.roomPaymentTimestamp = new Date().toISOString();
    } else if (category.toUpperCase().includes('MESS') || category.toUpperCase().includes('FOOD')) {
      account.feeStructure.messFeePaid += payAmount;
      account.feeStructure.messFeeStatus = 'Paid';
      account.feeStructure.messPaymentReceiptRef = receiptNumber;
      account.feeStructure.messPaymentTimestamp = new Date().toISOString();
    } else {
      account.feeStructure.unallocatedWalletCredit += payAmount;
    }

    const receipt = {
      receiptNumber,
      transactionId: finalTxnRef,
      studentId: account.studentId,
      amount: payAmount,
      currency: 'INR',
      feeCategory: category,
      paymentMode: mode,
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      institution: 'Smart University Hostel Treasury Desk'
    };

    account.paymentHistory.push(receipt);
    this.receiptRepository.set(receiptNumber, receipt);

    return {
      success: true,
      receipt,
      updatedBalance: this.getStudentFeeProfile(studentId),
      message: `Payment of INR ${payAmount} recorded successfully. Receipt #${receiptNumber} generated.`
    };
  }

  /**
   * Generates total treasury summary.
   * @returns {Object}
   */
  getTreasuryOverview() {
    return getInstitutionalFinancialMetrics();
  }
}

module.exports = {
  FeeManagementControllerExtended
};
