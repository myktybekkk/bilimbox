import { Header } from '@/components/header';
import { locales } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header locale={locale as any} />
      {children}
    </div>
  );
}
