import Link from 'next/link';

import AdSlot from '@/components/home/AdSlot';
import ShareButton from '@/components/ui/ShareButton';

const typeLabels = {
  job: 'NOTIFICATION',
  result: 'RESULT',
  admit_card: 'ADMIT CARD',
  answer_key: 'ANSWER KEY',
  scheme: 'SCHEME',
  blog: 'BLOG',
};

const typeColors = {
  job: {
    badge: 'bg-blue-50 text-[#123C69]',
    dot: 'bg-[#123C69]',
  },
  result: {
    badge: 'bg-green-50 text-green-700',
    dot: 'bg-green-600',
  },
  admit_card: {
    badge: 'bg-purple-50 text-purple-700',
    dot: 'bg-purple-600',
  },
  answer_key: {
    badge: 'bg-yellow-50 text-yellow-700',
    dot: 'bg-yellow-500',
  },
  scheme: {
    badge: 'bg-pink-50 text-pink-700',
    dot: 'bg-pink-500',
  },
  blog: {
    badge: 'bg-orange-50 text-orange-700',
    dot: 'bg-orange-500',
  },
};

function formatDate(dateStr) {
  if (!dateStr) return '';

  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

function getPostHref(post) {
  const typePath = {
    job: 'jobs',
    result: 'results',
    admit_card: 'admit-card',
    answer_key: 'answer-key',
    scheme: 'schemes',
    blog: 'blog',
  };

  return `/${typePath[post.type] || 'jobs'}/${post.slug}`;
}

/* -------------------------------------------------------
   CONTENT RENDERING
------------------------------------------------------- */

function renderContent(content) {
  if (!content) return null;

  const blocks = content
    .split(/\n\s*\n/)
    .filter((block) => block.trim());

  return blocks.map((block, i) => {
    const trimmed = block.trim();

    /*
      Heading format:

      **Important Dates**
    */

    if (trimmed.startsWith('**') && trimmed.includes('**')) {
      const headingMatch = trimmed.match(/^\*\*(.+?)\*\*/);

      if (headingMatch) {
        const headingText = headingMatch[1];

        const rest = trimmed
          .slice(headingMatch[0].length)
          .trim();

        return (
          <div key={i}>
            <h2 className="mt-10 mb-4 border-l-4 border-[#00897B] pl-3 text-xl font-bold text-[#123C69] md:text-2xl">
              {headingText}
            </h2>

            {rest && renderBlockBody(rest, i)}
          </div>
        );
      }
    }

    return renderBlockBody(trimmed, i);
  });
}

function renderBlockBody(text, key) {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const isBulletList =
    lines.length > 0 &&
    lines.every((line) => line.startsWith('- '));

  if (isBulletList) {
    return (
      <ul
        key={`ul-${key}`}
        className="my-5 space-y-3 pl-1"
      >
        {lines.map((line, j) => (
          <li
            key={j}
            className="flex items-start gap-3 leading-7 text-gray-700"
          >
            <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#00897B]" />

            <span>
              {line.replace(/^- /, '')}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p
      key={`p-${key}`}
      className="mb-5 leading-8 text-gray-700"
    >
      {text}
    </p>
  );
}

/* -------------------------------------------------------
   IMPORTANT DATES
------------------------------------------------------- */

function ImportantDates({ dates }) {
  if (!dates || typeof dates !== 'object') {
    return null;
  }

  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-[#D9E4EC] bg-white shadow-sm">
      {/* Header */}
      <div className="bg-[#123C69] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
            <svg
              className="h-5 w-5 text-[#FFB300]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect
                width="18"
                height="18"
                x="3"
                y="4"
                rx="2"
              />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>

          <div>
            <h2 className="font-bold text-white">
              Important Dates
            </h2>

            <p className="text-xs text-blue-100">
              Keep track of application deadlines
            </p>
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Object.entries(dates).map(([key, value]) => (
            <div
              key={key}
              className="rounded-xl border border-gray-100 bg-gray-50 p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-medium capitalize text-gray-500">
                  {key.replace(/_/g, ' ')}
                </span>

                <span className="text-sm font-bold text-[#123C69]">
                  {String(value)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   RELATED POST CARD (used for both Latest Jobs and Most Viewed)
------------------------------------------------------- */

function LatestJobCard({ post }) {
  const colors =
    typeColors[post.type] || typeColors.job;

  return (
    <Link
      href={getPostHref(post)}
      className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#00897B] hover:shadow-lg hover:shadow-[#00897B]/10"
    >
      {/* Badge */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${colors.badge}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${colors.dot}`}
          />

          {typeLabels[post.type] || 'JOB'}
        </span>

        {post.state && (
          <span className="max-w-[120px] truncate text-xs text-gray-400">
            {post.state}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="line-clamp-3 text-base font-bold leading-6 text-gray-900 transition-colors group-hover:text-[#00897B]">
        {post.title}
      </h3>

      {/* Summary */}
      {post.summary && (
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {post.summary}
        </p>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-xs text-gray-400">
          {formatDate(post.published_at)}
        </span>

        <span className="text-xs font-bold text-[#00897B] transition-transform group-hover:translate-x-1">
          View Details →
        </span>
      </div>
    </Link>
  );
}

/* -------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------- */

export default function PostDetail({
  post,
  latestPosts = [],
  mostViewedPosts = [],
}) {
  if (!post) return null;

  /* Safely parse important_dates */
  let importantDates = null;

  try {
    if (typeof post.important_dates === 'string') {
      importantDates = JSON.parse(
        post.important_dates
      );
    } else {
      importantDates = post.important_dates;
    }
  } catch {
    importantDates = null;
  }

  const colors =
    typeColors[post.type] || typeColors.job;

  /*
    Remove current post from latest posts
    and only show 3.
  */
  const latestJobs = latestPosts
    .filter((item) => item.id !== post.id)
    .slice(0, 3);

  /*
    Remove current post from most-viewed posts
    and only show 3.
  */
  const mostViewed = mostViewedPosts
    .filter((item) => item.id !== post.id)
    .slice(0, 3);

  return (
    <article className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* ------------------------------------------------
            POST HEADER
        ------------------------------------------------ */}

        <header className="mb-8">
          {/* Type Badge */}
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold tracking-wide ${colors.badge}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${colors.dot}`}
            />

            {typeLabels[post.type] || post.type}
          </span>

          {/* Title */}
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#123C69] md:text-4xl lg:text-[42px]">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-200 pb-6 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-[#00897B]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
                />
                <circle cx="12" cy="9" r="2.5" />
              </svg>

              {post.state || 'All India'}
            </span>

            <span className="hidden text-gray-300 sm:inline">
              •
            </span>

            <span>
              Published {formatDate(post.published_at)}
            </span>

            {typeof post.views === 'number' && (
              <>
                <span className="hidden text-gray-300 sm:inline">
                  •
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    className="h-4 w-4 text-[#00897B]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"
                    />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {post.views.toLocaleString('en-IN')} views
                </span>
              </>
            )}
          </div>
        </header>

        {/* ------------------------------------------------
            IMPORTANT DATES
        ------------------------------------------------ */}

        <ImportantDates dates={importantDates} />

        {/* ------------------------------------------------
            CONTENT
        ------------------------------------------------ */}

        <div className="prose-content">
          {renderContent(post.content)}
        </div>

        {/* ------------------------------------------------
            OFFICIAL WEBSITE
        ------------------------------------------------ */}

        {post.official_link && (
          <div className="mt-10 rounded-2xl border border-[#D9E4EC] bg-gradient-to-r from-[#F0F6FA] to-[#EAF8F6] p-5">
            <p className="mb-3 text-sm font-semibold text-gray-700">
              Official Recruitment Website
            </p>

            <a
              href={post.official_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00897B] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#00897B]/20 transition hover:bg-[#00796B] hover:shadow-lg"
            >
              Visit Official Website
              <span>↗</span>
            </a>
          </div>
        )}

        {/* ------------------------------------------------
            SHARE
        ------------------------------------------------ */}

        <div className="mt-8 border-t border-gray-100 pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Share this notification
          </p>

          <ShareButton title={post.title} />
        </div>

        {/* ------------------------------------------------
            DISCLAIMER
        ------------------------------------------------ */}

        <div className="mt-8 rounded-xl border border-yellow-100 bg-yellow-50 p-4">
          <p className="text-xs leading-5 text-yellow-800">
            <strong>Disclaimer:</strong> This information is
            compiled from official sources for informational
            purposes. Candidates should verify all details,
            eligibility requirements, dates and application
            instructions on the official website before
            applying.
          </p>
        </div>

        {/* ------------------------------------------------
            AD
        ------------------------------------------------ */}

        <div className="my-8">
          <AdSlot
            slot="3333333333"
            label="IN-ARTICLE UNIT"
          />
        </div>

        {/* ------------------------------------------------
            LATEST (JOBS OR BLOGS, DEPENDING ON POST TYPE)
        ------------------------------------------------ */}

        {latestJobs.length > 0 && (
          <section className="mt-10 border-t border-gray-200 pt-8">
            {/* Section Header */}
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1 w-8 rounded-full bg-[#00897B]" />

                  <span className="text-xs font-bold uppercase tracking-wider text-[#00897B]">
                    Latest Updates
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-[#123C69]">
                  {post.type === 'blog' ? 'Latest Blogs' : 'Latest Jobs'}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {post.type === 'blog'
                    ? 'Check out the latest guides and study material.'
                    : 'Check out the latest government job notifications.'}
                </p>
              </div>

              <Link
                href={post.type === 'blog' ? '/blog' : '/jobs'}
                className="hidden shrink-0 rounded-lg px-3 py-2 text-sm font-bold text-[#00897B] transition hover:bg-[#EAF8F6] sm:block"
              >
                View All →
              </Link>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {latestJobs.map((item) => (
                <LatestJobCard
                  key={item.id}
                  post={item}
                />
              ))}
            </div>

            {/* Mobile View All */}
            <Link
              href={post.type === 'blog' ? '/blog' : '/jobs'}
              className="mt-5 flex w-full items-center justify-center rounded-xl border border-[#D9E4EC] bg-white px-4 py-3 text-sm font-bold text-[#00897B] transition hover:border-[#00897B] hover:bg-[#EAF8F6] sm:hidden"
            >
              {post.type === 'blog' ? 'View All Blogs →' : 'View All Jobs →'}
            </Link>
          </section>
        )}

        {/* ------------------------------------------------
            MOST VIEWED (only rendered when data is passed, e.g. blog pages)
        ------------------------------------------------ */}

        {mostViewed.length > 0 && (
          <section className="mt-10 border-t border-gray-200 pt-8">
            {/* Section Header */}
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1 w-8 rounded-full bg-orange-500" />

                  <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                    Trending
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-[#123C69]">
                  Most Viewed
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Popular guides readers are checking out.
                </p>
              </div>

              <Link
                href="/blog"
                className="hidden shrink-0 rounded-lg px-3 py-2 text-sm font-bold text-[#00897B] transition hover:bg-[#EAF8F6] sm:block"
              >
                View All →
              </Link>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mostViewed.map((item) => (
                <LatestJobCard
                  key={item.id}
                  post={item}
                />
              ))}
            </div>

            {/* Mobile View All */}
            <Link
              href="/blog"
              className="mt-5 flex w-full items-center justify-center rounded-xl border border-[#D9E4EC] bg-white px-4 py-3 text-sm font-bold text-[#00897B] transition hover:border-[#00897B] hover:bg-[#EAF8F6] sm:hidden"
            >
              View All Blogs →
            </Link>
          </section>
        )}
      </div>
    </article>
  );
}