const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");

router.get("/:driverId/profile", driverController.getDriverProfile);
router.put("/:driverId/profile", driverController.updateDriverProfile);
