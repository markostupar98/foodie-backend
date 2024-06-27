// sendPushNotification.js
const admin = require("../config/firebase");

const sendPushNotification = async (token, message) => {
  const payload = {
    notification: {
      title: "Order Update",
      body: message,
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(payload);
    console.log("Successfully sent message:", response);
    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

const saveToken = async (userId, token) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { notificationToken: token },
    });
  } catch (error) {
    console.error("Error saving token:", error);
    throw error;
  }
};

module.exports = { sendPushNotification, saveToken };
