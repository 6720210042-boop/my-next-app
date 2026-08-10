// app/layout.tsx
import Link from 'next/link';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Portfolio ปฐมพร บัวเนี่ยว',
    default: 'Portfolio ปฐมพร บัวเนี่ยว',
  },
  description: 'Portfolio ส่วนตัวของ นายปฐมพร บัวเนี่ยว นิสิตมหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <nav style={{ padding: '0 2rem' }}>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            height: '56px',
          }}>
            <strong style={{
              color: '#1a1a2e',
              marginRight: '1.5rem',
              fontSize: '1rem',
              fontWeight: 700,
            }}>
              ปฐมพร บัวเนี่ยว
            </strong>
            <Link href="/" style={{ color: '#475569' }}>หน้าแรก</Link>
            <Link href="/courses" style={{ color: '#475569' }}>Courses</Link>
            <Link href="/blog" style={{ color: '#475569' }}>Blog</Link>
            <Link href="/about" style={{ color: '#475569' }}>About</Link>
            <Link href="/posts" style={{ color: '#475569' }}>Posts</Link>
            <Link href="/demo" style={{ color: '#475569' }}>Demo</Link>
            <Link href="/contact" style={{ color: '#475569' }}>Contact</Link>
            <Link href="/login" style={{ color: '#475569' }}>Login</Link>
            <Link href="/dashboard" style={{ color: '#475569' }}>Dashboard</Link>
            <Link href="/blog-spa" style={{ color: '#475569' }}>blog-spa</Link>
          </div>
        </nav>

        <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 2rem 4rem' }}>
          {children}
        </main>

        <footer className="text-center p-4" style={{ color: '#64748b', fontSize: '0.8rem' }}>
          © 2568 นายปฐมพร บัวเนี่ยว · รหัสนิสิต 6720210042 · มหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง
        </footer>
      </body>
    </html>
  );
}
