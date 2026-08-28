import Link from 'next/link';
import { getQuickLinks } from '@/lib/posts';

const TYPE_PATH = { job: 'jobs', result: 'results', admit_card: 'admit-card', answer_key: 'answer-key' };

function LinkRow({ title, links }) {
  if (!links.length) return null;
  return (
    <div className="mb-4 last:mb-0">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {links.map((post) => (
          <Link
            key={post.id}
            href={`/${TYPE_PATH[post.type]}/${post.slug}`}
            style={{ backgroundColor: post.quick_link_color }}
            className="text-white font-bold text-center rounded-xl px-4 py-5 text-sm hover:brightness-110 transition shadow-sm"
          >
            {post.quick_link_label || post.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function QuickLinksGrid() {
  const links = await getQuickLinks(16);
  const tgLinks = links.filter((l) => l.category?.startsWith('tg-'));
  const centralLinks = links.filter((l) => l.category?.startsWith('c-'));
  const apLinks = links.filter((l) => l.category?.startsWith('ap-'));

  return (
    <section className="container-page py-8">
      <LinkRow title="Telangana" links={tgLinks} />
      <LinkRow title="Andhra Pradesh" links={apLinks} />
      <LinkRow title="Central Government" links={centralLinks} />
    </section>
  );
}