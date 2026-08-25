import categoryGroups from '@/data/categories.json';
import { getCategoryCounts } from '@/lib/posts';
import CategoryGroupBlock from '@/components/home/CategoryGroupBlock';

export default async function Categories() {
  const counts = await getCategoryCounts();

  // Build groups containing only categories that have at least 1 post
  const filteredGroups = categoryGroups
    .map((group) => ({
      ...group,
      categories: group.categories.filter((cat) => counts[cat.slug] > 0),
    }))
    .filter((group) => group.categories.length > 0);

  if (filteredGroups.length === 0) return null;

  return (
    <section className="container-page section-gap pt-10">
      <h2 className="text-xl md:text-2xl font-bold border-l-4 border-[#00897B] pl-3 mb-6 text-[#123C69]">
        Browse by Category
      </h2>

      <div className="space-y-8">
        {filteredGroups.map((group) => (
          <CategoryGroupBlock key={group.groupSlug} group={group} counts={counts} />
        ))}
      </div>
    </section>
  );
}