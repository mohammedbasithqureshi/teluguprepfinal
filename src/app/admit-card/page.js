import ListPage from '@/components/ui/ListPage';
import CategoryFilter from '@/components/ui/CategoryFilter';
import { getAllByTypeFilteredRegion } from '@/lib/posts';

export const revalidate = 0;

export const metadata = {
  title: 'Admit Card / Hall Ticket Downloads | Telugu Prep',
  description: 'Download admit cards and hall tickets for Telangana, Andhra Pradesh, and Central Govt exams.',
};

export default async function AdmitCardPage({ searchParams }) {
  const { category, region } = await searchParams;
  const posts = await getAllByTypeFilteredRegion('admit_card', category, region);

  return (
    <ListPage
      title="Admit Cards"
      posts={posts}
      basePath="/admit-card"
      filterSlot={<CategoryFilter basePath="/admit-card" />}
    />
  );
}