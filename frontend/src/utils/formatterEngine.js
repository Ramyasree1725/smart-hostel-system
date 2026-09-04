/**
 * @fileoverview Smart Hostel Management System - Frontend Formatter Engine
 * @module frontend/src/utils/formatterEngine
 * @description Date-time formatters, currency formatters, badge color resolvers,
 * and string truncation helpers for user interfaces.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Formats an ISO date-time string into a human-friendly format.
 * @param {string|Date} isoString - Date string.
 * @param {boolean} [includeTime=true] - Whether to include time.
 * @returns {string} Human readable formatted date.
 */
function formatDateTimeFriendly(isoString, includeTime = true) {
  if (!isoString) return '—';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return String(isoString);

    const datePart = d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    if (!includeTime) return datePart;

    const timePart = d.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return `${datePart}, ${timePart}`;
  } catch (e) {
    return String(isoString);
  }
}

/**
 * Returns Tailwind CSS class names for status badges.
 * @param {string} status - Status keyword.
 * @returns {string} CSS classes.
 */
function getStatusBadgeClasses(status) {
  const norm = String(status || '').toUpperCase();
  switch (norm) {
    case 'PAID':
    case 'APPROVED':
    case 'PRESENT':
    case 'RESOLVED':
    case 'ACTIVE':
    case 'CHECKED IN':
      return 'bg-green-100 text-green-800 border border-green-300';
    case 'UNPAID':
    case 'REJECTED':
    case 'ABSENT':
    case 'CRITICAL':
    case 'LATE':
      return 'bg-red-100 text-red-800 border border-red-300';
    case 'PENDING':
    case 'IN_PROGRESS':
    case 'PARTIALLY PAID':
    case 'CHECKED OUT':
      return 'bg-amber-100 text-amber-800 border border-amber-300';
    case 'ON LEAVE':
    case 'EXCUSED':
      return 'bg-blue-100 text-blue-800 border border-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-300';
  }
}

module.exports = {
  formatDateTimeFriendly,
  getStatusBadgeClasses
};
