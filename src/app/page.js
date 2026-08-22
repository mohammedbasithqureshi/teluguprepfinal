import Categories from '@/components/home/Categories';
import PostGrid from '@/components/home/PostGrid';
import BlogGrid from '@/components/home/BlogGrid';
import AdSlot from '@/components/home/AdSlot';
import { getLatestByType, getClosingSoon } from '@/lib/posts';

export const revalidate = 0;

export default async function HomePage() {
  const [jobs, results, blogs, closingSoon] = await Promise.all([
    getLatestByType('job', 3),
    getLatestByType('result', 3),
    getLatestByType('blog', 3),
    getClosingSoon(4),
  ]);

  return (
    <>
      <Categories />
      <AdSlot slot="1111111111" label="IN-FEED UNIT" />
      {closingSoon.length > 0 && (
        <PostGrid title="⏰ Closing Soon" posts={closingSoon} viewAllHref="/jobs" basePath="/jobs" />
      )}
      <PostGrid title="Latest Notifications" posts={jobs} viewAllHref="/jobs" basePath="/jobs" />
      <PostGrid title="Results & Admit Cards" posts={results} viewAllHref="/results" basePath="/results" />
      <AdSlot slot="2222222222" label="DISPLAY UNIT" />
      <BlogGrid title="From the Blog — Exam Prep Guides" posts={blogs} viewAllHref="/blog" />
    </>
  );
}