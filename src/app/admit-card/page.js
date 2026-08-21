import ListPage from '@/components/ui/ListPage';
import { getAllByType } from '@/lib/posts';

export const metadata = {
  title: 'Admit Card / Hall Ticket Downloads | Telugu Prep',
  description: 'Download admit cards and hall tickets for upcoming government exams in Telangana & Andhra Pradesh.',
};

export default async function AdmitCardPage() {
  const posts = await getAllByType('admit_card');
  return <ListPage title="Admit Cards" posts={posts} basePath="/admit-card" />;
}