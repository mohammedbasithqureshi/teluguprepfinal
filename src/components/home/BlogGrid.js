import Link from 'next/link';

export default function BlogGrid({ title, posts, viewAllHref }) {
  if (!posts?.length) return null;

  return (
    <section className="container-page section-gap">
      {/* Section Header */}
      <div className="mb-4 md:mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <div className="h-7 md:h-8 w-1.5 bg-[#ab1738] shrink-0" />

          <h2 className="text-lg md:text-2xl font-bold text-[#123C69] truncate">
            {title}
          </h2>
        </div>

        <Link
          href={viewAllHref}
          className="text-xs md:text-sm font-bold text-[#ab1738] hover:underline whitespace-nowrap ml-2"
        >
          View All »
        </Link>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="
              group flex flex-col
              border-[2px] md:border-[3px]
              border-[#ab1738]
              bg-white
              transition-colors duration-200
              hover:bg-[#fffafa]
              min-w-0
            "
          >
            {/* Card Header */}
            <div className="border-b-[2px] md:border-b-[3px] border-[#ab1738] bg-[#ab1738] px-2 md:px-3 py-1.5 md:py-2">
              <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-wide text-white">
                {post.category || 'GUIDE'}
              </span>
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col p-2.5 md:p-4">
              <h3
                className="
                  line-clamp-3
                  text-xs sm:text-sm md:text-[15px]
                  font-bold
                  leading-5 md:leading-6
                  text-[#0000ee]
                  group-hover:underline
                "
              >
                {post.title}
              </h3>

              {post.summary && (
                <p className="mt-1.5 md:mt-2 line-clamp-2 text-[11px] sm:text-xs md:text-sm leading-4 md:leading-5 text-gray-600">
                  {post.summary}
                </p>
              )}

              <div className="flex-1" />

              {/* Bottom */}
              <div className="mt-3 md:mt-4 border-t border-gray-200 pt-2 md:pt-3">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-500 truncate">
                    Study Material
                  </span>

                  <span className="text-[9px] sm:text-[10px] md:text-xs font-bold text-[#ab1738] group-hover:underline whitespace-nowrap">
                    Read »
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}