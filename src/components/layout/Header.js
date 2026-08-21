import Link from 'next/link';
import navData from '@/data/nav.json';

export default function Header() {
  return (
    <header className="bg-[var(--color-navy)] text-white sticky top-0 z-50">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="bg-[var(--color-teal)] text-white w-9 h-9 flex items-center justify-center rounded-md">
            TP
          </span>
          Telugu <span className="text-[var(--color-amber)]">Prep</span>
        </Link>

        <nav className="hidden lg:flex gap-6 text-sm font-medium">
          {navData.mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[var(--color-amber)]">
              {item.label}
            </Link>
          ))}
        </nav>
        <button className="hidden lg:block text-white">🔍</button>
      </div>
    </header>
  );
}