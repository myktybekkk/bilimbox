export const locales = ['kg', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];

export const ui = {
  kg: {
    brand: 'BilimBox',
    navCourses: 'Курстар',
    navDashboard: 'Кабинет',
    navAdmin: 'Админ',
    heroTitle: 'Курстарыңды сайт + Telegram форматында сат',
    heroSubtitle: 'Мультиязычный билим платформасы. Сабактар, прогресс, файлдар, тесттер жана кооз кабинет.',
    start: 'Баштоо',
    courses: 'Курстар',
    outcomes: 'Натыйжа',
    modules: 'Модулдар',
    lessons: 'Сабактар',
    dashboardTitle: 'Окуу кабинети',
    adminTitle: 'Admin Dashboard',
    progress: 'Прогресс',
    enroll: 'Курс сатып алуу',
    continue: 'Улантуу',
    free: 'Бекер',
    practice: 'Практика',
    telegram: 'Telegram доступ',
    analytics: 'Аналитика',
    language: 'Тил'
  },
  ru: {
    brand: 'BilimBox',
    navCourses: 'Курсы',
    navDashboard: 'Кабинет',
    navAdmin: 'Админ',
    heroTitle: 'Продавайте курсы в формате сайт + Telegram',
    heroSubtitle: 'Мультиязычная образовательная платформа с уроками, прогрессом, файлами, тестами и красивым кабинетом.',
    start: 'Начать',
    courses: 'Курсы',
    outcomes: 'Результат',
    modules: 'Модули',
    lessons: 'Уроки',
    dashboardTitle: 'Кабинет ученика',
    adminTitle: 'Admin Dashboard',
    progress: 'Прогресс',
    enroll: 'Купить курс',
    continue: 'Продолжить',
    free: 'Бесплатно',
    practice: 'Практика',
    telegram: 'Telegram доступ',
    analytics: 'Аналитика',
    language: 'Язык'
  },
  en: {
    brand: 'BilimBox',
    navCourses: 'Courses',
    navDashboard: 'Dashboard',
    navAdmin: 'Admin',
    heroTitle: 'Sell courses in website + Telegram format',
    heroSubtitle: 'A multilingual education platform with lessons, progress, files, quizzes and a premium dashboard.',
    start: 'Get started',
    courses: 'Courses',
    outcomes: 'Outcome',
    modules: 'Modules',
    lessons: 'Lessons',
    dashboardTitle: 'Student dashboard',
    adminTitle: 'Admin Dashboard',
    progress: 'Progress',
    enroll: 'Buy course',
    continue: 'Continue',
    free: 'Free',
    practice: 'Practice',
    telegram: 'Telegram access',
    analytics: 'Analytics',
    language: 'Language'
  }
};

export function getUi(locale: string) {
  return ui[(locales.includes(locale as Locale) ? locale : 'kg') as Locale];
}
