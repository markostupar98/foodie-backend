const categoryService = require('../services/categoryService');

exports.getCategories = async (req, res) => {
  try {
    const categories = await categoryService.fetchCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};