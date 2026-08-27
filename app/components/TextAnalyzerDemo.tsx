'use client';

import { useState } from 'react';

export default function TextAnalyzerDemo() {
  const [text, setText] = useState('สวัสดีครับ ยินดีต้อนรับสู่ Portfolio ของชิน');

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const upperCase = text.toUpperCase();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label style={{ display: 'block', fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
          ทดลองพิมพ์ข้อความ (Live State)
        </label>
        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="พิมพ์ข้อความที่ต้องการทดสอบ..."
          style={{ width: '100%', resize: 'vertical' }}
        />
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
        <div style={{
          padding: '0.65rem',
          background: 'var(--badge-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '8px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>ตัวอักษร</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--pink-pastel)' }}>
            {charCount}
          </div>
        </div>
        <div style={{
          padding: '0.65rem',
          background: 'var(--badge-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '8px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>จำนวนคำ</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--pink-pastel)' }}>
            {wordCount}
          </div>
        </div>
        <div style={{
          padding: '0.65rem',
          background: 'var(--badge-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '8px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>บรรทัด</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--pink-pastel)' }}>
            {text ? text.split('\n').length : 0}
          </div>
        </div>
      </div>

      {/* Live Preview Box */}
      <div style={{
        padding: '0.85rem 1rem',
        background: 'var(--card-hover-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '8px',
        fontSize: '0.85rem',
      }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--pink-pastel)', fontWeight: 600, marginBottom: '4px' }}>
          Uppercase Preview:
        </div>
        <div style={{ color: 'var(--text-main)', wordBreak: 'break-word' }}>
          {upperCase || '(ไม่มีข้อความ)'}
        </div>
      </div>
    </div>
  );
}
