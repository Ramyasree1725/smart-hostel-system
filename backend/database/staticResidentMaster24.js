'use strict';

/**
 * Static Resident Master Dataset - Batch 24
 * Provides static resident records and query utility functions for Block-O and Block-P residents.
 */

const staticResidentMaster24 = [
  {
    id: 'RES-2401',
    rollNumber: '23CS2401',
    fullName: 'Naveen Choudhury',
    gender: 'Male',
    dateOfBirth: '2004-02-23',
    email: 'naveen.choudhury.2401@university.edu',
    phoneNumber: '+91-9871102401',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.75,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-O',
      roomNumber: 'O-101',
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
      lastPaymentDate: '2025-07-24',
      transactionRef: 'TXN-O2401-44918'
    },
    guardianContact: {
      name: 'Binod Choudhury',
      relationship: 'Father',
      phone: '+91-9810024010',
      email: 'binod.c@example.com',
      address: {
        street: '12 Maligaon',
        city: 'Guwahati',
        state: 'Assam',
        pincode: '781011'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 172,
      percentage: 95.56,
      biometricId: 'BIO-O-2401'
    },
    gatePasses: [
      {
        passId: 'GP-2401-01',
        type: 'Outing',
        departure: '2026-02-13T14:00:00Z',
        arrival: '2026-02-13T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2401', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2401', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2402',
    rollNumber: '23EC2402',
    fullName: 'Nandita Acharya',
    gender: 'Female',
    dateOfBirth: '2004-12-19',
    email: 'nandita.acharya.2402@university.edu',
    phoneNumber: '+91-9871102402',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 9.41,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-P',
      roomNumber: 'P-101',
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
      transactionRef: 'TXN-P2402-99201'
    },
    guardianContact: {
      name: 'Debabrata Acharya',
      relationship: 'Father',
      phone: '+91-9810024020',
      email: 'deba.a@example.com',
      address: {
        street: '88 Master Canteen',
        city: 'Bhubaneswar',
        state: 'Odisha',
        pincode: '751001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 178,
      percentage: 98.89,
      biometricId: 'BIO-P-2402'
    },
    gatePasses: [
      {
        passId: 'GP-2402-01',
        type: 'Home Visit',
        departure: '2026-01-19T08:00:00Z',
        arrival: '2026-01-23T20:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2402', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2402', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2403',
    rollNumber: '24IT2403',
    fullName: 'Prashant Mishra',
    gender: 'Male',
    dateOfBirth: '2005-04-03',
    email: 'prashant.mishra.2403@university.edu',
    phoneNumber: '+91-9871102403',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Information Technology',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.38,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-O',
      roomNumber: 'O-102',
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
      lastPaymentDate: '2025-07-28',
      transactionRef: 'TXN-O2403-11928'
    },
    guardianContact: {
      name: 'Vivekanand Mishra',
      relationship: 'Father',
      phone: '+91-9810024030',
      email: 'vn.mishra@example.com',
      address: {
        street: '15 Civil Lines',
        city: 'Prayagraj',
        state: 'Uttar Pradesh',
        pincode: '211001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 168,
      percentage: 93.33,
      biometricId: 'BIO-O-2403'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2403', item: 'Mattress', issueDate: '2024-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2403', item: 'Room Key Set', issueDate: '2024-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2404',
    rollNumber: '24AI2404',
    fullName: 'Pranathi Rao',
    gender: 'Female',
    dateOfBirth: '2005-08-09',
    email: 'pranathi.rao.2404@university.edu',
    phoneNumber: '+91-9871102404',
    bloodGroup: 'AB+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.16,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-P',
      roomNumber: 'P-102',
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
      transactionRef: 'TXN-P2404-55829'
    },
    guardianContact: {
      name: 'K. V. Rao',
      relationship: 'Father',
      phone: '+91-9810024040',
      email: 'kv.rao@example.com',
      address: {
        street: '66 Begumpet',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500016'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-P-2404'
    },
    gatePasses: [
      {
        passId: 'GP-2404-01',
        type: 'Outing',
        departure: '2026-02-12T14:30:00Z',
        arrival: '2026-02-12T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2404', item: 'Mattress', issueDate: '2024-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2404', item: 'Room Key Set', issueDate: '2024-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2405',
    rollNumber: '23ME2405',
    fullName: 'Rahul Saxena',
    gender: 'Male',
    dateOfBirth: '2004-08-12',
    email: 'rahul.saxena.2405@university.edu',
    phoneNumber: '+91-9871102405',
    bloodGroup: 'O-',
    academicDetails: {
      department: 'Mechanical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 7.85,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-O',
      roomNumber: 'O-201',
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
      transactionRef: 'TXN-O2405-33928'
    },
    guardianContact: {
      name: 'Manish Saxena',
      relationship: 'Father',
      phone: '+91-9810024050',
      email: 'manish.sax@example.com',
      address: {
        street: '44 Prem Nagar',
        city: 'Bareilly',
        state: 'Uttar Pradesh',
        pincode: '243005'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 165,
      percentage: 91.67,
      biometricId: 'BIO-O-2405'
    },
    gatePasses: [
      {
        passId: 'GP-2405-01',
        type: 'Outing',
        departure: '2026-02-10T12:00:00Z',
        arrival: '2026-02-10T17:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2405', item: 'Mattress', issueDate: '2023-08-05', condition: 'Good' },
      { itemId: 'INV-KEY-2405', item: 'Room Key Set', issueDate: '2023-08-05', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2406',
    rollNumber: '25CS2406',
    fullName: 'Riddhi Kothari',
    gender: 'Female',
    dateOfBirth: '2006-05-19',
    email: 'riddhi.kothari.2406@university.edu',
    phoneNumber: '+91-9871102406',
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
      block: 'Block-P',
      roomNumber: 'P-201',
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
      transactionRef: 'TXN-P2406-88192'
    },
    guardianContact: {
      name: 'Prakash Kothari',
      relationship: 'Father',
      phone: '+91-9810024060',
      email: 'prakash.k@example.com',
      address: {
        street: '19 Manek Chowk',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 176,
      percentage: 97.78,
      biometricId: 'BIO-P-2406'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2406', item: 'Mattress', issueDate: '2025-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2406', item: 'Room Key Set', issueDate: '2025-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2407',
    rollNumber: '24CE2407',
    fullName: 'Saurabh Pandey',
    gender: 'Male',
    dateOfBirth: '2005-06-28',
    email: 'saurabh.pandey.2407@university.edu',
    phoneNumber: '+91-9871102407',
    bloodGroup: 'B-',
    academicDetails: {
      department: 'Civil Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.29,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-O',
      roomNumber: 'O-202',
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
      transactionRef: 'TXN-O2407-66291'
    },
    guardianContact: {
      name: 'Tribhuwan Pandey',
      relationship: 'Father',
      phone: '+91-9810024070',
      email: 't.pandey@example.com',
      address: {
        street: '88 Lanka Road',
        city: 'Varanasi',
        state: 'Uttar Pradesh',
        pincode: '221005'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 169,
      percentage: 93.89,
      biometricId: 'BIO-O-2407'
    },
    gatePasses: [
      {
        passId: 'GP-2407-01',
        type: 'Outing',
        departure: '2026-02-15T14:00:00Z',
        arrival: '2026-02-15T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2407', item: 'Mattress', issueDate: '2024-08-04', condition: 'Good' },
      { itemId: 'INV-KEY-2407', item: 'Room Key Set', issueDate: '2024-08-04', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2408',
    rollNumber: '23CH2408',
    fullName: 'Shalini Nambiar',
    gender: 'Female',
    dateOfBirth: '2004-12-05',
    email: 'shalini.nambiar.2408@university.edu',
    phoneNumber: '+91-9871102408',
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
      block: 'Block-P',
      roomNumber: 'P-202',
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
      lastPaymentDate: '2025-07-17',
      transactionRef: 'TXN-P2408-44819'
    },
    guardianContact: {
      name: 'G. Nambiar',
      relationship: 'Father',
      phone: '+91-9810024080',
      email: 'g.nambiar@example.com',
      address: {
        street: '14 Thalassery Road',
        city: 'Kannur',
        state: 'Kerala',
        pincode: '670001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 175,
      percentage: 97.22,
      biometricId: 'BIO-P-2408'
    },
    gatePasses: [
      {
        passId: 'GP-2408-01',
        type: 'Home Visit',
        departure: '2026-01-21T09:00:00Z',
        arrival: '2026-01-25T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2408', item: 'Mattress', issueDate: '2023-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2408', item: 'Room Key Set', issueDate: '2023-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2409',
    rollNumber: '25EC2409',
    fullName: 'Tanmay Saxena',
    gender: 'Male',
    dateOfBirth: '2006-04-16',
    email: 'tanmay.saxena.2409@university.edu',
    phoneNumber: '+91-9871102409',
    bloodGroup: 'AB-',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.62,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-O',
      roomNumber: 'O-301',
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
      transactionRef: 'TXN-O2409-99401'
    },
    guardianContact: {
      name: 'Ashutosh Saxena',
      relationship: 'Father',
      phone: '+91-9810024090',
      email: 'ashu.sax@example.com',
      address: {
        street: '72 Malviya Nagar',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302017'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-O-2409'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2409', item: 'Mattress', issueDate: '2025-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2409', item: 'Room Key Set', issueDate: '2025-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2410',
    rollNumber: '24EE2410',
    fullName: 'Ushashi Ganguly',
    gender: 'Female',
    dateOfBirth: '2005-10-24',
    email: 'ushashi.ganguly.2410@university.edu',
    phoneNumber: '+91-9871102410',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Electrical Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.34,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-P',
      roomNumber: 'P-301',
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
      transactionRef: 'TXN-P2410-11829'
    },
    guardianContact: {
      name: 'Shibaji Ganguly',
      relationship: 'Father',
      phone: '+91-9810024100',
      email: 'shibaji.g@example.com',
      address: {
        street: '88 Salt Lake Sector 2',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700091'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 177,
      percentage: 98.33,
      biometricId: 'BIO-P-2410'
    },
    gatePasses: [
      {
        passId: 'GP-2410-01',
        type: 'Outing',
        departure: '2026-02-17T14:00:00Z',
        arrival: '2026-02-17T18:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2410', item: 'Mattress', issueDate: '2024-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2410', item: 'Room Key Set', issueDate: '2024-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2411',
    rollNumber: '23CS2411',
    fullName: 'Vaibhav Shinde',
    gender: 'Male',
    dateOfBirth: '2004-07-16',
    email: 'vaibhav.shinde.2411@university.edu',
    phoneNumber: '+91-9871102411',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.57,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-O',
      roomNumber: 'O-302',
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
      transactionRef: 'TXN-O2411-77291'
    },
    guardianContact: {
      name: 'Ashok Shinde',
      relationship: 'Father',
      phone: '+91-9810024110',
      email: 'ashok.shinde@example.com',
      address: {
        street: '22 Gangapur Road',
        city: 'Nashik',
        state: 'Maharashtra',
        pincode: '422005'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 171,
      percentage: 95.0,
      biometricId: 'BIO-O-2411'
    },
    gatePasses: [
      {
        passId: 'GP-2411-01',
        type: 'Outing',
        departure: '2026-02-12T13:30:00Z',
        arrival: '2026-02-12T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2411', item: 'Mattress', issueDate: '2023-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2411', item: 'Room Key Set', issueDate: '2023-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2412',
    rollNumber: '25AI2412',
    fullName: 'Zoya Fathima',
    gender: 'Female',
    dateOfBirth: '2006-01-14',
    email: 'zoya.fathima.2412@university.edu',
    phoneNumber: '+91-9871102412',
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
      block: 'Block-P',
      roomNumber: 'P-302',
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
      transactionRef: 'TXN-P2412-55910'
    },
    guardianContact: {
      name: 'Syed Fathima',
      relationship: 'Father',
      phone: '+91-9810024120',
      email: 'syed.f@example.com',
      address: {
        street: '15 Pulianthope High Rd',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600012'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 177,
      percentage: 98.33,
      biometricId: 'BIO-P-2412'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2412', item: 'Mattress', issueDate: '2025-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2412', item: 'Room Key Set', issueDate: '2025-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  }
];

function getAll() {
  return staticResidentMaster24;
}

function findById(id) {
  return staticResidentMaster24.find(resident => resident.id === id);
}

function filterByBlock(block) {
  return staticResidentMaster24.filter(resident => resident.roomAllocation.block.toLowerCase() === block.toLowerCase());
}

function getStats() {
  const total = staticResidentMaster24.length;
  const paidCount = staticResidentMaster24.filter(r => r.feePayment.paymentStatus === 'Paid').length;
  const partialCount = staticResidentMaster24.filter(r => r.feePayment.paymentStatus === 'Partial').length;
  const avgAttendance = staticResidentMaster24.reduce((acc, curr) => acc + curr.attendance.percentage, 0) / total;
  return {
    totalResidents: total,
    fullyPaidCount: paidCount,
    partialPaidCount: partialCount,
    averageAttendance: parseFloat(avgAttendance.toFixed(2))
  };
}

module.exports = {
  staticResidentMaster24,
  getAll,
  findById,
  filterByBlock,
  getStats
};
