import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'es', 'ja', 'th'],
  defaultLocale: 'en',
  localePrefix:
    process.env.NEXT_PUBLIC_USE_CASE === 'locale-prefix-never'
      ? 'never'
      : {
        mode: 'as-needed',
        prefixes: {
          es: '/spain',
        },
      },
  domains:
    process.env.NEXT_PUBLIC_USE_CASE === 'domains'
      ? [
        {
          domain: 'example.com',
          defaultLocale: 'en',
          locales: ['en', 'es', 'ja', 'th'], // กำหนด locales ที่รองรับใน domain นี้
        },
        {
          domain: 'example.de',
          defaultLocale: 'de',
          locales: ['de'], // รองรับเฉพาะภาษาเยอรมัน
        },
        {
          domain: 'example.co.th',
          defaultLocale: 'th', // ตั้งค่าให้โดเมน .co.th ใช้ภาษาไทยเป็นค่าเริ่มต้น
          locales: ['th', 'en'], // รองรับไทยและอังกฤษ
        },
      ]
      : undefined,

      pathnames: {
        '/': '/',
        '/client': '/client',
        '/about': '/about',
        '/client/redirect': '/client/redirect',
        '/nested': {
          en: '/nested',
          de: '/verschachtelt',
          es: '/anidada',
          ja: '/ネスト',
          th: '/ซ้อนกัน',
        },
        '/redirect': '/redirect',
        '/news/[articleId]': {
          en: '/news/[articleId]',
          de: '/neuigkeiten/[articleId]',
          es: '/noticias/[articleId]',
          ja: '/ニュース/[articleId]',
          th: '/ข่าวสาร/[articleId]',
        },
        '/news/just-in': {
          en: '/news/just-in',
          de: '/neuigkeiten/aktuell',
          es: '/noticias/justo-en',
          ja: '/ニュース/現在',
          th: '/ข่าวสาร/ล่าสุด',
        },
      },
      
  localeCookie:
    process.env.NEXT_PUBLIC_USE_CASE === 'locale-cookie-false'
      ? false
      : {
        // 200 days
        maxAge: 200 * 24 * 60 * 60,
      },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter }
  = createNavigation(routing);
