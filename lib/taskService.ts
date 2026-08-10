import * as TaskModel from './tasks';
import { NotFoundError, ValidationError } from './errors';

export function createTask(data: { title: string; description?: string; completed?: boolean }) {
    if (!data.title || data.title.trim().length < 2) {
        throw new ValidationError('ชื่อชิ้นงานต้องระบุอย่างน้อย 2 ตัวอักษร');
    }

    return TaskModel.addTask({
        title: data.title.trim(),
        description: data.description?.trim() || '',
        completed: Boolean(data.completed ?? false),
    });
}

export function listTasks() {
    return TaskModel.getAllTasks();
}

export function getTask(id: string) {
    const task = TaskModel.getTaskById(id);
    if (!task) {
        throw new NotFoundError('ไม่พบงานนี้ในระบบ');
    }
    return task;
}

export function editTask(id: string, updates: Partial<{ title: string; description: string; completed: boolean }>) {
    if (updates.title !== undefined && updates.title.trim().length < 2) {
        throw new ValidationError('ชื่อชิ้นงานต้องระบุอย่างน้อย 2 ตัวอักษร');
    }

    const updated = TaskModel.updateTask(id, {
        ...(updates.title !== undefined && { title: updates.title.trim() }),
        ...(updates.description !== undefined && { description: updates.description.trim() }),
        ...(updates.completed !== undefined && { completed: Boolean(updates.completed) }),
    });

    if (!updated) {
        throw new NotFoundError('ไม่พบงานนี้ในระบบ');
    }

    return updated;
}

export function removeTask(id: string) {
    const deleted = TaskModel.deleteTask(id);
    if (!deleted) {
        throw new NotFoundError('ไม่พบงานนี้ในระบบ');
    }
    return true;
}
