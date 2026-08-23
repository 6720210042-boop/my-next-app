import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const hashed = await bcrypt.hash('1234', 10);
    await prisma.user.upsert({
        where: { email: 'admin@tsu.ac.th' },
        update: { password: hashed },
        create: { email: 'admin@tsu.ac.th', password: hashed },
    });
    console.log('Seed user done: admin@tsu.ac.th');
}

main().finally(() => prisma.$disconnect());