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
  job: {
    header: 'bg-[#ab1738]',
  },
  result: {
    header: 'bg-[#123C69]',
  },
  admit_card: {
    header: 'bg-[#00897B]',
  },
  answer_key: {
    header: 'bg-[#8a6500]',
  },
  scheme: {
    header: 'bg-[#7b1fa2]',
  },
  blog: {
    header: 'bg-[#d35400]',
  },
};

function timeAgo(dateStr) {
  if (!dateStr) return '';

  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days <= 0) return 'Added today';
  if (days === 1) return '1 day ago';

  return `${days} days ago`;
}

function daysLeft(dateStr) {
  if (!dateStr) return null;

  const diff = new Date(dateStr).getTime() - Date.now();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function PostGrid({
  title,
  posts,
  viewAllHref,
  basePath,
}) {
  if (!posts?.length) return null;

  return (
    <section className="container-page section-gap">
      {/* Section Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-[#ab1738]" />

          <h2 className="text-xl font-bold text-[#123C69] md:text-2xl">
            {title}
          </h2>
        </div>

        <Link
          href={viewAllHref}
          className="whitespace-nowrap text-sm font-bold text-[#ab1738] hover:underline"
        >
          View All »
        </Link>
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => {
          const left = daysLeft(post.application_end);

          const isClosingSoon =
            left !== null && left >= 0 && left <= 7;

          const colors =
            typeColors[post.type] || typeColors.job;

          return (
            <Link
              key={post.id}
              href={`${basePath}/${post.slug}`}
              className="
                group relative
                flex flex-col
                border-[3px]
                border-[#ab1738]
                bg-white
                transition-colors
                duration-200
                hover:bg-[#fffafa]
              "
            >
              {/* Closing Soon */}
              {isClosingSoon && (
                <span
                  className="
                    absolute
                    -right-[3px]
                    -top-[3px]
                    z-10
                    bg-red-600
                    px-2.5
                    py-1
                    text-[10px]
                    font-bold
                    text-white
                  "
                >
                  {left === 0 ? 'LAST DAY' : `${left}d LEFT`}
                </span>
              )}

              {/* Type Header */}
              <div
                className={`
                  border-b-[3px]
                  border-[#ab1738]
                  px-3
                  py-2
                  ${colors.header}
                `}
              >
                <span className="text-[11px] font-bold tracking-wide text-white">
                  {typeLabels[post.type] || post.type}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                <h3
                  className="
                    line-clamp-3
                    text-[15px]
                    font-bold
                    leading-6
                    text-[#0000ee]
                    group-hover:underline
                  "
                >
                  {post.title}
                </h3>

                <div className="flex-1" />

                {/* Meta */}
                <div
                  className="
                    mt-4
                    flex
                    items-center
                    justify-between
                    border-t
                    border-gray-200
                    pt-3
                    text-xs
                  "
                >
                  <span className="font-medium text-gray-600">
                    {post.state || 'All India'}
                  </span>

                  <span className="text-gray-500">
                    {timeAgo(post.published_at)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}