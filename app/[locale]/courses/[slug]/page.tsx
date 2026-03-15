import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, CheckCircle2, MessageCircle, PlayCircle } from 'lucide-react';
import { getCourseBySlug } from '@/lib/data';
import { getUi, type Locale } from '@/lib/i18n';

export default async function CourseDetailPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const course = await getCourseBySlug(locale, slug);
  const t = getUi(locale);
  if (!course) notFound();

  return (
    <main className="container-shell py-16">
      <section className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-8">
          <div className="card overflow-hidden">
            <div className="h-72 bg-cover bg-center" style={{ backgroundImage: `url(${course.cover})` }} />
            <div className="space-y-5 p-8">
              <div className="inline-flex rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">{course.studentCount} students enrolled</div>
              <h1 className="text-4xl font-black text-slate-900">{course.title}</h1>
              <p className="text-lg leading-8 text-slate-600">{course.description}</p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="card p-4"><BookOpen className="h-5 w-5 text-brand-600" /><div className="mt-2 text-sm text-slate-500">{t.modules}</div><div className="text-2xl font-bold">{course.modules.length}</div></div>
                <div className="card p-4"><PlayCircle className="h-5 w-5 text-brand-600" /><div className="mt-2 text-sm text-slate-500">{t.lessons}</div><div className="text-2xl font-bold">{course.modules.reduce((sum, m) => sum + m.lessons.length, 0)}</div></div>
                <div className="card p-4"><MessageCircle className="h-5 w-5 text-brand-600" /><div className="mt-2 text-sm text-slate-500">{t.telegram}</div><div className="text-lg font-bold">{course.telegramLabel ?? '@bilimbox'}</div></div>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{t.outcomes}</div>
            <p className="mt-4 text-lg leading-8 text-slate-700">{course.outcomes}</p>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-black text-slate-900">{t.modules}</h2>
            <div className="mt-6 space-y-6">
              {course.modules.map((module, moduleIndex) => (
                <div key={module.id} className="rounded-3xl border border-slate-200 p-6">
                  <h3 className="text-xl font-bold text-slate-900">{moduleIndex + 1}. {module.title}</h3>
                  <div className="mt-4 space-y-3">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <Link
                        key={lesson.id}
                        href={`/${locale}/courses/${course.slug}/${lesson.slug}`}
                        className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 transition hover:border-brand-300 hover:bg-brand-50/40"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-brand-600" />
                          <div>
                            <div className="font-semibold text-slate-900">{moduleIndex + 1}.{lessonIndex + 1} {lesson.title}</div>
                            <div className="text-sm text-slate-500">{lesson.durationMin} min</div>
                          </div>
                        </div>
                        {lesson.isFree ? <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{t.free}</span> : null}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <div className="text-sm text-slate-500">Price</div>
            <div className="mt-2 text-4xl font-black text-brand-700">{course.priceKgs} сом</div>
            <button className="btn-primary mt-6 w-full">{t.enroll}</button>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              After purchase, the user sees website access, lesson progress and Telegram instructions.
            </div>
          </div>
          <div className="card p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Unique features</div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <li>• Telegram Sync</li>
              <li>• Smart Next Lesson</li>
              <li>• Lite Mode for weak internet</li>
              <li>• Practice Cards after every lesson</li>
              <li>• Teacher analytics dashboard</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
