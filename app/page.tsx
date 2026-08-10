// app/page.tsx — Home / Profile Page
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'หน้าแรก | Portfolio ปฐมพร บัวเนี่ยว',
  description: 'Portfolio ส่วนตัวของ นายปฐมพร บัวเนี่ยว (ชิน) นิสิตมหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง',
};

const hobbies = [
  {
    id: 'gaming',
    emoji: '',
    title: 'Gaming',
    desc: 'ชอบเล่นเกม RPG และ Strategy เกมโปรดคือ Elden Ring, Stardew Valley',
    img: '/hobby-gaming.png',
    tag: 'ยาวนานกว่า 5 ปี',
  },
  {
    id: 'music',
    emoji: '',
    title: 'ดนตรี',
    desc: 'เล่นกีตาร์อะคูสติก ฟังเพลง Indie และ J-Pop ชอบนักร้อง Kenshi Yonezu',
    img: '/hobby-music.png',
    tag: 'ชอบมาก',
  },
  {
    id: 'anime',
    emoji: '🎌',
    title: 'อนิเมะ / มังงะ',
    desc: 'สะสม Figurine และอ่านมังงะ อนิเมะโปรดคือ Attack on Titan และ One Piece',
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
        gap: '2rem',
        alignItems: 'center',
        padding: '2rem 0',
        marginBottom: '2rem',
        borderBottom: '1px solid #e2e8f0',
      }}>
        {/* Profile photo */}
        <div style={{
          width: 160,
          height: 160,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid #bfdbfe',
          flexShrink: 0,
        }}>
          <Image
            src="/profile.png"
            alt="ปฐมพร บัวเนี่ยว"
            width={160}
            height={160}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            priority
          />
        </div>

        {/* Info */}
        <div>
          <span className="badge" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>นิสิตปีที่ 3</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.2rem' }}>
            นายปฐมพร บัวเนี่ยว
          </h1>
          <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '1rem' }}>
            ชื่อเล่น: <strong style={{ color: '#2563eb' }}>ชิน (Chin)</strong>
          </p>

          {/* Info grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.5rem',
            maxWidth: 480,
          }}>
            {[
              { label: 'รหัสนิสิต', value: '6720210042' },
              { label: 'มหาวิทยาลัย', value: 'มหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง' },
              { label: 'อายุ', value: '21 ปี' },
              { label: 'จังหวัด', value: 'สงขลา' },
            ].map((item) => (
              <div key={item.label} className="card" style={{ padding: '0.6rem 0.875rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginBottom: '2px' }}>{item.label}</div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1e293b' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Goal / Quote / Idol ─── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {/* เป้าหมาย */}
        <div className="card">
          <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}></div>
          <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2563eb', marginBottom: '0.4rem' }}>
            เป้าหมายในชีวิต
          </h2>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#475569' }}>
            ต้องการเป็น <strong>Full-Stack Developer</strong> ที่เก่ง
            และอยากเปิด Startup ของตัวเองในอนาคต
          </p>
        </div>

        {/* คติ */}
        <div className="card">
          <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}></div>
          <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#d97706', marginBottom: '0.4rem' }}>
            คติประจำใจ
          </h2>
          <blockquote style={{
            fontStyle: 'italic',
            fontSize: '0.82rem',
            lineHeight: 1.7,
            color: '#92400e',
            borderLeft: '3px solid #fbbf24',
            paddingLeft: '0.6rem',
          }}>
            &ldquo;Code is like humor. When you have to explain it, it&apos;s bad.&rdquo;
          </blockquote>
          <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.4rem' }}>— Cory House</p>
        </div>

        {/* Idol */}
        <div className="card">
          <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}></div>
          <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0891b2', marginBottom: '0.4rem' }}>
            Idol / แรงบันดาลใจ
          </h2>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#475569' }}>
            <strong style={{ color: '#0e7490' }}>Elon Musk</strong> — ความกล้าเปลี่ยนโลก<br />
            <strong style={{ color: '#0e7490' }}>Linus Torvalds</strong> — ผู้สร้าง Linux<br />
            <strong style={{ color: '#0e7490' }}>Kenshi Yonezu</strong> — ศิลปินดนตรีที่ชื่นชอบ
          </p>
        </div>
      </section>

      {/* ─── Hobbies ─── */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>งานอดิเรก &amp; ความสนใจ</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {hobbies.map((h) => (
            <div key={h.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <Image
                src={h.img}
                alt={h.title}
                width={400}
                height={200}
                style={{ width: '100%', height: '160px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <h3 style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1e293b' }}>
                    {h.title}
                  </h3>
                  <span className="tag">{h.tag}</span>
                </div>
                <p style={{ fontSize: '0.8rem', lineHeight: 1.6, color: '#64748b' }}>{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Quick links ─── */}
      <section style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Link href="/courses" className="btn-primary">ดูรายวิชา</Link>
        <Link href="/blog" className="btn-primary" style={{ background: '#0891b2' }}>
          อ่าน Blog
        </Link>
        <Link href="/about" className="btn-primary" style={{ background: '#059669' }}>
          เกี่ยวกับฉัน
        </Link>
      </section>
    </div>
  );
}
