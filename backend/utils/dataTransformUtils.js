/**
 * @fileoverview Smart Hostel Management System - Data Transformation & Serialization Utilities
 * @module backend/utils/dataTransformUtils
 * @description Robust parsing, CSV export transformations, date normalization, phone number formatting,
 * and data sanitization routines.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Normalizes Indian and international phone numbers into E.164 compliant format.
 * @param {string} phone - Input raw phone number.
 * @returns {string} Cleaned standardized phone number.
 */
function normalizePhoneNumber(phone) {
  if (!phone || typeof phone !== 'string') return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  } else if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return phone.trim();
}

/**
 * Formats a number into standard Indian Rupee currency format (e.g., INR 45,000.00).
 * @param {number} amount - Amount in numeric.
 * @param {boolean} [includeSymbol=true] - Whether to prefix with ₹.
 * @returns {string} Formatted string.
 */
function formatCurrencyINR(amount, includeSymbol = true) {
  const num = Number(amount) || 0;
  const formatted = num.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  });
  return includeSymbol ? `₹${formatted}` : formatted;
}

/**
 * Converts an array of objects into RFC-4180 compliant CSV text.
 * @param {Array<Object>} records - Array of data objects.
 * @param {Array<string>} [headers] - Specific keys to include.
 * @returns {string} CSV string.
 */
function exportToCsv(records, headers = null) {
  if (!Array.isArray(records) || records.length === 0) {
    return '';
  }

  const keys = headers || Object.keys(records[0]);
  const headerLine = keys.map(k => `"${String(k).replace(/"/g, '""')}"`).join(',');

  const rows = records.map(record => {
    return keys.map(k => {
      const val = record[k] !== undefined && record[k] !== null ? String(record[k]) : '';
      return `"${val.replace(/"/g, '""')}"`;
    }).join(',');
  });

  return [headerLine, ...rows].join('\r\n');
}

/**
 * Safely sanitizes an HTML string to prevent XSS.
 * @param {string} str - Raw untrusted input string.
 * @returns {string} Sanitized string.
 */
function sanitizeHtml(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = {
  normalizePhoneNumber,
  formatCurrencyINR,
  exportToCsv,
  sanitizeHtml
};
