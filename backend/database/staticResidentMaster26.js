'use strict';

/**
 * Static Resident Master Dataset - Batch 26
 * Provides static resident records and query utility functions for Block-S and Block-T residents.
 */

const staticResidentMaster26 = [
  {
    id: 'RES-2601',
    rollNumber: '23CS2601',
    fullName: 'Inderjeet Sodhi',
    gender: 'Male',
    dateOfBirth: '2004-01-25',
    email: 'inderjeet.sodhi.2601@university.edu',
    phoneNumber: '+91-9871102601',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.78,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-S',
      roomNumber: 'S-101',
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
      transactionRef: 'TXN-S2601-19284'
    },
    guardianContact: {
      name: 'Harpreet Sodhi',
      relationship: 'Father',
      phone: '+91-9810026010',
      email: 'harpreet.s@example.com',
      address: {
        street: '45 Mall Road',
        city: 'Amritsar',
        state: 'Punjab',
        pincode: '143001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 172,
      percentage: 95.56,
      biometricId: 'BIO-S-2601'
    },
    gatePasses: [
      {
        passId: 'GP-2601-01',
        type: 'Outing',
        departure: '2026-02-13T14:00:00Z',
        arrival: '2026-02-13T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2601', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2601', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2602',
    rollNumber: '23EC2602',
    fullName: 'Ishaani Mazumdar',
    gender: 'Female',
    dateOfBirth: '2004-09-14',
    email: 'ishaani.mazumdar.2602@university.edu',
    phoneNumber: '+91-9871102602',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 9.42,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-T',
      roomNumber: 'T-101',
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
      transactionRef: 'TXN-T2602-88291'
    },
    guardianContact: {
      name: 'Amit Mazumdar',
      relationship: 'Father',
      phone: '+91-9810026020',
      email: 'amit.m@example.com',
      address: {
        street: '12 Lake View Road',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700029'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 178,
      percentage: 98.89,
      biometricId: 'BIO-T-2602'
    },
    gatePasses: [
      {
        passId: 'GP-2602-01',
        type: 'Home Visit',
        departure: '2026-01-17T08:00:00Z',
        arrival: '2026-01-21T21:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2602', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2602', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2603',
    rollNumber: '24IT2603',
    fullName: 'Jeevan Anand',
    gender: 'Male',
    dateOfBirth: '2005-03-22',
    email: 'jeevan.anand.2603@university.edu',
    phoneNumber: '+91-9871102603',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Information Technology',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.39,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-S',
      roomNumber: 'S-102',
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
      transactionRef: 'TXN-S2603-55910'
    },
    guardianContact: {
      name: 'M. Anand',
      relationship: 'Father',
      phone: '+91-9810026030',
      email: 'm.anand@example.com',
      address: {
        street: '78 Palace Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560052'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 169,
      percentage: 93.89,
      biometricId: 'BIO-S-2603'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2603', item: 'Mattress', issueDate: '2024-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2603', item: 'Room Key Set', issueDate: '2024-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2604',
    rollNumber: '24AI2604',
    fullName: 'Jayanti Krishnan',
    gender: 'Female',
    dateOfBirth: '2005-09-08',
    email: 'jayanti.krishnan.2604@university.edu',
    phoneNumber: '+91-9871102604',
    bloodGroup: 'AB+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.17,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-T',
      roomNumber: 'T-102',
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
      transactionRef: 'TXN-T2604-77218'
    },
    guardianContact: {
      name: 'V. Krishnan',
      relationship: 'Father',
      phone: '+91-9810026040',
      email: 'v.krishnan@example.com',
      address: {
        street: '55 Nungambakkam High Rd',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600034'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-T-2604'
    },
    gatePasses: [
      {
        passId: 'GP-2604-01',
        type: 'Outing',
        departure: '2026-02-13T14:30:00Z',
        arrival: '2026-02-13T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2604', item: 'Mattress', issueDate: '2024-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2604', item: 'Room Key Set', issueDate: '2024-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2605',
    rollNumber: '23ME2605',
    fullName: 'Kamal Nayan',
    gender: 'Male',
    dateOfBirth: '2004-05-30',
    email: 'kamal.nayan.2605@university.edu',
    phoneNumber: '+91-9871102605',
    bloodGroup: 'O-',
    academicDetails: {
      department: 'Mechanical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 7.89,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-S',
      roomNumber: 'S-201',
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
      transactionRef: 'TXN-S2605-99201'
    },
    guardianContact: {
      name: 'Santosh Nayan',
      relationship: 'Father',
      phone: '+91-9810026050',
      email: 'santosh.n@example.com',
      address: {
        street: '22 Bailey Road',
        city: 'Patna',
        state: 'Bihar',
        pincode: '800001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 165,
      percentage: 91.67,
      biometricId: 'BIO-S-2605'
    },
    gatePasses: [
      {
        passId: 'GP-2605-01',
        type: 'Outing',
        departure: '2026-02-12T11:00:00Z',
        arrival: '2026-02-12T17:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2605', item: 'Mattress', issueDate: '2023-08-05', condition: 'Good' },
      { itemId: 'INV-KEY-2605', item: 'Room Key Set', issueDate: '2023-08-05', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2606',
    rollNumber: '25CS2606',
    fullName: 'Kajal Khemka',
    gender: 'Female',
    dateOfBirth: '2006-03-12',
    email: 'kajal.khemka.2606@university.edu',
    phoneNumber: '+91-9871102606',
    bloodGroup: 'A-',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.89,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-T',
      roomNumber: 'T-201',
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
      transactionRef: 'TXN-T2606-38291'
    },
    guardianContact: {
      name: 'Sunil Khemka',
      relationship: 'Father',
      phone: '+91-9810026060',
      email: 'sunil.khemka@example.com',
      address: {
        street: '14 Bada Bazar',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700007'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 176,
      percentage: 97.78,
      biometricId: 'BIO-T-2606'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2606', item: 'Mattress', issueDate: '2025-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2606', item: 'Room Key Set', issueDate: '2025-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2607',
    rollNumber: '24CE2607',
    fullName: 'Lalit Tyagi',
    gender: 'Male',
    dateOfBirth: '2005-07-21',
    email: 'lalit.tyagi.2607@university.edu',
    phoneNumber: '+91-9871102607',
    bloodGroup: 'B-',
    academicDetails: {
      department: 'Civil Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.31,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-S',
      roomNumber: 'S-202',
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
      transactionRef: 'TXN-S2607-64519'
    },
    guardianContact: {
      name: 'Bijendra Tyagi',
      relationship: 'Father',
      phone: '+91-9810026070',
      email: 'b.tyagi@example.com',
      address: {
        street: '82 Raj Nagar',
        city: 'Ghaziabad',
        state: 'Uttar Pradesh',
        pincode: '201002'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 168,
      percentage: 93.33,
      biometricId: 'BIO-S-2607'
    },
    gatePasses: [
      {
        passId: 'GP-2607-01',
        type: 'Outing',
        departure: '2026-02-15T13:00:00Z',
        arrival: '2026-02-15T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2607', item: 'Mattress', issueDate: '2024-08-04', condition: 'Good' },
      { itemId: 'INV-KEY-2607', item: 'Room Key Set', issueDate: '2024-08-04', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2608',
    rollNumber: '23CH2608',
    fullName: 'Leela Venkatesh',
    gender: 'Female',
    dateOfBirth: '2004-10-18',
    email: 'leela.venkat.2608@university.edu',
    phoneNumber: '+91-9871102608',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Chemical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.96,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-T',
      roomNumber: 'T-202',
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
      transactionRef: 'TXN-T2608-11928'
    },
    guardianContact: {
      name: 'R. Venkatesh',
      relationship: 'Father',
      phone: '+91-9810026080',
      email: 'r.venkatesh@example.com',
      address: {
        street: '34 Gandhinagar',
        city: 'Kurnool',
        state: 'Andhra Pradesh',
        pincode: '518001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 175,
      percentage: 97.22,
      biometricId: 'BIO-T-2608'
    },
    gatePasses: [
      {
        passId: 'GP-2608-01',
        type: 'Home Visit',
        departure: '2026-01-22T08:30:00Z',
        arrival: '2026-01-26T19:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2608', item: 'Mattress', issueDate: '2023-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2608', item: 'Room Key Set', issueDate: '2023-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2609',
    rollNumber: '25EC2609',
    fullName: 'Manav Kaushik',
    gender: 'Male',
    dateOfBirth: '2006-02-14',
    email: 'manav.kaushik.2609@university.edu',
    phoneNumber: '+91-9871102609',
    bloodGroup: 'AB-',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.58,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-S',
      roomNumber: 'S-301',
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
      transactionRef: 'TXN-S2609-77291'
    },
    guardianContact: {
      name: 'Sunil Kaushik',
      relationship: 'Father',
      phone: '+91-9810026090',
      email: 'sunil.kaushik@example.com',
      address: {
        street: '15 Sector 9',
        city: 'Faridabad',
        state: 'Haryana',
        pincode: '121006'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-S-2609'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2609', item: 'Mattress', issueDate: '2025-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2609', item: 'Room Key Set', issueDate: '2025-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2610',
    rollNumber: '24EE2610',
    fullName: 'Meera Nambisan',
    gender: 'Female',
    dateOfBirth: '2005-08-11',
    email: 'meera.nambisan.2610@university.edu',
    phoneNumber: '+91-9871102610',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Electrical Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.30,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-T',
      roomNumber: 'T-301',
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
      transactionRef: 'TXN-T2610-99418'
    },
    guardianContact: {
      name: 'V. Nambisan',
      relationship: 'Father',
      phone: '+91-9810026100',
      email: 'v.nambisan@example.com',
      address: {
        street: '88 Palakkad Fort Rd',
        city: 'Palakkad',
        state: 'Kerala',
        pincode: '678001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 177,
      percentage: 98.33,
      biometricId: 'BIO-T-2610'
    },
    gatePasses: [
      {
        passId: 'GP-2610-01',
        type: 'Outing',
        departure: '2026-02-17T14:00:00Z',
        arrival: '2026-02-17T18:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2610', item: 'Mattress', issueDate: '2024-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2610', item: 'Room Key Set', issueDate: '2024-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2611',
    rollNumber: '23CS2611',
    fullName: 'Nakul Bhasin',
    gender: 'Male',
    dateOfBirth: '2004-10-02',
    email: 'nakul.bhasin.2611@university.edu',
    phoneNumber: '+91-9871102611',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.65,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-S',
      roomNumber: 'S-302',
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
      transactionRef: 'TXN-S2611-55829'
    },
    guardianContact: {
      name: 'Sanjeev Bhasin',
      relationship: 'Father',
      phone: '+91-9810026110',
      email: 'sanjeev.b@example.com',
      address: {
        street: '45 Defense Colony',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110024'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 171,
      percentage: 95.0,
      biometricId: 'BIO-S-2611'
    },
    gatePasses: [
      {
        passId: 'GP-2611-01',
        type: 'Outing',
        departure: '2026-02-11T13:30:00Z',
        arrival: '2026-02-11T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2611', item: 'Mattress', issueDate: '2023-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2611', item: 'Room Key Set', issueDate: '2023-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2612',
    rollNumber: '25AI2612',
    fullName: 'Nalini Radhakrishnan',
    gender: 'Female',
    dateOfBirth: '2006-04-18',
    email: 'nalini.radha.2612@university.edu',
    phoneNumber: '+91-9871102612',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 9.19,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-T',
      roomNumber: 'T-302',
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
      transactionRef: 'TXN-T2612-99301'
    },
    guardianContact: {
      name: 'T. Radhakrishnan',
      relationship: 'Father',
      phone: '+91-9810026120',
      email: 't.radha@example.com',
      address: {
        street: '22 Ramanuja St',
        city: 'Kanchipuram',
        state: 'Tamil Nadu',
        pincode: '631502'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 176,
      percentage: 97.78,
      biometricId: 'BIO-T-2612'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2612', item: 'Mattress', issueDate: '2025-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2612', item: 'Room Key Set', issueDate: '2025-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  }
];

function getAll() {
  return staticResidentMaster26;
}

function findById(id) {
  return staticResidentMaster26.find(resident => resident.id === id);
}

function filterByBlock(block) {
  return staticResidentMaster26.filter(resident => resident.roomAllocation.block.toLowerCase() === block.toLowerCase());
}

function getStats() {
  const total = staticResidentMaster26.length;
  const paidCount = staticResidentMaster26.filter(r => r.feePayment.paymentStatus === 'Paid').length;
  const partialCount = staticResidentMaster26.filter(r => r.feePayment.paymentStatus === 'Partial').length;
  const avgAttendance = staticResidentMaster26.reduce((acc, curr) => acc + curr.attendance.percentage, 0) / total;
  return {
    totalResidents: total,
    fullyPaidCount: paidCount,
    partialPaidCount: partialCount,
    averageAttendance: parseFloat(avgAttendance.toFixed(2))
  };
}

module.exports = {
  staticResidentMaster26,
  getAll,
  findById,
  filterByBlock,
  getStats
};
