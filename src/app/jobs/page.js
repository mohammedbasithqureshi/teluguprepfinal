import ListPage from '@/components/ui/ListPage';
import { getAllByType } from '@/lib/posts';

export const metadata = {
  title: 'Latest Government Job Notifications | Telugu Prep',
  description: 'Latest government job notifications for Telangana & Andhra Pradesh — TSPSC, APPSC, Railways, Banking, Police, DSC.',
};

export default async function JobsPage() {
  const posts = await getAllByType('job');
  return <ListPage title="Latest Notifications" posts={posts} basePath="/jobs" />;
}