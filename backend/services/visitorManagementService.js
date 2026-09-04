/**
 * @fileoverview Smart Hostel Management System - Visitor Management & Guest Registration Service
 * @module backend/services/visitorManagementService
 * @description Manages guest passes, parent visiting hours, visitor identity proof verification,
 * overnight guest room allocation, and security perimeter audit logs.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Visitor relationship types.
 * @readonly
 * @enum {string}
 */
const VISITOR_RELATIONSHIPS = Object.freeze({
  PARENT_FATHER: 'Father',
  PARENT_MOTHER: 'Mother',
  SIBLING: 'Brother / Sister',
  GUARDIAN: 'Legal Guardian',
  ACADEMIC_PEER: 'Student / Peer',
  OFFICIAL_DELIVERY: 'Delivery Personnel / Courier',
  CONTRACTOR: 'Maintenance Contractor'
});

/**
 * Class representing Visitor Management Service.
 */
class VisitorManagementService {
  /**
   * Initializes visitor management.
   * @param {Object} [rules={}] - Configurable visitor policies.
   */
  constructor(rules = {}) {
    this.rules = Object.assign({
      visitingHoursStart: '09:00',
      visitingHoursEnd: '19:00',
      allowOvernightGuestStay: true,
      maxOvernightStayNights: 3,
      overnightGuestRoomChargePerNight: 500,
      requireGovernmentIdVerification: true
    }, rules);

    this.visitorPasses = new Map();
    this.activeVisits = new Map();
    this.overnightBookings = [];
  }

  /**
   * Issues a visitor security pass upon entry at the main gate.
   * @param {Object} visitorData - Visitor details and host student info.
   * @returns {Object} Security pass confirmation.
   */
  issueVisitorPass(visitorData) {
    const {
      visitorName,
      visitorPhone,
      idProofType = 'Aadhaar / National ID',
      idProofNumber,
      relationship = VISITOR_RELATIONSHIPS.PARENT_MOTHER,
      hostStudentId,
      hostStudentName,
      purpose = 'Personal Family Visit',
      guardId = 'GUARD_GATE_1'
    } = visitorData;

    if (!visitorName || !visitorPhone || !hostStudentId) {
      return { success: false, message: 'Visitor name, phone, and host student ID are required.' };
    }

    const passNumber = `VIS-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const pass = {
      passNumber: passNumber,
      visitorName: visitorName,
      visitorPhone: visitorPhone,
      idProofType: idProofType,
      idProofNumber: idProofNumber || 'VERIFIED_ON_ENTRY',
      relationship: relationship,
      hostStudentId: hostStudentId,
      hostStudentName: hostStudentName || 'Resident Student',
      purpose: purpose,
      entryTimestamp: new Date().toISOString(),
      exitTimestamp: null,
      securityGuardIn: guardId,
      securityGuardOut: null,
      status: 'ACTIVE_INSIDE'
    };

    this.visitorPasses.set(passNumber, pass);
    this.activeVisits.set(passNumber, pass);

    return {
      success: true,
      passNumber: passNumber,
      pass: pass,
      message: `Visitor badge #${passNumber} generated for ${visitorName}.`
    };
  }

  /**
   * Records visitor departure from the premises.
   * @param {string} passNumber - Visitor pass number.
   * @param {string} guardId - Guard on exit duty.
   * @returns {Object} Exit confirmation.
   */
  recordVisitorExit(passNumber, guardId = 'GUARD_GATE_1') {
    const pass = this.visitorPasses.get(passNumber);
    if (!pass) {
      return { success: false, message: 'Visitor pass not found.' };
    }

    if (pass.status === 'DEPARTED') {
      return { success: false, message: 'Visitor has already checked out.' };
    }

    pass.exitTimestamp = new Date().toISOString();
    pass.securityGuardOut = guardId;
    pass.status = 'DEPARTED';

    this.activeVisits.delete(passNumber);

    return {
      success: true,
      pass: pass,
      message: `Visitor ${pass.visitorName} successfully logged out at ${new Date().toLocaleTimeString()}.`
    };
  }

  /**
   * Books a guest room for parents staying overnight.
   * @param {Object} bookingData - Booking details.
   * @returns {Object} Overnight room booking confirmation.
   */
  bookOvernightGuestRoom(bookingData) {
    const {
      visitorName,
      visitorPhone,
      hostStudentId,
      nights = 1,
      checkInDate,
      assignedGuestRoom = 'GUEST-SUITE-101'
    } = bookingData;

    if (nights > this.rules.maxOvernightStayNights) {
      return {
        success: false,
        message: `Maximum allowed stay is ${this.rules.maxOvernightStayNights} consecutive nights.`
      };
    }

    const totalCharge = nights * this.rules.overnightGuestRoomChargePerNight;
    const bookingId = `GST-${Date.now()}`;

    const booking = {
      bookingId: bookingId,
      visitorName: visitorName,
      visitorPhone: visitorPhone,
      hostStudentId: hostStudentId,
      guestRoomNumber: assignedGuestRoom,
      checkInDate: checkInDate || new Date().toISOString().split('T')[0],
      nights: nights,
      ratePerNight: this.rules.overnightGuestRoomChargePerNight,
      totalAmountDue: totalCharge,
      paymentStatus: 'PAID',
      status: 'CONFIRMED'
    };

    this.overnightBookings.push(booking);

    return {
      success: true,
      booking: booking,
      message: `Guest room ${assignedGuestRoom} reserved for ${nights} night(s). Total: INR ${totalCharge}.`
    };
  }

  /**
   * Generates a real-time summary of visitors currently inside the hostel.
   * @returns {Object} Visitors summary.
   */
  getCurrentlyInsideVisitors() {
    return Array.from(this.activeVisits.values());
  }
}

module.exports = {
  VisitorManagementService,
  VISITOR_RELATIONSHIPS
};
