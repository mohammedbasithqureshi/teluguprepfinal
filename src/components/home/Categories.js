import Link from 'next/link';
import categoryGroups from '@/data/categories.json';

export default function Categories() {
  return (
    <section className="container-page section-gap pt-10">
    <h2 className="text-xl md:text-2xl font-bold border-l-4 border-[#00897B] pl-3 mb-6 text-[#123C69]">
  Browse by Category
</h2>

      <div className="space-y-8">
        {categoryGroups.map((group) => (
          <div key={group.groupSlug}>
            <p className="text-sm font-semibold text-[var(--color-navy)] mb-3">{group.group}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {group.categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/jobs?category=${cat.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-[var(--color-teal)] hover:shadow-md transition"
                >
                  <div className="font-semibold text-[var(--color-navy)] text-sm">{cat.name_te}</div>
                  <div className="text-xs text-gray-500 mt-1">{cat.name_en}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}