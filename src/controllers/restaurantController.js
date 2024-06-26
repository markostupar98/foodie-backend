const restaurantService = require("../services/restaurantService");

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantService.fetchRestaurants();
    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error.message);
    console.error(error.stack);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get basic restaurant details
exports.getRestaurantDetailsBasic = async (req, res) => {
  try {
    const restaurant = await restaurantService.getRestaurantDetailsBasic(
      req.params.id
    );
    if (!restaurant) {
      console.warn(`Restaurant not found for ID: ${req.params.id}`);
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    console.error("Error fetching basic restaurant details:", error.message);
    console.error(error.stack);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get complete restaurant details with coordinates
exports.getRestaurantDetailsComplete = async (req, res) => {
  try {
    const restaurant = await restaurantService.fetchRestaurantDetailsComplete(
      req.params.id
    );
    if (!restaurant) {
      console.warn(`Restaurant not found for ID: ${req.params.id}`);
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    console.error("Error fetching complete restaurant details:", error.message);
    console.error(error.stack);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
