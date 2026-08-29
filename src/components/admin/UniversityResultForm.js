'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UniversityResultForm({ initialData, resultId }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    university: initialData?.university || '',
    summary: initialData?.summary || '',
    content: initialData?.content || '',
    result_published_date: initialData?.result_published_date || '',
    official_link: initialData?.official_link || '',
  });

  const [courses, setCourses] = useState(
    initialData?.courses?.length ? initialData.courses : []
  );
  const [howToCheck, setHowToCheck] = useState(
    initialData?.how_to_check?.length
      ? initialData.how_to_check
      : [
          'Visit the official results portal',
          'Enter your Hall Ticket Number',
          'Enter your Date of Birth',
          'Enter the Captcha code',
          'Click Submit to view your result',
        ]
  );
  const [notes, setNotes] = useState(initialData?.notes?.length ? initialData.notes : []);

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

  // Course helpers
  function addCourse() {
    setCourses((prev) => [...prev, { course_name: '', links: [{ label: 'Result Link 1', url: '' }] }]);
  }
  function removeCourse(i) {
    setCourses((prev) => prev.filter((_, idx) => idx !== i));
  }
  function updateCourseName(i, value) {
    setCourses((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], course_name: value };
      return next;
    });
  }
  function addLink(ci) {
    setCourses((prev) => {
      const next = [...prev];
      const links = next[ci].links;
      next[ci] = { ...next[ci], links: [...links, { label: `Result Link ${links.length + 1}`, url: '' }] };
      return next;
    });
  }
  function updateLink(ci, li, field, value) {
    setCourses((prev) => {
      const next = [...prev];
      const links = [...next[ci].links];
      links[li] = { ...links[li], [field]: value };
      next[ci] = { ...next[ci], links };
      return next;
    });
  }
  function removeLink(ci, li) {
    setCourses((prev) => {
      const next = [...prev];
      next[ci] = { ...next[ci], links: next[ci].links.filter((_, idx) => idx !== li) };
      return next;
    });
  }

  // How-to-check helpers
  function updateStep(i, value) {
    setHowToCheck((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  }
  function addStep() {
    setHowToCheck((prev) => [...prev, '']);
  }
  function removeStep(i) {
    setHowToCheck((prev) => prev.filter((_, idx) => idx !== i));
  }

  // Notes helpers
  function updateNote(i, value) {
    setNotes((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  }
  function addNote() {
    setNotes((prev) => [...prev, '']);
  }
  function removeNote(i) {
    setNotes((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...form,
      content: form.content,
      courses: courses.filter((c) => c.course_name.trim()),
      how_to_check: howToCheck.filter((s) => s.trim()),
      notes: notes.filter((n) => n.trim()),
    };

    const url = resultId ? `/api/admin/university-results/${resultId}` : '/api/admin/university-results';
    const method = resultId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (res.ok) {
      router.push('/admin/university-results');
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
        <label className="block text-sm font-medium mb-1">University *</label>
        <input
          type="text"
          value={form.university}
          onChange={(e) => update('university', e.target.value)}
          placeholder="e.g. JNTU Hyderabad, Osmania University"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="e.g. JNTUH B.Pharmacy 4-1, 4-2 Semester Results — July 2026"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Slug *</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => update('slug', e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
            required
          />
          <button type="button" onClick={generateSlug} className="bg-gray-100 px-4 rounded-lg text-sm font-medium">
            Generate
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Summary</label>
        <textarea
          value={form.summary}
          onChange={(e) => update('summary', e.target.value)}
          rows={2}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Detailed Content (optional — use **Heading** for headings, "- item" for bullets)
        </label>
        <textarea
          value={form.content}
          onChange={(e) => update('content', e.target.value)}
          rows={10}
          placeholder={"**Overview**\nExtra context about the exam results...\n\n**Revaluation Policy**\n- Point 1\n- Point 2"}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Result Published Date (text)</label>
        <input
          type="text"
          value={form.result_published_date}
          onChange={(e) => update('result_published_date', e.target.value)}
          placeholder="e.g. 11-08-2026"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      {/* Courses */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-[#123C69]">Course-wise Result Links</h3>
          <button type="button" onClick={addCourse} className="text-xs font-semibold text-[#00897B] hover:underline">
            + Add Course
          </button>
        </div>

        <div className="space-y-4">
          {courses.map((course, ci) => (
            <div key={ci} className="border border-gray-200 rounded-lg p-4">
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={course.course_name}
                  onChange={(e) => updateCourseName(ci, e.target.value)}
                  placeholder="e.g. B.Tech IV Year II Semester (R22) Regular"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium"
                />
                <button type="button" onClick={() => removeCourse(ci)} className="px-3 text-red-500 hover:bg-red-50 rounded-lg text-sm">
                  ✕ Remove
                </button>
              </div>

              <div className="space-y-2 pl-2">
                {course.links.map((link, li) => (
                  <div key={li} className="flex gap-2">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => updateLink(ci, li, 'label', e.target.value)}
                      placeholder="Label"
                      className="w-32 border border-gray-300 rounded-lg px-2 py-1.5 text-xs"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateLink(ci, li, 'url', e.target.value)}
                      placeholder="https://..."
                      className="flex-1 border border-gray-300 rounded-lg px-2 py-1.5 text-xs"
                    />
                    <button type="button" onClick={() => removeLink(ci, li)} className="px-2 text-red-500 text-xs">
                      ✕
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => addLink(ci)} className="text-xs font-semibold text-[#00897B] hover:underline">
                  + Add another link
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to check */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-[#123C69]">How to Check Your Result — Steps</h3>
          <button type="button" onClick={addStep} className="text-xs font-semibold text-[#00897B] hover:underline">
            + Add Step
          </button>
        </div>
        <div className="space-y-2">
          {howToCheck.map((step, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={step}
                onChange={(e) => updateStep(i, e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <button type="button" onClick={() => removeStep(i)} className="px-3 text-red-500 text-sm">
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-[#123C69]">Important Notes</h3>
          <button type="button" onClick={addNote} className="text-xs font-semibold text-[#00897B] hover:underline">
            + Add Note
          </button>
        </div>
        <div className="space-y-2">
          {notes.map((note, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={note}
                onChange={(e) => updateNote(i, e.target.value)}
                placeholder="e.g. Last date to apply for Recounting: 18-08-2026"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <button type="button" onClick={() => removeNote(i)} className="px-3 text-red-500 text-sm">
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Official Results Portal Link</label>
        <input
          type="url"
          value={form.official_link}
          onChange={(e) => update('official_link', e.target.value)}
          placeholder="https://results.jntuh.ac.in"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-[#123C69] text-white font-semibold px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {saving ? 'Saving...' : resultId ? 'Update Result' : 'Create Result'}
      </button>
    </form>
  );
}