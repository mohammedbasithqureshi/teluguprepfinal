import ListPage from '@/components/ui/ListPage';
import { getAllByType } from '@/lib/posts';

export const metadata = {
  title: 'Exam Prep Blog & Study Guides | Telugu Prep',
  description: 'Syllabus guides, current affairs, and preparation strategies for Telangana & Andhra Pradesh government exams.',
};

export default async function BlogPage() {
  const posts = await getAllByType('blog');
  return <ListPage title="Blog & Study Material" posts={posts} basePath="/blog" />;
}