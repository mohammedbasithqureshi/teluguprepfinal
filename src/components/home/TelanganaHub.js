import Link from 'next/link';

function ColumnCard({ title, posts, basePath, getHref }) {
  return (
    <div className="border-[3px] border-[#ab1738] bg-white flex flex-col font-sans">
      <div className="bg-[#ab1738] py-1.5 text-center border-b-[3px] border-[#ab1738]">
        <h3 className="text-white font-bold text-xl md:text-2xl tracking-wide">{title}</h3>
      </div>

      <div className="p-3 border-4 border-white flex-1 flex flex-col justify-between">
        <ul className="list-disc list-inside space-y-3.5 text-sm text-[#0000ee]">
          {posts.length === 0 && (
            <li className="text-gray-500 list-none">No entries yet.</li>
          )}
          {posts.map((post) => (
            <li key={post.id} className="marker:text-black">
              <Link
                href={getHref ? getHref(post) : `${basePath}/${post.slug}`}
                className="font-bold hover:underline inline leading-snug text-[15px]"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-right pt-4">
          <Link href={basePath} className="text-xs font-bold text-gray-700 hover:underline">
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
export default function TelanganaHub({ jobs, resultsAndAdmitCards, schemes }) {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#123C69] mb-5 border-l-4 border-[#ab1738] pl-3">
        Telangana Updates
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <ColumnCard
          title="Telangana Jobs"
          posts={jobs}
          basePath="/jobs"
          getHref={(post) => `/jobs/${post.slug}`}
        />
        <ColumnCard
          title="Result / Admit Card"
          posts={resultsAndAdmitCards}
          basePath="/results"
          getHref={(post) => `/${TYPE_PATH[post.type]}/${post.slug}`}
        />
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