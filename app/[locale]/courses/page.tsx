import { CourseCard } from '@/components/course-card';
import { getCourses } from '@/lib/data';
import { getUi, type Locale } from '@/lib/i18n';

export default async function CoursesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const courses = await getCourses(locale);
  const t = getUi(locale);

  return (
    <main className="container-shell py-16">
      <div className="mb-10 max-w-2xl">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{t.courses}</div>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Premium course catalog</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Build and sell multilingual lessons with progress tracking, Telegram sync and a clean learning experience.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} locale={locale} course={course} />
        ))}
      </div>
    </main>
  );
}
