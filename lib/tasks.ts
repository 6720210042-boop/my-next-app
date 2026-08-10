export interface TaskItem {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: string;
}

declare global {
    var __tasks: TaskItem[] | undefined;
}

if (!globalThis.__tasks) {
    globalThis.__tasks = [];
}

const tasks = globalThis.__tasks;

export function getAllTasks() {
    return tasks;
}

export function getTaskById(id: string) {
    return tasks.find((t) => t.id === id) ?? null;
}

export function addTask(data: Omit<TaskItem, 'id' | 'createdAt'>) {
    const item: TaskItem = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...data,
    };
    tasks.push(item);
    return item;
}

export function updateTask(id: string, updates: Partial<Omit<TaskItem, 'id' | 'createdAt'>>) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...updates };
    return tasks[index];
}

export function deleteTask(id: string) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
}
