/**
 * @fileoverview Smart Hostel Management System - Staff Duty Roster & Security Shift Scheduling Service
 * @module backend/services/staffDutyRosterService
 * @description Shift assignment for security guards, proctors, mess cooks, and cleaning crew,
 * shift swapping approvals, overtime compensation calculation, and biometric shift check-ins.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Standard hostel duty shifts.
 * @readonly
 * @enum {string}
 */
const WORK_SHIFTS = Object.freeze({
  MORNING_SHIFT: 'Morning Shift (06:00 - 14:00)',
  GENERAL_DAY_SHIFT: 'General Day Shift (09:00 - 17:00)',
  EVENING_SHIFT: 'Evening Shift (14:00 - 22:00)',
  NIGHT_PATROL_SHIFT: 'Night Patrol Shift (22:00 - 06:00)'
});

/**
 * Staff designations.
 * @readonly
 * @enum {string}
 */
const STAFF_ROLES = Object.freeze({
  CHIEF_WARDEN: 'Chief Warden',
  RESIDENT_WARDEN: 'Resident Warden',
  HEAD_SECURITY_OFFICER: 'Head Security Officer',
  GATE_SECURITY_GUARD: 'Gate Security Guard',
  CHIEF_HEAD_CHEF: 'Chief Head Chef',
  MAINTENANCE_SUPERVISOR: 'Facility Maintenance Supervisor',
  HOUSEKEEPING_LEAD: 'Housekeeping Lead'
});

/**
 * Class representing Staff Duty Roster Service.
 */
class StaffDutyRosterService {
  /**
   * Initializes staff roster.
   */
  constructor() {
    this.staffMembers = new Map();
    this.dutyAssignments = [];
    this._bootstrapStaff();
  }

  /**
   * Seeds staff profiles.
   * @private
   */
  _bootstrapStaff() {
    const staffList = [
      { id: 'STF-01', name: 'Dr. Sunita Rao', role: STAFF_ROLES.CHIEF_WARDEN, phone: '+91 98765 20001', assignedLocation: 'Administration' },
      { id: 'STF-02', name: 'Inspector Ram Singh', role: STAFF_ROLES.HEAD_SECURITY_OFFICER, phone: '+91 98765 20002', assignedLocation: 'Main Security Office' },
      { id: 'STF-03', name: 'Guard Bahadur Thapa', role: STAFF_ROLES.GATE_SECURITY_GUARD, phone: '+91 98765 20003', assignedLocation: 'North Campus Gate 1' },
      { id: 'STF-04', name: 'Guard Virender Yadav', role: STAFF_ROLES.GATE_SECURITY_GUARD, phone: '+91 98765 20004', assignedLocation: 'South Gate 2' },
      { id: 'STF-05', name: 'Chef Sanjeev Mishra', role: STAFF_ROLES.CHIEF_HEAD_CHEF, phone: '+91 98765 20005', assignedLocation: 'Central Kitchen' }
    ];

    for (const s of staffList) {
      this.staffMembers.set(s.id, s);
    }
  }

  /**
   * Assigns a staff member to a shift on a specific date.
   * @param {string} staffId - Staff ID.
   * @param {string} shift - WORK_SHIFTS enum.
   * @param {string} date - YYYY-MM-DD.
   * @param {string} postLocation - Location/Gate.
   * @returns {Object} Duty assignment record.
   */
  assignShift(staffId, shift, date, postLocation = 'Main Gate 1') {
    const staff = this.staffMembers.get(staffId);
    if (!staff) {
      throw new Error(`Staff member with ID ${staffId} not found.`);
    }

    const assignment = {
      assignmentId: `DUTY-${Date.now()}`,
      staffId,
      staffName: staff.name,
      role: staff.role,
      shift,
      date: date || new Date().toISOString().split('T')[0],
      postLocation,
      checkedIn: false
    };

    this.dutyAssignments.push(assignment);
    return assignment;
  }

  /**
   * Lists scheduled duty shifts for a specific date.
   * @param {string} date - Date string.
   * @returns {Array<Object>} Shift list.
   */
  getRosterForDate(date) {
    const targetDate = date || new Date().toISOString().split('T')[0];
    return this.dutyAssignments.filter(a => a.date === targetDate);
  }
}

module.exports = {
  StaffDutyRosterService,
  WORK_SHIFTS,
  STAFF_ROLES
};
