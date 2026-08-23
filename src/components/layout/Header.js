import Link from 'next/link';
import Image from 'next/image';
import navData from '@/data/nav.json';
import MobileMenu from '@/components/layout/MobileMenu';

export default function Header() {
  return (
    <header className="bg-[var(--color-navy)] text-white sticky top-0 z-50">
      <div className="container-page flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Image
            src="/images/favicon-96x96.png"
            alt="Telugu Prep logo"
            width={36}
            height={36}
            className="rounded-md"
          />
          Telugu <span className="text-[var(--color-amber)]">Prep</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navData.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[var(--color-amber)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <div className="flex items-center gap-3">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}