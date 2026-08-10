'use client'; // ← บรรทัดแรกเสมอ

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
  const [commentStatus, setCommentStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');

  const isCommentValid = commentAuthor.trim().length >= 2 && commentText.trim().length >= 5;
  
  // ซิงค์ Modal State กับ URL
  const itemId = searchParams.get('itemId');
  const selectedItem = items.find(item => String(item.id) === itemId) || null;

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  function selectSource(s: 'products' | 'news') {
    setSource(s);
    router.replace(`/blog-spa?source=${s}`); // ← ไม่ reload
  }

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`/api/aggregate?source=${source}`)
      .then((r) => r.json())
      .then((data: { external: ExternalItem[], error?: string }) => {
        if (data.error) {
          setError(data.error);
          setItems([]);
        } else {
          setItems(data.external || []);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ โปรดลองใหม่อีกครั้ง');
        setItems([]);
        setIsLoading(false);
      });
  }, [source]); // ← ทํางานใหม่ทุกครั้งที่ source เปลี่ยน

  // โหลด comment เมื่อเปิด modal
  useEffect(() => {
    if (!itemId) { setComments([]); return; }
    fetch(`/api/comments?postId=${itemId}`)
      .then((r) => r.json())
      .then((data) => setComments(data.comments || []));
  }, [itemId]);

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Client validation (Task W.2)
    if (commentAuthor.trim().length < 2) { setCommentError('กรอกชื่ออย่างน้อย 2 ตัวอักษร'); return; }
    if (commentText.trim().length < 5) { setCommentError('ความคิดเห็นสั้นเกินไป (อย่างน้อย 5 ตัวอักษร)'); return; }
    setCommentError(''); setCommentStatus('sending');

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: itemId, author: commentAuthor, text: commentText }),
    });

    if (res.status === 401) { setCommentStatus('idle'); setCommentError('กรุณา Login ก่อนแสดงความคิดเห็น'); return; }
    if (!res.ok) { setCommentStatus('error'); return; }

    const data = await res.json();
    setComments((prev) => [...prev, data.item]);
    setCommentAuthor(''); setCommentText('');
    setCommentStatus('success');
    setTimeout(() => setCommentStatus('idle'), 2000);
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        Blog Aggregator (SPA)
      </h1>

      {/* ปุ่ม Tab — วางเหนือ items grid */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => selectSource('products')}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            background: source === 'products' ? '#2563eb' : '#e2e8f0',
            color: source === 'products' ? 'white' : '#475569'
          }}
        >
          Products
        </button>
        <button 
          onClick={() => selectSource('news')}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            background: source === 'news' ? '#2563eb' : '#e2e8f0',
            color: source === 'news' ? 'white' : '#475569'
          }}
        >
          News
        </button>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '1.5rem' }}>
        <input 
          type="text" 
          placeholder="ค้นหา (Real-time client-side filter)..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid #cbd5e1',
            outline: 'none',
          }}
        />
      </div>

      {isLoading ? (
        <div style={{ padding: '4rem 0', textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-block', width: '40px', height: '40px', 
            border: '4px solid #e2e8f0', borderTopColor: '#3b82f6', 
            borderRadius: '50%', animation: 'spin 1s linear infinite' 
          }} />
          <p style={{ marginTop: '1rem', color: '#64748b', fontWeight: 500, fontSize: '1.1rem' }}>กำลังดึงข้อมูล...</p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      ) : error ? (
        <div style={{ padding: '3rem 2rem', background: '#fef2f2', border: '2px dashed #fca5a5', borderRadius: '0.75rem', textAlign: 'center' }}>
          <span style={{ fontSize: '3rem' }}></span>
          <h2 style={{ color: '#b91c1c', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>เกิดข้อผิดพลาดในการโหลดข้อมูล</h2>
          <p style={{ color: '#991b1b', marginBottom: '1.5rem' }}>{error}</p>
          <button 
            onClick={() => selectSource('products')} 
            style={{ padding: '0.5rem 1.5rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600, transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#dc2626'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#ef4444'}
          >
            กลับสู่หน้าเริ่มต้น
          </button>
        </div>
      ) : filteredItems.length === 0 ? (
        <div style={{ padding: '4rem 0', textAlign: 'center', background: '#f8f9fa', borderRadius: '0.75rem', border: '2px dashed #cbd5e1' }}>
          <span style={{ fontSize: '3.5rem' }}></span>
          <h2 style={{ color: '#475569', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>ไม่พบข้อมูลที่คุณค้นหา</h2>
          <p style={{ color: '#94a3b8' }}>
            {searchQuery ? `ไม่มีผลลัพธ์สำหรับคำว่า "${searchQuery}"` : 'ดูเหมือนจะไม่มีข้อมูลในหมวดหมู่นี้เลย'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="p-4 bg-white rounded-lg border"
              style={{ cursor: 'pointer', transition: 'box-shadow 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              onClick={() => router.push(`/blog-spa?source=${source}&itemId=${item.id}`)}
            >
              <h2 className="font-bold text-blue-800">{item.title}</h2>
              <p className="text-gray-500 text-sm">{item.subtitle}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal / Panel for details */}
      {selectedItem && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 50
        }} onClick={() => router.push(`/blog-spa?source=${source}`)}>
          <div style={{
            background: 'white', padding: '2rem', borderRadius: '0.75rem', 
            maxWidth: '500px', width: '90%', position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => router.push(`/blog-spa?source=${source}`)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', border: 'none', background: '#f1f5f9', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              ✕
            </button>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '0.5rem', paddingRight: '2rem' }}>
              {selectedItem.title}
            </h2>
            <p style={{ color: '#64748b', marginBottom: '1.5rem', fontWeight: 600 }}>{selectedItem.subtitle}</p>
            
            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
              <strong>ID:</strong> {selectedItem.id} <br/>
              <strong>Data Source:</strong> {source.toUpperCase()} <br/>
              {selectedItem.image && (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  {/* แสดงรูปภาพถ้ามี */}
                  <img src={selectedItem.image} alt={selectedItem.title} style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '4px' }} />
                </div>
              )}
            </div>

            {/* ─── ระบบ Comment (Task W.1 + W.2 + W.3) ─── */}
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
              <h3 style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                💬 ความคิดเห็น ({comments.length})
              </h3>
              {comments.length === 0 ? (
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.75rem' }}>ยังไม่มีความคิดเห็น — เป็นคนแรกได้เลย!</p>
              ) : (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                  {comments.map((c) => (
                    <li key={c.id} style={{ background: '#f1f5f9', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', fontSize: '0.875rem' }}>
                      <span style={{ fontWeight: 600 }}>{c.author}:</span> {c.text}
                    </li>
                  ))}
                </ul>
              )}
              <form onSubmit={handleCommentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  placeholder="ชื่อ (อย่างน้อย 2 ตัวอักษร)"
                  style={{ padding: '0.4rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '0.375rem', fontSize: '0.875rem' }}
                />
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="ความคิดเห็น (อย่างน้อย 5 ตัวอักษร)"
                  rows={2}
                  style={{ padding: '0.4rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '0.375rem', fontSize: '0.875rem', resize: 'none' }}
                />
                {commentError && <p style={{ color: '#dc2626', fontSize: '0.75rem' }}>{commentError}</p>}
                {commentStatus === 'success' && <p style={{ color: '#16a34a', fontSize: '0.75rem' }}>ส่งความคิดเห็นสำเร็จ! ✓</p>}
                {commentStatus === 'error' && <p style={{ color: '#dc2626', fontSize: '0.75rem' }}>เกิดข้อผิดพลาด ลองใหม่อีกครั้ง</p>}
                <button
                  type="submit"
                  disabled={!isCommentValid}
                  style={{
                    padding: '0.4rem 1rem', borderRadius: '0.375rem', border: 'none',
                    cursor: isCommentValid ? 'pointer' : 'not-allowed',
                    background: isCommentValid ? '#2563eb' : '#cbd5e1',
                    color: 'white', fontWeight: 600, fontSize: '0.875rem', alignSelf: 'flex-start',
                  }}
                >
                  {commentStatus === 'sending' ? 'กำลังส่ง...' : 'ส่งความคิดเห็น'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function BlogSpaPage() {
  return (
    // การใช้ useSearchParams ใน Next.js 14 ควรครอบด้วย Suspense เสมอ เพื่อไม่ให้เกิด Error ตอน Build
    <Suspense fallback={<main className="p-8"><p>กำลังโหลดหน้าเว็บ...</p></main>}>
      <BlogSpaContent />
    </Suspense>
  );
}
