/**
 * @fileoverview Smart Hostel Management System - Cryptography & Security Utilities
 * @module backend/utils/cryptoSecurityUtils
 * @description Safe hashing, token verification, CSRF token generation, password strength metrics,
 * and QR code payload signature generation.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const crypto = require('crypto');

/**
 * Generates a cryptographically secure random token string.
 * @param {number} [bytes=32] - Number of random bytes.
 * @returns {string} Hex encoded token.
 */
function generateSecureToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString('hex');
}

/**
 * Computes SHA-256 HMAC for gate pass QR payload integrity verification.
 * @param {string} payload - Payload string.
 * @param {string} secretKey - Secret key.
 * @returns {string} Hex signature.
 */
function signGatePassPayload(payload, secretKey = 'hostel_secret_key') {
  return crypto.createHmac('sha256', secretKey).update(payload).digest('hex');
}

/**
 * Verifies if a given payload and signature match.
 * @param {string} payload - Raw payload.
 * @param {string} signature - Provided signature.
 * @param {string} secretKey - Secret key.
 * @returns {boolean} True if authentic.
 */
function verifyGatePassSignature(payload, signature, secretKey = 'hostel_secret_key') {
  const expected = signGatePassPayload(payload, secretKey);
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

/**
 * Evaluates password strength score from 0 to 100.
 * @param {string} password - Raw password.
 * @returns {Object} Score and recommendations.
 */
function evaluatePasswordStrength(password) {
  if (!password || typeof password !== 'string') {
    return { score: 0, isAcceptable: false, reasons: ['Password cannot be empty'] };
  }

  let score = 0;
  const reasons = [];

  if (password.length >= 8) score += 25;
  else reasons.push('Password should be at least 8 characters long');

  if (password.length >= 12) score += 15;
  if (/[A-Z]/.test(password)) score += 20;
  else reasons.push('Include at least one uppercase letter (A-Z)');

  if (/[a-z]/.test(password)) score += 20;
  if (/[0-9]/.test(password)) score += 10;
  else reasons.push('Include at least one digit (0-9)');

  if (/[^A-Za-z0-9]/.test(password)) score += 10;
  else reasons.push('Include at least one special character (!@#$%)');

  return {
    score: Math.min(100, score),
    isAcceptable: score >= 70,
    reasons
  };
}

module.exports = {
  generateSecureToken,
  signGatePassPayload,
  verifyGatePassSignature,
  evaluatePasswordStrength
};
