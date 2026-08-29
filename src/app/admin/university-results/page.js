'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UniversityResultsAdminList() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/university-results')
      .then((res) => res.json())
      .then((data) => {
        setResults(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/university-results/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setResults((prev) => prev.filter((r) => r.id !== id));
    } else {
      alert('Failed to delete');
    }
  }

  if (loading) return <div className="container-page py-10">Loading...</div>;

  return (
    <div className="container-page py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">University Results</h1>
          <p className="text-sm text-gray-500 mt-1">Separate from Jobs/Results admin</p>
        </div>
        <Link
          href="/admin/university-results/new"
          className="bg-[#123C69] text-white px-5 py-2 rounded-lg text-sm font-semibold"
        >
          + Add New Result
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">University</th>
              <th className="text-left p-3">Courses</th>
              <th className="text-left p-3">Published</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id} className="border-b last:border-0">
                <td className="p-3 font-medium">{r.title}</td>
                <td className="p-3">{r.university}</td>
                <td className="p-3">{r.courses?.length || 0}</td>
                <td className="p-3 text-gray-500">
                  {new Date(r.published_at).toLocaleDateString('en-IN')}
                </td>
                <td className="p-3 text-right space-x-3">
                  <Link href={`/admin/university-results/edit/${r.id}`} className="text-[#00897B] font-medium">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(r.id, r.title)} className="text-red-600 font-medium">
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