const mongoose = require('mongoose');

const messMonitoringSchema = new mongoose.Schema(
  {
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    mealType: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Evening Snacks', 'Dinner'],
      required: true,
    },
    menuItems: [String],
    foodQualityRating: {
      type: Number, // 1 to 5 stars
      default: 4.5,
    },
    tasteRating: {
      type: Number,
      default: 4.0,
    },
    hygieneStatus: {
      type: String,
      enum: ['Excellent', 'Good', 'Satisfactory', 'Needs Improvement', 'Critical Attention'],
      default: 'Good',
    },
    waterQualityChecked: {
      type: Boolean,
      default: true,
    },
    inspectorName: {
      type: String,
      default: 'Warden Radhika Rao',
    },
    wardenRemarks: {
      type: String,
      default: 'Kitchen inspected. Fresh ingredients used, clean serving area.',
    },
    studentFeedbackCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MessMonitoring', messMonitoringSchema);
