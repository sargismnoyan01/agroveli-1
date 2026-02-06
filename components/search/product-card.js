"use client"

import { Heart, Eye, Calendar, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link";
import IconPremium from "@/public/assets/icons/IconPremium";
import StatusIcon from "@/components/shared/StatusIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import React from "react";

export function ProductCard({ product, viewMode, onToggleFavorite }) {
  if (viewMode === "grid") {
    return <GridProductCard product={product} onToggleFavorite={onToggleFavorite} />
  }
  return <ListProductCard product={product} onToggleFavorite={onToggleFavorite} />
}

function GridProductCard({
                           product,
                           onToggleFavorite,
                         }) {
  return (
    <Link href={`/product/${product.id}`} className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        <Swiper
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 3000 }}
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
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0 flex items-center justify-between gap-1 flex-wrap">
            <h3 className="font-medium text-emerald-600 truncate">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.location}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">

          <span className="text-lg font-bold">{product.price_lari}₾</span>
          {product.unit && (
            <span className="text-sm text-muted-foreground">{product.unit_of_measurement}</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 ">
          <div className="flex items-center gap-2">

            {product.isPremium && (
              <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                <IconPremium />
              </div>
            )}

            <StatusIcon status={product.status} className="h-4 w-4" />
            {product.user?.phone && <button
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                window.location.href = `tel:${product.user.phone}`
              }}
                   className="flex items-center gap-1 text-sm text-muted-foreground no-underline hover:underline border-0 bg-transparent cursor-pointer">
              <Phone className="h-3.5 w-3.5"/>
              <span className="text-xs">{product.user?.phone}</span>
            </button>}
          </div>
          <button
            onClick={() => onToggleFavorite(product.id)}
            className="p-1 hover:bg-muted rounded transition-colors bg-transparent border-0 cursor-pointer"
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                product.isFavorite
                  ? "fill-rose-500 text-rose-500"
                  : "text-muted-foreground "
              )}
            />
          </button>
        </div>
      </div>
    </Link>
  )
}

function ListProductCard({
                           product,
                           onToggleFavorite,
                         }) {
  return (
    <Link href={`/product/${product.id}`}  className="group bg-card overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.12)] p-2 rounded-xl">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="max-h-[260px] relative w-full sm:w-48 md:w-56 lg:w-64 shrink-0 aspect-[4/3] sm:aspect-auto sm:h-auto bg-muted overflow-hidden rounded-lg">
          <Swiper
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 3000 }}
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
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            {/* Title and Location */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-medium text-brand">{product.name}</h3>
              </div>
              <p className="text-sm text-[#00000033]shrink-0">{product.location}</p>
            </div>

            {/* Price */}
           <div className="mt-3 w-full flex justify-between gap-2">
             <div>
               <span className="text-xl font-bold">{product.price_lari}₾</span>
               {product.unit && (
                 <span className="text-sm text-muted-foreground ml-1">/ {product.unit_of_measurement}</span>
               )}
             </div>

             {/* Stats */}
             <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
               <div className="flex items-center gap-1">
                 <Eye className="h-4 w-4" />
                 <span>{product.detail?.view_count} Просмотров</span>
               </div>
               <div className="flex items-center gap-1">
                 <Calendar className="h-4 w-4" />
                 <span>{product.created_at}</span>
               </div>
               <div className="flex items-center gap-1">
                 <Heart className="h-4 w-4" />
                 <span>{product.detail?.like_count} Фаворитов</span>
               </div>
             </div>
           </div>
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between mt-4 pt-3">
            <div className="flex items-center gap-2">
                <StatusIcon status={product.status} className="h-4 w-4"/>



              {product.user?.phone && <button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  window.location.href = `tel:${product.user.phone}`
                }}
                     className="flex items-center gap-2 text-sm text-muted-foreground no-underline hover:underline  border-0 bg-transparent cursor-pointer">
                <Phone className="h-4 w-4"/>
                <span>{product.user?.phone}</span>
              </button>}
            </div>
            <button
              onClick={() => onToggleFavorite(product.id)}
              className="p-2 hover:bg-muted rounded-lg transition-colors bg-transparent border-0 cursor-pointer"
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-colors",
                  product.isFavorite
                    ? "fill-rose-500 text-rose-500"
                    : "text-muted-foreground "
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
