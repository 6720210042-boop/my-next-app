'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ExternalItem } from '@/lib/external';

interface Comment {
  id: string;
  postId: string;
  author: string;
  text: string;
  createdAt: string;
}

function BlogSpaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // อ่านค่าเริ่มต้นจาก URL (?source=news)
  const initialSource = searchParams.get('source') === 'news' ? 'news' : 'products';

  const [source, setSource] = useState<'products' | 'news'>(initialSource);
  const [items, setItems] = useState<ExternalItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Comment states
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');
  const [commentStatus, setCommentStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const isCommentValid = commentAuthor.trim().length >= 2 && commentText.trim().length >= 5;

  // ซิงค์ Modal State กับ URL
  const itemId = searchParams.get('itemId');
  const selectedItem = items.find((item) => String(item.id) === itemId) || null;

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  function selectSource(s: 'products' | 'news') {
    setSource(s);
    router.replace(`/blog-spa?source=${s}`);
  }

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`/api/aggregate?source=${source}`)
      .then((r) => r.json())
      .then((data: { external: ExternalItem[]; error?: string }) => {
        if (data.error) {
          setError(data.error);
          setItems([]);
        } else {
          setItems(data.external || []);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ โปรดลองใหม่อีกครั้ง');
        setItems([]);
        setIsLoading(false);
      });
  }, [source]);

  // โหลด comment เมื่อเปิด modal
  useEffect(() => {
    if (!itemId) {
      setComments([]);
      return;
    }
    fetch(`/api/comments?postId=${itemId}`)
      .then((r) => r.json())
      .then((data) => setComments(data.comments || []));
  }, [itemId]);

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (commentAuthor.trim().length < 2) {
      setCommentError('กรอกชื่ออย่างน้อย 2 ตัวอักษร');
      return;
    }
    if (commentText.trim().length < 5) {
      setCommentError('ความคิดเห็นสั้นเกินไป (อย่างน้อย 5 ตัวอักษร)');
      return;
    }
    setCommentError('');
    setCommentStatus('sending');

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: itemId, author: commentAuthor, text: commentText }),
    });

    if (res.status === 401) {
      setCommentStatus('idle');
      setCommentError('กรุณา Login ก่อนแสดงความคิดเห็น');
      return;
    }
    if (!res.ok) {
      setCommentStatus('error');
      return;
    }

    const data = await res.json();
    setComments((prev) => [...prev, data.item]);
    setCommentAuthor('');
    setCommentText('');
    setCommentStatus('success');
    setTimeout(() => setCommentStatus('idle'), 2000);
  }

  return (
    <div className="fade-in-up">
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>⚡ SPA Client Fetching</span>
        <h1 className="section-title">
          <span>📰</span> Blog Aggregator (SPA)
        </h1>
      </div>

      {/* Tab Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => selectSource('products')}
          className={source === 'products' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '8px 20px', fontSize: '0.9rem' }}
        >
          🛍️ Products
        </button>
        <button
          onClick={() => selectSource('news')}
          className={source === 'news' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '8px 20px', fontSize: '0.9rem' }}
        >
          📰 News
        </button>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="🔍 ค้นหา (Real-time client-side filter)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '12px 16px', fontSize: '0.95rem' }}
        />
      </div>

      {isLoading ? (
        <div style={{ padding: '4rem 0', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block', width: '40px', height: '40px',
            border: '3px solid #282836', borderTopColor: 'var(--pink-pastel)',
            borderRadius: '50%', animation: 'spin 0.8s linear infinite',
          }} />
          <p style={{ marginTop: '1rem', color: '#9ca3af', fontSize: '0.9rem' }}>กำลังดึงข้อมูล...</p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      ) : error ? (
        <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center', borderColor: 'rgba(239, 68, 68, 0.4)' }}>
          <span style={{ fontSize: '3rem' }}>⚠️</span>
          <h2 style={{ color: '#ff4d4f', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>
            เกิดข้อผิดพลาดในการโหลดข้อมูล
          </h2>
          <p style={{ color: '#d1d5db', marginBottom: '1.5rem' }}>{error}</p>
          <button
            onClick={() => selectSource('products')}
            className="btn-primary"
          >
            กลับสู่หน้าเริ่มต้น
          </button>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <span style={{ fontSize: '3rem' }}>🔍</span>
          <h2 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>
            ไม่พบข้อมูลที่คุณค้นหา
          </h2>
          <p style={{ color: '#9ca3af' }}>
            {searchQuery ? `ไม่มีผลลัพธ์สำหรับคำว่า "${searchQuery}"` : 'ดูเหมือนจะไม่มีข้อมูลในหมวดหมู่นี้เลย'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => router.push(`/blog-spa?source=${source}&itemId=${item.id}`)}
            >
              <h2 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#ffffff', marginBottom: '0.35rem' }}>
                {item.title}
              </h2>
              <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>{item.subtitle}</p>
              <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#ff9d42', fontWeight: 600 }}>
                ดูรายละเอียด →
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal / Panel for details */}
      {selectedItem && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 100, padding: '1rem',
          }}
          onClick={() => router.push(`/blog-spa?source=${source}`)}
        >
          <div
            className="card"
            style={{
              maxWidth: '520px', width: '100%', position: 'relative',
              borderColor: 'rgba(255,115,0,0.4)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.8), 0 0 30px rgba(255,115,0,0.2)',
              maxHeight: '90vh', overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => router.push(`/blog-spa?source=${source}`)}
              style={{
                position: 'absolute', top: '1rem', right: '1rem', border: 'none',
                background: 'rgba(255,255,255,0.08)', color: '#ffffff',
                borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer',
                fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ✕
            </button>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '0.5rem', paddingRight: '2rem' }}>
              {selectedItem.title}
            </h2>
            <p style={{ color: 'var(--pink-pastel)', marginBottom: '1.25rem', fontWeight: 600, fontSize: '0.9rem' }}>
              {selectedItem.subtitle}
            </p>

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1rem', borderRadius: '10px', fontSize: '0.875rem', border: '1px solid rgba(255,115,0,0.15)' }}>
              <div><strong style={{ color: '#ff9d42' }}>ID:</strong> {selectedItem.id}</div>
              <div><strong style={{ color: '#ff9d42' }}>Data Source:</strong> {source.toUpperCase()}</div>
              {selectedItem.image && (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '8px' }}
                  />
                </div>
              )}
            </div>

            {/* ระบบ Comment */}
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid #1e1e28', paddingTop: '1.25rem' }}>
              <h3 style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '1rem', color: '#ffffff' }}>
                💬 ความคิดเห็น ({comments.length})
              </h3>
              {comments.length === 0 ? (
                <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                  ยังไม่มีความคิดเห็น — เป็นคนแรกได้เลย!
                </p>
              ) : (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem', maxHeight: '180px', overflowY: 'auto' }}>
                  {comments.map((c) => (
                    <li
                      key={c.id}
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,115,0,0.1)',
                        padding: '0.6rem 0.85rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                      }}
                    >
                      <span style={{ fontWeight: 700, color: '#ff9d42' }}>{c.author}:</span> {c.text}
                    </li>
                  ))}
                </ul>
              )}
              <form onSubmit={handleCommentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <input
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  placeholder="ชื่อ (อย่างน้อย 2 ตัวอักษร)"
                  style={{ padding: '8px 12px', fontSize: '0.875rem' }}
                />
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="ความคิดเห็น (อย่างน้อย 5 ตัวอักษร)"
                  rows={2}
                  style={{ padding: '8px 12px', fontSize: '0.875rem', resize: 'none' }}
                />
                {commentError && <p style={{ color: '#ff4d4f', fontSize: '0.75rem' }}>⚠️ {commentError}</p>}
                {commentStatus === 'success' && <p style={{ color: '#52c41a', fontSize: '0.75rem', fontWeight: 600 }}>✅ ส่งความคิดเห็นสำเร็จ!</p>}
                {commentStatus === 'error' && <p style={{ color: '#ff4d4f', fontSize: '0.75rem' }}>❌ เกิดข้อผิดพลาด ลองใหม่อีกครั้ง</p>}
                <button
                  type="submit"
                  disabled={!isCommentValid}
                  className="btn-primary"
                  style={{
                    padding: '6px 16px',
                    fontSize: '0.85rem',
                    alignSelf: 'flex-start',
                    opacity: isCommentValid ? 1 : 0.45,
                    cursor: isCommentValid ? 'pointer' : 'not-allowed',
                  }}
                >
                  {commentStatus === 'sending' ? 'กำลังส่ง...' : 'ส่งความคิดเห็น'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BlogSpaPage() {
  return (
    <Suspense fallback={<div className="p-8"><p style={{ color: '#ff9d42' }}>กำลังโหลดหน้าเว็บ...</p></div>}>
      <BlogSpaContent />
    </Suspense>
  );
}
