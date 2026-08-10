// app/blog/[id]/page.tsx — Blog Post Detail
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next';

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  coverImg: string;
  tags: string[];
  content: { heading?: string; body: string }[];
  accentColor: string;
}

const blogData: Record<string, BlogPost> = {
  'web-development-journey': {
    id: 'web-development-journey',
    title: 'เส้นทางของนักพัฒนาเว็บมือใหม่',
    subtitle: 'จากศูนย์สู่ Full-Stack Developer ใน 1 ปี',
    category: 'Programming',
    date: '15 กรกฎาคม 2568',
    readTime: '8 นาที',
    coverImg: '/blog-webdev.png',
    tags: ['Web Dev', 'Programming', 'Beginner'],
    accentColor: '#a78bfa',
    content: [
      {
        body: 'ย้อนกลับไปเมื่อ 2 ปีที่แล้ว ผมไม่รู้จัก HTML เลยสักบรรทัด แต่วันนี้ผมกำลังเขียน Next.js + TypeScript ในวิชา Web Application Development ที่มหาวิทยาลัย เส้นทางนี้มันไม่ง่ายเลย แต่ก็สนุกและท้าทายมาก',
      },
      {
        heading: '🌱 เริ่มต้นอย่างไร?',
        body: 'ผมเริ่มจาก freeCodeCamp และ YouTube ฟรีๆ ก่อน เรียน HTML, CSS พื้นฐานก่อน จากนั้นค่อยขยับมา JavaScript ใช้เวลาประมาณ 3 เดือนกว่าจะเข้าใจ async/await และ Promise ตอนนั้นรู้สึก "คลิก" มากเลย',
      },
      {
        heading: '⚛️ React เปลี่ยนชีวิต',
        body: 'พอเริ่มเรียน React ทุกอย่างเปลี่ยนไป Concept ของ Component-based ทำให้การเขียน UI มันสนุกและเป็นระบบมากขึ้น คิดว่า React คือจุดเปลี่ยนสำคัญที่สุดในเส้นทางของผม',
      },
      {
        heading: '🔥 Next.js คือ Level Up',
        body: 'ปัจจุบันผมใช้ Next.js 16 ซึ่งมี App Router ที่ทรงพลังมาก Server Components, File-based routing, และ TypeScript ทำให้การพัฒนาเว็บเป็นเรื่องสนุกและมีโครงสร้างมากขึ้นกว่าเดิมมาก',
      },
      {
        heading: '💡 บทเรียนที่ได้',
        body: 'อย่าพยายามเรียนทุกอย่างพร้อมกัน ให้เรียนทีละเรื่องแล้ว Build โปรเจกต์จริง ความผิดพลาดคือครู และอย่ากลัวที่จะ Google หรือถาม ChatGPT — นักพัฒนาทุกคนทำแบบนี้!',
      },
    ],
  },
  'nextjs-app-router': {
    id: 'nextjs-app-router',
    title: 'Next.js App Router ทำความเข้าใจ',
    subtitle: 'สรุป Server Components, Layouts และ Loading States',
    category: 'Tutorial',
    date: '10 กรกฎาคม 2568',
    readTime: '10 นาที',
    coverImg: '/blog-nextjs.png',
    tags: ['Next.js', 'React', 'TypeScript', 'Tutorial'],
    accentColor: '#22d3ee',
    content: [
      {
        body: 'Next.js 16 มาพร้อม App Router ที่เปลี่ยนวิธีคิดการพัฒนาเว็บไปเลย ใน blog นี้ผมจะสรุปสิ่งที่ได้เรียนรู้จากวิชา Web Application Development ที่ม.บูรพา',
      },
      {
        heading: '📁 File-based Routing',
        body: 'ทุกไฟล์ page.tsx ใน folder จะกลายเป็น route โดยอัตโนมัติ เช่น app/about/page.tsx → /about ส่วน [id] ใน folder name คือ Dynamic Segment ที่รับค่าจาก URL ได้',
      },
      {
        heading: '🖥️ Server Components by Default',
        body: 'ใน App Router ทุก Component เป็น Server Component โดย default หมายความว่า code รัน server-side และ HTML ถูกส่งมาเลย ทำให้เร็วและ SEO ดี ถ้าต้องการ interactivity ต้องใช้ "use client" directive',
      },
      {
        heading: '⚡ Async params ใน Next.js 16',
        body: 'จุดสำคัญที่หลายคนพลาด: ใน Next.js 16 params ใน page.tsx เป็น Promise แล้ว ต้อง await มันก่อน:\n\nexport default async function Page({ params }: { params: Promise<{id: string}> }) {\n  const { id } = await params;\n  // ...\n}',
      },
      {
        heading: '🔄 Loading & Error States',
        body: 'App Router มี loading.tsx และ error.tsx built-in ทำให้ง่ายมากในการจัดการ Loading State และ Error Boundary โดยไม่ต้องเขียน try/catch เอง',
      },
    ],
  },
  'university-life': {
    id: 'university-life',
    title: 'ชีวิตนิสิต CS มหาวิทยาลัยบูรพา',
    subtitle: 'เรียน Code ท่ามกลางทะเลและลมชายฝั่ง',
    category: 'Life',
    date: '5 กรกฎาคม 2568',
    readTime: '6 นาที',
    coverImg: '/blog-university.png',
    tags: ['University', 'Life', 'CS Student', 'Burapha'],
    accentColor: '#34d399',
    content: [
      {
        body: 'ม.บูรพา ชลบุรี — มหาวิทยาลัยริมทะเลที่ผมเรียนอยู่ ชีวิตที่นี่มันพิเศษมาก เพราะเราสามารถไปนั่ง Debug โค้ดข้างทะเลได้ตอนเย็น 😄',
      },
      {
        heading: '🎓 หลักสูตร CS ที่บูรพา',
        body: 'หลักสูตรวิทยาการคอมพิวเตอร์ที่นี่ครอบคลุมทั้ง Theory (Algorithms, OS, Networks) และ Practice (Programming, Web Dev, AI) ในปีที่ 3 ได้ลงลึกในวิชาที่ตัวเองชอบมากขึ้น',
      },
      {
        heading: '👥 เพื่อนร่วมทาง',
        body: 'สิ่งที่ดีที่สุดของการเรียน CS คือเพื่อนๆ ที่มีความสนใจเดียวกัน เราช่วยกัน Debug กัน แชร์ความรู้กัน บางทีนั่ง Code ด้วยกันจนดึก แต่ก็สนุกมาก',
      },
      {
        heading: '⚖️ Balance ระหว่างเรียนและงานอดิเรก',
        body: 'ผมเรียนรู้ว่าต้อง Balance ระหว่างการเรียน งานอดิเรก (เล่นเกม ฟังเพลง ดูอนิเมะ) และการพักผ่อน ถ้า Burnout จากการเรียน ประสิทธิภาพจะตกมาก ดังนั้นให้รักตัวเองด้วย',
      },
      {
        heading: '🌅 คำแนะนำสำหรับ Freshman',
        body: 'ถ้าใครเพิ่งเข้ามาเรียน CS: อย่ากลัวที่จะถามอาจารย์, เข้าชมรม IT/Coding, เริ่ม Build โปรเจกต์เล็กๆ ตั้งแต่ปี 1 และที่สำคัญ — สนุกกับมันด้วย!',
      },
    ],
  },
};

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const post = blogData[id];
  if (!post) return { title: 'ไม่พบ Blog' };
  return {
    title: `${post.title} | Blog`,
    description: post.subtitle,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const post = blogData[id];

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <div style={{ fontSize: '4rem' }}>📭</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '1rem 0' }}>ไม่พบ Blog นี้</h1>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>บทความ &ldquo;{id}&rdquo; ไม่มีในระบบ</p>
        <Link href="/blog" className="btn-primary">← กลับไป Blog</Link>
      </div>
    );
  }

  return (
    <article className="fade-in-up">
      {/* Breadcrumb */}
      <div style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
        <Link href="/blog" style={{ color: '#a78bfa', textDecoration: 'none' }}>✍️ Blog</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <span>{post.title}</span>
      </div>

      {/* Cover image */}
      <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '2rem', position: 'relative' }}>
        <Image
          src={post.coverImg}
          alt={post.title}
          width={1200}
          height={500}
          style={{ width: '100%', height: '400px', objectFit: 'cover' }}
          priority
        />
        {/* Category overlay */}
        <div style={{
          position: 'absolute', top: 16, left: 16,
          background: `${post.accentColor}dd`,
          color: '#000',
          borderRadius: '8px',
          padding: '4px 12px',
          fontSize: '0.8rem',
          fontWeight: 700,
        }}>
          {post.category}
        </div>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          {post.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1.2, color: post.accentColor, marginBottom: '0.5rem' }}>
          {post.title}
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '1rem' }}>{post.subtitle}</p>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: '#64748b' }}>
          <span>📅 {post.date}</span>
          <span>⏱️ อ่านประมาณ {post.readTime}</span>
          <span>✍️ ปฐมพร บัวเนี่ยว (ชิน)</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '2rem' }} />

      {/* Content */}
      <div style={{ maxWidth: '720px' }}>
        {post.content.map((section, i) => (
          <div key={i} style={{ marginBottom: '1.75rem' }}>
            {section.heading && (
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: post.accentColor,
                marginBottom: '0.75rem',
              }}>
                {section.heading}
              </h2>
            )}
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.9,
              color: '#cbd5e1',
              whiteSpace: 'pre-wrap',
            }}>
              {section.body}
            </p>
          </div>
        ))}
      </div>

      {/* Footer / back */}
      <div style={{
        marginTop: '3rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Link href="/blog" className="btn-primary">← บทความทั้งหมด</Link>
        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
          เขียนโดย <strong style={{ color: '#2563eb' }}>ปฐมพร บัวเนี่ยว (ชิน)</strong>
        </div>
      </div>
    </article>
  );
}
