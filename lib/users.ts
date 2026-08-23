import { prisma } from './prisma';

export async function findUserByUsername(username: string) {
    return await prisma.user.findUnique({
        where: { username },
    });
}

