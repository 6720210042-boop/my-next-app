import * as MessageModel from './messages';
import { NotFoundError, ValidationError } from './errors';
import { Prisma } from '@prisma/client'


export async function createMessage(data: { name: string; email: string; message: string }) {
    if (!data.name || !data.email || !data.message) throw new ValidationError('ข้อมูลไม่ครบ');
    try {
        return await MessageModel.addMessage(data);
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
            throw new ValidationError('อีเมลนี้ถูกใช้แล้ว');
        }
        throw err;
    }
}

export async function listMessages() {
    return await MessageModel.getMessages();
}

export async function getMessageById(id: string) {
    const item = await MessageModel.getMessageById(id);
    if (!item) {
        throw new NotFoundError('ไม่พบข้อความนี้');
    }
    return item;
}

export async function editMessage(id: string, updates: object) {
    try {
        return await MessageModel.updateMessage(id, updates);
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
            return null; // ให้Controller เดิมตอบ 404 เหมือน Week 8
        }
        throw err;
    }
}

export async function removeMessage(id: string) {
    try {
        await MessageModel.deleteMessage(id);
        return true;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
            throw new NotFoundError('ไม่พบข้อความนี้');
        }
        throw err;
    }
}