import Link from 'next/link';

const typeLabels = {
  job: 'NOTIFICATION',
  blog: 'BLOG',
  result: 'RESULT',
  admit_card: 'ADMIT CARD',
  answer_key: 'ANSWER KEY',
};

const typeColors = {
  job: 'bg-orange-50 text-[var(--color-orange)]',
  blog: 'bg-blue-50 text-blue-600',
  result: 'bg-green-50 text-green-700',
  admit_card: 'bg-blue-50 text-blue-700',
  answer_key: 'bg-purple-50 text-purple-700',
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Added today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

export default function PostGrid({ title, posts, viewAllHref, basePath }) {
  if (!posts?.length) return null;

  return (
    <section className="container-page section-gap">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold border-l-4 border-[var(--color-orange)] pl-3">
          {title}
        </h2>
        <Link href={viewAllHref} className="text-[var(--color-orange)] text-sm font-medium whitespace-nowrap">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`${basePath}/${post.slug}`}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col"
          >
            <span
              className={`inline-block ${typeColors[post.type] || 'bg-gray-50 text-gray-600'} text-xs font-semibold px-2.5 py-1 rounded mb-3 w-fit`}
            >
              {typeLabels[post.type] || post.type}
            </span>
            <h3 className="font-semibold text-lg mb-4 leading-snug">{post.title}</h3>
            <div className="flex justify-between text-xs text-gray-500 border-t pt-3 mt-auto">
              <span>{post.state || 'All India'}</span>
              <span>{timeAgo(post.published_at)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}