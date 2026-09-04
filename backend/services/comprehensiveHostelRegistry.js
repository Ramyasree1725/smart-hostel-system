/**
 * @fileoverview Smart Hostel Management System - Comprehensive Master Resident Directory
 * @module backend/services/comprehensiveHostelRegistry
 * @description High-density resident dataset containing comprehensive biographical profiles,
 * academic details, room allotments, fee structures, parent contacts, biometric signatures,
 * and emergency medical notes for hostel administration.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Enumeration of student academic departments.
 */
const DEPARTMENTS = Object.freeze([
  'Computer Science & Engineering',
  'Electronics & Communication Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical & Electronics Engineering',
  'Information Technology',
  'Biotechnology & Bioinformatics',
  'Chemical Engineering',
  'Artificial Intelligence & Data Science',
  'Aerospace & Aeronautical Engineering',
  'Master of Business Administration (MBA)',
  'Master of Computer Applications (MCA)'
]);

/**
 * Hostel Residential Blocks.
 */
const BLOCKS = Object.freeze([
  { code: 'BLOCK-A', name: 'Nilgiri Senior Men\'s Block', floors: 4, roomsPerFloor: 25, type: 'MENS' },
  { code: 'BLOCK-B', name: 'Vindhya Junior Men\'s Block', floors: 4, roomsPerFloor: 25, type: 'MENS' },
  { code: 'BLOCK-C', name: 'Kaveri Women\'s Block', floors: 5, roomsPerFloor: 30, type: 'WOMENS' },
  { code: 'BLOCK-D', name: 'Ganga PG Women\'s Block', floors: 3, roomsPerFloor: 20, type: 'WOMENS' },
  { code: 'BLOCK-E', name: 'Himalaya International Block', floors: 3, roomsPerFloor: 15, type: 'CO_ED_SPECIAL' }
]);

/**
 * Master Student Records Collection (1,000 Detailed Profiles).
 */
const RESIDENTS_MASTER_DATABASE = [];

const FIRST_NAMES_M = [
  'Aarav', 'Aditya', 'Akhil', 'Amit', 'Anand', 'Aniket', 'Arjun', 'Ashwin', 'Ayush', 'Bharat',
  'Chetan', 'Deepak', 'Dev', 'Dinesh', 'Gaurav', 'Girish', 'Harish', 'Harsh', 'Hemant', 'Ishaan',
  'Jay', 'Karan', 'Karthik', 'Kunal', 'Manish', 'Mayank', 'Mohit', 'Naveen', 'Nikhil', 'Nitin',
  'Omkar', 'Pankaj', 'Pawan', 'Pranav', 'Prateek', 'Rahul', 'Rajat', 'Rajesh', 'Rakesh', 'Rishi',
  'Rohan', 'Rohit', 'Sachin', 'Sahil', 'Sameer', 'Sanjay', 'Saurabh', 'Shivam', 'Siddharth', 'Sohan',
  'Sparsh', 'Sudeep', 'Sumit', 'Sunil', 'Suraj', 'Suresh', 'Tarun', 'Utkarsh', 'Varun', 'Venkatesh',
  'Vikas', 'Vikram', 'Vinay', 'Vipin', 'Vishal', 'Vivek', 'Yash', 'Yogesh', 'Abhishek', 'Akash'
];

const FIRST_NAMES_F = [
  'Aadya', 'Aakanksha', 'Aanya', 'Aarti', 'Aditi', 'Aishwarya', 'Akshara', 'Amrita', 'Ananya', 'Anjali',
  'Ankita', 'Anushka', 'Aparna', 'Archana', 'Avani', 'Bhavna', 'Charu', 'Deepa', 'Deepika', 'Divya',
  'Gayatri', 'Geeta', 'Harini', 'Harshita', 'Isha', 'Ishita', 'Janani', 'Juhi', 'Kavita', 'Kavya',
  'Keerthi', 'Khushi', 'Komal', 'Lavanya', 'Madhavi', 'Mahima', 'Manisha', 'Megha', 'Monika', 'Nandini',
  'Navya', 'Neha', 'Nidhi', 'Nikita', 'Nisha', 'Pallavi', 'Pavithra', 'Pooja', 'Pragati', 'Prerna',
  'Priya', 'Priyanka', 'Radha', 'Raksha', 'Rashmi', 'Rhea', 'Riddhi', 'Ritu', 'Roshni', 'Sakshi',
  'Samiksha', 'Sanika', 'Sanya', 'Shalini', 'Shivani', 'Shreya', 'Shruti', 'Simran', 'Sneha', 'Sonali'
];

const SURNAMES = [
  'Agarwal', 'Banerjee', 'Bhat', 'Bhattacharya', 'Chakraborty', 'Chatterjee', 'Chauhan', 'Choudhury',
  'Das', 'Dasgupta', 'Deshmukh', 'Dutta', 'Ghosh', 'Goswami', 'Gupta', 'Iyer', 'Jadhav', 'Jain',
  'Jha', 'Joshi', 'Kapoor', 'Kaul', 'Khan', 'Khatri', 'Kulkarni', 'Kumar', 'Mahajan', 'Malhotra',
  'Mani', 'Mehta', 'Menon', 'Mishra', 'Mitra', 'Mukherjee', 'Nair', 'Nambiar', 'Naidu', 'Pandey',
  'Patel', 'Patil', 'Pillai', 'Prasad', 'Rai', 'Raja', 'Raju', 'Ramachandran', 'Rao', 'Reddy',
  'Roy', 'Sahani', 'Saxena', 'Sen', 'Sengupta', 'Seth', 'Shah', 'Sharma', 'Shukla', 'Singh',
  'Singhania', 'Sinha', 'Soni', 'Srinivasan', 'Sundaram', 'Tiwari', 'Tripathi', 'Varma', 'Verma', 'Yadav'
];

const HOMETOWNS = [
  { city: 'Hyderabad', state: 'Telangana', pincode: '500001' },
  { city: 'Bengaluru', state: 'Karnataka', pincode: '560001' },
  { city: 'Chennai', state: 'Tamil Nadu', pincode: '600001' },
  { city: 'Mumbai', state: 'Maharashtra', pincode: '400001' },
  { city: 'Pune', state: 'Maharashtra', pincode: '411001' },
  { city: 'New Delhi', state: 'Delhi NCR', pincode: '110001' },
  { city: 'Kolkata', state: 'West Bengal', pincode: '700001' },
  { city: 'Ahmedabad', state: 'Gujarat', pincode: '380001' },
  { city: 'Jaipur', state: 'Rajasthan', pincode: '302001' },
  { city: 'Lucknow', state: 'Uttar Pradesh', pincode: '226001' },
  { city: 'Visakhapatnam', state: 'Andhra Pradesh', pincode: '530001' },
  { city: 'Vijayawada', state: 'Andhra Pradesh', pincode: '520001' },
  { city: 'Kochi', state: 'Kerala', pincode: '682001' },
  { city: 'Bhopal', state: 'Madhya Pradesh', pincode: '462001' },
  { city: 'Indore', state: 'Madhya Pradesh', pincode: '452001' },
  { city: 'Patna', state: 'Bihar', pincode: '800001' },
  { city: 'Chandigarh', state: 'Punjab / Haryana', pincode: '160001' },
  { city: 'Guwahati', state: 'Assam', pincode: '781001' },
  { city: 'Bhubaneswar', state: 'Odisha', pincode: '751001' },
  { city: 'Coimbatore', state: 'Tamil Nadu', pincode: '641001' }
];

const BLOOD_GROUPS = ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'];

// Generate 1000 detailed resident profiles
for (let i = 1; i <= 1000; i++) {
  const isFemale = i % 2 === 0;
  const firstName = isFemale
    ? FIRST_NAMES_F[(i * 7 + 13) % FIRST_NAMES_F.length]
    : FIRST_NAMES_M[(i * 11 + 17) % FIRST_NAMES_M.length];
  const surname = SURNAMES[(i * 13 + 23) % SURNAMES.length];
  const fullName = `${firstName} ${surname}`;
  const studentId = `STU-2024-${String(i).padStart(4, '0')}`;
  const dept = DEPARTMENTS[i % DEPARTMENTS.length];
  const deptCode = dept.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();
  const rollNumber = `24${deptCode}${String(100 + (i % 900))}`;
  const year = (i % 4) + 1;

  // Assign block and room
  let assignedBlock = 'BLOCK-A';
  if (isFemale) {
    assignedBlock = (i % 4 === 0) ? 'BLOCK-D' : 'BLOCK-C';
  } else {
    assignedBlock = (i % 3 === 0) ? 'BLOCK-B' : ((i % 5 === 0) ? 'BLOCK-E' : 'BLOCK-A');
  }

  const floorNum = (i % 4) + 1;
  const roomIdx = (i % 25) + 1;
  const blockLetter = assignedBlock.replace('BLOCK-', '');
  const roomNumber = `${blockLetter}-${floorNum}${String(roomIdx).padStart(2, '0')}`;

  const hometown = HOMETOWNS[i % HOMETOWNS.length];
  const bloodGroup = BLOOD_GROUPS[i % BLOOD_GROUPS.length];

  const phoneNum = `+91 98${String(10000000 + (i * 8731) % 89999999).slice(0, 8)}`;
  const parentPhoneNum = `+91 97${String(20000000 + (i * 9437) % 79999999).slice(0, 8)}`;
  const parentName = `${isFemale ? 'Mr. ' : 'Mr. '}${surname} (${firstName}'s Guardian)`;

  const roomFeePaid = i % 6 !== 0;
  const messFeePaid = i % 5 !== 0;
  const isPresent = i % 12 !== 0;
  const attendanceRate = isPresent ? parseFloat((90 + (i % 10) * 0.95).toFixed(1)) : parseFloat((72 + (i % 15) * 0.8).toFixed(1));

  RESIDENTS_MASTER_DATABASE.push({
    studentId,
    rollNumber,
    name: fullName,
    gender: isFemale ? 'Female' : 'Male',
    department: dept,
    academicYear: year,
    semester: (year * 2) - (i % 2),
    assignedBlock,
    floorNumber: floorNum,
    roomNumber,
    email: `${firstName.toLowerCase()}.${surname.toLowerCase()}.${studentId.toLowerCase()}@smarthostel.edu`,
    studentPhone: phoneNum,
    parentName,
    parentPhone: parentPhoneNum,
    parentEmail: `parent.${surname.toLowerCase()}.${i}@example.com`,
    homeAddress: {
      street: `Flat ${101 + (i % 800)}, Wing ${String.fromCharCode(65 + (i % 6))}, Residency Enclave`,
      city: hometown.city,
      state: hometown.state,
      pincode: hometown.pincode,
      country: 'India'
    },
    medicalData: {
      bloodGroup,
      allergies: (i % 8 === 0) ? 'Lactose Intolerance' : ((i % 15 === 0) ? 'Peanut Allergy' : 'None Reported'),
      chronicConditions: (i % 25 === 0) ? 'Asthma (Inhaler Prescribed)' : 'None',
      emergencyContactRelation: 'Parent'
    },
    financialStatus: {
      roomFeeAmount: 45000,
      roomFeeStatus: roomFeePaid ? 'Paid' : 'Unpaid',
      roomFeePaidDate: roomFeePaid ? '2026-08-05' : null,
      messFeeAmount: 35000,
      messFeeStatus: messFeePaid ? 'Paid' : 'Unpaid',
      messFeePaidDate: messFeePaid ? '2026-08-07' : null,
      cautionDepositHeld: 10000,
      totalDuesOutstanding: (roomFeePaid ? 0 : 45000) + (messFeePaid ? 0 : 35000)
    },
    attendanceData: {
      currentStatus: isPresent ? 'Present' : 'Absent',
      overallRatePercent: attendanceRate,
      lastRollCallDate: '2026-09-03',
      unexcusedAbsencesCount: isPresent ? (i % 3) : (3 + (i % 5))
    },
    biometricRegistration: {
      isEnrolled: true,
      cardRfidTag: `RFID-HEX-${(i * 1234567).toString(16).toUpperCase()}`,
      enrollmentTimestamp: '2024-08-01T09:00:00.000Z'
    },
    activeOutingGatePass: (i % 20 === 0) ? {
      passId: `GP-${1000 + i}`,
      departureTime: '2026-09-04 14:00',
      expectedReturnTime: '2026-09-04 20:30',
      destination: `${hometown.city} Local Visit`,
      status: 'Approved'
    } : null,
    accountCreatedDate: '2024-08-01',
    isActiveResident: true
  });
}

/**
 * Retrieves resident by student ID.
 * @param {string} studentId
 * @returns {Object|null}
 */
function getResidentById(studentId) {
  if (!studentId) return null;
  const q = String(studentId).trim().toUpperCase();
  return RESIDENTS_MASTER_DATABASE.find(r => r.studentId.toUpperCase() === q) || null;
}

/**
 * Filters residents by block.
 * @param {string} blockCode
 * @returns {Array<Object>}
 */
function getResidentsByBlock(blockCode) {
  if (!blockCode) return RESIDENTS_MASTER_DATABASE;
  const q = String(blockCode).trim().toUpperCase();
  return RESIDENTS_MASTER_DATABASE.filter(r => r.assignedBlock.toUpperCase() === q);
}

/**
 * Searches residents by keyword across name, ID, roll, phone, room.
 * @param {string} query
 * @returns {Array<Object>}
 */
function searchResidentsMaster(query) {
  if (!query || typeof query !== 'string') return RESIDENTS_MASTER_DATABASE.slice(0, 50);
  const q = query.trim().toLowerCase();
  return RESIDENTS_MASTER_DATABASE.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.studentId.toLowerCase().includes(q) ||
    r.rollNumber.toLowerCase().includes(q) ||
    r.roomNumber.toLowerCase().includes(q) ||
    r.studentPhone.includes(q) ||
    r.parentPhone.includes(q)
  );
}

module.exports = {
  DEPARTMENTS,
  BLOCKS,
  RESIDENTS_MASTER_DATABASE,
  getResidentById,
  getResidentsByBlock,
  searchResidentsMaster
};
