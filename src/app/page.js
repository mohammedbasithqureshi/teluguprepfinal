import Categories from '@/components/home/Categories';
import PostGrid from '@/components/home/PostGrid';
import BlogGrid from '@/components/home/BlogGrid';
import AdSlot from '@/components/home/AdSlot';
import { getLatestByType } from '@/lib/posts';

export default async function HomePage() {
  const [jobs, results, blogs] = await Promise.all([
    getLatestByType('job', 3),
    getLatestByType('result', 3),
    getLatestByType('blog', 3),
  ]);

  return (
    <>
      <Categories />
      <AdSlot slot="1111111111" label="IN-FEED UNIT" />
      <PostGrid title="Latest Notifications" posts={jobs} viewAllHref="/jobs" basePath="/jobs" />
      <PostGrid title="Results & Admit Cards" posts={results} viewAllHref="/results" basePath="/results" />
      <AdSlot slot="2222222222" label="DISPLAY UNIT" />
      <BlogGrid title="From the Blog — Exam Prep Guides" posts={blogs} viewAllHref="/blog" />
    </>
  );
}