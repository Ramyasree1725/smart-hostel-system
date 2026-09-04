const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'warden', 'security'],
      default: 'student',
    },
    // Student specific fields
    rollNo: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      enum: ['Computer Science', 'Information Technology', 'Electronics & Comm.', 'Mechanical', 'Civil', 'Electrical', 'Other'],
      default: 'Computer Science',
    },
    year: {
      type: String,
      enum: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
      default: '1st Year',
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Male',
    },
    phone: {
      type: String,
      default: '',
    },
    parentName: {
      type: String,
      default: 'Parent / Guardian',
    },
    parentPhone: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    bloodGroup: {
      type: String,
      default: 'O+',
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      default: null,
    },
    roomNumber: {
      type: String,
      default: 'Unassigned',
    },
    bedNumber: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    },
    status: {
      type: String,
      enum: ['Active', 'Pending Room', 'Graduated', 'Suspended'],
      default: 'Pending Room',
    },
    // Security Guard specific fields
    gateNumber: {
      type: String,
      default: 'Main Gate 1',
    },
    shift: {
      type: String,
      enum: ['Morning Shift (6AM-2PM)', 'Evening Shift (2PM-10PM)', 'Night Shift (10PM-6AM)'],
      default: 'Evening Shift (2PM-10PM)',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
