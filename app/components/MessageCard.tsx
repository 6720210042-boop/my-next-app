'use client';
import { useState } from 'react';
import { ContactMessage } from '@/lib/messages';

export default function MessageCard({ m }: { m: ContactMessage }) {
    const [open, setOpen] = useState(false);

    return (
        <div style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            overflow: 'hidden',
        }}>
            {/* Header — คลิกเพื่อหุบ/ขยาย */}
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', padding: '1rem 1.5rem',
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left',
                }}
            >
                <div>
                    <p style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.15rem' }}>
                        {m.name}
                    </p>
                    <p style={{ color: '#2563eb', fontSize: '0.85rem' }}>
                        {m.email}
                    </p>
                </div>
                <span style={{
                    fontSize: '1.1rem',
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease',
                    color: '#94a3b8',
                }}>
                    ▼
                </span>
            </button>

            {/* Body — แสดงเฉพาะเมื่อ open */}
            {open && (
                <div style={{
                    padding: '0 1.5rem 1.25rem',
                    borderTop: '1px solid #f1f5f9',
                }}>
                    <p style={{
                        color: '#475569', lineHeight: 1.6,
                        borderLeft: '3px solid #e2e8f0',
                        paddingLeft: '0.75rem',
                        marginTop: '0.75rem',
                    }}>
                        {m.message}
                    </p>
                </div>
            )}
        </div>
    );
}
