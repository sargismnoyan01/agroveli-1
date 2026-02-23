"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image";
import { useTranslations } from "next-intl"; // Импортируем хук

export function HeroBanner() {
  const t = useTranslations("Hero"); // Инициализируем перевод

  return (
    <section className="relative h-[500px] overflow-hidden bg-transparent md:block">
      <Image
        src="/assets/images/bg1.png"
        alt="background"
        className="absolute left-0 top-0 w-full h-full object-cover"
        width={1449}
        height={500}
        quality={100}
      />

      <div className="w-full h-full mx-auto px-8 relative z-10 flex items-center justify-start">
        <div className="flex items-center min-h-[320px]">
          <div className="max-w-md py-10 relative z-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight text-balance">
              {t("title")}
            </h1>
            <p className="text-white/90 text-base mb-6 leading-relaxed">
              {t("description")}
            </p>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white h-[43px] hover:bg-[#0F6A4F] rounded-lg px-6 py-5 text-base font-medium"
            >
              {t("button")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}