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
        <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {message.comments.map((c) => (
            <div key={c.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'var(--pink-pastel)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.85rem', color: '#000000', flexShrink: 0,
              }}>
                {c.author.charAt(0).toUpperCase()}
              </div>
              <div style={{
                background: 'var(--card-hover-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '8px',
                padding: '0.5rem 0.85rem',
                flex: 1,
              }}>
                <div style={{ fontWeight: 700, color: 'var(--pink-pastel)', fontSize: '0.825rem' }}>{c.author}</div>
                <div style={{ color: 'var(--text-body)', fontSize: '0.875rem' }}>{c.content}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comment form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <input
          placeholder="ชื่อของคุณ หรือ อีเมล"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          style={{ padding: '8px 12px', fontSize: '0.875rem' }}
        />
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <input
            placeholder="เขียนคอมเมนต์..."
            value={content}
            onChange={e => setContent(e.target.value)}
            style={{ flex: 1, padding: '8px 14px', borderRadius: '6px', fontSize: '0.875rem' }}
          />
          <button
            type="submit"
            disabled={loading || !author.trim() || !content.trim()}
            className="btn-primary"
            style={{
              borderRadius: '6px',
              padding: '6px 16px',
              fontSize: '0.85rem',
              opacity: (!author.trim() || !content.trim()) ? 0.4 : 1,
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
