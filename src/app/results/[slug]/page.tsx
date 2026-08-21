import PostDetail from '@/components/ui/PostDetail';
import { getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} | Telugu Prep`, description: post.summary };
}

export default async function ResultDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return <PostDetail post={post} />;
}