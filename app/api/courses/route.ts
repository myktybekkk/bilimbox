import { NextResponse } from 'next/server';
import { getCourses } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get('locale') ?? 'kg') as 'kg' | 'ru' | 'en';
  const data = await getCourses(locale);
  return NextResponse.json(data);
}
