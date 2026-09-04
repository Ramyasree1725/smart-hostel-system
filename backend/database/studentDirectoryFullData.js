/**
 * @fileoverview Smart Hostel Management System - Student Master Directory Extended Records
 * @module backend/database/studentDirectoryFullData
 * @description Comprehensive institutional student database holding biographical, academic,
 * parent contact, blood group, emergency, room allotment, and financial profiles.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const STUDENT_MASTER_ARCHIVE = [];

// Seed 1,200 detailed student records
const NAMES_FIRST = ['Aarav', 'Aditya', 'Akhil', 'Amit', 'Anand', 'Aniket', 'Arjun', 'Ashwin', 'Ayush', 'Bharat', 'Chetan', 'Deepak', 'Dev', 'Dinesh', 'Gaurav', 'Girish', 'Harish', 'Harsh', 'Hemant', 'Ishaan', 'Aadya', 'Aakanksha', 'Aanya', 'Aarti', 'Aditi', 'Aishwarya', 'Akshara', 'Amrita', 'Ananya', 'Anjali', 'Ankita', 'Anushka', 'Aparna', 'Archana', 'Avani', 'Bhavna', 'Charu', 'Deepa', 'Deepika', 'Divya'];
const NAMES_LAST = ['Sharma', 'Patel', 'Kumar', 'Reddy', 'Raja', 'Roy', 'Chowdhury', 'Mishra', 'Gupta', 'Verma', 'Singh', 'Nair', 'Iyer', 'Deshmukh', 'Joshi', 'Bose', 'Pillai', 'Rao', 'Agarwal', 'Menon'];
const BRANCHES = ['Computer Science & Engineering', 'Electronics & Communication', 'Mechanical Engineering', 'Civil Engineering', 'Electrical & Electronics', 'Information Technology', 'Biotechnology', 'Chemical Engineering', 'Data Science & AI', 'Aerospace Engineering'];
const TOWNS = ['Hyderabad', 'Bengaluru', 'Chennai', 'Mumbai', 'Pune', 'Delhi', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Visakhapatnam', 'Kochi', 'Bhopal', 'Patna', 'Chandigarh'];

for (let i = 1; i <= 1200; i++) {
  const isFemale = i % 2 === 0;
  const fn = NAMES_FIRST[(i * 7 + 11) % NAMES_FIRST.length];
  const ln = NAMES_LAST[(i * 13 + 17) % NAMES_LAST.length];
  const branch = BRANCHES[i % BRANCHES.length];
  const town = TOWNS[i % TOWNS.length];
  const roll = `24${branch.slice(0, 2).toUpperCase()}${String(100 + (i % 900))}`;
  const block = isFemale ? (i % 4 === 0 ? 'Block-D' : 'Block-C') : (i % 3 === 0 ? 'Block-B' : 'Block-A');
  const floor = (i % 4) + 1;
  const room = `${block.replace('Block-', '')}-${floor}${String((i % 25) + 1).padStart(2, '0')}`;
  const isRoomPaid = i % 5 !== 0;
  const isMessPaid = i % 4 !== 0;
  const isPresent = i % 10 !== 0;

  STUDENT_MASTER_ARCHIVE.push({
    recordIndex: i,
    studentId: `STU-2024-${String(i).padStart(4, '0')}`,
    rollNumber: roll,
    fullName: `${fn} ${ln}`,
    gender: isFemale ? 'Female' : 'Male',
    department: branch,
    academicYear: (i % 4) + 1,
    semesterNumber: ((i % 4) + 1) * 2 - (i % 2),
    assignedHostelBlock: block,
    floorLevel: floor,
    roomNumber: room,
    personalEmail: `${fn.toLowerCase()}.${ln.toLowerCase()}.${i}@student.university.edu`,
    studentMobile: `+91 98${String(10000000 + (i * 9231) % 89999999).slice(0, 8)}`,
    guardianName: `${isFemale ? 'Mr. ' : 'Mr. '}${ln}`,
    guardianPhone: `+91 97${String(20000000 + (i * 7419) % 79999999).slice(0, 8)}`,
    guardianEmail: `guardian.${ln.toLowerCase()}.${i}@family.org`,
    permanentAddress: `Plot ${10 + (i % 90)}, Sector ${1 + (i % 20)}, ${town}`,
    bloodGroup: ['A+', 'B+', 'O+', 'AB+', 'O-', 'A-', 'B-'][i % 7],
    medicalAlerts: (i % 12 === 0) ? 'Asthma (Inhaler user)' : ((i % 20 === 0) ? 'Lactose Intolerant' : 'None Reported'),
    biometricEnrolled: true,
    rfidCardTag: `RFID-TAG-00${i.toString(16).toUpperCase()}`,
    financialLedger: {
      semesterRoomFeeINR: 45000,
      roomFeeStatus: isRoomPaid ? 'Paid' : 'Unpaid',
      roomPaymentReceipt: isRoomPaid ? `RCP-RM-${10000 + i}` : null,
      semesterMessFeeINR: 35000,
      messFeeStatus: isMessPaid ? 'Paid' : 'Unpaid',
      messPaymentReceipt: isMessPaid ? `RCP-MS-${20000 + i}` : null,
      cautionDepositINR: 10000,
      totalOutstandingINR: (isRoomPaid ? 0 : 45000) + (isMessPaid ? 0 : 35000)
    },
    attendanceSummary: {
      currentStatus: isPresent ? 'Present' : 'Absent',
      cumulativeAttendancePercent: isPresent ? parseFloat((90 + (i % 10) * 0.95).toFixed(1)) : parseFloat((72 + (i % 15) * 0.8).toFixed(1)),
      totalClassesAttended: 180 + (i % 40),
      totalWorkingDays: 220
    },
    registrationDate: '2024-08-01',
    isActiveStudent: true
  });
}

function queryStudentById(id) {
  if (!id) return null;
  const q = String(id).toUpperCase();
  return STUDENT_MASTER_ARCHIVE.find(s => s.studentId === q || s.rollNumber === q) || null;
}

function filterStudentsByBlock(block) {
  if (!block) return STUDENT_MASTER_ARCHIVE;
  return STUDENT_MASTER_ARCHIVE.filter(s => s.assignedHostelBlock.toUpperCase() === block.toUpperCase());
}

module.exports = {
  STUDENT_MASTER_ARCHIVE,
  queryStudentById,
  filterStudentsByBlock
};
