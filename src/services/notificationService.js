// sendPushNotification.js
const admin = require("../config/firebase");

const sendPushNotification = (token, message) => {
  const payload = {
    notification: {
      title: "New Order",
      body: message,
    },
    token: token,
  };

  admin
    .messaging()
    .send(payload)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

module.exports = { sendPushNotification };
