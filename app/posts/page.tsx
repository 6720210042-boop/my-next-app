import { connection } from 'next/server';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default async function PostsPage() {
  await connection();
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
    next: { revalidate: 3600 },
  });
  const posts: Post[] = await res.json();

  return (
    <div className="fade-in-up">
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="badge" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>
          🌐 JSONPlaceholder API
        </span>
        <h1 className="section-title">
          <span>📰</span> โพสต์ทั้งหมด (Server Components)
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          ดึงข้อมูลแบบ Server-Side Rendering (SSR) พร้อม Caching 1 ชั่วโมง
        </p>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {posts.map((p) => (
          <div
            key={p.id}
            className="card"
            style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}
          >
            <div style={{
              width: '44px', height: '44px', borderRadius: '10px',
              background: 'var(--badge-bg)',
              border: '1px solid var(--pink-pastel)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, color: 'var(--pink-pastel)', fontSize: '0.9rem',
              flexShrink: 0,
            }}>
              #{p.id}
            </div>
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.4rem', lineHeight: 1.4, textTransform: 'capitalize' }}>
                {p.title}
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                {p.body.slice(0, 140)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
