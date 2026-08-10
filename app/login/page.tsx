'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error || 'เข้าสู่ระบบไม่สําเร็จ'); return; }
        router.push('/dashboard');
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-3 max-w-sm p-8">
            <h1 className="text-2xl font-bold mb-4">เข้าสู่ระบบ</h1>
            <input value={email} onChange={(e) => setEmail(e.target.value)}
                type="email" placeholder="อีเมล" className="border p-2 w-full rounded" />
            <input value={password} onChange={(e) => setPassword(e.target.value)}
                type="password" placeholder="รหัสผ่าน" className="border p-2 w-full rounded" />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                เข้าสู่ระบบ
            </button>
        </form>
    );
}