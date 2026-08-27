// app/contact/page.tsx
import ContactForm from '../components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ติดต่อ | Portfolio ปฐมพร บัวเนี่ยว',
  description: 'ส่งข้อความติดต่อ นายปฐมพร บัวเนี่ยว — BLACKPINK Pastel Pink Edition',
};

export default function ContactPage() {
  return (
    <div className="fade-in-up">
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <span className="badge">📬 ส่งข้อความ</span>
        </div>
        <h1 className="section-title">
          <span>✉️</span> ติดต่อเรา
        </h1>
        <p style={{ color: '#9ca3af' }}>
          สามารถส่งข้อความสอบถาม แลกเปลี่ยนความรู้ หรือติดต่องานได้ที่ฟอร์มด้านล่าง
        </p>
      </div>

      <ContactForm />
    </div>
  );
}
