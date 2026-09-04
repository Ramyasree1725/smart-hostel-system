'use strict';

/**
 * Static Resident Master Dataset - Batch 21
 * Provides static resident records and query utility functions for Block-I and Block-J residents.
 */

const staticResidentMaster21 = [
  {
    id: 'RES-2101',
    rollNumber: '23CS2101',
    fullName: 'Abhishek Roy',
    gender: 'Male',
    dateOfBirth: '2004-04-12',
    email: 'abhishek.roy.2101@university.edu',
    phoneNumber: '+91-9871102101',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.85,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-I',
      roomNumber: 'I-101',
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
      transactionRef: 'TXN-I2101-18293'
    },
    guardianContact: {
      name: 'Subir Roy',
      relationship: 'Father',
      phone: '+91-9810021010',
      email: 'subir.roy@example.com',
      address: {
        street: '23 Gariahat Road',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700019'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-I-2101'
    },
    gatePasses: [
      {
        passId: 'GP-2101-01',
        type: 'Outing',
        departure: '2026-02-12T14:00:00Z',
        arrival: '2026-02-12T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2101', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2101', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2102',
    rollNumber: '23EC2102',
    fullName: 'Binita Mahapatra',
    gender: 'Female',
    dateOfBirth: '2004-10-09',
    email: 'binita.maha.2102@university.edu',
    phoneNumber: '+91-9871102102',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 9.24,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-J',
      roomNumber: 'J-101',
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
      transactionRef: 'TXN-J2102-49102'
    },
    guardianContact: {
      name: 'Pradeep Mahapatra',
      relationship: 'Father',
      phone: '+91-9810021020',
      email: 'pradeep.m@example.com',
      address: {
        street: '14 Saheed Nagar',
        city: 'Bhubaneswar',
        state: 'Odisha',
        pincode: '751007'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 176,
      percentage: 97.78,
      biometricId: 'BIO-J-2102'
    },
    gatePasses: [
      {
        passId: 'GP-2102-01',
        type: 'Home Visit',
        departure: '2026-01-20T08:00:00Z',
        arrival: '2026-01-25T20:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2102', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2102', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2103',
    rollNumber: '24IT2103',
    fullName: 'Chetan Bhardwaj',
    gender: 'Male',
    dateOfBirth: '2005-02-28',
    email: 'chetan.bhardwaj.2103@university.edu',
    phoneNumber: '+91-9871102103',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Information Technology',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.42,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-I',
      roomNumber: 'I-102',
      bedNumber: 'Bed-B',
      floor: 1,
      roomType: 'Double Non-AC',
      checkInDate: '2024-08-02',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 80000,
      paidAmount: 80000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-28',
      transactionRef: 'TXN-I2103-66291'
    },
    guardianContact: {
      name: 'Rakesh Bhardwaj',
      relationship: 'Father',
      phone: '+91-9810021030',
      email: 'rakesh.b@example.com',
      address: {
        street: '89 Sector 21',
        city: 'Noida',
        state: 'Uttar Pradesh',
        pincode: '201301'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 167,
      percentage: 92.78,
      biometricId: 'BIO-I-2103'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2103', item: 'Mattress', issueDate: '2024-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2103', item: 'Room Key Set', issueDate: '2024-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2104',
    rollNumber: '24AI2104',
    fullName: 'Deepika Murthy',
    gender: 'Female',
    dateOfBirth: '2005-08-14',
    email: 'deepika.murthy.2104@university.edu',
    phoneNumber: '+91-9871102104',
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
      block: 'Block-J',
      roomNumber: 'J-102',
      bedNumber: 'Bed-A',
      floor: 1,
      roomType: 'Double AC',
      checkInDate: '2024-08-03',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 95000,
      paidAmount: 50000,
      dueAmount: 45000,
      paymentStatus: 'Partial',
      lastPaymentDate: '2025-08-09',
      transactionRef: 'TXN-J2104-99102'
    },
    guardianContact: {
      name: 'N. Murthy',
      relationship: 'Father',
      phone: '+91-9810021040',
      email: 'n.murthy@example.com',
      address: {
        street: '76 Basavanagudi Bull Temple Rd',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560004'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 172,
      percentage: 95.56,
      biometricId: 'BIO-J-2104'
    },
    gatePasses: [
      {
        passId: 'GP-2104-01',
        type: 'Outing',
        departure: '2026-02-15T15:00:00Z',
        arrival: '2026-02-15T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2104', item: 'Mattress', issueDate: '2024-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2104', item: 'Room Key Set', issueDate: '2024-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2105',
    rollNumber: '23ME2105',
    fullName: 'Ekansh Chawla',
    gender: 'Male',
    dateOfBirth: '2004-05-17',
    email: 'ekansh.chawla.2105@university.edu',
    phoneNumber: '+91-9871102105',
    bloodGroup: 'O-',
    academicDetails: {
      department: 'Mechanical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 7.96,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-I',
      roomNumber: 'I-201',
      bedNumber: 'Bed-A',
      floor: 2,
      roomType: 'Triple Non-AC',
      checkInDate: '2023-08-04',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 70000,
      paidAmount: 70000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-23',
      transactionRef: 'TXN-I2105-33819'
    },
    guardianContact: {
      name: 'Harish Chawla',
      relationship: 'Father',
      phone: '+91-9810021050',
      email: 'harish.c@example.com',
      address: {
        street: '102 Civil Lines',
        city: 'Gurugram',
        state: 'Haryana',
        pincode: '122001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 166,
      percentage: 92.22,
      biometricId: 'BIO-I-2105'
    },
    gatePasses: [
      {
        passId: 'GP-2105-01',
        type: 'Outing',
        departure: '2026-02-10T11:00:00Z',
        arrival: '2026-02-10T17:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2105', item: 'Mattress', issueDate: '2023-08-04', condition: 'Good' },
      { itemId: 'INV-KEY-2105', item: 'Room Key Set', issueDate: '2023-08-04', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2106',
    rollNumber: '25CS2106',
    fullName: 'Farheen Sultana',
    gender: 'Female',
    dateOfBirth: '2006-03-24',
    email: 'farheen.sultana.2106@university.edu',
    phoneNumber: '+91-9871102106',
    bloodGroup: 'A-',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.94,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-J',
      roomNumber: 'J-201',
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
      transactionRef: 'TXN-J2106-77810'
    },
    guardianContact: {
      name: 'Mohammed Mansoor',
      relationship: 'Father',
      phone: '+91-9810021060',
      email: 'm.mansoor@example.com',
      address: {
        street: '33 Banjara Hills Rd 12',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500034'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 175,
      percentage: 97.22,
      biometricId: 'BIO-J-2106'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2106', item: 'Mattress', issueDate: '2025-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2106', item: 'Room Key Set', issueDate: '2025-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2107',
    rollNumber: '24CE2107',
    fullName: 'Girish Chandra',
    gender: 'Male',
    dateOfBirth: '2005-09-12',
    email: 'girish.chandra.2107@university.edu',
    phoneNumber: '+91-9871102107',
    bloodGroup: 'B-',
    academicDetails: {
      department: 'Civil Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.21,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-I',
      roomNumber: 'I-202',
      bedNumber: 'Bed-B',
      floor: 2,
      roomType: 'Double Non-AC',
      checkInDate: '2024-08-05',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 80000,
      paidAmount: 80000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-26',
      transactionRef: 'TXN-I2107-11928'
    },
    guardianContact: {
      name: 'R. Chandra',
      relationship: 'Father',
      phone: '+91-9810021070',
      email: 'r.chandra@example.com',
      address: {
        street: '45 Rajpur Road',
        city: 'Dehradun',
        state: 'Uttarakhand',
        pincode: '248001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 168,
      percentage: 93.33,
      biometricId: 'BIO-I-2107'
    },
    gatePasses: [
      {
        passId: 'GP-2107-01',
        type: 'Outing',
        departure: '2026-02-14T14:00:00Z',
        arrival: '2026-02-14T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2107', item: 'Mattress', issueDate: '2024-08-05', condition: 'Good' },
      { itemId: 'INV-KEY-2107', item: 'Room Key Set', issueDate: '2024-08-05', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2108',
    rollNumber: '23CH2108',
    fullName: 'Harshita Bose',
    gender: 'Female',
    dateOfBirth: '2004-11-05',
    email: 'harshita.bose.2108@university.edu',
    phoneNumber: '+91-9871102108',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Chemical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.89,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-J',
      roomNumber: 'J-202',
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
      transactionRef: 'TXN-J2108-55619'
    },
    guardianContact: {
      name: 'Debashis Bose',
      relationship: 'Father',
      phone: '+91-9810021080',
      email: 'debashis.b@example.com',
      address: {
        street: '88 Southern Avenue',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700029'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 174,
      percentage: 96.67,
      biometricId: 'BIO-J-2108'
    },
    gatePasses: [
      {
        passId: 'GP-2108-01',
        type: 'Home Visit',
        departure: '2026-01-21T09:00:00Z',
        arrival: '2026-01-26T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2108', item: 'Mattress', issueDate: '2023-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2108', item: 'Room Key Set', issueDate: '2023-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2109',
    rollNumber: '25EC2109',
    fullName: 'Indrajeet Ghosh',
    gender: 'Male',
    dateOfBirth: '2006-07-08',
    email: 'indrajeet.ghosh.2109@university.edu',
    phoneNumber: '+91-9871102109',
    bloodGroup: 'AB-',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.61,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-I',
      roomNumber: 'I-301',
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
      transactionRef: 'TXN-I2109-88301'
    },
    guardianContact: {
      name: 'Partha Ghosh',
      relationship: 'Father',
      phone: '+91-9810021090',
      email: 'p.ghosh@example.com',
      address: {
        street: '19 Park Circus',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700017'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 172,
      percentage: 95.56,
      biometricId: 'BIO-I-2109'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2109', item: 'Mattress', issueDate: '2025-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2109', item: 'Room Key Set', issueDate: '2025-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2110',
    rollNumber: '24EE2110',
    fullName: 'Jaya Lakshmi',
    gender: 'Female',
    dateOfBirth: '2005-12-01',
    email: 'jaya.lakshmi.2110@university.edu',
    phoneNumber: '+91-9871102110',
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
      block: 'Block-J',
      roomNumber: 'J-301',
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
      transactionRef: 'TXN-J2110-33291'
    },
    guardianContact: {
      name: 'K. Balakrishnan',
      relationship: 'Father',
      phone: '+91-9810021100',
      email: 'k.balan@example.com',
      address: {
        street: '12 Anna Nagar West',
        city: 'Madurai',
        state: 'Tamil Nadu',
        pincode: '625020'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 178,
      percentage: 98.89,
      biometricId: 'BIO-J-2110'
    },
    gatePasses: [
      {
        passId: 'GP-2110-01',
        type: 'Outing',
        departure: '2026-02-16T13:00:00Z',
        arrival: '2026-02-16T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2110', item: 'Mattress', issueDate: '2024-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2110', item: 'Room Key Set', issueDate: '2024-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2111',
    rollNumber: '23CS2111',
    fullName: 'Kunal Singhania',
    gender: 'Male',
    dateOfBirth: '2004-08-20',
    email: 'kunal.singh.2111@university.edu',
    phoneNumber: '+91-9871102111',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.58,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-I',
      roomNumber: 'I-302',
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
      lastPaymentDate: '2025-07-18',
      transactionRef: 'TXN-I2111-99201'
    },
    guardianContact: {
      name: 'Ashok Singhania',
      relationship: 'Father',
      phone: '+91-9810021110',
      email: 'ashok.s@example.com',
      address: {
        street: '61 Civil Lines',
        city: 'Kanpur',
        state: 'Uttar Pradesh',
        pincode: '208001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 170,
      percentage: 94.44,
      biometricId: 'BIO-I-2111'
    },
    gatePasses: [
      {
        passId: 'GP-2111-01',
        type: 'Outing',
        departure: '2026-02-11T14:30:00Z',
        arrival: '2026-02-11T19:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2111', item: 'Mattress', issueDate: '2023-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2111', item: 'Room Key Set', issueDate: '2023-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2112',
    rollNumber: '25AI2112',
    fullName: 'Lipika Barman',
    gender: 'Female',
    dateOfBirth: '2006-06-30',
    email: 'lipika.barman.2112@university.edu',
    phoneNumber: '+91-9871102112',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 9.05,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-J',
      roomNumber: 'J-302',
      bedNumber: 'Bed-B',
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
      transactionRef: 'TXN-J2112-44581'
    },
    guardianContact: {
      name: 'Nripendra Barman',
      relationship: 'Father',
      phone: '+91-9810021120',
      email: 'nripendra.b@example.com',
      address: {
        street: '18 Zoo Road',
        city: 'Guwahati',
        state: 'Assam',
        pincode: '781024'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 177,
      percentage: 98.33,
      biometricId: 'BIO-J-2112'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2112', item: 'Mattress', issueDate: '2025-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2112', item: 'Room Key Set', issueDate: '2025-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  }
];

function getAll() {
  return staticResidentMaster21;
}

function findById(id) {
  return staticResidentMaster21.find(resident => resident.id === id);
}

function filterByBlock(block) {
  return staticResidentMaster21.filter(resident => resident.roomAllocation.block.toLowerCase() === block.toLowerCase());
}

function getStats() {
  const total = staticResidentMaster21.length;
  const paidCount = staticResidentMaster21.filter(r => r.feePayment.paymentStatus === 'Paid').length;
  const partialCount = staticResidentMaster21.filter(r => r.feePayment.paymentStatus === 'Partial').length;
  const avgAttendance = staticResidentMaster21.reduce((acc, curr) => acc + curr.attendance.percentage, 0) / total;
  return {
    totalResidents: total,
    fullyPaidCount: paidCount,
    partialPaidCount: partialCount,
    averageAttendance: parseFloat(avgAttendance.toFixed(2))
  };
}

module.exports = {
  staticResidentMaster21,
  getAll,
  findById,
  filterByBlock,
  getStats
};
