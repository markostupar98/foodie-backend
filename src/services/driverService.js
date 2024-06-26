const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.fetchDriverProfile = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    select: {
      id: true,
      fullName: true,
      address: true,
      latitude: true,
      longitude: true,
    },
  });
};

exports.updateDriverProfile = async (driverId, data) => {
  return await prisma.driver.update({
    where: { id: parseInt(driverId) },
    data,
  });
};
