// app/blog/page.tsx — Blog Listing Page (Clean & Single Color Blocks)
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Portfolio ปฐมพร บัวเนี่ยว',
  description: 'บทความและบันทึกประสบการณ์ของ ปฐมพร บัวเนี่ยว (ชิน) — อ่านง่าย สบายตา',
};

const posts = [
  {
    id: 'web-development-journey',
    title: 'เส้นทางของนักพัฒนาเว็บมือใหม่',
    subtitle: 'จากศูนย์สู่ Full-Stack Developer ใน 1 ปี',
    category: 'Programming',
    date: '15 กรกฎาคม 2568',
    readTime: '8 นาที',
    coverImg: '/blog-webdev.png',
    tags: ['Web Dev', 'Programming', 'Beginner'],
    emoji: '💻',
  },
  {
    id: 'nextjs-app-router',
    title: 'Next.js App Router ทำความเข้าใจ',
    subtitle: 'สรุป Server Components, Layouts และ Loading States',
    category: 'Tutorial',
    date: '10 กรกฎาคม 2568',
    readTime: '10 นาที',
    coverImg: '/blog-nextjs.png',
    tags: ['Next.js', 'React', 'TypeScript'],
    emoji: '🔧',
  },
  {
    id: 'university-life',
    title: 'ชีวิตนิสิต CS มหาวิทยาลัยทักษิณ',
    subtitle: 'เรียน Code ท่ามกลางธรรมชาติและเพื่อนร่วมทาง',
    category: 'Life',
    date: '5 กรกฎาคม 2568',
    readTime: '6 นาที',
    coverImg: '/blog-university.png',
    tags: ['University', 'Life', 'CS Student'],
    emoji: '🎓',
  },
];

export default function BlogPage() {
  return (
    <div className="fade-in-up">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <span className="badge">🔥 {posts.length} บทความ</span>
        </div>
        <h1 className="section-title">
          <span>✍️</span> Blog &amp; บันทึก
        </h1>
        <p style={{ color: '#9ca3af' }}>
          บทความ บันทึกประสบการณ์ และความรู้ที่สะสมระหว่างเส้นทางการเรียนรู้
        </p>
      </div>

      {/* Featured post (first) — บล็อกสีเดียว */}
      <Link href={`/blog/${posts[0].id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '1.5rem' }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ position: 'relative' }}>
            <Image
              src={posts[0].coverImg}
              alt={posts[0].title}
              width={1200}
              height={420}
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              priority
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(37,20,34,0.95) 20%, transparent 70%)',
            }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{
                  background: 'var(--pink-pastel)',
                  color: '#000000',
                  borderRadius: '4px',
                  padding: '2px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}>
                  {posts[0].category}
                </span>
                <span className="tag">⭐ Featured</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                {posts[0].title}
              </h2>
              <p style={{ color: 'var(--text-body)', fontSize: '0.9rem' }}>{posts[0].subtitle}</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.6rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span>📅 {posts[0].date}</span>
                <span>⏱️ {posts[0].readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Other posts grid — บล็อกสีเดียว */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
        {posts.slice(1).map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card" style={{ padding: 0, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative' }}>
                <Image
                  src={post.coverImg}
                  alt={post.title}
                  width={600}
                  height={240}
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  background: 'var(--pink-pastel)',
                  color: '#000000',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                }}>
                  {post.category}
                </div>
              </div>
              <div style={{ padding: '1.15rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.3rem', lineHeight: 1.4 }}>
                  {post.title}
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.6, flex: 1 }}>
                  {post.subtitle}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.75rem' }}>
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', paddingTop: '0.6rem', borderTop: '1px solid var(--card-border)' }}>
                  <span>📅 {post.date}</span>
                  <span style={{ color: 'var(--pink-pastel)', fontWeight: 500 }}>อ่านต่อ →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}