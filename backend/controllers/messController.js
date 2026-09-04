const MessMonitoring = require('../models/MessMonitoring');

// @desc    Get mess monitoring records & today's food status
// @route   GET /api/mess
const getMessRecords = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    let records = await MessMonitoring.find().sort({ createdAt: -1 });

    // If no records for today, initialize default daily meals
    if (records.length === 0) {
      const defaultMeals = [
        {
          date: today,
          mealType: 'Breakfast',
          menuItems: ['Idli & Sambar', 'Medu Vada', 'Coconut Chutney', 'Tea / Coffee / Milk'],
          foodQualityRating: 4.8,
          tasteRating: 4.6,
          hygieneStatus: 'Excellent',
          inspectorName: 'Warden Radhika Rao',
          wardenRemarks: 'Hot breakfast served on time. Kitchen counters sanitized.',
        },
        {
          date: today,
          mealType: 'Lunch',
          menuItems: ['Steamed Rice', 'Dal Tadka', 'Paneer Butter Masala', 'Curd', 'Papad & Salad'],
          foodQualityRating: 4.5,
          tasteRating: 4.3,
          hygieneStatus: 'Good',
          inspectorName: 'Warden Radhika Rao',
          wardenRemarks: 'Good quality paneer and fresh vegetables used. Proper oil levels.',
        },
        {
          date: today,
          mealType: 'Dinner',
          menuItems: ['Phulka / Chapati', 'Mixed Veg Curry', 'Jeera Rice', 'Sambar', 'Gulab Jamun'],
          foodQualityRating: 4.7,
          tasteRating: 4.5,
          hygieneStatus: 'Excellent',
          inspectorName: 'Warden Radhika Rao',
          wardenRemarks: 'Inspected hygiene before evening serving. Clean dining hall.',
        },
      ];
      records = await MessMonitoring.insertMany(defaultMeals);
    }

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Record/Update Mess Food Quality Inspection (Warden)
// @route   POST /api/mess/inspect
const saveMessInspection = async (req, res) => {
  try {
    const { mealType, menuItems, foodQualityRating, tasteRating, hygieneStatus, wardenRemarks } = req.body;
    const today = new Date().toISOString().split('T')[0];

    const record = await MessMonitoring.create({
      date: today,
      mealType,
      menuItems: Array.isArray(menuItems) ? menuItems : menuItems.split(',').map((s) => s.trim()),
      foodQualityRating: Number(foodQualityRating) || 4.5,
      tasteRating: Number(tasteRating) || 4.0,
      hygieneStatus: hygieneStatus || 'Good',
      inspectorName: req.user?.name || 'Warden',
      wardenRemarks: wardenRemarks || 'Inspected and certified food quality.',
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMessRecords,
  saveMessInspection,
};
