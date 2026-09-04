'use strict';

/**
 * Static Resident Master Dataset - Batch 28
 * Provides static resident records and query utility functions for Block-W and Block-X residents.
 */

const staticResidentMaster28 = [
  {
    id: 'RES-2801',
    rollNumber: '23CS2801',
    fullName: 'Utkarsh Bhargava',
    gender: 'Male',
    dateOfBirth: '2004-03-29',
    email: 'utkarsh.bhargava.2801@university.edu',
    phoneNumber: '+91-9871102801',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.79,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-W',
      roomNumber: 'W-101',
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
      transactionRef: 'TXN-W2801-19284'
    },
    guardianContact: {
      name: 'Pramod Bhargava',
      relationship: 'Father',
      phone: '+91-9810028010',
      email: 'pramod.b@example.com',
      address: {
        street: '45 Gwalior Road',
        city: 'Jhansi',
        state: 'Uttar Pradesh',
        pincode: '284001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 172,
      percentage: 95.56,
      biometricId: 'BIO-W-2801'
    },
    gatePasses: [
      {
        passId: 'GP-2801-01',
        type: 'Outing',
        departure: '2026-02-13T14:00:00Z',
        arrival: '2026-02-13T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2801', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2801', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2802',
    rollNumber: '23EC2802',
    fullName: 'Uma Sundaresan',
    gender: 'Female',
    dateOfBirth: '2004-09-24',
    email: 'uma.sundaresan.2802@university.edu',
    phoneNumber: '+91-9871102802',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 9.40,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-X',
      roomNumber: 'X-101',
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
      transactionRef: 'TXN-X2802-88291'
    },
    guardianContact: {
      name: 'K. Sundaresan',
      relationship: 'Father',
      phone: '+91-9810028020',
      email: 'k.sundar@example.com',
      address: {
        street: '12 Sastri Nagar',
        city: 'Adyar, Chennai',
        state: 'Tamil Nadu',
        pincode: '600020'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 178,
      percentage: 98.89,
      biometricId: 'BIO-X-2802'
    },
    gatePasses: [
      {
        passId: 'GP-2802-01',
        type: 'Home Visit',
        departure: '2026-01-17T08:00:00Z',
        arrival: '2026-01-21T21:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2802', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2802', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2803',
    rollNumber: '24IT2803',
    fullName: 'Varun Somayaji',
    gender: 'Male',
    dateOfBirth: '2005-03-29',
    email: 'varun.somayaji.2803@university.edu',
    phoneNumber: '+91-9871102803',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Information Technology',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.37,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-W',
      roomNumber: 'W-102',
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
      transactionRef: 'TXN-W2803-55910'
    },
    guardianContact: {
      name: 'R. Somayaji',
      relationship: 'Father',
      phone: '+91-9810028030',
      email: 'r.somayaji@example.com',
      address: {
        street: '78 Malleswaram 8th Main',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560003'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 169,
      percentage: 93.89,
      biometricId: 'BIO-W-2803'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2803', item: 'Mattress', issueDate: '2024-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2803', item: 'Room Key Set', issueDate: '2024-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2804',
    rollNumber: '24AI2804',
    fullName: 'Vandita Mathur',
    gender: 'Female',
    dateOfBirth: '2005-09-12',
    email: 'vandita.mathur.2804@university.edu',
    phoneNumber: '+91-9871102804',
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
      block: 'Block-X',
      roomNumber: 'X-102',
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
      transactionRef: 'TXN-X2804-77218'
    },
    guardianContact: {
      name: 'Pankaj Mathur',
      relationship: 'Father',
      phone: '+91-9810028040',
      email: 'pankaj.m@example.com',
      address: {
        street: '55 C-Scheme Subhash Marg',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-X-2804'
    },
    gatePasses: [
      {
        passId: 'GP-2804-01',
        type: 'Outing',
        departure: '2026-02-13T14:30:00Z',
        arrival: '2026-02-13T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2804', item: 'Mattress', issueDate: '2024-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2804', item: 'Room Key Set', issueDate: '2024-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2805',
    rollNumber: '23ME2805',
    fullName: 'Yogesh Khatri',
    gender: 'Male',
    dateOfBirth: '2004-06-03',
    email: 'yogesh.khatri.2805@university.edu',
    phoneNumber: '+91-9871102805',
    bloodGroup: 'O-',
    academicDetails: {
      department: 'Mechanical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 7.91,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-W',
      roomNumber: 'W-201',
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
      transactionRef: 'TXN-W2805-99201'
    },
    guardianContact: {
      name: 'Madan Khatri',
      relationship: 'Father',
      phone: '+91-9810028050',
      email: 'madan.k@example.com',
      address: {
        street: '22 Nehru Nagar',
        city: 'Bhopal',
        state: 'Madhya Pradesh',
        pincode: '462003'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 165,
      percentage: 91.67,
      biometricId: 'BIO-W-2805'
    },
    gatePasses: [
      {
        passId: 'GP-2805-01',
        type: 'Outing',
        departure: '2026-02-12T11:00:00Z',
        arrival: '2026-02-12T17:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2805', item: 'Mattress', issueDate: '2023-08-05', condition: 'Good' },
      { itemId: 'INV-KEY-2805', item: 'Room Key Set', issueDate: '2023-08-05', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2806',
    rollNumber: '25CS2806',
    fullName: 'Yashasvi Sisodia',
    gender: 'Female',
    dateOfBirth: '2006-03-19',
    email: 'yashasvi.sisodia.2806@university.edu',
    phoneNumber: '+91-9871102806',
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
      block: 'Block-X',
      roomNumber: 'X-201',
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
      transactionRef: 'TXN-X2806-38291'
    },
    guardianContact: {
      name: 'Bhawani Sisodia',
      relationship: 'Father',
      phone: '+91-9810028060',
      email: 'bhawani.s@example.com',
      address: {
        street: '14 Sardarpura',
        city: 'Jodhpur',
        state: 'Rajasthan',
        pincode: '342003'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 176,
      percentage: 97.78,
      biometricId: 'BIO-X-2806'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2806', item: 'Mattress', issueDate: '2025-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2806', item: 'Room Key Set', issueDate: '2025-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2807',
    rollNumber: '24CE2807',
    fullName: 'Zubair Qureshi',
    gender: 'Male',
    dateOfBirth: '2005-08-04',
    email: 'zubair.qureshi.2807@university.edu',
    phoneNumber: '+91-9871102807',
    bloodGroup: 'B-',
    academicDetails: {
      department: 'Civil Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.33,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-W',
      roomNumber: 'W-202',
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
      transactionRef: 'TXN-W2807-64519'
    },
    guardianContact: {
      name: 'Farooq Qureshi',
      relationship: 'Father',
      phone: '+91-9810028070',
      email: 'farooq.q@example.com',
      address: {
        street: '82 Moti Bagh',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110021'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 168,
      percentage: 93.33,
      biometricId: 'BIO-W-2807'
    },
    gatePasses: [
      {
        passId: 'GP-2807-01',
        type: 'Outing',
        departure: '2026-02-15T13:00:00Z',
        arrival: '2026-02-15T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2807', item: 'Mattress', issueDate: '2024-08-04', condition: 'Good' },
      { itemId: 'INV-KEY-2807', item: 'Room Key Set', issueDate: '2024-08-04', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2808',
    rollNumber: '23CH2808',
    fullName: 'Zeenat Parveen',
    gender: 'Female',
    dateOfBirth: '2004-10-29',
    email: 'zeenat.parveen.2808@university.edu',
    phoneNumber: '+91-9871102808',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Chemical Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.93,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-X',
      roomNumber: 'X-202',
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
      transactionRef: 'TXN-X2808-11928'
    },
    guardianContact: {
      name: 'Altaf Hussain',
      relationship: 'Father',
      phone: '+91-9810028080',
      email: 'altaf.h@example.com',
      address: {
        street: '34 Daryaganj',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110002'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 175,
      percentage: 97.22,
      biometricId: 'BIO-X-2808'
    },
    gatePasses: [
      {
        passId: 'GP-2808-01',
        type: 'Home Visit',
        departure: '2026-01-22T08:30:00Z',
        arrival: '2026-01-26T19:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2808', item: 'Mattress', issueDate: '2023-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2808', item: 'Room Key Set', issueDate: '2023-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2809',
    rollNumber: '25EC2809',
    fullName: 'Aakash Trivedi',
    gender: 'Male',
    dateOfBirth: '2006-02-27',
    email: 'aakash.trivedi.2809@university.edu',
    phoneNumber: '+91-9871102809',
    bloodGroup: 'AB-',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.57,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-W',
      roomNumber: 'W-301',
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
      transactionRef: 'TXN-W2809-77291'
    },
    guardianContact: {
      name: 'Harish Trivedi',
      relationship: 'Father',
      phone: '+91-9810028090',
      email: 'harish.t@example.com',
      address: {
        street: '15 Anand Nagar',
        city: 'Gwalior',
        state: 'Madhya Pradesh',
        pincode: '474012'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-W-2809'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2809', item: 'Mattress', issueDate: '2025-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2809', item: 'Room Key Set', issueDate: '2025-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2810',
    rollNumber: '24EE2810',
    fullName: 'Ananya Pillai',
    gender: 'Female',
    dateOfBirth: '2005-08-27',
    email: 'ananya.pillai.2810@university.edu',
    phoneNumber: '+91-9871102810',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Electrical Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.32,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-X',
      roomNumber: 'X-301',
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
      transactionRef: 'TXN-X2810-99418'
    },
    guardianContact: {
      name: 'R. K. Pillai',
      relationship: 'Father',
      phone: '+91-9810028100',
      email: 'rk.pillai@example.com',
      address: {
        street: '88 Sasthamangalam',
        city: 'Thiruvananthapuram',
        state: 'Kerala',
        pincode: '695010'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 177,
      percentage: 98.33,
      biometricId: 'BIO-X-2810'
    },
    gatePasses: [
      {
        passId: 'GP-2810-01',
        type: 'Outing',
        departure: '2026-02-17T14:00:00Z',
        arrival: '2026-02-17T18:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2810', item: 'Mattress', issueDate: '2024-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-2810', item: 'Room Key Set', issueDate: '2024-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2811',
    rollNumber: '23CS2811',
    fullName: 'Bhavin Shah',
    gender: 'Male',
    dateOfBirth: '2004-10-14',
    email: 'bhavin.shah.2811@university.edu',
    phoneNumber: '+91-9871102811',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.66,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-W',
      roomNumber: 'W-302',
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
      transactionRef: 'TXN-W2811-55829'
    },
    guardianContact: {
      name: 'Nitin Shah',
      relationship: 'Father',
      phone: '+91-9810028110',
      email: 'nitin.s@example.com',
      address: {
        street: '45 Race Course Road',
        city: 'Rajkot',
        state: 'Gujarat',
        pincode: '360001'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 171,
      percentage: 95.0,
      biometricId: 'BIO-W-2811'
    },
    gatePasses: [
      {
        passId: 'GP-2811-01',
        type: 'Outing',
        departure: '2026-02-11T13:30:00Z',
        arrival: '2026-02-11T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2811', item: 'Mattress', issueDate: '2023-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-2811', item: 'Room Key Set', issueDate: '2023-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-2812',
    rollNumber: '25AI2812',
    fullName: 'Chaitali Roy',
    gender: 'Female',
    dateOfBirth: '2006-05-02',
    email: 'chaitali.roy.2812@university.edu',
    phoneNumber: '+91-9871102812',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 9.16,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-X',
      roomNumber: 'X-302',
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
      transactionRef: 'TXN-X2812-99301'
    },
    guardianContact: {
      name: 'Tapan Roy',
      relationship: 'Father',
      phone: '+91-9810028120',
      email: 'tapan.roy@example.com',
      address: {
        street: '22 Bidhannagar',
        city: 'Durgapur',
        state: 'West Bengal',
        pincode: '713212'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 176,
      percentage: 97.78,
      biometricId: 'BIO-X-2812'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-2812', item: 'Mattress', issueDate: '2025-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-2812', item: 'Room Key Set', issueDate: '2025-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  }
];

function getAll() {
  return staticResidentMaster28;
}

function findById(id) {
  return staticResidentMaster28.find(resident => resident.id === id);
}

function filterByBlock(block) {
  return staticResidentMaster28.filter(resident => resident.roomAllocation.block.toLowerCase() === block.toLowerCase());
}

function getStats() {
  const total = staticResidentMaster28.length;
  const paidCount = staticResidentMaster28.filter(r => r.feePayment.paymentStatus === 'Paid').length;
  const partialCount = staticResidentMaster28.filter(r => r.feePayment.paymentStatus === 'Partial').length;
  const avgAttendance = staticResidentMaster28.reduce((acc, curr) => acc + curr.attendance.percentage, 0) / total;
  return {
    totalResidents: total,
    fullyPaidCount: paidCount,
    partialPaidCount: partialCount,
    averageAttendance: parseFloat(avgAttendance.toFixed(2))
  };
}

module.exports = {
  staticResidentMaster28,
  getAll,
  findById,
  filterByBlock,
  getStats
};
