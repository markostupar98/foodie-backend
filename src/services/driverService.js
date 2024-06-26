const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.fetchDriverProfile = async (driverId) => {
  try {
    const profile = await prisma.driver.findUnique({
      where: { id: parseInt(driverId) },
      select: {
        id: true,
        fullName: true,
        phone: true,
        vehicleType: true,
      },
    });
    return { profile };
  } catch (error) {
    console.error("Error fetching driver profile:", error);
    return null;
  }
};

exports.updateDriverProfile = async (driverId, data) => {
  try {
    const updatedProfile = await prisma.driver.update({
      where: { id: parseInt(driverId) },
      data,
    });
    return { profile: updatedProfile };
  } catch (error) {
    console.error("Error updating driver profile:", error);
    return null;
  }
};
