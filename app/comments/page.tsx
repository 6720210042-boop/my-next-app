import { connection } from 'next/server';
import { listMessagesWithComments } from '@/lib/commentService';
import CommentForm from './CommentForm';

export default async function CommentsPage() {
  await connection();
  const messages = await listMessagesWithComments();

  return (
    <div className="fade-in-up">
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>💬 Community</span>
          <h1 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.25rem', justifyContent: 'center' }}>
            Message Board
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
            {messages.length} โพสต์ · แสดงความคิดเห็นใต้แต่ละโพสต์
          </p>
        </div>

        {messages.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
            ยังไม่มีข้อความ
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {messages.map((msg) => (
              <div key={msg.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {/* Post Header */}
                <div style={{ padding: '1.25rem 1.25rem 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: 'var(--pink-pastel)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '1rem', color: '#000000', flexShrink: 0,
                    }}>
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '1rem' }}>{msg.name}</div>
                      <div style={{ color: 'var(--pink-pastel)', fontSize: '0.78rem' }}>
                        {msg.email} · {new Date(msg.createdAt).toLocaleString('th-TH', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p style={{
                    color: 'var(--text-body)', fontSize: '0.95rem',
                    lineHeight: 1.65, margin: '0 0 1rem',
                  }}>
                    {msg.message}
                  </p>
                </div>

                {/* Comment Count Bar */}
                <div style={{
                  padding: '0.5rem 1.25rem',
                  borderTop: '1px solid var(--card-border)',
                  borderBottom: '1px solid var(--card-border)',
                  color: 'var(--text-muted)', fontSize: '0.8rem',
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
    </div>
  );
}
