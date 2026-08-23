import { NextResponse } from 'next/server';
import { AppError } from './errors';

type RouteHandler = (request: Request, context?: any) => Promise<Response> | Response;

export function withErrorHandling(handler: RouteHandler): RouteHandler {
    return async (request: Request, context?: any) => {
        try {
            return await handler(request, context);
        } catch (error: any) {
            console.error('API Error caught by wrapper:', error);

            // หากเป็น Custom Error ที่เราระบุ (เช่น NotFoundError, ValidationError, ForbiddenError)
            if (error instanceof AppError || error.status || error.statusCode) {
                const status = error.statusCode || error.status || 400;
                return NextResponse.json(
                    { error: error.message },
                    { status }
                );
            }

            // หากเป็น Unexpected Error ที่ไม่ได้คาดคิด ให้ตอบ Status 500 แทนที่จะปล่อยให้ Server Crash
            return NextResponse.json(
                { error: 'เกิดข้อผิดพลาดที่ไม่คาดคิด' },
                { status: 500 }
            );
        }
    };
}
