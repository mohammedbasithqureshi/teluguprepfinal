import ListPage from '@/components/ui/ListPage';
import CategoryFilter from '@/components/ui/CategoryFilter';
import { getAllByTypeFilteredRegion } from '@/lib/posts';

export const revalidate = 0;

export const metadata = {
  title: 'Answer Keys | Telugu Prep',
  description: 'Provisional and final answer keys for Telangana, Andhra Pradesh, and Central Govt exams.',
};

export default async function AnswerKeyPage({ searchParams }) {
  const { category, region } = await searchParams;
  const posts = await getAllByTypeFilteredRegion('answer_key', category, region);

  return (
    <ListPage
      title="Answer Keys"
      posts={posts}
      basePath="/answer-key"
      filterSlot={<CategoryFilter basePath="/answer-key" />}
    />
  );
}