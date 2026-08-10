// components/LikeButton.tsx
'use client'; // ← ต้องวางบรรทัดแรกเสมอ
import { useState } from 'react';
// TypeScript: กำ หนด type ให้ props
interface LikeButtonProps {
    postId: number;
}
export default function LikeButton({ postId }: LikeButtonProps) {
    // ✨ useState<T> — TypeScript รู้ type ของ state
    const [liked, setLiked] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const handleLike = (): void => {
        setLiked((prev: boolean) => !prev);
        setCount((prev: number) => prev + (liked ? -1 : 1));
    };
    return (
        <button
            onClick={handleLike}
            className={`px-4 py-2 rounded-full ${liked ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
        >
            {liked ? 'Like' : 'Like'} {count}
        </button>
    );
}
// ใช้:ช้ <LikeButton postId={post.id} />