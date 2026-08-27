'use client';

import { useState } from 'react';

export default function HalloweenDecorations() {
  const [witchMessage, setWitchMessage] = useState<string | null>(null);
  const [spiderPoke, setSpiderPoke] = useState(false);

  function handleWitchClick() {
    setWitchMessage('✨ ฮี่ๆๆๆ! ข้าคือแม่มดแห่งรัตติกาล! 🧙‍♀️');
    setTimeout(() => setWitchMessage(null), 3000);
  }

  function handleSpiderClick() {
    setSpiderPoke(true);
    setTimeout(() => setSpiderPoke(false), 1500);
  }

  return (
    <>
      {/* ═════════════════════════════════════════════════════════
          🧙‍♀️ แม่มดขี่ไม้กวาดบินไปบินมาข้ามหน้าจอ (Flying Witch)
          ═════════════════════════════════════════════════════════ */}
      <div
        className="flying-witch-banner"
        onClick={handleWitchClick}
        title="คลิกที่แม่มด!"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          userSelect: 'none',
        }}
      >
        {witchMessage && (
          <div style={{
            background: '#8b5cf6',
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '4px',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          }}>
            {witchMessage}
          </div>
        )}

        {/* SVG ภาพแม่มดขี่ไม้กวาดพร้อมไอเวทมนตร์ */}
        <div style={{ width: '80px', height: '65px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))' }}>
          <svg viewBox="0 0 100 80" width="100%" height="100%">
            {/* ไม้กวาดเวทมนตร์ */}
            <line x1="8" y1="58" x2="90" y2="40" stroke="#854d0e" strokeWidth="4" strokeLinecap="round" />
            {/* ขนไม้กวาด */}
            <polygon points="6,56 22,50 20,66" fill="#ca8a04" />
            <polygon points="2,59 18,52 16,68" fill="#eab308" />
            {/* ประกายเวทมนตร์ท้ายไม้กวาด */}
            <circle cx="4" cy="58" r="2.5" fill="#a855f7" />
            <circle cx="12" cy="62" r="1.5" fill="#ff7300" />

            {/* ชุดคลุมแม่มด */}
            <path d="M42 46 L30 62 L62 60 L54 44 Z" fill="#2e1065" stroke="#8b5cf6" strokeWidth="1" />
            {/* หัวแม่มด & จมูกยาว */}
            <circle cx="50" cy="36" r="8" fill="#86efac" />
            <polygon points="56,36 63,38 56,40" fill="#86efac" />
            {/* ดวงตาวิบวับ */}
            <circle cx="53" cy="34" r="1.5" fill="#000000" />
            {/* หมวกแม่มดแหลมสีม่วง */}
            <ellipse cx="49" cy="30" rx="16" ry="4" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="1" />
            <path d="M40 29 Q52 8 68 4 Q58 16 58 29 Z" fill="#2e1065" stroke="#a855f7" strokeWidth="1" />
            <line x1="43" y1="28" x2="55" y2="28" stroke="#ff7300" strokeWidth="2.5" />
          </svg>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════
          🕷️ แมงมุมห้อยลงมาจากด้านบน (Hanging Spiders)
          ═════════════════════════════════════════════════════════ */}

      {/* แมงมุมตัวที่ 1 (ฝั่งซ้ายบน) */}
      <div
        className={`spider-hanger-1 ${spiderPoke ? 'animate-spooky-shake' : ''}`}
        onClick={handleSpiderClick}
        title="คลิกเพื่อแหย่แมงมุม!"
        style={{
          position: 'fixed',
          top: '-10px',
          left: '70px',
          zIndex: 96,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'auto',
        }}
      >
        {/* เส้นใยแมงมุม */}
        <div style={{
          width: '1px',
          height: '95px',
          background: 'rgba(255, 255, 255, 0.4)',
        }} />
        {/* ตัวแมงมุมสีดำ-ส้ม */}
        <div style={{ width: '28px', height: '28px', marginTop: '-2px' }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            {/* ขาแมงมุม 8 ขา */}
            <path d="M40 45 Q15 25 10 50 M38 50 Q10 45 5 70 M60 45 Q85 25 90 50 M62 50 Q90 45 95 70" stroke="#ff7300" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M42 55 Q20 70 25 90 M58 55 Q80 70 75 90" stroke="#ff7300" strokeWidth="5" fill="none" strokeLinecap="round" />
            {/* ลำตัว & หัว */}
            <circle cx="50" cy="42" r="14" fill="#12121a" stroke="#8b5cf6" strokeWidth="3" />
            <circle cx="50" cy="62" r="20" fill="#181824" stroke="#ff7300" strokeWidth="3" />
            {/* ลวดลายบนหลังแมงมุม */}
            <polygon points="50,54 44,66 56,66" fill="#ff7300" />
            {/* ตาแดง 2 ข้าง */}
            <circle cx="45" cy="40" r="3" fill="#ef4444" />
            <circle cx="55" cy="40" r="3" fill="#ef4444" />
          </svg>
        </div>
      </div>

      {/* แมงมุมตัวที่ 2 (ฝั่งขวาบน) */}
      <div
        className="spider-hanger-2"
        onClick={handleSpiderClick}
        title="คลิกเพื่อแหย่แมงมุม!"
        style={{
          position: 'fixed',
          top: '-10px',
          right: '90px',
          zIndex: 96,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'auto',
        }}
      >
        {/* เส้นใยแมงมุม */}
        <div style={{
          width: '1px',
          height: '130px',
          background: 'rgba(255, 255, 255, 0.35)',
        }} />
        {/* ตัวแมงมุมสีม่วง-ส้ม */}
        <div style={{ width: '24px', height: '24px', marginTop: '-2px' }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path d="M40 45 Q15 25 10 50 M38 50 Q10 45 5 70 M60 45 Q85 25 90 50 M62 50 Q90 45 95 70" stroke="#8b5cf6" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M42 55 Q20 70 25 90 M58 55 Q80 70 75 90" stroke="#8b5cf6" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="42" r="14" fill="#12121a" stroke="#ff7300" strokeWidth="3" />
            <circle cx="50" cy="62" r="18" fill="#181824" stroke="#8b5cf6" strokeWidth="3" />
            <circle cx="45" cy="40" r="3" fill="#facc15" />
            <circle cx="55" cy="40" r="3" fill="#facc15" />
          </svg>
        </div>
      </div>
    </>
  );
}
