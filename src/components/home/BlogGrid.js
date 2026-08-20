import Link from 'next/link';

const gradients = [
  'from-[var(--color-navy)] to-[var(--color-navy-dark)]',
  'from-orange-500 to-orange-600',
  'from-[var(--color-navy)] to-blue-900',
];

export default function BlogGrid({ title, posts, viewAllHref }) {
  if (!posts?.length) return null;

  return (
    <section className="container-page section-gap">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold border-l-4 border-[var(--color-orange)] pl-3">
          {title}
        </h2>
        <Link href={viewAllHref} className="text-[var(--color-orange)] text-sm font-medium">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
          >
            <div
              className={`h-32 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-end p-4`}
            >
              <span className="text-orange-200 text-sm font-medium">{post.category || 'Guide'}</span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg mb-2 leading-snug">{post.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{post.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}