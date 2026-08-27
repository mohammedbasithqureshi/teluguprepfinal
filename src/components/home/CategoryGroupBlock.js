'use client';

import { useState } from 'react';
import Link from 'next/link';

const INITIAL_VISIBLE = 8;

export default function CategoryGroupBlock({ group, counts }) {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded
    ? group.categories
    : group.categories.slice(0, INITIAL_VISIBLE);

  const hasMore = group.categories.length > INITIAL_VISIBLE;

  return (
    <div>
      {/* Group Name */}
      <p className="text-xs sm:text-sm font-semibold text-[#123C69] mb-2 md:mb-3">
        {group.group}
      </p>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3">
        {visible.map((cat) => (
          <Link
            key={cat.id}
            href={`/jobs?category=${cat.slug}`}
            className="
              bg-white
              border
              border-gray-200
              rounded-md md:rounded-xl
              p-2 sm:p-3 md:p-4
              text-center
              hover:border-[#00897B]
              hover:shadow-md
              transition
              min-w-0
            "
          >
            {/* Category Name */}
            <div className="font-semibold text-[#123C69] text-xs sm:text-sm line-clamp-2 leading-4 sm:leading-5">
              {cat.name_en}
            </div>

            {/* Post Count */}
            <div className="text-[10px] sm:text-xs text-gray-400 mt-1">
              {counts[cat.slug]} posts
            </div>
          </Link>
        ))}
      </div>

      {/* Show More / Less */}
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-2 md:mt-3 text-xs sm:text-sm font-semibold text-[#00897B] hover:underline"
        >
          {expanded
            ? '− Show less'
            : `+ Show ${group.categories.length - INITIAL_VISIBLE} more`}
        </button>
      )}
    </div>
  );
}