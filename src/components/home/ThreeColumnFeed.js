import Link from 'next/link';

function getDaysLeftLabel(dateStr) {
  if (!dateStr) return null;

  const diff = new Date(dateStr).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days < 0) {
    return {
      text: 'Date Over',
      color: 'text-gray-400',
    };
  }

  if (days === 0) {
    return {
      text: 'Last Day',
      color: 'text-red-600 font-bold',
    };
  }

  if (days <= 3) {
    return {
      text: `${days}d left`,
      color: 'text-red-600 font-bold',
    };
  }

  if (days <= 7) {
    return {
      text: `${days}d left`,
      color: 'text-orange-600 font-semibold',
    };
  }

  return {
    text: `${days}d left`,
    color: 'text-gray-500',
  };
}

function ColumnCard({
  title,
  posts,
  basePath,
  headerColor,
}) {
  return (
    <div className="border-[3px] border-[#ab1738] bg-white flex flex-col font-sans min-w-0">

      {/* Header */}
      <div
        className={`${headerColor} py-1.5 px-1 text-center border-b-[3px] border-[#ab1738]`}
      >
        <h3 className="text-white font-bold text-xs sm:text-sm md:text-2xl tracking-wide leading-tight">
          {title}
        </h3>
      </div>

      {/* List Container */}
      <div className="p-1.5 sm:p-2 md:p-3 border-2 md:border-4 border-white flex-1 flex flex-col justify-between">

        <ul className="list-disc list-inside space-y-2 md:space-y-3.5 text-xs md:text-sm text-[#0000ee] break-words">

          {posts.length === 0 && (
            <li className="text-gray-500 list-none">
              No entries yet.
            </li>
          )}

          {posts.map((post) => {
            const dayLabel = getDaysLeftLabel(
              post.application_end
            );

            return (
              <li
                key={post.id}
                className="marker:text-black leading-snug"
              >
                <Link
                  href={`${basePath}/${post.slug}`}
                  className="font-bold hover:underline leading-snug text-xs md:text-[15px]"
                >
                  {post.title}
                </Link>

                {dayLabel && (
                  <span
                    className={`ml-1 md:ml-2 text-[10px] md:text-xs whitespace-nowrap ${dayLabel.color}`}
                  >
                    ({dayLabel.text})
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        {/* View More */}
        <div className="text-right pt-3 md:pt-4">
          <Link
            href={basePath}
            className="text-[10px] md:text-xs font-bold text-gray-700 hover:underline whitespace-nowrap"
          >
            View More »
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function ThreeColumnFeed({
  results = [],
  admitCards = [],
  jobs = [],
}) {
  return (
    <section className="container mx-auto px-2 sm:px-4 py-6 md:py-8">

      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3">

        {/* Central Level Job */}
        <ColumnCard
          title="Central  Jobs  Notification"
          posts={jobs}
          basePath="/jobs"
          headerColor="bg-[#00897B]"
        />

        {/* Central Level Result */}
        <ColumnCard
          title="Central Level Result cards"
          posts={results}
          basePath="/results"
          headerColor="bg-[#00897B]"
        />

        {/* Central Level Admit Card */}
        <ColumnCard
          title="Central Level Admit Cards"
          posts={admitCards}
          basePath="/admit-card"
          headerColor="bg-[#00897B]"
        />

      </div>
    </section>
  );
}