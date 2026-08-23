import PostDetail from '@/components/ui/PostDetail';
import { getPostBySlug, getLatestJobs, getMostViewedBlogs } from '@/lib/posts';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Telugu Prep`,
    description: post.summary,
  };
}

export default async function JobDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [latestPosts, mostViewedBlogs] = await Promise.all([
    getLatestJobs(post.id, 3),
    getMostViewedBlogs(null, 3),
  ]);

  return (
    <PostDetail
      post={post}
      latestPosts={latestPosts}
      mostViewedPosts={mostViewedBlogs}
    />
  );
}