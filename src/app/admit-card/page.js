import ListPage from '@/components/ui/ListPage';
import { getAllByTypeFilteredRegion } from '@/lib/posts';

export const revalidate = 0;

export const metadata = {
  title: 'Admit Card / Hall Ticket Downloads | Telugu Prep',
  description:
    'Download admit cards and hall tickets for upcoming government exams in Telangana & Andhra Pradesh.',
};

export default async function AdmitCardPage({ searchParams }) {
  const { region } = await searchParams;

  const posts = await getAllByTypeFilteredRegion(
    'admit_card',
    undefined,
    region
  );

  return (
    <ListPage
      title="Admit Card / Hall Ticket"
      posts={posts}
      basePath="/admit-card"
    />
  );
}