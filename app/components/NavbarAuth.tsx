'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function NavbarAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  async function checkAuth() {
    try {
      const res = await fetch('/api/me', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setIsLoggedIn(Boolean(data.isLoggedIn));
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch('/api/logout', { method: 'POST' });
      setIsLoggedIn(false);
      router.push('/login');
      router.refresh();
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  if (isLoggedIn) {
    return (
      <button
        onClick={handleLogout}
        disabled={loading}
        style={{
          border: '1px solid #7f1d1d',
          background: '#3d141c',
          color: '#fca5a5',
          borderRadius: '6px',
          padding: '4px 12px',
          fontSize: '0.875rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          whiteSpace: 'nowrap',
          fontFamily: 'var(--font-ibm-plex)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#e11d48';
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#3d141c';
          e.currentTarget.style.color = '#fca5a5';
        }}
      >
        {loading ? 'กำลังออก...' : 'ออกจากระบบ'}
      </button>
    );
  }

  return (
    <>
      <Link href="/register">สมัครสมาชิก</Link>
      <Link href="/login">เข้าสู่ระบบ</Link>
    </>
  );
}
