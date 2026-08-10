import { getTask, editTask, removeTask } from '@/lib/taskService';
import { withErrorHandling } from '@/lib/withErrorHandling';

// GET /api/tasks/[id] -> Read one task
export const GET = withErrorHandling(async (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const task = getTask(id);
    return Response.json({ task });
});

// PATCH /api/tasks/[id] -> Update task
export const PATCH = withErrorHandling(async (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const updates = await request.json();
    const task = editTask(id, updates);
    return Response.json({ ok: true, item: task });
});

// DELETE /api/tasks/[id] -> Delete task
export const DELETE = withErrorHandling(async (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    removeTask(id);
    return Response.json({ ok: true });
});
