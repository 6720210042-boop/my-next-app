import { createTask, listTasks } from '@/lib/taskService';
import { withErrorHandling } from '@/lib/withErrorHandling';

// GET /api/tasks -> Read all tasks
export const GET = withErrorHandling(async () => {
    const tasks = listTasks();
    return Response.json({ tasks });
});

// POST /api/tasks -> Create new task
export const POST = withErrorHandling(async (request: Request) => {
    const body = await request.json();
    const task = createTask(body);
    return Response.json({ ok: true, item: task }, { status: 201 });
});
