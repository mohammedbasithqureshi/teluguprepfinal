const tickerItems = [
  'TSPSC Group-2 Results Released',
  'AP Grama Sachivalayam Notification Out',
  'RRB Group-D Admit Card Download Link Active',
  'Telangana DSC 2026 Apply Online Started',
];

export default function TopBar() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="bg-[var(--color-teal-dark)] text-white text-xs md:text-sm py-2 overflow-hidden">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap px-6">
            <span className="mr-2">⚡</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}