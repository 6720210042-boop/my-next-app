import { prisma } from './prisma';

export async function getComments() {
    return prisma.comment.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getCommentById(id: string) {
    return prisma.comment.findUnique({ where: { id } });
}

export async function addComment(data: { author: string; content: string; messageId: string }) {
    return prisma.comment.create({ data });
}

export async function updateComment(id: string, updates: { content?: string }) {
    return prisma.comment.update({ where: { id }, data: updates });
}

export async function deleteComment(id: string) {
    return prisma.comment.delete({ where: { id } });
}

export async function getMessagesWithComments() {
    return prisma.message.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            comments: { orderBy: { createdAt: 'asc' } },
        },
    });
}