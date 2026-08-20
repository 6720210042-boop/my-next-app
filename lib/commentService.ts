import * as CommentModel from './comments';
import { NotFoundError, ValidationError } from './errors';
import { Prisma } from '@prisma/client';

export async function listComments() {
    return await CommentModel.getComments();
}

export async function getCommentById(id: string) {
    const item = await CommentModel.getCommentById(id);
    if (!item) throw new NotFoundError('ไม่พบคอมเมนต์นี้');
    return item;
}

export async function createComment(data: { author: string; content: string; messageId: string }) {
    if (!data.author || !data.content) throw new ValidationError('ข้อมูลไม่ครบ');
    if (!data.messageId) throw new ValidationError('ต้องระบุ messageId');
    return await CommentModel.addComment(data);
}

export async function editComment(id: string, updates: { content?: string }) {
    try {
        return await CommentModel.updateComment(id, updates);
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
