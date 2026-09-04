'use strict';

/**
 * Static Resident Master Dataset - Batch 25
 * Provides static resident records and query utility functions for Block-Q and Block-R residents.
 */

const staticResidentMaster25 = [
  {
    id: 'RES-2501',
    rollNumber: '23CS2501',
    fullName: 'Arjun Namboodiri',
    gender: 'Male',
    dateOfBirth: '2004-03-08',
    email: 'arjun.namboodiri.2501@university.edu',
    phoneNumber: '+91-9871102501',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.84,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-Q',
      roomNumber: 'Q-101',
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
      lastPaymentDate: '2025-07-20',
      transactionRef: 'TXN-Q2501-11829'
    },
    guardianContact: {
      name: 'Kesavan Namboodiri',
      relationship: 'Father',
      phone: '+91-9810025010',
      email: 'kesavan.n@example.com',
      address: {
        street: '14 Chembukkavu',
        city: 'Thrissur',
        state: 'Kerala',
        pincode: '680020'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-Q-2501'
    },
    gatePasses: [
      {
        passId: 'GP-2501-01',
        type: 'Outing',
        departure: '2026-02-14T14:00:00Z',
        arrival: '2026-02-14T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2501', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2501', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2502',
    rollNumber: '23EC2502',
    fullName: 'Ananya Deshpande',
    gender: 'Female',
    dateOfBirth: '2004-10-15',
    email: 'ananya.deshpande.2502@university.edu',
    phoneNumber: '+91-9871102502',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 9.35,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-R',
      roomNumber: 'R-101',
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
      lastPaymentDate: '2025-07-16',
      transactionRef: 'TXN-R2502-88291'
    },
    guardianContact: {
      name: 'Vidyadhar Deshpande',
      relationship: 'Father',
      phone: '+91-9810025020',
      email: 'vidya.d@example.com',
      address: {
        street: '45 Tilak Road',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411030'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 177,
      percentage: 98.33,
      biometricId: 'BIO-R-2502'
    },
    gatePasses: [
      {
        passId: 'GP-2502-01',
        type: 'Home Visit',
        departure: '2026-01-18T08:00:00Z',
        arrival: '2026-01-23T20:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2502', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2502', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2503',
    rollNumber: '24IT2503',
    fullName: 'Bharat Bhushan',
    gender: 'Male',
    dateOfBirth: '2005-02-11',
    email: 'bharat.bhushan.2503@university.edu',
    phoneNumber: '+91-9871102503',
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
      block: 'Block-Q',
      roomNumber: 'Q-102',
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
      transactionRef: 'TXN-Q2503-44581'
    },
    guardianContact: {
      name: 'Ram Bhushan',
      relationship: 'Father',
      phone: '+91-9810025030',
      email: 'ram.b@example.com',
      address: {
        street: '89 Kankarbagh',
        city: 'Patna',
        state: 'Bihar',
        pincode: '800020'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 167,
      percentage: 92.78,
      biometricId: 'BIO-Q-2503'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2503', item: 'Mattress', issueDate: '2024-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2503', item: 'Room Key Set', issueDate: '2024-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2504',
    rollNumber: '24AI2504',
    fullName: 'Bhavika Somani',
    gender: 'Female',
    dateOfBirth: '2005-08-25',
    email: 'bhavika.somani.2504@university.edu',
    phoneNumber: '+91-9871102504',
    bloodGroup: 'AB+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.15,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-R',
      roomNumber: 'R-102',
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
      transactionRef: 'TXN-R2504-99102'
    },
    guardianContact: {
      name: 'Nawal Somani',
      relationship: 'Father',
      phone: '+91-9810025040',
      email: 'nawal.s@example.com',
      address: {
        street: '34 City Light Town',
        city: 'Surat',
        state: 'Gujarat',
        pincode: '395007'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 172,
      percentage: 95.56,
      biometricId: 'BIO-R-2504'
    },
    gatePasses: [
      {
        passId: 'GP-2504-01',
        type: 'Outing',
        departure: '2026-02-12T14:30:00Z',
        arrival: '2026-02-12T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2504', item: 'Mattress', issueDate: '2024-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2504', item: 'Room Key Set', issueDate: '2024-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2505',
    rollNumber: '23ME2505',
    fullName: 'Chaitanya Prabhu',
    gender: 'Male',
    dateOfBirth: '2004-04-18',
    email: 'chaitanya.prabhu.2505@university.edu',
    phoneNumber: '+91-9871102505',
    bloodGroup: 'O-',
    academicDetails: {
      department: 'Mechanical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 7.82,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-Q',
      roomNumber: 'Q-201',
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
      transactionRef: 'TXN-Q2505-77291'
    },
    guardianContact: {
      name: 'Vaman Prabhu',
      relationship: 'Father',
      phone: '+91-9810025050',
      email: 'vaman.p@example.com',
      address: {
        street: '12 Kadri Temple Road',
        city: 'Mangaluru',
        state: 'Karnataka',
        pincode: '575002'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 166,
      percentage: 92.22,
      biometricId: 'BIO-Q-2505'
    },
    gatePasses: [
      {
        passId: 'GP-2505-01',
        type: 'Outing',
        departure: '2026-02-11T12:00:00Z',
        arrival: '2026-02-11T17:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2505', item: 'Mattress', issueDate: '2023-08-05', condition: 'Good' },
      { itemId: 'INV-KEY-2505', item: 'Room Key Set', issueDate: '2023-08-05', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2506',
    rollNumber: '25CS2506',
    fullName: 'Chandana Gowda',
    gender: 'Female',
    dateOfBirth: '2006-07-11',
    email: 'chandana.gowda.2506@university.edu',
    phoneNumber: '+91-9871102506',
    bloodGroup: 'A-',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.92,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-R',
      roomNumber: 'R-201',
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
      transactionRef: 'TXN-R2506-38291'
    },
    guardianContact: {
      name: 'Rame Gowda',
      relationship: 'Father',
      phone: '+91-9810025060',
      email: 'rame.g@example.com',
      address: {
        street: '77 Vijayanagar 2nd Stage',
        city: 'Mysuru',
        state: 'Karnataka',
        pincode: '570017'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 175,
      percentage: 97.22,
      biometricId: 'BIO-R-2506'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2506', item: 'Mattress', issueDate: '2025-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2506', item: 'Room Key Set', issueDate: '2025-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2507',
    rollNumber: '24CE2507',
    fullName: 'Devendra Rathod',
    gender: 'Male',
    dateOfBirth: '2005-05-14',
    email: 'devendra.rathod.2507@university.edu',
    phoneNumber: '+91-9871102507',
    bloodGroup: 'B-',
    academicDetails: {
      department: 'Civil Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.22,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-Q',
      roomNumber: 'Q-202',
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
      lastPaymentDate: '2025-07-26',
      transactionRef: 'TXN-Q2507-66291'
    },
    guardianContact: {
      name: 'Mohan Rathod',
      relationship: 'Father',
      phone: '+91-9810025070',
      email: 'mohan.r@example.com',
      address: {
        street: '55 Station Road',
        city: 'Solapur',
        state: 'Maharashtra',
        pincode: '413001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 168,
      percentage: 93.33,
      biometricId: 'BIO-Q-2507'
    },
    gatePasses: [
      {
        passId: 'GP-2507-01',
        type: 'Outing',
        departure: '2026-02-15T14:00:00Z',
        arrival: '2026-02-15T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2507', item: 'Mattress', issueDate: '2024-08-04', condition: 'Good' },
      { itemId: 'INV-KEY-2507', item: 'Room Key Set', issueDate: '2024-08-04', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2508',
    rollNumber: '23CH2508',
    fullName: 'Divya Bharathi',
    gender: 'Female',
    dateOfBirth: '2004-11-28',
    email: 'divya.bharathi.2508@university.edu',
    phoneNumber: '+91-9871102508',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Chemical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.94,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-R',
      roomNumber: 'R-202',
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
      transactionRef: 'TXN-R2508-33829'
    },
    guardianContact: {
      name: 'P. Bharathi',
      relationship: 'Father',
      phone: '+91-9810025080',
      email: 'p.bharathi@example.com',
      address: {
        street: '88 RS Puram',
        city: 'Coimbatore',
        state: 'Tamil Nadu',
        pincode: '641002'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 174,
      percentage: 96.67,
      biometricId: 'BIO-R-2508'
    },
    gatePasses: [
      {
        passId: 'GP-2508-01',
        type: 'Home Visit',
        departure: '2026-01-20T09:00:00Z',
        arrival: '2026-01-24T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2508', item: 'Mattress', issueDate: '2023-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2508', item: 'Room Key Set', issueDate: '2023-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2509',
    rollNumber: '25EC2509',
    fullName: 'Girish Venkat',
    gender: 'Male',
    dateOfBirth: '2006-04-09',
    email: 'girish.venkat.2509@university.edu',
    phoneNumber: '+91-9871102509',
    bloodGroup: 'AB-',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.64,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-Q',
      roomNumber: 'Q-301',
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
      transactionRef: 'TXN-Q2509-99401'
    },
    guardianContact: {
      name: 'R. Venkat',
      relationship: 'Father',
      phone: '+91-9810025090',
      email: 'r.venkat@example.com',
      address: {
        street: '15 Gandhi Nagar 1st St',
        city: 'Salem',
        state: 'Tamil Nadu',
        pincode: '636007'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-Q-2509'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2509', item: 'Mattress', issueDate: '2025-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2509', item: 'Room Key Set', issueDate: '2025-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2510',
    rollNumber: '24EE2510',
    fullName: 'Gayathri Natarajan',
    gender: 'Female',
    dateOfBirth: '2005-09-17',
    email: 'gayathri.nat.2510@university.edu',
    phoneNumber: '+91-9871102510',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Electrical Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.38,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-R',
      roomNumber: 'R-301',
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
      transactionRef: 'TXN-R2510-11829'
    },
    guardianContact: {
      name: 'V. Natarajan',
      relationship: 'Father',
      phone: '+91-9810025100',
      email: 'v.nat@example.com',
      address: {
        street: '34 Thillai Nagar',
        city: 'Tiruchirappalli',
        state: 'Tamil Nadu',
        pincode: '620018'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 178,
      percentage: 98.89,
      biometricId: 'BIO-R-2510'
    },
    gatePasses: [
      {
        passId: 'GP-2510-01',
        type: 'Outing',
        departure: '2026-02-18T14:00:00Z',
        arrival: '2026-02-18T18:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2510', item: 'Mattress', issueDate: '2024-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2510', item: 'Room Key Set', issueDate: '2024-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2511',
    rollNumber: '23CS2511',
    fullName: 'Harish Kalyan',
    gender: 'Male',
    dateOfBirth: '2004-06-11',
    email: 'harish.kalyan.2511@university.edu',
    phoneNumber: '+91-9871102511',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.60,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-Q',
      roomNumber: 'Q-302',
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
      transactionRef: 'TXN-Q2511-77291'
    },
    guardianContact: {
      name: 'Kalyanasundaram G.',
      relationship: 'Father',
      phone: '+91-9810025110',
      email: 'kalyan.g@example.com',
      address: {
        street: '12 Alagappan Nagar',
        city: 'Madurai',
        state: 'Tamil Nadu',
        pincode: '625003'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 171,
      percentage: 95.0,
      biometricId: 'BIO-Q-2511'
    },
    gatePasses: [
      {
        passId: 'GP-2511-01',
        type: 'Outing',
        departure: '2026-02-12T13:30:00Z',
        arrival: '2026-02-12T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2511', item: 'Mattress', issueDate: '2023-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2511', item: 'Room Key Set', issueDate: '2023-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2512',
    rollNumber: '25AI2512',
    fullName: 'Haripriya Shenoy',
    gender: 'Female',
    dateOfBirth: '2006-02-14',
    email: 'haripriya.shenoy.2512@university.edu',
    phoneNumber: '+91-9871102512',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 9.21,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-R',
      roomNumber: 'R-302',
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
      transactionRef: 'TXN-R2512-55910'
    },
    guardianContact: {
      name: 'Ganesh Shenoy',
      relationship: 'Father',
      phone: '+91-9810025120',
      email: 'ganesh.s@example.com',
      address: {
        street: '8 Car Street',
        city: 'Udupi',
        state: 'Karnataka',
        pincode: '576101'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 177,
      percentage: 98.33,
      biometricId: 'BIO-R-2512'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2512', item: 'Mattress', issueDate: '2025-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2512', item: 'Room Key Set', issueDate: '2025-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  }
];

function getAll() {
  return staticResidentMaster25;
}

function findById(id) {
  return staticResidentMaster25.find(resident => resident.id === id);
}

function filterByBlock(block) {
  return staticResidentMaster25.filter(resident => resident.roomAllocation.block.toLowerCase() === block.toLowerCase());
}

function getStats() {
  const total = staticResidentMaster25.length;
  const paidCount = staticResidentMaster25.filter(r => r.feePayment.paymentStatus === 'Paid').length;
  const partialCount = staticResidentMaster25.filter(r => r.feePayment.paymentStatus === 'Partial').length;
  const avgAttendance = staticResidentMaster25.reduce((acc, curr) => acc + curr.attendance.percentage, 0) / total;
  return {
    totalResidents: total,
    fullyPaidCount: paidCount,
    partialPaidCount: partialCount,
    averageAttendance: parseFloat(avgAttendance.toFixed(2))
  };
}

module.exports = {
  staticResidentMaster25,
  getAll,
  findById,
  filterByBlock,
  getStats
};
