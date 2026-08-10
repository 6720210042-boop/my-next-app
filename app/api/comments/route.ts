import { addComment, getCommentsByPostId } from '@/lib/comments';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const postId = url.searchParams.get('postId');
  if (!postId) {
    return Response.json({ error: 'ต้องระบุ postId' }, { status: 400 });
  }
  return Response.json({ comments: getCommentsByPostId(postId) });
}

export async function POST(request: Request) {
  // Task W.3 — ตรวจ session cookie ก่อน
  const cookie = request.headers.get('cookie') || '';
  if (!cookie.includes('session=')) {
    return Response.json({ error: 'กรุณา Login ก่อนแสดงความคิดเห็น' }, { status: 401 });
  }

  const body = await request.json();

  // Task W.2 — Server validation
  if (!body.postId) {
    return Response.json({ error: 'ต้องระบุ postId' }, { status: 400 });
  }
  if (!body.author || body.author.trim().length < 2) {
    return Response.json({ error: 'กรอกชื่ออย่างน้อย 2 ตัวอักษร' }, { status: 400 });
  }
  if (!body.text || body.text.trim().length < 5) {
    return Response.json({ error: 'ความคิดเห็นสั้นเกินไป (อย่างน้อย 5 ตัวอักษร)' }, { status: 400 });
  }

  const saved = addComment({
    postId: body.postId,
    author: body.author.trim(),
    text: body.text.trim(),
  });
  return Response.json({ ok: true, item: saved }, { status: 201 });
}
