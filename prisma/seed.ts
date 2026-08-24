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

    // 1. สร้าง/อัปเดต User 1 (เจ้าของข้อความ)
    const user1 = await prisma.user.upsert({
        where: { email: 'user1@tsu.ac.th' },
        update: { password: hashed },
        create: { email: 'user1@tsu.ac.th', password: hashed },
    });

    // 2. สร้าง/อัปเดต User 2 (คนที่จะมาทดสอบแอบแก้ข้อความ)
    const user2 = await prisma.user.upsert({
        where: { email: 'user2@tsu.ac.th' },
        update: { password: hashed },
        create: { email: 'user2@tsu.ac.th', password: hashed },
    });

    // 3. สร้างข้อความที่มี authorId เป็น User 1
    const msg = await prisma.message.upsert({
        where: { email: 'user1@tsu.ac.th' },
        update: { authorId: user1.id, message: 'ข้อความลับของ User 1 (ห้ามคนอื่นแก้ไข)' },
        create: {
            name: 'User One',
            email: 'user1@tsu.ac.th',
            message: 'ข้อความลับของ User 1 (ห้ามคนอื่นแก้ไข)',
            authorId: user1.id,
        },
    });

    console.log('=== SEED RESULT ===');
    console.log('User 1 (Owner):', user1.email, 'ID:', user1.id);
    console.log('User 2 (Attacker):', user2.email, 'ID:', user2.id);
    console.log('Message ID (ของ User 1):', msg.id);
}

main().then(async () => {
    await prisma.$disconnect();
    await pool.end();
    process.exit(0);
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
});