import { createUser, findUserByEmail } from '@/lib/users';
import { withErrorHandling } from '@/lib/withErrorHandling';
import { NextResponse } from 'next/server';

export const POST = withErrorHandling(async (request: Request) => {
    const { email, password, confirmPassword } = await request.json();

    if (!email || !email.includes('@')) {
        return NextResponse.json({ error: 'กรุณากรอกอีเมลให้ถูกต้อง' }, { status: 400 });
    }

    if (!password || password.length < 4) {
        return NextResponse.json({ error: 'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร' }, { status: 400 });
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
        return NextResponse.json({ error: 'รหัสผ่านยืนยันไม่ตรงกัน' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // ตรวจสอบว่ามีผู้ใช้อีเมลนี้แล้วหรือไม่
    const existing = await findUserByEmail(normalizedEmail);
    if (existing) {
        return NextResponse.json({ error: 'อีเมลนี้ถูกใช้งานแล้ว โปรดเข้าสู่ระบบหรือใช้อีเมลอื่น' }, { status: 400 });
    }

    // สร้างบัญชีผู้ใช้ใหม่
    const user = await createUser(normalizedEmail, password);

    // เข้าสู่ระบบทันที (ตั้งค่า Session Cookie)
    const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email } }, { status: 201 });
    res.headers.append('Set-Cookie', `session=${user.id}; Path=/; HttpOnly; SameSite=Lax`);
    res.headers.append('Set-Cookie', `logged_in=1; Path=/; SameSite=Lax`);
    return res;
});
