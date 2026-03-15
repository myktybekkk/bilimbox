import { prisma } from '@/lib/prisma';
import { Locale } from '@/lib/i18n';

type TranslationRow = { locale: string };

function pickTranslation<T extends TranslationRow>(items: T[], locale: string): T | undefined {
  return items.find((t) => t.locale === locale) ?? items[0];
}

export async function getCourses(locale: Locale) {
  const courses = await prisma.course.findMany({
    include: {
      translations: { where: { locale } },
      modules: { include: { lessons: true } },
      enrollments: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return courses.map((course) => {
    const t = course.translations[0];
    const lessonCount = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
    return {
      id: course.id,
      slug: course.slug,
      title: t?.title ?? course.slug,
      subtitle: t?.subtitle ?? '',
      description: t?.description ?? '',
      outcomes: t?.outcomes ?? '',
      cover: course.cover,
      priceKgs: course.priceKgs,
      level: course.level,
      telegramLabel: course.telegramLabel,
      lessonCount,
      studentCount: course.enrollments.length
    };
  });
}

export async function getCourseBySlug(locale: Locale, slug: string) {
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      translations: true,
      modules: {
        include: {
          translations: true,
          lessons: {
            include: { translations: true },
            orderBy: { position: 'asc' }
          }
        },
        orderBy: { position: 'asc' }
      },
      enrollments: true
    }
  });

  if (!course) return null;
  const t = pickTranslation(course.translations, locale);

  return {
    id: course.id,
    slug: course.slug,
    title: t?.title ?? course.slug,
    subtitle: t?.subtitle ?? '',
    description: t?.description ?? '',
    outcomes: t?.outcomes ?? '',
    cover: course.cover,
    priceKgs: course.priceKgs,
    telegramLabel: course.telegramLabel,
    studentCount: course.enrollments.length,
    modules: course.modules.map((module) => ({
      id: module.id,
      title: pickTranslation(module.translations, locale)?.title ?? 'Module',
      lessons: module.lessons.map((lesson) => ({
        id: lesson.id,
        slug: lesson.slug,
        title: pickTranslation(lesson.translations, locale)?.title ?? lesson.slug,
        durationMin: lesson.durationMin,
        isFree: lesson.isFree
      }))
    }))
  };
}

export async function getLesson(locale: Locale, courseSlug: string, lessonSlug: string) {
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    include: {
      modules: {
        include: {
          lessons: {
            include: { translations: true },
            orderBy: { position: 'asc' }
          }
        },
        orderBy: { position: 'asc' }
      }
    }
  });
  if (!course) return null;

  const flatLessons = course.modules.flatMap((m) => m.lessons);
  const lesson = flatLessons.find((item) => item.slug === lessonSlug);
  if (!lesson) return null;

  const idx = flatLessons.findIndex((item) => item.id === lesson.id);
  const nextLesson = flatLessons[idx + 1];

  const trans = pickTranslation(lesson.translations, locale);

  return {
    id: lesson.id,
    slug: lesson.slug,
    title: trans?.title ?? lesson.slug,
    content: trans?.content ?? '',
    task: trans?.task ?? '',
    durationMin: lesson.durationMin,
    videoUrl: lesson.videoUrl,
    fileUrl: lesson.fileUrl,
    nextLessonSlug: nextLesson?.slug ?? null,
    courseSlug
  };
}

export async function getDashboard(locale: Locale) {
  const user = await prisma.user.findFirst({
    include: {
      enrollments: {
        include: {
          course: {
            include: {
              translations: true,
              modules: { include: { lessons: true } }
            }
          }
        }
      },
      progresses: true
    }
  });

  if (!user) return null;

  const courses = user.enrollments.map((enrollment) => {
    const course = enrollment.course;
    const title = pickTranslation(course.translations, locale)?.title ?? course.slug;
    const lessons = course.modules.flatMap((module) => module.lessons);
    const completed = user.progresses.filter((progress) => lessons.some((lesson) => lesson.id === progress.lessonId) && progress.completed).length;
    return {
      slug: course.slug,
      title,
      totalLessons: lessons.length,
      completed,
      percentage: lessons.length ? Math.round((completed / lessons.length) * 100) : 0,
      telegramLabel: course.telegramLabel
    };
  });

  return {
    user: {
      name: user.name,
      email: user.email
    },
    courses
  };
}

export async function getAdminStats() {
  const [courses, users, enrollments, completed] = await Promise.all([
    prisma.course.count(),
    prisma.user.count(),
    prisma.enrollment.count(),
    prisma.progress.count({ where: { completed: true } })
  ]);

  return { courses, users, enrollments, completed };
}
