const express = require("express");
const router = express.Router();
const {
  registerToken,
  sendNotification,
} = require("../controllers/notificationController");

router.post("/register-token", registerToken);
router.post("/send-notification", sendNotification);

module.exports = router;
