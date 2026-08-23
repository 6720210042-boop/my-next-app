export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'ไม่พบข้อความนี้') {
        super(message, 404);
    }
}

export class ValidationError extends AppError {
    constructor(message = 'ข้อมูลไม่ถูกต้อง') {
        super(message, 400);
    }
}

export class ForbiddenError extends AppError {
    status = 403;
    constructor(message = 'คุณไม่มีสิทธิ์') {
        super(message, 403);
    }
}

