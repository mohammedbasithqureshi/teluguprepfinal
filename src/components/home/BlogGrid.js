import Link from 'next/link';

export default function BlogGrid({ title, posts, viewAllHref }) {
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
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#00897B] hover:shadow-lg hover:shadow-[#00897B]/10"
          >
            <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold tracking-wide text-orange-700">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              {post.category || 'GUIDE'}
            </span>

            <h3 className="text-base font-bold leading-6 text-gray-900 transition-colors group-hover:text-[#00897B] line-clamp-3">
              {post.title}
            </h3>

            {post.summary && (
              <p className="mt-2 text-sm leading-6 text-gray-500 line-clamp-2">{post.summary}</p>
            )}

            <div className="flex-1" />

            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-xs text-gray-400">Study Material</span>
              <span className="text-xs font-bold text-[#00897B] transition-transform group-hover:translate-x-1">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}