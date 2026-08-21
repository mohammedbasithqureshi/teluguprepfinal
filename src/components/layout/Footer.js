import Link from 'next/link';
import navData from '@/data/nav.json';
import { Mail, ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-navy-dark)] text-slate-100 border-t border-slate-800 font-sans mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-white">
              <span className="bg-[var(--color-teal)] text-white w-8 h-8 flex items-center justify-center rounded-md font-black text-sm">
                TP
              </span>
              <span>
                Telugu <span className="text-[var(--color-amber)]">Prep</span>
              </span>
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Daily government job notifications, results, admit cards, and free study material for Telangana & Andhra Pradesh aspirants.
            </p>

            <div className="pt-1">
              <a 
                href="mailto:support@teluguprep.in"
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-[var(--color-amber)] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--color-amber)]" />
                <span>support@teluguprep.in</span>
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">Explore</h4>
            <ul className="space-y-2 text-xs">
              {navData.footerExplore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-300 hover:text-[var(--color-amber)] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="text-slate-300 hover:text-[var(--color-amber)] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-[var(--color-amber)] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">Legal</h4>
            <ul className="space-y-2 text-xs">
              {navData.footerLegal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-300 hover:text-[var(--color-amber)] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-black/30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <ShieldAlert className="w-3.5 h-3.5 text-[var(--color-amber)] shrink-0 hidden sm:block" />
            <span><strong>Disclaimer:</strong> Information collected from official sources; verify on the official website before applying.</span>
          </div>
          <div className="shrink-0">© 2026 TeluguPrep.in</div>
        </div>
      </div>
    </footer>
  );
}