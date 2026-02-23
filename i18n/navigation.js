import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

// 1. Определяем правила роутинга
export const routing = defineRouting({
  locales: ['ru', 'hy', 'ka'],
  defaultLocale: 'ru',
  localePrefix: 'always'
});

// 2. Создаем и экспортируем типизированные компоненты навигации
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);