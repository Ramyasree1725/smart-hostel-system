/**
 * @fileoverview Smart Hostel Management System - Security Guard Gate Monitor Controller
 * @module frontend/src/modules/securityGateMonitorEngine
 * @description In-browser controller for security checkpoint scanners, gate pass search queries,
 * check-out / check-in action dispatching, and movement log updates.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Filter gate passes by search query.
 * @param {Array<Object>} passesList
 * @param {string} query
 * @returns {Array<Object>}
 */
function searchGatePasses(passesList = [], query = '') {
  if (!query || typeof query !== 'string' || query.trim() === '') {
    return passesList;
  }
  const q = query.trim().toLowerCase();
  return passesList.filter(p =>
    (p.passId && p.passId.toLowerCase().includes(q)) ||
    (p.studentName && p.studentName.toLowerCase().includes(q)) ||
    (p.roomNumber && p.roomNumber.toLowerCase().includes(q)) ||
    (p.status && p.status.toLowerCase().includes(q))
  );
}

/**
 * Validates check-out eligibility for security personnel.
 * @param {Object} pass
 * @returns {boolean}
 */
function isEligibleForCheckOut(pass) {
  return Boolean(pass && (pass.status || '').toLowerCase() === 'approved');
}

/**
 * Validates check-in eligibility for returning student.
 * @param {Object} pass
 * @returns {boolean}
 */
function isEligibleForCheckIn(pass) {
  return Boolean(pass && (pass.status || '').toLowerCase() === 'checked out');
}

module.exports = {
  searchGatePasses,
  isEligibleForCheckOut,
  isEligibleForCheckIn
};
