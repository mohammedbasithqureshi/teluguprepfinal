'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import navData from '@/data/nav.json';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent background scrolling while menu is open
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // Close menu with Escape key
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      {/* Menu Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-md
          border
          border-gray-200
          bg-white
          text-[#123C69]
          transition
          hover:bg-gray-50
          active:scale-95
        "
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Menu */}
      {open && (
        <div
          className="
            fixed
            inset-0
            z-[60]
            flex
            flex-col
            bg-[var(--color-navy)]
          "
        >
          {/* Header */}
          <div
            className="
              flex
              shrink-0
              items-center
              justify-between
              border-b
              border-white/10
              px-4
              py-3
            "
          >
            <div>
              <span className="block text-lg font-bold text-white">
                Telugu Prep
              </span>

              <span className="text-[11px] text-white/60">
                Government Jobs & Exam Updates
              </span>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-md
                text-white
                hover:bg-white/10
                active:scale-95
              "
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-3">
            <div className="flex flex-col">
              {navData?.mainNav?.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' &&
                    pathname.startsWith(`${item.href}/`));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`
                      flex
                      min-h-[48px]
                      items-center
                      border-b
                      border-white/10
                      px-2
                      py-3
                      text-[15px]
                      font-semibold
                      transition
                      ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-white/90 hover:bg-white/5 hover:text-white'
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Bottom */}
          <div
            className="
              shrink-0
              border-t
              border-white/10
              px-4
              py-3
              text-center
            "
          >
            <p className="text-[11px] text-white/50">
              Telugu Prep
            </p>
          </div>
        </div>
      )}
    </div>
  );
}