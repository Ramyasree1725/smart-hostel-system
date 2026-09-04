/**
 * @fileoverview Smart Hostel Management System - Student Master Directory Chunk 02
 * @module backend/database/studentDirectoryChunk02
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const STUDENT_DIRECTORY_CHUNK_02 = [];

for (let i = 1; i <= 100; i++) {
  const isRoomPaid = i % 5 !== 0;
  const isMessPaid = i % 4 !== 0;
  const isPresent = i % 10 !== 0;
  const floor = (i % 4) + 1;
  const room = `A-${floor}${String((i % 25) + 1).padStart(2, '0')}`;

  STUDENT_DIRECTORY_CHUNK_02.push({
    index: i,
    studentId: `STU-CHUNK02-${String(i).padStart(4, '0')}`,
    rollNumber: `24CS${String(200 + i)}`,
    fullName: `Resident Student C2-${i}`,
    gender: 'Male',
    academicDepartment: 'Computer Science & Engineering',
    academicYear: (i % 4) + 1,
    currentSemester: ((i % 4) + 1) * 2 - (i % 2),
    assignedBlock: 'Block-A',
    floorLevel: floor,
    roomNumber: room,
    bedDesignation: `${room}-Bed-2`,
    emailAddress: `student.c2.${i}@smarthostel.edu`,
    contactPhone: `+91 980200${String(i).padStart(4, '0')}`,
    guardianName: `Parent of Student C2-${i}`,
    guardianPhone: `+91 970200${String(i).padStart(4, '0')}`,
    guardianEmail: `parent.c2.${i}@example.com`,
    homeCity: 'Bengaluru',
    homeState: 'Karnataka',
    homePincode: '560001',
    bloodGroup: ['A+', 'B+', 'O+', 'AB+'][i % 4],
    medicalAlert: 'None',
    roomFeeAnnualINR: 45000,
    roomFeePaidINR: isRoomPaid ? 45000 : 0,
    roomFeeStatus: isRoomPaid ? 'Paid' : 'Unpaid',
    roomReceiptRef: isRoomPaid ? `RCP-RM-C2-${1000 + i}` : null,
    roomPaidTimestamp: isRoomPaid ? '2026-08-05T10:00:00Z' : null,
    messFeeAnnualINR: 35000,
    messFeePaidINR: isMessPaid ? 35000 : 0,
    messFeeStatus: isMessPaid ? 'Paid' : 'Unpaid',
    messReceiptRef: isMessPaid ? `RCP-MS-C2-${2000 + i}` : null,
    messPaidTimestamp: isMessPaid ? '2026-08-07T14:00:00Z' : null,
    cautionDepositINR: 10000,
    totalOutstandingDuesINR: (isRoomPaid ? 0 : 45000) + (isMessPaid ? 0 : 35000),
    isDuesCleared: isRoomPaid && isMessPaid,
    attendanceRatePercent: isPresent ? 96.0 : 72.0,
    attendanceStatus: isPresent ? 'Present' : 'Absent',
    rfidTagHex: `RFID-C2-${String(i).padStart(4, '0')}`,
    isBiometricEnrolled: true,
    activeGatePassId: null,
    admissionDate: '2024-08-01',
    isActiveResident: true
  });
}

module.exports = {
  STUDENT_DIRECTORY_CHUNK_02
};
