import React from 'react';
import Link from 'next/link';
import PostList from '@/components/post-list';

// Force re-render on each request
export const dynamic = 'force-dynamic';

const TruePage = () => {
  return (
    <main
      id="false"
      className="w-[600px] mx-auto p-12"
    >
      <Link href="/" className="inline-flex items-center gap-1 mb-8 font-mono text-[13px] text-[var(--text-muted)] no-underline tracking-[0.02em]">
        ← back
      </Link>
      <h1 className="text-2xl mb-8">Posts</h1>
      <PostList />
    </main>
  );
};

export default TruePage;
