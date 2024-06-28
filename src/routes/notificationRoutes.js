const express = require("express");
const router = express.Router();
const {
  registerToken,
  sendNotification,
  registerDriverToken,
} = require("../controllers/notificationController");

router.post("/register-token", registerToken);
router.post("/register-token/driver", registerDriverToken);
router.post("/send-notification", sendNotification);

module.exports = router;
