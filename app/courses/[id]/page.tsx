// app/courses/[id]/page.tsx — Course Detail (Clean & Single Color Blocks)
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';

interface CourseDetail {
  id: string;
  nameTH: string;
  nameEN: string;
  credits: number;
  instructor: string;
  department: string;
  category: string;
  semester: string;
  emoji: string;
  gradingPolicy: { item: string; percent: number }[];
  description: string;
  objectives: string[];
  topics: string[];
}

const courseData: Record<string, CourseDetail> = {
  '0214321': {
    id: '0214321',
    nameTH: 'การพัฒนาเว็บแอปพลิเคชัน',
    nameEN: 'Web Application Development',
    credits: 3,
    instructor: 'ผศ.ดร. ประพันธ์ ชลสิทธิ์',
    department: 'ภาควิชาวิทยาการคอมพิวเตอร์',
    category: 'วิชาเอกบังคับ',
    semester: '1/2568',
    emoji: '🌐',
    description:
      'ศึกษาการพัฒนาเว็บแอปพลิเคชันในฝั่ง Client-side และ Server-side โดยใช้เทคโนโลยีสมัยใหม่ ' +
      'ได้แก่ HTML5, CSS3, JavaScript, TypeScript, React และ Next.js รวมถึงการออกแบบ REST API ' +
      'การเชื่อมต่อฐานข้อมูล และการ Deploy แอปพลิเคชันบน Cloud',
    objectives: [
      'เข้าใจสถาปัตยกรรมของเว็บแอปพลิเคชันแบบ Client-Server',
      'พัฒนา UI ด้วย React/Next.js ได้อย่างมีประสิทธิภาพ',
      'ออกแบบและพัฒนา RESTful API',
      'นำ TypeScript มาใช้ในการพัฒนาได้',
      'Deploy แอปพลิเคชันบน Vercel / Railway ได้',
    ],
    topics: [
      'HTML5 & CSS3 พื้นฐาน',
      'JavaScript ES6+ และ TypeScript',
      'React Fundamentals & Hooks',
      'Next.js App Router',
      'State Management',
      'REST API & Fetch',
      'Database Integration',
      'Authentication & Authorization',
      'Cloud Deployment',
    ],
    gradingPolicy: [
      { item: 'การเข้าเรียน & Lab', percent: 10 },
      { item: 'แบบฝึกหัด / Assignment', percent: 20 },
      { item: 'โปรเจกต์กลุ่ม', percent: 30 },
      { item: 'สอบกลางภาค', percent: 20 },
      { item: 'สอบปลายภาค', percent: 20 },
    ],
  },
  '0214302': {
    id: '0214302',
    nameTH: 'ฐานข้อมูลและระบบจัดการข้อมูล',
    nameEN: 'Database and Data Management Systems',
    credits: 3,
    instructor: 'รศ.ดร. วิชาญ ชัยศิริ',
    department: 'ภาควิชาวิทยาการคอมพิวเตอร์',
    category: 'วิชาเอกบังคับ',
    semester: '1/2568',
    emoji: '🗄️',
    description:
      'ศึกษาหลักการออกแบบและจัดการฐานข้อมูลเชิงสัมพันธ์ (Relational Database) ' +
      'การเขียน SQL ระดับสูง การออกแบบ Entity-Relationship (ER Diagram) ' +
      'การ Normalize ฐานข้อมูล ตลอดจน NoSQL Database เบื้องต้น',
    objectives: [
      'ออกแบบฐานข้อมูลด้วย ER Diagram ได้',
      'เขียน SQL ทั้งระดับพื้นฐานและขั้นสูงได้',
      'ทำ Normalization จนถึง 3NF ได้',
      'ใช้งาน PostgreSQL / MySQL ได้',
      'เข้าใจความแตกต่างระหว่าง SQL และ NoSQL',
    ],
    topics: [
      'แนวคิดและสถาปัตยกรรมฐานข้อมูล',
      'ER Model และ ER Diagram',
      'Relational Model',
      'SQL พื้นฐาน (SELECT, INSERT, UPDATE, DELETE)',
      'SQL ขั้นสูง (JOIN, Subquery, Window Functions)',
      'Normalization (1NF, 2NF, 3NF, BCNF)',
      'Transaction และ Concurrency Control',
      'Indexing และ Query Optimization',
      'NoSQL เบื้องต้น (MongoDB)',
    ],
    gradingPolicy: [
      { item: 'Lab & Quiz', percent: 15 },
      { item: 'Assignment', percent: 25 },
      { item: 'โปรเจกต์', percent: 20 },
      { item: 'สอบกลางภาค', percent: 20 },
      { item: 'สอบปลายภาค', percent: 20 },
    ],
  },
  '0214415': {
    id: '0214415',
    nameTH: 'ปัญญาประดิษฐ์และการเรียนรู้ของเครื่อง',
    nameEN: 'Artificial Intelligence and Machine Learning',
    credits: 3,
    instructor: 'ผศ.ดร. สุภาพร วงศ์มาลา',
    department: 'ภาควิชาวิทยาการคอมพิวเตอร์',
    category: 'วิชาเอกเลือก',
    semester: '1/2568',
    emoji: '🤖',
    description:
      'ศึกษาหลักการของปัญญาประดิษฐ์ (AI) และการเรียนรู้ของเครื่อง (Machine Learning) ' +
      'ครอบคลุมอัลกอริทึมการเรียนรู้แบบ Supervised, Unsupervised และ Reinforcement Learning ' +
      'Neural Networks, Deep Learning เบื้องต้น และการประยุกต์ใช้งานด้วย Python/PyTorch',
    objectives: [
      'เข้าใจหลักการพื้นฐานของ AI และ ML',
      'เลือกใช้อัลกอริทึมที่เหมาะสมกับปัญหาได้',
      'พัฒนาโมเดล ML ด้วย Python ได้',
      'ประเมินประสิทธิภาพโมเดลได้',
      'เข้าใจโครงสร้าง Neural Network',
    ],
    topics: [
      'Introduction to AI & ML',
      'Linear Regression & Logistic Regression',
      'Decision Tree & Random Forest',
      'Support Vector Machine (SVM)',
      'Clustering (K-Means, DBSCAN)',
      'Neural Networks & Backpropagation',
      'Convolutional Neural Network (CNN)',
      'Natural Language Processing เบื้องต้น',
      'Model Evaluation & Tuning',
    ],
    gradingPolicy: [
      { item: 'Lab Python & Assignment', percent: 20 },
      { item: 'โปรเจกต์ ML', percent: 30 },
      { item: 'Presentation', percent: 10 },
      { item: 'สอบกลางภาค', percent: 20 },
      { item: 'สอบปลายภาค', percent: 20 },
    ],
  },
  '0214310': {
    id: '0214310',
    nameTH: 'วิศวกรรมซอฟต์แวร์',
    nameEN: 'Software Engineering',
    credits: 3,
    instructor: 'ผศ. ณัฐวุฒิ สมบูรณ์',
    department: 'ภาควิชาวิทยาการคอมพิวเตอร์',
    category: 'วิชาเอกบังคับ',
    semester: '1/2568',
    emoji: '⚙️',
    description:
      'ศึกษากระบวนการพัฒนาซอฟต์แวร์อย่างเป็นระบบ ครอบคลุมการวิเคราะห์ความต้องการ ' +
      'การออกแบบระบบ (UML) การทดสอบซอฟต์แวร์ และการบำรุงรักษา ตลอดจนวิธีการพัฒนา Agile/Scrum',
    objectives: [
      'วิเคราะห์ความต้องการซอฟต์แวร์ได้',
      'เขียน UML Diagram ได้อย่างถูกต้อง',
      'ประยุกต์ใช้ Agile/Scrum ในโปรเจกต์ได้',
      'ออกแบบ Test Cases และทดสอบซอฟต์แวร์ได้',
      'จัดการโปรเจกต์ซอฟต์แวร์เป็นทีมได้',
    ],
    topics: [
      'Software Development Life Cycle (SDLC)',
      'Agile & Scrum Methodology',
      'Requirements Engineering',
      'UML Diagrams (Use Case, Class, Sequence)',
      'Software Architecture & Design Patterns',
      'Software Testing (Unit, Integration, System)',
      'Code Review & Version Control (Git)',
      'Software Maintenance & Evolution',
      'Project Management',
    ],
    gradingPolicy: [
      { item: 'Lab & Quiz', percent: 10 },
      { item: 'Assignment & UML', percent: 20 },
      { item: 'Team Project', percent: 30 },
      { item: 'สอบกลางภาค', percent: 20 },
      { item: 'สอบปลายภาค', percent: 20 },
    ],
  },
  '0214422': {
    id: '0214422',
    nameTH: 'ความมั่นคงปลอดภัยทางไซเบอร์',
    nameEN: 'Cybersecurity',
    credits: 3,
    instructor: 'รศ. กิตติพงษ์ มีสุข',
    department: 'ภาควิชาวิทยาการคอมพิวเตอร์',
    category: 'วิชาเอกเลือก',
    semester: '1/2568',
    emoji: '🔒',
    description:
      'ศึกษาหลักการความมั่นคงปลอดภัยสารสนเทศและไซเบอร์ ครอบคลุมการเข้ารหัส (Cryptography) ' +
      'ความปลอดภัยเครือข่าย การวิเคราะห์ภัยคุกคาม และแนวปฏิบัติ Ethical Hacking เบื้องต้น',
    objectives: [
      'เข้าใจหลักการ CIA Triad และ Security Framework',
      'ใช้ Cryptography ในการรักษาความปลอดภัยได้',
      'วิเคราะห์ภัยคุกคามเบื้องต้นได้',
      'ทำ Penetration Testing เบื้องต้นได้',
      'นำ Best Practice ด้านความปลอดภัยไปใช้ได้',
    ],
    topics: [
      'Security Fundamentals (CIA Triad)',
      'Cryptography (Symmetric & Asymmetric)',
      'Network Security & Firewall',
      'Web Application Security (OWASP Top 10)',
      'Authentication & Authorization',
      'Malware & Threat Analysis',
      'Penetration Testing Basics',
      'Incident Response',
      'Security Compliance & Standards',
    ],
    gradingPolicy: [
      { item: 'Lab & CTF Challenges', percent: 20 },
      { item: 'Assignment', percent: 20 },
      { item: 'Security Audit Project', percent: 20 },
      { item: 'สอบกลางภาค', percent: 20 },
      { item: 'สอบปลายภาค', percent: 20 },
    ],
  },
};

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const course = courseData[id];
  if (!course) return { title: 'ไม่พบวิชา' };
  return {
    title: `${course.nameTH} | Courses`,
    description: course.description.slice(0, 160),
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;
  const c = courseData[id];

  if (!c) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '1rem 0', color: '#ffffff' }}>ไม่พบรายวิชา</h1>
        <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>รหัสวิชา &ldquo;{id}&rdquo; ไม่มีในระบบ</p>
        <Link href="/courses" className="btn-primary">← กลับไปรายวิชา</Link>
      </div>
    );
  }

  return (
    <div className="fade-in-up">
      {/* Breadcrumb */}
      <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: '#9ca3af' }}>
        <Link href="/courses" style={{ color: 'var(--pink-pastel)', textDecoration: 'none' }}>📚 รายวิชา</Link>
        <span style={{ margin: '0 8px', color: '#6b7280' }}>›</span>
        <span style={{ color: '#ffffff' }}>{c.nameTH}</span>
      </div>

      {/* Hero card — บล็อกสีเดียว */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{
            width: 64, height: 64,
            borderRadius: '8px',
            background: 'var(--card-hover-bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.2rem', flexShrink: 0,
          }}>
            {c.emoji}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
              <span className="badge">{c.category}</span>
              <span className="tag">รหัส: {c.id}</span>
              <span className="tag">ภาค {c.semester}</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.25, marginBottom: '0.25rem' }}>
              {c.nameTH}
            </h1>
            <p style={{ color: 'var(--pink-pastel)', fontSize: '1rem' }}>{c.nameEN}</p>
          </div>
        </div>
      </div>

      {/* Info grid — บล็อกสีเดียว */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'รหัสวิชา', value: c.id },
          { label: 'หน่วยกิต', value: `${c.credits} หน่วยกิต` },
          { label: 'ผู้สอน', value: c.instructor },
          { label: 'ภาควิชา', value: c.department },
        ].map((item) => (
          <div key={item.label} className="card" style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--pink-pastel)', marginBottom: '2px' }}>
              {item.label}
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.925rem', color: 'var(--text-main)', lineHeight: 1.3 }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Description + Objectives — บล็อกสีเดียว */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div className="card">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--pink-pastel)' }}>
            คำอธิบายรายวิชา
          </h2>
          <p style={{ fontSize: '0.925rem', lineHeight: 1.85, color: 'var(--text-body)' }}>{c.description}</p>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--pink-pastel)' }}>
            วัตถุประสงค์รายวิชา
          </h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {c.objectives.map((obj, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-body)' }}>
                <span style={{ color: 'var(--pink-pastel)', flexShrink: 0, fontWeight: 'bold' }}>✓</span>
                {obj}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Topics + Grading — บล็อกสีเดียว */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="card">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--pink-pastel)' }}>
            หัวข้อที่สอน
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {c.topics.map((topic, i) => (
              <div key={i} style={{
                background: 'var(--card-hover-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '6px',
                padding: '0.55rem 0.75rem',
                fontSize: '0.85rem',
                color: '#d1d5db',
                display: 'flex',
                gap: '0.5rem',
              }}>
                <span style={{ color: 'var(--pink-pastel)', fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}.</span>
                {topic}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.85rem', color: 'var(--pink-pastel)' }}>
            เกณฑ์การให้คะแนน
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {c.gradingPolicy.map((g) => (
              <div key={g.item}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '3px' }}>
                  <span style={{ color: '#d1d5db' }}>{g.item}</span>
                  <span style={{ color: 'var(--pink-pastel)', fontWeight: 600 }}>{g.percent}%</span>
                </div>
                <div style={{ background: '#20202c', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${g.percent}%`,
                    height: '100%',
                    background: 'var(--pink-pastel)',
                    borderRadius: '999px',
                  }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: '1rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid #1e1e28',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.875rem',
          }}>
            <span style={{ color: '#9ca3af' }}>รวม</span>
            <span style={{ color: 'var(--pink-pastel)', fontWeight: 700 }}>100%</span>
          </div>
        </div>
      </div>

      {/* Back button */}
      <Link href="/courses" className="btn-primary">
        ← กลับไปรายวิชาทั้งหมด
      </Link>
    </div>
  );
}