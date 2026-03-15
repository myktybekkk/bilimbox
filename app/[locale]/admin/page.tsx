import { getAdminStats, getCourses } from '@/lib/data';
import { getUi, type Locale } from '@/lib/i18n';

export default async function AdminPage({ params }: { params: { locale: Locale } }) {
  const stats = await getAdminStats();
  const courses = await getCourses(params.locale);
  const t = getUi(params.locale);

  return (
    <main className="container-shell py-16">
      <div className="mb-10">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{t.analytics}</div>
        <h1 className="mt-3 text-4xl font-black text-slate-900">{t.adminTitle}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Courses', stats.courses],
          ['Users', stats.users],
          ['Enrollments', stats.enrollments],
          ['Completed lessons', stats.completed]
        ].map(([label, value]) => (
          <div key={label} className="card p-6">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-4xl font-black text-brand-700">{value}</div>
          </div>
        ))}
      </div>

      <div className="card mt-8 p-8">
        <h2 className="text-2xl font-black text-slate-900">Course analytics overview</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Lessons</th>
                <th className="px-4 py-3">Students</th>
                <th className="px-4 py-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-semibold text-slate-900">{course.title}</td>
                  <td className="px-4 py-3 text-slate-600">{course.lessonCount}</td>
                  <td className="px-4 py-3 text-slate-600">{course.studentCount}</td>
                  <td className="px-4 py-3 text-slate-600">{course.priceKgs} сом</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
