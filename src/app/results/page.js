import ListPage from '@/components/ui/ListPage';
import { getAllByTypeFilteredRegion } from '@/lib/posts';

export const revalidate = 0;

export const metadata = {
  title: 'Government Exam Results | Telugu Prep',
  description:
    'Latest government exam results for Telangana & Andhra Pradesh recruitment exams.',
};

export default async function ResultsPage({ searchParams }) {
  const { region } = await searchParams;

  const posts = await getAllByTypeFilteredRegion(
    'result',
    undefined,
    region
  );

  return (
    <ListPage
      title="Government Exam Results"
      posts={posts}
      basePath="/results"
    />
  );
}