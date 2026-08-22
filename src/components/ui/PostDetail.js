import AdSlot from '@/components/home/AdSlot';
import ShareButton from '@/components/ui/ShareButton';

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

function renderContent(content) {
  const blocks = content.split(/\n\s*\n/).filter((b) => b.trim());

  return blocks.map((block, i) => {
    const trimmed = block.trim();

    // Heading: **Heading Text**
    if (trimmed.startsWith('**') && trimmed.includes('**')) {
      const headingMatch = trimmed.match(/^\*\*(.+?)\*\*/);
      if (headingMatch) {
        const headingText = headingMatch[1];
        const rest = trimmed.slice(headingMatch[0].length).trim();

        return (
          <div key={i}>
            <h2 className="text-xl md:text-2xl font-bold mt-10 mb-3 text-[var(--color-navy)]">
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

function renderBlockBody(text, key) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const isBulletList = lines.length > 0 && lines.every((line) => line.startsWith('- '));

  if (isBulletList) {
    return (
      <ul key={`ul-${key}`} className="list-disc pl-6 space-y-2 my-4">
        {lines.map((line, j) => (
          <li key={j} className="leading-relaxed">
            {line.replace(/^- /, '')}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p key={`p-${key}`} className="mb-4 leading-relaxed">
      {text}
    </p>
  );
}
export default function PostDetail({ post }) {
  if (!post) return null;

  // Safely parse JSON strings if important_dates is stored as text in DB
  const importantDates =
    typeof post.important_dates === 'string'
      ? JSON.parse(post.important_dates)
      : post.important_dates;

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

      <div className="prose-content text-gray-800">{renderContent(post.content)}</div>

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

      {/* Share Button placed at the bottom of the article */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <ShareButton title={post.title} />
      </div>

      <p className="text-xs text-gray-400 mt-6 border-t pt-4">
        Disclaimer: This information is compiled from official sources. Please verify all details
        on the official website before applying.
      </p>

      <AdSlot slot="3333333333" label="IN-ARTICLE UNIT" />
    </article>
  );
}