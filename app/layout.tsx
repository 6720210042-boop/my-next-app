// app/layout.tsx
import Link from 'next/link';
import './globals.css';
import type { Metadata } from 'next';
import { IBM_Plex_Sans_Thai } from 'next/font/google';
import ThemeToggle from './components/ThemeToggle';
import NavbarAuth from './components/NavbarAuth';

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  display: 'swap',
  variable: '--font-ibm-plex',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Portfolio ปฐมพร บัวเนี่ยว',
    default: 'Portfolio ปฐมพร บัวเนี่ยว',
  },
  description: 'Portfolio ส่วนตัวของ นายปฐมพร บัวเนี่ยว นิสิตมหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง — ธีมสว่างและมืดปรับได้',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={ibmPlexSansThai.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('portfolio-theme');
                  var theme = saved || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={ibmPlexSansThai.className}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <nav style={{ padding: '0 1.5rem' }}>
            <div style={{
              maxWidth: '1150px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '58px',
              gap: '1rem',
            }}>
              {/* Brand Logo */}
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 0 }}>
                <strong style={{
                  color: 'var(--text-main)',
                  fontSize: '1.08rem',
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                }}>
                  ปฐมพร <span style={{ color: 'var(--pink-pastel)' }}>บัวเนี่ยว</span>
                </strong>
              </Link>

              {/* Navigation Links + Auth Controls + Theme Toggle */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                overflowX: 'auto',
                padding: '4px 0',
              }}>
                <Link href="/">หน้าแรก</Link>
                <Link href="/courses">Courses</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/about">About</Link>
                <Link href="/posts">Posts</Link>
                <Link href="/demo">Demo</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/comments">Board</Link>
                <Link href="/dashboard">Dashboard</Link>
                <NavbarAuth />
                <ThemeToggle />
              </div>
            </div>
          </nav>

          <main style={{ maxWidth: '1150px', margin: '0 auto', padding: '2rem 1.5rem 4rem', width: '100%', flex: 1 }}>
            {children}
          </main>

          <footer className="text-center p-6" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <div style={{ maxWidth: '1150px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <span className="badge">Portfolio</span>
                <span className="badge">Font: IBM Plex Sans Thai</span>
                <ThemeToggle />
              </div>
              <p style={{ marginTop: '0.25rem' }}>
                © 2568 นายปฐมพร บัวเนี่ยว · รหัสนิสิต <strong style={{ color: 'var(--pink-pastel)' }}>6720210042</strong> · มหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
