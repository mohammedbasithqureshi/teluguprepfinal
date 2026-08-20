import Link from 'next/link';
import navData from '@/data/nav.json';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-navy-dark)] text-gray-300 mt-16">
      <div className="container-page grid grid-cols-1 md:grid-cols-4 gap-10 py-14">
        <div>
          <div className="flex items-center gap-2 font-bold text-xl text-white mb-3">
            <span className="bg-[var(--color-orange)] text-white w-9 h-9 flex items-center justify-center rounded-md">
              TP
            </span>
            Telugu <span className="text-[var(--color-orange)]">Prep</span>
          </div>
          <p className="text-sm leading-relaxed">
            Daily government job notifications, results, admit cards and free study material for
            Telangana & Andhra Pradesh aspirants.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            {navData.footerExplore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[var(--color-orange)]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-[var(--color-orange)]">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--color-orange)]">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            {navData.footerLegal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[var(--color-orange)]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-gray-400">
        © 2026 TeluguPrep.in — All information is collected from official sources; verify on the
        official website before applying.
      </div>
    </footer>
  );
}