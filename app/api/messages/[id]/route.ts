import { getMessageById, editMessage, removeMessage } from '@/lib/messageService';
import { withErrorHandling } from '@/lib/withErrorHandling';
import { NotFoundError } from '@/lib/errors';
import { cookies } from 'next/headers';

async function getSessionUserId(request: Request): Promise<string> {
    const cookieStore = await cookies();
    return cookieStore.get('session')?.value || '';
}

export const GET = withErrorHandling(async (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const message = await getMessageById(id);
    return Response.json({ message });
});

export const PATCH = withErrorHandling(async (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const sessionUserId = await getSessionUserId(request);
    const updates = await request.json();
    const updated = await editMessage(id, updates, sessionUserId);
    if (!updated) {
        throw new NotFoundError('ไม่พบข้อความนี้');
    }
    return Response.json({ ok: true, item: updated });
});

export const DELETE = withErrorHandling(async (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const sessionUserId = await getSessionUserId(request);
    await removeMessage(id, sessionUserId);
    return Response.json({ ok: true });
});