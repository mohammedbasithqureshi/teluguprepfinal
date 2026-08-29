import Link from 'next/link';
import { getAllUniversityResults } from '@/lib/universityResults';

export const revalidate = 0;

export const metadata = {
  title: 'University Exam Results | Telugu Prep',
  description: 'JNTUH, OU, Kakatiya and other Telangana university exam results — B.Tech, B.Pharmacy, MBA, MCA and more.',
};

export default async function UniversityResultsPage() {
  const results = await getAllUniversityResults();

  return (
    <div className="container-page py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-[#123C69] border-l-4 border-[#00897B] pl-3 mb-8">
        University Exam Results
      </h1>

      {results.length === 0 && (
        <p className="text-gray-500">No results published yet.</p>
      )}

      <div className="space-y-3">
        {results.map((item) => (
          <Link
            key={item.id}
            href={`/university-results/${item.slug}`}
            className="block bg-white border-[2px] border-gray-200 hover:border-[#00897B] rounded-xl p-4 transition hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-block bg-[#EAF8F6] text-[#00897B] text-xs font-bold px-2 py-1 rounded mb-2">
                  {item.university}
                </span>
                <h2 className="font-semibold text-[#123C69]">{item.title}</h2>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {new Date(item.published_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}