// app/users/page.tsx
interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

async function getUsers(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return res.json();
}

export default async function UsersPage() {
  const users: User[] = await getUsers();
  return (
    <div className="fade-in-up">
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="badge" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>👥 Directory</span>
        <h1 className="section-title">
          <span>📋</span> รายชื่อ Users ({users.length})
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        {users.map((user: User) => (
          <div key={user.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '50%',
              background: 'var(--pink-pastel)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, color: '#ffffff', fontSize: '1rem', flexShrink: 0,
            }}>
              {user.name.charAt(0)}
            </div>
            <div>
              <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '0.95rem' }}>{user.name}</strong>
              <span style={{ color: 'var(--pink-pastel)', fontSize: '0.825rem' }}>{user.email}</span>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>🏢 {user.company.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}