// sendPushNotification.js
const admin = require("../config/firebase");

const sendPushNotification = async (token, message) => {
  const payload = {
    notification: {
      title: "New Order",
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

module.exports = { sendPushNotification };
