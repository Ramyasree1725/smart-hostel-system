const Fee = require('../models/Fee');
const User = require('../models/User');

// @desc    Get logged in student fee record
// @route   GET /api/fees/my
const getMyFee = async (req, res) => {
  try {
    let fee = await Fee.findOne({ student: req.user._id });

    // If no fee record exists yet for student, auto-generate standard semester invoice
    if (!fee) {
      const roomFee = req.user.room ? 45000 : 35000;
      const messFee = 20000;
      const maintenanceFee = 5000;
      const securityDeposit = 5000;
      const totalAmount = roomFee + messFee + maintenanceFee + securityDeposit;

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 30);

      fee = await Fee.create({
        student: req.user._id,
        semester: 'Semester 1 (2026-27)',
        roomFee,
        messFee,
        maintenanceFee,
        securityDeposit,
        totalAmount,
        paidAmount: 0,
        dueAmount: totalAmount,
        dueDate,
        status: 'Pending',
      });
    }

    res.json(fee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Pay Hostel Fee (Simulated Gateway)
// @route   POST /api/fees/pay
const payFee = async (req, res) => {
  try {
    const { amount, paymentMethod } = req.body;
    const fee = await Fee.findOne({ student: req.user._id });

    if (!fee) {
      return res.status(404).json({ message: 'Fee record not found' });
    }

    const payNum = Number(amount);
    if (payNum <= 0 || payNum > fee.dueAmount) {
      return res.status(400).json({ message: `Invalid payment amount. Maximum payable due is ₹${fee.dueAmount}` });
    }

    const receiptNo = 'HST-' + Date.now().toString().slice(-6);
    const transactionId = 'TXN_' + Math.random().toString(36).substring(2, 10).toUpperCase();

    fee.paidAmount += payNum;
    fee.dueAmount = Math.max(0, fee.totalAmount - fee.paidAmount);

    if (fee.dueAmount === 0) {
      fee.status = 'Paid';
    } else {
      fee.status = 'Partial';
    }

    fee.paymentHistory.push({
      transactionId,
      amount: payNum,
      method: paymentMethod || 'UPI',
      paidAt: new Date(),
      receiptNo,
    });

    await fee.save();

    res.json({
      success: true,
      message: `✅ Payment of ₹${payNum} processed successfully!`,
      receiptNo,
      transactionId,
      updatedFee: fee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all fees summary (Admin)
// @route   GET /api/fees
const getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find().populate('student', 'name email rollNo department year phone roomNumber');
    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Send automated fee reminder (Admin)
// @route   POST /api/fees/remind/:id
const sendFeeReminder = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id).populate('student', 'name email phone');
    if (!fee) {
      return res.status(404).json({ message: 'Fee record not found' });
    }

    // Automated reminder trigger
    const reminderNotice = {
      studentName: fee.student.name,
      studentEmail: fee.student.email,
      studentPhone: fee.student.phone,
      dueAmount: fee.dueAmount,
      dueDate: fee.dueDate,
      reminderSentAt: new Date(),
      message: `🔔 Reminder: Dear ${fee.student.name}, your hostel fee balance of ₹${fee.dueAmount} is due. Please settle before the deadline.`,
    };

    res.json({
      success: true,
      message: `Fee reminder dispatched to ${fee.student.name} (${fee.student.email})`,
      reminderNotice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMyFee,
  payFee,
  getAllFees,
  sendFeeReminder,
};
