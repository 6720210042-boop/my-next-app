'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tag, setTag] = useState('ทั่วไป');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const isValid =
    name.trim().length >= 2 &&
    email.includes('@') &&
    message.trim().length >= 5;

  function validate() {
    if (name.trim().length < 2) return 'กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร';
    if (!email.includes('@')) return 'อีเมลไม่ถูกต้อง';
    if (message.trim().length < 5) return 'ข้อความสั้นเกินไป';
    return '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }
    setError('');
    setStatus('sending');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message, tag }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'ส่งไม่สำเร็จ ลองใหม่อีกครั้ง');
      setStatus('error');
      return;
    }
    setStatus('success');
    setName('');
    setEmail('');
    setMessage('');
    setTag('ทั่วไป');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{
        maxWidth: '520px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      <div>
        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          ชื่อของคุณ (Name)
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="กรอกชื่อของคุณ"
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          อีเมลติดต่อกลับ (Email)
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@mail.com"
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          หมวดหมู่ / แท็ก (Tag)
        </label>
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          style={{ width: '100%' }}
        >
          <option value="ทั่วไป">📌 ทั่วไป (General)</option>
          <option value="สอบถาม">❓ สอบถาม (Question)</option>
          <option value="ติชม">💬 ติชม / ข้อเสนอแนะ (Feedback)</option>
          <option value="ติดต่องาน">💼 ติดต่องาน (Work)</option>
        </select>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          ข้อความที่ต้องการส่ง (Message)
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="พิมพ์ข้อความของคุณที่นี่..."
          style={{ width: '100%', resize: 'none' }}
        />
      </div>

      {error && <p style={{ color: '#ff4d4f', fontSize: '0.875rem' }}>⚠️ {error}</p>}
      {status === 'sending' && <p style={{ color: 'var(--pink-pastel)', fontSize: '0.875rem' }}>กำลังส่งข้อความ...</p>}
      {status === 'success' && <p style={{ color: '#4ade80', fontSize: '0.9rem', fontWeight: 500 }}>✅ ส่งข้อความสำเร็จแล้ว ขอบคุณครับ!</p>}
      {status === 'error' && <p style={{ color: '#ff4d4f', fontSize: '0.875rem' }}>❌ ส่งไม่สำเร็จ โปรดลองใหม่อีกครั้ง</p>}

      <button
        type="submit"
        disabled={!isValid || status === 'sending'}
        className="btn-primary"
        style={{
          opacity: !isValid || status === 'sending' ? 0.45 : 1,
          cursor: !isValid || status === 'sending' ? 'not-allowed' : 'pointer',
          marginTop: '0.5rem',
          padding: '10px 24px',
        }}
      >
        {status === 'sending' ? 'กำลังส่ง...' : 'ส่งข้อความ (Send Message)'}
      </button>
    </form>
  );
}