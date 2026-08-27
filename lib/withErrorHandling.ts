import { NextResponse } from 'next/server';
import { AppError } from './errors';

type RouteHandler = (request: Request, context?: any) => Promise<Response> | Response;

export function withErrorHandling(handler: RouteHandler): RouteHandler {
    return async (request: Request, context?: any) => {
        try {
            return await handler(request, context);
        } catch (error: any) {
            console.error('API Error caught by wrapper:', error);

            if (
                error instanceof AppError ||
                error.status ||
                error.statusCode ||
                error.name === 'ForbiddenError' ||
                error.name === 'ValidationError' ||
                error.name === 'NotFoundError'
            ) {
                const status = error.statusCode || error.status || (error.name === 'ForbiddenError' ? 403 : error.name === 'NotFoundError' ? 404 : 400);
                return NextResponse.json(
                    { error: error.message },
                    { status }
                );
            }

            return NextResponse.json(
                { error: error.message || 'เกิดข้อผิดพลาดที่ไม่คาดคิด' },
                { status: 500 }
            );
        }
    };
}
