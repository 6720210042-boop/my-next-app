// components/Counter.tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.85rem 1.25rem',
        background: 'var(--badge-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '8px',
      }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>จำนวนการนับ (Count State)</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--pink-pastel)', marginTop: '2px' }}>Client Component Reactive</div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--pink-pastel)' }}>
          {count}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="btn-primary"
          style={{ padding: '7px 10px', fontSize: '0.85rem' }}
        >
          +1 เพิ่ม
        </button>
        <button
          onClick={() => setCount((c) => c - 1)}
          className="btn-secondary"
          style={{ padding: '7px 10px', fontSize: '0.85rem' }}
        >
          -1 ลด
        </button>
        <button
          onClick={() => setCount(0)}
          className="btn-secondary"
          style={{ padding: '7px 10px', fontSize: '0.85rem' }}
        >
          รีเซ็ต
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => setCount((c) => c + 5)}
          className="btn-secondary"
          style={{ flex: 1, padding: '5px 8px', fontSize: '0.78rem' }}
        >
          +5
        </button>
        <button
          onClick={() => setCount((c) => c + 10)}
          className="btn-secondary"
          style={{ flex: 1, padding: '5px 8px', fontSize: '0.78rem' }}
        >
          +10
        </button>
        <button
          onClick={() => setCount((c) => c * 2)}
          className="btn-secondary"
          style={{ flex: 1, padding: '5px 8px', fontSize: '0.78rem' }}
        >
          x2 เท่า
        </button>
      </div>
    </div>
  );
}