/**
 * @fileoverview Smart Hostel Management System - Audit Log & Regulatory Compliance Service
 * @module backend/services/auditLogService
 * @description Immutable event stream recording for financial transactions, room re-allocations,
 * disciplinary notices, gate movements, and system administration activity.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Audit event classifications.
 * @readonly
 * @enum {string}
 */
const AUDIT_EVENT_TYPES = Object.freeze({
  AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILED: 'AUTH_LOGIN_FAILED',
  FEE_PAYMENT_COLLECTED: 'FEE_PAYMENT_COLLECTED',
  ROOM_ALLOCATION_MODIFIED: 'ROOM_ALLOCATION_MODIFIED',
  GATE_PASS_APPROVED: 'GATE_PASS_APPROVED',
  GATE_PASS_REJECTED: 'GATE_PASS_REJECTED',
  SECURITY_CHECKOUT: 'SECURITY_CHECKOUT',
  SECURITY_CHECKIN: 'SECURITY_CHECKIN',
  COMPLAINT_RESOLVED: 'COMPLAINT_RESOLVED',
  DISCIPLINARY_ACTION: 'DISCIPLINARY_ACTION'
});

/**
 * Class representing Audit Log Service.
 */
class AuditLogService {
  /**
   * Initializes audit registry.
   */
  constructor() {
    this.logs = [];
  }

  /**
   * Records an immutable event in the audit trail.
   * @param {string} eventType - AUDIT_EVENT_TYPES enum.
   * @param {string} actorId - User ID who performed the action.
   * @param {Object} details - Payload of changed fields.
   * @param {string} ipAddress - Client IP.
   * @returns {Object} Log entry.
   */
  logEvent(eventType, actorId, details = {}, ipAddress = '127.0.0.1') {
    const entry = {
      auditId: `AUD-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString(),
      eventType,
      actorId,
      details,
      ipAddress
    };

    this.logs.push(entry);
    return entry;
  }

  /**
   * Filters audit logs by query parameters.
   * @param {Object} filter - Filter options (actorId, eventType, fromDate).
   * @returns {Array<Object>} Matching log entries.
   */
  queryLogs(filter = {}) {
    return this.logs.filter(entry => {
      if (filter.actorId && entry.actorId !== filter.actorId) return false;
      if (filter.eventType && entry.eventType !== filter.eventType) return false;
      if (filter.fromDate && entry.timestamp < filter.fromDate) return false;
      return true;
    });
  }
}

module.exports = {
  AuditLogService,
  AUDIT_EVENT_TYPES
};
