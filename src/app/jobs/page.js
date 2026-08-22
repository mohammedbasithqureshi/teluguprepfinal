import ListPage from '@/components/ui/ListPage';
import CategoryFilter from '@/components/ui/CategoryFilter';
import { getAllByTypeFiltered } from '@/lib/posts';

export const revalidate = 0;

export const metadata = {
  title: 'Latest Government Job Notifications | Telugu Prep',
  description: 'Latest government job notifications for Telangana — TGPSC, Police, Teaching, Health, District Jobs, and more.',
};

export default async function JobsPage({ searchParams }) {
  const { category } = await searchParams;
  const posts = await getAllByTypeFiltered('job', category);

  return (
    <ListPage
      title="Latest Notifications"
      posts={posts}
      basePath="/jobs"
      filterSlot={<CategoryFilter basePath="/jobs" />}
    />
  );
}