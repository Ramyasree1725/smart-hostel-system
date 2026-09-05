const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    officerId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['COMMANDING_OFFICER', 'FIELD_OFFICER', 'MEDICAL_OFFICER', 'SYSTEM_ADMIN'],
      default: 'FIELD_OFFICER',
    },
    rank: {
      type: String,
      default: 'Captain',
    },
    unit: {
      type: String,
      default: 'Command Unit',
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
