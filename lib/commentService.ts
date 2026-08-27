import * as CommentModel from './comments';
import { NotFoundError, ValidationError, ForbiddenError } from './errors';
import { Prisma } from '@prisma/client';
import { cleanRichText } from './sanitize';

export async function listComments() {
    return await CommentModel.getComments();
}

export async function getCommentById(id: string) {
    const item = await CommentModel.getCommentById(id);
    if (!item) throw new NotFoundError('ไม่พบคอมเมนต์นี้');
    return item;
}

export async function createComment(
    data: { author: string; content: string; messageId: string },
    userEmail?: string
) {
    if (!data.author || !data.content) throw new ValidationError('ข้อมูลไม่ครบ');
    if (!data.messageId) throw new ValidationError('ต้องระบุ messageId');

    // ตัด <script>, onerror= ทิ้งก่อนเก็บ (อนุญาตแค่ <b>, <i>, <a>)
    const safeContent = cleanRichText(data.content);
    // ถ้าผู้ใช้ล็อกอินอยู่ ให้ใช้ userEmail เป็น author เพื่อผูกสิทธิ์เจ้าของ
    const authorName = userEmail || data.author;
    const safeAuthor = cleanRichText(authorName);

    return await CommentModel.addComment({
        author: safeAuthor,
        content: safeContent,
        messageId: data.messageId,
    });
}

export async function editComment(
    id: string,
    updates: { content?: string },
    userEmail?: string,
    sessionUserId?: string
) {
    const comment = await getCommentById(id);

    // ตรวจสอบสิทธิ์ความเป็นเจ้าของคอมเมนต์ (ผ่าน Email หรือ UserId)
    const isOwner = Boolean(
        (userEmail && comment.author.trim().toLowerCase() === userEmail.trim().toLowerCase()) ||
        (sessionUserId && comment.author.trim() === sessionUserId.trim())
    );

    if (!isOwner) {
        throw new ForbiddenError('คุณไม่มีสิทธิ์แก้ไขคอมเมนต์นี้ (แก้ไขได้เฉพาะคอมเมนต์ของตนเองเท่านั้น)');
    }

    try {
        let cleanUpdates = { ...updates };
        if (updates.content) {
            cleanUpdates.content = cleanRichText(updates.content);
        }
        return await CommentModel.updateComment(id, cleanUpdates);
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
            throw new NotFoundError('ไม่พบคอมเมนต์นี้');
        }
        throw err;
    }
}

export async function removeComment(
    id: string,
    userEmail?: string,
    sessionUserId?: string
) {
    const comment = await getCommentById(id);

    // ตรวจสอบสิทธิ์ความเป็นเจ้าของคอมเมนต์ (ผ่าน Email หรือ UserId)
    const isOwner = Boolean(
        (userEmail && comment.author.trim().toLowerCase() === userEmail.trim().toLowerCase()) ||
        (sessionUserId && comment.author.trim() === sessionUserId.trim())
    );

    if (!isOwner) {
        throw new ForbiddenError('คุณไม่มีสิทธิ์ลบคอมเมนต์นี้ (ลบได้เฉพาะคอมเมนต์ของตนเองเท่านั้น)');
    }

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
