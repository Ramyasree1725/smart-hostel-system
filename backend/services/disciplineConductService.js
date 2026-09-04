/**
 * @fileoverview Smart Hostel Management System - Disciplinary & Code of Conduct Service
 * @module backend/services/disciplineConductService
 * @description Incident logging, disciplinary committee summons, penalty fine adjudication,
 * curfew warning levels, and good conduct certification issuance.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Disciplinary infraction categories.
 * @readonly
 * @enum {string}
 */
const INFRACTION_TYPES = Object.freeze({
  CURFEW_VIOLATION_LATE_ENTRY: 'Curfew Breach / Unauthorized Late Entry',
  UNAUTHORIZED_ROOM_SWITCH: 'Unauthorized Room / Bed Switching',
  QUIET_HOURS_NOISE_POLLUTION: 'Noise Violation During Study / Quiet Hours',
  DAMAGE_TO_HOSTEL_PROPERTY: 'Damage or Vandalism to Hostel Fixtures',
  SMOKING_OR_PROHIBITED_SUBSTANCE: 'Possession / Use of Prohibited Substances',
  MESS_BEHAVIOR_MISCONDUCT: 'Mess Hall Misbehavior / Food Waste Misconduct'
});

/**
 * Disciplinary action severities.
 * @readonly
 * @enum {string}
 */
const PENALTY_LEVELS = Object.freeze({
  FORMAL_WARNING_LETTER: 'Formal Warning Letter',
  FINE_MONETARY_PENALTY: 'Monetary Fine Assessment',
  PARENT_GUARDIAN_SUMMONS: 'Parent / Guardian In-Person Meeting Required',
  HOSTEL_SUSPENSION_TEMPORARY: 'Temporary Hostel Suspension (1-2 Weeks)',
  EXPULSION_PERMANENT: 'Permanent Hostel Eviction & Expulsion'
});

/**
 * Class representing Discipline & Conduct Service.
 */
class DisciplineConductService {
  /**
   * Initializes disciplinary committee registry.
   */
  constructor() {
    this.infractions = [];
  }

  /**
   * Records a disciplinary incident.
   * @param {Object} incidentData - Incident details.
   * @returns {Object} Infraction record.
   */
  reportInfraction(incidentData) {
    const {
      studentId,
      studentName,
      infractionType = INFRACTION_TYPES.CURFEW_VIOLATION_LATE_ENTRY,
      penalty = PENALTY_LEVELS.FORMAL_WARNING_LETTER,
      fineAmount = 0,
      reportedBy = 'WARDEN_PATROL',
      description
    } = incidentData;

    const caseNumber = `DISC-${Date.now()}`;

    const record = {
      caseNumber,
      studentId,
      studentName,
      infractionType,
      penalty,
      fineAmount,
      reportedBy,
      description: description || 'Violated hostel residence guidelines.',
      status: 'ISSUED',
      issuedAt: new Date().toISOString()
    };

    this.infractions.push(record);

    return {
      success: true,
      caseRecord: record,
      message: `Disciplinary record #${caseNumber} registered against ${studentName}.`
    };
  }

  /**
   * Retrieves all disciplinary records for a specific student.
   * @param {string} studentId - Student ID.
   * @returns {Array<Object>} List of incidents.
   */
  getStudentInfractions(studentId) {
    return this.infractions.filter(i => i.studentId === studentId);
  }
}

module.exports = {
  DisciplineConductService,
  INFRACTION_TYPES,
  PENALTY_LEVELS
};
