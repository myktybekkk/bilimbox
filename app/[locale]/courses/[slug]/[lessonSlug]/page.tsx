import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Download, FileText, PlayCircle } from 'lucide-react';
import { getLesson } from '@/lib/data';
import { getUi, type Locale } from '@/lib/i18n';

export default async function LessonPage({ params }: { params: Promise<{ locale: Locale; slug: string; lessonSlug: string }> }) {
  const { locale, slug, lessonSlug } = await params;
  const lesson = await getLesson(locale, slug, lessonSlug);
  const t = getUi(locale);
  if (!lesson) notFound();

  return (
    <main className="container-shell py-16">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="space-y-8">
          <div className="card overflow-hidden">
            <div className="aspect-video w-full bg-slate-900">
              <iframe className="h-full w-full" src={lesson.videoUrl} title={lesson.title} allowFullScreen />
            </div>
            <div className="space-y-5 p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
                <PlayCircle className="h-4 w-4" /> {lesson.durationMin} min
              </div>
              <h1 className="text-4xl font-black text-slate-900">{lesson.title}</h1>
              <p className="text-lg leading-8 text-slate-700">{lesson.content}</p>
            </div>
          </div>

          <div className="card p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{t.practice}</div>
            <div className="mt-4 rounded-3xl bg-slate-50 p-6">
              <div className="flex items-start gap-3">
                <FileText className="mt-1 h-5 w-5 text-brand-600" />
                <div>
                  <div className="font-bold text-slate-900">Practice Card</div>
                  <p className="mt-2 leading-7 text-slate-700">{lesson.task}</p>
                </div>
              </div>
            </div>
            {lesson.fileUrl ? (
              <a href={lesson.fileUrl} className="btn-secondary mt-6">
                <Download className="mr-2 h-4 w-4" /> Download material
              </a>
            ) : null}
          </div>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <div className="text-sm text-slate-500">Smart Next Lesson</div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              After finishing this lesson, redirect the student to the next recommended lesson and update progress.
            </p>
            {lesson.nextLessonSlug ? (
              <Link href={`/${locale}/courses/${lesson.courseSlug}/${lesson.nextLessonSlug}`} className="btn-primary mt-5 w-full">
                {t.continue}
              </Link>
            ) : (
              <div className="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">Course section completed</div>
            )}
          </div>
          <div className="card p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Lite Mode</div>
            <p className="mt-3 text-sm leading-6 text-slate-600">For weak internet, prioritize text and files, then load video on demand.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
