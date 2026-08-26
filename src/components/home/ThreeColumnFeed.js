import Link from 'next/link';

function ColumnCard({ title, posts, basePath }) {
  return (
    <div className="border-[3px] border-[#ab1738] bg-white flex flex-col font-sans">
      {/* Header Bar */}
      <div className="bg-[#ab1738] py-1.5 text-center border-b-[3px] border-[#ab1738]">
        <h3 className="text-white font-bold text-xl md:text-2xl tracking-wide">{title}</h3>
      </div>

      {/* List Container */}
      <div className="p-3 border-4 border-white flex-1 flex flex-col justify-between">
        <ul className="list-disc list-inside space-y-3.5 text-sm text-[#0000ee]">
          {posts.length === 0 && (
            <li className="text-gray-500 list-none">No entries yet.</li>
          )}
          {posts.map((post) => (
            <li key={post.id} className="marker:text-black">
              <Link
                href={`${basePath}/${post.slug}`}
                className="font-bold hover:underline inline leading-snug text-[15px]"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* View More Link */}
        <div className="text-right pt-4">
          <Link
            href={basePath}
            className="text-xs font-bold text-gray-700 hover:underline"
          >
            View More »
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ThreeColumnFeed({ results, admitCards, jobs }) {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <ColumnCard title="Result" posts={results} basePath="/results" />
        <ColumnCard title="Admit Card" posts={admitCards} basePath="/admit-card" />
        <ColumnCard title="Latest Job" posts={jobs} basePath="/jobs" />
      </div>
    </section>
  );
}