import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Manifest - AI-Powered App Building Platform',
  description: 'Build websites and web applications using AI. Complete platform with integrated backend, database, and deployment.',
  keywords: ['AI', 'app building', 'website builder', 'no-code', 'low-code', 'SaaS'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
