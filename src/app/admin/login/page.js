'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

 async function handleSubmit(e) {
  e.preventDefault();
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (res.ok) {
    router.push('/admin');
  } else {
    const data = await res.json();
    setError(data.error || 'Incorrect password');
  }
}
  return (
    <div className="container-page py-20 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[var(--color-teal)] text-white font-semibold py-2 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}