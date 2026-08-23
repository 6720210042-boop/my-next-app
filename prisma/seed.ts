import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    // 1. Hash รหัสผ่านด้วย bcrypt (salt rounds = 10)
    const hashedPassword = await bcrypt.hash('1234', 10);

    // 2. สร้าง User เริ่มต้น (admin / 1234)
    const user = await prisma.user.upsert({
        where: { username: 'admin' },
        update: { password: hashedPassword },
        create: {
            username: 'admin',
            password: hashedPassword,
        },
    });

    console.log('Seed user done:', user.username);
}

main().finally(() => prisma.$disconnect());