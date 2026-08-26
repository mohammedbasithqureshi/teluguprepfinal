import Link from 'next/link';

const links = [
  { label: 'TGPSC Group-2 Apply Online', href: '/jobs?category=tg-tgpsc-group2', color: 'bg-[#7CB342]' },
  { label: 'Telangana Police Apply Online', href: '/jobs?category=tg-police-constable', color: 'bg-[#1E88E5]' },
  { label: 'Anganwadi Recruitment Apply', href: '/jobs?category=tg-panchayat-secretary', color: 'bg-[#FB8C00]' },
  { label: 'APPSC Group-2 Apply Online', href: '/jobs?category=ap-appsc-group2', color: 'bg-[#C62828]' },
  { label: 'SSC CGL Apply Online', href: '/jobs?category=c-ssc', color: 'bg-[#2E7D32]' },
  { label: 'Railway RRB Apply Online', href: '/jobs?category=c-railways', color: 'bg-[#D81B60]' },
  { label: 'Latest Government Schemes', href: '/schemes', color: 'bg-[#00897B]' },
  { label: 'Eligibility Checker', href: '/eligibility-check', color: 'bg-[#5E35B1]' },
];

export default function QuickLinksGrid() {
  return (
    <section className="container-page py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${link.color} text-white font-bold text-center rounded-xl px-4 py-5 text-sm hover:brightness-110 transition shadow-sm`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}