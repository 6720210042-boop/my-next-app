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

interface MessageCardProps {
  m: ContactMessage;
  currentUserId?: string;
  currentUserEmail?: string;
}

export default function MessageCard({ m, currentUserId, currentUserEmail }: MessageCardProps) {
  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState(currentUserEmail || '');
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  
  // State สำหรับการแก้ไขคอมเมนต์
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string>('');

  const router = useRouter();

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    const commentAuthor = currentUserEmail || author;
    if (!commentAuthor.trim() || !content.trim()) return;
    setSending(true);
    setActionError('');
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: commentAuthor, content, messageId: m.id }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setActionError(err.error || 'ส่งคอมเมนต์ไม่สำเร็จ');
      } else {
        setContent('');
        router.refresh();
      }
    } catch {
      setActionError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setSending(false);
    }
  }

  function startEditing(c: Comment) {
    setEditingCommentId(c.id);
    setEditingContent(c.content);
    setActionError('');
  }

  function cancelEditing() {
    setEditingCommentId(null);
    setEditingContent('');
  }

  async function saveEdit(commentId: string) {
    if (!editingContent.trim()) return;
    setActionLoadingId(commentId);
    setActionError('');
    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editingContent }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setActionError(err.error || 'คุณไม่มีสิทธิ์แก้ไขคอมเมนต์นี้');
      } else {
        setEditingCommentId(null);
        setEditingContent('');
        router.refresh();
      }
    } catch {
      setActionError('เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setActionLoadingId(null);
    }
  }

  async function handleDelete(commentId: string) {
    const ok = window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบคอมเมนต์นี้?');
    if (!ok) return;

    setActionLoadingId(commentId);
    setActionError('');
    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setActionError(err.error || 'คุณไม่มีสิทธิ์ลบคอมเมนต์นี้');
      } else {
        router.refresh();
      }
    } catch {
      setActionError('เกิดข้อผิดพลาดในการลบ');
    } finally {
      setActionLoadingId(null);
    }
  }

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      {/* Header — คลิกเพื่อหุบ/ขยาย */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div>
          <p style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '1.05rem', marginBottom: '0.2rem' }}>
            {m.name}
          </p>
          <p style={{ color: 'var(--pink-pastel)', fontSize: '0.85rem' }}>{m.email}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            💬 {m.comments.length}
          </span>
          <span style={{
            fontSize: '0.9rem',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            color: 'var(--text-muted)',
          }}>▼</span>
        </div>
      </button>

      {/* Body */}
      {open && (
        <div style={{ borderTop: '1px solid var(--card-border)', background: 'var(--card-hover-bg)' }}>
          {/* Message content */}
          <div style={{ padding: '1rem 1.5rem' }}>
            <p style={{
              color: 'var(--text-body)',
              lineHeight: 1.75,
              fontSize: '0.925rem',
            }}>
              {m.message}
            </p>
          </div>

          {/* Error notice if any */}
          {actionError && (
            <div style={{
              margin: '0 1.5rem 0.75rem',
              padding: '0.5rem 0.85rem',
              background: '#3d161d',
              border: '1px solid #e11d48',
              borderRadius: '6px',
              color: '#fca5a5',
              fontSize: '0.85rem',
            }}>
              ⚠️ {actionError}
            </div>
          )}

          {/* Comment count */}
          <div style={{
            padding: '0.5rem 1.5rem',
            borderTop: '1px solid var(--card-border)',
            color: 'var(--text-muted)',
            fontSize: '0.825rem',
          }}>
            💬 {m.comments.length} ความคิดเห็น
          </div>

          {/* Comments list */}
          {m.comments.length > 0 && (
            <div style={{ padding: '0.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {m.comments.map((c) => {
                // ตรวจสอบสิทธิ์ความเป็นเจ้าของ: author ตรงกับ email หรือ id ปัจจุบัน
                const isOwner = Boolean(
                  (currentUserEmail && c.author.trim().toLowerCase() === currentUserEmail.trim().toLowerCase()) ||
                  (currentUserId && c.author.trim() === currentUserId.trim())
                );

                const isEditing = editingCommentId === c.id;
                const isActionLoading = actionLoadingId === c.id;

                return (
                  <div key={c.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: isOwner ? 'var(--pink-pastel)' : 'var(--badge-border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '0.85rem',
                      color: isOwner ? '#ffffff' : 'var(--text-main)',
                      flexShrink: 0,
                    }}>
                      {c.author.charAt(0).toUpperCase()}
                    </div>

                    <div style={{
                      background: 'var(--card-bg)',
                      border: isOwner ? '1px solid var(--pink-pastel)' : '1px solid var(--card-border)',
                      borderRadius: '8px',
                      padding: '0.65rem 0.95rem',
                      flex: 1,
                    }}>
                      {/* Header คอมเมนต์ */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <strong style={{ color: 'var(--text-main)', fontSize: '0.875rem' }}>{c.author}</strong>
                          {isOwner && (
                            <span style={{
                              background: 'var(--pink-pastel)',
                              color: '#ffffff',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              borderRadius: '3px',
                              padding: '1px 6px',
                            }}>
                              👑 คุณ (เจ้าของ)
                            </span>
                          )}
                        </div>

                        {/* ปุ่ม แก้ไข / ลบ (แสดงเฉพาะเจ้าของคอมเมนต์เท่านั้น) */}
                        {isOwner && !isEditing && (
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              onClick={() => startEditing(c)}
                              disabled={isActionLoading}
                              style={{
                                background: 'var(--badge-bg)',
                                border: '1px solid var(--badge-border)',
                                color: 'var(--pink-pastel)',
                                borderRadius: '4px',
                                padding: '2px 8px',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                              }}
                            >
                              ✏️ แก้ไข
                            </button>
                            <button
                              onClick={() => handleDelete(c.id)}
                              disabled={isActionLoading}
                              style={{
                                background: '#3d141c',
                                border: '1px solid #7f1d1d',
                                color: '#fca5a5',
                                borderRadius: '4px',
                                padding: '2px 8px',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                              }}
                            >
                              {isActionLoading ? '...' : '🗑️ ลบ'}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Content คอมเมนต์ หรือ โหมดแก้ไข */}
                      {isEditing ? (
                        <div style={{ marginTop: '0.5rem' }}>
                          <textarea
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            rows={2}
                            style={{ width: '100%', padding: '6px 10px', fontSize: '0.875rem', marginBottom: '6px' }}
                          />
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                            <button
                              onClick={cancelEditing}
                              disabled={isActionLoading}
                              className="btn-secondary"
                              style={{ padding: '3px 10px', fontSize: '0.78rem' }}
                            >
                              ยกเลิก
                            </button>
                            <button
                              onClick={() => saveEdit(c.id)}
                              disabled={isActionLoading || !editingContent.trim()}
                              className="btn-primary"
                              style={{ padding: '3px 12px', fontSize: '0.78rem' }}
                            >
                              {isActionLoading ? 'กำลังบันทึก...' : '💾 บันทึก'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ color: 'var(--text-body)', fontSize: '0.885rem', lineHeight: 1.6 }}>
                          {c.content}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Comment form */}
          <form onSubmit={handleComment} style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid var(--card-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>ส่งในชื่อ:</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--pink-pastel)', fontWeight: 600 }}>
                {currentUserEmail || author || 'ผู้เยี่ยมชม'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <input
                placeholder="เขียนคอมเมนต์..."
                value={content}
                onChange={e => setContent(e.target.value)}
                style={{ flex: 1, padding: '8px 14px', borderRadius: '6px', fontSize: '0.875rem' }}
              />
              <button
                type="submit"
                disabled={sending || !content.trim()}
                className="btn-primary"
                style={{
                  borderRadius: '6px',
                  padding: '6px 16px',
                  fontSize: '0.85rem',
                  opacity: (!content.trim() || sending) ? 0.4 : 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {sending ? 'กำลังส่ง...' : 'ส่ง'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
