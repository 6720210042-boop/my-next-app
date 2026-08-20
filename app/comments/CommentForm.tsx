'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  comments: Comment[];
}

export default function CommentForm({ message }: { message: Message }) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;
    setLoading(true);
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, content, messageId: message.id }),
    });
    setAuthor('');
    setContent('');
    setLoading(false);
    router.refresh();
  }

  return (
    <div>
      {/* Existing comments */}
      {message.comments.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          {message.comments.map((c) => (
            <div key={c.id} style={{
              display: 'flex',
              gap: '0.6rem',
              marginBottom: '0.6rem',
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.85rem', color: 'white', flexShrink: 0,
              }}>
                {c.author.charAt(0).toUpperCase()}
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.5rem 0.8rem',
                flex: 1,
              }}>
                <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '0.85rem' }}>{c.author}</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{c.content}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comment form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          placeholder="ชื่อของคุณ"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '8px',
            padding: '0.5rem 0.75rem',
            color: '#e2e8f0',
            fontSize: '0.9rem',
            outline: 'none',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            placeholder="เขียนคอมเมนต์..."
            value={content}
            onChange={e => setContent(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '20px',
              padding: '0.5rem 1rem',
              color: '#e2e8f0',
              fontSize: '0.9rem',
              outline: 'none',
              flex: 1,
            }}
          />
          <button
            type="submit"
            disabled={loading || !author.trim() || !content.trim()}
            style={{
              background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
              border: 'none',
              borderRadius: '20px',
              padding: '0.5rem 1.2rem',
              color: 'white',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: (!author.trim() || !content.trim()) ? 0.5 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {loading ? '...' : 'ส่ง'}
          </button>
        </div>
      </form>
    </div>
  );
}
