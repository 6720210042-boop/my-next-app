'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    if (password.length < 4) {
      setError('รหัสผ่านต้องมีความยาวอย่างน้อย 4 ตัวอักษร');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const data = await res.json().catch(() => ({}));

      setLoading(false);

      if (!res.ok) {
        setError(data.error || 'การสมัครสมาชิกไม่สำเร็จ โปรดลองใหม่อีกครั้ง');
        return;
      }

      // สมัครสำเร็จและตั้ง Cookie ให้แล้ว นำทางไปยัง Dashboard ทันที
      router.push('/dashboard');
      router.refresh();
    } catch {
      setLoading(false);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    }
  }

  return (
    <div className="fade-in-up" style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
      <form
        onSubmit={handleSubmit}
        className="card"
        style={{
          width: '100%',
          maxWidth: '440px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          padding: '2.25rem 2rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <span className="badge" style={{ marginBottom: '0.6rem', display: 'inline-flex' }}>
            ✨ New Account
          </span>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-main)' }}>
            สมัครสมาชิก
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            สร้างบัญชีเพื่อแสดงความคิดเห็นและพูดคุยในเว็บไซต์
          </p>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            อีเมล (Email)
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="your-name@example.com"
            required
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            รหัสผ่าน (Password)
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="อย่างน้อย 4 ตัวอักษร"
            required
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            ยืนยันรหัสผ่าน (Confirm Password)
          </label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="พิมพ์รหัสผ่านอีกครั้ง"
            required
            style={{ width: '100%' }}
          />
        </div>

        {error && (
          <div style={{
            background: '#3d141c',
            border: '1px solid #7f1d1d',
            borderRadius: '6px',
            padding: '0.6rem 0.85rem',
            color: '#fca5a5',
            fontSize: '0.85rem',
          }}>
            ⚠️ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{ width: '100%', padding: '10px', marginTop: '0.5rem' }}
        >
          {loading ? 'กำลังสร้างบัญชี...' : '🌸 สมัครสมาชิก (Sign Up)'}
        </button>

        <div style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)', paddingTop: '0.75rem', borderTop: '1px solid var(--card-border)' }}>
          มีบัญชีผู้ใช้อยู่แล้ว?{' '}
          <Link href="/login" style={{ color: 'var(--pink-pastel)', textDecoration: 'none', fontWeight: 600 }}>
            เข้าสู่ระบบที่นี่ →
          </Link>
        </div>
      </form>
    </div>
  );
}
