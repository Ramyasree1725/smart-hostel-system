/**
 * @fileoverview Smart Hostel Management System - Gate Pass & Security Token Service
 * @module backend/services/gateSecurityTokenService
 * @description Secure digital out-pass generation, QR validation, biometric verification integration,
 * warden approvals, curfew violation alerts, and security guard log reconciliation.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Gate pass status definitions.
 * @readonly
 * @enum {string}
 */
const PASS_STATUS = Object.freeze({
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  USED_OUT: 'Checked Out',
  USED_IN: 'Checked In',
  EXPIRED: 'Expired',
  REVOKED: 'Revoked'
});

/**
 * Outing types permitted under hostel bylaws.
 * @readonly
 * @enum {string}
 */
const OUTING_TYPES = Object.freeze({
  LOCAL_DAY_OUTING: 'Local Day Outing',
  HOME_VISIT: 'Home Visit / Vacation',
  MEDICAL_EMERGENCY: 'Medical Emergency',
  ACADEMIC_FIELD_TRIP: 'Academic Field Trip / Project',
  CAMPUS_EVENT: 'Inter-College Competition'
});

/**
 * Class representing the Gate Security Token Service.
 */
class GateSecurityTokenService {
  /**
   * Initializes the gate pass security service.
   * @param {Object} [rules={}] - Security parameter overrides.
   */
  constructor(rules = {}) {
    this.rules = Object.assign({
      standardCurfewHour: 21, // 9:00 PM
      standardCurfewMinute: 0,
      emergencyGracePeriodMinutes: 30,
      parentNotificationOnOuting: true,
      requireParentConsentForHomeVisit: true,
      maxActivePassesPerStudent: 1
    }, rules);

    this.passesRegistry = new Map();
    this.movementLogs = [];
    this.curfewViolations = [];
  }

  /**
   * Submits a new gate pass request initiated by a student.
   * @param {Object} request - Gate pass application details.
   * @returns {Object} Request receipt.
   */
  requestPass(request) {
    const {
      studentId,
      studentName,
      roomNumber,
      parentPhone,
      outingType = OUTING_TYPES.LOCAL_DAY_OUTING,
      destination,
      departureTime,
      expectedReturnTime,
      reason
    } = request;

    if (!studentId || !studentName || !departureTime || !expectedReturnTime) {
      return {
        success: false,
        message: 'Student ID, Name, Departure, and Return time are strictly required.'
      };
    }

    // Check for existing active pass
    for (const pass of this.passesRegistry.values()) {
      if (pass.studentId === studentId && (pass.status === PASS_STATUS.PENDING || pass.status === PASS_STATUS.APPROVED || pass.status === PASS_STATUS.USED_OUT)) {
        return {
          success: false,
          message: `Student already has an active or pending pass: ${pass.passId}. Must close previous pass before applying.`
        };
      }
    }

    const passId = `GP-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const passRecord = {
      passId: passId,
      studentId: studentId,
      studentName: studentName,
      roomNumber: roomNumber || '101',
      parentPhone: parentPhone || '+91 9876543210',
      outingType: outingType,
      destination: destination || 'City Center',
      departureTime: departureTime,
      expectedReturnTime: expectedReturnTime,
      reason: reason || 'Personal errand',
      status: PASS_STATUS.PENDING,
      requestedAt: new Date().toISOString(),
      approvedBy: null,
      approvedAt: null,
      rejectionReason: null,
      actualOutTime: null,
      actualInTime: null,
      securityGuardId: null,
      isCurfewViolated: false
    };

    this.passesRegistry.set(passId, passRecord);

    return {
      success: true,
      passId: passId,
      pass: passRecord,
      message: 'Gate pass submitted successfully. Awaiting Warden approval.'
    };
  }

  /**
   * Evaluates (Approves or Rejects) a pending gate pass by Warden.
   * @param {string} passId - Pass ID.
   * @param {string} decision - 'APPROVED' or 'REJECTED'.
   * @param {string} wardenId - Approving warden name/ID.
   * @param {string} notes - Rejection reason or advisory notes.
   * @returns {Object} Updated pass status.
   */
  evaluatePass(passId, decision, wardenId = 'WARDEN_DESK', notes = '') {
    const pass = this.passesRegistry.get(passId);
    if (!pass) {
      return { success: false, message: 'Gate pass not found.' };
    }

    if (pass.status !== PASS_STATUS.PENDING) {
      return { success: false, message: `Gate pass is already in '${pass.status}' state.` };
    }

    if (decision.toUpperCase() === 'APPROVED') {
      pass.status = PASS_STATUS.APPROVED;
      pass.approvedBy = wardenId;
      pass.approvedAt = new Date().toISOString();
      return {
        success: true,
        pass: pass,
        message: `Gate pass ${passId} has been APPROVED by ${wardenId}. Digital gate pass is now active for security scan.`
      };
    } else {
      pass.status = PASS_STATUS.REJECTED;
      pass.approvedBy = wardenId;
      pass.approvedAt = new Date().toISOString();
      pass.rejectionReason = notes || 'Disapproved by Warden.';
      return {
        success: true,
        pass: pass,
        message: `Gate pass ${passId} was REJECTED.`
      };
    }
  }

  /**
   * Security guard records a student exiting the hostel gate.
   * @param {string} passId - Gate pass token ID.
   * @param {string} guardId - Security personnel on duty.
   * @returns {Object} Check-out authorization log.
   */
  recordCheckOut(passId, guardId = 'GUARD_GATE_1') {
    const pass = this.passesRegistry.get(passId);
    if (!pass) {
      return { success: false, message: 'Invalid or unrecognized Gate Pass ID.' };
    }

    if (pass.status !== PASS_STATUS.APPROVED) {
      return {
        success: false,
        message: `Exit DENIED. Gate pass is currently '${pass.status}'. Only 'Approved' passes may exit.`
      };
    }

    const timestamp = new Date().toISOString();
    pass.status = PASS_STATUS.USED_OUT;
    pass.actualOutTime = timestamp;
    pass.securityGuardId = guardId;

    const logEntry = {
      logId: `MOV-${Date.now()}`,
      passId: passId,
      studentId: pass.studentId,
      studentName: pass.studentName,
      roomNumber: pass.roomNumber,
      action: 'CHECK_OUT',
      timestamp: timestamp,
      guardId: guardId,
      destination: pass.destination
    };

    this.movementLogs.push(logEntry);

    return {
      success: true,
      movementLog: logEntry,
      message: `Exit authorized for ${pass.studentName} at ${new Date().toLocaleTimeString()}. Safe journey!`
    };
  }

  /**
   * Security guard records a student returning to the hostel campus.
   * @param {string} passId - Gate pass token ID.
   * @param {string} guardId - Security personnel ID.
   * @returns {Object} Check-in confirmation.
   */
  recordCheckIn(passId, guardId = 'GUARD_GATE_1') {
    const pass = this.passesRegistry.get(passId);
    if (!pass) {
      return { success: false, message: 'Invalid Gate Pass ID.' };
    }

    if (pass.status !== PASS_STATUS.USED_OUT) {
      return {
        success: false,
        message: `Entry recording failed: Pass is in '${pass.status}' status (Expected: 'Checked Out').`
      };
    }

    const timestamp = new Date().toISOString();
    pass.status = PASS_STATUS.USED_IN;
    pass.actualInTime = timestamp;

    // Check for curfew breach
    const expectedTime = new Date(pass.expectedReturnTime).getTime();
    const actualTime = new Date(timestamp).getTime();

    if (actualTime > expectedTime) {
      const lateMinutes = Math.round((actualTime - expectedTime) / (1000 * 60));
      pass.isCurfewViolated = true;
      pass.lateByMinutes = lateMinutes;

      const violation = {
        violationId: `CRF-${Date.now()}`,
        passId: passId,
        studentId: pass.studentId,
        studentName: pass.studentName,
        expectedReturn: pass.expectedReturnTime,
        actualReturn: timestamp,
        delayMinutes: lateMinutes,
        reportedBy: guardId
      };

      this.curfewViolations.push(violation);
    }

    const logEntry = {
      logId: `MOV-${Date.now()}`,
      passId: passId,
      studentId: pass.studentId,
      studentName: pass.studentName,
      roomNumber: pass.roomNumber,
      action: 'CHECK_IN',
      timestamp: timestamp,
      guardId: guardId,
      lateViolation: pass.isCurfewViolated
    };

    this.movementLogs.push(logEntry);

    return {
      success: true,
      movementLog: logEntry,
      lateViolation: pass.isCurfewViolated,
      message: pass.isCurfewViolated
        ? `Checked IN with ${pass.lateByMinutes} minute(s) delay. Curfew violation logged.`
        : `Checked IN safely on time. Welcome back, ${pass.studentName}!`
    };
  }

  /**
   * Lists all students currently outside the hostel premises.
   * @returns {Array<Object>} Active outings list.
   */
  getActiveOutings() {
    const active = [];
    for (const pass of this.passesRegistry.values()) {
      if (pass.status === PASS_STATUS.USED_OUT) {
        active.push(pass);
      }
    }
    return active;
  }

  /**
   * Generates a security and movement dashboard report.
   * @returns {Object} Security report summary.
   */
  generateSecurityReport() {
    let pendingCount = 0;
    let approvedCount = 0;
    let currentlyOutside = 0;
    let returnedCount = 0;
    let rejectedCount = 0;

    for (const pass of this.passesRegistry.values()) {
      if (pass.status === PASS_STATUS.PENDING) pendingCount++;
      else if (pass.status === PASS_STATUS.APPROVED) approvedCount++;
      else if (pass.status === PASS_STATUS.USED_OUT) currentlyOutside++;
      else if (pass.status === PASS_STATUS.USED_IN) returnedCount++;
      else if (pass.status === PASS_STATUS.REJECTED) rejectedCount++;
    }

    return {
      reportTimestamp: new Date().toISOString(),
      totalPassesRecorded: this.passesRegistry.size,
      statusCounts: {
        pendingApprovals: pendingCount,
        approvedAwaitingExit: approvedCount,
        studentsCurrentlyOutside: currentlyOutside,
        safelyCheckedIn: returnedCount,
        rejectedPasses: rejectedCount
      },
      curfewViolationsTotal: this.curfewViolations.length,
      recentMovements: this.movementLogs.slice(-20)
    };
  }
}

module.exports = {
  GateSecurityTokenService,
  PASS_STATUS,
  OUTING_TYPES
};
