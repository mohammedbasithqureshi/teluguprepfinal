import ListPage from '@/components/ui/ListPage';
import { getAllByType } from '@/lib/posts';

export const metadata = {
  title: 'Government Exam Results | Telugu Prep',
  description: 'Latest government exam results for Telangana & Andhra Pradesh recruitment exams.',
};

export default async function ResultsPage() {
  const posts = await getAllByType('result');
  return <ListPage title="Results" posts={posts} basePath="/results" />;
}