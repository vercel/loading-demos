import React from 'react';
import PostList from '@/components/post-list';

// Force re-render on each request
export const dynamic = 'force-dynamic';

const TruePage = () => {
  return (
    <main
      id="false"
      className="w-[600px] mx-auto p-12"
    >
      <h1 className="text-2xl mb-8">Posts</h1>
      <PostList />
    </main>
  );
};

export default TruePage;
