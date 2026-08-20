require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  console.log('Clearing old data to prepare for migration...');
  await prisma.message.deleteMany({});
  console.log('Successfully cleared database!');
}
run().finally(() => prisma.$disconnect());
