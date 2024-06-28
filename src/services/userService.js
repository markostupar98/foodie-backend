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
      username: true,
      latitude: true,
      longitude: true,
    },
  });
};

// Updating user profile
exports.updateUserProfile = async (userId, data) => {
  return await prisma.user.update({
    where: { id: parseInt(userId) },
    data,
  });
};

// exports.updateUserProfile = async (driverId, updatedData) => {
//   try {
//     const updatedProfile = await prisma.user.update({
//       where: { id: parseInt(userId) },
//       data: updatedData,
//     });
//     return { profile: updatedProfile };
//   } catch (error) {
//     return { error: "Error updating user profile" };
//   }
// };
