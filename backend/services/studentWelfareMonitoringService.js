/**
 * @fileoverview Smart Hostel Management System - Student Welfare & Mental Health Support Service
 * @module backend/services/studentWelfareMonitoringService
 * @description Early warning system for prolonged isolation, night roll call delinquency,
 * counseling appointment scheduling, peer mentoring pairing, and emergency medical sickbay records.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Health & wellness incident types.
 * @readonly
 * @enum {string}
 */
const WELFARE_INCIDENTS = Object.freeze({
  MEDICAL_FEVER_FLU: 'General Illness / Sickbay Rest',
  MEDICAL_ACUTE_EMERGENCY: 'Acute Medical Emergency / Hospital Referral',
  MENTAL_HEALTH_COUNSELING: 'Confidential Counseling Appointment',
  PROLONGED_ABSENTEEISM: 'Extended Unnotified Room Absence',
  PEER_DISPUTE_MEDIATION: 'Roommate Dispute Mediation'
});

/**
 * Class representing Student Welfare Service.
 */
class StudentWelfareMonitoringService {
  /**
   * Initializes welfare monitoring.
   */
  constructor() {
    this.sickbayAdmissions = [];
    this.counselingBookings = [];
    this.welfareAlerts = [];
  }

  /**
   * Logs a student sickbay visit.
   * @param {Object} admission - Sickbay visit record.
   * @returns {Object} Sickbay admission record.
   */
  admitToSickbay(admission) {
    const {
      studentId,
      studentName,
      roomNumber,
      symptoms,
      temperatureCelsius = 37.0,
      prescribedMedicines = [],
      doctorOnCall = 'DR. S. CHOUDHURY',
      needsHospitalization = false
    } = admission;

    const record = {
      admissionId: `SCK-${Date.now()}`,
      studentId,
      studentName,
      roomNumber,
      admittedAt: new Date().toISOString(),
      symptoms,
      temperatureCelsius,
      prescribedMedicines,
      doctorOnCall,
      needsHospitalization,
      status: 'UNDER_OBSERVATION'
    };

    this.sickbayAdmissions.push(record);

    return {
      success: true,
      record,
      message: `Student ${studentName} admitted to hostel sickbay for rest and monitoring.`
    };
  }

  /**
   * Schedules a private counseling / wellness session.
   * @param {string} studentId - Student ID.
   * @param {string} slot - Date/time slot.
   * @returns {Object} Appointment confirmation.
   */
  scheduleCounselingSession(studentId, slot) {
    const appointment = {
      appointmentId: `CNS-${Date.now()}`,
      studentId,
      scheduledSlot: slot || 'Tomorrow at 16:00',
      counselor: 'Campus Wellness Counselor',
      confidential: true,
      status: 'CONFIRMED'
    };

    this.counselingBookings.push(appointment);

    return {
      success: true,
      appointment,
      message: 'Confidential counseling appointment booked successfully.'
    };
  }
}

module.exports = {
  StudentWelfareMonitoringService,
  WELFARE_INCIDENTS
};
