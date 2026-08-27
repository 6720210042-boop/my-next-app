import { listComments, createComment } from '@/lib/commentService';
import { withErrorHandling } from '@/lib/withErrorHandling';
import { cookies } from 'next/headers';
import { findUserById } from '@/lib/users';
import { NextResponse } from 'next/server';

export const GET = withErrorHandling(async () => {
    const comments = await listComments();
    return NextResponse.json({ comments });
});

export const POST = withErrorHandling(async (request: Request) => {
    const cookieStore = await cookies();
    const sessionUserId = cookieStore.get('session')?.value;
    let userEmail: string | undefined;
    if (sessionUserId) {
        const user = await findUserById(sessionUserId);
        userEmail = user?.email;
    }
    const body = await request.json();
    const saved = await createComment(body, userEmail);
    return NextResponse.json({ ok: true, item: saved }, { status: 201 });
});
