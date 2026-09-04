/**
 * @fileoverview Smart Hostel Management System - Student Extended Registry Part 2
 * @module backend/database/studentExtendedRegistryPart2
 * @description Comprehensive institutional student database holding detailed biographical and academic records.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const STUDENT_EXTENDED_REGISTRY_PART2 = [];

for (let i = 151; i <= 300; i++) {
  const isFemale = i % 2 === 0;
  const blk = isFemale ? 'Block-D' : 'Block-B';
  const flr = (i % 4) + 1;
  const rm = `${blk.replace('Block-', '')}-${flr}${String((i % 25) + 1).padStart(2, '0')}`;
  const isRPaid = i % 5 !== 0;
  const isMPaid = i % 4 !== 0;
  const isPres = i % 10 !== 0;

  STUDENT_EXTENDED_REGISTRY_PART2.push({
    studentId: `STU-EXT-${String(i).padStart(4, '0')}`,
    rollNumber: `24EC${String(100 + (i % 900))}`,
    name: `Student Resident ${i}`,
    department: 'Electronics & Communication Engineering',
    year: (i % 4) + 1,
    semester: ((i % 4) + 1) * 2 - (i % 2),
    assignedBlock: blk,
    floor: flr,
    roomNumber: rm,
    email: `student.${i}@smarthostel.edu`,
    phone: `+91 982200${String(i).padStart(4, '0')}`,
    parentName: `Guardian of Student ${i}`,
    parentPhone: `+91 972200${String(i).padStart(4, '0')}`,
    parentEmail: `parent.${i}@example.com`,
    homeCity: 'Chennai',
    bloodGroup: 'A+',
    roomFeeDue: 45000,
    roomFeePaid: isRPaid ? 45000 : 0,
    roomFeeStatus: isRPaid ? 'Paid' : 'Unpaid',
    messFeeDue: 35000,
    messFeePaid: isMPaid ? 35000 : 0,
    messFeeStatus: isMPaid ? 'Paid' : 'Unpaid',
    attendancePercent: isPres ? 96.0 : 70.0,
    attendanceStatus: isPres ? 'Present' : 'Absent',
    biometricEnrolled: true,
    activeGatePass: null,
    enrolledDate: '2024-08-01'
  });
}

function getResidentByIdPart2(id) {
  return STUDENT_EXTENDED_REGISTRY_PART2.find(s => s.studentId === id) || null;
}

module.exports = {
  STUDENT_EXTENDED_REGISTRY_PART2,
  getResidentByIdPart2
};
