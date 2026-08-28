'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function MonetagScript() {
  const pathname = usePathname();

  // Don't load Monetag on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <Script
      src="https://quge5.com/88/tag.min.js"
      data-zone="273961"
      strategy="afterInteractive"
      data-cfasync="false"
    />
  );
}