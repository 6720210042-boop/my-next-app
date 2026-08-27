'use client';

import { useState } from 'react';

export default function BlackpinkDecorations() {
  const [lightstickActive, setLightstickActive] = useState(false);
  const [cheerText, setCheerText] = useState<string | null>(null);

  const cheers = [
    '🖤💖 BLACKPINK IN YOUR AREA!',
    '✨ How You Like That!',
    '👑 Born Pink! Shut Down!',
    '💖 As If It’s Your Last~',
    '🌸 Pink Venom! Taste That!',
    '🌟 BLINK Forever & Always!',
  ];

  function handleLightstickClick() {
    setLightstickActive(true);
    const randomCheer = cheers[Math.floor(Math.random() * cheers.length)];
    setCheerText(randomCheer);
    setTimeout(() => {
      setLightstickActive(false);
      setCheerText(null);
    }, 2800);
  }

  return (
    <>
      {/* ─── แท่งไฟค้อนหัวใจ Blackpink (Pyongbong) ที่มุมล่างขวา ─── */}
      <div
        onClick={handleLightstickClick}
        title="คลิกเพื่อโบกแท่งไฟ Blackpink Pyongbong (뿅봉)!"
        style={{
          position: 'fixed',
          bottom: '22px',
          right: '25px',
          zIndex: 95,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          userSelect: 'none',
        }}
        className={lightstickActive ? 'animate-spooky-bounce' : 'lightstick-float'}
      >
        {cheerText && (
          <div style={{
            background: '#ff2a85',
            color: '#ffffff',
            padding: '5px 12px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '6px',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 15px rgba(255, 42, 133, 0.4)',
            animation: 'fadeInUp 0.2s ease',
          }}>
            {cheerText}
          </div>
        )}

        {/* SVG แท่งไฟค้อนหัวใจ Pyongbong */}
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: lightstickActive ? '#2e1120' : '#14141c',
          border: '2px solid #ff2a85',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: lightstickActive ? '0 0 20px rgba(255, 42, 133, 0.6)' : '0 4px 12px rgba(0,0,0,0.5)',
          transition: 'all 0.2s ease',
        }}>
          <svg viewBox="0 0 64 64" width="38" height="38">
            {/* ด้ามจับสีดำ & ปุ่มกดสีชมพู */}
            <rect x="29" y="32" width="6" height="28" rx="2" fill="#1e1e24" stroke="#ff2a85" strokeWidth="1" />
            <circle cx="32" cy="42" r="2" fill="#ff2a85" />
            {/* หัวค้อนหัวใจคู่สีชมพู (Heart Hammer) */}
            {/* หัวใจซ้าย */}
            <path d="M32 20 C28 10 14 10 14 20 C14 28 32 34 32 34 Z" fill="#ff2a85" />
            {/* หัวใจขวา */}
            <path d="M32 20 C36 10 50 10 50 20 C50 28 32 34 32 34 Z" fill="#ff2a85" />
            {/* วงแหวนกลาง */}
            <circle cx="32" cy="24" r="5" fill="#121216" stroke="#ff75ac" strokeWidth="1.2" />
            <circle cx="32" cy="24" r="2.5" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* ─── มุมซ้ายบน: สัญลักษณ์ BLACKPINK VIP Crown Badge ─── */}
      <div
        style={{
          position: 'fixed',
          top: '12px',
          left: '16px',
          zIndex: 101,
          pointerEvents: 'none',
          opacity: 0.85,
        }}
      >
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          background: '#1b0d16',
          border: '1px solid #4a152d',
          color: '#ff75ac',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
        }}>
          👑 BORN PINK
        </span>
      </div>
    </>
  );
}
