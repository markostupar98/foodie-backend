const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.fetchDriverProfile = async (driverId) => {
  return await prisma.driver.findUnique({
    where: { id: parseInt(driverId) },
    select: {
      id: true,
      fullName: true,
      phone: true,
      vehicleType: true,
    },
  });
};

exports.updateDriverProfile = async (driverId, data) => {
  return await prisma.driver.update({
    where: { id: parseInt(driverId) },
    data,
  });
};
