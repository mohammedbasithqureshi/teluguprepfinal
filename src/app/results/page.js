import ListPage from '@/components/ui/ListPage';
import CategoryFilter from '@/components/ui/CategoryFilter';
import { getAllByTypeFilteredRegion } from '@/lib/posts';

export const revalidate = 0;

export const metadata = {
  title: 'Government Exam Results | Telugu Prep',
  description: 'Latest government exam results for Telangana, Andhra Pradesh, and Central Govt.',
};

export default async function ResultsPage({ searchParams }) {
  const { category, region } = await searchParams;
  const posts = await getAllByTypeFilteredRegion('result', category, region);

  return (
    <ListPage
      title="Results"
      posts={posts}
      basePath="/results"
      filterSlot={<CategoryFilter basePath="/results" />}
    />
  );
}