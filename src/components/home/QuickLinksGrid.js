import Link from 'next/link';

const telanganaLinks = [
  {
    label: 'TGPSC Group-2 Apply Online',
    href: '/jobs?category=tg-tgpsc-group2',
    color: 'bg-[#7CB342]',
  },
  {
    label: 'Telangana Police Apply Online',
    href: '/jobs?category=tg-police-constable',
    color: 'bg-[#1E88E5]',
  },
  {
    label: 'Anganwadi Recruitment Apply',
    href: '/jobs?category=tg-panchayat-secretary',
    color: 'bg-[#FB8C00]',
  },
  {
    label: 'Telangana Govt Schemes',
    href: '/schemes',
    color: 'bg-[#00897B]',
  },
];

const centralLinks = [
  {
    label: 'SSC CGL Apply Online',
    href: '/jobs?category=c-ssc',
    color: 'bg-[#00897B]',
  },
  {
    label: 'Railway RRB Apply Online',
    href: '/jobs?category=c-railways',
    color: 'bg-[#00897B]',
  },
  {
    label: 'UPSC Notifications',
    href: '/jobs?category=c-upsc',
    color: 'bg-[#00897B]',
  },
  {
    label: 'Eligibility Checker',
    href: '/eligibility-check',
    color: 'bg-[#5E35B1]',
  },
];

function LinkRow({ title, links }) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
        {title}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${link.color} text-white font-bold text-center rounded-lg sm:rounded-xl px-2 sm:px-4 py-3 sm:py-5 text-xs sm:text-sm leading-tight hover:brightness-110 transition shadow-sm min-h-[64px] sm:min-h-[80px] flex items-center justify-center`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function QuickLinksGrid() {
  return (
    <section className="container-page py-6 md:py-8">
      <LinkRow
        title="Telangana"
        links={telanganaLinks}
      />

      <LinkRow
        title="Central Government"
        links={centralLinks}
      />
    </section>
  );
}