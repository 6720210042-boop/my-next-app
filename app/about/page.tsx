// app/about/page.tsx — About Page (Light & Dark Theme Adaptive)
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'เกี่ยวกับฉัน | Portfolio ปฐมพร บัวเนี่ยว',
  description: 'ข้อมูลส่วนตัวของ นายปฐมพร บัวเนี่ยว (ชิน) นิสิตมหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง — ธีมสว่างและมืด',
};

const skills = [
  { name: 'HTML / CSS', level: 85 },
  { name: 'JavaScript / TypeScript', level: 75 },
  { name: 'React / Next.js', level: 70 },
  { name: 'Git / GitHub', level: 70 },
  { name: 'Python', level: 65 },
  { name: 'SQL / PostgreSQL', level: 60 },
];

export default function AboutPage() {
  return (
    <div className="fade-in-up">
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="section-title">
          <span>👤</span> เกี่ยวกับฉัน
        </h1>
      </div>

      {/* Profile section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2.5rem', alignItems: 'start', marginBottom: '2.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 145, height: 145,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid var(--pink-pastel)',
            margin: '0 auto 0.75rem',
            background: 'var(--card-bg)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}>
            <Image src="/profile.png" alt="ปฐมพร บัวเนี่ยว" width={145} height={145} style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-main)' }}>นายปฐมพร บัวเนี่ยว</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--pink-pastel)', fontWeight: 600 }}>ชิน · 6720210042</div>
        </div>

        {/* ข้อมูลส่วนตัว — บล็อกสีเดียว */}
        <div className="card">
          <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--pink-pastel)', marginBottom: '0.75rem' }}>
            ข้อมูลส่วนตัวและตัวตน
          </h2>
          <p style={{ fontSize: '0.925rem', lineHeight: 1.85, color: 'var(--text-body)' }}>
            สวัสดีครับ! ผมชื่อ <strong style={{ color: 'var(--text-main)' }}>ปฐมพร (ชิน)</strong> เป็นนิสิตชั้นปีที่ 3
            มหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง มาจากจังหวัดสงขลา
            ผมสนใจด้านการพัฒนาซอฟต์แวร์และเทคโนโลยีเว็บโดยเฉพาะ
          </p>
          <p style={{ fontSize: '0.925rem', lineHeight: 1.85, color: 'var(--text-muted)', marginTop: '0.6rem' }}>
            ในเวลาว่างชอบฟังเพลง เล่นเกม และดูอนิเมะ
            มีความฝันอยากสร้าง Startup Tech ของตัวเองในอนาคต
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <Link href="/courses" className="btn-primary" style={{ fontSize: '0.875rem', padding: '7px 18px' }}>
              รายวิชาที่เรียน
            </Link>
            <Link href="/blog" className="btn-secondary" style={{ fontSize: '0.875rem', padding: '7px 18px' }}>
              อ่าน Blog
            </Link>
          </div>
        </div>
      </div>

      {/* Skills — บล็อกสีเดียว */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title" style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>
          ทักษะความสามารถ (Tech Stack)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {skills.map((skill) => (
            <div key={skill.name} className="card" style={{ padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-main)' }}>{skill.name}</span>
                <span style={{ color: 'var(--pink-pastel)', fontWeight: 600, fontSize: '0.9rem' }}>{skill.level}%</span>
              </div>
              <div style={{ background: 'var(--card-border)', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
                <div style={{
                  width: `${skill.level}%`,
                  height: '100%',
                  background: 'var(--pink-pastel)',
                  borderRadius: '999px',
                }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact info — บล็อกสีเดียว */}
      <section>
        <h2 className="section-title" style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>
          ช่องทางการติดต่อ
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[
            { label: 'รหัสนิสิต', value: '6720210042', icon: '🎓' },
            { label: 'มหาวิทยาลัย', value: 'ม.ทักษิณ วิทยาเขตพัทลุง', icon: '🏫' },
            { label: 'จังหวัด', value: 'สงขลา', icon: '🗺️' },
            { label: 'Email', value: '6720210042@tsu.ac.th', icon: '📧' },
            { label: 'GitHub', value: 'github.com/chin-dev', icon: '🌐' },
            { label: 'LINE', value: '@chin_dev', icon: '📱' },
          ].map((item) => (
            <div key={item.label} className="card" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>{item.icon}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--pink-pastel)', fontWeight: 600, marginBottom: '2px' }}>
                {item.label}
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.925rem', color: 'var(--text-main)' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
