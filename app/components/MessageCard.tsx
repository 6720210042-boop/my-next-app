'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  comments: Comment[];
}

export default function MessageCard({ m }: { m: ContactMessage }) {
  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const router = useRouter();

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;
    setSending(true);
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, content, messageId: m.id }),
    });
    setAuthor('');
    setContent('');
    setSending(false);
    router.refresh();
  }

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      overflow: 'hidden',
    }}>
      {/* Header — คลิกเพื่อหุบ/ขยาย */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '1rem 1.5rem',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div>
          <p style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.15rem' }}>{m.name}</p>
          <p style={{ color: '#2563eb', fontSize: '0.85rem' }}>{m.email}</p>
        </div>
        <span style={{
          fontSize: '1.1rem',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.25s ease',
          color: '#94a3b8',
        }}>▼</span>
      </button>

      {/* Body */}
      {open && (
        <div style={{ borderTop: '1px solid #f1f5f9' }}>
          {/* Message content */}
          <div style={{ padding: '0.75rem 1.5rem 1rem' }}>
            <p style={{
              color: '#475569', lineHeight: 1.6,
              borderLeft: '3px solid #e2e8f0',
              paddingLeft: '0.75rem',
            }}>
              {m.message}
            </p>
          </div>

          {/* Comment count */}
          <div style={{
            padding: '0.4rem 1.5rem',
            borderTop: '1px solid #f1f5f9',
            color: '#94a3b8', fontSize: '0.8rem',
          }}>
            💬 {m.comments.length} คอมเมนต์
          </div>

          {/* Comments list */}
          {m.comments.length > 0 && (
            <div style={{ padding: '0.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {m.comments.map((c) => (
                <div key={c.id} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '30px', height: '30px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.8rem', color: 'white', flexShrink: 0,
                  }}>
                    {c.author.charAt(0).toUpperCase()}
                  </div>
                  <div style={{
                    background: '#f8fafc',
                    borderRadius: '12px',
                    padding: '0.4rem 0.75rem',
                    flex: 1,
                  }}>
                    <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.82rem' }}>{c.author}</div>
                    <div style={{ color: '#475569', fontSize: '0.88rem' }}>{c.content}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comment form */}
          <form onSubmit={handleComment} style={{
            padding: '0.75rem 1.5rem 1rem',
            borderTop: '1px solid #f1f5f9',
            display: 'flex', flexDirection: 'column', gap: '0.5rem',
          }}>
            <input
              placeholder="ชื่อของคุณ"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              style={{
                border: '1px solid #e2e8f0', borderRadius: '8px',
                padding: '0.4rem 0.75rem', fontSize: '0.875rem',
                outline: 'none', color: '#1e293b',
              }}
            />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                placeholder="เขียนคอมเมนต์..."
                value={content}
                onChange={e => setContent(e.target.value)}
                style={{
                  border: '1px solid #e2e8f0', borderRadius: '20px',
                  padding: '0.4rem 0.9rem', fontSize: '0.875rem',
                  outline: 'none', flex: 1, color: '#1e293b',
                }}
              />
              <button
                type="submit"
                disabled={sending || !author.trim() || !content.trim()}
                style={{
                  background: '#2563eb', border: 'none', borderRadius: '20px',
                  padding: '0.4rem 1rem', color: 'white', fontWeight: 700,
                  cursor: 'pointer', fontSize: '0.875rem',
                  opacity: (!author.trim() || !content.trim()) ? 0.4 : 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {sending ? '...' : 'ส่ง'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
