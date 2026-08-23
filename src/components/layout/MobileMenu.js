'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import navData from '@/data/nav.json';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button onClick={() => setOpen(true)} aria-label="Open menu">
        <Menu className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] bg-[var(--color-navy)] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <span className="font-bold text-lg text-white">Menu</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-4">
            {navData.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-white text-base font-medium py-3 border-b border-white/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}