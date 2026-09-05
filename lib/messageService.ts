import * as MessageModel from './messages';
import { NotFoundError, ValidationError, ForbiddenError } from './errors';
import { Prisma } from '@prisma/client';
import { messageSchema } from './schemas';
import { ZodError } from 'zod';

export async function createMessage(raw: unknown, sessionUserId?: string) {
    let data;
    try {
        data = messageSchema.parse(raw);
    } catch (err) {
        if (err instanceof ZodError) throw new ValidationError(err.issues[0].message);
        throw err;
    }

    try {
        return await MessageModel.addMessage({
            ...data,
            authorId: sessionUserId || null,
        });
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
            throw new ValidationError('อีเมลนี้ถูกใช้แล้ว');
        }
        throw err;
    }
}

export async function listMessages(search?: string) { //dgdhthhhhhthhhhhhhhhhhhhhhhhhhh
    const all = await MessageModel.getMessages();
    if (!search) return all;
    return all.filter((m) =>   
        m.name.includes(search) ||
        m.message.includes(search)
    );
}

export async function getMessageById(id: string) {
    const item = await MessageModel.getMessageById(id);
    if (!item) {
        throw new NotFoundError('ไม่พบข้อความนี้');
    }
    return item;
}

export async function editMessage(id: string, updates: unknown, sessionUserId: string) {
    const message = await getMessageById(id); // throw NotFoundError ถ้าไม่พบ (มีอยู่แล้วจาก Week 9)
    if (message.authorId !== sessionUserId) {
        throw new ForbiddenError('คุณไม่มีสิทธิ์แก้ไขข้อความนี้');
    }

    try {
        return await MessageModel.updateMessage(id, updates as { message?: string });
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
            return null;
        }
        throw err;
    }
}

export async function removeMessage(id: string, sessionUserId?: string) {
    const message = await getMessageById(id);
    if (sessionUserId && message.authorId && message.authorId !== sessionUserId) {
        throw new ForbiddenError('คุณไม่มีสิทธิ์ลบข้อความนี้');
    }
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