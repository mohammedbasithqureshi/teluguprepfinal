import AdSlot from '@/components/home/AdSlot';

const typeLabels = {
  job: 'NOTIFICATION',
  result: 'RESULT',
  admit_card: 'ADMIT CARD',
  answer_key: 'ANSWER KEY',
  blog: 'BLOG',
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function PostDetail({ post }) {
  if (!post) return null;

  // Safely parse JSON strings if important_dates is stored as text in DB
  const importantDates =
    typeof post.important_dates === 'string'
      ? JSON.parse(post.important_dates)
      : post.important_dates;

  const paragraphs = post.content ? post.content.split('\n\n').filter(Boolean) : [];

  return (
    <article className="container-page py-10 max-w-3xl mx-auto">
      <span className="inline-block bg-orange-50 text-[var(--color-amber)] text-xs font-semibold px-2.5 py-1 rounded mb-4">
        {typeLabels[post.type] || post.type}
      </span>

      <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4">{post.title}</h1>

      <div className="flex flex-wrap gap-4 text-sm text-gray-500 border-b pb-6 mb-6">
        <span>{post.state || 'All India'}</span>
        <span>•</span>
        <span>Published {formatDate(post.published_at)}</span>
      </div>

      {importantDates && (
        <div className="bg-[var(--color-navy)] text-white rounded-xl p-5 mb-8">
          <h2 className="font-semibold mb-3 text-[var(--color-amber)]">Important Dates</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {Object.entries(importantDates).map(([key, value]) => (
              <li key={key} className="flex justify-between border-b border-white/10 pb-2">
                <span className="capitalize text-gray-300">{key.replace(/_/g, ' ')}</span>
                <span className="font-medium">{String(value)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="prose-content space-y-5 text-gray-800 leading-relaxed">
        {paragraphs.map((p, i) => {
          const trimmed = p.trim();
          if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
            return (
              <h2 key={i} className="text-xl font-bold mt-8 mb-2 text-[var(--color-navy)]">
                {trimmed.replace(/\*\*/g, '')}
              </h2>
            );
          }
          return <p key={i}>{p}</p>;
        })}
      </div>

      {post.official_link && (
        <a
          href={post.official_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 bg-[var(--color-teal)] hover:bg-[var(--color-teal-dark)] text-white font-semibold px-6 py-3 rounded-lg text-sm"
        >
          Visit Official Website →
        </a>
      )}

      <p className="text-xs text-gray-400 mt-10 border-t pt-4">
        Disclaimer: This information is compiled from official sources. Please verify all details
        on the official website before applying.
      </p>

      <AdSlot label="IN-ARTICLE UNIT" />
    </article>
  );
}