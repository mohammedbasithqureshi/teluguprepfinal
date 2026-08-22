'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import categories from '@/data/categories.json';

export default function CategoryFilter({ basePath }) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  const filterItems = [
    { id: 'all', slug: null, label: 'All' },
    ...categories.map((cat) => ({
      id: cat.id,
      slug: cat.slug,
      label: cat.name_en,
    })),
  ];

  return (
    <nav className="relative mb-8 w-full" aria-label="Category filter">
      <div className="relative flex items-center">
        <div className="flex w-full items-center gap-1.5 overflow-x-auto p-1.5 scrollbar-none snap-x snap-mandatory">
          {filterItems.map((item) => {
            const isActive = item.slug
              ? activeCategory === item.slug
              : !activeCategory;

            const href = item.slug ? `${basePath}?category=${item.slug}` : basePath;

            return (
              <Link
                key={item.id}
                href={href}
                scroll={false}
                className={`relative z-10 inline-flex snap-start items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 outline-none select-none whitespace-nowrap ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                }`}
              >
                {/* Active Tab Background Pill */}
                {isActive && (
                  <motion.span
                    layoutId="activeFilterBg"
                    className="absolute inset-0 z-[-1] rounded-full bg-[var(--color-teal,#0d9488)] shadow-md shadow-teal-500/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover Glass Pill for Inactive Tabs */}
                {!isActive && (
                  <span className="absolute inset-0 z-[-1] rounded-full bg-slate-100/0 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/60" />
                )}

                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}