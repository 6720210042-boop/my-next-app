import { connection } from 'next/server';
import { listMessagesWithComments } from '@/lib/commentService';
import CommentForm from './CommentForm';

export default async function CommentsPage() {
  await connection();
  const messages = await listMessagesWithComments();

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      padding: '2rem',
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{
            fontSize: '2.2rem', fontWeight: 800,
            background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '0.25rem',
          }}>
            💬 Message Board
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            {messages.length} โพสต์ · คลิกแสดงความคิดเห็นใต้แต่ละโพสต์
          </p>
        </div>

        {messages.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '3rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px', color: '#64748b',
          }}>
            ยังไม่มีข้อความ
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}>
                {/* Post Header */}
                <div style={{ padding: '1.25rem 1.25rem 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f472b6, #fb923c)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: '1.2rem', color: 'white', flexShrink: 0,
                    }}>
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '1rem' }}>{msg.name}</div>
                      <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{msg.email} · {new Date(msg.createdAt).toLocaleString('th-TH', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p style={{
                    color: '#e2e8f0', fontSize: '1.05rem',
                    lineHeight: 1.6, margin: '0 0 1rem',
                  }}>
                    {msg.message}
                  </p>
                </div>

                {/* Comment Count Bar */}
                <div style={{
                  padding: '0.5rem 1.25rem',
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  color: '#64748b', fontSize: '0.8rem',
                }}>
                  💬 {msg.comments.length} คอมเมนต์
                </div>

                {/* Comments + Form */}
                <div style={{ padding: '1rem 1.25rem 1.25rem' }}>
                  <CommentForm message={msg as any} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
