// app/about/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'เกี่ยวกับฉัน | Portfolio ปฐมพร บัวเนี่ยว',
  description: 'ข้อมูลส่วนตัวของ นายปฐมพร บัวเนี่ยว (ชิน) นิสิตมหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง',
};

const skills = [
  { name: 'JavaScript / TypeScript', level: 75, color: '#f59e0b' },
  { name: 'React / Next.js', level: 70, color: '#3b82f6' },
  { name: 'Python', level: 65, color: '#10b981' },
  { name: 'SQL / PostgreSQL', level: 60, color: '#0ea5e9' },
  { name: 'HTML / CSS', level: 85, color: '#f97316' },
  { name: 'Git / GitHub', level: 70, color: '#6366f1' },
];

export default function AboutPage() {
  return (
    <div className="fade-in-up">
      <h1 className="section-title" style={{ marginBottom: '2rem' }}>👤 เกี่ยวกับฉัน</h1>

      {/* Profile section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2rem', alignItems: 'start', marginBottom: '2.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 140, height: 140,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #bfdbfe',
            margin: '0 auto 0.75rem',
          }}>
            <Image src="/profile.png" alt="ปฐมพร บัวเนี่ยว" width={140} height={140} style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>นายปฐมพร บัวเนี่ยว</div>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>ชิน · 6720210042</div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#2563eb', marginBottom: '0.6rem' }}>เกี่ยวกับตัวเอง</h2>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.85, color: '#475569' }}>
            สวัสดีครับ! ผมชื่อ <strong style={{ color: '#2563eb' }}>ปฐมพร (ชิน)</strong> เป็นนิสิตชั้นปีที่ 3
            มหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง มาจากจังหวัดสงขลา
            ผมสนใจด้านการพัฒนาซอฟต์แวร์และเทคโนโลยีเว็บโดยเฉพาะ
          </p>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.85, color: '#475569', marginTop: '0.6rem' }}>
            ในเวลาว่างชอบเล่นเกม ฟังเพลง J-Pop และดูอนิเมะ
            มีความฝันอยากสร้าง Startup Tech ของตัวเองในอนาคต
          </p>

          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <Link href="/courses" className="btn-primary" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>
              📚 รายวิชา
            </Link>
            <Link href="/blog" className="btn-primary" style={{
              fontSize: '0.82rem', padding: '6px 14px',
              background: '#0891b2',
            }}>
              ✍️ Blog
            </Link>
          </div>
        </div>
      </div>

      {/* Skills */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title" style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>🛠️ ทักษะ</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
          {skills.map((skill) => (
            <div key={skill.name} className="card" style={{ padding: '0.875rem 1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.82rem', color: '#1e293b' }}>{skill.name}</span>
                <span style={{ color: skill.color, fontWeight: 700, fontSize: '0.82rem' }}>{skill.level}%</span>
              </div>
              <div style={{ background: '#f1f5f9', borderRadius: '999px', height: '7px', overflow: 'hidden' }}>
                <div style={{
                  width: `${skill.level}%`,
                  height: '100%',
                  background: skill.color,
                  borderRadius: '999px',
                }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact info */}
      <section>
        <h2 className="section-title" style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>📬 ข้อมูลติดต่อ</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.875rem' }}>
          {[
            { icon: '🎓', label: 'รหัสนิสิต', value: '6720210042' },
            { icon: '🏫', label: 'มหาวิทยาลัย', value: 'ม.ทักษิณ วิทยาเขตพัทลุง' },
            { icon: '🗺️', label: 'จังหวัด', value: 'สงขลา' },
            { icon: '📧', label: 'Email', value: '6720210042@tsu.ac.th' },
            { icon: '🌐', label: 'GitHub', value: 'github.com/chin-dev' },
            { icon: '📱', label: 'LINE', value: '@chin_dev' },
          ].map((item) => (
            <div key={item.label} className="card" style={{ padding: '0.875rem' }}>
              <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{item.icon}</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '3px' }}>{item.label}</div>
              <div style={{ fontWeight: 600, fontSize: '0.825rem', color: '#2563eb' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
