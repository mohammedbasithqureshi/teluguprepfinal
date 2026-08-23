'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetch('/api/admin/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert('Failed to delete');
    }
  }

  const filtered = filterType === 'all' ? posts : posts.filter((p) => p.type === filterType);

  if (loading) return <div className="container-page py-10">Loading...</div>;

  return (
    <div className="container-page py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link
          href="/admin/new"
          className="bg-[var(--color-teal)] text-white px-5 py-2 rounded-lg text-sm font-semibold"
        >
          + Add New Post
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'job', 'result', 'admit_card', 'answer_key', 'blog'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
              filterType === t
                ? 'bg-[var(--color-navy)] text-white border-[var(--color-navy)]'
                : 'border-gray-300 text-gray-600'
            }`}
          >
            {t === 'all' ? 'All' : t.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Published</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((post) => (
              <tr key={post.id} className="border-b last:border-0">
                <td className="p-3 font-medium">{post.title}</td>
                <td className="p-3 capitalize">{post.type.replace('_', ' ')}</td>
                <td className="p-3">{post.category || '—'}</td>
                <td className="p-3 text-gray-500">
                  {new Date(post.published_at).toLocaleDateString('en-IN')}
                </td>
                <td className="p-3 text-right space-x-3">
                  <Link href={`/admin/edit/${post.id}`} className="text-[var(--color-teal)] font-medium">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="text-red-600 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}