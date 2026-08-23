import Link from 'next/link';

const typeLabels = {
  job: 'NOTIFICATION',
  result: 'RESULT',
  admit_card: 'ADMIT CARD',
  answer_key: 'ANSWER KEY',
};

const typeColors = {
  job: 'bg-orange-50 text-[var(--color-amber)]',
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

function daysLeft(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days;
}

export default function ListPage({ title, posts, basePath, filterSlot }) {
  return (
    <section className="container-page py-10">
      <h1 className="text-2xl md:text-3xl font-bold border-l-4 border-[var(--color-teal)] pl-3 mb-6">
        {title}
      </h1>

      {filterSlot}

      {posts.length === 0 && (
        <p className="text-gray-500">No entries yet. Check back soon.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
        {posts.map((post) => {
          const left = daysLeft(post.application_end);
          const isClosingSoon = left !== null && left >= 0 && left <= 7;

          return (
            <Link
              key={post.id}
              href={`${basePath}/${post.slug}`}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col relative"
            >
              {isClosingSoon && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md animate-pulse">
                  {left === 0 ? 'LAST DAY' : `${left}d LEFT`}
                </span>
              )}

              <span
                className={`inline-block ${
                  typeColors[post.type] || 'bg-gray-50 text-gray-600'
                } text-xs font-semibold px-2.5 py-1 rounded mb-3 w-fit`}
              >
                {typeLabels[post.type] || post.type}
              </span>

              <h3 className="font-semibold text-lg mb-4 leading-snug">
                {post.title}
              </h3>

              <div className="flex justify-between text-xs text-gray-500 border-t pt-3 mt-auto">
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