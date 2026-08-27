import { connection } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { listMessagesWithComments } from '@/lib/commentService';
import { findUserById } from '@/lib/users';
import LogoutButton from '../components/LogoutButton';
import MessageCard from '../components/MessageCard';

export default async function DashboardPage() {
  await connection();

  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (!session) {
    redirect('/login');
  }

  const user = await findUserById(session.value);
  const isSiteOwner = user?.email?.toLowerCase() === '6720210042@tsu.ac.th';
  const messages = await listMessagesWithComments();

  return (
    <div className="fade-in-up">
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          {isSiteOwner ? (
            <span className="badge" style={{ background: '#4a1c38', borderColor: 'var(--pink-pastel)', color: '#ffffff' }}>
              👑 เจ้าของเว็บไซต์ (Site Owner)
            </span>
          ) : (
            <span className="badge" style={{ display: 'inline-flex' }}>
              👤 สมาชิกผู้ใช้งาน (Member)
            </span>
          )}
          {user?.email && (
            <span className="tag" style={{ color: 'var(--pink-pastel)' }}>
              อีเมล: {user.email}
            </span>
          )}
        </div>
        <h1 className="section-title">
          <span>📊</span> Dashboard ข้อความ &amp; กระดานพูดคุย
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          {isSiteOwner
            ? 'ยินดีต้อนรับคุณชิน (เจ้าของเว็บไซต์) คุณสามารถอ่านข้อความที่ส่งเข้ามา และตอบกลับคอมเมนต์ได้ทุกหัวข้อ'
            : 'ยินดีต้อนรับ! คุณสามารถส่งคอมเมนต์พูดคุยกับเจ้าของเว็บไซต์ และจัดการแก้ไข/ลบคอมเมนต์ของตนเองได้'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '720px' }}>
        {messages.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📭</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>ยังไม่มีข้อความติดต่อเข้ามาในระบบ</p>
          </div>
        )}
        {messages.map((m) => (
          <MessageCard
            key={m.id}
            m={m as any}
            currentUserId={session.value}
            currentUserEmail={user?.email}
          />
        ))}
      </div>

      <LogoutButton />
    </div>
  );
}
