/**
 * @fileoverview Smart Hostel Management System - Security Guard Gate Pass QR Scan & Check Controller
 * @module frontend/src/modules/gatePassScanModule
 * @description Camera barcode/QR scanner integration, gate pass instant verification,
 * status badge rendering, and movement logging for security guards on duty.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Validates a scanned gate pass and returns the action button configuration.
 * @param {Object} pass - Scanned pass object.
 * @returns {Object} Action state descriptor.
 */
function evaluatePassAction(pass) {
  if (!pass) {
    return { canCheckOut: false, canCheckIn: false, label: 'Invalid Pass', alertClass: 'bg-red-500' };
  }

  if (pass.status === 'Approved') {
    return {
      canCheckOut: true,
      canCheckIn: false,
      label: 'Authorize Check-Out',
      alertClass: 'bg-emerald-600'
    };
  }

  if (pass.status === 'Checked Out') {
    return {
      canCheckOut: false,
      canCheckIn: true,
      label: 'Record Check-In',
      alertClass: 'bg-indigo-600'
    };
  }

  return {
    canCheckOut: false,
    canCheckIn: false,
    label: pass.status || 'Not Authorized',
    alertClass: 'bg-slate-500'
  };
}

module.exports = {
  evaluatePassAction
};
