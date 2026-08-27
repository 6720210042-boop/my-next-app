// app/demo/page.tsx — Next.js Server & Client Features Demo
import Counter from '../components/Counter';
import TextAnalyzerDemo from '../components/TextAnalyzerDemo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demo | Portfolio ปฐมพร บัวเนี่ยว',
  description: 'หน้าสาธิตการทำงานของ Next.js Server Components, Client Components และ Data Fetching',
};

interface Post {
  id: number;
  title: string;
  body: string;
}

export default async function DemoPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4', {
    next: { revalidate: 1800 },
  });
  const posts: Post[] = await res.json();

  return (
    <div className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Section */}
      <div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <span className="badge">Next.js App Router</span>
          <span className="badge">SSR &amp; Client State</span>
        </div>
        <h1 className="section-title">
          Demo Playground &amp; Components
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          หน้าสาธิตการทำงานร่วมกันระหว่าง <strong>Server Components</strong> (ดึงข้อมูลฝั่งเซิร์ฟเวอร์แบบ Fast Render) และ <strong>Client Components</strong> (การจัดการ State ฝั่งเบราว์เซอร์)
        </p>
      </div>

      {/* Main Grid: 2 Columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '1.5rem',
        alignItems: 'start',
      }}>
        {/* Left Column: Client Components */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Card 1: Interactive Counter */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Client State Counter
              </h2>
              <span className="badge">useClient</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
              ทดสอบการจัดการ State ด้วย React Hook <code>useState</code> พร้อมปุ่มเพิ่ม/ลด และการคำนวณแบบทันที
            </p>
            <Counter />
          </div>

          {/* Card 2: Interactive Text Analyzer */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Live Text Analyzer
              </h2>
              <span className="badge">Reactive</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
              ประมวลผลข้อความแบบ Real-time นับจำนวนตัวอักษร จำนวนคำ และแปลงข้อความ
            </p>
            <TextAnalyzerDemo />
          </div>
        </div>

        {/* Right Column: Server Components & Fetching */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Card 3: Server-Side Fetched Data */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Server Fetched Posts
              </h2>
              <span className="badge">SSR (Limit: 4)</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
              ดึงข้อมูลจากภายนอกผ่าน Server Component โดยตรง รวดเร็ว ปลอดภัย และมี Caching
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {posts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    padding: '0.85rem 1rem',
                    background: 'var(--card-hover-bg)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    transition: 'border-color 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      background: 'var(--pink-pastel)',
                      color: '#000000',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      borderRadius: '4px',
                      padding: '1px 6px',
                    }}>
                      #{post.id}
                    </span>
                    <strong style={{
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                      textTransform: 'capitalize',
                      lineHeight: 1.35,
                    }}>
                      {post.title}
                    </strong>
                  </div>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    lineHeight: 1.5,
                    marginTop: '2px',
                  }}>
                    {post.body ? post.body.slice(0, 90) + '...' : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Architecture Note */}
          <div className="card">
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--pink-pastel)', marginBottom: '0.5rem' }}>
              Next.js Architecture Notes
            </h2>
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.85rem',
              color: 'var(--text-body)',
            }}>
              <li style={{ display: 'flex', gap: '6px' }}>
                <span style={{ color: 'var(--pink-pastel)', fontWeight: 700 }}>•</span>
                <span><strong>Server Components:</strong> ทำงานบนเซิร์ฟเวอร์ ไม่ส่ง JavaScript ส่วนเกินไปยัง Browser</span>
              </li>
              <li style={{ display: 'flex', gap: '6px' }}>
                <span style={{ color: 'var(--pink-pastel)', fontWeight: 700 }}>•</span>
                <span><strong>Client Components:</strong> ใช้สำหรับส่วนที่มีการกดปุ่ม (Event Listener), State หรือ Browser APIs</span>
              </li>
              <li style={{ display: 'flex', gap: '6px' }}>
                <span style={{ color: 'var(--pink-pastel)', fontWeight: 700 }}>•</span>
                <span><strong>Zero Layout Shift:</strong> รองรับ Dark / Light Theme แบบ Seamless</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}