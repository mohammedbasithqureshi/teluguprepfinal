'use client';

import { useState } from 'react';
import Link from 'next/link';
import eligibilityRules from '@/data/eligibilityRules.json';

const REGIONS = [
  { id: 'telangana', label: 'Telangana' },
  { id: 'andhra-pradesh', label: 'Andhra Pradesh' },
  { id: 'central', label: 'Central Govt' },
];

const STATUS_STYLES = {
  eligible: { label: 'Eligible', badge: 'bg-green-50 text-green-700 border-green-200' },
  possibly_eligible: { label: 'Possibly Eligible', badge: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
};

function ResultCard({ job }) {
  const style = STATUS_STYLES[job.eligibilityStatus];
  return (
    <div className={`border rounded-xl p-4 ${style.badge.split(' ')[2]}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <Link href={`/jobs/${job.slug}`} className="font-semibold text-[#123C69] hover:underline flex-1">
          {job.title}
        </Link>
        <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${style.badge}`}>
          {style.label}
        </span>
      </div>
      {job.reasons?.length > 0 && (
        <ul className="text-xs text-gray-500 space-y-1 mt-2">
          {job.reasons.map((r, i) => (
            <li key={i}>• {r}</li>
          ))}
        </ul>
      )}
      <Link href={`/jobs/${job.slug}`} className="text-xs font-semibold text-[#00897B] hover:underline mt-3 inline-block">
        View full notification →
      </Link>
    </div>
  );
}

export default function EligibilityCheckPage() {
  const [step, setStep] = useState(1);
  const [region, setRegion] = useState('');
  const [qualification, setQualification] = useState('');
  const [engineeringBranch, setEngineeringBranch] = useState('');
  const [age, setAge] = useState('');
  const [casteId, setCasteId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleCheck() {
    setLoading(true);
    const res = await fetch('/api/eligibility-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ region, qualification, engineeringBranch, age, casteId }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
    setStep(4);
  }

  function reset() {
    setStep(1);
    setRegion('');
    setQualification('');
    setEngineeringBranch('');
    setAge('');
    setCasteId('');
    setResult(null);
  }

  return (
    <div className="container-page py-10 max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-bold text-[#123C69] mb-2">
        Government Job Eligibility Checker
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Answer a few quick questions to see which current notifications you may be eligible for.
        Nothing you enter is saved.
      </p>

      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-1.5 flex-1 rounded-full ${step >= s ? 'bg-[#00897B]' : 'bg-gray-200'}`} />
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="font-bold text-lg mb-4">Which region are you applying for?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => { setRegion(r.id); setStep(2); }}
                className="border-2 border-gray-200 hover:border-[#00897B] rounded-2xl p-6 text-center font-bold text-[#123C69] transition hover:shadow-md"
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-bold text-lg mb-4">What is your highest qualification?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {eligibilityRules.qualifications.map((q) => (
              <button
                key={q.id}
                onClick={() => {
                  setQualification(q.id);
                  setStep(q.id === 'btech' ? 2.5 : 3);
                }}
                className={`border-2 rounded-xl p-4 text-left font-medium transition ${
                  qualification === q.id ? 'border-[#00897B] bg-[#EAF8F6]' : 'border-gray-200 hover:border-[#00897B]'
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="mt-6 text-sm text-gray-500 hover:underline">← Back</button>
        </div>
      )}

      {step === 2.5 && (
        <div>
          <h2 className="font-bold text-lg mb-4">Which engineering branch?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {eligibilityRules.engineeringBranches.map((b) => (
              <button
                key={b.id}
                onClick={() => { setEngineeringBranch(b.id); setStep(3); }}
                className={`border-2 rounded-xl p-4 text-center font-medium transition ${
                  engineeringBranch === b.id ? 'border-[#00897B] bg-[#EAF8F6]' : 'border-gray-200 hover:border-[#00897B]'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="mt-6 text-sm text-gray-500 hover:underline">← Back</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="font-bold text-lg mb-4">Age and category (optional but improves accuracy)</h2>

          <label className="block text-sm font-medium mb-2">Your Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g. 24"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
          />

          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={casteId}
            onChange={(e) => setCasteId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6"
          >
            <option value="">Prefer not to say</option>
            {eligibilityRules.casteCategories.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(qualification === 'btech' ? 2.5 : 2)}
              className="text-sm text-gray-500 hover:underline"
            >
              ← Back
            </button>
            <button
              onClick={handleCheck}
              disabled={loading}
              className="ml-auto bg-[#00897B] hover:bg-[#00796B] text-white font-bold px-6 py-2.5 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'Check Eligibility →'}
            </button>
          </div>
        </div>
      )}

      {step === 4 && result && (
        <div>
          <div className="bg-gradient-to-r from-[#0f2d3d] to-[#00897B] text-white rounded-2xl p-6 mb-6 text-center">
            <p className="text-4xl font-extrabold">{result.eligible.length}</p>
            <p className="text-sm mt-1 opacity-90">
              notification{result.eligible.length === 1 ? '' : 's'} you appear eligible for
            </p>
            {result.possiblyEligible.length > 0 && (
              <p className="text-xs mt-2 opacity-75">
                + {result.possiblyEligible.length} possibly eligible (needs manual check)
              </p>
            )}
          </div>

          {result.casteNote && (
            <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 mb-6">
              <strong>Category note:</strong> {result.casteNote}
            </p>
          )}

          {result.eligible.length === 0 && result.possiblyEligible.length === 0 ? (
            <p className="text-gray-500 mb-6">
              No current matches found for this combination. Check back soon as new notifications are added daily.
            </p>
          ) : (
            <div className="space-y-6 mb-6">
              {result.eligible.length > 0 && (
                <div>
                  <h3 className="font-bold text-sm text-green-700 mb-3">✓ Eligible</h3>
                  <div className="space-y-3">
                    {result.eligible.map((job) => <ResultCard key={job.id} job={job} />)}
                  </div>
                </div>
              )}
              {result.possiblyEligible.length > 0 && (
                <div>
                  <h3 className="font-bold text-sm text-yellow-700 mb-3">? Possibly Eligible — Verify Manually</h3>
                  <div className="space-y-3">
                    {result.possiblyEligible.map((job) => <ResultCard key={job.id} job={job} />)}
                  </div>
                </div>
              )}
            </div>
          )}

          <button onClick={reset} className="text-sm font-semibold text-[#00897B] hover:underline">
            ← Check again with different details
          </button>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-10 border-t pt-4">
        This is only a preliminary eligibility result based on general patterns. The official recruitment notification is the final authority. Always verify qualification, age cut-off, category certificate, domicile, subject, physical, medical, and document requirements before applying.
      </p>
    </div>
  );
}