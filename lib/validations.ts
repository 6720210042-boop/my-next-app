import { z } from 'zod';

// ตรวจสอบข้อมูลก่อนสร้าง Message (Contact)
export const createMessageSchema = z.object({
  name: z.string().min(1, 'กรุณากรอกชื่อ').max(50, 'ชื่อยาวเกินไป'),
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง'),
  message: z.string().min(1, 'กรุณากรอกข้อความ').max(500, 'ข้อความยาวเกินไป'),
});

// ตรวจสอบข้อมูลก่อนสร้าง Comment
export const createCommentSchema = z.object({
  author: z.string().min(1, 'กรุณากรอกชื่อผู้เขียน').max(50, 'ชื่อยาวเกินไป'),
  content: z.string().min(1, 'กรุณากรอกความคิดเห็น').max(300, 'ความคิดเห็นยาวเกินไป'),
  messageId: z.string().min(1, 'ต้องระบุ messageId'),
});
