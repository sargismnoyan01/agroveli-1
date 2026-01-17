import './globals.css';
import 'react-phone-number-input/style.css'
import 'swiper/css';
import "swiper/css/pagination";


export const metadata = {
  title: "AgroVeli — Сельхозтовары",
  description:
    "AgroVeli — платформа для поиска и размещения сельхозтоваров. Найдите агро-товары и свяжитесь с продавцом напрямую.",

  icons: {
    icon: [
      {
        url: "/assets/images/bg1.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/assets/images/bg1.png",
        media: "(prefers-color-scheme: dark)",
      },
      // {
      //   url: "/icon.svg",
      //   type: "image/svg+xml",
      // },
    ],
    apple: "/assets/images/bg1.png",
  },

  openGraph: {
    title: "Agroveli",
    description: "Agroveli",
    url: "https://agroveli.com",
    siteName: "Agroveli",
    images: [
      {
        url: "/assets/images/bg1.png",
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

import { Roboto } from 'next/font/google';
import Providers from "@/components/shared/Providers";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={roboto.variable}>
    <Providers >
      {children}
    </Providers>
    </body>
    </html>
  );
}
