import PostDetail from '@/components/ui/PostDetail';
import { getPostBySlug, getLatestBlogs, getMostViewedBlogs, incrementViews } from '@/lib/posts';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} | Telugu Prep`, description: post.summary };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  incrementViews(post.id); // fire-and-forget, no await needed

  const [latestBlogs, mostViewed] = await Promise.all([
    getLatestBlogs(post.id, 3),
    getMostViewedBlogs(post.id, 3),
  ]);

  return <PostDetail post={post} latestPosts={latestBlogs} mostViewedPosts={mostViewed} />;
}