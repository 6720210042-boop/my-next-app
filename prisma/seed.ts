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

    // 1. เจ้าของเว็บไซต์ (Site Owner)
    const owner = await prisma.user.upsert({
        where: { email: '6720210042@tsu.ac.th' },
        update: { password: hashed },
        create: { email: '6720210042@tsu.ac.th', password: hashed },
    });

    // 2. สมาชิกทีม / Partner
    const partner = await prisma.user.upsert({
        where: { email: '6720210051@tsu.ac.th' },
        update: { password: hashed },
        create: { email: '6720210051@tsu.ac.th', password: hashed },
    });

    // 3. Admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@tsu.ac.th' },
        update: { password: hashed },
        create: { email: 'admin@tsu.ac.th', password: hashed },
    });

    // 4. User 1
    const user1 = await prisma.user.upsert({
        where: { email: 'user1@tsu.ac.th' },
        update: { password: hashed },
        create: { email: 'user1@tsu.ac.th', password: hashed },
    });

    // 5. User 2
    const user2 = await prisma.user.upsert({
        where: { email: 'user2@tsu.ac.th' },
        update: { password: hashed },
        create: { email: 'user2@tsu.ac.th', password: hashed },
    });

    // 6. ข้อความของ Owner
    const msgOwner = await prisma.message.upsert({
        where: { email: '6720210042@tsu.ac.th' },
        update: { authorId: owner.id },
        create: {
            name: 'ปฐมพร บัวเนี่ยว',
            email: '6720210042@tsu.ac.th',
            message: 'ยินดีต้อนรับสู่ Portfolio & Lab ของผมครับ สามารถติดต่องานหรือสอบถามได้เลยครับ',
            authorId: owner.id,
        },
    });

    // 7. ข้อความของ User 1
    const msg1 = await prisma.message.upsert({
        where: { email: 'user1@tsu.ac.th' },
        update: { authorId: user1.id },
        create: {
            name: 'User One',
            email: 'user1@tsu.ac.th',
            message: 'ข้อความสำหรับทดสอบระบบ Version Control & Security',
            authorId: user1.id,
        },
    });

    // 8. คอมเมนต์ตัวอย่าง
    await prisma.comment.deleteMany({});
    await prisma.comment.create({
        data: {
            author: '6720210051@tsu.ac.th',
            authorId: partner.id,
            content: 'เว็บออกแบบสวยงามมากครับ ธีมสีชมพูดำเข้ากันได้ดีมากเลย 👍',
            messageId: msgOwner.id,
        },
    });

    console.log('=== SEED RESULT COMPLETED ===');
    console.log('Site Owner:', owner.email);
    console.log('Partner   :', partner.email);
    console.log('Admin     :', admin.email);
    console.log('User 1    :', user1.email);
    console.log('User 2    :', user2.email);
    console.log('All passwords set to: 1234');
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