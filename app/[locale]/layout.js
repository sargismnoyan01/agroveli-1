import "../globals.css";
import 'react-phone-number-input/style.css'
import 'swiper/css';
import "swiper/css/pagination";
import { Noto_Sans_Armenian, Noto_Sans_Georgian, Roboto } from 'next/font/google';
import Providers from "@/components/shared/Providers";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "AgroVeli — Сельхозтовары",
  description:
    "AgroVeli — платформа для поиска и размещения сельхозтоваров. Найдите агро-товары и свяжитесь с продавцом напрямую.",

  icons: {
    icon: [
      {
        url: "/assets/images/favicon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/assets/images/favicon.png",
        media: "(prefers-color-scheme: dark)",
      },
      // {
      //   url: "/icon.svg",
      //   type: "image/svg+xml",
      // },
    ],
    apple: "/assets/images/favicon.png",
  },

  openGraph: {
    title: "Agroveli",
    description: "Agroveli",
    url: "https://agroveli.com",
    siteName: "Agroveli",
    images: [
      {
        url: "http://ec2-98-88-224-117.compute-1.amazonaws.com/assets/images/bg1.png",
        width: 1200,
        height: 630,
        alt: "Agroveli",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Agroveli",
    description: "Agroveli",
    images: ["/assets/images/bg1.png"],
  },
};

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
});

const armenian = Noto_Sans_Armenian({
  subsets: ['armenian'],
  variable: '--font-armenian',
});

const georgian = Noto_Sans_Georgian({
  subsets: ['georgian'],
  variable: '--font-georgian',
});

export function generateStaticParams() {
  return [{locale: 'ru'}, {locale: 'hy'}, {locale: 'ka'}];
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
    <body className={`${roboto.variable} ${armenian.variable} ${georgian.variable} font-sans`}>
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Providers>
        {children}
      </Providers>
    </NextIntlClientProvider>
    </body>
    </html>
  );
}
