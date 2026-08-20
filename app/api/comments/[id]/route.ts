import { getCommentById, editComment, removeComment } from '@/lib/commentService';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const GET = withErrorHandling(async (
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const comment = await getCommentById(id);
    return Response.json({ comment });
});

export const PATCH = withErrorHandling(async (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const updates = await request.json();
    const updated = await editComment(id, updates);
    return Response.json({ ok: true, item: updated });
});

export const DELETE = withErrorHandling(async (
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    await removeComment(id);
    return Response.json({ ok: true });
});
