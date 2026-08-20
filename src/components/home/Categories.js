import Link from 'next/link';
import categories from '@/data/categories.json';

export default function Categories() {
  return (
    <section className="container-page section-gap pt-10">
      <h2 className="text-xl md:text-2xl font-bold border-l-4 border-[var(--color-orange)] pl-3 mb-6">
        Exam Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/jobs?category=${cat.slug}`}
            className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-[var(--color-orange)] hover:shadow-md transition"
          >
            <div className="font-semibold text-[var(--color-navy)]">{cat.name_te}</div>
            <div className="text-xs text-gray-500 mt-1">{cat.name_en}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}