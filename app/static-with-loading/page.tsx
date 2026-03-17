import React from 'react';
import Link from 'next/link';

const posts = [
  {
    id: 1,
    title: 'Justo Fringilla Mattis Ornare',
    body: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus...',
  },
  {
    id: 2,
    title: 'Purus Dapibus Mattis',
    body: 'Nullam id dolor id nibh ultricies vehicula ut id elit...',
  },
  {
    id: 3,
    title: 'Egestas Sollicitudin Condimentum Amet Ridiculus',
    body: 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit...',
  },
  {
    id: 4,
    title: 'Bibendum Mattis Pellentesque Purus',
    body: 'Donec id elit non mi porta gravida at eget metus...',
  },
  {
    id: 5,
    title: 'Dolor Ornare Sit',
    body: 'Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes...',
  },
];

const StaticWithLoadingPage = () => {
  return (
    <main
      id="static-with-loading"
      className="w-[600px] mx-auto p-12"
    >
      <Link href="/" className="inline-flex items-center gap-1 mb-8 font-mono text-[13px] text-[var(--text-muted)] no-underline tracking-[0.02em]">
        ← back
      </Link>
      <h1 className="text-2xl mb-8">Posts</h1>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.id}>
            <h2 className="text-xl">{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default StaticWithLoadingPage;
