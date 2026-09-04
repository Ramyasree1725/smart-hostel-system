'use strict';

/**
 * Static Resident Master Dataset - Batch 20
 * Provides static resident records and query utility functions for Block-G and Block-H residents.
 */

const staticResidentMaster20 = [
  {
    id: 'RES-2001',
    rollNumber: '23CS2001',
    fullName: 'Manish Tiwari',
    gender: 'Male',
    dateOfBirth: '2004-02-14',
    email: 'manish.tiwari.2001@university.edu',
    phoneNumber: '+91-9871102001',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.64,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-G',
      roomNumber: 'G-101',
      bedNumber: 'Bed-A',
      floor: 1,
      roomType: 'Double AC',
      checkInDate: '2023-08-01',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 95000,
      paidAmount: 95000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-25',
      transactionRef: 'TXN-G2001-90182'
    },
    guardianContact: {
      name: 'Ramesh Tiwari',
      relationship: 'Father',
      phone: '+91-9810020010',
      email: 'ramesh.tiwari@example.com',
      address: {
        street: '18 Gomti Nagar',
        city: 'Lucknow',
        state: 'Uttar Pradesh',
        pincode: '226010'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 172,
      percentage: 95.56,
      biometricId: 'BIO-G-2001'
    },
    gatePasses: [
      {
        passId: 'GP-2001-01',
        type: 'Outing',
        departure: '2026-02-10T14:00:00Z',
        arrival: '2026-02-10T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2001', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-TBL-2001', item: 'Study Table & Chair', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2001', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2002',
    rollNumber: '23EC2002',
    fullName: 'Nandini Swaminathan',
    gender: 'Female',
    dateOfBirth: '2004-09-03',
    email: 'nandini.swami.2002@university.edu',
    phoneNumber: '+91-9871102002',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 9.32,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-H',
      roomNumber: 'H-101',
      bedNumber: 'Bed-A',
      floor: 1,
      roomType: 'Single AC',
      checkInDate: '2023-08-01',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 120000,
      paidAmount: 120000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-15',
      transactionRef: 'TXN-H2002-38491'
    },
    guardianContact: {
      name: 'K. Swaminathan',
      relationship: 'Father',
      phone: '+91-9810020020',
      email: 'k.swami@example.com',
      address: {
        street: '42 Besant Nagar 4th Avenue',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600090'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 177,
      percentage: 98.33,
      biometricId: 'BIO-H-2002'
    },
    gatePasses: [
      {
        passId: 'GP-2002-01',
        type: 'Home Visit',
        departure: '2026-01-18T08:30:00Z',
        arrival: '2026-01-22T20:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2002', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-TBL-2002', item: 'Study Table & Chair', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2002', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2003',
    rollNumber: '24IT2003',
    fullName: 'Omkar Patwardhan',
    gender: 'Male',
    dateOfBirth: '2005-04-18',
    email: 'omkar.patwardhan.2003@university.edu',
    phoneNumber: '+91-9871102003',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Information Technology',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.19,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-G',
      roomNumber: 'G-102',
      bedNumber: 'Bed-B',
      floor: 1,
      roomType: 'Double Non-AC',
      checkInDate: '2024-08-03',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 80000,
      paidAmount: 80000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-29',
      transactionRef: 'TXN-G2003-82910'
    },
    guardianContact: {
      name: 'Anil Patwardhan',
      relationship: 'Father',
      phone: '+91-9810020030',
      email: 'anil.patwardhan@example.com',
      address: {
        street: '88 Kothrud Stand',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411038'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 168,
      percentage: 93.33,
      biometricId: 'BIO-G-2003'
    },
    gatePasses: [
      {
        passId: 'GP-2003-01',
        type: 'Outing',
        departure: '2026-02-14T15:00:00Z',
        arrival: '2026-02-14T19:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2003', item: 'Mattress', issueDate: '2024-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2003', item: 'Room Key Set', issueDate: '2024-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2004',
    rollNumber: '24AI2004',
    fullName: 'Pooja Bhattacharya',
    gender: 'Female',
    dateOfBirth: '2005-11-22',
    email: 'pooja.bhatt.2004@university.edu',
    phoneNumber: '+91-9871102004',
    bloodGroup: 'AB+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.08,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-H',
      roomNumber: 'H-102',
      bedNumber: 'Bed-A',
      floor: 1,
      roomType: 'Double AC',
      checkInDate: '2024-08-02',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 95000,
      paidAmount: 50000,
      dueAmount: 45000,
      paymentStatus: 'Partial',
      lastPaymentDate: '2025-08-11',
      transactionRef: 'TXN-H2004-19203'
    },
    guardianContact: {
      name: 'Subhashish Bhattacharya',
      relationship: 'Father',
      phone: '+91-9810020040',
      email: 's.bhatt@example.com',
      address: {
        street: '34 Lake Gardens',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700045'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 171,
      percentage: 95.0,
      biometricId: 'BIO-H-2004'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2004', item: 'Mattress', issueDate: '2024-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2004', item: 'Room Key Set', issueDate: '2024-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2005',
    rollNumber: '23ME2005',
    fullName: 'Qasim Ali',
    gender: 'Male',
    dateOfBirth: '2004-06-15',
    email: 'qasim.ali.2005@university.edu',
    phoneNumber: '+91-9871102005',
    bloodGroup: 'O-',
    academicDetails: {
      department: 'Mechanical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 7.74,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-G',
      roomNumber: 'G-201',
      bedNumber: 'Bed-A',
      floor: 2,
      roomType: 'Triple Non-AC',
      checkInDate: '2023-08-05',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 70000,
      paidAmount: 70000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-21',
      transactionRef: 'TXN-G2005-72819'
    },
    guardianContact: {
      name: 'Akbar Ali',
      relationship: 'Father',
      phone: '+91-9810020050',
      email: 'akbar.ali@example.com',
      address: {
        street: '12 Charminar West',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500002'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 164,
      percentage: 91.11,
      biometricId: 'BIO-G-2005'
    },
    gatePasses: [
      {
        passId: 'GP-2005-01',
        type: 'Outing',
        departure: '2026-02-11T13:30:00Z',
        arrival: '2026-02-11T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2005', item: 'Mattress', issueDate: '2023-08-05', condition: 'Good' },
      { itemId: 'INV-KEY-2005', item: 'Room Key Set', issueDate: '2023-08-05', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2006',
    rollNumber: '25CS2006',
    fullName: 'Rhea Kapoor',
    gender: 'Female',
    dateOfBirth: '2006-08-19',
    email: 'rhea.kapoor.2006@university.edu',
    phoneNumber: '+91-9871102006',
    bloodGroup: 'B-',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.91,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-H',
      roomNumber: 'H-201',
      bedNumber: 'Bed-A',
      floor: 2,
      roomType: 'Double AC',
      checkInDate: '2025-08-01',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 95000,
      paidAmount: 95000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-08-01',
      transactionRef: 'TXN-H2006-55910'
    },
    guardianContact: {
      name: 'Vikram Kapoor',
      relationship: 'Father',
      phone: '+91-9810020060',
      email: 'vikram.kapoor@example.com',
      address: {
        street: '9 Sector 15',
        city: 'Chandigarh',
        state: 'Punjab',
        pincode: '160015'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 176,
      percentage: 97.78,
      biometricId: 'BIO-H-2006'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2006', item: 'Mattress', issueDate: '2025-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2006', item: 'Room Key Set', issueDate: '2025-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2007',
    rollNumber: '24CE2007',
    fullName: 'Siddharth Nair',
    gender: 'Male',
    dateOfBirth: '2005-03-09',
    email: 'siddharth.nair.2007@university.edu',
    phoneNumber: '+91-9871102007',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Civil Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.35,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-G',
      roomNumber: 'G-202',
      bedNumber: 'Bed-B',
      floor: 2,
      roomType: 'Double Non-AC',
      checkInDate: '2024-08-04',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 80000,
      paidAmount: 80000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-27',
      transactionRef: 'TXN-G2007-44910'
    },
    guardianContact: {
      name: 'Madhusudhan Nair',
      relationship: 'Father',
      phone: '+91-9810020070',
      email: 'm.nair@example.com',
      address: {
        street: '21 Panampilly Nagar',
        city: 'Kochi',
        state: 'Kerala',
        pincode: '682036'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 169,
      percentage: 93.89,
      biometricId: 'BIO-G-2007'
    },
    gatePasses: [
      {
        passId: 'GP-2007-01',
        type: 'Outing',
        departure: '2026-02-16T12:00:00Z',
        arrival: '2026-02-16T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2007', item: 'Mattress', issueDate: '2024-08-04', condition: 'Good' },
      { itemId: 'INV-KEY-2007', item: 'Room Key Set', issueDate: '2024-08-04', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2008',
    rollNumber: '23CH2008',
    fullName: 'Tanvi Saxena',
    gender: 'Female',
    dateOfBirth: '2004-10-11',
    email: 'tanvi.saxena.2008@university.edu',
    phoneNumber: '+91-9871102008',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Chemical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.78,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-H',
      roomNumber: 'H-202',
      bedNumber: 'Bed-B',
      floor: 2,
      roomType: 'Double AC',
      checkInDate: '2023-08-02',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 95000,
      paidAmount: 95000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-16',
      transactionRef: 'TXN-H2008-88301'
    },
    guardianContact: {
      name: 'Alok Saxena',
      relationship: 'Father',
      phone: '+91-9810020080',
      email: 'alok.saxena@example.com',
      address: {
        street: '15 Civil Lines',
        city: 'Bhopal',
        state: 'Madhya Pradesh',
        pincode: '462001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-H-2008'
    },
    gatePasses: [
      {
        passId: 'GP-2008-01',
        type: 'Home Visit',
        departure: '2026-01-24T09:00:00Z',
        arrival: '2026-01-27T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2008', item: 'Mattress', issueDate: '2023-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2008', item: 'Room Key Set', issueDate: '2023-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2009',
    rollNumber: '25EC2009',
    fullName: 'Utkarsh Trivedi',
    gender: 'Male',
    dateOfBirth: '2006-01-29',
    email: 'utkarsh.trivedi.2009@university.edu',
    phoneNumber: '+91-9871102009',
    bloodGroup: 'AB-',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.52,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-G',
      roomNumber: 'G-301',
      bedNumber: 'Bed-A',
      floor: 3,
      roomType: 'Double AC',
      checkInDate: '2025-08-03',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 95000,
      paidAmount: 95000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-08-03',
      transactionRef: 'TXN-G2009-10293'
    },
    guardianContact: {
      name: 'Pravin Trivedi',
      relationship: 'Father',
      phone: '+91-9810020090',
      email: 'pravin.t@example.com',
      address: {
        street: '44 Satellite Road',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380015'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 174,
      percentage: 96.67,
      biometricId: 'BIO-G-2009'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2009', item: 'Mattress', issueDate: '2025-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2009', item: 'Room Key Set', issueDate: '2025-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2010',
    rollNumber: '24EE2010',
    fullName: 'Vandana Raghavan',
    gender: 'Female',
    dateOfBirth: '2005-07-16',
    email: 'vandana.raghavan.2010@university.edu',
    phoneNumber: '+91-9871102010',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Electrical Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.21,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-H',
      roomNumber: 'H-301',
      bedNumber: 'Bed-A',
      floor: 3,
      roomType: 'Single Non-AC',
      checkInDate: '2024-08-01',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 85000,
      paidAmount: 85000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-24',
      transactionRef: 'TXN-H2010-99482'
    },
    guardianContact: {
      name: 'S. Raghavan',
      relationship: 'Father',
      phone: '+91-9810020100',
      email: 's.raghavan@example.com',
      address: {
        street: '19 Jayanagar 4th Block',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560011'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 178,
      percentage: 98.89,
      biometricId: 'BIO-H-2010'
    },
    gatePasses: [
      {
        passId: 'GP-2010-01',
        type: 'Outing',
        departure: '2026-02-17T14:00:00Z',
        arrival: '2026-02-17T18:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2010', item: 'Mattress', issueDate: '2024-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2010', item: 'Room Key Set', issueDate: '2024-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2011',
    rollNumber: '23CS2011',
    fullName: 'Wasim Akram Khan',
    gender: 'Male',
    dateOfBirth: '2004-12-04',
    email: 'wasim.khan.2011@university.edu',
    phoneNumber: '+91-9871102011',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.41,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-G',
      roomNumber: 'G-302',
      bedNumber: 'Bed-A',
      floor: 3,
      roomType: 'Double Non-AC',
      checkInDate: '2023-08-02',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 80000,
      paidAmount: 80000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-19',
      transactionRef: 'TXN-G2011-66712'
    },
    guardianContact: {
      name: 'Imran Khan',
      relationship: 'Father',
      phone: '+91-9810020110',
      email: 'imran.khan@example.com',
      address: {
        street: '77 Aligarh Muslim University Rd',
        city: 'Aligarh',
        state: 'Uttar Pradesh',
        pincode: '202002'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 167,
      percentage: 92.78,
      biometricId: 'BIO-G-2011'
    },
    gatePasses: [
      {
        passId: 'GP-2011-01',
        type: 'Outing',
        departure: '2026-02-13T10:00:00Z',
        arrival: '2026-02-13T17:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2011', item: 'Mattress', issueDate: '2023-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2011', item: 'Room Key Set', issueDate: '2023-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2012',
    rollNumber: '25AI2012',
    fullName: 'Yamini Sundaresan',
    gender: 'Female',
    dateOfBirth: '2006-05-18',
    email: 'yamini.sundar.2012@university.edu',
    phoneNumber: '+91-9871102012',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 9.12,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-H',
      roomNumber: 'H-302',
      bedNumber: 'Bed-B',
      floor: 3,
      roomType: 'Double AC',
      checkInDate: '2025-08-02',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 95000,
      paidAmount: 95000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-08-02',
      transactionRef: 'TXN-H2012-33419'
    },
    guardianContact: {
      name: 'R. Sundaresan',
      relationship: 'Father',
      phone: '+91-9810020120',
      email: 'r.sundaresan@example.com',
      address: {
        street: '5 Gandhinagar 2nd Cross',
        city: 'Vellore',
        state: 'Tamil Nadu',
        pincode: '632006'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 175,
      percentage: 97.22,
      biometricId: 'BIO-H-2012'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2012', item: 'Mattress', issueDate: '2025-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2012', item: 'Room Key Set', issueDate: '2025-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  }
];

function getAll() {
  return staticResidentMaster20;
}

function findById(id) {
  return staticResidentMaster20.find(resident => resident.id === id);
}

function filterByBlock(block) {
  return staticResidentMaster20.filter(resident => resident.roomAllocation.block.toLowerCase() === block.toLowerCase());
}

function getStats() {
  const total = staticResidentMaster20.length;
  const paidCount = staticResidentMaster20.filter(r => r.feePayment.paymentStatus === 'Paid').length;
  const partialCount = staticResidentMaster20.filter(r => r.feePayment.paymentStatus === 'Partial').length;
  const avgAttendance = staticResidentMaster20.reduce((acc, curr) => acc + curr.attendance.percentage, 0) / total;
  return {
    totalResidents: total,
    fullyPaidCount: paidCount,
    partialPaidCount: partialCount,
    averageAttendance: parseFloat(avgAttendance.toFixed(2))
  };
}

module.exports = {
  staticResidentMaster20,
  getAll,
  findById,
  filterByBlock,
  getStats
};
