'use strict';

/**
 * Static Resident Master Dataset - Batch 22
 * Provides static resident records and query utility functions for Block-K and Block-L residents.
 */

const staticResidentMaster22 = [
  {
    id: 'RES-2201',
    rollNumber: '23CS2201',
    fullName: 'Mohit Agarwal',
    gender: 'Male',
    dateOfBirth: '2004-01-19',
    email: 'mohit.agarwal.2201@university.edu',
    phoneNumber: '+91-9871102201',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.72,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-K',
      roomNumber: 'K-101',
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
      lastPaymentDate: '2025-07-21',
      transactionRef: 'TXN-K2201-19284'
    },
    guardianContact: {
      name: 'Pramod Agarwal',
      relationship: 'Father',
      phone: '+91-9810022010',
      email: 'pramod.ag@example.com',
      address: {
        street: '45 Surya Nagar',
        city: 'Agra',
        state: 'Uttar Pradesh',
        pincode: '282002'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 171,
      percentage: 95.0,
      biometricId: 'BIO-K-2201'
    },
    gatePasses: [
      {
        passId: 'GP-2201-01',
        type: 'Outing',
        departure: '2026-02-09T14:00:00Z',
        arrival: '2026-02-09T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2201', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2201', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2202',
    rollNumber: '23EC2202',
    fullName: 'Neha Subramaniam',
    gender: 'Female',
    dateOfBirth: '2004-10-28',
    email: 'neha.subramaniam.2202@university.edu',
    phoneNumber: '+91-9871102202',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 9.45,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-L',
      roomNumber: 'L-101',
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
      transactionRef: 'TXN-L2202-88291'
    },
    guardianContact: {
      name: 'V. Subramaniam',
      relationship: 'Father',
      phone: '+91-9810022020',
      email: 'v.subbu@example.com',
      address: {
        street: '12 Ramanathan St, T Nagar',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600017'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 178,
      percentage: 98.89,
      biometricId: 'BIO-L-2202'
    },
    gatePasses: [
      {
        passId: 'GP-2202-01',
        type: 'Home Visit',
        departure: '2026-01-15T08:00:00Z',
        arrival: '2026-01-19T21:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2202', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2202', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2203',
    rollNumber: '24IT2203',
    fullName: 'Nikhil Kashyap',
    gender: 'Male',
    dateOfBirth: '2005-03-14',
    email: 'nikhil.kashyap.2203@university.edu',
    phoneNumber: '+91-9871102203',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Information Technology',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.36,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-K',
      roomNumber: 'K-102',
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
      lastPaymentDate: '2025-07-30',
      transactionRef: 'TXN-K2203-55910'
    },
    guardianContact: {
      name: 'R. K. Kashyap',
      relationship: 'Father',
      phone: '+91-9810022030',
      email: 'rk.kashyap@example.com',
      address: {
        street: '78 Sector 14',
        city: 'Sonipat',
        state: 'Haryana',
        pincode: '131001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 169,
      percentage: 93.89,
      biometricId: 'BIO-K-2203'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2203', item: 'Mattress', issueDate: '2024-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2203', item: 'Room Key Set', issueDate: '2024-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2204',
    rollNumber: '24AI2204',
    fullName: 'Pallavi Sengupta',
    gender: 'Female',
    dateOfBirth: '2005-09-21',
    email: 'pallavi.sengupta.2204@university.edu',
    phoneNumber: '+91-9871102204',
    bloodGroup: 'AB+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.14,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-L',
      roomNumber: 'L-102',
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
      lastPaymentDate: '2025-08-10',
      transactionRef: 'TXN-L2204-77218'
    },
    guardianContact: {
      name: 'Shankar Sengupta',
      relationship: 'Father',
      phone: '+91-9810022040',
      email: 'shankar.s@example.com',
      address: {
        street: '55 Jodhpur Park',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700068'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-L-2204'
    },
    gatePasses: [
      {
        passId: 'GP-2204-01',
        type: 'Outing',
        departure: '2026-02-13T14:30:00Z',
        arrival: '2026-02-13T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2204', item: 'Mattress', issueDate: '2024-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2204', item: 'Room Key Set', issueDate: '2024-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2205',
    rollNumber: '23ME2205',
    fullName: 'Pranav Mahajan',
    gender: 'Male',
    dateOfBirth: '2004-07-11',
    email: 'pranav.mahajan.2205@university.edu',
    phoneNumber: '+91-9871102205',
    bloodGroup: 'O-',
    academicDetails: {
      department: 'Mechanical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 7.88,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-K',
      roomNumber: 'K-201',
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
      lastPaymentDate: '2025-07-22',
      transactionRef: 'TXN-K2205-99201'
    },
    guardianContact: {
      name: 'Vivek Mahajan',
      relationship: 'Father',
      phone: '+91-9810022050',
      email: 'vivek.m@example.com',
      address: {
        street: '22 Tilak Nagar',
        city: 'Indore',
        state: 'Madhya Pradesh',
        pincode: '452018'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 165,
      percentage: 91.67,
      biometricId: 'BIO-K-2205'
    },
    gatePasses: [
      {
        passId: 'GP-2205-01',
        type: 'Outing',
        departure: '2026-02-12T11:00:00Z',
        arrival: '2026-02-12T17:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2205', item: 'Mattress', issueDate: '2023-08-05', condition: 'Good' },
      { itemId: 'INV-KEY-2205', item: 'Room Key Set', issueDate: '2023-08-05', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2206',
    rollNumber: '25CS2206',
    fullName: 'Rupali Deshpande',
    gender: 'Female',
    dateOfBirth: '2006-02-18',
    email: 'rupali.desh.2206@university.edu',
    phoneNumber: '+91-9871102206',
    bloodGroup: 'A-',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.87,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-L',
      roomNumber: 'L-201',
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
      transactionRef: 'TXN-L2206-38291'
    },
    guardianContact: {
      name: 'Sanjay Deshpande',
      relationship: 'Father',
      phone: '+91-9810022060',
      email: 'sanjay.d@example.com',
      address: {
        street: '14 Erandwane',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411004'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 176,
      percentage: 97.78,
      biometricId: 'BIO-L-2206'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2206', item: 'Mattress', issueDate: '2025-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2206', item: 'Room Key Set', issueDate: '2025-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2207',
    rollNumber: '24CE2207',
    fullName: 'Sahil Bhatia',
    gender: 'Male',
    dateOfBirth: '2005-05-24',
    email: 'sahil.bhatia.2207@university.edu',
    phoneNumber: '+91-9871102207',
    bloodGroup: 'B-',
    academicDetails: {
      department: 'Civil Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.28,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-K',
      roomNumber: 'K-202',
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
      lastPaymentDate: '2025-07-28',
      transactionRef: 'TXN-K2207-64519'
    },
    guardianContact: {
      name: 'Deepak Bhatia',
      relationship: 'Father',
      phone: '+91-9810022070',
      email: 'deepak.b@example.com',
      address: {
        street: '82 Lajpat Nagar III',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110024'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 168,
      percentage: 93.33,
      biometricId: 'BIO-K-2207'
    },
    gatePasses: [
      {
        passId: 'GP-2207-01',
        type: 'Outing',
        departure: '2026-02-15T13:00:00Z',
        arrival: '2026-02-15T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2207', item: 'Mattress', issueDate: '2024-08-04', condition: 'Good' },
      { itemId: 'INV-KEY-2207', item: 'Room Key Set', issueDate: '2024-08-04', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2208',
    rollNumber: '23CH2208',
    fullName: 'Shreya Chatterjee',
    gender: 'Female',
    dateOfBirth: '2004-12-14',
    email: 'shreya.chatterjee.2208@university.edu',
    phoneNumber: '+91-9871102208',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Chemical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.95,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-L',
      roomNumber: 'L-202',
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
      lastPaymentDate: '2025-07-18',
      transactionRef: 'TXN-L2208-11928'
    },
    guardianContact: {
      name: 'Tanmoy Chatterjee',
      relationship: 'Father',
      phone: '+91-9810022080',
      email: 'tanmoy.c@example.com',
      address: {
        street: '34 Ballygunge Circular Rd',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700019'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 175,
      percentage: 97.22,
      biometricId: 'BIO-L-2208'
    },
    gatePasses: [
      {
        passId: 'GP-2208-01',
        type: 'Home Visit',
        departure: '2026-01-22T08:30:00Z',
        arrival: '2026-01-26T19:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2208', item: 'Mattress', issueDate: '2023-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2208', item: 'Room Key Set', issueDate: '2023-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2209',
    rollNumber: '25EC2209',
    fullName: 'Tarun Varma',
    gender: 'Male',
    dateOfBirth: '2006-03-31',
    email: 'tarun.varma.2209@university.edu',
    phoneNumber: '+91-9871102209',
    bloodGroup: 'AB-',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.56,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-K',
      roomNumber: 'K-301',
      bedNumber: 'Bed-A',
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
      transactionRef: 'TXN-K2209-77291'
    },
    guardianContact: {
      name: 'Ravi Varma',
      relationship: 'Father',
      phone: '+91-9810022090',
      email: 'ravi.v@example.com',
      address: {
        street: '15 MVP Colony',
        city: 'Visakhapatnam',
        state: 'Andhra Pradesh',
        pincode: '530017'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-K-2209'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2209', item: 'Mattress', issueDate: '2025-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2209', item: 'Room Key Set', issueDate: '2025-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2210',
    rollNumber: '24EE2210',
    fullName: 'Trisha Mohan',
    gender: 'Female',
    dateOfBirth: '2005-10-18',
    email: 'trisha.mohan.2210@university.edu',
    phoneNumber: '+91-9871102210',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Electrical Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.28,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-L',
      roomNumber: 'L-301',
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
      lastPaymentDate: '2025-07-26',
      transactionRef: 'TXN-L2210-99418'
    },
    guardianContact: {
      name: 'C. Mohan',
      relationship: 'Father',
      phone: '+91-9810022100',
      email: 'c.mohan@example.com',
      address: {
        street: '88 MG Road',
        city: 'Ernakulam',
        state: 'Kerala',
        pincode: '682011'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 177,
      percentage: 98.33,
      biometricId: 'BIO-L-2210'
    },
    gatePasses: [
      {
        passId: 'GP-2210-01',
        type: 'Outing',
        departure: '2026-02-17T14:00:00Z',
        arrival: '2026-02-17T18:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2210', item: 'Mattress', issueDate: '2024-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2210', item: 'Room Key Set', issueDate: '2024-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2211',
    rollNumber: '23CS2211',
    fullName: 'Varun Joshi',
    gender: 'Male',
    dateOfBirth: '2004-09-07',
    email: 'varun.joshi.2211@university.edu',
    phoneNumber: '+91-9871102211',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.63,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-K',
      roomNumber: 'K-302',
      bedNumber: 'Bed-A',
      floor: 3,
      roomType: 'Double Non-AC',
      checkInDate: '2023-08-03',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 80000,
      paidAmount: 80000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-20',
      transactionRef: 'TXN-K2211-55829'
    },
    guardianContact: {
      name: 'Kishore Joshi',
      relationship: 'Father',
      phone: '+91-9810022110',
      email: 'kishore.j@example.com',
      address: {
        street: '45 Navrangpura',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380009'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 171,
      percentage: 95.0,
      biometricId: 'BIO-K-2211'
    },
    gatePasses: [
      {
        passId: 'GP-2211-01',
        type: 'Outing',
        departure: '2026-02-11T13:30:00Z',
        arrival: '2026-02-11T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2211', item: 'Mattress', issueDate: '2023-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2211', item: 'Room Key Set', issueDate: '2023-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2212',
    rollNumber: '25AI2212',
    fullName: 'Yashaswini Rao',
    gender: 'Female',
    dateOfBirth: '2006-04-22',
    email: 'yashaswini.rao.2212@university.edu',
    phoneNumber: '+91-9871102212',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 9.17,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-L',
      roomNumber: 'L-302',
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
      transactionRef: 'TXN-L2212-99301'
    },
    guardianContact: {
      name: 'Nageshwar Rao',
      relationship: 'Father',
      phone: '+91-9810022120',
      email: 'n.rao@example.com',
      address: {
        street: '22 Somajiguda Raj Bhavan Rd',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500082'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 176,
      percentage: 97.78,
      biometricId: 'BIO-L-2212'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2212', item: 'Mattress', issueDate: '2025-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2212', item: 'Room Key Set', issueDate: '2025-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  }
];

function getAll() {
  return staticResidentMaster22;
}

function findById(id) {
  return staticResidentMaster22.find(resident => resident.id === id);
}

function filterByBlock(block) {
  return staticResidentMaster22.filter(resident => resident.roomAllocation.block.toLowerCase() === block.toLowerCase());
}

function getStats() {
  const total = staticResidentMaster22.length;
  const paidCount = staticResidentMaster22.filter(r => r.feePayment.paymentStatus === 'Paid').length;
  const partialCount = staticResidentMaster22.filter(r => r.feePayment.paymentStatus === 'Partial').length;
  const avgAttendance = staticResidentMaster22.reduce((acc, curr) => acc + curr.attendance.percentage, 0) / total;
  return {
    totalResidents: total,
    fullyPaidCount: paidCount,
    partialPaidCount: partialCount,
    averageAttendance: parseFloat(avgAttendance.toFixed(2))
  };
}

module.exports = {
  staticResidentMaster22,
  getAll,
  findById,
  filterByBlock,
  getStats
};
