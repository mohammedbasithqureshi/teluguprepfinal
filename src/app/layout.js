import { Inter, Noto_Sans_Telugu } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoTelugu = Noto_Sans_Telugu({ subsets: ['telugu'], variable: '--font-telugu' });

export const metadata = {
  title: 'Telugu Prep - Government Job Updates, Results & Study Material',
  description:
    'Daily notifications, results, admit cards and free study material for Telangana & Andhra Pradesh government exams. TSPSC, APPSC, Railways, Banking, Police, DSC and more.',
  metadataBase: new URL('https://teluguprep.in'),
  openGraph: {
    title: 'Telugu Prep - Government Job Updates & Study Material',
    description: 'Daily job notifications, results, admit cards for Telangana & AP exams.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${notoTelugu.variable} font-sans antialiased`}>
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}