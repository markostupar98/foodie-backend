const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// Generate jwt
exports.generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET, // Tajni ključ za potpis tokena
    { expiresIn: '1h' } // Token ističe za 1 sat
  );
};

// Create user
exports.createUser = async ({ email, password, fullName, username, address }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      fullName,
      username,
      role:'user',
      address,
      latitude:null,
      longitude:null
    },
  });
};

// Validate user
exports.validateUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
};

// Create driver
exports.createDriver = async ({ email, password, fullName, phone, vehicleType }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.driver.create({
    data: {
      email,
      password: hashedPassword,
      fullName,
      phone,
      vehicleType,
    },
  });
};

// Driver validation
exports.validateDriver = async (email, password) => {
  const driver = await prisma.driver.findUnique({
    where: { email },
  });

  if (!driver) return null;

  const isMatch = await bcrypt.compare(password, driver.password);
  return isMatch ? driver : null;
};
