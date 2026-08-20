import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.comment.createMany({
        data: [
            { author: 'Alice', content: 'คอมเมนต์แรกเลย!' },
            { author: 'Bob', content: 'เห็นด้วยกับที่บอกมาเลย' },
        ],
    });
    console.log('Seed comments done!');
}

main().finally(() => prisma.$disconnect());