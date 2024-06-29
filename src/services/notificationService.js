// sendPushNotification.js
const admin = require("../config/firebase");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.sendPushNotification = async (token, message) => {
  const payload = {
    notification: {
      title: "Order Update",
      body: message,
    },
    token: token,
  };

  try {
    const response = await admin.getMessaging().send(payload);
    console.log("Successfully sent message:", response);
    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Save user token
exports.saveToken = async (userId, token) => {
  if (!userId || !token) {
    throw new Error("UserId and token are required");
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { notificationToken: token },
    });
    return { message: "Token saved successfully" };
  } catch (error) {
    console.error("Error saving token:", error);
    throw new Error("Internal server error");
  }
};

// Save driver token
exports.saveDriverToken = async (driverId, token) => {
  if (!driverId || !token) {
    throw new Error("driverId and token are required");
  }

  try {
    await prisma.driver.update({
      where: { id: driverId },
      data: { notificationToken: token },
    });
    return { message: "Token saved successfully" };
  } catch (error) {
    console.error("Error saving token:", error);
    throw new Error("Internal server error");
  }
};
