import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.progress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.lessonI18n.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.moduleI18n.deleteMany();
  await prisma.module.deleteMany();
  await prisma.courseI18n.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@bilimbox.kg',
      name: 'Demo Student',
      role: 'admin',
      locale: 'kg'
    }
  });

  const course = await prisma.course.create({
    data: {
      slug: 'computer-zero-to-pro',
      priceKgs: 3500,
      level: 'Beginner',
      cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      telegramLabel: '@bilimbox_course',
      translations: {
        create: [
          {
            locale: 'kg',
            title: 'Компьютерди нөлдөн үйрөн',
            subtitle: '70 сабактан турган чоң практикалык курс',
            description: 'Компьютер, интернет, Word, Excel, Telegram, коопсуздук жана онлайн иш боюнча толук курс.',
            outcomes: 'Компьютерди иштетүү, файлдар менен иштөө, интернет колдонуу, документ түзүү, онлайн ишке даярдык.'
          },
          {
            locale: 'ru',
            title: 'Компьютер с нуля',
            subtitle: 'Большой практический курс из 70 уроков',
            description: 'Полный курс по компьютеру, интернету, Word, Excel, Telegram, безопасности и онлайн-работе.',
            outcomes: 'Навыки работы с компьютером, файлами, интернетом, документами и цифровыми сервисами.'
          },
          {
            locale: 'en',
            title: 'Computer from Zero',
            subtitle: 'A practical 70-lesson course',
            description: 'A complete beginner course covering computers, internet, office tools, Telegram, safety and online work.',
            outcomes: 'Confident basics in computer use, files, internet, documents and digital tools.'
          }
        ]
      },
      modules: {
        create: [
          {
            position: 1,
            translations: {
              create: [
                { locale: 'kg', title: 'Негиздер' },
                { locale: 'ru', title: 'Основы' },
                { locale: 'en', title: 'Basics' }
              ]
            },
            lessons: {
              create: [
                {
                  slug: 'what-is-computer',
                  position: 1,
                  durationMin: 8,
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  fileUrl: 'https://example.com/lesson1.pdf',
                  isFree: true,
                  translations: {
                    create: [
                      {
                        locale: 'kg',
                        title: 'Компьютер деген эмне',
                        content: 'Бул сабакта компьютер эмне экенин, анын кайсы иштерде колдонуларын жана негизги бөлүктөрүн үйрөнөсүз.',
                        task: 'Үйдө кайсы санарип түзмөктөр бар экенин жазып чык.'
                      },
                      {
                        locale: 'ru',
                        title: 'Что такое компьютер',
                        content: 'В этом уроке вы узнаете, что такое компьютер, где он используется и из каких основных частей состоит.',
                        task: 'Запишите, какие цифровые устройства есть у вас дома.'
                      },
                      {
                        locale: 'en',
                        title: 'What is a computer',
                        content: 'In this lesson you will learn what a computer is, where it is used and which main parts it has.',
                        task: 'Write down the digital devices you have at home.'
                      }
                    ]
                  }
                },
                {
                  slug: 'windows-and-desktop',
                  position: 2,
                  durationMin: 12,
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  fileUrl: 'https://example.com/lesson2.pdf',
                  translations: {
                    create: [
                      {
                        locale: 'kg',
                        title: 'Windows жана рабочий стол',
                        content: 'Windows интерфейси, рабочий стол, иконкалар жана папкалар менен таанышабыз.',
                        task: 'Жаңы папка түзүп, анын атын өзгөртүп көр.'
                      },
                      {
                        locale: 'ru',
                        title: 'Windows и рабочий стол',
                        content: 'Разберём интерфейс Windows, рабочий стол, иконки и папки.',
                        task: 'Создайте новую папку и переименуйте её.'
                      },
                      {
                        locale: 'en',
                        title: 'Windows and desktop',
                        content: 'We explore the Windows interface, desktop, icons and folders.',
                        task: 'Create a new folder and rename it.'
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            position: 2,
            translations: {
              create: [
                { locale: 'kg', title: 'Интернет жана инструменттер' },
                { locale: 'ru', title: 'Интернет и инструменты' },
                { locale: 'en', title: 'Internet and tools' }
              ]
            },
            lessons: {
              create: [
                {
                  slug: 'google-search',
                  position: 1,
                  durationMin: 10,
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  fileUrl: 'https://example.com/lesson3.pdf',
                  translations: {
                    create: [
                      {
                        locale: 'kg',
                        title: 'Google менен издөө',
                        content: 'Издөө суроолорун туура түзүү, сүрөт жана видео издөө, коопсуз сайттарды тандоо боюнча практикалык сабак.',
                        task: "Googleдан өзүңө керектүү 3 маалыматты тап."
                      },
                      {
                        locale: 'ru',
                        title: 'Поиск в Google',
                        content: 'Практический урок о том, как составлять поисковые запросы, искать изображения и видео и выбирать безопасные сайты.',
                        task: 'Найдите в Google 3 полезные для вас вещи.'
                      },
                      {
                        locale: 'en',
                        title: 'Google search',
                        content: 'A practical lesson on search queries, finding images and videos, and choosing safe websites.',
                        task: 'Find 3 useful things for yourself in Google.'
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    include: {
      modules: { include: { lessons: true } }
    }
  });

  await prisma.enrollment.create({
    data: {
      userId: demoUser.id,
      courseId: course.id,
      status: 'active'
    }
  });

  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      await prisma.progress.create({
        data: {
          userId: demoUser.id,
          lessonId: lesson.id,
          completed: lesson.position === 1 && module.position === 1,
          completedAt: lesson.position === 1 && module.position === 1 ? new Date() : null
        }
      });
    }
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
