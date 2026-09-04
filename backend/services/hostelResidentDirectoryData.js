/**
 * @fileoverview Smart Hostel Management System - High Density Resident Master Records Dataset
 * @module backend/services/hostelResidentDirectoryData
 * @description Master dataset containing comprehensive resident student profiles across Engineering,
 * Medicine, Management, and Sciences departments with full contact info, parent directories, and fee statuses.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * High density resident students master directory array.
 */
const RESIDENTS_MASTER_DATASET = [];

const FIRST_NAMES_MALE = ['Rahul', 'Amit', 'Karthik', 'Siddharth', 'Aditya', 'Rohan', 'Varun', 'Nikhil', 'Manish', 'Vikram', 'Pranav', 'Suresh', 'Deepak', 'Gaurav', 'Arjun', 'Sai', 'Venkat', 'Harish', 'Tarun', 'Anand'];
const FIRST_NAMES_FEMALE = ['Priya', 'Sneha', 'Ananya', 'Divya', 'Pooja', 'Kavya', 'Deepika', 'Aishwarya', 'Swathi', 'Shruti', 'Megha', 'Ritu', 'Shreya', 'Bhavna', 'Neha', 'Lavanya', 'Ishita', 'Tanvi', 'Preeti', 'Nandini'];
const LAST_NAMES = ['Sharma', 'Patel', 'Kumar', 'Reddy', 'Raja', 'Roy', 'Chowdhury', 'Mishra', 'Gupta', 'Verma', 'Singh', 'Nair', 'Iyer', 'Deshmukh', 'Joshi', 'Bose', 'Pillai', 'Rao', 'Agarwal', 'Menon'];
const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Electronics & Communication Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical & Electronics Engineering',
  'Information Technology',
  'Biotechnology',
  'Chemical Engineering',
  'Data Science & AI',
  'Aerospace Engineering'
];
const CITIES = ['Hyderabad', 'Bengaluru', 'Chennai', 'Mumbai', 'Delhi', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Visakhapatnam', 'Kochi', 'Coimbatore', 'Indore', 'Patna', 'Bhopal', 'Chandigarh', 'Nagpur', 'Surat', 'Vadodara'];

// Generate 500 complete student profiles
let idCounter = 1;

for (let i = 0; i < 500; i++) {
  const isFemale = i % 2 === 1;
  const firstName = isFemale ? FIRST_NAMES_FEMALE[i % FIRST_NAMES_FEMALE.length] : FIRST_NAMES_MALE[i % FIRST_NAMES_MALE.length];
  const lastName = LAST_NAMES[(i * 3 + 7) % LAST_NAMES.length];
  const fullName = `${firstName} ${lastName}`;
  const studentId = `STU-2024-${String(idCounter).padStart(4, '0')}`;
  const rollNumber = `24${DEPARTMENTS[i % DEPARTMENTS.length].slice(0, 2).toUpperCase()}${String(100 + (i % 900))}`;
  const block = isFemale ? (i % 4 === 1 ? 'Block-C' : 'Block-D') : (i % 4 === 0 ? 'Block-A' : 'Block-B');
  const floor = (i % 4) + 1;
  const roomNumber = `${block.replace('Block-', '')}-${floor}${String((i % 25) + 1).padStart(2, '0')}`;
  const city = CITIES[i % CITIES.length];
  const phone = `+91 98${String(10000000 + (i * 179) % 89999999).slice(0, 8)}`;
  const parentPhone = `+91 97${String(20000000 + (i * 233) % 79999999).slice(0, 8)}`;
  const isRoomPaid = (i % 5 !== 0);
  const isMessPaid = (i % 4 !== 0);
  const isPresent = (i % 10 !== 0);

  RESIDENTS_MASTER_DATASET.push({
    studentId: studentId,
    rollNumber: rollNumber,
    name: fullName,
    gender: isFemale ? 'Female' : 'Male',
    department: DEPARTMENTS[i % DEPARTMENTS.length],
    year: (i % 4) + 1,
    roomNumber: roomNumber,
    block: block,
    floor: floor,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${studentId.toLowerCase()}@hostel.edu`,
    phone: phone,
    parentName: `${isFemale ? 'Mr. ' : 'Mr. '}${LAST_NAMES[(i * 2 + 1) % LAST_NAMES.length]}`,
    parentPhone: parentPhone,
    homeAddress: `Plot ${10 + (i % 90)}, Sector ${1 + (i % 15)}, ${city}`,
    bloodGroup: ['A+', 'B+', 'O+', 'AB+', 'O-', 'A-', 'B-'][i % 7],
    roomFeeStatus: isRoomPaid ? 'Paid' : 'Unpaid',
    messFeeStatus: isMessPaid ? 'Paid' : 'Unpaid',
    attendanceStatus: isPresent ? 'Present' : 'Absent',
    attendanceRate: isPresent ? (90 + (i % 10)) : (70 + (i % 15)),
    activeGatePass: null,
    enrolledDate: '2024-08-01'
  });

  idCounter++;
}

module.exports = {
  RESIDENTS_MASTER_DATASET
};
