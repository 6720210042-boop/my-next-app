// app/posts/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts | Pathomphon Portfolio',
  description: 'บทความจาก JSONPlaceholder API',
};

interface Post {
  id: number;
  title: string;
  body: string;
}

export default async function PostsPage() {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=10',
    { cache: 'no-store' }
  );
  const posts: Post[] = await res.json();

  return (
    <div className="fade-in-up">
      <div style={{ marginBottom: '3rem' }}>
        <span className="badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>API Demo</span>
        <h1 className="section-title gradient-text">Posts</h1>
        <p style={{ color: '#94a3b8', marginTop: '1.5rem' }}>
          ข้อมูลจาก JSONPlaceholder API — แสดง Server-side Data Fetching ใน Next.js
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {posts.map((p: Post) => (
          <div key={p.id} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              width: 40, height: 40, borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, color: '#a78bfa', fontSize: '0.85rem',
              flexShrink: 0,
            }}>
              #{p.id}
            </div>
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.35rem', lineHeight: 1.4, textTransform: 'capitalize' }}>
                {p.title}
              </h2>
              <p style={{ fontSize: '0.825rem', color: '#64748b', lineHeight: 1.65 }}>
                {p.body.slice(0, 120)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
