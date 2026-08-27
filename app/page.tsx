// app/page.tsx — Home / Profile Page (Supports Light & Dark Theme)
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'หน้าแรก | Portfolio ปฐมพร บัวเนี่ยว',
  description: 'Portfolio ส่วนตัวของ นายปฐมพร บัวเนี่ยว (ชิน) นิสิตมหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง — ธีมสว่างและมืด',
};

const hobbies = [
  {
    id: 'gaming',
    emoji: '🎮',
    title: 'Gaming',
    desc: 'ชอบเล่นเกม RPG และ Strategy เช่น Elden Ring, Stardew Valley',
    img: '/hobby-gaming.png',
    tag: '5+ ปี',
  },
  {
    id: 'music',
    emoji: '🎸',
    title: 'ดนตรี',
    desc: 'เล่นกีตาร์ ฟังเพลงสากล Indie, J-Pop และเพลงป็อปทั่วไป',
    img: '/hobby-music.png',
    tag: 'ดนตรี',
  },
  {
    id: 'anime',
    emoji: '🎌',
    title: 'อนิเมะ & มังงะ',
    desc: 'สะสม Figurine และอ่านมังงะ อนิเมะโปรดคือ Attack on Titan',
    img: '/hobby-anime.png',
    tag: 'นักสะสม',
  },
];

export default function Home() {
  return (
    <div className="fade-in-up">
      {/* ─── Profile Section ─── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '2.5rem',
        alignItems: 'center',
        padding: '1rem 0 2.5rem',
        marginBottom: '2rem',
        borderBottom: '1px solid var(--card-border)',
      }}>
        {/* รูปโปรไฟล์ */}
        <div style={{
          width: 150,
          height: 150,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid var(--pink-pastel)',
          flexShrink: 0,
          background: 'var(--card-bg)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}>
          <Image
            src="/profile.png"
            alt="ปฐมพร บัวเนี่ยว"
            width={150}
            height={150}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            priority
          />
        </div>

        {/* ข้อมูลประจำตัว */}
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge">🎓 นิสิตชั้นปีที่ 3</span>
            <span className="badge">⚡ CS Student</span>
          </div>

          <h1 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            นายปฐมพร <span style={{ color: 'var(--pink-pastel)' }}>บัวเนี่ยว</span>
          </h1>

          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            ชื่อเล่น: <strong style={{ color: 'var(--text-main)' }}>ชิน (Chin)</strong>
            <span style={{ margin: '0 8px', color: 'var(--text-muted)' }}>•</span>
            <span>Full-Stack Developer Enthusiast</span>
          </p>

          {/* Info grid บล็อกข้อความ */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem',
            maxWidth: 540,
          }}>
            {[
              { label: 'รหัสนิสิต', value: '6720210042' },
              { label: 'มหาวิทยาลัย', value: 'มหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง' },
              { label: 'อายุ', value: '21 ปี' },
              { label: 'จังหวัด', value: 'สงขลา' },
            ].map((item) => (
              <div
                key={item.label}
                className="card"
                style={{ padding: '0.75rem 1rem' }}
              >
                <div style={{ color: 'var(--pink-pastel)', fontSize: '0.78rem', fontWeight: 600, marginBottom: '2px' }}>
                  {item.label}
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.925rem', color: 'var(--text-main)' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Goal / Quote / Idol ─── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {/* เป้าหมาย */}
        <div className="card">
          <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--pink-pastel)', marginBottom: '0.5rem' }}>
            🎯 เป้าหมายในชีวิต
          </h2>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--text-body)' }}>
            มุ่งมั่นพัฒนาทักษะสู่การเป็น Full-Stack Developer ที่มีคุณภาพ และสร้างสรรค์ผลงานซอฟต์แวร์หรือ Tech Startup ของตัวเองในอนาคต
          </p>
        </div>

        {/* คติ */}
        <div className="card">
          <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--pink-pastel)', marginBottom: '0.5rem' }}>
            💡 คติประจำใจ
          </h2>
          <blockquote style={{
            fontSize: '0.9rem',
            lineHeight: 1.75,
            color: 'var(--text-main)',
            fontStyle: 'italic',
            borderLeft: '3px solid var(--pink-pastel)',
            paddingLeft: '0.75rem',
          }}>
            &ldquo;Code is like humor. When you have to explain it, it&apos;s bad.&rdquo;
          </blockquote>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>— Cory House</p>
        </div>

        {/* Idol */}
        <div className="card">
          <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--pink-pastel)', marginBottom: '0.5rem' }}>
            🚀 แรงบันดาลใจ (Idol)
          </h2>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--text-body)' }}>
            <strong style={{ color: 'var(--text-main)' }}>Linus Torvalds</strong> — ผู้สร้าง Linux และ Git<br />
            ความมุ่งมั่น ฝึกฝน และความเป็นมืออาชีพระดับสากล
          </p>
        </div>
      </section>

      {/* ─── Hobbies ─── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title">
          งานอดิเรก &amp; ความสนใจ
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          {hobbies.map((h) => (
            <div
              key={h.id}
              className="card"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              <div style={{ position: 'relative' }}>
                <Image
                  src={h.img}
                  alt={h.title}
                  width={400}
                  height={200}
                  style={{ width: '100%', height: '170px', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>{h.emoji}</span> {h.title}
                  </h3>
                  <span className="tag">{h.tag}</span>
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--text-muted)' }}>{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Quick links ─── */}
      <section style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Link href="/courses" className="btn-primary">
          ดูรายวิชาที่เรียน
        </Link>
        <Link href="/blog" className="btn-secondary">
          อ่าน Blog
        </Link>
        <Link href="/about" className="btn-secondary">
          เกี่ยวกับฉัน
        </Link>
        <Link href="/contact" className="btn-secondary">
          ติดต่อเรา
        </Link>
      </section>
    </div>
  );
}
