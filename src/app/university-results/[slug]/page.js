import { getUniversityResultBySlug } from '@/lib/universityResults';
import { notFound } from 'next/navigation';
import CourseResultsTable from '@/components/university-results/CourseResultsTable';
import HowToCheckBox from '@/components/university-results/HowToCheckBox';
import ShareButton from '@/components/ui/ShareButton';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getUniversityResultBySlug(slug);
  if (!result) return {};
  return {
    title: `${result.title} | Telugu Prep`,
    description: result.summary,
  };
}

export default async function UniversityResultDetailPage({ params }) {
  const { slug } = await params;
  const result = await getUniversityResultBySlug(slug);

  if (!result) notFound();

  return (
    <article className="container-page py-10 max-w-4xl">
      <span className="inline-block bg-[#EAF8F6] text-[#00897B] text-xs font-bold px-3 py-1.5 rounded-full mb-4">
        {result.university}
      </span>

      <h1 className="text-2xl md:text-4xl font-extrabold text-[#123C69] leading-tight mb-4">
        {result.title}
      </h1>

      <div className="flex flex-wrap gap-4 text-sm text-gray-500 border-b border-gray-200 pb-6 mb-6">
        <span>
          Published{' '}
          {new Date(result.published_at).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
        {result.result_published_date && (
          <>
            <span>•</span>
            <span>Result Date: {result.result_published_date}</span>
          </>
        )}
      </div>

      <div className="mb-6">
        <ShareButton title={result.title} />
      </div>

      {result.summary && (
        <p className="text-gray-700 leading-relaxed mb-8">{result.summary}</p>
      )}

      <CourseResultsTable courses={result.courses} />

      {result.how_to_check?.length > 0 && (
        <HowToCheckBox steps={result.how_to_check} />
      )}

      {result.notes?.length > 0 && (
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-5">
          <h3 className="font-bold text-sm text-yellow-800 mb-2">Important Notes</h3>
          <ul className="space-y-1.5">
            {result.notes.map((note, i) => (
              <li key={i} className="text-sm text-yellow-800 flex gap-2">
                <span>•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.official_link && (
        <a
          href={result.official_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 bg-[#00897B] hover:bg-[#00796B] text-white font-bold px-6 py-3 rounded-lg text-sm"
        >
          Visit Official Results Portal →
        </a>
      )}

      <p className="text-xs text-gray-400 mt-10 border-t pt-4">
        Disclaimer: Result links are compiled from official university sources. Always
        verify your result on the official university website.
      </p>
    </article>
  );
}