// app/courses/page.tsx — Courses listing page
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'รายวิชา | Portfolio ปฐมพร บัวเนี่ยว',
  description: 'รายวิชาที่เรียนในภาคการศึกษาปัจจุบัน มหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง',
};

interface Course {
  id: string;
  nameTH: string;
  nameEN: string;
  credits: number;
  instructor: string;
  category: string;
  color: string;
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
    color: 'rgba(37,99,235,0.05)',
    emoji: '',
    description: 'ศึกษาและพัฒนาเว็บแอปพลิเคชันด้วย React, Next.js และ TypeScript',
  },
  {
    id: '0214302',
    nameTH: 'ฐานข้อมูลและระบบจัดการข้อมูล',
    nameEN: 'Database and Data Management Systems',
    credits: 3,
    instructor: 'รศ.ดร. วิชาญ ชัยศิริ',
    category: 'วิชาเอกบังคับ',
    color: 'rgba(14,165,233,0.06)',
    emoji: '',
    description: 'ออกแบบและจัดการฐานข้อมูลเชิงสัมพันธ์ด้วย SQL, PostgreSQL',
  },
  {
    id: '0214415',
    nameTH: 'ปัญญาประดิษฐ์และการเรียนรู้ของเครื่อง',
    nameEN: 'Artificial Intelligence and Machine Learning',
    credits: 3,
    instructor: 'ผศ.ดร. สุภาพร วงศ์มาลา',
    category: 'วิชาเอกเลือก',
    color: 'rgba(245,158,11,0.06)',
    emoji: '',
    description: 'หลักการของ AI/ML อัลกอริทึมการเรียนรู้ Neural Networks และการประยุกต์ใช้',
  },
  {
    id: '0214310',
    nameTH: 'วิศวกรรมซอฟต์แวร์',
    nameEN: 'Software Engineering',
    credits: 3,
    instructor: 'ผศ. ณัฐวุฒิ สมบูรณ์',
    category: 'วิชาเอกบังคับ',
    color: 'rgba(16,185,129,0.06)',
    emoji: '',
    description: 'กระบวนการพัฒนาซอฟต์แวร์ Agile, UML, การทดสอบ และการบำรุงรักษา',
  },
  {
    id: '0214422',
    nameTH: 'ความมั่นคงปลอดภัยทางไซเบอร์',
    nameEN: 'Cybersecurity',
    credits: 3,
    instructor: 'รศ. กิตติพงษ์ มีสุข',
    category: 'วิชาเอกเลือก',
    color: 'rgba(239,68,68,0.06)',
    emoji: '',
    description: 'หลักการความปลอดภัยไซเบอร์ การเข้ารหัส Network Security และ Ethical Hacking',
  },
];

export default function CoursesPage() {
  return (
    <div className="fade-in-up">
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <span className="badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>ภาคการศึกษาที่ 1/2568</span>
        <h1 className="section-title">รายวิชาที่เรียน</h1>
        <p style={{ color: '#64748b', marginTop: '1.5rem' }}>
          รายวิชาในหลักสูตรวิทยาศาสตรบัณฑิต มหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
        {[
          { label: 'รายวิชาทั้งหมด', value: `${courses.length} วิชา`, emoji: '' },
          { label: 'หน่วยกิตรวม', value: `${courses.reduce((s, c) => s + c.credits, 0)} หน่วยกิต`, emoji: '' },
          { label: 'ชั้นปี', value: 'ปีที่ 3 เทอม 1', emoji: '' },
        ].map((s) => (
          <div key={s.label} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem' }}></div>
            <div style={{ fontWeight: 800, fontSize: '1.4rem', color: '#2563eb' }}>{s.value}</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Course cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              className="card"
              style={{ background: course.color, borderColor: '#e2e8f0', height: '100%' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '2rem' }}></span>
                <span className="badge">{course.category}</span>
              </div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem', lineHeight: 1.4 }}>
                {course.nameTH}
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                {course.nameEN}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1rem' }}>
                {course.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {course.instructor}
                </div>
                <span className="tag">{course.credits} หน่วยกิต</span>
              </div>
              <div style={{
                marginTop: '0.75rem',
                fontSize: '0.8rem',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                รหัสวิชา: <strong>{course.id}</strong>
                <span style={{ marginLeft: 'auto' }}>ดูรายละเอียด →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
