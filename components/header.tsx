import Link from 'next/link';
import { getUi, locales, type Locale } from '@/lib/i18n';

export function Header({ locale }: { locale: Locale }) {
  const t = getUi(locale);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="text-xl font-black tracking-tight text-brand-700">
          {t.brand}
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href={`/${locale}/courses`} className="text-sm font-medium text-slate-700 hover:text-brand-700">
            {t.navCourses}
          </Link>
          <Link href={`/${locale}/dashboard`} className="text-sm font-medium text-slate-700 hover:text-brand-700">
            {t.navDashboard}
          </Link>
          <Link href={`/${locale}/admin`} className="text-sm font-medium text-slate-700 hover:text-brand-700">
            {t.navAdmin}
          </Link>
        </nav>
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1 text-sm">
          {locales.map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className={`rounded-xl px-3 py-1.5 font-semibold ${item === locale ? 'bg-brand-600 text-white' : 'text-slate-700'}`}
            >
              {item.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
