import './globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'BilimBox',
  description: 'Multilingual learning platform for courses, lessons, quizzes and progress tracking.'
};

const LOCALES = ['kg', 'ru', 'en'];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const h = headers();
  const pathname = h.get('x-pathname') ?? '/kg';
  const locale = LOCALES.find((l) => pathname.startsWith(`/${l}`)) ?? 'kg';

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
