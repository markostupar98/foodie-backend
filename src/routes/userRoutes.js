const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// user routes
router.get("/:userId/profile", userController.getUserProfile);
router.put("/:userId/profile", userController.updateUserProfile);
router.post("/register-token", userController.registerToken);

module.exports = router;
