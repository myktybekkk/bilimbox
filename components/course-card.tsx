import Link from 'next/link';
import { BookOpen, Users } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface Props {
  locale: Locale;
  course: {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    cover: string;
    priceKgs: number;
    lessonCount: number;
    studentCount: number;
  };
}

export function CourseCard({ locale, course }: Props) {
  return (
    <div className="card overflow-hidden">
      <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: `url(${course.cover})` }} />
      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{course.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{course.subtitle}</p>
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-slate-600">{course.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2"><BookOpen className="h-4 w-4" />{course.lessonCount} lessons</span>
          <span className="inline-flex items-center gap-2"><Users className="h-4 w-4" />{course.studentCount} students</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-400">Price</div>
            <div className="text-2xl font-black text-brand-700">{course.priceKgs} сом</div>
          </div>
          <Link href={`/${locale}/courses/${course.slug}`} className="btn-primary">
            Open
          </Link>
        </div>
      </div>
    </div>
  );
}
