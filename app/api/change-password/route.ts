import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { withErrorHandling } from '@/lib/withErrorHandling';
import { ValidationError, ForbiddenError } from '@/lib/errors';
import { changePasswordSchema } from '@/lib/schemas';
import { ZodError } from 'zod';

export const POST = withErrorHandling(async (request: Request) => {
    // 1. ตรวจสอบ Session (Authorization)
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session')?.value;
    if (!sessionId) {
        throw new ForbiddenError('กรุณาเข้าสู่ระบบก่อนดำเนินการ');
    }

    // 2. Validate input ด้วย Zod
    const body = await request.json();
    let data;
    try {
        data = changePasswordSchema.parse(body);
    } catch (err) {
        if (err instanceof ZodError) {
            throw new ValidationError(err.issues[0].message);
        }
        throw err;
    }

    // 3. ค้นหา User จาก ID ใน Session
    const user = await prisma.user.findUnique({
        where: { id: sessionId },
    });
    if (!user) {
        throw new ForbiddenError('ไม่พบข้อมูลผู้ใช้');
    }

    // 4. ตรวจสอบ oldPassword ด้วย bcrypt.compare
    const isOldPasswordCorrect = await bcrypt.compare(data.oldPassword, user.password);
    if (!isOldPasswordCorrect) {
        throw new ValidationError('รหัสผ่านเดิมไม่ถูกต้อง');
    }

    // 5. Hash newPassword ด้วย bcrypt (salt rounds = 10)
    const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);

    // 6. อัปเดตรหัสผ่านลงฐานข้อมูลผ่าน Prisma Client
    await prisma.user.update({
        where: { id: sessionId },
        data: { password: hashedNewPassword },
    });

    return Response.json({ ok: true, message: 'เปลี่ยนรหัสผ่านสำเร็จ' });
});
