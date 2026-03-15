import Link from 'next/link';
import { ProgressBar } from '@/components/progress-bar';
import { getDashboard } from '@/lib/data';
import { getUi, type Locale } from '@/lib/i18n';

export default async function DashboardPage({ params }: { params: { locale: Locale } }) {
  const dashboard = await getDashboard(params.locale);
  const t = getUi(params.locale);

  if (!dashboard) {
    return <main className="container-shell py-16">No user found.</main>;
  }

  return (
    <main className="container-shell py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{t.dashboardTitle}</div>
          <h1 className="mt-3 text-4xl font-black text-slate-900">{dashboard.user.name}</h1>
          <p className="mt-2 text-slate-600">{dashboard.user.email}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {dashboard.courses.map((course) => (
          <div key={course.slug} className="card p-6">
            <h2 className="text-2xl font-bold text-slate-900">{course.title}</h2>
            <div className="mt-4 text-sm text-slate-500">{t.progress}: {course.completed}/{course.totalLessons}</div>
            <div className="mt-3"><ProgressBar value={course.percentage} /></div>
            <div className="mt-3 text-2xl font-black text-brand-700">{course.percentage}%</div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              Telegram: {course.telegramLabel ?? '@bilimbox'}
            </div>
            <Link href={`/${params.locale}/courses/${course.slug}`} className="btn-primary mt-5 w-full">Open course</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
