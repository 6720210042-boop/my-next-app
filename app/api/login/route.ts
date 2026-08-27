import bcrypt from 'bcrypt';
import { findUserByEmail } from '@/lib/users';
import { withErrorHandling } from '@/lib/withErrorHandling';
import { NextResponse } from 'next/server';

export const POST = withErrorHandling(async (request: Request) => {
    const { email, password } = await request.json();
    if (!email || !password) {
        return NextResponse.json({ error: 'กรุณากรอกอีเมลและรหัสผ่าน' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    let user = await findUserByEmail(normalizedEmail);
    if (!user) {
        user = await findUserByEmail(email.trim());
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
    res.headers.append('Set-Cookie', `session=${user.id}; Path=/; HttpOnly; SameSite=Lax`);
    res.headers.append('Set-Cookie', `logged_in=1; Path=/; SameSite=Lax`);
    return res;
});