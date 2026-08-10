export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    isDeleted?: boolean;
}
// เก็บใน memory ไปก่อน — Week 9 จะเปลี่ยนเป็น PostgreSQL + Prisma
// ใช้ globalThis เพื่อให้ API route และ Server Component ใช้ array เดียวกัน
declare global { var __messages: ContactMessage[] | undefined; }
if (!globalThis.__messages) globalThis.__messages = [];
const messages = globalThis.__messages;
export function addMessage(data: Omit<ContactMessage, 'id' | 'createdAt'>) {
    const item: ContactMessage = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...data,
    };
    messages.push(item);
    return item;
}
export function getMessages() {
    return messages;
}

export function updateMessage(id: string, updates: Partial<ContactMessage>) {
    const index = messages.findIndex((m) => m.id === id);
    if (index === -1) return null;
    messages[index] = { ...messages[index], ...updates };
    return messages[index];
}

export function deleteMessage(id: string) {
    const index = messages.findIndex((m) => m.id === id);
    if (index === -1) return false;
    messages.splice(index, 1);
    return true;
}

export function softDeleteMessage(id: string) {
    const index = messages.findIndex((m) => m.id === id);
    if (index === -1) return false;
    messages[index].isDeleted = true; // ← ไม่ splice ออกจริง แค่ตั้ง flag
    return true;
}