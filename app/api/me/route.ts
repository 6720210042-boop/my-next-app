import { cookies } from 'next/headers';
import { findUserById } from '@/lib/users';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get('session');
        if (!session?.value) {
            return NextResponse.json({ isLoggedIn: false });
        }
        const user = await findUserById(session.value);
        if (!user) {
            return NextResponse.json({ isLoggedIn: false });
        }
        return NextResponse.json({
            isLoggedIn: true,
            user: { id: user.id, email: user.email }
        });
    } catch {
        return NextResponse.json({ isLoggedIn: false });
    }
}
