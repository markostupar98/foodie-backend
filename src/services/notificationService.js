// sendPushNotification.js
const admin = require("../config/firebase");

exports.sendPushNotification = async (token, message) => {
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

exports.saveToken = async (token) => {
  try {
    await prisma.notificationToken.create({
      data: { token },
    });
  } catch (error) {
    console.error("Error saving token:", error);
    throw error;
  }
};
