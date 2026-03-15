import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const user = await prisma.user.findFirst();
  if (!user) {
    return NextResponse.json({ error: 'No demo user found' }, { status: 404 });
  }

  const lesson = await prisma.lesson.findFirst({ where: { slug: body.lessonSlug } });
  if (!lesson) {
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
  }

  const progress = await prisma.progress.upsert({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId: lesson.id
      }
    },
    update: { completed: true, completedAt: new Date() },
    create: {
      userId: user.id,
      lessonId: lesson.id,
      completed: true,
      completedAt: new Date()
    }
  });

  return NextResponse.json({ ok: true, progress });
}
