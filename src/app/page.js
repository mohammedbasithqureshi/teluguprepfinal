import Hero from '@/components/home/Hero';
import QuickLinks from '@/components/home/QuickLinks';
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
      <Hero />
      <QuickLinks />
      <Categories />
      <AdSlot label="IN-FEED UNIT" />
      <PostGrid title="Results & Admit Cards" posts={results} viewAllHref="/results" basePath="/results" />
      <AdSlot label="DISPLAY UNIT" />
      <BlogGrid title="From the Blog — Exam Prep Guides" posts={blogs} viewAllHref="/blog" />
    </>
  );
}