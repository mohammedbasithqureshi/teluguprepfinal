import ListPage from '@/components/ui/ListPage';
import { getAllByType } from '@/lib/posts';

export const revalidate = 0;

export const metadata = {
  title: 'Telangana & AP Government Schemes | Telugu Prep',
  description: 'Latest welfare schemes and government benefit programs for Telangana and Andhra Pradesh residents.',
};

export default async function SchemesPage() {
  const posts = await getAllByType('scheme');
  return <ListPage title="Government Schemes" posts={posts} basePath="/schemes" />;
}