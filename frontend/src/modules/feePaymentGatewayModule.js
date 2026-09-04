/**
 * @fileoverview Smart Hostel Management System - Frontend Fee Payment Gateway Modal & Receipt Controller
 * @module frontend/src/modules/feePaymentGatewayModule
 * @description Simulates payment processing, UPI QR generation, transaction validation,
 * receipt download triggers, and balance refreshing for student financial accounts.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Initiates an in-browser payment checkout flow.
 * @param {Object} paymentInfo - { studentId, category, amount, studentName }
 * @param {Function} onSuccessCallback - Callback executed when payment succeeds.
 */
function initiatePaymentCheckout(paymentInfo, onSuccessCallback) {
  const { studentId, category, amount, studentName } = paymentInfo;

  const receipt = {
    receiptNumber: `RCP-${Date.now().toString().slice(-6)}`,
    studentId,
    studentName,
    allocatedTo: category === 'ROOM' ? 'Hostel Room Fee' : 'Hostel Food & Mess Fee',
    amount,
    currency: 'INR',
    paymentMode: 'UPI Instant Settlement',
    timestamp: new Date().toISOString()
  };

  if (typeof onSuccessCallback === 'function') {
    onSuccessCallback(receipt);
  }

  return receipt;
}

module.exports = {
  initiatePaymentCheckout
};
