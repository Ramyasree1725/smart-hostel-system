/**
 * @fileoverview Smart Hostel Management System - Resident Directory & Student Master Registry Service
 * @module backend/services/residentDirectoryService
 * @description Centralized master directory of hostel residents, biographical data, academic records,
 * guardian contacts, medical alerts, biometric enrollment identifiers, and occupancy lifecycle tracking.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Academic year classifications.
 * @readonly
 * @enum {string}
 */
const ACADEMIC_YEARS = Object.freeze({
  FIRST_YEAR: '1st Year (Freshman)',
  SECOND_YEAR: '2nd Year (Sophomore)',
  THIRD_YEAR: '3rd Year (Junior)',
  FOURTH_YEAR: '4th Year (Senior)',
  POSTGRADUATE: 'Postgraduate (Masters)',
  DOCTORAL: 'Ph.D. / Research Scholar'
});

/**
 * Hostel block allocations.
 * @readonly
 * @enum {string}
 */
const HOSTEL_BLOCKS = Object.freeze({
  BLOCK_A_MEN: 'Block A (Men\'s Senior Wing)',
  BLOCK_B_MEN: 'Block B (Men\'s Junior Wing)',
  BLOCK_C_WOMEN: 'Block C (Women\'s Wing)',
  BLOCK_D_WOMEN: 'Block D (Women\'s PG Wing)',
  BLOCK_E_INTERNATIONAL: 'Block E (International Scholars)'
});

/**
 * Class representing Resident Directory Service.
 */
class ResidentDirectoryService {
  /**
   * Initializes resident directory with seed residents.
   */
  constructor() {
    this.residents = new Map();
    this.studentHistory = [];
    this._bootstrapResidentRecords();
  }

  /**
   * Populates initial resident dataset.
   * @private
   */
  _bootstrapResidentRecords() {
    const seedData = [
      {
        studentId: 'STU-2024-001',
        rollNumber: '21CS101',
        name: 'Rahul Sharma',
        gender: 'Male',
        department: 'Computer Science & Engineering',
        year: ACADEMIC_YEARS.THIRD_YEAR,
        roomNumber: 'A-204',
        block: HOSTEL_BLOCKS.BLOCK_A_MEN,
        email: 'rahul.sharma@hostel.edu',
        phone: '+91 98765 43210',
        parentName: 'Suresh Sharma',
        parentPhone: '+91 98765 00001',
        parentEmail: 'suresh.sharma@example.com',
        homeAddress: 'Flat 402, Green Valley Apts, Hyderabad, Telangana - 500081',
        bloodGroup: 'B+',
        medicalAlerts: 'None',
        biometricEnrolled: true,
        roomFeeStatus: 'Paid',
        messFeeStatus: 'Paid',
        attendanceRate: 96.5,
        isActive: true,
        enrolledDate: '2023-08-01'
      },
      {
        studentId: 'STU-2024-002',
        rollNumber: '22EC145',
        name: 'Priya Patel',
        gender: 'Female',
        department: 'Electronics & Communication',
        year: ACADEMIC_YEARS.SECOND_YEAR,
        roomNumber: 'C-102',
        block: HOSTEL_BLOCKS.BLOCK_C_WOMEN,
        email: 'priya.patel@hostel.edu',
        phone: '+91 98765 43211',
        parentName: 'Ramesh Patel',
        parentPhone: '+91 98765 00002',
        parentEmail: 'ramesh.patel@example.com',
        homeAddress: 'Plot 12, Navrangpura, Ahmedabad, Gujarat - 380009',
        bloodGroup: 'O+',
        medicalAlerts: 'Asthma (Inhaler user)',
        biometricEnrolled: true,
        roomFeeStatus: 'Paid',
        messFeeStatus: 'Unpaid',
        attendanceRate: 92.0,
        isActive: true,
        enrolledDate: '2024-08-01'
      },
      {
        studentId: 'STU-2024-003',
        rollNumber: '20ME210',
        name: 'Amit Kumar',
        gender: 'Male',
        department: 'Mechanical Engineering',
        year: ACADEMIC_YEARS.FOURTH_YEAR,
        roomNumber: 'A-305',
        block: HOSTEL_BLOCKS.BLOCK_A_MEN,
        email: 'amit.kumar@hostel.edu',
        phone: '+91 98765 43212',
        parentName: 'Sunil Kumar',
        parentPhone: '+91 98765 00003',
        parentEmail: 'sunil.kumar@example.com',
        homeAddress: 'House 88, Kankarbagh, Patna, Bihar - 800020',
        bloodGroup: 'A+',
        medicalAlerts: 'None',
        biometricEnrolled: true,
        roomFeeStatus: 'Unpaid',
        messFeeStatus: 'Paid',
        attendanceRate: 88.4,
        isActive: true,
        enrolledDate: '2022-08-01'
      },
      {
        studentId: 'STU-2024-004',
        rollNumber: '23IT089',
        name: 'Sneha Reddy',
        gender: 'Female',
        department: 'Information Technology',
        year: ACADEMIC_YEARS.FIRST_YEAR,
        roomNumber: 'C-215',
        block: HOSTEL_BLOCKS.BLOCK_C_WOMEN,
        email: 'sneha.reddy@hostel.edu',
        phone: '+91 98765 43213',
        parentName: 'Venkat Reddy',
        parentPhone: '+91 98765 00004',
        parentEmail: 'venkat.reddy@example.com',
        homeAddress: 'Road No. 10, Banjara Hills, Hyderabad, Telangana - 500034',
        bloodGroup: 'AB+',
        medicalAlerts: 'Peanut allergy',
        biometricEnrolled: true,
        roomFeeStatus: 'Paid',
        messFeeStatus: 'Paid',
        attendanceRate: 98.2,
        isActive: true,
        enrolledDate: '2025-08-01'
      },
      {
        studentId: 'STU-2024-005',
        rollNumber: '22CV034',
        name: 'Karthik Raja',
        gender: 'Male',
        department: 'Civil Engineering',
        year: ACADEMIC_YEARS.SECOND_YEAR,
        roomNumber: 'B-108',
        block: HOSTEL_BLOCKS.BLOCK_B_MEN,
        email: 'karthik.raja@hostel.edu',
        phone: '+91 98765 43214',
        parentName: 'Ganesan Raja',
        parentPhone: '+91 98765 00005',
        parentEmail: 'ganesan.raja@example.com',
        homeAddress: '54 Anna Nagar West, Chennai, Tamil Nadu - 600040',
        bloodGroup: 'O-',
        medicalAlerts: 'None',
        biometricEnrolled: true,
        roomFeeStatus: 'Unpaid',
        messFeeStatus: 'Unpaid',
        attendanceRate: 74.5,
        isActive: true,
        enrolledDate: '2024-08-01'
      },
      {
        studentId: 'STU-2024-006',
        rollNumber: '21EE188',
        name: 'Ananya Roy',
        gender: 'Female',
        department: 'Electrical Engineering',
        year: ACADEMIC_YEARS.THIRD_YEAR,
        roomNumber: 'D-104',
        block: HOSTEL_BLOCKS.BLOCK_D_WOMEN,
        email: 'ananya.roy@hostel.edu',
        phone: '+91 98765 43215',
        parentName: 'Debashis Roy',
        parentPhone: '+91 98765 00006',
        parentEmail: 'debashis.roy@example.com',
        homeAddress: 'Salt Lake Sector 3, Kolkata, West Bengal - 700098',
        bloodGroup: 'B-',
        medicalAlerts: 'None',
        biometricEnrolled: true,
        roomFeeStatus: 'Paid',
        messFeeStatus: 'Paid',
        attendanceRate: 94.8,
        isActive: true,
        enrolledDate: '2023-08-01'
      }
    ];

    for (const s of seedData) {
      this.residents.set(s.studentId, s);
    }
  }

  /**
   * Registers a new resident into the hostel master system.
   * @param {Object} residentData - Resident object.
   * @returns {Object} Created resident profile.
   */
  registerResident(residentData) {
    if (!residentData || !residentData.name || !residentData.rollNumber) {
      throw new Error('Name and University Roll Number are mandatory.');
    }

    const studentId = residentData.studentId || `STU-${new Date().getFullYear()}-${String(this.residents.size + 1).padStart(3, '0')}`;
    const newResident = {
      ...residentData,
      studentId: studentId,
      enrolledDate: residentData.enrolledDate || new Date().toISOString().split('T')[0],
      isActive: true
    };

    this.residents.set(studentId, newResident);
    return newResident;
  }

  /**
   * Finds resident by student ID or roll number.
   * @param {string} query - Identifier query.
   * @returns {Object|null} Resident profile.
   */
  findResident(query) {
    if (!query) return null;
    const q = String(query).trim().toLowerCase();

    for (const resident of this.residents.values()) {
      if (resident.studentId.toLowerCase() === q || resident.rollNumber.toLowerCase() === q || resident.email.toLowerCase() === q) {
        return resident;
      }
    }
    return null;
  }

  /**
   * Lists all active residents in the hostel.
   * @returns {Array<Object>} List of residents.
   */
  getAllResidents() {
    return Array.from(this.residents.values());
  }

  /**
   * Updates resident information.
   * @param {string} studentId - Student ID.
   * @param {Object} patch - Fields to update.
   * @returns {Object} Updated resident.
   */
  updateResident(studentId, patch = {}) {
    const resident = this.residents.get(studentId);
    if (!resident) {
      throw new Error(`Resident ${studentId} not found.`);
    }

    Object.assign(resident, patch);
    return resident;
  }
}

module.exports = {
  ResidentDirectoryService,
  ACADEMIC_YEARS,
  HOSTEL_BLOCKS
};
