import { listComments, createComment } from '@/lib/commentService';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const GET = withErrorHandling(async () => {
    const comments = await listComments();
    return Response.json({ comments });
});

export const POST = withErrorHandling(async (request: Request) => {
    const body = await request.json();
    const saved = await createComment(body);
    return Response.json({ ok: true, item: saved }, { status: 201 });
});
