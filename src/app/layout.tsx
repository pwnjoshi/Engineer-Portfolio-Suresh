import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://sureshpal.com.np'),
  title: {
    default: 'Suresh Pal | Engineering Student Portfolio',
    template: '%s | Suresh Pal',
  },
  description: 'Personal portfolio of Suresh Pal, an engineering student from Dadeldhura, Nepal. Built on service, precision, and engineering innovation.',
  keywords: [
    'Suresh Pal',
    'Suresh Pal Dadeldhura',
    'Engineering Student',
    'Dadeldhura',
    'Nepal',
    'Shree Purna Secondary School Kanchanpur',
    'Kanchanpur',
    'Tech Sangi',
    'Suresh Pal Portfolio',
  ],
  authors: [{ name: 'Suresh Pal' }],
  creator: 'Suresh Pal',
  publisher: 'Tech Sangi',
  openGraph: {
    type: 'website',
    locale: 'en_NP',
    url: 'https://sureshpal.com.np',
    title: 'Suresh Pal | Engineering Student Portfolio',
    description: 'Personal portfolio of Suresh Pal, an engineering student from Dadeldhura, Nepal. Built on service, precision, and engineering innovation.',
    siteName: 'Suresh Pal Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suresh Pal | Engineering Student Portfolio',
    description: 'Personal portfolio of Suresh Pal, an engineering student from Dadeldhura, Nepal. Built on service, precision, and engineering innovation.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
