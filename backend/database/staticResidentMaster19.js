'use strict';

/**
 * Static Resident Master Dataset - Batch 19
 * Provides static resident records and query utility functions for Block-E and Block-F residents.
 */

const staticResidentMaster19 = [
  {
    id: 'RES-1901',
    rollNumber: '23CS1901',
    fullName: 'Aditya Raj Sharma',
    gender: 'Male',
    dateOfBirth: '2004-03-12',
    email: 'aditya.sharma.1901@university.edu',
    phoneNumber: '+91-9871101901',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.92,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-E',
      roomNumber: 'E-101',
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
      transactionRef: 'TXN-E1901-84920'
    },
    guardianContact: {
      name: 'Rajendra Sharma',
      relationship: 'Father',
      phone: '+91-9810019010',
      email: 'rajendra.sharma@example.com',
      address: {
        street: '14/B Vasundhara Enclave',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110096'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 174,
      percentage: 96.67,
      biometricId: 'BIO-E-1901'
    },
    gatePasses: [
      {
        passId: 'GP-1901-01',
        type: 'Outing',
        departure: '2026-02-14T10:00:00Z',
        arrival: '2026-02-14T19:30:00Z',
        status: 'Returned'
      },
      {
        passId: 'GP-1901-02',
        type: 'Home Visit',
        departure: '2026-01-22T08:00:00Z',
        arrival: '2026-01-26T20:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-1901', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-TBL-1901', item: 'Study Table & Chair', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-1901', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-1902',
    rollNumber: '23CS1902',
    fullName: 'Bhavna Kulkarni',
    gender: 'Female',
    dateOfBirth: '2004-07-25',
    email: 'bhavna.kulkarni.1902@university.edu',
    phoneNumber: '+91-9871101902',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 9.15,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-F',
      roomNumber: 'F-201',
      bedNumber: 'Bed-B',
      floor: 2,
      roomType: 'Double Non-AC',
      checkInDate: '2023-08-02',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 80000,
      paidAmount: 80000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-18',
      transactionRef: 'TXN-F1902-19283'
    },
    guardianContact: {
      name: 'Suresh Kulkarni',
      relationship: 'Father',
      phone: '+91-9810019020',
      email: 'suresh.kulkarni@example.com',
      address: {
        street: '72 Prabhat Road',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411004'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 171,
      percentage: 95.0,
      biometricId: 'BIO-F-1902'
    },
    gatePasses: [
      {
        passId: 'GP-1902-01',
        type: 'Outing',
        departure: '2026-02-18T14:00:00Z',
        arrival: '2026-02-18T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-1902', item: 'Mattress', issueDate: '2023-08-02', condition: 'Good' },
      { itemId: 'INV-ALM-1902', item: 'Steel Almirah', issueDate: '2023-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-1902', item: 'Room Key Set', issueDate: '2023-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'Asthma - Inhaler carried',
    disciplinaryRecords: []
  },
  {
    id: 'RES-1903',
    rollNumber: '24EC1903',
    fullName: 'Chirag Reddy',
    gender: 'Male',
    dateOfBirth: '2005-01-14',
    email: 'chirag.reddy.1903@university.edu',
    phoneNumber: '+91-9871101903',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.45,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-E',
      roomNumber: 'E-102',
      bedNumber: 'Bed-A',
      floor: 1,
      roomType: 'Double AC',
      checkInDate: '2024-08-05',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 95000,
      paidAmount: 50000,
      dueAmount: 45000,
      paymentStatus: 'Partial',
      lastPaymentDate: '2025-08-10',
      transactionRef: 'TXN-E1903-55829'
    },
    guardianContact: {
      name: 'Venkatesh Reddy',
      relationship: 'Father',
      phone: '+91-9810019030',
      email: 'v.reddy@example.com',
      address: {
        street: '8-2-293/82 Jubilee Hills',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500033'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 162,
      percentage: 90.0,
      biometricId: 'BIO-E-1903'
    },
    gatePasses: [
      {
        passId: 'GP-1903-01',
        type: 'Home Visit',
        departure: '2026-01-10T09:00:00Z',
        arrival: '2026-01-15T18:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-1903', item: 'Mattress', issueDate: '2024-08-05', condition: 'Good' },
      { itemId: 'INV-KEY-1903', item: 'Room Key Set', issueDate: '2024-08-05', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-1904',
    rollNumber: '24EE1904',
    fullName: 'Divya Nambiar',
    gender: 'Female',
    dateOfBirth: '2005-09-30',
    email: 'divya.nambiar.1904@university.edu',
    phoneNumber: '+91-9871101904',
    bloodGroup: 'AB+',
    academicDetails: {
      department: 'Electrical Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 9.38,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-F',
      roomNumber: 'F-202',
      bedNumber: 'Bed-A',
      floor: 2,
      roomType: 'Single AC',
      checkInDate: '2024-08-04',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 120000,
      paidAmount: 120000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-28',
      transactionRef: 'TXN-F1904-77291'
    },
    guardianContact: {
      name: 'Radhika Nambiar',
      relationship: 'Mother',
      phone: '+91-9810019040',
      email: 'radhika.nambiar@example.com',
      address: {
        street: 'Flat 402, Lotus Greens, Kadavanthra',
        city: 'Kochi',
        state: 'Kerala',
        pincode: '682020'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 178,
      percentage: 98.89,
      biometricId: 'BIO-F-1904'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-1904', item: 'Mattress', issueDate: '2024-08-04', condition: 'Good' },
      { itemId: 'INV-TBL-1904', item: 'Study Table & Chair', issueDate: '2024-08-04', condition: 'Good' },
      { itemId: 'INV-KEY-1904', item: 'Room Key Set', issueDate: '2024-08-04', condition: 'Good' }
    ],
    medicalAlerts: 'Peanut Allergy',
    disciplinaryRecords: []
  },
  {
    id: 'RES-1905',
    rollNumber: '23ME1905',
    fullName: 'Eshaan Verma',
    gender: 'Male',
    dateOfBirth: '2004-11-18',
    email: 'eshaan.verma.1905@university.edu',
    phoneNumber: '+91-9871101905',
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
      block: 'Block-E',
      roomNumber: 'E-201',
      bedNumber: 'Bed-A',
      floor: 2,
      roomType: 'Triple Non-AC',
      checkInDate: '2023-08-03',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 70000,
      paidAmount: 70000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-12',
      transactionRef: 'TXN-E1905-33921'
    },
    guardianContact: {
      name: 'Sunil Verma',
      relationship: 'Father',
      phone: '+91-9810019050',
      email: 'sunil.verma@example.com',
      address: {
        street: '45 Civil Lines',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302006'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 165,
      percentage: 91.67,
      biometricId: 'BIO-E-1905'
    },
    gatePasses: [
      {
        passId: 'GP-1905-01',
        type: 'Outing',
        departure: '2026-02-08T15:00:00Z',
        arrival: '2026-02-08T20:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-1905', item: 'Mattress', issueDate: '2023-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-1905', item: 'Room Key Set', issueDate: '2023-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-1906',
    rollNumber: '25IT1906',
    fullName: 'Falguni Joshi',
    gender: 'Female',
    dateOfBirth: '2006-04-05',
    email: 'falguni.joshi.1906@university.edu',
    phoneNumber: '+91-9871101906',
    bloodGroup: 'A-',
    academicDetails: {
      department: 'Information Technology',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.65,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-F',
      roomNumber: 'F-101',
      bedNumber: 'Bed-A',
      floor: 1,
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
      transactionRef: 'TXN-F1906-88219'
    },
    guardianContact: {
      name: 'Hemant Joshi',
      relationship: 'Father',
      phone: '+91-9810019060',
      email: 'hemant.joshi@example.com',
      address: {
        street: '12 Alkapuri',
        city: 'Vadodara',
        state: 'Gujarat',
        pincode: '390007'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 176,
      percentage: 97.78,
      biometricId: 'BIO-F-1906'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-1906', item: 'Mattress', issueDate: '2025-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-1906', item: 'Room Key Set', issueDate: '2025-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-1907',
    rollNumber: '24CE1907',
    fullName: 'Gautam Menon',
    gender: 'Male',
    dateOfBirth: '2005-06-19',
    email: 'gautam.menon.1907@university.edu',
    phoneNumber: '+91-9871101907',
    bloodGroup: 'B-',
    academicDetails: {
      department: 'Civil Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 7.95,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-E',
      roomNumber: 'E-202',
      bedNumber: 'Bed-B',
      floor: 2,
      roomType: 'Double Non-AC',
      checkInDate: '2024-08-03',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 80000,
      paidAmount: 40000,
      dueAmount: 40000,
      paymentStatus: 'Partial',
      lastPaymentDate: '2025-08-15',
      transactionRef: 'TXN-E1907-91028'
    },
    guardianContact: {
      name: 'Unnikrishnan Menon',
      relationship: 'Father',
      phone: '+91-9810019070',
      email: 'u.menon@example.com',
      address: {
        street: 'Rose Cottage, Kowdiar',
        city: 'Thiruvananthapuram',
        state: 'Kerala',
        pincode: '695003'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 168,
      percentage: 93.33,
      biometricId: 'BIO-E-1907'
    },
    gatePasses: [
      {
        passId: 'GP-1907-01',
        type: 'Outing',
        departure: '2026-02-05T13:00:00Z',
        arrival: '2026-02-05T19:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-1907', item: 'Mattress', issueDate: '2024-08-03', condition: 'Good' },
      { itemId: 'INV-KEY-1907', item: 'Room Key Set', issueDate: '2024-08-03', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-1908',
    rollNumber: '23AI1908',
    fullName: 'Harini Sundaram',
    gender: 'Female',
    dateOfBirth: '2004-12-08',
    email: 'harini.sundaram.1908@university.edu',
    phoneNumber: '+91-9871101908',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Artificial Intelligence & Data Science',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 9.42,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-F',
      roomNumber: 'F-301',
      bedNumber: 'Bed-A',
      floor: 3,
      roomType: 'Single AC',
      checkInDate: '2023-08-01',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 120000,
      paidAmount: 120000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-10',
      transactionRef: 'TXN-F1908-11928'
    },
    guardianContact: {
      name: 'R. Sundaram',
      relationship: 'Father',
      phone: '+91-9810019080',
      email: 'r.sundaram@example.com',
      address: {
        street: '15 T. Nagar 3rd Main',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600017'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 177,
      percentage: 98.33,
      biometricId: 'BIO-F-1908'
    },
    gatePasses: [
      {
        passId: 'GP-1908-01',
        type: 'Conference Outing',
        departure: '2026-02-01T07:00:00Z',
        arrival: '2026-02-03T21:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-1908', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-1908', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-1909',
    rollNumber: '25CS1909',
    fullName: 'Ishaan Aggarwal',
    gender: 'Male',
    dateOfBirth: '2006-02-17',
    email: 'ishaan.aggarwal.1909@university.edu',
    phoneNumber: '+91-9871101909',
    bloodGroup: 'AB-',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 8.88,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-E',
      roomNumber: 'E-301',
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
      lastPaymentDate: '2025-08-05',
      transactionRef: 'TXN-E1909-64512'
    },
    guardianContact: {
      name: 'Manoj Aggarwal',
      relationship: 'Father',
      phone: '+91-9810019090',
      email: 'manoj.agg@example.com',
      address: {
        street: '28 Model Town',
        city: 'Ludhiana',
        state: 'Punjab',
        pincode: '141002'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 170,
      percentage: 94.44,
      biometricId: 'BIO-E-1909'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-1909', item: 'Mattress', issueDate: '2025-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-1909', item: 'Room Key Set', issueDate: '2025-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-1910',
    rollNumber: '24CH1910',
    fullName: 'Janani Parthasarathy',
    gender: 'Female',
    dateOfBirth: '2005-08-11',
    email: 'janani.partha.1910@university.edu',
    phoneNumber: '+91-9871101910',
    bloodGroup: 'B+',
    academicDetails: {
      department: 'Chemical Engineering',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      cgpa: 8.31,
      admissionYear: 2024
    },
    roomAllocation: {
      block: 'Block-F',
      roomNumber: 'F-302',
      bedNumber: 'Bed-A',
      floor: 3,
      roomType: 'Double AC',
      checkInDate: '2024-08-02',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 95000,
      paidAmount: 95000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-22',
      transactionRef: 'TXN-F1910-82910'
    },
    guardianContact: {
      name: 'V. Parthasarathy',
      relationship: 'Father',
      phone: '+91-9810019100',
      email: 'v.partha@example.com',
      address: {
        street: '88 Malleshwaram 15th Cross',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560003'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 169,
      percentage: 93.89,
      biometricId: 'BIO-F-1910'
    },
    gatePasses: [
      {
        passId: 'GP-1910-01',
        type: 'Outing',
        departure: '2026-02-12T16:00:00Z',
        arrival: '2026-02-12T20:00:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-1910', item: 'Mattress', issueDate: '2024-08-02', condition: 'Good' },
      { itemId: 'INV-KEY-1910', item: 'Room Key Set', issueDate: '2024-08-02', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-1911',
    rollNumber: '23EC1911',
    fullName: 'Karthik Sengupta',
    gender: 'Male',
    dateOfBirth: '2004-05-29',
    email: 'karthik.sengupta.1911@university.edu',
    phoneNumber: '+91-9871101911',
    bloodGroup: 'O+',
    academicDetails: {
      department: 'Electronics & Communication',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      cgpa: 8.76,
      admissionYear: 2023
    },
    roomAllocation: {
      block: 'Block-E',
      roomNumber: 'E-302',
      bedNumber: 'Bed-A',
      floor: 3,
      roomType: 'Double Non-AC',
      checkInDate: '2023-08-01',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 80000,
      paidAmount: 80000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-07-14',
      transactionRef: 'TXN-E1911-30918'
    },
    guardianContact: {
      name: 'Anirban Sengupta',
      relationship: 'Father',
      phone: '+91-9810019110',
      email: 'a.sengupta@example.com',
      address: {
        street: '104 Salt Lake Sector 1',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700064'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 173,
      percentage: 96.11,
      biometricId: 'BIO-E-1911'
    },
    gatePasses: [
      {
        passId: 'GP-1911-01',
        type: 'Outing',
        departure: '2026-02-15T11:00:00Z',
        arrival: '2026-02-15T17:30:00Z',
        status: 'Returned'
      }
    ],
    inventoryAllocated: [
      { itemId: 'INV-MAT-1911', item: 'Mattress', issueDate: '2023-08-01', condition: 'Good' },
      { itemId: 'INV-KEY-1911', item: 'Room Key Set', issueDate: '2023-08-01', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  },
  {
    id: 'RES-1912',
    rollNumber: '25CS1912',
    fullName: 'Lavanya Deshmukh',
    gender: 'Female',
    dateOfBirth: '2006-10-14',
    email: 'lavanya.deshmukh.1912@university.edu',
    phoneNumber: '+91-9871101912',
    bloodGroup: 'A+',
    academicDetails: {
      department: 'Computer Science & Engineering',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      cgpa: 9.02,
      admissionYear: 2025
    },
    roomAllocation: {
      block: 'Block-F',
      roomNumber: 'F-102',
      bedNumber: 'Bed-B',
      floor: 1,
      roomType: 'Double AC',
      checkInDate: '2025-08-04',
      status: 'Occupied'
    },
    feePayment: {
      annualHostelFee: 95000,
      paidAmount: 95000,
      dueAmount: 0,
      paymentStatus: 'Paid',
      lastPaymentDate: '2025-08-04',
      transactionRef: 'TXN-F1912-74829'
    },
    guardianContact: {
      name: 'Prasad Deshmukh',
      relationship: 'Father',
      phone: '+91-9810019120',
      email: 'p.deshmukh@example.com',
      address: {
        street: '55 Ramdas Peth',
        city: 'Nagpur',
        state: 'Maharashtra',
        pincode: '440010'
      }
    },
    attendance: {
      totalDays: 180,
      daysPresent: 175,
      percentage: 97.22,
      biometricId: 'BIO-F-1912'
    },
    gatePasses: [],
    inventoryAllocated: [
      { itemId: 'INV-MAT-1912', item: 'Mattress', issueDate: '2025-08-04', condition: 'Good' },
      { itemId: 'INV-KEY-1912', item: 'Room Key Set', issueDate: '2025-08-04', condition: 'Good' }
    ],
    medicalAlerts: 'None',
    disciplinaryRecords: []
  }
];

function getAll() {
  return staticResidentMaster19;
}

function findById(id) {
  return staticResidentMaster19.find(resident => resident.id === id);
}

function filterByBlock(block) {
  return staticResidentMaster19.filter(resident => resident.roomAllocation.block.toLowerCase() === block.toLowerCase());
}

function getStats() {
  const total = staticResidentMaster19.length;
  const paidCount = staticResidentMaster19.filter(r => r.feePayment.paymentStatus === 'Paid').length;
  const partialCount = staticResidentMaster19.filter(r => r.feePayment.paymentStatus === 'Partial').length;
  const avgAttendance = staticResidentMaster19.reduce((acc, curr) => acc + curr.attendance.percentage, 0) / total;
  return {
    totalResidents: total,
    fullyPaidCount: paidCount,
    partialPaidCount: partialCount,
    averageAttendance: parseFloat(avgAttendance.toFixed(2))
  };
}

module.exports = {
  staticResidentMaster19,
  getAll,
  findById,
  filterByBlock,
  getStats
};
