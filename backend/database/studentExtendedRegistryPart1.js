/**
 * @fileoverview Smart Hostel Management System - Student Extended Registry Part 1
 * @module backend/database/studentExtendedRegistryPart1
 * @description Comprehensive institutional student database holding detailed biographical and academic records.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const STUDENT_EXTENDED_REGISTRY_PART1 = [
  {
    studentId: 'STU-EXT-0001',
    rollNumber: '24CS101',
    name: 'Aarav Sharma',
    department: 'Computer Science & Engineering',
    year: 1,
    semester: 1,
    assignedBlock: 'Block-A',
    floor: 1,
    roomNumber: 'A-101',
    email: 'aarav.sharma.0001@smarthostel.edu',
    phone: '+91 9811000001',
    parentName: 'Suresh Sharma',
    parentPhone: '+91 9711000001',
    parentEmail: 'suresh.sharma.0001@example.com',
    homeCity: 'Hyderabad',
    bloodGroup: 'O+',
    roomFeeDue: 45000,
    roomFeePaid: 45000,
    roomFeeStatus: 'Paid',
    messFeeDue: 35000,
    messFeePaid: 35000,
    messFeeStatus: 'Paid',
    attendancePercent: 95.5,
    attendanceStatus: 'Present',
    biometricEnrolled: true,
    activeGatePass: null,
    enrolledDate: '2024-08-01'
  },
  {
    studentId: 'STU-EXT-0002',
    rollNumber: '24CS102',
    name: 'Aditya Patel',
    department: 'Computer Science & Engineering',
    year: 1,
    semester: 1,
    assignedBlock: 'Block-A',
    floor: 1,
    roomNumber: 'A-102',
    email: 'aditya.patel.0002@smarthostel.edu',
    phone: '+91 9811000002',
    parentName: 'Ramesh Patel',
    parentPhone: '+91 9711000002',
    parentEmail: 'ramesh.patel.0002@example.com',
    homeCity: 'Ahmedabad',
    bloodGroup: 'A+',
    roomFeeDue: 45000,
    roomFeePaid: 45000,
    roomFeeStatus: 'Paid',
    messFeeDue: 35000,
    messFeePaid: 0,
    messFeeStatus: 'Unpaid',
    attendancePercent: 91.0,
    attendanceStatus: 'Present',
    biometricEnrolled: true,
    activeGatePass: null,
    enrolledDate: '2024-08-01'
  },
  {
    studentId: 'STU-EXT-0003',
    rollNumber: '24CS103',
    name: 'Akhil Kumar',
    department: 'Computer Science & Engineering',
    year: 1,
    semester: 1,
    assignedBlock: 'Block-A',
    floor: 1,
    roomNumber: 'A-103',
    email: 'akhil.kumar.0003@smarthostel.edu',
    phone: '+91 9811000003',
    parentName: 'Sunil Kumar',
    parentPhone: '+91 9711000003',
    parentEmail: 'sunil.kumar.0003@example.com',
    homeCity: 'Patna',
    bloodGroup: 'B+',
    roomFeeDue: 45000,
    roomFeePaid: 0,
    roomFeeStatus: 'Unpaid',
    messFeeDue: 35000,
    messFeePaid: 35000,
    messFeeStatus: 'Paid',
    attendancePercent: 88.0,
    attendanceStatus: 'Present',
    biometricEnrolled: true,
    activeGatePass: null,
    enrolledDate: '2024-08-01'
  },
  {
    studentId: 'STU-EXT-0004',
    rollNumber: '24CS104',
    name: 'Amit Reddy',
    department: 'Computer Science & Engineering',
    year: 1,
    semester: 1,
    assignedBlock: 'Block-A',
    floor: 1,
    roomNumber: 'A-104',
    email: 'amit.reddy.0004@smarthostel.edu',
    phone: '+91 9811000004',
    parentName: 'Venkat Reddy',
    parentPhone: '+91 9711000004',
    parentEmail: 'venkat.reddy.0004@example.com',
    homeCity: 'Hyderabad',
    bloodGroup: 'AB+',
    roomFeeDue: 45000,
    roomFeePaid: 45000,
    roomFeeStatus: 'Paid',
    messFeeDue: 35000,
    messFeePaid: 35000,
    messFeeStatus: 'Paid',
    attendancePercent: 96.0,
    attendanceStatus: 'Present',
    biometricEnrolled: true,
    activeGatePass: null,
    enrolledDate: '2024-08-01'
  },
  {
    studentId: 'STU-EXT-0005',
    rollNumber: '24CS105',
    name: 'Anand Raja',
    department: 'Computer Science & Engineering',
    year: 1,
    semester: 1,
    assignedBlock: 'Block-A',
    floor: 1,
    roomNumber: 'A-105',
    email: 'anand.raja.0005@smarthostel.edu',
    phone: '+91 9811000005',
    parentName: 'Ganesan Raja',
    parentPhone: '+91 9711000005',
    parentEmail: 'ganesan.raja.0005@example.com',
    homeCity: 'Chennai',
    bloodGroup: 'O-',
    roomFeeDue: 45000,
    roomFeePaid: 0,
    roomFeeStatus: 'Unpaid',
    messFeeDue: 35000,
    messFeePaid: 0,
    messFeeStatus: 'Unpaid',
    attendancePercent: 75.0,
    attendanceStatus: 'Absent',
    biometricEnrolled: true,
    activeGatePass: null,
    enrolledDate: '2024-08-01'
  }
];

// Dynamically generate 150 more structured resident records
for (let i = 6; i <= 150; i++) {
  const isFemale = i % 2 === 0;
  const blk = isFemale ? 'Block-C' : 'Block-A';
  const flr = (i % 4) + 1;
  const rm = `${blk.replace('Block-', '')}-${flr}${String((i % 25) + 1).padStart(2, '0')}`;
  const isRPaid = i % 5 !== 0;
  const isMPaid = i % 4 !== 0;
  const isPres = i % 10 !== 0;

  STUDENT_EXTENDED_REGISTRY_PART1.push({
    studentId: `STU-EXT-${String(i).padStart(4, '0')}`,
    rollNumber: `24CS${String(100 + i)}`,
    name: `Student Resident ${i}`,
    department: 'Computer Science & Engineering',
    year: (i % 4) + 1,
    semester: ((i % 4) + 1) * 2 - (i % 2),
    assignedBlock: blk,
    floor: flr,
    roomNumber: rm,
    email: `student.${i}@smarthostel.edu`,
    phone: `+91 981100${String(i).padStart(4, '0')}`,
    parentName: `Guardian of Student ${i}`,
    parentPhone: `+91 971100${String(i).padStart(4, '0')}`,
    parentEmail: `parent.${i}@example.com`,
    homeCity: 'Bengaluru',
    bloodGroup: 'B+',
    roomFeeDue: 45000,
    roomFeePaid: isRPaid ? 45000 : 0,
    roomFeeStatus: isRPaid ? 'Paid' : 'Unpaid',
    messFeeDue: 35000,
    messFeePaid: isMPaid ? 35000 : 0,
    messFeeStatus: isMPaid ? 'Paid' : 'Unpaid',
    attendancePercent: isPres ? 94.0 : 72.0,
    attendanceStatus: isPres ? 'Present' : 'Absent',
    biometricEnrolled: true,
    activeGatePass: null,
    enrolledDate: '2024-08-01'
  });
}

function getResidentByIdPart1(id) {
  return STUDENT_EXTENDED_REGISTRY_PART1.find(s => s.studentId === id) || null;
}

module.exports = {
  STUDENT_EXTENDED_REGISTRY_PART1,
  getResidentByIdPart1
};
