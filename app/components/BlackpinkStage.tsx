'use client';

import { useState } from 'react';

export interface BpMember {
  id: string;
  nameTH: string;
  nameEN: string;
  role: string;
  emoji: string;
  quote: string;
  signatureSong: string;
}

export default function BlackpinkStage() {
  const [selectedId, setSelectedId] = useState<string>('lisa');

  const members: BpMember[] = [
    {
      id: 'lisa',
      nameTH: 'ลิซ่า (Lisa)',
      nameEN: 'Lalisa Manobal',
      role: 'Main Dancer, Lead Rapper',
      emoji: '💃',
      quote: '“Being happy is the most important thing. Just be yourself and do what you love.”',
      signatureSong: 'LALISA / MONEY / ROCKSTAR',
    },
    {
      id: 'jennie',
      nameTH: 'เจนนี่ (Jennie)',
      nameEN: 'Kim Jennie',
      role: 'Main Rapper, Lead Vocalist',
      emoji: '🐱',
      quote: '“There is nothing scary about what you want to do. Just be confident.”',
      signatureSong: 'SOLO / You & Me',
    },
    {
      id: 'rose',
      nameTH: 'โรเซ่ (Rosé)',
      nameEN: 'Park Chae-young',
      role: 'Main Vocalist, Lead Dancer',
      emoji: '🌹',
      quote: '“Music gives me a reason to wake up every day and express myself.”',
      signatureSong: 'On The Ground / Gone / APT.',
    },
    {
      id: 'jisoo',
      nameTH: 'จีซู (Jisoo)',
      nameEN: 'Kim Ji-soo',
      role: 'Lead Vocalist, Visual',
      emoji: '👑',
      quote: '“Life is not about being the best, it’s about doing your best and staying kind.”',
      signatureSong: 'FLOWER / All Eyes On Me',
    },
  ];

  const selected = members.find((m) => m.id === selectedId) || members[0];

  return (
    <section style={{ margin: '2.5rem 0' }}>
      {/* ส่วนหัว Section */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          <span>🌸</span> สไตล์ &amp; แรงบันดาลใจ BLACKPINK
        </h2>
      </div>

      {/* ─── 4 แท็บบล็อกเลือกสมาชิก (บล็อกสีเดียว อ่านง่าย) ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem', marginBottom: '1rem' }}>
        {members.map((m) => {
          const isSelected = m.id === selectedId;
          return (
            <div
              key={m.id}
              onClick={() => setSelectedId(m.id)}
              className="card"
              style={{
                cursor: 'pointer',
                padding: '1rem',
                borderColor: isSelected ? 'var(--pink-pastel)' : 'var(--card-border)',
                background: isSelected ? '#1c1c26' : 'var(--card-bg)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <span style={{ fontSize: '1.6rem' }}>{m.emoji}</span>
              <div>
                <strong style={{ fontSize: '0.95rem', color: isSelected ? 'var(--pink-pastel)' : '#ffffff', display: 'block' }}>
                  {m.nameTH}
                </strong>
                <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
                  {m.nameEN}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── การ์ดแสดงข้อมูลสมาชิกที่เลือก (บล็อกสีเดียว สะอาดตา) ─── */}
      <div
        className="card"
        style={{
          padding: '1.4rem 1.6rem',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>{selected.emoji}</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <strong style={{ fontSize: '1.2rem', color: '#ffffff' }}>{selected.nameTH}</strong>
                <span className="tag" style={{ color: 'var(--pink-pastel)' }}>
                  {selected.nameEN}
                </span>
                <span className="tag">
                  🎵 {selected.signatureSong}
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '4px' }}>
                บทบาท: <strong style={{ color: '#ffffff' }}>{selected.role}</strong>
              </div>
            </div>
          </div>
        </div>

        <blockquote style={{
          fontSize: '0.9rem',
          color: '#d1d5db',
          fontStyle: 'italic',
          lineHeight: 1.75,
          borderLeft: '2px solid var(--pink-pastel)',
          paddingLeft: '0.75rem',
          margin: '0.5rem 0 0',
        }}>
          {selected.quote}
        </blockquote>
      </div>

      {/* ─── 4 เพลงฮิตระดับโลก (บล็อกสีเดียว สะอาดตา) ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
        {[
          { title: 'Pink Venom', sub: 'Born Pink Track', icon: '🕷️' },
          { title: 'Shut Down', sub: 'Title Track Symphony', icon: '🎻' },
          { title: 'How You Like That', sub: 'Record-Breaking Hit', icon: '💥' },
          { title: 'DDU-DU DDU-DU', sub: 'Iconic Anthem', icon: '🔫' },
        ].map((track) => (
          <div
            key={track.title}
            className="card"
            style={{ padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span>{track.icon}</span>
              <strong style={{ color: '#ffffff', fontSize: '0.9rem' }}>{track.title}</strong>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#9ca3af' }}>{track.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
