const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    semester: {
      type: String,
      required: true,
      default: 'Semester 1 (2026-27)',
    },
    roomFee: {
      type: Number,
      required: true,
      default: 35000,
    },
    messFee: {
      type: Number,
      required: true,
      default: 20000,
    },
    maintenanceFee: {
      type: Number,
      required: true,
      default: 5000,
    },
    securityDeposit: {
      type: Number,
      required: true,
      default: 5000,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    dueAmount: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Paid', 'Pending', 'Partial', 'Overdue'],
      default: 'Pending',
    },
    paymentHistory: [
      {
        transactionId: String,
        amount: Number,
        method: {
          type: String,
          enum: ['UPI', 'Debit Card', 'Credit Card', 'Net Banking', 'Cash'],
        },
        paidAt: {
          type: Date,
          default: Date.now,
        },
        receiptNo: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Fee', feeSchema);
