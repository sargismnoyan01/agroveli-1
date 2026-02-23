import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Убедись, что здесь все три языка
  locales: ['ru', 'hy', 'ka'],
  defaultLocale: 'ru',
  localePrefix: 'always'
});

export const config = {
  // Этот матчер более надежный для динамических локалей
  matcher: ['/((?!api|_next|.*\\..*).*)']
};