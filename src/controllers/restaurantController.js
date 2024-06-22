const restaurantService = require('../services/restaurantService');

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantService.fetchRestaurants();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Basic
exports.getRestaurantDetailsBasic = async (req, res) => {
  try {
    const restaurant = await restaurantService.getRestaurantDetailsBasic(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// With coords

exports.getRestaurantDetailsComplete = async (req, res) => {
  try {
    const restaurant = await restaurantService.fetchRestaurantDetailsComplete(req.params.id);
    if (!restaurant) {
      console.log(`Restaurant not found for ID: ${req.params.id}`);
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    console.error("Error fetching complete restaurant details:", error.message);
    res.status(500).json({ message: error.message });
  }
};