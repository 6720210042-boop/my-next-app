'use client';

import { useState } from 'react';

export interface SpookyWalker {
  id: string;
  nameTH: string;
  nameEN: string;
  emoji: string;
  quote: string;
  colorType: 'orange' | 'purple';
  walkClass: string;
  stepClass: string;
  speedText: string;
  renderSvg: (active: boolean) => React.ReactNode;
}

export default function HalloweenCharacters() {
  const [activeWalker, setActiveWalker] = useState<string>('black-cat');
  const [jumpId, setJumpId] = useState<string | null>(null);

  const walkers: SpookyWalker[] = [
    {
      id: 'black-cat',
      nameTH: 'แมวดำ',
      nameEN: 'Shadow Cat',
      emoji: '🐈‍⬛',
      quote: 'เดินย่องเงียบเชียบบนขอบบล็อก ดวงตาสีทองกวาดมองความมืด',
      colorType: 'purple',
      walkClass: 'walk-patrol-cat',
      stepClass: 'step-cat',
      speedText: 'ย่องเงียบ 12s',
      renderSvg: (active) => (
        <svg viewBox="0 0 70 50" width="55" height="40" style={{ transform: active ? 'translateY(-12px)' : 'none', transition: 'transform 0.2s' }}>
          {/* ลำตัวแมว */}
          <ellipse cx="35" cy="30" rx="18" ry="11" fill="#12121a" stroke="#8b5cf6" strokeWidth="1.5" />
          {/* หัว & หู */}
          <circle cx="50" cy="24" r="9" fill="#12121a" stroke="#8b5cf6" strokeWidth="1.5" />
          <polygon points="46,16 43,8 52,14" fill="#12121a" stroke="#8b5cf6" strokeWidth="1.2" />
          <polygon points="53,16 57,8 57,17" fill="#12121a" stroke="#8b5cf6" strokeWidth="1.2" />
          {/* ตาเหลือง */}
          <ellipse cx="52" cy="23" rx="2" ry="3" fill="#facc15" />
          {/* หางพริ้ว */}
          <path d="M17 30 Q8 26 10 14" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
          {/* ขาเดิน 4 ขา */}
          <line x1="24" y1="38" x2="22" y2="48" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="38" x2="32" y2="48" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="42" y1="38" x2="40" y2="48" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="47" y1="38" x2="49" y2="48" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'spooky-rat',
      nameTH: 'หนูใต้ดิน',
      nameEN: 'Dungeon Rat',
      emoji: '🐀',
      quote: 'วิ่งฉิวข้ามบล็อกหิน ดวงตาสีแดงวาวสะท้อนแสงไฟ',
      colorType: 'orange',
      walkClass: 'walk-patrol-rat',
      stepClass: 'step-rat',
      speedText: 'วิ่งไว 7s',
      renderSvg: (active) => (
        <svg viewBox="0 0 70 40" width="50" height="30" style={{ transform: active ? 'translateY(-10px)' : 'none', transition: 'transform 0.2s' }}>
          {/* ลำตัวหนู */}
          <ellipse cx="35" cy="24" rx="16" ry="9" fill="#1c1917" stroke="#ea580c" strokeWidth="1.5" />
          {/* หัวแหลม */}
          <polygon points="46,18 60,25 46,29" fill="#292524" stroke="#ea580c" strokeWidth="1" />
          {/* หู & ตาแดง */}
          <circle cx="43" cy="17" r="5" fill="#44403c" stroke="#f472b6" strokeWidth="1" />
          <circle cx="51" cy="22" r="2" fill="#ef4444" />
          {/* หางสีชมพู */}
          <path d="M19 25 Q8 28 6 18" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
          {/* ขา */}
          <line x1="27" y1="32" x2="26" y2="38" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
          <line x1="42" y1="32" x2="43" y2="38" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'human-skeleton',
      nameTH: 'โครงกระดูกคน',
      nameEN: 'Skeleton Walk',
      emoji: '💀',
      quote: 'เดินต้วกเตี้ยกกระดูกสั่นกุ๊กกั๊ก ล่องลอยตรวจเวรยามราตรี',
      colorType: 'purple',
      walkClass: 'walk-patrol-skeleton',
      stepClass: 'step-skeleton',
      speedText: 'เดินกุ๊กกั๊ก 14s',
      renderSvg: (active) => (
        <svg viewBox="0 0 60 70" width="45" height="52" style={{ transform: active ? 'translateY(-15px) rotate(15deg)' : 'none', transition: 'transform 0.2s' }}>
          {/* หัวกะโหลก */}
          <circle cx="30" cy="18" r="11" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
          {/* เบ้าตาสีม่วง */}
          <circle cx="26" cy="17" r="3" fill="#1e1338" />
          <circle cx="26" cy="17" r="1.5" fill="#8b5cf6" />
          <circle cx="34" cy="17" r="3" fill="#1e1338" />
          <circle cx="34" cy="17" r="1.5" fill="#8b5cf6" />
          {/* ซี่โครง */}
          <line x1="30" y1="29" x2="30" y2="48" stroke="#cbd5e1" strokeWidth="3" />
          <line x1="22" y1="35" x2="38" y2="35" stroke="#e2e8f0" strokeWidth="2" />
          <line x1="24" y1="41" x2="36" y2="41" stroke="#e2e8f0" strokeWidth="2" />
          {/* แขนแกว่ง */}
          <line x1="22" y1="33" x2="14" y2="46" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
          <line x1="38" y1="33" x2="46" y2="46" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
          {/* ขาก้าวเดิน */}
          <line x1="26" y1="48" x2="20" y2="67" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="34" y1="48" x2="40" y2="67" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'skeleton-horse',
      nameTH: 'ม้ากระดูก',
      nameEN: 'Skeleton Steed',
      emoji: '🐎💀',
      quote: 'ควบกุกกักข้ามบล็อกศิลา เปลวเพลิงสีม่วงพริ้วสะบัดที่แผงคอ',
      colorType: 'orange',
      walkClass: 'walk-patrol-horse',
      stepClass: 'step-horse',
      speedText: 'ควบเหยาะ 9s',
      renderSvg: (active) => (
        <svg viewBox="0 0 80 60" width="60" height="46" style={{ transform: active ? 'translateY(-12px)' : 'none', transition: 'transform 0.2s' }}>
          {/* หัวม้ากะโหลก */}
          <path d="M56 12 C64 10 74 18 72 24 C68 28 62 26 56 30 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.2" />
          <circle cx="64" cy="18" r="2" fill="#ff7300" />
          {/* แผงคอม้าสีม่วง */}
          <path d="M52 14 Q44 6 42 20 Q38 14 36 28" fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
          {/* กระดูกสันหลัง & ซี่โครง */}
          <path d="M54 28 Q42 32 30 34" stroke="#cbd5e1" strokeWidth="3" fill="none" />
          <ellipse cx="36" cy="38" rx="14" ry="8" fill="none" stroke="#e2e8f0" strokeWidth="1.8" />
          {/* หาง */}
          <path d="M22 35 Q12 40 10 50" stroke="#8b5cf6" strokeWidth="2" fill="none" />
          {/* ขาก้าวควบ */}
          <line x1="44" y1="44" x2="50" y2="58" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="40" y1="44" x2="34" y2="58" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="28" y1="42" x2="22" y2="58" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="42" x2="28" y2="58" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'frankenstein',
      nameTH: 'แฟรงเกนสไตน์',
      nameEN: 'Frankenstein',
      emoji: '🧟‍♂️',
      quote: 'เดินย่ำเท้าหนักแน่นสะเทือนบล็อก สายฟ้าผ่าสีเขียว-ม่วงกระตุกเป็นจังหวะ',
      colorType: 'purple',
      walkClass: 'walk-patrol-frank',
      stepClass: 'step-frank',
      speedText: 'ย่ำเท้าหนัก 18s',
      renderSvg: (active) => (
        <svg viewBox="0 0 60 70" width="45" height="52" style={{ transform: active ? 'translateY(-12px)' : 'none', transition: 'transform 0.2s' }}>
          {/* หัวสี่เหลี่ยมสีเขียวเข้ม */}
          <rect x="18" y="10" width="24" height="24" rx="4" fill="#14532d" stroke="#22c55e" strokeWidth="1.5" />
          <path d="M18 16 L22 12 L28 17 L34 11 L42 16 L42 10 L18 10 Z" fill="#090a0f" />
          {/* สลักคอ */}
          <rect x="13" y="24" width="5" height="4" fill="#94a3b8" />
          <rect x="42" y="24" width="5" height="4" fill="#94a3b8" />
          {/* ตา & ปากเย็บ */}
          <rect x="22" y="20" width="4" height="3" fill="#facc15" />
          <rect x="34" y="20" width="4" height="3" fill="#facc15" />
          <line x1="24" y1="28" x2="36" y2="28" stroke="#000" strokeWidth="1.5" />
          {/* เสื้อคลุมสีดำ */}
          <rect x="16" y="34" width="28" height="22" rx="4" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="1.2" />
          {/* ขาก้าวเดินหนาๆ */}
          <rect x="20" y="56" width="8" height="12" fill="#0f172a" />
          <rect x="32" y="56" width="8" height="12" fill="#0f172a" />
        </svg>
      ),
    },
    {
      id: 'headless-ghost',
      nameTH: 'ผีฟักทองหัวขาด',
      nameEN: 'Headless Pumpkin Ghost',
      emoji: '🎃👻',
      quote: 'อัศวินไร้หัวอุ้มฟักทองเปลวเพลิง ลอยตรวจตราบนแนวกำแพงบล็อก',
      colorType: 'orange',
      walkClass: 'walk-patrol-dullahan',
      stepClass: 'step-dullahan',
      speedText: 'ลอยตรวจการณ์ 13s',
      renderSvg: (active) => (
        <svg viewBox="0 0 65 70" width="48" height="52" style={{ transform: active ? 'translateY(-14px)' : 'none', transition: 'transform 0.2s' }}>
          {/* ผ้าคลุมสีเข้มไร้หัว */}
          <path d="M22 28 C22 20 42 20 42 28 L46 62 L18 62 Z" fill="#181828" stroke="#ff7300" strokeWidth="1.5" />
          {/* เปลวไฟที่คอ */}
          <path d="M28 22 Q32 14 30 10 Q36 15 36 22 Z" fill="#a855f7" />
          {/* ถือหัวฟักทองที่มือ */}
          <ellipse cx="48" cy="38" rx="10" ry="8" fill="#ea580c" stroke="#ff7300" strokeWidth="1" />
          <polygon points="44,35 47,37 44,39" fill="#fef08a" />
          <polygon points="52,35 49,37 52,39" fill="#fef08a" />
          <path d="M44,41 Q48,45 52,41" stroke="#fef08a" strokeWidth="1" fill="none" />
          {/* ดาบ */}
          <line x1="16" y1="30" x2="8" y2="58" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  function handleJump(id: string) {
    setActiveWalker(id);
    setJumpId(id);
    setTimeout(() => setJumpId(null), 600);
  }

  const selected = walkers.find((w) => w.id === activeWalker) || walkers[0];

  return (
    <section style={{ margin: '3rem 0' }}>
      {/* ส่วนหัว Section (แยกสีชัดเจน ไม่ใช้การไล่สีแสบตา) */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <span className="badge">
            🏰 Castle Walkways
          </span>
          <span className="badge badge-purple">
            🎃 9 สิ่งลี้ลับประจำค่ำคืน
          </span>
        </div>
        <h2 className="section-title">
          <span>🎃</span> กองทัพภูติผีเดินตรวจการณ์บนบล็อก
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
          ตัวละครแต่ละตัวกำลัง <strong style={{ color: 'var(--orange-main)' }}>เดินลาดตระเวนไปมาบนบล็อก</strong> — คลิกที่ตัวละครเพื่อสั่งให้กระโดด! 👆
        </p>
      </div>

      {/* ─── แท่นเดินบล็อกคู่ (2 Interactive Castle Walkways) ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
        
        {/* บล็อกที่ 1: ฝั่งสีส้ม (Orange Platform) */}
        <div
          className="walkway-block"
          style={{
            height: '160px',
            borderTopColor: '#ff7300',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ff9433' }}>
              🧱 บล็อกทางเดินที่ 1 (ฝั่งเพลิงส้ม)
            </span>
            <span className="tag" style={{ color: '#ff9433', borderColor: '#ff7300' }}>3 ผู้ตรวจการณ์</span>
          </div>

          {/* ลานเดินลาดตระเวน: แมวดำ, หนู, ม้ากระดูก */}
          <div style={{ position: 'relative', width: '100%', height: '80px' }}>
            {/* เส้นพื้นบล็อกศิลา */}
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: 0,
              right: 0,
              height: '3px',
              background: '#332014',
              borderTop: '1px dashed #ff7300',
            }} />

            {/* แมวดำเดิน */}
            <div
              className={`walk-patrol-cat`}
              onClick={() => handleJump('black-cat')}
              style={{ cursor: 'pointer', zIndex: 3 }}
              title="คลิกเพื่อสั่งแมวดำกระโดด!"
            >
              <div className="step-cat">
                {walkers[0].renderSvg(jumpId === 'black-cat')}
              </div>
            </div>

            {/* หนูวิ่ง */}
            <div
              className="walk-patrol-rat"
              onClick={() => handleJump('spooky-rat')}
              style={{ cursor: 'pointer', zIndex: 4 }}
              title="คลิกเพื่อสั่งหนูกระโดด!"
            >
              <div className="step-rat">
                {walkers[1].renderSvg(jumpId === 'spooky-rat')}
              </div>
            </div>

            {/* ม้ากระดูกควบ */}
            <div
              className="walk-patrol-horse"
              onClick={() => handleJump('skeleton-horse')}
              style={{ cursor: 'pointer', zIndex: 2 }}
              title="คลิกเพื่อสั่งม้ากระดูกกระโดด!"
            >
              <div className="step-horse">
                {walkers[3].renderSvg(jumpId === 'skeleton-horse')}
              </div>
            </div>
          </div>
        </div>

        {/* บล็อกที่ 2: ฝั่งสีม่วง (Purple Platform) */}
        <div
          className="walkway-block walkway-block-purple"
          style={{
            height: '160px',
            borderTopColor: '#8b5cf6',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#a78bfa' }}>
              🧱 บล็อกทางเดินที่ 2 (ฝั่งเวทมนตร์ม่วง)
            </span>
            <span className="tag" style={{ color: '#a78bfa', borderColor: '#8b5cf6' }}>3 ผู้ตรวจการณ์</span>
          </div>

          {/* ลานเดินลาดตระเวน: โครงกระดูก, แฟรงเกนสไตน์, ผีฟักทองหัวขาด */}
          <div style={{ position: 'relative', width: '100%', height: '80px' }}>
            {/* เส้นพื้นบล็อกศิลา */}
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: 0,
              right: 0,
              height: '3px',
              background: '#22153b',
              borderTop: '1px dashed #8b5cf6',
            }} />

            {/* โครงกระดูกคนเดิน */}
            <div
              className="walk-patrol-skeleton"
              onClick={() => handleJump('human-skeleton')}
              style={{ cursor: 'pointer', zIndex: 3 }}
              title="คลิกเพื่อสั่งโครงกระดูกกระโดด!"
            >
              <div className="step-skeleton">
                {walkers[2].renderSvg(jumpId === 'human-skeleton')}
              </div>
            </div>

            {/* แฟรงเกนสไตน์เดิน */}
            <div
              className="walk-patrol-frank"
              onClick={() => handleJump('frankenstein')}
              style={{ cursor: 'pointer', zIndex: 2 }}
              title="คลิกเพื่อสั่งแฟรงเกนสไตน์กระโดด!"
            >
              <div className="step-frank">
                {walkers[4].renderSvg(jumpId === 'frankenstein')}
              </div>
            </div>

            {/* ผีฟักทองหัวขาดเดิน */}
            <div
              className="walk-patrol-dullahan"
              onClick={() => handleJump('headless-ghost')}
              style={{ cursor: 'pointer', zIndex: 4 }}
              title="คลิกเพื่อสั่งผีฟักทองหัวขาดกระโดด!"
            >
              <div className="step-dullahan">
                {walkers[5].renderSvg(jumpId === 'headless-ghost')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── การ์ดแสดงข้อมูลตัวละครที่เลือก (Clean Solid Focus Card) ─── */}
      <div
        className="card"
        style={{
          borderLeft: selected.colorType === 'orange' ? '4px solid #ff7300' : '4px solid #8b5cf6',
          padding: '1.25rem 1.5rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          background: selected.colorType === 'orange' ? '#181412' : '#14121f',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2rem' }}>{selected.emoji}</span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong style={{ fontSize: '1.15rem', color: '#ffffff' }}>{selected.nameTH}</strong>
              <span className="tag" style={{ color: selected.colorType === 'orange' ? '#ff9433' : '#a78bfa' }}>
                {selected.nameEN}
              </span>
              <span className="tag">{selected.speedText}</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#d1d5db', marginTop: '3px' }}>
              &ldquo;{selected.quote}&rdquo;
            </p>
          </div>
        </div>

        <button
          onClick={() => handleJump(selected.id)}
          className="btn-primary"
          style={{
            background: selected.colorType === 'orange' ? '#ff7300' : '#8b5cf6',
            borderColor: selected.colorType === 'orange' ? '#ff9433' : '#a78bfa',
            color: selected.colorType === 'orange' ? '#000000' : '#ffffff',
          }}
        >
          ✨ สั่ง {selected.nameTH} กระโดด!
        </button>
      </div>

      {/* ─── บล็อกแสดงตัวละครฮาโลวีนที่เหลือ (ฟักทองคลาสสิก, ฟักทองเรืองแสง, แม่มดหม้อต้มยา) ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {/* ฟักทองคลาสสิก */}
        <div className="card card-orange" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '1.75rem' }}>🎃</span>
            <div>
              <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>ฟักทองแกะสลัก</strong>
              <div style={{ fontSize: '0.75rem', color: '#ff9433' }}>Classic Jack-o&apos;-Lantern</div>
            </div>
          </div>
          <p style={{ fontSize: '0.825rem', color: '#9ca3af', lineHeight: 1.6 }}>
            รอยยิ้มฟันหลอสุดคลาสสิก ตั้งตระหง่านอยู่บนบล็อกศิลาทางเข้า
          </p>
        </div>

        {/* ฟักทองเรืองแสง */}
        <div className="card card-orange" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '1.75rem' }}>🎃✨</span>
            <div>
              <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>ฟักทองเรืองแสง</strong>
              <div style={{ fontSize: '0.75rem', color: '#ff9433' }}>Glowing Pumpkin Flame</div>
            </div>
          </div>
          <p style={{ fontSize: '0.825rem', color: '#9ca3af', lineHeight: 1.6 }}>
            เปลวไฟเวทมนตร์สีส้มทองลุกโชนภายใน ไม่มีวันดับสลาย
          </p>
        </div>

        {/* แม่มด & หม้อต้มยา */}
        <div className="card card-purple" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '1.75rem' }}>🧙‍♀️</span>
            <div>
              <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>แม่มดเวทมนตร์</strong>
              <div style={{ fontSize: '0.75rem', color: '#a78bfa' }}>Mystic Cauldron Witch</div>
            </div>
          </div>
          <p style={{ fontSize: '0.825rem', color: '#9ca3af', lineHeight: 1.6 }}>
            ขี่ไม้กวาดบินข้ามหน้าจอ พร้อมปรุงยาวิเศษสีม่วงในหม้อต้ม
          </p>
        </div>
      </div>
    </section>
  );
}
