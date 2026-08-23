'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PostForm from '@/components/admin/PostForm';

export default function EditPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/posts')
      .then((res) => res.json())
      .then((posts) => {
        const found = posts.find((p) => p.id === id);
        setPost(found);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container-page py-10">Loading...</div>;
  if (!post) return <div className="container-page py-10">Post not found.</div>;

  return (
    <div className="container-page py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <PostForm initialData={post} postId={id} />
    </div>
  );
}