import { getUniversityResultBySlug } from '@/lib/universityResults';
import { notFound } from 'next/navigation';
import CourseResultsTable from '@/components/university-results/CourseResultsTable';
import HowToCheckBox from '@/components/university-results/HowToCheckBox';
import ShareButton from '@/components/ui/ShareButton';
import AdSlot from '@/components/home/AdSlot';


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getUniversityResultBySlug(slug);
  if (!result) return {};
  return {
    title: `${result.title} | Telugu Prep`,
    description: result.summary,
  };
}

// Parses **Heading** into <h2> and "- item" lines into bullet lists,
// same convention used across job/blog/result post content.
function renderContent(content) {
  if (!content) return null;

  const blocks = content.split(/\n\s*\n/).filter((b) => b.trim());

  return blocks.map((block, i) => {
    const trimmed = block.trim();

    // Heading block: starts with **Heading Text**
    if (trimmed.startsWith('**') && trimmed.includes('**')) {
      const headingMatch = trimmed.match(/^\*\*(.+?)\*\*/);
      if (headingMatch) {
        const headingText = headingMatch[1];
        const rest = trimmed.slice(headingMatch[0].length).trim();
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

// Renders a block as either a bullet list (all lines start with "- ")
// or a plain paragraph.
function renderBlockBody(text, key) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const isBulletList = lines.length > 0 && lines.every((line) => line.startsWith('- '));

  if (isBulletList) {
    return (
      <ul key={`ul-${key}`} className="my-5 space-y-2.5 pl-1">
        {lines.map((line, j) => (
          <li key={j} className="flex items-start gap-3 leading-7 text-gray-700">
            <span className="mt-3 h-2 w-2 shrink-0 bg-[#ab1738]" />
            <span>{line.replace(/^- /, '')}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p key={`p-${key}`} className="mb-5 leading-8 text-gray-700">
      {text}
    </p>
  );
}

export default async function UniversityResultDetailPage({ params }) {
  const { slug } = await params;
  const result = await getUniversityResultBySlug(slug);

  // 404 if no matching result exists for this slug
  if (!result) notFound();

  return (
    <article className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        {/* ------------------------------------------------
            HEADER — university badge, title, published/result dates
        ------------------------------------------------ */}
        <header className="mb-8 border-[3px] border-[#ab1738] bg-white">
          <div className="border-b-[3px] border-[#ab1738] bg-[#123C69] px-4 py-2">
            <span className="text-xs font-bold tracking-wide text-white">
              {result.university}
            </span>
          </div>

          <div className="p-5 md:p-6">
            <h1 className="text-2xl font-extrabold leading-tight text-[#123C69] md:text-3xl lg:text-4xl">
              {result.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-200 pt-4 text-sm text-gray-500">
              <span>
                <strong className="text-gray-700">Published:</strong>{' '}
                {new Date(result.published_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              {result.result_published_date && (
                <>
                  <span className="hidden text-gray-300 sm:inline">|</span>
                  <span>
                    <strong className="text-gray-700">Result Date:</strong>{' '}
                    {result.result_published_date}
                  </span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ------------------------------------------------
            SUMMARY — short one-liner, optional
        ------------------------------------------------ */}
        {result.summary && (
          <div className="mx-auto mb-8 max-w-4xl">
            <p className="text-gray-700 leading-relaxed">{result.summary}</p>
          </div>
        )}

        {/* ------------------------------------------------
            COURSE-WISE RESULTS TABLE — collapsible per course,
            each course can have multiple result mirror links
        ------------------------------------------------ */}
        <div className="mx-auto max-w-4xl">
          <CourseResultsTable courses={result.courses} />
        </div>

        {/* ------------------------------------------------
            AD BLOCK 1 — placed right after the results table,
            the highest-visibility spot on the page since every
            visitor scrolls past it to reach their result link
        ------------------------------------------------ */}
        <div className="mx-auto my-8 max-w-4xl">
          <AdSlot slot="4444444444" label="IN-ARTICLE UNIT" />
        </div>

      
        {/* ------------------------------------------------
            CONTENT — optional long-form body, heading+bullet parsed
        ------------------------------------------------ */}
        {result.content && (
          <div className="mx-auto max-w-4xl">
            <div className="prose-content">{renderContent(result.content)}</div>
          </div>
        )}

        {/* ------------------------------------------------
            HOW TO CHECK — numbered step-by-step box
        ------------------------------------------------ */}
        {result.how_to_check?.length > 0 && (
          <div className="mx-auto max-w-4xl">
            <HowToCheckBox steps={result.how_to_check} />
          </div>
        )}

        {/* ------------------------------------------------
            NOTES — important callouts (deadlines, policies, etc.)
        ------------------------------------------------ */}
        {result.notes?.length > 0 && (
          <div className="mx-auto mt-8 max-w-4xl border border-yellow-200 bg-yellow-50 p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-yellow-800">
              Important Notes
            </p>
            <ul className="space-y-1.5">
              {result.notes.map((note, i) => (
                <li key={i} className="flex gap-2 text-sm text-yellow-800">
                  <span>•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ------------------------------------------------
            OFFICIAL LINK — CTA button to the university's own portal
        ------------------------------------------------ */}
        {result.official_link && (
          <div className="mx-auto mt-8 max-w-4xl border-[3px] border-[#123C69] bg-[#f5f8fa] p-5">
            <p className="mb-3 text-sm font-bold text-[#123C69]">
              Official Results Portal
            </p>
            <a
              href={result.official_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#ab1738] px-5 py-3 text-sm font-bold text-white hover:bg-[#8f1230]"
            >
              Visit Official Results Portal ↗
            </a>
          </div>
        )}

        {/* ------------------------------------------------
            SHARE — native share sheet / copy link
        ------------------------------------------------ */}
        <div className="mx-auto mt-8 max-w-4xl border-t border-gray-200 pt-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-500">
            Share this result
          </p>
          <ShareButton title={result.title} />
        </div>

        {/* ------------------------------------------------
            DISCLAIMER — always shown, not user-editable
        ------------------------------------------------ */}
        <div className="mx-auto mt-8 max-w-4xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs leading-5 text-gray-600">
            <strong>Disclaimer:</strong> Result links are compiled from official university sources. Always verify your result on the official university website.
          </p>
        </div>
      </div>
    </article>
  );
}