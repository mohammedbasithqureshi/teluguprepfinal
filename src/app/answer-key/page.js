import ListPage from '@/components/ui/ListPage';
import { getAllByType } from '@/lib/posts';

export const metadata = {
  title: 'Answer Keys | Telugu Prep',
  description: 'Provisional and final answer keys for Telangana & Andhra Pradesh government exams.',
};

export default async function AnswerKeyPage() {
  const posts = await getAllByType('answer_key');
  return <ListPage title="Answer Keys" posts={posts} basePath="/answer-key" />;
}