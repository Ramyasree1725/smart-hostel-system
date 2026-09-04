'use strict';

/**
 * Static Resident Master Dataset - Batch 23
 * Provides static resident records and query utility functions for Block-M and Block-N residents.
 */

const staticResidentMaster23 = [
  {
    id: 'RES-2301',
    rollNumber: '23CS2301',
    fullName: 'Aniket Deshmukh',
    gender: 'Male',
    dateOfBirth: '2004-05-10',
    email: 'aniket.deshmukh.2301@university.edu',
    phoneNumber: '+91-9871102301',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.81,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-M',
      roomNumber: 'M-101',
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
      lastPaymentDate: '2025-07-22',
      transactionRef: 'TXN-M2301-88192'
    },
    guardianContact: {
      name: 'Vilas Deshmukh',
      relationship: 'Father',
      phone: '+91-9810023010',
      email: 'vilas.d@example.com',
      address: {
        street: '18 Samarth Nagar',
        city: 'Aurangabad',
        state: 'Maharashtra',
        pincode: '431001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-M-2301'
    },
    gatePasses: [
      {
        passId: 'GP-2301-01',
        type: 'Outing',
        departure: '2026-02-14T14:00:00Z',
        arrival: '2026-02-14T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2301', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2301', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2302',
    rollNumber: '23EC2302',
    fullName: 'Barkha Rani',
    gender: 'Female',
    dateOfBirth: '2004-11-20',
    email: 'barkha.rani.2302@university.edu',
    phoneNumber: '+91-9871102302',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 9.39,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-N',
      roomNumber: 'N-101',
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
      lastPaymentDate: '2025-07-17',
      transactionRef: 'TXN-N2302-33910'
    },
    guardianContact: {
      name: 'Rajnish Kumar',
      relationship: 'Father',
      phone: '+91-9810023020',
      email: 'rajnish.k@example.com',
      address: {
        street: '45 Boring Road',
        city: 'Patna',
        state: 'Bihar',
        pincode: '800001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 177,
      percentage: 98.33,
      biometricId: 'BIO-N-2302'
    },
    gatePasses: [
      {
        passId: 'GP-2302-01',
        type: 'Home Visit',
        departure: '2026-01-18T08:00:00Z',
        arrival: '2026-01-23T20:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2302', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2302', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2303',
    rollNumber: '24IT2303',
    fullName: 'Chinmay Kulkarni',
    gender: 'Male',
    dateOfBirth: '2005-01-08',
    email: 'chinmay.kulkarni.2303@university.edu',
    phoneNumber: '+91-9871102303',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Information Technology',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.31,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-M',
      roomNumber: 'M-102',
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
      transactionRef: 'TXN-M2303-66291'
    },
    guardianContact: {
      name: 'Girish Kulkarni',
      relationship: 'Father',
      phone: '+91-9810023030',
      email: 'girish.k@example.com',
      address: {
        street: '91 Deccan Gymkhana',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411004'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 167,
      percentage: 92.78,
      biometricId: 'BIO-M-2303'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2303', item: 'Mattress', issueDate: '2024-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2303', item: 'Room Key Set', issueDate: '2024-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2304',
    rollNumber: '24AI2304',
    fullName: 'Damini Rathore',
    gender: 'Female',
    dateOfBirth: '2005-07-29',
    email: 'damini.rathore.2304@university.edu',
    phoneNumber: '+91-9871102304',
    bloodGroup: 'AB+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.11,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-N',
      roomNumber: 'N-102',
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
      transactionRef: 'TXN-N2304-88491'
    },
    guardianContact: {
      name: 'Gajendra Rathore',
      relationship: 'Father',
      phone: '+91-9810023040',
      email: 'gajendra.r@example.com',
      address: {
        street: '22 Paota C Road',
        city: 'Jodhpur',
        state: 'Rajasthan',
        pincode: '342001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 172,
      percentage: 95.56,
      biometricId: 'BIO-N-2304'
    },
    gatePasses: [
      {
        passId: 'GP-2304-01',
        type: 'Outing',
        departure: '2026-02-11T14:30:00Z',
        arrival: '2026-02-11T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2304', item: 'Mattress', issueDate: '2024-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2304', item: 'Room Key Set', issueDate: '2024-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2305',
    rollNumber: '23ME2305',
    fullName: 'Faiz Ahmed',
    gender: 'Male',
    dateOfBirth: '2004-03-27',
    email: 'faiz.ahmed.2305@university.edu',
    phoneNumber: '+91-9871102305',
    bloodGroup: 'O-',
    academicDetails: {
      department: 'Mechanical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 7.79,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-M',
      roomNumber: 'M-201',
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
      lastPaymentDate: '2025-07-20',
      transactionRef: 'TXN-M2305-11928'
    },
    guardianContact: {
      name: 'Naseem Ahmed',
      relationship: 'Father',
      phone: '+91-9810023050',
      email: 'naseem.a@example.com',
      address: {
        street: '78 Zakir Nagar',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110025'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 166,
      percentage: 92.22,
      biometricId: 'BIO-M-2305'
    },
    gatePasses: [
      {
        passId: 'GP-2305-01',
        type: 'Outing',
        departure: '2026-02-12T12:00:00Z',
        arrival: '2026-02-12T17:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2305', item: 'Mattress', issueDate: '2023-08-05', condition: 'Good' },
      { itemId: 'INV-KEY-2305', item: 'Room Key Set', issueDate: '2023-08-05', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2306',
    rollNumber: '25CS2306',
    fullName: 'Geetika Nanda',
    gender: 'Female',
    dateOfBirth: '2006-08-14',
    email: 'geetika.nanda.2306@university.edu',
    phoneNumber: '+91-9871102306',
    bloodGroup: 'A-',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.83,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-N',
      roomNumber: 'N-201',
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
      transactionRef: 'TXN-N2306-66291'
    },
    guardianContact: {
      name: 'Sunil Nanda',
      relationship: 'Father',
      phone: '+91-9810023060',
      email: 'sunil.nanda@example.com',
      address: {
        street: '55 Rani Bagh',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110034'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 175,
      percentage: 97.22,
      biometricId: 'BIO-N-2306'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2306', item: 'Mattress', issueDate: '2025-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2306', item: 'Room Key Set', issueDate: '2025-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2307',
    rollNumber: '24CE2307',
    fullName: 'Harshwardhan Patil',
    gender: 'Male',
    dateOfBirth: '2005-04-19',
    email: 'harsh.patil.2307@university.edu',
    phoneNumber: '+91-9871102307',
    bloodGroup: 'B-',
    academicDetails: {
      department: 'Civil Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.24,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-M',
      roomNumber: 'M-202',
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
      transactionRef: 'TXN-M2307-99482'
    },
    guardianContact: {
      name: 'Balasaheb Patil',
      relationship: 'Father',
      phone: '+91-9810023070',
      email: 'bala.patil@example.com',
      address: {
        street: '33 Shahupuri',
        city: 'Kolhapur',
        state: 'Maharashtra',
        pincode: '416001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 169,
      percentage: 93.89,
      biometricId: 'BIO-M-2307'
    },
    gatePasses: [
      {
        passId: 'GP-2307-01',
        type: 'Outing',
        departure: '2026-02-16T14:00:00Z',
        arrival: '2026-02-16T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2307', item: 'Mattress', issueDate: '2024-08-04', condition: 'Good' },
      { itemId: 'INV-KEY-2307', item: 'Room Key Set', issueDate: '2024-08-04', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2308',
    rollNumber: '23CH2308',
    fullName: 'Ishita Banerjee',
    gender: 'Female',
    dateOfBirth: '2004-10-04',
    email: 'ishita.banerjee.2308@university.edu',
    phoneNumber: '+91-9871102308',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Chemical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.92,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-N',
      roomNumber: 'N-202',
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
      transactionRef: 'TXN-N2308-33829'
    },
    guardianContact: {
      name: 'Arup Banerjee',
      relationship: 'Father',
      phone: '+91-9810023080',
      email: 'arup.b@example.com',
      address: {
        street: '12 Dover Lane',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700029'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 174,
      percentage: 96.67,
      biometricId: 'BIO-N-2308'
    },
    gatePasses: [
      {
        passId: 'GP-2308-01',
        type: 'Home Visit',
        departure: '2026-01-20T09:00:00Z',
        arrival: '2026-01-24T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2308', item: 'Mattress', issueDate: '2023-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2308', item: 'Room Key Set', issueDate: '2023-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2309',
    rollNumber: '25EC2309',
    fullName: 'Jatin Chhabra',
    gender: 'Male',
    dateOfBirth: '2006-05-15',
    email: 'jatin.chhabra.2309@university.edu',
    phoneNumber: '+91-9871102309',
    bloodGroup: 'AB-',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.59,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-M',
      roomNumber: 'M-301',
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
      transactionRef: 'TXN-M2309-77291'
    },
    guardianContact: {
      name: 'Naresh Chhabra',
      relationship: 'Father',
      phone: '+91-9810023090',
      email: 'naresh.c@example.com',
      address: {
        street: '28 Urban Estate',
        city: 'Karnal',
        state: 'Haryana',
        pincode: '132001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-M-2309'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2309', item: 'Mattress', issueDate: '2025-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2309', item: 'Room Key Set', issueDate: '2025-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2310',
    rollNumber: '24EE2310',
    fullName: 'Kavita Menon',
    gender: 'Female',
    dateOfBirth: '2005-11-12',
    email: 'kavita.menon.2310@university.edu',
    phoneNumber: '+91-9871102310',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Electrical Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.31,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-N',
      roomNumber: 'N-301',
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
      lastPaymentDate: '2025-07-25',
      transactionRef: 'TXN-N2310-88192'
    },
    guardianContact: {
      name: 'G. Menon',
      relationship: 'Father',
      phone: '+91-9810023100',
      email: 'g.menon@example.com',
      address: {
        street: '45 Jawahar Nagar',
        city: 'Kozhikode',
        state: 'Kerala',
        pincode: '673006'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 178,
      percentage: 98.89,
      biometricId: 'BIO-N-2310'
    },
    gatePasses: [
      {
        passId: 'GP-2310-01',
        type: 'Outing',
        departure: '2026-02-18T14:00:00Z',
        arrival: '2026-02-18T18:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2310', item: 'Mattress', issueDate: '2024-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2310', item: 'Room Key Set', issueDate: '2024-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2311',
    rollNumber: '23CS2311',
    fullName: 'Lakshya Gupta',
    gender: 'Male',
    dateOfBirth: '2004-06-25',
    email: 'lakshya.gupta.2311@university.edu',
    phoneNumber: '+91-9871102311',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.52,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-M',
      roomNumber: 'M-302',
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
      transactionRef: 'TXN-M2311-55819'
    },
    guardianContact: {
      name: 'Mukul Gupta',
      relationship: 'Father',
      phone: '+91-9810023110',
      email: 'mukul.g@example.com',
      address: {
        street: '88 Shastri Nagar',
        city: 'Meerut',
        state: 'Uttar Pradesh',
        pincode: '250004'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 170,
      percentage: 94.44,
      biometricId: 'BIO-M-2311'
    },
    gatePasses: [
      {
        passId: 'GP-2311-01',
        type: 'Outing',
        departure: '2026-02-12T13:30:00Z',
        arrival: '2026-02-12T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2311', item: 'Mattress', issueDate: '2023-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2311', item: 'Room Key Set', issueDate: '2023-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2312',
    rollNumber: '25AI2312',
    fullName: 'Madhura Vaidya',
    gender: 'Female',
    dateOfBirth: '2006-03-10',
    email: 'madhura.vaidya.2312@university.edu',
    phoneNumber: '+91-9871102312',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 9.14,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-N',
      roomNumber: 'N-302',
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
      transactionRef: 'TXN-N2312-33491'
    },
    guardianContact: {
      name: 'Shashank Vaidya',
      relationship: 'Father',
      phone: '+91-9810023120',
      email: 's.vaidya@example.com',
      address: {
        street: '14 Dhantoli',
        city: 'Nagpur',
        state: 'Maharashtra',
        pincode: '440012'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 176,
      percentage: 97.78,
      biometricId: 'BIO-N-2312'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2312', item: 'Mattress', issueDate: '2025-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2312', item: 'Room Key Set', issueDate: '2025-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  }
];

function getAll() {
  return staticResidentMaster23;
}

function findById(id) {
  return staticResidentMaster23.find(resident => resident.id === id);
}

function filterByBlock(block) {
  return staticResidentMaster23.filter(resident => resident.roomAllocation.block.toLowerCase() === block.toLowerCase());
}

function getStats() {
  const total = staticResidentMaster23.length;
  const paidCount = staticResidentMaster23.filter(r => r.feePayment.paymentStatus === 'Paid').length;
  const partialCount = staticResidentMaster23.filter(r => r.feePayment.paymentStatus === 'Partial').length;
  const avgAttendance = staticResidentMaster23.reduce((acc, curr) => acc + curr.attendance.percentage, 0) / total;
  return {
    totalResidents: total,
    fullyPaidCount: paidCount,
    partialPaidCount: partialCount,
    averageAttendance: parseFloat(avgAttendance.toFixed(2))
  };
}

module.exports = {
  staticResidentMaster23,
  getAll,
  findById,
  filterByBlock,
  getStats
};
