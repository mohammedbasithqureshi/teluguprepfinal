import ListPage from '@/components/ui/ListPage';
import { getAllByType } from '@/lib/posts';

export const revalidate = 0;

export const metadata = {
  title: 'Scholarships for Indian Students | Telugu Prep',
  description: 'Government and private scholarships for Indian students — Telangana, Andhra Pradesh, and national-level scholarship schemes.',
};

export default async function ScholarshipsPage() {
  const posts = await getAllByType('scholarship');
  return <ListPage title="Scholarships" posts={posts} basePath="/scholarships" />;
}