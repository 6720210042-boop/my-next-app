import * as CommentModel from './comments';
import { NotFoundError, ValidationError } from './errors';
import { Prisma } from '@prisma/client';
import { createCommentSchema } from './validations';
import sanitizeHtml from 'sanitize-html';

export async function listComments() {
    return await CommentModel.getComments();
}

export async function getCommentById(id: string) {
    const item = await CommentModel.getCommentById(id);
    if (!item) throw new NotFoundError('ไม่พบคอมเมนต์นี้');
    return item;
}

export async function createComment(data: { author: string; content: string; messageId: string }) {
    // 1. Validate ด้วย Zod
    const parsed = createCommentSchema.safeParse(data);
    if (!parsed.success) {
        throw new ValidationError(parsed.error.issues[0].message);
    }

    // 2. ป้องกัน XSS ด้วย sanitize-html
    const cleanAuthor = sanitizeHtml(parsed.data.author, { allowedTags: [], allowedAttributes: {} });
    const cleanContent = sanitizeHtml(parsed.data.content, { allowedTags: [], allowedAttributes: {} });

    return await CommentModel.addComment({
        author: cleanAuthor,
        content: cleanContent,
        messageId: parsed.data.messageId,
    });
}

export async function editComment(id: string, updates: { content?: string }) {
    try {
        let cleanUpdates = { ...updates };
        if (updates.content) {
            cleanUpdates.content = sanitizeHtml(updates.content, { allowedTags: [], allowedAttributes: {} });
        }
        return await CommentModel.updateComment(id, cleanUpdates);
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
            throw new NotFoundError('ไม่พบคอมเมนต์นี้');
        }
        throw err;
    }
}

export async function removeComment(id: string) {
    try {
        await CommentModel.deleteComment(id);
        return true;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
            throw new NotFoundError('ไม่พบคอมเมนต์นี้');
        }
        throw err;
    }
}

export async function listMessagesWithComments() {
    return await CommentModel.getMessagesWithComments();
}

