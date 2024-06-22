const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantDetailsBasic);
router.get('/:id/complete', restaurantController.getRestaurantDetailsComplete);


module.exports = router;