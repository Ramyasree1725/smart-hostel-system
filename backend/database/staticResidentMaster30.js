'use strict';

/**
 * Static Resident Master Dataset - Batch 30
 * Provides static resident records and query utility functions for Block-AA and Block-BB residents.
 */

const staticResidentMaster30 = [
  {
    id: 'RES-3001',
    rollNumber: '23CS3001',
    fullName: 'Kabeer Ahluwalia',
    gender: 'Male',
    dateOfBirth: '2004-04-16',
    email: 'kabeer.ahluwalia.3001@university.edu',
    phoneNumber: '+91-9871103001',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.82,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-AA',
      roomNumber: 'AA-101',
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
      transactionRef: 'TXN-AA3001-19284'
    },
    guardianContact: {
      name: 'Simranjeet Ahluwalia',
      relationship: 'Father',
      phone: '+91-9810030010',
      email: 'simran.a@example.com',
      address: {
        street: '45 Ranjit Avenue',
        city: 'Amritsar',
        state: 'Punjab',
        pincode: '143001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 172,
      percentage: 95.56,
      biometricId: 'BIO-AA-3001'
    },
    gatePasses: [
      {
        passId: 'GP-3001-01',
        type: 'Outing',
        departure: '2026-02-13T14:00:00Z',
        arrival: '2026-02-13T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-3001', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-3001', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-3002',
    rollNumber: '23EC3002',
    fullName: 'Kavya Sadasivam',
    gender: 'Female',
    dateOfBirth: '2004-09-18',
    email: 'kavya.sadasivam.3002@university.edu',
    phoneNumber: '+91-9871103002',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 9.44,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-BB',
      roomNumber: 'BB-101',
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
      transactionRef: 'TXN-BB3002-88291'
    },
    guardianContact: {
      name: 'V. Sadasivam',
      relationship: 'Father',
      phone: '+91-9810030020',
      email: 'v.sadasivam@example.com',
      address: {
        street: '12 Luz Church Road, Mylapore',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600004'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 178,
      percentage: 98.89,
      biometricId: 'BIO-BB-3002'
    },
    gatePasses: [
      {
        passId: 'GP-3002-01',
        type: 'Home Visit',
        departure: '2026-01-17T08:00:00Z',
        arrival: '2026-01-21T21:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-3002', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-3002', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-3003',
    rollNumber: '24IT3003',
    fullName: 'Lokesh Choudhary',
    gender: 'Male',
    dateOfBirth: '2005-03-12',
    email: 'lokesh.choudhary.3003@university.edu',
    phoneNumber: '+91-9871103003',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Information Technology',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.35,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-AA',
      roomNumber: 'AA-102',
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
      transactionRef: 'TXN-AA3003-55910'
    },
    guardianContact: {
      name: 'Ramsingh Choudhary',
      relationship: 'Father',
      phone: '+91-9810030030',
      email: 'ramsingh.c@example.com',
      address: {
        street: '78 Vaishali Nagar',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302021'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 169,
      percentage: 93.89,
      biometricId: 'BIO-AA-3003'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-3003', item: 'Mattress', issueDate: '2024-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-3003', item: 'Room Key Set', issueDate: '2024-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-3004',
    rollNumber: '24AI3004',
    fullName: 'Lavanya Swaminathan',
    gender: 'Female',
    dateOfBirth: '2005-09-05',
    email: 'lavanya.swami.3004@university.edu',
    phoneNumber: '+91-9871103004',
    bloodGroup: 'AB+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.18,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-BB',
      roomNumber: 'BB-102',
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
      transactionRef: 'TXN-BB3004-77218'
    },
    guardianContact: {
      name: 'N. Swaminathan',
      relationship: 'Father',
      phone: '+91-9810030040',
      email: 'n.swami@example.com',
      address: {
        street: '55 Gandhi Road',
        city: 'Salem',
        state: 'Tamil Nadu',
        pincode: '636007'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-BB-3004'
    },
    gatePasses: [
      {
        passId: 'GP-3004-01',
        type: 'Outing',
        departure: '2026-02-13T14:30:00Z',
        arrival: '2026-02-13T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-3004', item: 'Mattress', issueDate: '2024-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-3004', item: 'Room Key Set', issueDate: '2024-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-3005',
    rollNumber: '23ME3005',
    fullName: 'Madhavan Unni',
    gender: 'Male',
    dateOfBirth: '2004-05-12',
    email: 'madhavan.unni.3005@university.edu',
    phoneNumber: '+91-9871103005',
    bloodGroup: 'O-',
    academicDetails: {
      department: 'Mechanical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 7.93,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-AA',
      roomNumber: 'AA-201',
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
      transactionRef: 'TXN-AA3005-99201'
    },
    guardianContact: {
      name: 'Unnikrishnan Nair',
      relationship: 'Father',
      phone: '+91-9810030050',
      email: 'unni.nair@example.com',
      address: {
        street: '22 Aluva Road',
        city: 'Kochi',
        state: 'Kerala',
        pincode: '683101'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 165,
      percentage: 91.67,
      biometricId: 'BIO-AA-3005'
    },
    gatePasses: [
      {
        passId: 'GP-3005-01',
        type: 'Outing',
        departure: '2026-02-12T11:00:00Z',
        arrival: '2026-02-12T17:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-3005', item: 'Mattress', issueDate: '2023-08-05', condition: 'Good' },
      { itemId: 'INV-KEY-3005', item: 'Room Key Set', issueDate: '2023-08-05', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-3006',
    rollNumber: '25CS3006',
    fullName: 'Meenakshi Iyer',
    gender: 'Female',
    dateOfBirth: '2006-03-08',
    email: 'meenakshi.iyer.3006@university.edu',
    phoneNumber: '+91-9871103006',
    bloodGroup: 'A-',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.91,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-BB',
      roomNumber: 'BB-201',
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
      transactionRef: 'TXN-BB3006-38291'
    },
    guardianContact: {
      name: 'Subramanian Iyer',
      relationship: 'Father',
      phone: '+91-9810030060',
      email: 'subbu.iyer@example.com',
      address: {
        street: '14 Matunga East',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400019'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 176,
      percentage: 97.78,
      biometricId: 'BIO-BB-3006'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-3006', item: 'Mattress', issueDate: '2025-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-3006', item: 'Room Key Set', issueDate: '2025-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-3007',
    rollNumber: '24CE3007',
    fullName: 'Nilesh Solanki',
    gender: 'Male',
    dateOfBirth: '2005-07-19',
    email: 'nilesh.solanki.3007@university.edu',
    phoneNumber: '+91-9871103007',
    bloodGroup: 'B-',
    academicDetails: {
      department: 'Civil Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.30,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-AA',
      roomNumber: 'AA-202',
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
      transactionRef: 'TXN-AA3007-64519'
    },
    guardianContact: {
      name: 'Dinesh Solanki',
      relationship: 'Father',
      phone: '+91-9810030070',
      email: 'dinesh.s@example.com',
      address: {
        street: '82 Kalawad Road',
        city: 'Rajkot',
        state: 'Gujarat',
        pincode: '360005'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 168,
      percentage: 93.33,
      biometricId: 'BIO-AA-3007'
    },
    gatePasses: [
      {
        passId: 'GP-3007-01',
        type: 'Outing',
        departure: '2026-02-15T13:00:00Z',
        arrival: '2026-02-15T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-3007', item: 'Mattress', issueDate: '2024-08-04', condition: 'Good' },
      { itemId: 'INV-KEY-3007', item: 'Room Key Set', issueDate: '2024-08-04', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-3008',
    rollNumber: '23CH3008',
    fullName: 'Nandana Varma',
    gender: 'Female',
    dateOfBirth: '2004-10-14',
    email: 'nandana.varma.3008@university.edu',
    phoneNumber: '+91-9871103008',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Chemical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.97,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-BB',
      roomNumber: 'BB-202',
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
      transactionRef: 'TXN-BB3008-11928'
    },
    guardianContact: {
      name: 'Kerala Varma',
      relationship: 'Father',
      phone: '+91-9810030080',
      email: 'kerala.v@example.com',
      address: {
        street: '34 Palace Road',
        city: 'Tripunithura',
        state: 'Kerala',
        pincode: '682301'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 175,
      percentage: 97.22,
      biometricId: 'BIO-BB-3008'
    },
    gatePasses: [
      {
        passId: 'GP-3008-01',
        type: 'Home Visit',
        departure: '2026-01-22T08:30:00Z',
        arrival: '2026-01-26T19:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-3008', item: 'Mattress', issueDate: '2023-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-3008', item: 'Room Key Set', issueDate: '2023-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-3009',
    rollNumber: '25EC3009',
    fullName: 'Prathamesh Kadam',
    gender: 'Male',
    dateOfBirth: '2006-02-19',
    email: 'prathamesh.kadam.3009@university.edu',
    phoneNumber: '+91-9871103009',
    bloodGroup: 'AB-',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.60,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-AA',
      roomNumber: 'AA-301',
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
      transactionRef: 'TXN-AA3009-77291'
    },
    guardianContact: {
      name: 'Santosh Kadam',
      relationship: 'Father',
      phone: '+91-9810030090',
      email: 'santosh.kadam@example.com',
      address: {
        street: '15 Satara Road',
        city: 'Satara',
        state: 'Maharashtra',
        pincode: '415001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-AA-3009'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-3009', item: 'Mattress', issueDate: '2025-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-3009', item: 'Room Key Set', issueDate: '2025-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-3010',
    rollNumber: '24EE3010',
    fullName: 'Pratibha Hegde',
    gender: 'Female',
    dateOfBirth: '2005-08-21',
    email: 'pratibha.hegde.3010@university.edu',
    phoneNumber: '+91-9871103010',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Electrical Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.35,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-BB',
      roomNumber: 'BB-301',
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
      transactionRef: 'TXN-BB3010-99418'
    },
    guardianContact: {
      name: 'Ananth Hegde',
      relationship: 'Father',
      phone: '+91-9810030100',
      email: 'ananth.h@example.com',
      address: {
        street: '88 Car Street',
        city: 'Sirsi',
        state: 'Karnataka',
        pincode: '581401'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 177,
      percentage: 98.33,
      biometricId: 'BIO-BB-3010'
    },
    gatePasses: [
      {
        passId: 'GP-3010-01',
        type: 'Outing',
        departure: '2026-02-17T14:00:00Z',
        arrival: '2026-02-17T18:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-3010', item: 'Mattress', issueDate: '2024-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-3010', item: 'Room Key Set', issueDate: '2024-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-3011',
    rollNumber: '23CS3011',
    fullName: 'Rupesh Nambisan',
    gender: 'Male',
    dateOfBirth: '2004-10-11',
    email: 'rupesh.nambisan.3011@university.edu',
    phoneNumber: '+91-9871103011',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.68,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-AA',
      roomNumber: 'AA-302',
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
      transactionRef: 'TXN-AA3011-55829'
    },
    guardianContact: {
      name: 'K. P. Nambisan',
      relationship: 'Father',
      phone: '+91-9810030110',
      email: 'kp.nambisan@example.com',
      address: {
        street: '45 Round North',
        city: 'Thrissur',
        state: 'Kerala',
        pincode: '680001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 171,
      percentage: 95.0,
      biometricId: 'BIO-AA-3011'
    },
    gatePasses: [
      {
        passId: 'GP-3011-01',
        type: 'Outing',
        departure: '2026-02-11T13:30:00Z',
        arrival: '2026-02-11T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-3011', item: 'Mattress', issueDate: '2023-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-3011', item: 'Room Key Set', issueDate: '2023-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-3012',
    rollNumber: '25AI3012',
    fullName: 'Ruchira Banerjee',
    gender: 'Female',
    dateOfBirth: '2006-05-25',
    email: 'ruchira.banerjee.3012@university.edu',
    phoneNumber: '+91-9871103012',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 9.18,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-BB',
      roomNumber: 'BB-302',
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
      transactionRef: 'TXN-BB3012-99301'
    },
    guardianContact: {
      name: 'Shankar Banerjee',
      relationship: 'Father',
      phone: '+91-9810030120',
      email: 'shankar.b@example.com',
      address: {
        street: '22 Hindusthan Park',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700029'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 176,
      percentage: 97.78,
      biometricId: 'BIO-BB-3012'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-3012', item: 'Mattress', issueDate: '2025-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-3012', item: 'Room Key Set', issueDate: '2025-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  }
];

function getAll() {
  return staticResidentMaster30;
}

function findById(id) {
  return staticResidentMaster30.find(resident => resident.id === id);
}

function filterByBlock(block) {
  return staticResidentMaster30.filter(resident => resident.roomAllocation.block.toLowerCase() === block.toLowerCase());
}

function getStats() {
  const total = staticResidentMaster30.length;
  const paidCount = staticResidentMaster30.filter(r => r.feePayment.paymentStatus === 'Paid').length;
  const partialCount = staticResidentMaster30.filter(r => r.feePayment.paymentStatus === 'Partial').length;
  const avgAttendance = staticResidentMaster30.reduce((acc, curr) => acc + curr.attendance.percentage, 0) / total;
  return {
    totalResidents: total,
    fullyPaidCount: paidCount,
    partialPaidCount: partialCount,
    averageAttendance: parseFloat(avgAttendance.toFixed(2))
  };
}

module.exports = {
  staticResidentMaster30,
  getAll,
  findById,
  filterByBlock,
  getStats
};
