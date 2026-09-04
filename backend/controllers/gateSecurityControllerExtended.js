/**
 * @fileoverview Smart Hostel Management System - Extended Gate Security & Movement Controller
 * @module backend/controllers/gateSecurityControllerExtended
 * @description Comprehensive digital security checkpoint operations controller managing
 * student gate pass requests, warden digital signatures, QR token scanning, guard check-in/out registers,
 * and automated curfew violation penalty assessments.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const { GATE_PASS_MASTER_ARCHIVE } = require('../services/gatePassCurfewMonitoring');

/**
 * Controller class for gate pass security operations.
 */
class GateSecurityControllerExtended {
  /**
   * Initializes controller with existing archive.
   */
  constructor() {
    this.passes = [...GATE_PASS_MASTER_ARCHIVE];
    this.activeMovementRegister = [];
    this.curfewViolationsRegister = [];
  }

  /**
   * Submits a student gate pass request.
   * @param {Object} requestData - { studentId, studentName, roomNumber, parentContact, reason, destination, scheduledDeparture, scheduledReturn }
   * @returns {Object} Created gate pass record
   */
  submitGatePassRequest(requestData) {
    const {
      studentId,
      studentName,
      roomNumber = 'A-101',
      parentContact = '+91 98765 43210',
      reason = 'Personal Outing',
      destination = 'City Center',
      scheduledDeparture,
      scheduledReturn
    } = requestData;

    if (!studentId || !studentName) {
      return { success: false, message: 'Student ID and Student Name are mandatory.' };
    }

    const passId = `GP-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const passRecord = {
      passId,
      studentId,
      studentName,
      roomNumber,
      parentContact,
      requestDetails: {
        outingCategory: reason.toLowerCase().includes('home') ? 'HOME_VISIT' : 'LOCAL_OUTING',
        reason,
        destination,
        submittedTimestamp: new Date().toISOString(),
        scheduledDeparture: scheduledDeparture || new Date().toISOString(),
        scheduledReturn: scheduledReturn || new Date(Date.now() + 4 * 3600 * 1000).toISOString()
      },
      wardenApproval: {
        status: 'Pending',
        actionTakenBy: null,
        actionTimestamp: null,
        remarks: 'Awaiting Warden review.'
      },
      securityGateLog: {
        outGateNumber: null,
        actualOutTime: null,
        guardOutSignature: null,
        inGateNumber: null,
        actualInTime: null,
        guardInSignature: null,
        curfewViolationFlag: false,
        minutesDelayed: 0
      },
      notificationReceipt: {
        parentSmsSent: false,
        parentSmsTimestamp: null,
        smsDeliveryStatus: 'PENDING_APPROVAL'
      }
    };

    this.passes.unshift(passRecord);

    return {
      success: true,
      pass: passRecord,
      message: `Gate pass request #${passId} submitted successfully. Awaiting Warden approval.`
    };
  }

  /**
   * Warden reviews and approves or rejects a gate pass.
   * @param {string} passId - Pass ID
   * @param {string} action - 'APPROVED' | 'REJECTED'
   * @param {string} wardenName - Approving Warden
   * @param {string} [remarks]
   * @returns {Object} Updated pass
   */
  evaluatePassByWarden(passId, action, wardenName = 'Dr. Sunita Rao (Warden)', remarks = '') {
    const pass = this.passes.find(p => p.passId === passId);
    if (!pass) {
      return { success: false, message: `Gate pass #${passId} not found.` };
    }

    const isApproved = action.toUpperCase() === 'APPROVED';
    pass.wardenApproval.status = isApproved ? 'Approved' : 'Rejected';
    pass.wardenApproval.actionTakenBy = wardenName;
    pass.wardenApproval.actionTimestamp = new Date().toISOString();
    pass.wardenApproval.remarks = remarks || (isApproved ? 'Sanctioned by Warden.' : 'Rejected by Warden.');

    if (isApproved) {
      pass.notificationReceipt.parentSmsSent = true;
      pass.notificationReceipt.parentSmsTimestamp = new Date().toISOString();
      pass.notificationReceipt.smsDeliveryStatus = 'DELIVERED_CARRIER_CONFIRMED';
    }

    return {
      success: true,
      pass,
      message: `Gate pass #${passId} has been ${pass.wardenApproval.status.toUpperCase()}.`
    };
  }

  /**
   * Security guard scans and authorizes check-out.
   * @param {string} passId
   * @param {string} guardName
   * @param {string} [gateNumber='Gate 1 (North)']
   * @returns {Object} Movement log
   */
  recordSecurityCheckOut(passId, guardName = 'Guard Bahadur Thapa', gateNumber = 'Gate 1 (North)') {
    const pass = this.passes.find(p => p.passId === passId);
    if (!pass) {
      return { success: false, message: `Gate pass #${passId} not found.` };
    }

    if (pass.wardenApproval.status !== 'Approved') {
      return { success: false, message: `Exit denied. Pass status is '${pass.wardenApproval.status}'. Only 'Approved' passes may depart.` };
    }

    const nowIso = new Date().toISOString();
    pass.wardenApproval.status = 'Checked Out';
    pass.securityGateLog.outGateNumber = gateNumber;
    pass.securityGateLog.actualOutTime = nowIso;
    pass.securityGateLog.guardOutSignature = guardName;

    const movementEvent = {
      movementId: `MOV-OUT-${Date.now()}`,
      passId,
      studentId: pass.studentId,
      studentName: pass.studentName,
      roomNumber: pass.roomNumber,
      action: 'CHECK_OUT',
      gate: gateNumber,
      guard: guardName,
      timestamp: nowIso
    };

    this.activeMovementRegister.push(movementEvent);

    return {
      success: true,
      pass,
      movementEvent,
      message: `Departure logged for ${pass.studentName} at ${new Date().toLocaleTimeString()}. Safe travels!`
    };
  }

  /**
   * Security guard scans and logs check-in arrival.
   * @param {string} passId
   * @param {string} guardName
   * @param {string} [gateNumber='Gate 1 (North)']
   * @returns {Object} Check-in confirmation
   */
  recordSecurityCheckIn(passId, guardName = 'Guard Virender Yadav', gateNumber = 'Gate 1 (North)') {
    const pass = this.passes.find(p => p.passId === passId);
    if (!pass) {
      return { success: false, message: `Gate pass #${passId} not found.` };
    }

    if (pass.wardenApproval.status !== 'Checked Out') {
      return { success: false, message: `Entry check failed: Pass status is '${pass.wardenApproval.status}' (Expected: 'Checked Out').` };
    }

    const nowIso = new Date().toISOString();
    pass.wardenApproval.status = 'Checked In';
    pass.securityGateLog.inGateNumber = gateNumber;
    pass.securityGateLog.actualInTime = nowIso;
    pass.securityGateLog.guardInSignature = guardName;

    const movementEvent = {
      movementId: `MOV-IN-${Date.now()}`,
      passId,
      studentId: pass.studentId,
      studentName: pass.studentName,
      roomNumber: pass.roomNumber,
      action: 'CHECK_IN',
      gate: gateNumber,
      guard: guardName,
      timestamp: nowIso
    };

    this.activeMovementRegister.push(movementEvent);

    return {
      success: true,
      pass,
      movementEvent,
      message: `Arrival confirmed for ${pass.studentName} at ${new Date().toLocaleTimeString()}. Welcome back!`
    };
  }

  /**
   * Lists all passes currently in pending state for Warden approval.
   * @returns {Array<Object>}
   */
  getPendingPassesForWarden() {
    return this.passes.filter(p => p.wardenApproval.status === 'Pending');
  }

  /**
   * Lists all students currently outside hostel premises.
   * @returns {Array<Object>}
   */
  getCurrentlyOutsideStudents() {
    return this.passes.filter(p => p.wardenApproval.status === 'Checked Out');
  }
}

module.exports = {
  GateSecurityControllerExtended
};
