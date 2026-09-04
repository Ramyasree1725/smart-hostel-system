const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Room = require('./models/Room');
const Fee = require('./models/Fee');
const Complaint = require('./models/Complaint');
const Leave = require('./models/Leave');
const Notice = require('./models/Notice');
const Attendance = require('./models/Attendance');
const connectDB = require('./config/db');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('🧹 Clearing existing collections...');
    await User.deleteMany();
    await Room.deleteMany();
    await Fee.deleteMany();
    await Complaint.deleteMany();
    await Leave.deleteMany();
    await Notice.deleteMany();
    await Attendance.deleteMany();

    console.log('🌱 Creating default Admin & Warden...');
    const adminUser = await User.create({
      name: 'Chief Warden Sharma',
      email: 'admin@hostel.com',
      password: 'admin123password',
      role: 'admin',
      phone: '+91 9876543210',
      department: 'Other',
    });

    const wardenUser = await User.create({
      name: 'Warden Radhika Rao',
      email: 'warden@hostel.com',
      password: 'warden123password',
      role: 'warden',
      phone: '+91 9876543211',
      department: 'Other',
    });

    console.log('🌱 Creating Rooms...');
    const roomsData = [
      {
        roomNumber: 'A-101',
        block: 'Block A (Boys)',
        floor: 1,
        type: 'Double Non-AC',
        capacity: 2,
        occupied: 0,
        feePerSemester: 38000,
        amenities: ['High Speed Wi-Fi', 'Attached Bathroom', 'Balcony', 'Study Table'],
      },
      {
        roomNumber: 'A-102',
        block: 'Block A (Boys)',
        floor: 1,
        type: 'Double AC',
        capacity: 2,
        occupied: 0,
        feePerSemester: 48000,
        amenities: ['Split AC', 'High Speed Wi-Fi', 'Attached Bathroom', 'Study Table & Wardrobe'],
      },
      {
        roomNumber: 'A-201',
        block: 'Block A (Boys)',
        floor: 2,
        type: 'Single AC',
        capacity: 1,
        occupied: 0,
        feePerSemester: 65000,
        amenities: ['Split AC', 'Private Balcony', 'High Speed Wi-Fi', 'Geyser', 'Study Desk'],
      },
      {
        roomNumber: 'A-202',
        block: 'Block A (Boys)',
        floor: 2,
        type: 'Triple Non-AC',
        capacity: 3,
        occupied: 0,
        feePerSemester: 32000,
        amenities: ['Wi-Fi', 'Attached Washroom', 'Individual Wardrobes', 'Study Area'],
      },
      {
        roomNumber: 'B-101',
        block: 'Block B (Girls)',
        floor: 1,
        type: 'Double AC',
        capacity: 2,
        occupied: 0,
        feePerSemester: 48000,
        amenities: ['Split AC', 'High Speed Wi-Fi', 'Attached Bathroom', 'Full Wardrobe', 'Balcony'],
      },
      {
        roomNumber: 'B-102',
        block: 'Block B (Girls)',
        floor: 1,
        type: 'Double Non-AC',
        capacity: 2,
        occupied: 0,
        feePerSemester: 38000,
        amenities: ['High Speed Wi-Fi', 'Attached Bathroom', 'Study Table', 'Balcony View'],
      },
      {
        roomNumber: 'B-201',
        block: 'Block B (Girls)',
        floor: 2,
        type: 'Single AC',
        capacity: 1,
        occupied: 0,
        feePerSemester: 65000,
        amenities: ['Split AC', 'Private Bathroom', 'High Speed Wi-Fi', 'Study Table', 'Mirror Unit'],
      },
      {
        roomNumber: 'D-301',
        block: 'Deluxe Wing',
        floor: 3,
        type: 'Double AC',
        capacity: 2,
        occupied: 0,
        feePerSemester: 55000,
        amenities: ['Split AC', 'Mini Fridge', 'Smart TV', 'High Speed Wi-Fi', 'Premium Washroom'],
      },
    ];

    const createdRooms = await Room.insertMany(roomsData);

    console.log('🌱 Creating Demo Students...');
    // Demo Student 1: Rahul (Pre-allocated to A-101)
    const studentRahul = await User.create({
      name: 'Rahul Varma',
      email: 'student@hostel.com',
      password: 'student123password',
      role: 'student',
      rollNo: '21CS108',
      department: 'Computer Science',
      year: '3rd Year',
      gender: 'Male',
      phone: '+91 9988776655',
      parentPhone: '+91 9123456780',
      address: 'Plot 45, Jubilee Hills, Hyderabad',
      bloodGroup: 'B+',
      room: createdRooms[0]._id,
      roomNumber: createdRooms[0].roomNumber,
      bedNumber: 'Bed A',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    });

    createdRooms[0].occupants.push(studentRahul._id);
    createdRooms[0].occupied = 1;
    await createdRooms[0].save();

    // Demo Student 2: Sneha (Allocated to B-101)
    const studentSneha = await User.create({
      name: 'Sneha Reddy',
      email: 'sneha@hostel.com',
      password: 'student123password',
      role: 'student',
      rollNo: '22IT204',
      department: 'Information Technology',
      year: '2nd Year',
      gender: 'Female',
      phone: '+91 9848012345',
      parentPhone: '+91 9848098765',
      address: 'Flat 302, Green Meadows, Vizag',
      bloodGroup: 'O+',
      room: createdRooms[4]._id,
      roomNumber: createdRooms[4].roomNumber,
      bedNumber: 'Bed A',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    });

    createdRooms[4].occupants.push(studentSneha._id);
    createdRooms[4].occupied = 1;
    await createdRooms[4].save();

    // Demo Student 3: Karthik (Unallocated - ready for smart allocation demo)
    const studentKarthik = await User.create({
      name: 'Karthik Teja',
      email: 'karthik@hostel.com',
      password: 'student123password',
      role: 'student',
      rollNo: '21CS115',
      department: 'Computer Science',
      year: '3rd Year',
      gender: 'Male',
      phone: '+91 9700112233',
      parentPhone: '+91 9700998877',
      address: 'H.No 12-4, Gachibowli, Hyderabad',
      bloodGroup: 'A+',
      status: 'Pending Room',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    });

    // Demo Student 4: Ananya (Unallocated)
    const studentAnanya = await User.create({
      name: 'Ananya Rao',
      email: 'ananya@hostel.com',
      password: 'student123password',
      role: 'student',
      rollNo: '23EC310',
      department: 'Electronics & Comm.',
      year: '1st Year',
      gender: 'Female',
      phone: '+91 9123412345',
      parentPhone: '+91 9123498765',
      address: 'Vijayawada, AP',
      bloodGroup: 'AB+',
      status: 'Pending Room',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    });

    console.log('🌱 Creating Fees...');
    await Fee.create({
      student: studentRahul._id,
      semester: 'Semester 1 (2026-27)',
      roomFee: 38000,
      messFee: 20000,
      maintenanceFee: 5000,
      securityDeposit: 5000,
      totalAmount: 68000,
      paidAmount: 35000,
      dueAmount: 33000,
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      status: 'Partial',
      paymentHistory: [
        {
          transactionId: 'TXN_HST98214',
          amount: 35000,
          method: 'UPI',
          paidAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          receiptNo: 'HST-881290',
        },
      ],
    });

    await Fee.create({
      student: studentSneha._id,
      semester: 'Semester 1 (2026-27)',
      roomFee: 48000,
      messFee: 20000,
      maintenanceFee: 5000,
      securityDeposit: 5000,
      totalAmount: 78000,
      paidAmount: 78000,
      dueAmount: 0,
      dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      status: 'Paid',
      paymentHistory: [
        {
          transactionId: 'TXN_HST12099',
          amount: 78000,
          method: 'Debit Card',
          paidAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          receiptNo: 'HST-773019',
        },
      ],
    });

    console.log('🌱 Creating Complaints...');
    await Complaint.create({
      student: studentRahul._id,
      roomNumber: 'A-101',
      title: 'Short circuit spark in switch board',
      description: 'Noticed sparks when plugging laptop charger near bed A. Need urgent electrician check.',
      category: 'Electrical',
      priority: 'Emergency',
      status: 'In Progress',
      assignedTo: 'Rajesh (Hostel Electrician)',
      adminNotes: 'Electrician dispatched with spare switchboard unit.',
    });

    await Complaint.create({
      student: studentRahul._id,
      roomNumber: 'A-101',
      title: 'Balcony tap dripping constantly',
      description: 'Slow continuous drip from wash basin tap on balcony.',
      category: 'Plumbing',
      priority: 'Low',
      status: 'Pending',
      assignedTo: 'Unassigned',
    });

    await Complaint.create({
      student: studentSneha._id,
      roomNumber: 'B-101',
      title: 'Wi-Fi disconnects intermittently',
      description: 'Signal drops completely between 8 PM to 11 PM on 1st floor corridor.',
      category: 'Wi-Fi / Internet',
      priority: 'Medium',
      status: 'Resolved',
      assignedTo: 'Suresh (Network Admin)',
      adminNotes: 'Replaced floor router antenna and reset gateway bandwidth limit.',
      resolvedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    });

    console.log('🌱 Creating Leave Requests...');
    await Leave.create({
      student: studentRahul._id,
      leaveType: 'Home Visit',
      fromDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      toDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      reason: 'Attending sibling wedding ceremony at hometown.',
      destinationAddress: 'Plot 45, Jubilee Hills, Hyderabad',
      emergencyContact: '+91 9123456780 (Father)',
      status: 'Approved',
      wardenRemarks: 'Parent confirmed over call. Approved.',
      passCode: 'PASS-892104',
    });

    await Leave.create({
      student: studentSneha._id,
      leaveType: 'Outing / Day Pass',
      fromDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      toDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      reason: 'Visiting city bookstore & project discussion with team.',
      destinationAddress: 'City Central Library, Vizag',
      emergencyContact: '+91 9848098765 (Mother)',
      status: 'Pending',
    });

    console.log('🌱 Creating Notices...');
    await Notice.create({
      title: '⚡ Scheduled Power Maintenance on Saturday',
      content: 'Hostel Block A and B will undergo annual transformer servicing between 2:00 PM to 5:00 PM this Saturday. Inverters will supply corridor lights.',
      category: 'Maintenance',
      isUrgent: true,
      postedBy: 'Chief Warden Sharma',
      targetAudience: 'All Students',
    });

    await Notice.create({
      title: '🍽️ Revised Weekend Mess Menu Announcement',
      content: 'Special Biryani & Gulab Jamun lunch will be served on Sunday afternoon. Breakfast timings on Sunday are extended till 10:00 AM.',
      category: 'Mess & Food',
      isUrgent: false,
      postedBy: 'Mess Committee',
      targetAudience: 'All Students',
    });

    await Notice.create({
      title: '📜 Hostel Fee Installment Due Date Reminder',
      content: 'All resident students are requested to clear Semester 1 balance dues before the 15th of this month to avoid late fee penalties.',
      category: 'Fees & Accounts',
      isUrgent: false,
      postedBy: 'Accounts Section',
      targetAudience: 'All Students',
    });

    console.log('🌱 Creating Attendance Sample...');
    const todayStr = new Date().toISOString().split('T')[0];
    await Attendance.create({
      date: todayStr,
      markedBy: 'Warden Radhika Rao',
      records: [
        {
          student: studentRahul._id,
          studentName: studentRahul.name,
          rollNo: studentRahul.rollNo,
          roomNumber: studentRahul.roomNumber,
          status: 'Present',
          remarks: 'Present during roll call',
        },
        {
          student: studentSneha._id,
          studentName: studentSneha.name,
          rollNo: studentSneha.rollNo,
          roomNumber: studentSneha.roomNumber,
          status: 'Present',
          remarks: 'Present in room B-101',
        },
      ],
    });

    console.log('🎉 Seed Data inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
