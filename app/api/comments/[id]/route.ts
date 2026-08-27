import { getCommentById, editComment, removeComment } from '@/lib/commentService';
import { withErrorHandling } from '@/lib/withErrorHandling';
import { cookies } from 'next/headers';
import { findUserById } from '@/lib/users';
import { NextResponse } from 'next/server';

async function getSessionUser() {
    const cookieStore = await cookies();
    const sessionUserId = cookieStore.get('session')?.value;
    if (!sessionUserId) return { sessionUserId: undefined, userEmail: undefined };
    const user = await findUserById(sessionUserId);
    return { sessionUserId, userEmail: user?.email };
}

export const GET = withErrorHandling(async (
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const comment = await getCommentById(id);
    return NextResponse.json({ comment });
});

export const PATCH = withErrorHandling(async (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const { sessionUserId, userEmail } = await getSessionUser();
    const updates = await request.json();
    const updated = await editComment(id, updates, userEmail, sessionUserId);
    return NextResponse.json({ ok: true, item: updated });
});

export const DELETE = withErrorHandling(async (
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const { sessionUserId, userEmail } = await getSessionUser();
    await removeComment(id, userEmail, sessionUserId);
    return NextResponse.json({ ok: true });
});
