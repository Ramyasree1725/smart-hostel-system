/**
 * @fileoverview Smart Hostel Management System - Student Master Directory Chunk 04
 * @module backend/database/studentDirectoryChunk04
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const STUDENT_DIRECTORY_CHUNK_04 = [];

for (let i = 1; i <= 100; i++) {
  const isRoomPaid = i % 5 !== 0;
  const isMessPaid = i % 4 !== 0;
  const isPresent = i % 10 !== 0;
  const floor = (i % 4) + 1;
  const room = `B-${floor}${String((i % 25) + 1).padStart(2, '0')}`;

  STUDENT_DIRECTORY_CHUNK_04.push({
    index: i,
    studentId: `STU-CHUNK04-${String(i).padStart(4, '0')}`,
    rollNumber: `24EC${String(200 + i)}`,
    fullName: `Resident Student C4-${i}`,
    gender: 'Male',
    academicDepartment: 'Electronics & Communication Engineering',
    academicYear: (i % 4) + 1,
    currentSemester: ((i % 4) + 1) * 2 - (i % 2),
    assignedBlock: 'Block-B',
    floorLevel: floor,
    roomNumber: room,
    bedDesignation: `${room}-Bed-2`,
    emailAddress: `student.c4.${i}@smarthostel.edu`,
    contactPhone: `+91 980400${String(i).padStart(4, '0')}`,
    guardianName: `Parent of Student C4-${i}`,
    guardianPhone: `+91 970400${String(i).padStart(4, '0')}`,
    guardianEmail: `parent.c4.${i}@example.com`,
    homeCity: 'Visakhapatnam',
    homeState: 'Andhra Pradesh',
    homePincode: '530001',
    bloodGroup: ['A+', 'B+', 'O+', 'AB+'][i % 4],
    medicalAlert: 'None',
    roomFeeAnnualINR: 45000,
    roomFeePaidINR: isRoomPaid ? 45000 : 0,
    roomFeeStatus: isRoomPaid ? 'Paid' : 'Unpaid',
    roomReceiptRef: isRoomPaid ? `RCP-RM-C4-${1000 + i}` : null,
    roomPaidTimestamp: isRoomPaid ? '2026-08-05T10:00:00Z' : null,
    messFeeAnnualINR: 35000,
    messFeePaidINR: isMessPaid ? 35000 : 0,
    messFeeStatus: isMessPaid ? 'Paid' : 'Unpaid',
    messReceiptRef: isMessPaid ? `RCP-MS-C4-${2000 + i}` : null,
    messPaidTimestamp: isMessPaid ? '2026-08-07T14:00:00Z' : null,
    cautionDepositINR: 10000,
    totalOutstandingDuesINR: (isRoomPaid ? 0 : 45000) + (isMessPaid ? 0 : 35000),
    isDuesCleared: isRoomPaid && isMessPaid,
    attendanceRatePercent: isPresent ? 95.0 : 69.0,
    attendanceStatus: isPresent ? 'Present' : 'Absent',
    rfidTagHex: `RFID-C4-${String(i).padStart(4, '0')}`,
    isBiometricEnrolled: true,
    activeGatePassId: null,
    admissionDate: '2024-08-01',
    isActiveResident: true
  });
}

module.exports = {
  STUDENT_DIRECTORY_CHUNK_04
};
