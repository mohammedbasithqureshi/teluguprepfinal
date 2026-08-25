'use client';

import { useState } from 'react';
import Link from 'next/link';

const INITIAL_VISIBLE = 8;

export default function CategoryGroupBlock({ group, counts }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? group.categories : group.categories.slice(0, INITIAL_VISIBLE);
  const hasMore = group.categories.length > INITIAL_VISIBLE;

  return (
    <div>
      <p className="text-sm font-semibold text-[#123C69] mb-3">{group.group}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {visible.map((cat) => (
          <Link
            key={cat.id}
            href={`/jobs?category=${cat.slug}`}
            className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-[#00897B] hover:shadow-md transition"
          >
            <div className="font-semibold text-[#123C69] text-sm line-clamp-2">{cat.name_en}</div>
            <div className="text-xs text-gray-400 mt-1">{counts[cat.slug]} posts</div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 text-sm font-semibold text-[#00897B] hover:underline"
        >
          {expanded ? '− Show less' : `+ Show ${group.categories.length - INITIAL_VISIBLE} more`}
        </button>
      )}
    </div>
  );
}