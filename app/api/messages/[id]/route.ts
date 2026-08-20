import { getMessageById, editMessage, removeMessage } from '@/lib/messageService';
import { withErrorHandling } from '@/lib/withErrorHandling';
import { NotFoundError } from '@/lib/errors';

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
    const updates = await request.json();
    const updated = await editMessage(id, updates);
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
    await removeMessage(id);
    return Response.json({ ok: true });
});