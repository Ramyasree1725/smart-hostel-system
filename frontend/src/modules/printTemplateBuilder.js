/**
 * @fileoverview Smart Hostel Management System - Frontend Print Template & PDF Receipt Builder
 * @module frontend/src/modules/printTemplateBuilder
 * @description Generates printable HTML templates for Gate Passes, Fee Receipts, Room Allotment Letters,
 * and Disciplinary Notices formatted for thermal/A4 printing.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Builds HTML printable markup for an approved Digital Gate Pass.
 * @param {Object} pass - Gate pass details.
 * @returns {string} HTML markup string.
 */
function buildGatePassPrintTemplate(pass) {
  if (!pass) return '';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 20px auto; padding: 24px; border: 2px solid #2563eb; border-radius: 12px; background: #ffffff;">
      <div style="text-align: center; border-bottom: 2px dashed #93c5fd; padding-bottom: 16px; margin-bottom: 16px;">
        <h2 style="color: #1e3a8a; margin: 0 0 4px 0;">SMART HOSTEL SYSTEM</h2>
        <p style="margin: 0; font-size: 13px; color: #475569; font-weight: bold; text-transform: uppercase;">Official Digital Gate Pass</p>
      </div>

      <div style="margin-bottom: 16px; background: #f8fafc; padding: 12px; border-radius: 8px; font-size: 14px; line-height: 1.6;">
        <div style="display: flex; justify-content: space-between;"><strong>Pass ID:</strong> <span>${pass.passId || 'GP-1001'}</span></div>
        <div style="display: flex; justify-content: space-between;"><strong>Student:</strong> <span>${pass.studentName || 'Student'}</span></div>
        <div style="display: flex; justify-content: space-between;"><strong>Room No:</strong> <span>${pass.roomNumber || '101'}</span></div>
        <div style="display: flex; justify-content: space-between;"><strong>Destination:</strong> <span>${pass.destination || 'City'}</span></div>
        <div style="display: flex; justify-content: space-between;"><strong>Out Time:</strong> <span>${pass.departureTime || 'N/A'}</span></div>
        <div style="display: flex; justify-content: space-between;"><strong>Return By:</strong> <span>${pass.expectedReturnTime || 'N/A'}</span></div>
        <div style="display: flex; justify-content: space-between;"><strong>Parent Phone:</strong> <span>${pass.parentPhone || 'N/A'}</span></div>
      </div>

      <div style="text-align: center; margin: 16px 0; padding: 8px; background: #dcfce7; border: 1px solid #86efac; border-radius: 6px; color: #166534; font-weight: bold;">
        STATUS: ${pass.status || 'APPROVED'}
      </div>

      <div style="font-size: 11px; text-align: center; color: #64748b; margin-top: 12px; border-top: 1px solid #e2e8f0; padding-top: 8px;">
        Show this pass to security at the main gate. Curfew rules apply strictly.
      </div>
    </div>
  `;
}

/**
 * Builds HTML printable markup for a Fee Payment Receipt.
 * @param {Object} receipt - Receipt details.
 * @returns {string} HTML markup string.
 */
function buildFeeReceiptPrintTemplate(receipt) {
  if (!receipt) return '';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 20px auto; padding: 24px; border: 2px solid #059669; border-radius: 12px; background: #ffffff;">
      <div style="text-align: center; border-bottom: 2px dashed #6ee7b7; padding-bottom: 16px; margin-bottom: 16px;">
        <h2 style="color: #065f46; margin: 0 0 4px 0;">HOSTEL TREASURY</h2>
        <p style="margin: 0; font-size: 13px; color: #475569; font-weight: bold;">Official Payment Acknowledgement</p>
      </div>

      <div style="margin-bottom: 16px; font-size: 14px; line-height: 1.8;">
        <div><strong>Receipt No:</strong> ${receipt.receiptNumber || 'RCP-001'}</div>
        <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
        <div><strong>Student Name:</strong> ${receipt.studentName || 'Student'} (${receipt.studentId || ''})</div>
        <div><strong>Category:</strong> ${receipt.allocatedTo || 'Hostel Dues'}</div>
        <div><strong>Payment Mode:</strong> ${receipt.paymentMode || 'UPI / NetBanking'}</div>
        <div style="margin-top: 12px; padding: 10px; background: #ecfdf5; border-radius: 6px; font-size: 18px; font-weight: bold; color: #047857;">
          Amount Paid: ${receipt.currency || 'INR'} ${receipt.amount || 0}
        </div>
      </div>

      <div style="font-size: 11px; text-align: center; color: #64748b; margin-top: 16px; border-top: 1px solid #e2e8f0; padding-top: 8px;">
        Computer generated official receipt. No physical signature required.
      </div>
    </div>
  `;
}

module.exports = {
  buildGatePassPrintTemplate,
  buildFeeReceiptPrintTemplate
};
