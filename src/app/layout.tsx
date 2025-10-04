import type { Metadata } from 'next';
import './globals.css';
import { AppShellController } from '@/components/AppShellController';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Paynest Lite',
  description: 'A simple system to help HR control the organization',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AppShellController>{children}</AppShellController>
        <Toaster />
      </body>
    </html>
  );
}
