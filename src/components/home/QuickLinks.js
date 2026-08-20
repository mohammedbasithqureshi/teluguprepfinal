import Link from 'next/link';
import links from '@/data/quicklinks.json';

export default function QuickLinks() {
  return (
    <section className="container-page py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className={`${l.color} text-white font-bold text-center rounded-lg px-5 py-6 text-sm md:text-base hover:brightness-110 transition`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </section>
  );
}