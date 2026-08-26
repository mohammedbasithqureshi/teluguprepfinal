import categoryGroups from '@/data/categories.json';
import { getCategoryCounts } from '@/lib/posts';
import CategoryGroupBlock from '@/components/home/CategoryGroupBlock';

export default async function Categories() {
  const counts = await getCategoryCounts();

  // Build groups containing only categories that have at least 1 post
  const filteredGroups = categoryGroups
    .map((group) => ({
      ...group,
      categories: group.categories.filter(
        (cat) => counts[cat.slug] > 0
      ),
    }))
    .filter((group) => group.categories.length > 0);

  if (filteredGroups.length === 0) return null;

  return (
    <section className="container-page section-gap pt-10">
      {/* Section Heading */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-8 w-1.5 bg-[#ab1738]" />

        <h2 className="text-xl md:text-2xl font-bold text-[#123C69]">
          Browse by Category
        </h2>
      </div>

      {/* Category Groups */}
      <div className="space-y-6">
        {filteredGroups.map((group) => (
          <div
            key={group.groupSlug}
            className="border-[3px] border-[#ab1738] bg-white"
          >
            {/* Group Header */}
            <div className="bg-[#ab1738] px-4 py-2.5 border-b-[3px] border-[#ab1738]">
              <h3 className="text-base md:text-lg font-bold text-white">
                {group.title}
              </h3>
            </div>

            {/* Categories */}
            <div className="p-3 md:p-4">
              <CategoryGroupBlock
                group={group}
                counts={counts}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}