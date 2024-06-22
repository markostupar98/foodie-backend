const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.fetchRestaurants = async () => {
  return await prisma.restaurants.findMany({
    include: {
      category: true,
    },
  });
};

// Details without coords
// services/restaurantService.js

exports.getRestaurantDetailsBasic = async (restaurantId) => {
  return await prisma.restaurants.findUnique({
    where: { id: parseInt(restaurantId) },
    include: {
      category: true,
      dishes: true,
    },
  });
};

exports.fetchRestaurantDetailsComplete = async (restaurantId) => {
  try {
    console.log(`Fetching details for restaurant ID: ${restaurantId}`);
    const restaurant = await prisma.restaurants.findUnique({
      where: { id: parseInt(restaurantId) },
      include: {
        category: true,
        dishes: true,
      },
    });

    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    
    return restaurant;
  } catch (error) {
    console.error("Error fetching complete restaurant details:", error);
    throw error;
  }
};