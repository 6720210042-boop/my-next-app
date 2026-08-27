'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('portfolio-theme') as 'dark' | 'light') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  }

  if (!mounted) {
    return (
      <button
        style={{
          background: 'transparent',
          border: '1px solid var(--card-border)',
          borderRadius: '20px',
          padding: '4px 14px',
          fontSize: '0.825rem',
          color: 'var(--text-muted)',
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        aria-label="Theme toggle"
      >
        ธีม
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      style={{
        background: theme === 'dark' ? '#241c28' : 'var(--pink-light)',
        border: '1px solid var(--pink-pastel)',
        color: theme === 'dark' ? 'var(--pink-pastel)' : '#1e1b26',
        borderRadius: '20px',
        padding: '4px 14px',
        fontSize: '0.825rem',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        userSelect: 'none',
      }}
      title={theme === 'dark' ? 'สลับเป็นโหมดสว่าง (Light Mode)' : 'สลับเป็นโหมดมืด (Dark Mode)'}
    >
      {theme === 'dark' ? 'โหมดสว่าง' : 'โหมดมืด'}
    </button>
  );
}
