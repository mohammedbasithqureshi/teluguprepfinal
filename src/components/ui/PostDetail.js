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

    if (trimmed.startsWith('**') && trimmed.includes('**')) {
      const headingMatch = trimmed.match(/^\*\*(.+?)\*\*/);

      if (headingMatch) {
        const headingText = headingMatch[1];

        const rest = trimmed
          .slice(headingMatch[0].length)
          .trim();

        return (
          <div key={i}>
            <h2 className="mt-9 mb-4 border-l-[4px] border-[#ab1738] pl-3 text-xl font-bold text-[#123C69] md:text-2xl">
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
        className="my-5 space-y-2.5 pl-1"
      >
        {lines.map((line, j) => (
          <li
            key={j}
            className="flex items-start gap-3 leading-7 text-gray-700"
          >
            <span className="mt-3 h-2 w-2 shrink-0 bg-[#ab1738]" />

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
    <section className="mb-8 border-[3px] border-[#ab1738] bg-white">
      {/* Header */}
      <div className="border-b-[3px] border-[#ab1738] bg-[#ab1738] px-4 py-2.5">
        <h2 className="text-lg font-bold text-white">
          Important Dates
        </h2>
      </div>

      {/* Dates */}
      <div className="p-4">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {Object.entries(dates).map(([key, value]) => (
            <div
              key={key}
              className="border border-gray-200 bg-gray-50 px-3 py-3"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs font-semibold capitalize text-gray-500">
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
   RELATED POST CARD
------------------------------------------------------- */

function LatestJobCard({ post }) {
  const colors =
    typeColors[post.type] || typeColors.job;

  return (
    <Link
      href={getPostHref(post)}
      className="
        group flex h-full flex-col
        border-[3px]
        border-[#ab1738]
        bg-white
        transition-colors
        duration-200
        hover:bg-[#fffafa]
      "
    >
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
          {typeLabels[post.type] || 'JOB'}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex items-center justify-end">
          {post.state && (
            <span className="max-w-[140px] truncate text-xs text-gray-500">
              {post.state}
            </span>
          )}
        </div>

        <h3 className="line-clamp-3 text-[15px] font-bold leading-6 text-[#0000ee] group-hover:underline">
          {post.title}
        </h3>

        {post.summary && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
            {post.summary}
          </p>
        )}

        <div className="flex-1" />

        <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3">
          <span className="text-xs text-gray-500">
            {formatDate(post.published_at)}
          </span>

          <span className="text-xs font-bold text-[#ab1738] group-hover:underline">
            View Details »
          </span>
        </div>
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
      importantDates = JSON.parse(post.important_dates);
    } else {
      importantDates = post.important_dates;
    }
  } catch {
    importantDates = null;
  }

  const colors =
    typeColors[post.type] || typeColors.job;

  const latestJobs = latestPosts
    .filter((item) => item.id !== post.id)
    .slice(0, 3);

  const mostViewed = mostViewedPosts
    .filter((item) => item.id !== post.id)
    .slice(0, 3);

  return (
    <article className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        {/* ------------------------------------------------
            POST HEADER
        ------------------------------------------------ */}

        <header className="mb-8 border-[3px] border-[#ab1738] bg-white">
          {/* Type */}
          <div
            className={`
              border-b-[3px]
              border-[#ab1738]
              px-4
              py-2
              ${colors.header}
            `}
          >
            <span className="text-xs font-bold tracking-wide text-white">
              {typeLabels[post.type] || post.type}
            </span>
          </div>

          {/* Header Content */}
          <div className="p-5 md:p-6">
            <h1 className="text-2xl font-extrabold leading-tight text-[#123C69] md:text-3xl lg:text-4xl">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-200 pt-4 text-sm text-gray-500">
              <span>
                <strong className="text-gray-700">State:</strong>{' '}
                {post.state || 'All India'}
              </span>

              <span className="hidden text-gray-300 sm:inline">
                |
              </span>

              <span>
                <strong className="text-gray-700">Published:</strong>{' '}
                {formatDate(post.published_at)}
              </span>

              {typeof post.views === 'number' && (
                <>
                  <span className="hidden text-gray-300 sm:inline">
                    |
                  </span>

                  <span>
                    <strong className="text-gray-700">Views:</strong>{' '}
                    {post.views.toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ------------------------------------------------
            IMPORTANT DATES
        ------------------------------------------------ */}

        <ImportantDates dates={importantDates} />

        {/* ------------------------------------------------
            CONTENT
        ------------------------------------------------ */}

        <div className="mx-auto max-w-4xl">
          <div className="prose-content">
            {renderContent(post.content)}
          </div>
        </div>

        {/* ------------------------------------------------
            OFFICIAL WEBSITE
        ------------------------------------------------ */}

        {post.official_link && (
          <div className="mx-auto mt-10 max-w-4xl border-[3px] border-[#123C69] bg-[#f5f8fa] p-5">
            <p className="mb-3 text-sm font-bold text-[#123C69]">
              Official Recruitment Website
            </p>

            <a
              href={post.official_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#ab1738] px-5 py-3 text-sm font-bold text-white hover:bg-[#8f1230]"
            >
              Visit Official Website ↗
            </a>
          </div>
        )}

        {/* ------------------------------------------------
            SHARE
        ------------------------------------------------ */}

        <div className="mx-auto mt-8 max-w-4xl border-t border-gray-200 pt-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-500">
            Share this notification
          </p>

          <ShareButton title={post.title} />
        </div>

        {/* ------------------------------------------------
            DISCLAIMER
        ------------------------------------------------ */}

        <div className="mx-auto mt-8 max-w-4xl border border-yellow-200 bg-yellow-50 p-4">
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
<div className="mx-auto my-8 max-w-4xl">
  <AdSlot
    slot="3333333333"
    label="IN-ARTICLE UNIT"
  />
</div>


        {/* ------------------------------------------------
            LATEST
        ------------------------------------------------ */}

        {latestJobs.length > 0 && (
          <section className="mt-10 border-t-[3px] border-[#ab1738] pt-6">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="border-l-[4px] border-[#ab1738] pl-3 text-xl font-bold text-[#123C69] md:text-2xl">
                  {post.type === 'blog'
                    ? 'Latest Blogs'
                    : 'Latest Jobs'}
                </h2>

                <p className="mt-1 pl-4 text-sm text-gray-500">
                  {post.type === 'blog'
                    ? 'Latest guides and study material.'
                    : 'Latest government job notifications.'}
                </p>
              </div>

              <Link
                href={
                  post.type === 'blog'
                    ? '/blog'
                    : '/jobs'
                }
                className="hidden text-sm font-bold text-[#ab1738] hover:underline sm:block"
              >
                View All »
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {latestJobs.map((item) => (
                <LatestJobCard
                  key={item.id}
                  post={item}
                />
              ))}
            </div>

            <Link
              href={
                post.type === 'blog'
                  ? '/blog'
                  : '/jobs'
              }
              className="mt-5 flex w-full items-center justify-center border-[2px] border-[#ab1738] px-4 py-3 text-sm font-bold text-[#ab1738] hover:bg-[#ab1738] hover:text-white sm:hidden"
            >
              {post.type === 'blog'
                ? 'View All Blogs »'
                : 'View All Jobs »'}
            </Link>
          </section>
        )}

        {/* ------------------------------------------------
            MOST VIEWED
        ------------------------------------------------ */}

        {mostViewed.length > 0 && (
          <section className="mt-10 border-t-[3px] border-[#ab1738] pt-6">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="border-l-[4px] border-[#ab1738] pl-3 text-xl font-bold text-[#123C69] md:text-2xl">
                  Most Viewed
                </h2>

                <p className="mt-1 pl-4 text-sm text-gray-500">
                  Popular guides readers are checking out.
                </p>
              </div>

              <Link
                href="/blog"
                className="hidden text-sm font-bold text-[#ab1738] hover:underline sm:block"
              >
                View All »
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mostViewed.map((item) => (
                <LatestJobCard
                  key={item.id}
                  post={item}
                />
              ))}
            </div>

            <Link
              href="/blog"
              className="mt-5 flex w-full items-center justify-center border-[2px] border-[#ab1738] px-4 py-3 text-sm font-bold text-[#ab1738] hover:bg-[#ab1738] hover:text-white sm:hidden"
            >
              View All Blogs »
            </Link>
          </section>
        )}
      </div>
    </article>
  );
}