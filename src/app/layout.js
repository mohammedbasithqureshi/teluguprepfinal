import { Inter, Noto_Sans_Telugu } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';
import AlertBanner from '@/components/layout/AlertBanner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoTelugu = Noto_Sans_Telugu({ subsets: ['telugu'], variable: '--font-telugu' });

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
    template: '%s',
  },
  description:
    'Daily notifications, results, admit cards and free study material for Telangana & Andhra Pradesh government exams. TSPSC, APPSC, Railways, Banking, Police, DSC and more.',
  metadataBase: new URL('https://teluguprep.in'),
  manifest: '/manifest.json',
  openGraph: {
    title: 'Telugu Prep - Government Job Updates & Study Material',
    description: 'Daily job notifications, results, admit cards for Telangana & AP exams.',
    type: 'website',
    locale: 'en_IN',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'google-adsense-account': 'ca-pub-9039316648016229',
  },
  verification: {
    google: 'W9CvkvKGBAnOPveg6lXGmbix17RQZE83sxvkoLPODfA',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${notoTelugu.variable} font-sans antialiased`}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9039316648016229"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <TopBar />
        <AlertBanner />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}