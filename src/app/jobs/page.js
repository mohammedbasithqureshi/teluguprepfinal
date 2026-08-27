import ListPage from '@/components/ui/ListPage';
import CategoryFilter from '@/components/ui/CategoryFilter';
import { getAllByTypeFilteredRegion } from '@/lib/posts';

export const revalidate = 0;

export const metadata = {
  title: 'Latest Government Job Notifications | Telugu Prep',
  description:
    'Latest government job notifications for Telangana, Andhra Pradesh, and Central Govt.',
};

export default async function JobsPage({ searchParams }) {
  const { category, region } = await searchParams;

  const posts = await getAllByTypeFilteredRegion(
    'job',
    category,
    region
  );

  return (
    <ListPage
      title="Latest Notifications"
      posts={posts}
      basePath="/jobs"
      filterSlot={<CategoryFilter basePath="/jobs" />}
    />
  );
}