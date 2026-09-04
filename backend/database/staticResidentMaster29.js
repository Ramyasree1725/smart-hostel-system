'use strict';

/**
 * Static Resident Master Dataset - Batch 29
 * Provides static resident records and query utility functions for Block-Y and Block-Z residents.
 */

const staticResidentMaster29 = [
  {
    id: 'RES-2901',
    rollNumber: '23CS2901',
    fullName: 'Daksh Sethi',
    gender: 'Male',
    dateOfBirth: '2004-06-14',
    email: 'daksh.sethi.2901@university.edu',
    phoneNumber: '+91-9871102901',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.88,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-Y',
      roomNumber: 'Y-101',
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
      transactionRef: 'TXN-Y2901-11829'
    },
    guardianContact: {
      name: 'Gulshan Sethi',
      relationship: 'Father',
      phone: '+91-9810029010',
      email: 'gulshan.s@example.com',
      address: {
        street: '14 Model Town',
        city: 'Jalandhar',
        state: 'Punjab',
        pincode: '144003'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-Y-2901'
    },
    gatePasses: [
      {
        passId: 'GP-2901-01',
        type: 'Outing',
        departure: '2026-02-14T14:00:00Z',
        arrival: '2026-02-14T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2901', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2901', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2902',
    rollNumber: '23EC2902',
    fullName: 'Devika Pillai',
    gender: 'Female',
    dateOfBirth: '2004-11-14',
    email: 'devika.pillai.2902@university.edu',
    phoneNumber: '+91-9871102902',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 9.36,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-Z',
      roomNumber: 'Z-101',
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
      transactionRef: 'TXN-Z2902-88291'
    },
    guardianContact: {
      name: 'K. Pillai',
      relationship: 'Father',
      phone: '+91-9810029020',
      email: 'k.pillai@example.com',
      address: {
        street: '45 MG Road',
        city: 'Kollam',
        state: 'Kerala',
        pincode: '691001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 177,
      percentage: 98.33,
      biometricId: 'BIO-Z-2902'
    },
    gatePasses: [
      {
        passId: 'GP-2902-01',
        type: 'Home Visit',
        departure: '2026-01-18T08:00:00Z',
        arrival: '2026-01-23T20:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2902', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2902', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2903',
    rollNumber: '24IT2903',
    fullName: 'Eklavya Bhatt',
    gender: 'Male',
    dateOfBirth: '2005-02-14',
    email: 'eklavya.bhatt.2903@university.edu',
    phoneNumber: '+91-9871102903',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Information Technology',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.34,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-Y',
      roomNumber: 'Y-102',
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
      transactionRef: 'TXN-Y2903-44581'
    },
    guardianContact: {
      name: 'Pravinchandra Bhatt',
      relationship: 'Father',
      phone: '+91-9810029030',
      email: 'pravin.b@example.com',
      address: {
        street: '89 Gotri Road',
        city: 'Vadodara',
        state: 'Gujarat',
        pincode: '390021'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 167,
      percentage: 92.78,
      biometricId: 'BIO-Y-2903'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2903', item: 'Mattress', issueDate: '2024-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2903', item: 'Room Key Set', issueDate: '2024-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2904',
    rollNumber: '24AI2904',
    fullName: 'Ekta Grover',
    gender: 'Female',
    dateOfBirth: '2005-08-20',
    email: 'ekta.grover.2904@university.edu',
    phoneNumber: '+91-9871102904',
    bloodGroup: 'AB+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.13,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-Z',
      roomNumber: 'Z-102',
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
      transactionRef: 'TXN-Z2904-99102'
    },
    guardianContact: {
      name: 'Ashwani Grover',
      relationship: 'Father',
      phone: '+91-9810029040',
      email: 'ashwani.g@example.com',
      address: {
        street: '34 Sector 22',
        city: 'Chandigarh',
        state: 'Punjab',
        pincode: '160022'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 172,
      percentage: 95.56,
      biometricId: 'BIO-Z-2904'
    },
    gatePasses: [
      {
        passId: 'GP-2904-01',
        type: 'Outing',
        departure: '2026-02-12T14:30:00Z',
        arrival: '2026-02-12T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2904', item: 'Mattress', issueDate: '2024-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2904', item: 'Room Key Set', issueDate: '2024-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2905',
    rollNumber: '23ME2905',
    fullName: 'Farhan Zaidi',
    gender: 'Male',
    dateOfBirth: '2004-05-02',
    email: 'farhan.zaidi.2905@university.edu',
    phoneNumber: '+91-9871102905',
    bloodGroup: 'O-',
    academicDetails: {
      department: 'Mechanical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 7.83,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-Y',
      roomNumber: 'Y-201',
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
      transactionRef: 'TXN-Y2905-77291'
    },
    guardianContact: {
      name: 'Syed Zaidi',
      relationship: 'Father',
      phone: '+91-9810029050',
      email: 'syed.z@example.com',
      address: {
        street: '12 Aminabad',
        city: 'Lucknow',
        state: 'Uttar Pradesh',
        pincode: '226018'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 166,
      percentage: 92.22,
      biometricId: 'BIO-Y-2905'
    },
    gatePasses: [
      {
        passId: 'GP-2905-01',
        type: 'Outing',
        departure: '2026-02-11T12:00:00Z',
        arrival: '2026-02-11T17:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2905', item: 'Mattress', issueDate: '2023-08-05', condition: 'Good' },
      { itemId: 'INV-KEY-2905', item: 'Room Key Set', issueDate: '2023-08-05', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2906',
    rollNumber: '25CS2906',
    fullName: 'Garima Saxena',
    gender: 'Female',
    dateOfBirth: '2006-08-03',
    email: 'garima.saxena.2906@university.edu',
    phoneNumber: '+91-9871102906',
    bloodGroup: 'A-',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.93,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-Z',
      roomNumber: 'Z-201',
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
      transactionRef: 'TXN-Z2906-38291'
    },
    guardianContact: {
      name: 'Alok Saxena',
      relationship: 'Father',
      phone: '+91-9810029060',
      email: 'alok.saxena@example.com',
      address: {
        street: '77 Saket Nagar',
        city: 'Kanpur',
        state: 'Uttar Pradesh',
        pincode: '208014'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 175,
      percentage: 97.22,
      biometricId: 'BIO-Z-2906'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2906', item: 'Mattress', issueDate: '2025-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2906', item: 'Room Key Set', issueDate: '2025-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2907',
    rollNumber: '24CE2907',
    fullName: 'Govind Swamy',
    gender: 'Male',
    dateOfBirth: '2005-04-26',
    email: 'govind.swamy.2907@university.edu',
    phoneNumber: '+91-9871102907',
    bloodGroup: 'B-',
    academicDetails: {
      department: 'Civil Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.27,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-Y',
      roomNumber: 'Y-202',
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
      transactionRef: 'TXN-Y2907-66291'
    },
    guardianContact: {
      name: 'V. Swamy',
      relationship: 'Father',
      phone: '+91-9810029070',
      email: 'v.swamy@example.com',
      address: {
        street: '55 RS Puram',
        city: 'Coimbatore',
        state: 'Tamil Nadu',
        pincode: '641002'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 168,
      percentage: 93.33,
      biometricId: 'BIO-Y-2907'
    },
    gatePasses: [
      {
        passId: 'GP-2907-01',
        type: 'Outing',
        departure: '2026-02-15T14:00:00Z',
        arrival: '2026-02-15T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2907', item: 'Mattress', issueDate: '2024-08-04', condition: 'Good' },
      { itemId: 'INV-KEY-2907', item: 'Room Key Set', issueDate: '2024-08-04', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2908',
    rollNumber: '23CH2908',
    fullName: 'Harini Balan',
    gender: 'Female',
    dateOfBirth: '2004-11-09',
    email: 'harini.balan.2908@university.edu',
    phoneNumber: '+91-9871102908',
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
      block: 'Block-Z',
      roomNumber: 'Z-202',
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
      transactionRef: 'TXN-Z2908-33829'
    },
    guardianContact: {
      name: 'R. Balan',
      relationship: 'Father',
      phone: '+91-9810029080',
      email: 'r.balan@example.com',
      address: {
        street: '88 Gandhipuram',
        city: 'Coimbatore',
        state: 'Tamil Nadu',
        pincode: '641012'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 174,
      percentage: 96.67,
      biometricId: 'BIO-Z-2908'
    },
    gatePasses: [
      {
        passId: 'GP-2908-01',
        type: 'Home Visit',
        departure: '2026-01-20T09:00:00Z',
        arrival: '2026-01-24T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2908', item: 'Mattress', issueDate: '2023-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2908', item: 'Room Key Set', issueDate: '2023-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2909',
    rollNumber: '25EC2909',
    fullName: 'Harshil Parekh',
    gender: 'Male',
    dateOfBirth: '2006-03-15',
    email: 'harshil.parekh.2909@university.edu',
    phoneNumber: '+91-9871102909',
    bloodGroup: 'AB-',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.63,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-Y',
      roomNumber: 'Y-301',
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
      transactionRef: 'TXN-Y2909-99401'
    },
    guardianContact: {
      name: 'Nitin Parekh',
      relationship: 'Father',
      phone: '+91-9810029090',
      email: 'nitin.parekh@example.com',
      address: {
        street: '15 Paldi Cross Road',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380007'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-Y-2909'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2909', item: 'Mattress', issueDate: '2025-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2909', item: 'Room Key Set', issueDate: '2025-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2910',
    rollNumber: '24EE2910',
    fullName: 'Himani Bhatt',
    gender: 'Female',
    dateOfBirth: '2005-09-29',
    email: 'himani.bhatt.2910@university.edu',
    phoneNumber: '+91-9871102910',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Electrical Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.37,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-Z',
      roomNumber: 'Z-301',
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
      transactionRef: 'TXN-Z2910-11829'
    },
    guardianContact: {
      name: 'Hemant Bhatt',
      relationship: 'Father',
      phone: '+91-9810029100',
      email: 'hemant.bhatt@example.com',
      address: {
        street: '34 Rajpur Road',
        city: 'Dehradun',
        state: 'Uttarakhand',
        pincode: '248001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 178,
      percentage: 98.89,
      biometricId: 'BIO-Z-2910'
    },
    gatePasses: [
      {
        passId: 'GP-2910-01',
        type: 'Outing',
        departure: '2026-02-18T14:00:00Z',
        arrival: '2026-02-18T18:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2910', item: 'Mattress', issueDate: '2024-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2910', item: 'Room Key Set', issueDate: '2024-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2911',
    rollNumber: '23CS2911',
    fullName: 'Ishaan Chadha',
    gender: 'Male',
    dateOfBirth: '2004-06-29',
    email: 'ishaan.chadha.2911@university.edu',
    phoneNumber: '+91-9871102911',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.64,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-Y',
      roomNumber: 'Y-302',
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
      transactionRef: 'TXN-Y2911-77291'
    },
    guardianContact: {
      name: 'Raman Chadha',
      relationship: 'Father',
      phone: '+91-9810029110',
      email: 'raman.c@example.com',
      address: {
        street: '12 Sector 18',
        city: 'Noida',
        state: 'Uttar Pradesh',
        pincode: '201301'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 171,
      percentage: 95.0,
      biometricId: 'BIO-Y-2911'
    },
    gatePasses: [
      {
        passId: 'GP-2911-01',
        type: 'Outing',
        departure: '2026-02-12T13:30:00Z',
        arrival: '2026-02-12T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2911', item: 'Mattress', issueDate: '2023-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2911', item: 'Room Key Set', issueDate: '2023-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2912',
    rollNumber: '25AI2912',
    fullName: 'Janhvi Shrivastava',
    gender: 'Female',
    dateOfBirth: '2006-03-22',
    email: 'janhvi.shri.2912@university.edu',
    phoneNumber: '+91-9871102912',
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
      block: 'Block-Z',
      roomNumber: 'Z-302',
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
      transactionRef: 'TXN-Z2912-55910'
    },
    guardianContact: {
      name: 'Pramod Shrivastava',
      relationship: 'Father',
      phone: '+91-9810029120',
      email: 'pramod.s@example.com',
      address: {
        street: '8 Arera Colony',
        city: 'Bhopal',
        state: 'Madhya Pradesh',
        pincode: '462016'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 177,
      percentage: 98.33,
      biometricId: 'BIO-Z-2912'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2912', item: 'Mattress', issueDate: '2025-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2912', item: 'Room Key Set', issueDate: '2025-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  }
];

function getAll() {
  return staticResidentMaster29;
}

function findById(id) {
  return staticResidentMaster29.find(resident => resident.id === id);
}

function filterByBlock(block) {
  return staticResidentMaster29.filter(resident => resident.roomAllocation.block.toLowerCase() === block.toLowerCase());
}

function getStats() {
  const total = staticResidentMaster29.length;
  const paidCount = staticResidentMaster29.filter(r => r.feePayment.paymentStatus === 'Paid').length;
  const partialCount = staticResidentMaster29.filter(r => r.feePayment.paymentStatus === 'Partial').length;
  const avgAttendance = staticResidentMaster29.reduce((acc, curr) => acc + curr.attendance.percentage, 0) / total;
  return {
    totalResidents: total,
    fullyPaidCount: paidCount,
    partialPaidCount: partialCount,
    averageAttendance: parseFloat(avgAttendance.toFixed(2))
  };
}

module.exports = {
  staticResidentMaster29,
  getAll,
  findById,
  filterByBlock,
  getStats
};
