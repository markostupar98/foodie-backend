const {
  saveToken,
  sendPushNotification,
} = require("../services/notificationService");

exports.registerToken = async (req, res) => {
  try {
    const { userId, token } = req.body;
    if (!userId || !token) {
      return res.status(400).json({ message: "UserId and token are required" });
    }

    await saveToken(userId, token);
    res.status(200).json({ message: "Token registered successfully" });
  } catch (error) {
    console.error("Error registering token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.sendNotification = async (req, res) => {
  try {
    const { token, message } = req.body;
    if (!token || !message) {
      return res
        .status(400)
        .json({ message: "Token and message are required" });
    }

    await sendPushNotification(token, message);
    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
