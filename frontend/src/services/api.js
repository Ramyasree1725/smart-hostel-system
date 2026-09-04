// Frontend API Service with Live Backend + Intelligent LocalStorage Fallback

const API_BASE = '/api';

// Initial Mock Seed State for standalone & offline mode
const INITIAL_MOCK_STATE = {
  users: [
    {
      _id: 'usr_admin',
      name: 'Chief Warden Sharma',
      email: 'admin@hostel.com',
      password: 'admin123password',
      role: 'admin',
      phone: '+91 9876543210',
      department: 'Administration',
    },
    {
      _id: 'usr_warden',
      name: 'Warden Radhika Rao',
      email: 'warden@hostel.com',
      password: 'warden123password',
      role: 'warden',
      phone: '+91 9876543211',
      department: 'Warden Office',
    },
    {
      _id: 'usr_security',
      name: 'Officer Shankar (Main Gate)',
      email: 'security@hostel.com',
      password: 'security123password',
      role: 'security',
      phone: '+91 9876543299',
      gateNumber: 'Main Gate 1',
      shift: 'Evening Shift (2PM-10PM)',
    },
    {
      _id: 'usr_student_1',
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
      roomNumber: 'A-101',
      bedNumber: 'Bed A',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    },
    {
      _id: 'usr_student_2',
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
      roomNumber: 'B-101',
      bedNumber: 'Bed A',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    },
    {
      _id: 'usr_student_3',
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
      roomNumber: 'Unassigned',
      bedNumber: '',
      status: 'Pending Room',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    },
  ],
  rooms: [
    {
      _id: 'rm_1',
      roomNumber: 'A-101',
      block: 'Block A (Boys)',
      floor: 1,
      type: 'Double Non-AC',
      capacity: 2,
      occupied: 1,
      feePerSemester: 38000,
      amenities: ['High Speed Wi-Fi', 'Attached Bathroom', 'Balcony', 'Study Table'],
      occupants: ['usr_student_1'],
      status: 'Available',
    },
    {
      _id: 'rm_2',
      roomNumber: 'A-102',
      block: 'Block A (Boys)',
      floor: 1,
      type: 'Double AC',
      capacity: 2,
      occupied: 0,
      feePerSemester: 48000,
      amenities: ['Split AC', 'High Speed Wi-Fi', 'Attached Bathroom', 'Study Table & Wardrobe'],
      occupants: [],
      status: 'Available',
    },
    {
      _id: 'rm_5',
      roomNumber: 'B-101',
      block: 'Block B (Girls)',
      floor: 1,
      type: 'Double AC',
      capacity: 2,
      occupied: 1,
      feePerSemester: 48000,
      amenities: ['Split AC', 'High Speed Wi-Fi', 'Attached Bathroom', 'Full Wardrobe', 'Balcony'],
      occupants: ['usr_student_2'],
      status: 'Available',
    },
  ],
  fees: [
    {
      _id: 'fee_1',
      student: 'usr_student_1',
      studentName: 'Rahul Varma',
      semester: 'Semester 1 (2026-27)',
      roomFee: 38000,
      messFee: 20000,
      maintenanceFee: 5000,
      securityDeposit: 5000,
      totalAmount: 68000,
      paidAmount: 35000,
      dueAmount: 33000,
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Partial',
      paymentHistory: [
        {
          receiptNo: 'HST-881290',
          transactionId: 'TXN_HST98214',
          amount: 35000,
          method: 'UPI',
          paidAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
  ],
  complaints: [
    {
      _id: 'cmp_1',
      student: 'usr_student_1',
      studentName: 'Rahul Varma',
      roomNumber: 'A-101',
      title: 'Short circuit spark in switch board',
      description: 'Noticed sparks when plugging laptop charger near bed A. Need urgent electrician check.',
      category: 'Electrical',
      priority: 'Emergency',
      status: 'In Progress',
      assignedTo: 'Rajesh (Hostel Electrician)',
      adminNotes: 'Warden dispatched electrician with spare switchboard unit.',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: 'cmp_2',
      student: 'usr_student_1',
      roomNumber: 'A-101',
      studentName: 'Rahul Varma',
      title: 'Balcony tap dripping constantly',
      description: 'Slow continuous drip from wash basin tap on balcony.',
      category: 'Plumbing',
      priority: 'Low',
      status: 'Pending',
      assignedTo: 'Unassigned',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  leaves: [
    {
      _id: 'lv_1',
      student: 'usr_student_1',
      studentName: 'Rahul Varma',
      rollNo: '21CS108',
      roomNumber: 'A-101',
      leaveType: 'Home Visit',
      fromDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      toDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      reason: 'Attending family function at hometown.',
      destinationAddress: 'Plot 45, Jubilee Hills, Hyderabad',
      emergencyContact: '+91 9123456780 (Father)',
      status: 'Approved',
      wardenRemarks: 'Parent confirmed over call. Approved.',
      passCode: 'PASS-892104',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: 'lv_2',
      student: 'usr_student_2',
      studentName: 'Sneha Reddy',
      rollNo: '22IT204',
      roomNumber: 'B-101',
      leaveType: 'Outing / Day Pass',
      fromDate: new Date().toISOString(),
      toDate: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
      reason: 'Visiting city central library for project reference books.',
      destinationAddress: 'City Central Library, Vizag',
      emergencyContact: '+91 9848098765 (Mother)',
      status: 'Pending',
      passCode: 'PASS-554210',
      createdAt: new Date().toISOString(),
    },
  ],
  gateLogs: [
    {
      _id: 'gl_1',
      studentName: 'Sneha Reddy',
      rollNo: '22IT204',
      roomNumber: 'B-101',
      phone: '+91 9848012345',
      parentPhone: '+91 9848098765',
      passCode: 'PASS-771209',
      leaveType: 'Outing / Day Pass',
      destination: 'Central Library, Vizag',
      outTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      expectedInTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      inTime: null,
      status: 'Currently Outside',
      gateNumber: 'Main Gate 1',
      guardName: 'Officer Shankar',
      securityNotes: 'Student verified with ID card upon exit',
    },
  ],
  messRecords: [
    {
      _id: 'mess_1',
      date: new Date().toISOString().split('T')[0],
      mealType: 'Breakfast',
      menuItems: ['Idli & Sambar', 'Medu Vada', 'Coconut Chutney', 'Tea / Coffee / Milk'],
      foodQualityRating: 4.8,
      tasteRating: 4.6,
      hygieneStatus: 'Excellent',
      inspectorName: 'Warden Radhika Rao',
      wardenRemarks: 'Hot breakfast served on time. Kitchen area clean and sanitized.',
    },
    {
      _id: 'mess_2',
      date: new Date().toISOString().split('T')[0],
      mealType: 'Lunch',
      menuItems: ['Steamed Rice', 'Dal Tadka', 'Paneer Butter Masala', 'Curd', 'Papad & Salad'],
      foodQualityRating: 4.6,
      tasteRating: 4.4,
      hygieneStatus: 'Good',
      inspectorName: 'Warden Radhika Rao',
      wardenRemarks: 'Fresh vegetables used. Oil level tested. Good taste.',
    },
    {
      _id: 'mess_3',
      date: new Date().toISOString().split('T')[0],
      mealType: 'Dinner',
      menuItems: ['Phulka / Chapati', 'Mixed Veg Korma', 'Jeera Rice', 'Sambar', 'Gulab Jamun'],
      foodQualityRating: 4.7,
      tasteRating: 4.5,
      hygieneStatus: 'Excellent',
      inspectorName: 'Warden Radhika Rao',
      wardenRemarks: 'Evening dinner prepared under hygienic standards. Clean dining hall.',
    },
  ],
  notifications: [
    {
      _id: 'notif_1',
      recipient: 'usr_student_1',
      title: '🎉 Outing Gate Pass APPROVED!',
      message: 'Your leave request for "Home Visit" has been approved by Warden madam. Your Pass Code is PASS-892104. Show this to the Security Guard at Main Gate.',
      type: 'gate_pass',
      status: 'unread',
      createdAt: new Date().toISOString(),
    },
  ],
  notices: [
    {
      _id: 'ntc_1',
      title: '⚡ Scheduled Power Maintenance on Saturday',
      content: 'Hostel Block A and B will undergo annual transformer servicing between 2:00 PM to 5:00 PM this Saturday. Inverters will supply corridor lights.',
      category: 'Maintenance',
      isUrgent: true,
      postedBy: 'Chief Warden Sharma',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'ntc_2',
      title: '🍽️ Revised Weekend Mess Menu (Biryani & Sweets)',
      content: 'Special Dum Biryani & Gulab Jamun lunch will be served on Sunday afternoon. Breakfast timings on Sunday are extended till 10:00 AM.',
      category: 'Mess & Food',
      isUrgent: false,
      postedBy: 'Mess Committee',
      createdAt: new Date().toISOString(),
    },
  ],
  attendance: {
    date: new Date().toISOString().split('T')[0],
    markedBy: 'Warden Radhika Rao',
    records: [
      { studentId: 'usr_student_1', studentName: 'Rahul Varma', rollNo: '21CS108', roomNumber: 'A-101', status: 'Present', remarks: 'Present during roll call' },
      { studentId: 'usr_student_2', studentName: 'Sneha Reddy', rollNo: '22IT204', roomNumber: 'B-101', status: 'On Leave', remarks: 'Outside on approved day pass' },
      { studentId: 'usr_student_3', studentName: 'Karthik Teja', rollNo: '21CS115', roomNumber: 'Unassigned', status: 'Present', remarks: '' },
    ],
  },
};

const getMockState = () => {
  const data = localStorage.getItem('smart_hostel_state_v2');
  if (!data) {
    localStorage.setItem('smart_hostel_state_v2', JSON.stringify(INITIAL_MOCK_STATE));
    return INITIAL_MOCK_STATE;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_MOCK_STATE;
  }
};

const saveMockState = (state) => {
  localStorage.setItem('smart_hostel_state_v2', JSON.stringify(state));
};

const request = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE}${url}`, { credentials: 'omit', ...options, headers });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Backend unreachable, fallback to local simulator below
  }
  return null;
};

const detectPriority = (title, desc) => {
  const text = `${title} ${desc}`.toLowerCase();
  if (/spark|fire|smoke|shock|short circuit|flood|burst|gas|theft/.test(text)) return 'Emergency';
  if (/no water|drainage|power cut|broken lock|spoiled|smell|ac not working/.test(text)) return 'High';
  if (/slow|wifi|fused|leaking|fan noise/.test(text)) return 'Medium';
  return 'Low';
};

export const api = {
  // AUTH
  async login(email, password) {
    const online = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (online) return online;

    const state = getMockState();
    const user = state.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    const token = 'mock_jwt_token_' + user._id;
    return { ...user, token };
  },

  async register(studentData) {
    const online = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
    if (online) return online;

    const state = getMockState();
    if (state.users.some((u) => u.email.toLowerCase() === studentData.email.toLowerCase())) {
      throw new Error('User already exists with this email');
    }
    const newUser = {
      _id: 'usr_' + Date.now(),
      ...studentData,
      role: 'student',
      status: 'Pending Room',
      roomNumber: 'Unassigned',
      bedNumber: '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
    };
    state.users.push(newUser);
    saveMockState(state);
    return { ...newUser, token: 'mock_jwt_token_' + newUser._id };
  },

  // ROOMS
  async getRooms(params = {}) {
    const query = new URLSearchParams(params).toString();
    const online = await request(`/rooms${query ? '?' + query : ''}`);
    if (online) return online;

    const state = getMockState();
    return state.rooms.map((room) => {
      const occupantsList = state.users.filter((u) => (room.occupants || []).includes(u._id));
      return { ...room, occupants: occupantsList };
    });
  },

  async smartAllocate(studentId, { preferredType, preferredBlock } = {}) {
    const online = await request('/rooms/smart-allocate', {
      method: 'POST',
      body: JSON.stringify({ studentId, preferredType, preferredBlock }),
    });
    if (online) return online;

    const state = getMockState();
    const student = state.users.find((u) => u._id === studentId);
    if (!student) throw new Error('Student not found');
    if (student.roomNumber && student.roomNumber !== 'Unassigned') {
      throw new Error(`Student already assigned to Room ${student.roomNumber}`);
    }

    const available = state.rooms.filter((r) => r.occupied < r.capacity);
    if (available.length === 0) throw new Error('No available rooms currently.');

    let bestRoom = available[0];
    let highestScore = -1;
    let reason = 'Optimal available room';

    for (const rm of available) {
      let score = 10;
      const occupants = state.users.filter((u) => (rm.occupants || []).includes(u._id));
      const deptMatch = occupants.filter((o) => o.department === student.department).length;
      const yearMatch = occupants.filter((o) => o.year === student.year).length;

      if (deptMatch > 0) score += 50 * deptMatch;
      if (yearMatch > 0) score += 30 * yearMatch;
      if (rm.occupied > 0) score += 20;

      if (score > highestScore) {
        highestScore = score;
        bestRoom = rm;
        reason = deptMatch > 0 ? `Department synergy (${student.department})` : 'Best vacant bed match';
      }
    }

    const bedLetter = String.fromCharCode(65 + bestRoom.occupied);
    bestRoom.occupants.push(student._id);
    bestRoom.occupied += 1;
    if (bestRoom.occupied >= bestRoom.capacity) bestRoom.status = 'Full';

    student.roomNumber = bestRoom.roomNumber;
    student.bedNumber = `Bed ${bedLetter}`;
    student.status = 'Active';

    saveMockState(state);
    return {
      success: true,
      message: `🎉 Smart Allocated to Room ${bestRoom.roomNumber} (${bestRoom.type})`,
      matchReason: reason,
      allocatedRoom: bestRoom,
      bedNumber: student.bedNumber,
      user: student,
    };
  },

  async deallocateRoom(studentId) {
    const online = await request('/rooms/deallocate', {
      method: 'POST',
      body: JSON.stringify({ studentId }),
    });
    if (online) return online;

    const state = getMockState();
    const student = state.users.find((u) => u._id === studentId);
    if (!student) throw new Error('Student not found');

    const room = state.rooms.find((r) => (r.occupants || []).includes(studentId));
    if (room) {
      room.occupants = room.occupants.filter((id) => id !== studentId);
      room.occupied = Math.max(0, room.occupied - 1);
      room.status = 'Available';
    }

    student.roomNumber = 'Unassigned';
    student.bedNumber = '';
    student.status = 'Pending Room';
    saveMockState(state);
    return { success: true, message: 'Student room deallocated successfully' };
  },

  // FEES
  async getMyFee(studentId) {
    const online = await request('/fees/my');
    if (online) return online;

    const state = getMockState();
    let fee = state.fees.find((f) => f.student === studentId);
    if (!fee) {
      fee = {
        _id: 'fee_' + Date.now(),
        student: studentId,
        semester: 'Semester 1 (2026-27)',
        roomFee: 38000,
        messFee: 20000,
        maintenanceFee: 5000,
        securityDeposit: 5000,
        totalAmount: 68000,
        paidAmount: 0,
        dueAmount: 68000,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Pending',
        paymentHistory: [],
      };
      state.fees.push(fee);
      saveMockState(state);
    }
    return fee;
  },

  async payFee(studentId, amount, paymentMethod) {
    const online = await request('/fees/pay', {
      method: 'POST',
      body: JSON.stringify({ amount, paymentMethod }),
    });
    if (online) return online;

    const state = getMockState();
    const fee = state.fees.find((f) => f.student === studentId);
    if (!fee) throw new Error('Fee record not found');

    const payNum = Number(amount);
    const receiptNo = 'HST-' + Date.now().toString().slice(-6);
    const transactionId = 'TXN_' + Math.random().toString(36).substring(2, 10).toUpperCase();

    fee.paidAmount += payNum;
    fee.dueAmount = Math.max(0, fee.totalAmount - fee.paidAmount);
    fee.status = fee.dueAmount === 0 ? 'Paid' : 'Partial';

    fee.paymentHistory.push({
      transactionId,
      amount: payNum,
      method: paymentMethod || 'UPI',
      paidAt: new Date().toISOString(),
      receiptNo,
    });

    saveMockState(state);
    return { success: true, receiptNo, transactionId, updatedFee: fee };
  },

  async getAllFees() {
    const online = await request('/fees');
    if (online) return online;

    const state = getMockState();
    return state.fees.map((fee) => {
      const student = state.users.find((u) => u._id === fee.student);
      return { ...fee, student };
    });
  },

  async sendFeeReminder(feeId) {
    const online = await request(`/fees/remind/${feeId}`, { method: 'POST' });
    if (online) return online;
    return { success: true, message: 'Fee notification alert & SMS reminder dispatched successfully!' };
  },

  // COMPLAINTS
  async getComplaints(studentId = null) {
    const online = studentId ? await request('/complaints/my') : await request('/complaints');
    if (online) return online;

    const state = getMockState();
    let list = studentId ? state.complaints.filter((c) => c.student === studentId) : state.complaints;
    return list.map((c) => {
      const student = state.users.find((u) => u._id === c.student);
      return { ...c, student: student || { name: c.studentName || 'Student', roomNumber: c.roomNumber } };
    });
  },

  async createComplaint(data, student) {
    const online = await request('/complaints', { method: 'POST', body: JSON.stringify(data) });
    if (online) return online;

    const state = getMockState();
    const autoPriority = detectPriority(data.title, data.description);
    const newComplaint = {
      _id: 'cmp_' + Date.now(),
      student: student._id,
      studentName: student.name,
      roomNumber: data.roomNumber || student.roomNumber || 'N/A',
      title: data.title,
      description: data.description,
      category: data.category,
      priority: data.priority || autoPriority,
      status: 'Pending',
      assignedTo: 'Unassigned',
      createdAt: new Date().toISOString(),
    };
    state.complaints.unshift(newComplaint);
    saveMockState(state);
    return { complaint: newComplaint, detectedPriority: autoPriority };
  },

  async updateComplaint(id, updates) {
    const online = await request(`/complaints/${id}`, { method: 'PUT', body: JSON.stringify(updates) });
    if (online) return online;

    const state = getMockState();
    const idx = state.complaints.findIndex((c) => c._id === id);
    if (idx !== -1) {
      state.complaints[idx] = { ...state.complaints[idx], ...updates };
      if (updates.status === 'Resolved') state.complaints[idx].resolvedAt = new Date().toISOString();
      saveMockState(state);
      return state.complaints[idx];
    }
    throw new Error('Complaint not found');
  },

  // LEAVES / GATE PASSES & NOTIFICATIONS
  async getLeaves(studentId = null) {
    const online = studentId ? await request('/leaves/my') : await request('/leaves');
    if (online) return online;

    const state = getMockState();
    const list = studentId ? state.leaves.filter((l) => l.student === studentId) : state.leaves;
    return list.map((l) => {
      const student = state.users.find((u) => u._id === l.student);
      return { ...l, student: student || { name: l.studentName, rollNo: l.rollNo, roomNumber: l.roomNumber, phone: l.phone, parentPhone: l.parentPhone } };
    });
  },

  async applyLeave(data, student) {
    const online = await request('/leaves', { method: 'POST', body: JSON.stringify(data) });
    if (online) return online;

    const state = getMockState();
    const newLeave = {
      _id: 'lv_' + Date.now(),
      student: student._id,
      studentName: student.name,
      rollNo: student.rollNo,
      roomNumber: student.roomNumber,
      phone: student.phone,
      parentPhone: student.parentPhone,
      ...data,
      status: 'Pending',
      passCode: 'PASS-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
    };
    state.leaves.unshift(newLeave);
    saveMockState(state);
    return newLeave;
  },

  async updateLeaveStatus(id, status, wardenRemarks = '') {
    const online = await request(`/leaves/${id}`, { method: 'PUT', body: JSON.stringify({ status, wardenRemarks }) });
    if (online) return online;

    const state = getMockState();
    const idx = state.leaves.findIndex((l) => l._id === id);
    if (idx !== -1) {
      state.leaves[idx].status = status;
      state.leaves[idx].wardenRemarks = wardenRemarks;

      // Dispatch Notification to Student
      const studentId = state.leaves[idx].student;
      state.notifications.unshift({
        _id: 'notif_' + Date.now(),
        recipient: studentId,
        title: status === 'Approved' ? '🎉 Outing Gate Pass APPROVED!' : '⚠️ Leave Request REJECTED',
        message:
          status === 'Approved'
            ? `Your leave request for "${state.leaves[idx].leaveType}" has been approved by Warden madam. Your Pass Code is ${state.leaves[idx].passCode}. Show this to Security Guard at Main Gate.`
            : `Your leave request was rejected by Warden. Note: ${wardenRemarks || 'Contact Warden Office'}`,
        type: 'gate_pass',
        status: 'unread',
        metadata: {
          passCode: state.leaves[idx].passCode,
          actionStatus: status,
        },
        createdAt: new Date().toISOString(),
      });

      saveMockState(state);
      return state.leaves[idx];
    }
    throw new Error('Leave record not found');
  },

  async getNotifications(studentId) {
    const online = await request('/leaves/notifications');
    if (online) return online;

    const state = getMockState();
    return state.notifications.filter((n) => n.recipient === studentId);
  },

  // SECURITY GUARD GATE OPERATIONS
  async verifyGatePass(passCode, rollNo) {
    const online = await request('/gate/verify-pass', {
      method: 'POST',
      body: JSON.stringify({ passCode, rollNo }),
    });
    if (online) return online;

    const state = getMockState();
    const leave = state.leaves.find(
      (l) =>
        (passCode && l.passCode?.toUpperCase() === passCode.trim().toUpperCase()) ||
        (rollNo && l.rollNo?.toUpperCase() === rollNo.trim().toUpperCase())
    );

    if (!leave || leave.status !== 'Approved') {
      return { valid: false, message: '❌ Invalid or Unapproved Pass! No active approved gate pass found.' };
    }

    const isCheckedOut = state.gateLogs.some(
      (g) => g.passCode === leave.passCode && g.status === 'Currently Outside'
    );

    return {
      valid: true,
      message: '✅ Valid Approved Gate Pass!',
      leave,
      isCheckedOut,
    };
  },

  async recordCheckOut(passCode, securityNotes = '', gateNumber = 'Main Gate 1', guardName = 'Officer Shankar') {
    const online = await request('/gate/check-out', {
      method: 'POST',
      body: JSON.stringify({ passCode, securityNotes, gateNumber }),
    });
    if (online) return online;

    const state = getMockState();
    const leave = state.leaves.find((l) => l.passCode?.toUpperCase() === passCode.trim().toUpperCase());
    if (!leave) throw new Error('Approved pass not found');

    const newLog = {
      _id: 'gl_' + Date.now(),
      studentName: leave.studentName,
      rollNo: leave.rollNo,
      roomNumber: leave.roomNumber,
      phone: leave.phone || '+91 9988776655',
      parentPhone: leave.parentPhone || '+91 9123456780',
      passCode: leave.passCode,
      leaveType: leave.leaveType,
      destination: leave.destinationAddress,
      outTime: new Date().toISOString(),
      expectedInTime: leave.toDate,
      inTime: null,
      status: 'Currently Outside',
      gateNumber,
      guardName,
      securityNotes,
    };

    state.gateLogs.unshift(newLog);
    saveMockState(state);
    return { success: true, message: `🚪 Check-Out Recorded for ${leave.studentName} at ${new Date().toLocaleTimeString('en-IN')}`, gateLog: newLog };
  },

  async recordCheckIn(passCode, securityNotes = '') {
    const online = await request('/gate/check-in', {
      method: 'POST',
      body: JSON.stringify({ passCode, securityNotes }),
    });
    if (online) return online;

    const state = getMockState();
    const log = state.gateLogs.find(
      (g) => g.passCode?.toUpperCase() === passCode.trim().toUpperCase() && g.status === 'Currently Outside'
    );
    if (!log) throw new Error('No active Outside movement record found for this pass code');

    log.inTime = new Date().toISOString();
    log.status = 'Returned / Inside';
    if (securityNotes) log.securityNotes += ` | Return Note: ${securityNotes}`;

    saveMockState(state);
    return { success: true, message: `🏠 Check-In Recorded: ${log.studentName} returned to hostel at ${new Date().toLocaleTimeString('en-IN')}`, gateLog: log };
  },

  async getGateLogs() {
    const online = await request('/gate/logs');
    if (online) return online;

    const state = getMockState();
    const currentlyOutside = state.gateLogs.filter((g) => g.status === 'Currently Outside').length;
    return {
      logs: state.gateLogs,
      stats: {
        currentlyOutside,
        todayTotalExits: state.gateLogs.length,
      },
    };
  },

  // WARDEN MESS & FOOD QUALITY MONITORING
  async getMessRecords() {
    const online = await request('/mess');
    if (online) return online;
    return getMockState().messRecords;
  },

  async saveMessInspection(inspectionData, wardenName = 'Warden Radhika Rao') {
    const online = await request('/mess/inspect', {
      method: 'POST',
      body: JSON.stringify(inspectionData),
    });
    if (online) return online;

    const state = getMockState();
    const newRecord = {
      _id: 'mess_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...inspectionData,
      inspectorName: wardenName,
      createdAt: new Date().toISOString(),
    };
    state.messRecords.unshift(newRecord);
    saveMockState(state);
    return newRecord;
  },

  // NOTICES
  async getNotices() {
    const online = await request('/notices');
    if (online) return online;
    return getMockState().notices;
  },

  async createNotice(noticeData, authorName = 'Chief Warden') {
    const online = await request('/notices', { method: 'POST', body: JSON.stringify(noticeData) });
    if (online) return online;

    const state = getMockState();
    const newNotice = {
      _id: 'ntc_' + Date.now(),
      ...noticeData,
      postedBy: authorName,
      createdAt: new Date().toISOString(),
    };
    state.notices.unshift(newNotice);
    saveMockState(state);
    return newNotice;
  },

  async deleteNotice(id) {
    const online = await request(`/notices/${id}`, { method: 'DELETE' });
    if (online) return online;

    const state = getMockState();
    state.notices = state.notices.filter((n) => n._id !== id);
    saveMockState(state);
    return { success: true };
  },

  // ATTENDANCE
  async getAttendance(date) {
    const online = await request(`/attendance?date=${date}`);
    if (online) return online;

    const state = getMockState();
    return state.attendance;
  },

  async saveAttendance(date, records, wardenName = 'Warden') {
    const online = await request('/attendance', { method: 'POST', body: JSON.stringify({ date, records }) });
    if (online) return online;

    const state = getMockState();
    state.attendance = { date, markedBy: wardenName, records };
    saveMockState(state);
    return { success: true, attendance: state.attendance };
  },

  // STUDENTS DIRECTORY
  async getStudents(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const online = await request(`/students${query ? '?' + query : ''}`);
    if (online) return online;

    const state = getMockState();
    let students = state.users.filter((u) => u.role === 'student');
    if (filters.department) students = students.filter((s) => s.department === filters.department);
    if (filters.year) students = students.filter((s) => s.year === filters.year);
    if (filters.status) students = students.filter((s) => s.status === filters.status);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      students = students.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.rollNo?.toLowerCase().includes(q) ||
          s.roomNumber?.toLowerCase().includes(q)
      );
    }
    return students;
  },

  // ANALYTICS
  async getAnalytics() {
    const online = await request('/analytics/dashboard');
    if (online) return online;

    const state = getMockState();
    const totalStudents = state.users.filter((u) => u.role === 'student').length;
    const allocatedStudents = state.users.filter((u) => u.role === 'student' && u.roomNumber && u.roomNumber !== 'Unassigned').length;
    const totalCapacity = state.rooms.reduce((acc, r) => acc + r.capacity, 0);
    const totalOccupied = state.rooms.reduce((acc, r) => acc + r.occupied, 0);

    const totalFeeBilled = state.fees.reduce((acc, f) => acc + (f.totalAmount || 0), 0);
    const totalFeeCollected = state.fees.reduce((acc, f) => acc + (f.paidAmount || 0), 0);
    const totalFeePending = state.fees.reduce((acc, f) => acc + (f.dueAmount || 0), 0);

    const pendingComplaints = state.complaints.filter((c) => c.status !== 'Resolved').length;
    const resolvedComplaints = state.complaints.filter((c) => c.status === 'Resolved').length;
    const emergencyComplaints = state.complaints.filter((c) => c.priority === 'Emergency' && c.status !== 'Resolved').length;
    const outsideCount = state.gateLogs.filter((g) => g.status === 'Currently Outside').length;

    return {
      summary: {
        totalStudents,
        allocatedStudents,
        pendingAllocation: totalStudents - allocatedStudents,
        totalRooms: state.rooms.length,
        totalCapacity,
        totalOccupied,
        vacantBeds: Math.max(0, totalCapacity - totalOccupied),
        occupancyRate: totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0,
        totalFeeBilled,
        totalFeeCollected,
        totalFeePending,
        totalComplaints: state.complaints.length,
        pendingComplaints,
        resolvedComplaints,
        emergencyComplaints,
        pendingLeaves: state.leaves.filter((l) => l.status === 'Pending').length,
        currentlyOutside: outsideCount,
      },
      charts: {
        complaintsByCategory: [
          { category: 'Electrical', count: state.complaints.filter((c) => c.category === 'Electrical').length },
          { category: 'Plumbing', count: state.complaints.filter((c) => c.category === 'Plumbing').length },
          { category: 'Wi-Fi / Internet', count: state.complaints.filter((c) => c.category === 'Wi-Fi / Internet').length },
          { category: 'Food & Mess', count: state.complaints.filter((c) => c.category === 'Food & Mess').length },
        ],
        complaintsByPriority: [
          { priority: 'Emergency', count: state.complaints.filter((c) => c.priority === 'Emergency').length },
          { priority: 'High', count: state.complaints.filter((c) => c.priority === 'High').length },
          { priority: 'Medium', count: state.complaints.filter((c) => c.priority === 'Medium').length },
          { priority: 'Low', count: state.complaints.filter((c) => c.priority === 'Low').length },
        ],
        monthlyRevenue: [
          { month: 'Jul', collected: 140000, target: 160000 },
          { month: 'Aug', collected: 220000, target: 200000 },
          { month: 'Sep', collected: 360000, target: 320000 },
          { month: 'Oct', collected: 310000, target: 300000 },
          { month: 'Nov', collected: 195000, target: 200000 },
          { month: 'Dec', collected: 440000, target: 400000 },
        ],
      },
    };
  },
};
