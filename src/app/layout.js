import { Inter, Noto_Sans_Telugu } from 'next/font/google';
import Script from 'next/script';


import './globals.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';
import AlertBanner from '@/components/layout/AlertBanner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const notoTelugu = Noto_Sans_Telugu({
  subsets: ['telugu'],
  variable: '--font-telugu',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0f2d3d',
};

export const metadata = {
  title: {
    default: 'Telugu Prep - Government Job Updates, Results & Study Material',
    template: '%s | Telugu Prep',
  },

  description:
    'Daily notifications, results, admit cards and free study material for Telangana and Andhra Pradesh government exams.',

  metadataBase: new URL('https://teluguprep.in'),

  manifest: '/manifest.json',

  openGraph: {
    title: 'Telugu Prep - Government Job Updates & Study Material',
    description:
      'Daily job notifications, results and admit cards for Telangana and Andhra Pradesh exams.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://teluguprep.in',
    siteName: 'Telugu Prep',
  },

  robots: {
    index: true,
    follow: true,
  },

  other: {
    // Google AdSense
    'google-adsense-account': 'ca-pub-9039316648016229',

    
  },

  verification: {
    google: 'W9CvkvKGBAnOPveg6lXGmbix17RQZE83sxvkoLPODfA',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${notoTelugu.variable} font-sans antialiased`}
      >
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9039316648016229"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

      

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LJC2CZNPGZ"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              window.dataLayer.push(arguments);
            }

            gtag('js', new Date());
            gtag('config', 'G-LJC2CZNPGZ');
          `}
        </Script>

        <TopBar />
        <AlertBanner />
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}