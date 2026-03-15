import { Header } from '@/components/header';
import { locales } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!locales.includes(params.locale as (typeof locales)[number])) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header locale={params.locale as any} />
      {children}
    </div>
  );
}
