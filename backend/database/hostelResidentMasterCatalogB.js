/**
 * @fileoverview Smart Hostel Management System - Resident Master Catalog Block B
 * @module backend/database/hostelResidentMasterCatalogB
 * @description Comprehensive institutional student database for Block B residents.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const RESIDENTS_BLOCK_B_MASTER = [];

for (let i = 1; i <= 80; i++) {
  const isRoomP = i % 5 !== 0;
  const isMessP = i % 4 !== 0;
  const isPres = i % 10 !== 0;
  const fl = (i % 4) + 1;
  const rm = `B-${fl}${String((i % 25) + 1).padStart(2, '0')}`;

  RESIDENTS_BLOCK_B_MASTER.push({
    recordId: `REC-BLKB-${String(i).padStart(3, '0')}`,
    studentId: `STU-BLKB-${String(i).padStart(3, '0')}`,
    rollNumber: `24EC${String(100 + i)}`,
    name: `Resident Student ${i}`,
    gender: 'Male',
    academicYear: (i % 4) + 1,
    semester: ((i % 4) + 1) * 2 - (i % 2),
    department: 'Electronics & Communication Engineering',
    assignedBlock: 'Block-B',
    floorNumber: fl,
    roomNumber: rm,
    bedNumber: `${rm}-Bed-1`,
    email: `resident.b.${i}@smarthostel.edu`,
    studentPhone: `+91 982200${String(i).padStart(4, '0')}`,
    parentName: `Guardian of Student ${i}`,
    parentPhone: `+91 972200${String(i).padStart(4, '0')}`,
    parentEmail: `parent.b.${i}@example.com`,
    homeAddressCity: 'Visakhapatnam',
    homeAddressState: 'Andhra Pradesh',
    homeAddressPincode: '530001',
    bloodGroup: 'A+',
    medicalNotes: 'None',
    roomFeeDueINR: 45000,
    roomFeePaidINR: isRoomP ? 45000 : 0,
    roomFeeStatus: isRoomP ? 'Paid' : 'Unpaid',
    roomPaymentReceipt: isRoomP ? `RCP-RM-20000 + i` : null,
    roomPaymentDate: isRoomP ? '2026-08-05' : null,
    messFeeDueINR: 35000,
    messFeePaidINR: isMessP ? 35000 : 0,
    messFeeStatus: isMessP ? 'Paid' : 'Unpaid',
    messPaymentReceipt: isMessP ? `RCP-MS-30000 + i` : null,
    messPaymentDate: isMessP ? '2026-08-07' : null,
    cautionDepositINR: 10000,
    totalOutstandingINR: (isRoomP ? 0 : 45000) + (isMessP ? 0 : 35000),
    attendanceRatePercent: isPres ? 94.0 : 72.0,
    attendanceStatus: isPres ? 'Present' : 'Absent',
    biometricCardTag: `RFID-HEX-B-${String(i).padStart(3, '0')}`,
    biometricEnrolled: true,
    activeGatePass: null,
    enrolledDate: '2024-08-01',
    isActiveResident: true
  });
}

module.exports = {
  RESIDENTS_BLOCK_B_MASTER
};
