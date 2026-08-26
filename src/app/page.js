import Categories from '@/components/home/Categories';
import QuickLinksGrid from '@/components/home/QuickLinksGrid';
import ThreeColumnFeed from '@/components/home/ThreeColumnFeed';
import PostGrid from '@/components/home/PostGrid';
import BlogGrid from '@/components/home/BlogGrid';
import AdSlot from '@/components/home/AdSlot';
import { getLatestByType, getClosingSoon } from '@/lib/posts';

export const revalidate = 0;

export default async function HomePage() {
  const [jobs, results, admitCards, blogs, closingSoon] =
    await Promise.all([
      getLatestByType('job', 10),
      getLatestByType('result', 10),
      getLatestByType('admit_card', 10),
      getLatestByType('blog', 3),
      getClosingSoon(4),
    ]);

  return (
    <>
      {/* Quick Navigation */}
      <QuickLinksGrid />

      {/* Compact Latest Feed */}
      <ThreeColumnFeed
        results={results.slice(0, 10)}
        admitCards={admitCards.slice(0, 10)}
        jobs={jobs.slice(0, 10)}
      />

      {/* Closing Soon */}
      {closingSoon.length > 0 && (
        <PostGrid
          title="⏰ Closing Soon"
          posts={closingSoon}
          viewAllHref="/jobs"
          basePath="/jobs"
        />
      )}

      {/* Categories */}
      <Categories />

      {/* In-feed Advertisement */}
      <AdSlot
        slot="1111111111"
        label="IN-FEED UNIT"
      />

      {/* Latest Notifications */}
      <PostGrid
        title="Latest Notifications"
        posts={jobs}
        viewAllHref="/jobs"
        basePath="/jobs"
      />

      {/* Latest Results */}
      <PostGrid
        title="Latest Results"
        posts={results}
        viewAllHref="/results"
        basePath="/results"
      />

      {/* Admit Cards */}
      <PostGrid
        title="Admit Cards"
        posts={admitCards}
        viewAllHref="/admit-card"
        basePath="/admit-card"
      />

      {/* Display Advertisement */}
      <AdSlot
        slot="2222222222"
        label="DISPLAY UNIT"
      />

      {/* Blog */}
      <BlogGrid
        title="From the Blog — Exam Prep Guides"
        posts={blogs}
        viewAllHref="/blog"
      />
    </>
  );
}