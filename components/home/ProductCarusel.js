"use client"

import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Heart} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

export function ProductCarousel({ title, products, badgeColor, BadgeIcon }) {
  const [favorites, setFavorites] = useState(products?.filter((p) => p.favorite).map((p) => p.id))

  const toggleFavorite = (productId) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }


  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div
          className={cn(
            "inline-flex h-12 items-center gap-2 px-4 py-2 rounded-md text-white text-sm font-medium",
            badgeColor,
          )}
        >
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", badgeColor)}>
            <BadgeIcon className="h-5 w-5 text-white"/>
          </div>
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="swiper-button-prev-custom h-8 w-8 rounded-full border-border bg-transparent"
            // onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="swiper-button-next-custom h-8 w-8 rounded-full border-border bg-transparent"
            // onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>



      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        spaceBetween={20}
        slidesPerView={4}
        autoplay={{ delay: 3000 }}
        loop={products.length > 4}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              key={product.id}
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

function ProductCard({
                       product,
                       isFavorite,
                       onToggleFavorite,
                     }) {

  const [visited, setVisited] = useState(false);

  useEffect(() => {
    const visitedProducts =
      JSON.parse(localStorage.getItem("visitedProducts") || "[]");

    if (visitedProducts.includes(product.id)) {
      setVisited(true);
    }
  }, [product.id]);


  const handleClick = () => {
    const visitedProducts =
      JSON.parse(localStorage.getItem("visitedProducts") || "[]");

    if (!visitedProducts.includes(product.id)) {
      localStorage.setItem(
        "visitedProducts",
        JSON.stringify([...visitedProducts, product.id])
      );
    }
  };

  return (
    <Link href={`/products/${product.id}`} onClick={handleClick} className="block decoration-0 flex-shrink-0 w-full snap-start rounded-xl shadow-lg hover:shadow transition mb-8">
      <div className="relative group">
        {/* Image */}
        <div className="relative rounded-xl overflow-hidden bg-muted h-[200px]">

          <Swiper
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            className={`
            h-full
            [&_.swiper-pagination-bullet-active]:!bg-[#0F6A4F]
            [&_.swiper-pagination-bullet-active]:!w-[10px]
            [&_.swiper-pagination-bullet-active]:!h-[10px]
            [&_.swiper-pagination-bullet]:!bg-white
            [&_.swiper-pagination-bullet]:!border
            [&_.swiper-pagination-bullet]:!border-[#0F6A4F]
            [&_.swiper-pagination-bullet]:!opacity-100
            `}
          >
            {product.images?.map((image, i) => (
              <SwiperSlide key={i}>
                <Image src={image.image || "/placeholder.svg"} width={313} height={200} alt={product.name} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Viewed Badge */}
          {visited && (
            <div className="absolute top-2 right-2 bg-foreground/80 text-background text-xs px-2 py-1 rounded z-10">
              Просмотрено
            </div>
          )}

        </div>

        {/* Info */}
        <div className="mt-3 px-3 pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">{product.location}</p>
              <h3 className="text-base  text-[#0F6A4F] truncate font-bold">{product.name}</h3>
            </div>
            <button onClick={onToggleFavorite} className="shrink-0 p-1 border-none bg-transparent cursor-pointer">
              <Heart
                className={cn(
                  "h-5 w-5 transition-colors",
                  isFavorite ? "fill-rose-500 text-rose-500" : "text-muted-foreground hover:text-rose-500",
                )}
              />
            </button>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-lg font-bold text-foreground">{product.price_lari}₾</span>
            {product.unit_of_measurement && <span className="text-sm text-muted-foreground">1 {product.unit_of_measurement}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}
