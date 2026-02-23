"use client"

import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Heart} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
// Используем локализованный Link
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function ProductCarousel({ title, products, badgeColor, BadgeIcon, path }) {
  const t = useTranslations("ProductCard");
  const [favorites, setFavorites] = useState(products?.filter((p) => p.favorite).map((p) => p.id))

  const toggleFavorite = (productId) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between mb-8">
        <Link
          href={`/${path}`}
          className={cn(
            "inline-flex h-12 items-center gap-2 px-4 py-2 rounded-md text-white text-sm font-medium no-underline",
            badgeColor,
          )}
        >
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", badgeColor)}>
            <BadgeIcon className="h-5 w-5 text-white"/>
          </div>
          {/* title теперь должен передаваться уже переведенным или переводиться здесь */}
          <span>{title}</span>
        </Link>
        {/* ... стрелки навигации без изменений ... */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="swiper-button-prev-custom h-8 w-8 rounded-full border-border bg-transparent">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="swiper-button-next-custom h-8 w-8 rounded-full border-border bg-transparent">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{ prevEl: ".swiper-button-prev-custom", nextEl: ".swiper-button-next-custom" }}
        spaceBetween={20}
        slidesPerView={4}
        autoplay={{ delay: 3000 }}
        loop={products.length > 4}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={(e) =>{
                e.preventDefault();
                toggleFavorite(product.id)
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

function ProductCard({ product, isFavorite, onToggleFavorite }) {
  const t = useTranslations("ProductCard");
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    const visitedProducts = JSON.parse(localStorage.getItem("visitedProducts") || "[]");
    if (visitedProducts.includes(product.id)) {
      setVisited(true);
    }
  }, [product.id]);

  const handleClick = () => {
    const visitedProducts = JSON.parse(localStorage.getItem("visitedProducts") || "[]");
    if (!visitedProducts.includes(product.id)) {
      localStorage.setItem("visitedProducts", JSON.stringify([...visitedProducts, product.id]));
    }
  };

  return (
    <Link href={`/product/${product.id}`} onClick={handleClick} className="block decoration-0 flex-shrink-0 w-full snap-start rounded-xl shadow-lg hover:shadow transition mb-8">
      <div className="relative group">
        <div className="relative rounded-xl overflow-hidden bg-muted h-[200px]">
          <Swiper
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 3000 }}
            className="h-full [&_.swiper-pagination-bullet-active]:!bg-[#0F6A4F]"
          >
            {product.images?.map((image, i) => (
              <SwiperSlide key={i}>
                <Image src={image.image || "/placeholder.svg"} width={313} height={200} alt={product.name} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>

          {visited && (
            <div className="absolute top-2 right-2 bg-foreground/80 text-background text-xs px-2 py-1 rounded z-10">
              {t("viewed")}
            </div>
          )}
        </div>

        <div className="mt-3 px-3 pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">{product.location}</p>
              <h3 className="text-base text-[#0F6A4F] truncate font-bold">{product.name}</h3>
            </div>
            <button onClick={onToggleFavorite} className="shrink-0 p-1 border-none bg-transparent cursor-pointer">
              <Heart className={cn("h-5 w-5 transition-colors", isFavorite ? "fill-rose-500 text-rose-500" : "text-muted-foreground hover:text-rose-500")} />
            </button>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            {/* Валюта зависит от бекенда, но тут можно подставить нужный символ */}
            <span className="text-lg font-bold text-foreground">
              {product.price_lari}₾
            </span>
            {product.unit_of_measurement && (
              <span className="text-sm text-muted-foreground">
                1 {t(`units.${product.unit_of_measurement}`)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}