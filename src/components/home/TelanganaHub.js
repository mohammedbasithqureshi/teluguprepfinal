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

function ColumnCard({ title, posts, basePath, getHref }) {
  return (
    <div className="border-[3px] border-[#ab1738] bg-white flex flex-col font-sans min-w-0">
      {/* Header Bar */}
      <div className="bg-[#ab1738] py-1.5 px-1 text-center border-b-[3px] border-[#ab1738]">
        <h3 className="text-white font-bold text-xs sm:text-sm md:text-2xl tracking-wide leading-tight">
          {title}
        </h3>
      </div>

      {/* List Container */}
      <div className="p-1.5 sm:p-2 md:p-3 border-2 md:border-4 border-white flex-1 flex flex-col justify-between">
        <ul className="list-disc list-inside space-y-2 md:space-y-3.5 text-xs md:text-sm text-[#0000ee] break-words max-h-[280px] md:max-h-[320px] overflow-y-auto pr-1">
          {posts.length === 0 && (
            <li className="text-gray-500 list-none">
              No entries yet.
            </li>
          )}

          {posts.map((post) => {
            const dayLabel = getDaysLeftLabel(post.application_end);

            return (
              <li
                key={post.id}
                className="marker:text-black leading-snug"
              >
                <Link
                  href={
                    getHref
                      ? getHref(post)
                      : `${basePath}/${post.slug}`
                  }
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

        {/* View More Link */}
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

const TYPE_PATH = {
  job: 'jobs',
  result: 'results',
  admit_card: 'admit-card',
  answer_key: 'answer-key',
  scheme: 'schemes',
};

export default function TelanganaHub({
  jobs = [],
  resultsAndAdmitCards = [],
  schemes = [],
}) {
  return (
    <section className="container mx-auto px-2 sm:px-4 py-6 md:py-8">
      {/* Section Heading */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#123C69] mb-4 md:mb-5 border-l-4 border-[#ab1738] pl-2 md:pl-3">
        Telangana Updates
      </h2>

      {/* Always 3 Columns - Mobile + Desktop */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3">
        {/* Telangana Jobs */}
        <ColumnCard
          title="Telangana Jobs"
          posts={jobs}
          basePath="/jobs"
          getHref={(post) => `/jobs/${post.slug}`}
        />

        {/* Result / Admit Card */}
        <ColumnCard
          title="Result / Admit Card"
          posts={resultsAndAdmitCards}
          basePath="/results"
          getHref={(post) =>
            `/${TYPE_PATH[post.type] || 'results'}/${post.slug}`
          }
        />

        {/* Telangana Schemes */}
        <ColumnCard
          title="TS Schemes"
          posts={schemes}
          basePath="/schemes"
          getHref={(post) => `/schemes/${post.slug}`}
        />
      </div>
    </section>
  );
}