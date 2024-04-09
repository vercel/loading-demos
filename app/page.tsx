import Link from 'next/link';

export default function Home() {
  return (
    <main
      id="home"
      className="flex min-h-screen flex-col items-center p-24"
    >
      <h1 className="text-2xl mb-8">Loading.js examples</h1>
      <ul className="flex flex-col space-y-2 underline text-blue-400">
        <li>
          <Link href={'/prefetch-default'}>Default prefetching (null)</Link>
        </li>
        <li>
          <Link
            href={'/prefetch-false'}
            prefetch={false}
          >
            Prefetch = false
          </Link>
        </li>
        <li>
          <Link
            href={'/prefetch-true'}
            prefetch={true}
          >
            Prefetch = true
          </Link>
        </li>
      </ul>
    </main>
  );
}
