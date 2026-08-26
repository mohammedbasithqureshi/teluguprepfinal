import Link from 'next/link';

export default function BlogGrid({ title, posts, viewAllHref }) {
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
          className="text-sm font-bold text-[#ab1738] hover:underline whitespace-nowrap"
        >
          View All »
        </Link>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="
              group flex flex-col
              border-[3px] border-[#ab1738]
              bg-white
              transition-colors duration-200
              hover:bg-[#fffafa]
            "
          >
            {/* Card Header */}
            <div className="border-b-[3px] border-[#ab1738] bg-[#ab1738] px-3 py-2">
              <span className="text-[11px] font-bold uppercase tracking-wide text-white">
                {post.category || 'GUIDE'}
              </span>
            </div>

            {/* Card Content */}
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

              {post.summary && (
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-600">
                  {post.summary}
                </p>
              )}

              <div className="flex-1" />

              {/* Bottom */}
              <div className="mt-4 border-t border-gray-200 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">
                    Study Material
                  </span>

                  <span className="text-xs font-bold text-[#ab1738] group-hover:underline">
                    Read More »
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