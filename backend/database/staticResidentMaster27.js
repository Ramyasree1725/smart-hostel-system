'use strict';

/**
 * Static Resident Master Dataset - Batch 27
 * Provides static resident records and query utility functions for Block-U and Block-V residents.
 */

const staticResidentMaster27 = [
  {
    id: 'RES-2701',
    rollNumber: '23CS2701',
    fullName: 'Omkar Goswami',
    gender: 'Male',
    dateOfBirth: '2004-05-18',
    email: 'omkar.goswami.2701@university.edu',
    phoneNumber: '+91-9871102701',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.86,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-U',
      roomNumber: 'U-101',
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
      transactionRef: 'TXN-U2701-11829'
    },
    guardianContact: {
      name: 'Bhupendra Goswami',
      relationship: 'Father',
      phone: '+91-9810027010',
      email: 'bhupen.g@example.com',
      address: {
        street: '14 Ashram Road',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380009'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-U-2701'
    },
    gatePasses: [
      {
        passId: 'GP-2701-01',
        type: 'Outing',
        departure: '2026-02-14T14:00:00Z',
        arrival: '2026-02-14T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2701', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2701', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2702',
    rollNumber: '23EC2702',
    fullName: 'Pavithra Krishnaswamy',
    gender: 'Female',
    dateOfBirth: '2004-10-22',
    email: 'pavithra.krishna.2702@university.edu',
    phoneNumber: '+91-9871102702',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 9.38,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-V',
      roomNumber: 'V-101',
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
      transactionRef: 'TXN-V2702-88291'
    },
    guardianContact: {
      name: 'S. Krishnaswamy',
      relationship: 'Father',
      phone: '+91-9810027020',
      email: 's.krishna@example.com',
      address: {
        street: '45 Raja Annamalai Puram',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600028'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 177,
      percentage: 98.33,
      biometricId: 'BIO-V-2702'
    },
    gatePasses: [
      {
        passId: 'GP-2702-01',
        type: 'Home Visit',
        departure: '2026-01-18T08:00:00Z',
        arrival: '2026-01-23T20:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2702', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2702', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2703',
    rollNumber: '24IT2703',
    fullName: 'Piyush Rathore',
    gender: 'Male',
    dateOfBirth: '2005-02-19',
    email: 'piyush.rathore.2703@university.edu',
    phoneNumber: '+91-9871102703',
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
      block: 'Block-U',
      roomNumber: 'U-102',
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
      transactionRef: 'TXN-U2703-44581'
    },
    guardianContact: {
      name: 'Karnail Rathore',
      relationship: 'Father',
      phone: '+91-9810027030',
      email: 'karnail.r@example.com',
      address: {
        street: '89 Polo Ground',
        city: 'Indore',
        state: 'Madhya Pradesh',
        pincode: '452015'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 167,
      percentage: 92.78,
      biometricId: 'BIO-U-2703'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2703', item: 'Mattress', issueDate: '2024-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2703', item: 'Room Key Set', issueDate: '2024-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2704',
    rollNumber: '24AI2704',
    fullName: 'Prerna Singhania',
    gender: 'Female',
    dateOfBirth: '2005-08-16',
    email: 'prerna.singhania.2704@university.edu',
    phoneNumber: '+91-9871102704',
    bloodGroup: 'AB+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.12,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-V',
      roomNumber: 'V-102',
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
      transactionRef: 'TXN-V2704-99102'
    },
    guardianContact: {
      name: 'Vipin Singhania',
      relationship: 'Father',
      phone: '+91-9810027040',
      email: 'vipin.s@example.com',
      address: {
        street: '34 Civil Lines',
        city: 'Bareilly',
        state: 'Uttar Pradesh',
        pincode: '243001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 172,
      percentage: 95.56,
      biometricId: 'BIO-V-2704'
    },
    gatePasses: [
      {
        passId: 'GP-2704-01',
        type: 'Outing',
        departure: '2026-02-12T14:30:00Z',
        arrival: '2026-02-12T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2704', item: 'Mattress', issueDate: '2024-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2704', item: 'Room Key Set', issueDate: '2024-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2705',
    rollNumber: '23ME2705',
    fullName: 'Rajat Khandelwal',
    gender: 'Male',
    dateOfBirth: '2004-04-05',
    email: 'rajat.khandelwal.2705@university.edu',
    phoneNumber: '+91-9871102705',
    bloodGroup: 'O-',
    academicDetails: {
      department: 'Mechanical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 7.84,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-U',
      roomNumber: 'U-201',
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
      transactionRef: 'TXN-U2705-77291'
    },
    guardianContact: {
      name: 'Om Prakash Khandelwal',
      relationship: 'Father',
      phone: '+91-9810027050',
      email: 'op.khandelwal@example.com',
      address: {
        street: '12 Tonk Phatak',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302015'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 166,
      percentage: 92.22,
      biometricId: 'BIO-U-2705'
    },
    gatePasses: [
      {
        passId: 'GP-2705-01',
        type: 'Outing',
        departure: '2026-02-11T12:00:00Z',
        arrival: '2026-02-11T17:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2705', item: 'Mattress', issueDate: '2023-08-05', condition: 'Good' },
      { itemId: 'INV-KEY-2705', item: 'Room Key Set', issueDate: '2023-08-05', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2706',
    rollNumber: '25CS2706',
    fullName: 'Roshni Sengupta',
    gender: 'Female',
    dateOfBirth: '2006-07-29',
    email: 'roshni.sengupta.2706@university.edu',
    phoneNumber: '+91-9871102706',
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
      block: 'Block-V',
      roomNumber: 'V-201',
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
      transactionRef: 'TXN-V2706-38291'
    },
    guardianContact: {
      name: 'Samir Sengupta',
      relationship: 'Father',
      phone: '+91-9810027060',
      email: 'samir.s@example.com',
      address: {
        street: '77 Deshapriya Park',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700029'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 175,
      percentage: 97.22,
      biometricId: 'BIO-V-2706'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2706', item: 'Mattress', issueDate: '2025-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2706', item: 'Room Key Set', issueDate: '2025-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2707',
    rollNumber: '24CE2707',
    fullName: 'Samiullah Ansari',
    gender: 'Male',
    dateOfBirth: '2005-05-19',
    email: 'samiullah.ansari.2707@university.edu',
    phoneNumber: '+91-9871102707',
    bloodGroup: 'B-',
    academicDetails: {
      department: 'Civil Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.25,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-U',
      roomNumber: 'U-202',
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
      transactionRef: 'TXN-U2707-66291'
    },
    guardianContact: {
      name: 'Junaid Ansari',
      relationship: 'Father',
      phone: '+91-9810027070',
      email: 'junaid.a@example.com',
      address: {
        street: '55 Madanpura',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400008'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 168,
      percentage: 93.33,
      biometricId: 'BIO-U-2707'
    },
    gatePasses: [
      {
        passId: 'GP-2707-01',
        type: 'Outing',
        departure: '2026-02-15T14:00:00Z',
        arrival: '2026-02-15T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2707', item: 'Mattress', issueDate: '2024-08-04', condition: 'Good' },
      { itemId: 'INV-KEY-2707', item: 'Room Key Set', issueDate: '2024-08-04', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2708',
    rollNumber: '23CH2708',
    fullName: 'Sharmila Sundaram',
    gender: 'Female',
    dateOfBirth: '2004-11-19',
    email: 'sharmila.sundaram.2708@university.edu',
    phoneNumber: '+91-9871102708',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Chemical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.91,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-V',
      roomNumber: 'V-202',
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
      transactionRef: 'TXN-V2708-33829'
    },
    guardianContact: {
      name: 'P. Sundaram',
      relationship: 'Father',
      phone: '+91-9810027080',
      email: 'p.sundaram@example.com',
      address: {
        street: '88 KK Nagar',
        city: 'Madurai',
        state: 'Tamil Nadu',
        pincode: '625020'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 174,
      percentage: 96.67,
      biometricId: 'BIO-V-2708'
    },
    gatePasses: [
      {
        passId: 'GP-2708-01',
        type: 'Home Visit',
        departure: '2026-01-20T09:00:00Z',
        arrival: '2026-01-24T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2708', item: 'Mattress', issueDate: '2023-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2708', item: 'Room Key Set', issueDate: '2023-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2709',
    rollNumber: '25EC2709',
    fullName: 'Shreyas Nadkarni',
    gender: 'Male',
    dateOfBirth: '2006-03-24',
    email: 'shreyas.nadkarni.2709@university.edu',
    phoneNumber: '+91-9871102709',
    bloodGroup: 'AB-',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.65,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-U',
      roomNumber: 'U-301',
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
      transactionRef: 'TXN-U2709-99401'
    },
    guardianContact: {
      name: 'Milind Nadkarni',
      relationship: 'Father',
      phone: '+91-9810027090',
      email: 'milind.n@example.com',
      address: {
        street: '15 Miramar Beach Road',
        city: 'Panaji',
        state: 'Goa',
        pincode: '403001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-U-2709'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2709', item: 'Mattress', issueDate: '2025-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2709', item: 'Room Key Set', issueDate: '2025-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2710',
    rollNumber: '24EE2710',
    fullName: 'Snehal Deshmukh',
    gender: 'Female',
    dateOfBirth: '2005-09-02',
    email: 'snehal.deshmukh.2710@university.edu',
    phoneNumber: '+91-9871102710',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Electrical Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.36,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-V',
      roomNumber: 'V-301',
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
      transactionRef: 'TXN-V2710-11829'
    },
    guardianContact: {
      name: 'Ashok Deshmukh',
      relationship: 'Father',
      phone: '+91-9810027100',
      email: 'ashok.d@example.com',
      address: {
        street: '34 Tilak Road',
        city: 'Akola',
        state: 'Maharashtra',
        pincode: '444001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 178,
      percentage: 98.89,
      biometricId: 'BIO-V-2710'
    },
    gatePasses: [
      {
        passId: 'GP-2710-01',
        type: 'Outing',
        departure: '2026-02-18T14:00:00Z',
        arrival: '2026-02-18T18:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2710', item: 'Mattress', issueDate: '2024-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2710', item: 'Room Key Set', issueDate: '2024-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2711',
    rollNumber: '23CS2711',
    fullName: 'Siddhant Mahajan',
    gender: 'Male',
    dateOfBirth: '2004-06-18',
    email: 'siddhant.mahajan.2711@university.edu',
    phoneNumber: '+91-9871102711',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.62,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-U',
      roomNumber: 'U-302',
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
      transactionRef: 'TXN-U2711-77291'
    },
    guardianContact: {
      name: 'Nitin Mahajan',
      relationship: 'Father',
      phone: '+91-9810027110',
      email: 'nitin.m@example.com',
      address: {
        street: '12 Shivaji Nagar',
        city: 'Jalgaon',
        state: 'Maharashtra',
        pincode: '425001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 171,
      percentage: 95.0,
      biometricId: 'BIO-U-2711'
    },
    gatePasses: [
      {
        passId: 'GP-2711-01',
        type: 'Outing',
        departure: '2026-02-12T13:30:00Z',
        arrival: '2026-02-12T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2711', item: 'Mattress', issueDate: '2023-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2711', item: 'Room Key Set', issueDate: '2023-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2712',
    rollNumber: '25AI2712',
    fullName: 'Tara Ramanathan',
    gender: 'Female',
    dateOfBirth: '2006-03-05',
    email: 'tara.ramanathan.2712@university.edu',
    phoneNumber: '+91-9871102712',
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
      block: 'Block-V',
      roomNumber: 'V-302',
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
      transactionRef: 'TXN-V2712-55910'
    },
    guardianContact: {
      name: 'R. Ramanathan',
      relationship: 'Father',
      phone: '+91-9810027120',
      email: 'r.ramanathan@example.com',
      address: {
        street: '8 West Mambalam',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600033'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 177,
      percentage: 98.33,
      biometricId: 'BIO-V-2712'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2712', item: 'Mattress', issueDate: '2025-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2712', item: 'Room Key Set', issueDate: '2025-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  }
];

function getAll() {
  return staticResidentMaster27;
}

function findById(id) {
  return staticResidentMaster27.find(resident => resident.id === id);
}

function filterByBlock(block) {
  return staticResidentMaster27.filter(resident => resident.roomAllocation.block.toLowerCase() === block.toLowerCase());
}

function getStats() {
  const total = staticResidentMaster27.length;
  const paidCount = staticResidentMaster27.filter(r => r.feePayment.paymentStatus === 'Paid').length;
  const partialCount = staticResidentMaster27.filter(r => r.feePayment.paymentStatus === 'Partial').length;
  const avgAttendance = staticResidentMaster27.reduce((acc, curr) => acc + curr.attendance.percentage, 0) / total;
  return {
    totalResidents: total,
    fullyPaidCount: paidCount,
    partialPaidCount: partialCount,
    averageAttendance: parseFloat(avgAttendance.toFixed(2))
  };
}

module.exports = {
  staticResidentMaster27,
  getAll,
  findById,
  filterByBlock,
  getStats
};
