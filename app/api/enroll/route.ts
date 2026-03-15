import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const user = await prisma.user.findFirst();
  if (!user) {
    return NextResponse.json({ error: 'No demo user found' }, { status: 404 });
  }

  const course = await prisma.course.findUnique({ where: { slug: body.slug } });
  if (!course) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }

  const enrollment = await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: course.id
      }
    },
    update: { status: 'active' },
    create: {
      userId: user.id,
      courseId: course.id,
      status: 'active'
    }
  });

  return NextResponse.json({ ok: true, enrollment });
}
