// app/courses/page.tsx — Courses listing page (Clean & Single Color Blocks)
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'รายวิชา | Portfolio ปฐมพร บัวเนี่ยว',
  description: 'รายวิชาที่เรียนในภาคการศึกษาปัจจุบัน มหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง — อ่านง่าย สบายตา',
};

interface Course {
  id: string;
  nameTH: string;
  nameEN: string;
  credits: number;
  instructor: string;
  category: string;
  emoji: string;
  description: string;
}

const courses: Course[] = [
  {
    id: '0214321',
    nameTH: 'การพัฒนาเว็บแอปพลิเคชัน',
    nameEN: 'Web Application Development',
    credits: 3,
    instructor: 'ผศ.ดร. ประพันธ์ ชลสิทธิ์',
    category: 'วิชาเอกบังคับ',
    emoji: '🌐',
    description: 'ศึกษาและพัฒนาเว็บแอปพลิเคชันด้วย React, Next.js และ TypeScript',
  },
  {
    id: '0214302',
    nameTH: 'ฐานข้อมูลและระบบจัดการข้อมูล',
    nameEN: 'Database and Data Management Systems',
    credits: 3,
    instructor: 'รศ.ดร. วิชาญ ชัยศิริ',
    category: 'วิชาเอกบังคับ',
    emoji: '🗄️',
    description: 'ออกแบบและจัดการฐานข้อมูลเชิงสัมพันธ์ด้วย SQL, PostgreSQL',
  },
  {
    id: '0214415',
    nameTH: 'ปัญญาประดิษฐ์และการเรียนรู้ของเครื่อง',
    nameEN: 'Artificial Intelligence and Machine Learning',
    credits: 3,
    instructor: 'ผศ.ดร. สุภาพร วงศ์มาลา',
    category: 'วิชาเอกเลือก',
    emoji: '🤖',
    description: 'หลักการของ AI/ML อัลกอริทึมการเรียนรู้ Neural Networks และการประยุกต์ใช้',
  },
  {
    id: '0214310',
    nameTH: 'วิศวกรรมซอฟต์แวร์',
    nameEN: 'Software Engineering',
    credits: 3,
    instructor: 'ผศ. ณัฐวุฒิ สมบูรณ์',
    category: 'วิชาเอกบังคับ',
    emoji: '⚙️',
    description: 'กระบวนการพัฒนาซอฟต์แวร์ Agile, UML, การทดสอบ และการบำรุงรักษา',
  },
  {
    id: '0214422',
    nameTH: 'ความมั่นคงปลอดภัยทางไซเบอร์',
    nameEN: 'Cybersecurity',
    credits: 3,
    instructor: 'รศ. กิตติพงษ์ มีสุข',
    category: 'วิชาเอกเลือก',
    emoji: '🔒',
    description: 'หลักการความปลอดภัยไซเบอร์ การเข้ารหัส Network Security และ Ethical Hacking',
  },
];

export default function CoursesPage() {
  return (
    <div className="fade-in-up">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <span className="badge">ภาคการศึกษาที่ 1/2568</span>
          <span className="badge">หลักสูตร CS ว.พัทลุง</span>
        </div>
        <h1 className="section-title">
          <span>📚</span> รายวิชาที่เรียน
        </h1>
        <p style={{ color: '#9ca3af' }}>
          รายวิชาในหลักสูตรวิทยาศาสตรบัณฑิต มหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง
        </p>
      </div>

      {/* Stats — บล็อกสีเดียว */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
        {[
          { label: 'รายวิชาทั้งหมด', value: `${courses.length} วิชา`, emoji: '📖' },
          { label: 'หน่วยกิตรวม', value: `${courses.reduce((s, c) => s + c.credits, 0)} หน่วยกิต`, emoji: '⭐' },
          { label: 'ชั้นปี', value: 'ปีที่ 3 เทอม 1', emoji: '🎓' },
        ].map((s) => (
          <div
            key={s.label}
            className="card"
            style={{ textAlign: 'center', padding: '1.25rem' }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>{s.emoji}</div>
            <div style={{ fontWeight: 700, fontSize: '1.35rem', color: 'var(--pink-pastel)' }}>{s.value}</div>
            <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Course cards grid — บล็อกสีเดียว */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              className="card"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '1.75rem' }}>{course.emoji}</span>
                <span className="badge">
                  {course.category}
                </span>
              </div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem', lineHeight: 1.4 }}>
                {course.nameTH}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--pink-pastel)', marginBottom: '0.6rem', fontWeight: 500 }}>
                {course.nameEN}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem', flex: 1 }}>
                {course.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.6rem', borderTop: '1px solid var(--card-border)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  👨‍🏫 {course.instructor}
                </div>
                <span className="tag">{course.credits} หน่วยกิต</span>
              </div>
              <div style={{
                marginTop: '0.6rem',
                fontSize: '0.85rem',
                color: 'var(--pink-pastel)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 500,
              }}>
                รหัส: <strong style={{ color: 'var(--text-main)' }}>{course.id}</strong>
                <span style={{ marginLeft: 'auto' }}>ดูรายละเอียด →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
