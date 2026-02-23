import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Гарантируем, что locale не пустая
  const activeLocale = locale || 'ru';

  return {
    locale: activeLocale, // ОБЯЗАТЕЛЬНОЕ ПОЛЕ
    messages: (await import(`../messages/${activeLocale}.json`)).default
  };
});