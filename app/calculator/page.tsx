'use client';
import { useState } from 'react';

export default function PriceCalculator() {
  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 150;
  const total = quantity * pricePerItem;

  return (
    <div className="fade-in-up">
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>🧮 Tool</span>
        <h1 className="section-title">
          <span>💰</span> เครื่องคิดราคา
        </h1>
      </div>

      <div className="card" style={{ maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#ff9d42', marginBottom: '0.35rem' }}>
            จำนวนชิ้น (ชิ้นละ {pricePerItem} บาท)
          </label>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{
          background: 'rgba(255,115,0,0.1)',
          border: '1px solid rgba(255,115,0,0.3)',
          borderRadius: '10px',
          padding: '1rem',
          textAlign: 'center',
        }}>
          <span style={{ fontSize: '0.9rem', color: '#9ca3af' }}>ราคารวมทั้งหมด</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ff9d42' }}>
            {total.toLocaleString()} <span style={{ fontSize: '1rem' }}>บาท</span>
          </div>
        </div>
      </div>
    </div>
  );
}