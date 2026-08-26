import Link from 'next/link';

const typeLabels = {
  job: 'NOTIFICATION',
  blog: 'BLOG',
  result: 'RESULT',
  admit_card: 'ADMIT CARD',
  answer_key: 'ANSWER KEY',
  scheme: 'SCHEME',
};

const typeColors = {
  job: { badge: 'bg-blue-50 text-[#123C69]', dot: 'bg-[#123C69]' },
  result: { badge: 'bg-green-50 text-green-700', dot: 'bg-green-600' },
  admit_card: { badge: 'bg-purple-50 text-purple-700', dot: 'bg-purple-600' },
  answer_key: { badge: 'bg-yellow-50 text-yellow-700', dot: 'bg-yellow-500' },
  scheme: { badge: 'bg-pink-50 text-pink-700', dot: 'bg-pink-500' },
  blog: { badge: 'bg-orange-50 text-orange-700', dot: 'bg-orange-500' },
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Added today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

function daysLeft(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function PostGrid({ title, posts, viewAllHref, basePath }) {
  if (!posts?.length) return null;

  return (
    <section className="container-page section-gap">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="border-l-4 border-[#00897B] pl-3 text-xl font-bold text-[#123C69] md:text-2xl">
          {title}
        </h2>
        <Link href={viewAllHref} className="text-sm font-semibold text-[#00897B] whitespace-nowrap">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {posts.map((post) => {
          const left = daysLeft(post.application_end);
          const isClosingSoon = left !== null && left >= 0 && left <= 7;
          const colors = typeColors[post.type] || typeColors.job;

          return (
            <Link
              key={post.id}
              href={`${basePath}/${post.slug}`}
              className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#00897B] hover:shadow-lg hover:shadow-[#00897B]/10"
            >
              {isClosingSoon && (
                <span className="absolute -top-2 -right-2 animate-pulse rounded-full bg-red-600 px-2 py-1 text-[10px] font-bold text-white shadow-md">
                  {left === 0 ? 'LAST DAY' : `${left}d LEFT`}
                </span>
              )}

              <span className={`mb-3 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${colors.badge}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                {typeLabels[post.type] || post.type}
              </span>

              <h3 className="text-base font-bold leading-6 text-gray-900 transition-colors group-hover:text-[#00897B] line-clamp-3">
                {post.title}
              </h3>

              <div className="flex-1" />

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-400">
                <span>{post.state || 'All India'}</span>
                <span>{timeAgo(post.published_at)}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}