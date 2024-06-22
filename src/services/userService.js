const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fetching user profile
exports.fetchUserProfile = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    select: {
      id: true,
      fullName: true,
      address: true,
      latitude: true,
      longitude: true
    }
  });
}

// Updating user profile
exports.updateUserProfile = async (userId, data) => {
  return await prisma.user.update({
    where: { id: parseInt(userId) },
    data
  });
};