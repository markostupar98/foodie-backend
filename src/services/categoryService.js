const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.fetchCategories = async () => {
  return await prisma.category.findMany();
};