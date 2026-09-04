/**
 * @fileoverview Smart Hostel Management System - Student Master Directory Chunk 08
 * @module backend/database/studentDirectoryChunk08
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const STUDENT_DIRECTORY_CHUNK_08 = [];

for (let i = 1; i <= 100; i++) {
  const isRoomPaid = i % 5 !== 0;
  const isMessPaid = i % 4 !== 0;
  const isPresent = i % 10 !== 0;
  const floor = (i % 3) + 1;
  const room = `E-${floor}${String((i % 25) + 1).padStart(2, '0')}`;

  STUDENT_DIRECTORY_CHUNK_08.push({
    index: i,
    studentId: `STU-CHUNK08-${String(i).padStart(4, '0')}`,
    rollNumber: `24ME${String(100 + i)}`,
    fullName: `Resident Student C8-${i}`,
    gender: 'Male',
    academicDepartment: 'Mechanical Engineering',
    academicYear: (i % 4) + 1,
    currentSemester: ((i % 4) + 1) * 2 - (i % 2),
    assignedBlock: 'Block-E',
    floorLevel: floor,
    roomNumber: room,
    bedDesignation: `${room}-Bed-1`,
    emailAddress: `student.c8.${i}@smarthostel.edu`,
    contactPhone: `+91 980800${String(i).padStart(4, '0')}`,
    guardianName: `Parent of Student C8-${i}`,
    guardianPhone: `+91 970800${String(i).padStart(4, '0')}`,
    guardianEmail: `parent.c8.${i}@example.com`,
    homeCity: 'Delhi',
    homeState: 'Delhi NCR',
    homePincode: '110001',
    bloodGroup: ['A+', 'B+', 'O+', 'AB+'][i % 4],
    medicalAlert: 'None',
    roomFeeAnnualINR: 45000,
    roomFeePaidINR: isRoomPaid ? 45000 : 0,
    roomFeeStatus: isRoomPaid ? 'Paid' : 'Unpaid',
    roomReceiptRef: isRoomPaid ? `RCP-RM-C8-${1000 + i}` : null,
    roomPaidTimestamp: isRoomPaid ? '2026-08-05T10:00:00Z' : null,
    messFeeAnnualINR: 35000,
    messFeePaidINR: isMessPaid ? 35000 : 0,
    messFeeStatus: isMessPaid ? 'Paid' : 'Unpaid',
    messReceiptRef: isMessPaid ? `RCP-MS-C8-${2000 + i}` : null,
    messPaidTimestamp: isMessPaid ? '2026-08-07T14:00:00Z' : null,
    cautionDepositINR: 10000,
    totalOutstandingDuesINR: (isRoomPaid ? 0 : 45000) + (isMessPaid ? 0 : 35000),
    isDuesCleared: isRoomPaid && isMessPaid,
    attendanceRatePercent: isPresent ? 93.0 : 68.0,
    attendanceStatus: isPresent ? 'Present' : 'Absent',
    rfidTagHex: `RFID-C8-${String(i).padStart(4, '0')}`,
    isBiometricEnrolled: true,
    activeGatePassId: null,
    admissionDate: '2024-08-01',
    isActiveResident: true
  });
}

module.exports = {
  STUDENT_DIRECTORY_CHUNK_08
};
