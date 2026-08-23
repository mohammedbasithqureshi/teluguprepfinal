'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import categoryGroups from '@/data/categories.json';

export default function CategoryFilter({ basePath }) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const currentGroup = categoryGroups.find(
    (group) => group.groupSlug === selectedGroup
  );

  return (
    <div className="mb-7">
      {/* Top Filter Bar */}
      <div className="flex flex-wrap items-center gap-2">
        {/* All Jobs */}
        <Link
          href={basePath}
          className={`inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
            !activeCategory
              ? 'border-[#123C69] bg-[#123C69] text-white shadow-md shadow-[#123C69]/20'
              : 'border-gray-200 bg-white text-gray-700 hover:border-[#123C69] hover:bg-[#F0F6FA] hover:text-[#123C69]'
          }`}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          All Jobs
        </Link>

        {/* Categories Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
            isOpen
              ? 'border-[#00897B] bg-[#00897B] text-white shadow-md shadow-[#00897B]/20'
              : 'border-gray-200 bg-white text-gray-700 hover:border-[#00897B] hover:bg-[#EAF8F6] hover:text-[#00796B]'
          }`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 6h18M6 12h12m-9 6h6"
            />
          </svg>

          Categories

          <svg
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m6 9 6 6 6-6"
            />
          </svg>
        </button>

        {/* Active Category */}
        {activeCategory && (
          <span className="inline-flex items-center rounded-full bg-[#FFF3E0] px-4 py-2 text-xs font-semibold text-[#E65100]">
            Filter: {activeCategory}
          </span>
        )}
      </div>

      {/* Category Panel */}
      {isOpen && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-[#D9E4EC] bg-white shadow-lg shadow-gray-200/50">
          {/* Panel Header */}
          <div className="border-b border-gray-100 bg-gradient-to-r from-[#F0F6FA] to-[#F7FCFB] px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#123C69]">
                  Find Jobs by Category
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Select a state to view available job categories
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white hover:text-gray-700"
                aria-label="Close categories"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-5">
            {/* State / Region */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E8F1F8] text-[#123C69]">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
                    />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </span>

                <p className="text-sm font-bold text-gray-800">
                  Select State / Region
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {categoryGroups.map((group) => {
                  const isSelected =
                    selectedGroup === group.groupSlug;

                  return (
                    <button
                      key={group.groupSlug}
                      type="button"
                      onClick={() =>
                        setSelectedGroup(group.groupSlug)
                      }
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all duration-200 ${
                        isSelected
                          ? 'border-[#00897B] bg-[#00897B] text-white shadow-md shadow-[#00897B]/20'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-[#00897B] hover:bg-[#EAF8F6] hover:text-[#00796B]'
                      }`}
                    >
                      <span>{group.group}</span>

                      <svg
                        className={`h-4 w-4 ${
                          isSelected
                            ? 'text-white'
                            : 'text-gray-400'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9 18 6-6-6-6"
                        />
                      </svg>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sub Categories */}
            {currentGroup && (
              <div className="mt-6 border-t border-gray-100 pt-5">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#123C69]">
                      {currentGroup.group} Jobs
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Choose a category
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedGroup(null)}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Clear
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentGroup.categories.map((cat) => {
                    const isActive = activeCategory === cat.slug;

                    return (
                      <Link
                        key={cat.id}
                        href={`${basePath}?category=${cat.slug}`}
                        onClick={() => setIsOpen(false)}
                        className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'border-[#E65100] bg-[#E65100] text-white shadow-md shadow-[#E65100]/20'
                            : 'border-[#DDE7ED] bg-[#F8FAFC] text-gray-700 hover:-translate-y-0.5 hover:border-[#00897B] hover:bg-[#EAF8F6] hover:text-[#00796B] hover:shadow-sm'
                        }`}
                      >
                        {/* Small colored dot */}
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isActive
                              ? 'bg-white'
                              : 'bg-[#00897B]'
                          }`}
                        />

                        {cat.name_en}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}