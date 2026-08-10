import { connection } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMessages } from '@/lib/messages';
import LogoutButton from '../components/LogoutButton';
import MessageCard from '../components/MessageCard';

export default async function DashboardPage() {
  await connection(); // บังคับให้ render ใหม่ทุกครั้ง ไม่ cache

  // ถ้าไม่มี session ให้ redirect ไปหน้า login
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (!session) {
    redirect('/login');
  }

  const messages = getMessages();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard (ต้อง Login ก่อน)</h1>
      <p className="mb-4">จำนวนข้อความที่ได้รับ: <strong>{messages.length}</strong></p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '640px' }}>
        {messages.length === 0 && (
          <p style={{ color: '#94a3b8' }}>ยังไม่มีข้อความ</p>
        )}
        {messages.map((m) => (
          <MessageCard key={m.id} m={m} />
        ))}
      </div>
      <LogoutButton />
    </main>
  );
}
