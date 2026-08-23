import { findUserByUsername } from '@/lib/users';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    const body = await request.json();
    const { username, email, password } = body;

    const userIdentifier = username || email;

    if (!userIdentifier || !password) {
        return Response.json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' }, { status: 400 });
    }

    const user = await findUserByUsername(userIdentifier);
    if (!user) {
        return Response.json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return Response.json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 });
    }

    const res = Response.json({ ok: true });
    res.headers.set('Set-Cookie', `session=${user.id}; Path=/; HttpOnly`);
    return res;
}