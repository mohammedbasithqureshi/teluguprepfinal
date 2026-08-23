'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import categoryGroups from '@/data/categories.json';

const TYPES = ['job', 'result', 'admit_card', 'answer_key', 'blog'];

export default function PostForm({ initialData, postId }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    type: initialData?.type || 'job',
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || '',
    state: initialData?.state || '',
    department: initialData?.department || '',
    organization: initialData?.organization || '',
    qualification: initialData?.qualification || '',
    vacancies: initialData?.vacancies || '',
    salary: initialData?.salary || '',
    age_limit: initialData?.age_limit || '',
    location: initialData?.location || '',
    application_start: initialData?.application_start || '',
    application_end: initialData?.application_end || '',
    status: initialData?.status || 'open',
    summary: initialData?.summary || '',
    content: initialData?.content || '',
    official_link: initialData?.official_link || '',
    apply_url: initialData?.apply_url || '',
    cover_color: initialData?.cover_color || '#0f2d3d',
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function generateSlug() {
    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    update('slug', slug);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...form,
      vacancies: form.vacancies ? parseInt(form.vacancies) : null,
      application_start: form.application_start || null,
      application_end: form.application_end || null,
    };

    const url = postId ? `/api/admin/posts/${postId}` : '/api/admin/posts';
    const method = postId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to save');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && <p className="text-red-600 bg-red-50 p-3 rounded-lg text-sm">{error}</p>}

      <div>
        <label className="block text-sm font-medium mb-1">Type *</label>
        <select
          value={form.type}
          onChange={(e) => update('type', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          required
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>{t.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Slug * (URL-friendly)</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => update('slug', e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
            required
          />
          <button
            type="button"
            onClick={generateSlug}
            className="bg-gray-100 px-4 rounded-lg text-sm font-medium"
          >
            Generate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
  <label className="block text-sm font-medium mb-1">Category</label>
  <select
    value={form.category}
    onChange={(e) => update('category', e.target.value)}
    className="w-full border border-gray-300 rounded-lg px-3 py-2"
  >
    <option value="">Select category</option>
    {categoryGroups.map((group) => (
      <optgroup key={group.groupSlug} label={group.group}>
        {group.categories.map((cat) => (
          <option key={cat.id} value={cat.slug}>{cat.name_en}</option>
        ))}
      </optgroup>
    ))}
  </select>
</div>
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <input
            type="text"
            value={form.state}
            onChange={(e) => update('state', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <input
            type="text"
            value={form.department}
            onChange={(e) => update('department', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Organization</label>
          <input
            type="text"
            value={form.organization}
            onChange={(e) => update('organization', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Vacancies</label>
          <input
            type="number"
            value={form.vacancies}
            onChange={(e) => update('vacancies', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Salary</label>
          <input
            type="text"
            value={form.salary}
            onChange={(e) => update('salary', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Age Limit</label>
          <input
            type="text"
            value={form.age_limit}
            onChange={(e) => update('age_limit', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Application Start</label>
          <input
            type="date"
            value={form.application_start}
            onChange={(e) => update('application_start', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Application End</label>
          <input
            type="date"
            value={form.application_end}
            onChange={(e) => update('application_end', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={form.status}
          onChange={(e) => update('status', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="upcoming">Upcoming</option>
          <option value="open">Open</option>
          <option value="closing_soon">Closing Soon</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Summary (short, for cards)</label>
        <textarea
          value={form.summary}
          onChange={(e) => update('summary', e.target.value)}
          rows={2}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Content * (use **Heading** for headings, "- item" for bullets)
        </label>
        <textarea
          value={form.content}
          onChange={(e) => update('content', e.target.value)}
          rows={16}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Official Link</label>
          <input
            type="url"
            value={form.official_link}
            onChange={(e) => update('official_link', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Apply URL</label>
          <input
            type="url"
            value={form.apply_url}
            onChange={(e) => update('apply_url', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-[var(--color-teal)] text-white font-semibold px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {saving ? 'Saving...' : postId ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
}