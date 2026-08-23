import * as MessageModel from './messages';
import { NotFoundError, ValidationError } from './errors';
import { Prisma } from '@prisma/client';
import { createMessageSchema } from './validations';
import sanitizeHtml from 'sanitize-html';

export async function createMessage(data: { name: string; email: string; message: string }) {
    // 1. Zod Validate
    const parsed = createMessageSchema.safeParse(data);
    if (!parsed.success) {
        throw new ValidationError(parsed.error.issues[0].message);
    }

    // 2. ป้องกัน XSS ด้วย sanitize-html
    const cleanName = sanitizeHtml(parsed.data.name, { allowedTags: [], allowedAttributes: {} });
    const cleanMessage = sanitizeHtml(parsed.data.message, { allowedTags: [], allowedAttributes: {} });

    try {
        return await MessageModel.addMessage({
            name: cleanName,
            email: parsed.data.email,
            message: cleanMessage,
        });
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

export async function editMessage(id: string, updates: { name?: string; message?: string }) {
    try {
        let cleanUpdates = { ...updates };
        if (updates.name) {
            cleanUpdates.name = sanitizeHtml(updates.name, { allowedTags: [], allowedAttributes: {} });
        }
        if (updates.message) {
            cleanUpdates.message = sanitizeHtml(updates.message, { allowedTags: [], allowedAttributes: {} });
        }
        return await MessageModel.updateMessage(id, cleanUpdates);
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
            return null; // ให้ Controller เดิมตอบ 404 เหมือนเดิม
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