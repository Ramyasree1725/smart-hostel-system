/**
 * @fileoverview Smart Hostel Management System - Student Extended Registry Part 3
 * @module backend/database/studentExtendedRegistryPart3
 * @description Comprehensive institutional student database holding detailed biographical and academic records.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const STUDENT_EXTENDED_REGISTRY_PART3 = [];

for (let i = 301; i <= 450; i++) {
  const isFemale = i % 2 === 0;
  const blk = isFemale ? 'Block-C' : 'Block-E';
  const flr = (i % 4) + 1;
  const rm = `${blk.replace('Block-', '')}-${flr}${String((i % 25) + 1).padStart(2, '0')}`;
  const isRPaid = i % 5 !== 0;
  const isMPaid = i % 4 !== 0;
  const isPres = i % 10 !== 0;

  STUDENT_EXTENDED_REGISTRY_PART3.push({
    studentId: `STU-EXT-${String(i).padStart(4, '0')}`,
    rollNumber: `24ME${String(100 + (i % 900))}`,
    name: `Student Resident ${i}`,
    department: 'Mechanical Engineering',
    year: (i % 4) + 1,
    semester: ((i % 4) + 1) * 2 - (i % 2),
    assignedBlock: blk,
    floor: flr,
    roomNumber: rm,
    email: `student.${i}@smarthostel.edu`,
    phone: `+91 983300${String(i).padStart(4, '0')}`,
    parentName: `Guardian of Student ${i}`,
    parentPhone: `+91 973300${String(i).padStart(4, '0')}`,
    parentEmail: `parent.${i}@example.com`,
    homeCity: 'Mumbai',
    bloodGroup: 'O+',
    roomFeeDue: 45000,
    roomFeePaid: isRPaid ? 45000 : 0,
    roomFeeStatus: isRPaid ? 'Paid' : 'Unpaid',
    messFeeDue: 35000,
    messFeePaid: isMPaid ? 35000 : 0,
    messFeeStatus: isMPaid ? 'Paid' : 'Unpaid',
    attendancePercent: isPres ? 92.0 : 68.0,
    attendanceStatus: isPres ? 'Present' : 'Absent',
    biometricEnrolled: true,
    activeGatePass: null,
    enrolledDate: '2024-08-01'
  });
}

function getResidentByIdPart3(id) {
  return STUDENT_EXTENDED_REGISTRY_PART3.find(s => s.studentId === id) || null;
}

module.exports = {
  STUDENT_EXTENDED_REGISTRY_PART3,
  getResidentByIdPart3
};
