'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import UniversityResultForm from '@/components/admin/UniversityResultForm';

export default function EditUniversityResultPage() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/university-results')
      .then((res) => res.json())
      .then((data) => {
        setResult(data.find((r) => r.id === id));
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container-page py-10">Loading...</div>;
  if (!result) return <div className="container-page py-10">Result not found.</div>;

  return (
    <div className="container-page py-10">
      <h1 className="text-2xl font-bold mb-6">Edit University Result</h1>
      <UniversityResultForm initialData={result} resultId={id} />
    </div>
  );
}