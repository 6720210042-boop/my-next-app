// app/blog/page.tsx — Blog Listing Page
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Portfolio ปฐมพร บัวเนี่ยว',
  description: 'บทความและบันทึกประสบการณ์ของ ปฐมพร บัวเนี่ยว (ชิน)',
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
    accentColor: '#a78bfa',
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
    accentColor: '#22d3ee',
    emoji: '🔧',
  },
  {
    id: 'university-life',
    title: 'ชีวิตนิสิต CS มหาวิทยาลัยบูรพา',
    subtitle: 'เรียน Code ท่ามกลางทะเลและลมชายฝั่ง',
    category: 'Life',
    date: '5 กรกฎาคม 2568',
    readTime: '6 นาที',
    coverImg: '/blog-university.png',
    tags: ['University', 'Life', 'CS Student'],
    accentColor: '#34d399',
    emoji: '🎓',
  },
];

const categoryColors: Record<string, string> = {
  Programming: '#7c3aed',
  Tutorial: '#0891b2',
  Life: '#059669',
};

export default function BlogPage() {
  return (
    <div className="fade-in-up">
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <span className="badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>
          {posts.length} บทความ
        </span>
        <h1 className="section-title gradient-text">✍️ Blog &amp; บันทึก</h1>
        <p style={{ color: '#94a3b8', marginTop: '1.5rem' }}>
          บทความ บันทึกประสบการณ์ และความรู้ที่สะสมระหว่างเส้นทางการเรียนรู้
        </p>
      </div>

      {/* Featured post (first) */}
      <Link href={`/blog/${posts[0].id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ position: 'relative' }}>
            <Image
              src={posts[0].coverImg}
              alt={posts[0].title}
              width={1200}
              height={420}
              style={{ width: '100%', height: '320px', objectFit: 'cover' }}
              priority
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15,15,26,0.95) 30%, transparent 70%)',
            }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 2rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{
                  background: categoryColors[posts[0].category] || '#7c3aed',
                  color: 'white',
                  borderRadius: '6px',
                  padding: '2px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                }}>
                  {posts[0].emoji} {posts[0].category}
                </span>
                <span className="badge">Featured</span>
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white', marginBottom: '0.25rem' }}>
                {posts[0].title}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{posts[0].subtitle}</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.8rem', color: '#64748b' }}>
                <span>📅 {posts[0].date}</span>
                <span>⏱️ {posts[0].readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Other posts grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        {posts.slice(1).map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <Image
                  src={post.coverImg}
                  alt={post.title}
                  width={600}
                  height={240}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  background: categoryColors[post.category] || '#7c3aed',
                  color: 'white',
                  borderRadius: '6px',
                  padding: '2px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                }}>
                  {post.emoji} {post.category}
                </div>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem', lineHeight: 1.4 }}>
                  {post.title}
                </h2>
                <p style={{ fontSize: '0.825rem', color: '#94a3b8', marginBottom: '0.75rem', lineHeight: 1.6 }}>
                  {post.subtitle}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b' }}>
                  <span>📅 {post.date}</span>
                  <span style={{ color: post.accentColor }}>อ่านเพิ่มเติม →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}