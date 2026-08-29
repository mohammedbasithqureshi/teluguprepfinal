import Categories from '@/components/home/Categories';
import QuickLinksGrid from '@/components/home/QuickLinksGrid';
import ThreeColumnFeed from '@/components/home/ThreeColumnFeed';
import TelanganaHub from '@/components/home/TelanganaHub';
import PostGrid from '@/components/home/PostGrid';
import BlogGrid from '@/components/home/BlogGrid';
import AdSlot from '@/components/home/AdSlot';
import AdsterraBanner from '@/components/home/AdsterraBanner';
import AdsterraNative from '@/components/home/AdsterraNative';
import { getLatestByType, getClosingSoon, getLatestByRegionPrefix } from '@/lib/posts';

export const revalidate = 0;

export default async function HomePage() {
  const [
    blogs,
    closingSoon,
    tgJobs,
    tgResults,
    tgAdmitCards,
    tgSchemes,
    centralJobs,
    centralResults,
    centralAdmitCards,
  ] = await Promise.all([
    getLatestByType('blog', 3),
    getClosingSoon(4),
    getLatestByRegionPrefix('job', 'tg-', 8),
    getLatestByRegionPrefix('result', 'tg-', 4),
    getLatestByRegionPrefix('admit_card', 'tg-', 4),
    getLatestByType('scheme', 8),
    getLatestByRegionPrefix('job', 'c-', 10),
    getLatestByRegionPrefix('result', 'c-', 10),
    getLatestByRegionPrefix('admit_card', 'c-', 10),
  ]);

  const tgResultsAndAdmitCards = [...tgResults, ...tgAdmitCards]
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
    .slice(0, 8);

  return (
    <>
      <QuickLinksGrid />

      <AdsterraBanner adKey="f90d5dbcb598631f3e161225fc7131b1" width={468} height={60} />

      <TelanganaHub
        jobs={tgJobs}
        resultsAndAdmitCards={tgResultsAndAdmitCards}
        schemes={tgSchemes}
      />

      <AdsterraNative />

      <ThreeColumnFeed
        results={centralResults}
        admitCards={centralAdmitCards}
        jobs={centralJobs}
      />

      {closingSoon.length > 0 && (
        <PostGrid title="⏰ Closing Soon" posts={closingSoon} viewAllHref="/jobs" basePath="/jobs" />
      )}

      <Categories />

      <AdSlot slot="1111111111" label="IN-FEED UNIT" />

      <PostGrid
        title="Latest Central Govt Notifications"
        posts={centralJobs}
        viewAllHref="/jobs?region=central"
        basePath="/jobs"
      />
      <PostGrid
        title="Latest Central Govt Results"
        posts={centralResults}
        viewAllHref="/results?region=central"
        basePath="/results"
      />
      <PostGrid
        title="Central Govt Admit Cards"
        posts={centralAdmitCards}
        viewAllHref="/admit-card?region=central"
        basePath="/admit-card"
      />

      <AdSlot slot="2222222222" label="DISPLAY UNIT" />

      <BlogGrid title="From the Blog — Exam Prep Guides" posts={blogs} viewAllHref="/blog" />
    </>
  );
}