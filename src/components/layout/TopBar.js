import { getLatestByType } from '@/lib/posts';

export default async function TopBar() {
  const latestJobs = await getLatestByType('job', 6);

  const tickerItems = latestJobs.length
    ? latestJobs.map((job) => job.title)
    : ['Welcome to Telugu Prep — check back soon for the latest job updates'];

  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="bg-[var(--color-teal-dark)] text-white text-xs md:text-sm py-2 overflow-hidden">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap px-6">
            <span className="mr-2">⚡</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}