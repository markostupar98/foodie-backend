const userService = require("../services/userService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get profile

exports.getUserProfile = async (req, res) => {
  try {
    const profile = await userService.fetchUserProfile(req.params.userId);
    if (!profile) {
      console.log(`User not found: ${req.params.userId}`);
      return res.status(404).send("User not found");
    }
    res.json(profile);
  } catch (error) {
    console.log(`Error fetching user profile: ${error}`);
    res.status(500).send(error.message);
  }
};

// Update profile
exports.updateUserProfile = async (req, res) => {
  try {
    const profile = await userService.updateUserProfile(
      req.params.userId,
      req.body
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//

exports.registerToken = async (req, res) => {
  const { userId, token, userType } = req.body;
  try {
    if (userType === "user") {
      await prisma.user.update({
        where: { id: parseInt(userId) },
        data: { notificationToken: token },
      });
    } else if (userType === "driver") {
      await prisma.driver.update({
        where: { id: parseInt(userId) },
        data: { notificationToken: token },
      });
    }
    res.status(200).json({ message: "Token registered successfully" });
  } catch (error) {
    console.error("Error registering token:", error);
    res.status(500).json({ error: "Failed to register token" });
  }
};
