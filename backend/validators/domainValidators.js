/**
 * @fileoverview Smart Hostel Management System - Domain Entity Validators
 * @module backend/validators/domainValidators
 * @description Input validation rules for student registrations, gate pass requests, fee transactions,
 * room allocation payloads, and grievance ticket submissions.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Validates a student registration payload.
 * @param {Object} data - Input payload.
 * @returns {Object} { isValid, errors }
 */
function validateStudentRegistration(data) {
  const errors = [];
  if (!data || typeof data !== 'object') {
    return { isValid: false, errors: ['Request body must be a valid JSON object'] };
  }

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Student name must be at least 2 characters long');
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('A valid student email address is required');
  }

  if (!data.rollNumber || typeof data.rollNumber !== 'string' || data.rollNumber.trim().length === 0) {
    errors.push('University roll / registration number is required');
  }

  if (!data.contactNumber || data.contactNumber.replace(/\D/g, '').length < 10) {
    errors.push('Valid 10-digit student contact phone number is required');
  }

  if (!data.parentPhone || data.parentPhone.replace(/\D/g, '').length < 10) {
    errors.push('Valid 10-digit parent emergency contact number is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates a gate pass creation request.
 * @param {Object} data - Gate pass details.
 * @returns {Object} { isValid, errors }
 */
function validateGatePassRequest(data) {
  const errors = [];
  if (!data) return { isValid: false, errors: ['Missing gate pass data'] };

  if (!data.studentId) errors.push('Student ID is required');
  if (!data.destination || data.destination.trim().length === 0) errors.push('Destination is required');
  if (!data.departureTime) errors.push('Departure timestamp is required');
  if (!data.expectedReturnTime) errors.push('Expected return timestamp is required');

  if (data.departureTime && data.expectedReturnTime) {
    const dep = new Date(data.departureTime).getTime();
    const ret = new Date(data.expectedReturnTime).getTime();
    if (ret <= dep) {
      errors.push('Expected return time must be strictly after departure time');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates a fee payment transaction.
 * @param {Object} data - Payment details.
 * @returns {Object} { isValid, errors }
 */
function validateFeePayment(data) {
  const errors = [];
  if (!data) return { isValid: false, errors: ['Payment data missing'] };

  if (!data.studentId) errors.push('Student ID is required');
  if (typeof data.amount !== 'number' || data.amount <= 0) {
    errors.push('Payment amount must be a positive number');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateStudentRegistration,
  validateGatePassRequest,
  validateFeePayment
};
