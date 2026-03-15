import Link from 'next/link';
import { ArrowRight, Globe2, LayoutDashboard, Sparkles, Smartphone } from 'lucide-react';
import { CourseCard } from '@/components/course-card';
import { getCourses } from '@/lib/data';
import { getUi, type Locale } from '@/lib/i18n';

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const courses = await getCourses(locale);
  const t = getUi(locale);

  return (
    <main>
      <section className="container-shell py-16 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
              Multilingual EdTech Platform
            </div>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">{t.heroTitle}</h1>
              <p className="max-w-xl text-lg leading-8 text-slate-600">{t.heroSubtitle}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${locale}/courses`} className="btn-primary">
                {t.start} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href={`/${locale}/dashboard`} className="btn-secondary">
                {t.navDashboard}
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Globe2, title: 'KG / RU / EN', text: 'One-click language switching' },
                { icon: Smartphone, title: 'Lite Mode', text: 'Fast on weak internet' },
                { icon: LayoutDashboard, title: 'Teacher Dashboard', text: 'Sales and retention analytics' }
              ].map((item) => (
                <div key={item.title} className="card p-5">
                  <item.icon className="h-6 w-6 text-brand-600" />
                  <div className="mt-3 font-bold">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-sky-500 p-8 text-white shadow-2xl">
            <div className="rounded-[28px] bg-white/10 p-6 backdrop-blur">
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>BilimBox Premium</span>
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="mt-6 text-3xl font-black">Smart course delivery</h2>
              <div className="mt-6 grid gap-4">
                {['Telegram Sync', 'Smart Next Lesson', 'Progress Tracking', 'Practice Cards'].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/10 px-4 py-3 font-semibold">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{t.courses}</div>
            <h2 className="mt-2 text-3xl font-black text-slate-900">Launch-ready course catalog</h2>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} locale={locale} course={course} />
          ))}
        </div>
      </section>
    </main>
  );
}
