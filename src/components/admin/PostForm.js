'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import categoryGroups from '@/data/categories.json';

const TYPES = ['job', 'result', 'admit_card', 'answer_key', 'scheme', 'blog'];

const TYPE_LABELS = {
  job: 'Job Notification',
  result: 'Result',
  admit_card: 'Admit Card / Hall Ticket',
  answer_key: 'Answer Key',
  scheme: 'Government Scheme',
  blog: 'Blog / Study Material',
};

export default function PostForm({ initialData, postId }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const initialDatesArray = (() => {
    if (!initialData?.important_dates) return [];
    try {
      const obj =
        typeof initialData.important_dates === 'string'
          ? JSON.parse(initialData.important_dates)
          : initialData.important_dates;
      return Object.entries(obj).map(([key, value]) => ({ key, value: String(value) }));
    } catch {
      return [];
    }
  })();

  const [form, setForm] = useState({
    type: initialData?.type || 'job',
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || '',
    state: initialData?.state || '',
    location: initialData?.location || '',
    department: initialData?.department || '',
    organization: initialData?.organization || '',
    qualification: initialData?.qualification || '',
    vacancies: initialData?.vacancies || '',
    salary: initialData?.salary || '',
    age_limit: initialData?.age_limit || '',
    application_start: initialData?.application_start || '',
    application_end: initialData?.application_end || '',
    exam_date: initialData?.exam_date || '',
    admit_card_date: initialData?.admit_card_date || '',
    result_date: initialData?.result_date || '',
    status: initialData?.status || 'open',
    recruitment_group: initialData?.recruitment_group || '',
    summary: initialData?.summary || '',
    content: initialData?.content || '',
    official_link: initialData?.official_link || '',
    apply_url: initialData?.apply_url || '',
    admit_card_url: initialData?.admit_card_url || '',
    result_url: initialData?.result_url || '',
    cover_color: initialData?.cover_color || '#0f2d3d',
    // Scheme-specific fields
    beneficiary: initialData?.beneficiary || '',
    scheme_amount: initialData?.scheme_amount || '',
    launched_by: initialData?.launched_by || '',
    // Quick link fields
    is_quick_link: initialData?.is_quick_link || false,
    quick_link_label: initialData?.quick_link_label || '',
    quick_link_color: initialData?.quick_link_color || '#00897B',
  });

  const [importantDates, setImportantDates] = useState(
    initialDatesArray.length ? initialDatesArray : [{ key: '', value: '' }]
  );

  const type = form.type;
  const isJob = type === 'job';
  const isResult = type === 'result';
  const isAdmitCard = type === 'admit_card';
  const isAnswerKey = type === 'answer_key';
  const isScheme = type === 'scheme';
  const isBlog = type === 'blog';

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

  function updateDateRow(index, field, value) {
    setImportantDates((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function addDateRow() {
    setImportantDates((prev) => [...prev, { key: '', value: '' }]);
  }

  function removeDateRow(index) {
    setImportantDates((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const datesObject = {};
    importantDates.forEach(({ key, value }) => {
      if (key.trim()) {
        datesObject[key.trim().replace(/\s+/g, '_').toLowerCase()] = value;
      }
    });

    const payload = {
      ...form,
      vacancies: form.vacancies ? parseInt(form.vacancies) : null,
      application_start: form.application_start || null,
      application_end: form.application_end || null,
      exam_date: form.exam_date || null,
      admit_card_date: form.admit_card_date || null,
      result_date: form.result_date || null,
      recruitment_group: form.recruitment_group || null,
      location: form.location || null,
      admit_card_url: form.admit_card_url || null,
      result_url: form.result_url || null,
      important_dates: Object.keys(datesObject).length ? datesObject : null,
      is_quick_link: form.is_quick_link,
      quick_link_label: form.quick_link_label || null,
      quick_link_color: form.quick_link_color,
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

      {/* ---------------- Type ---------------- */}
      <div>
        <label className="block text-sm font-medium mb-1">Post Type *</label>
        <select
          value={form.type}
          onChange={(e) => update('type', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          required
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>{TYPE_LABELS[t]}</option>
          ))}
        </select>
        <p className="text-xs text-gray-400 mt-1">
          {isJob && 'Full recruitment details: vacancies, salary, dates, eligibility.'}
          {(isResult || isAdmitCard || isAnswerKey) && 'A lighter update tied to an existing recruitment.'}
          {isScheme && 'Government scheme details: beneficiaries, amount/benefit, launching authority.'}
          {isBlog && 'Study material, guides, and general articles — no recruitment fields needed.'}
        </p>
      </div>

      {/* ---------------- Basic Info (all types) ---------------- */}
      <div>
        <label className="block text-sm font-medium mb-1">Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder={
            isBlog
              ? 'e.g. How to Apply for TGPSC Group-2 Online — Step by Step Guide'
              : isScheme
              ? 'e.g. Rythu Bandhu Scheme 2026 – Farmer Investment Support'
              : 'e.g. TGPSC Group-2 Services Recruitment 2026'
          }
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
            placeholder="auto-generated-from-title"
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

      {/* Recruitment Group — hide for blog and scheme */}
      {!isBlog && !isScheme && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Recruitment Group{' '}
            <span className="text-gray-400 font-normal">
              (links this post to its notification/admit card/result set)
            </span>
          </label>
          <input
            type="text"
            value={form.recruitment_group}
            onChange={(e) => update('recruitment_group', e.target.value)}
            placeholder="e.g. tgpsc-group2-2026"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      )}

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
            placeholder="Telangana / Andhra Pradesh / All India"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {!isBlog && (
        <div>
          <label className="block text-sm font-medium mb-1">Location (district / city / area)</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => update('location', e.target.value)}
            placeholder="e.g. Hyderabad, Multiple Districts, Telangana State"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      )}

      {/* Department / Organization — keep visible for schemes */}
      {!isBlog && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <input
              type="text"
              value={form.department}
              onChange={(e) => update('department', e.target.value)}
              placeholder="e.g. Revenue, Excise, School Education"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Organization</label>
            <input
              type="text"
              value={form.organization}
              onChange={(e) => update('organization', e.target.value)}
              placeholder="e.g. TGPSC, TSLPRB, TSRTC"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
      )}

      {/* ---------------- Job-only fields ---------------- */}
      {isJob && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Vacancies</label>
              <input
                type="number"
                value={form.vacancies}
                onChange={(e) => update('vacancies', e.target.value)}
                placeholder="e.g. 891"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Salary</label>
              <input
                type="text"
                value={form.salary}
                onChange={(e) => update('salary', e.target.value)}
                placeholder="e.g. Rs. 22,460 - Rs. 66,330"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age Limit</label>
              <input
                type="text"
                value={form.age_limit}
                onChange={(e) => update('age_limit', e.target.value)}
                placeholder="e.g. 18-44 years"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Qualification</label>
            <input
              type="text"
              value={form.qualification}
              onChange={(e) => update('qualification', e.target.value)}
              placeholder="e.g. Bachelor Degree, Intermediate, 10th Pass"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-sm mb-4 text-[#123C69]">Application Window</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Application Start</label>
                <input
                  type="date"
                  value={form.application_start}
                  onChange={(e) => update('application_start', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p className="text-xs text-gray-400 mt-1">Date the online application opens.</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Application End</label>
                <input
                  type="date"
                  value={form.application_end}
                  onChange={(e) => update('application_end', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p className="text-xs text-gray-400 mt-1">Last date to apply — powers the "Closing Soon" badge.</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ---------------- Result-only field ---------------- */}
      {isResult && (
        <div>
          <label className="block text-sm font-medium mb-1">Result Date</label>
          <input
            type="date"
            value={form.result_date}
            onChange={(e) => update('result_date', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <p className="text-xs text-gray-400 mt-1">Date the result was officially declared.</p>
        </div>
      )}

      {/* ---------------- Admit Card-only fields ---------------- */}
      {isAdmitCard && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Admit Card Release Date</label>
            <input
              type="date"
              value={form.admit_card_date}
              onChange={(e) => update('admit_card_date', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Exam Date</label>
            <input
              type="date"
              value={form.exam_date}
              onChange={(e) => update('exam_date', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            <p className="text-xs text-gray-400 mt-1">The exam this hall ticket is for.</p>
          </div>
        </div>
      )}

      {/* ---------------- Answer Key-only field ---------------- */}
      {isAnswerKey && (
        <div>
          <label className="block text-sm font-medium mb-1">Exam Date</label>
          <input
            type="date"
            value={form.exam_date}
            onChange={(e) => update('exam_date', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <p className="text-xs text-gray-400 mt-1">The exam this answer key corresponds to.</p>
        </div>
      )}

      {/* ---------------- Scheme-only fields ---------------- */}
      {isScheme && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Beneficiary</label>
            <input
              type="text"
              value={form.beneficiary}
              onChange={(e) => update('beneficiary', e.target.value)}
              placeholder="e.g. Farmers, Women, Students"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Scheme Amount / Benefit</label>
            <input
              type="text"
              value={form.scheme_amount}
              onChange={(e) => update('scheme_amount', e.target.value)}
              placeholder="e.g. Rs. 10,000 per acre per year"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Launched By</label>
            <input
              type="text"
              value={form.launched_by}
              onChange={(e) => update('launched_by', e.target.value)}
              placeholder="e.g. Government of Telangana"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
      )}

      {/* ---------------- Status (skip for blog) ---------------- */}
      {!isBlog && (
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
      )}

      {/* ---------------- Important Dates box (job, admit_card, answer_key) ---------------- */}
      {(isJob || isAdmitCard || isAnswerKey) && (
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-[#123C69]">
              Important Dates Box{' '}
              <span className="text-gray-400 font-normal">
                (highlighted card shown on the detail page)
              </span>
            </h3>
            <button
              type="button"
              onClick={addDateRow}
              className="text-xs font-semibold text-[#00897B] hover:underline"
            >
              + Add Row
            </button>
          </div>

          <div className="space-y-2">
            {importantDates.map((row, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={row.key}
                  onChange={(e) => updateDateRow(i, 'key', e.target.value)}
                  placeholder="Label (e.g. Notification Date)"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  value={row.value}
                  onChange={(e) => updateDateRow(i, 'value', e.target.value)}
                  placeholder="Value (e.g. 15 Aug 2026)"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeDateRow(i)}
                  className="px-3 text-red-500 hover:bg-red-50 rounded-lg text-sm font-medium"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- Quick Links (job / result / admit_card / answer_key only) ---------------- */}
      {!isBlog && !isScheme && (
        <div className="border-t pt-6">
          <label className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={form.is_quick_link}
              onChange={(e) => update('is_quick_link', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Show in homepage Quick Links</span>
          </label>

          {form.is_quick_link && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Quick Link Label</label>
                <input
                  type="text"
                  value={form.quick_link_label}
                  onChange={(e) => update('quick_link_label', e.target.value)}
                  placeholder="Short button text, e.g. TGPSC Group-2 Apply Online"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Button Color</label>
                <input
                  type="color"
                  value={form.quick_link_color}
                  onChange={(e) => update('quick_link_color', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg h-10"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---------------- Content (all types) ---------------- */}
      <div>
        <label className="block text-sm font-medium mb-1">Summary (short, for cards)</label>
        <textarea
          value={form.summary}
          onChange={(e) => update('summary', e.target.value)}
          rows={2}
          placeholder="One or two sentences shown on listing cards"
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
          placeholder={
            isBlog
              ? '**Overview**\nStart with an intro paragraph...\n\n**Key Points**\n- First point\n- Second point'
              : isScheme
              ? '**Overview**\nDescribe the scheme...\n\n**Eligibility**\n- ...\n\n**How to Apply**\n- ...'
              : '**Overview**\nDescribe the recruitment/update...\n\n**Key Highlights**\n- Total vacancies: ...\n- Eligibility: ...'
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
          required
        />
      </div>

      {/* ---------------- Links ---------------- */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-sm mb-4 text-[#123C69]">Links</h3>

        {isBlog ? (
          <div>
            <label className="block text-sm font-medium mb-1">Reference Link (optional)</label>
            <input
              type="url"
              value={form.official_link}
              onChange={(e) => update('official_link', e.target.value)}
              placeholder="https://..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Official Website Link</label>
              <input
                type="url"
                value={form.official_link}
                onChange={(e) => update('official_link', e.target.value)}
                placeholder="https://tspsc.gov.in"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            {isJob && (
              <div>
                <label className="block text-sm font-medium mb-1">Apply URL</label>
                <input
                  type="url"
                  value={form.apply_url}
                  onChange={(e) => update('apply_url', e.target.value)}
                  placeholder="Direct application link, if known"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            )}

            {isAdmitCard && (
              <div>
                <label className="block text-sm font-medium mb-1">Admit Card Download URL</label>
                <input
                  type="url"
                  value={form.admit_card_url}
                  onChange={(e) => update('admit_card_url', e.target.value)}
                  placeholder="Direct download link, if known"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            )}

            {isResult && (
              <div>
                <label className="block text-sm font-medium mb-1">Result / Scorecard URL</label>
                <input
                  type="url"
                  value={form.result_url}
                  onChange={(e) => update('result_url', e.target.value)}
                  placeholder="Direct result link, if known"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            )}
          </div>
        )}
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