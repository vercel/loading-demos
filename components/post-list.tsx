import { getPosts } from '@/api/getPosts';
import React from 'react';

export const PostList = async () => {
  const posts = await getPosts();

  return (
    <ul className="space-y-4">
      {posts.map(post => (
        <li key={post.id}>
          <h2 className="text-xl">{post.title}</h2>
          <p>{post.body.split(' ').slice(0, 10).join(' ')}...</p>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
