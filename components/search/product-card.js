"use client"

import { Heart, Eye, Calendar, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link";
import IconPremium from "@/public/assets/icons/IconPremium";

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
    <div className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-emerald-600 truncate">{product.title}</h3>
            <p className="text-sm text-muted-foreground">{product.location}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold">{product.price}₾</span>
          {product.unit && (
            <span className="text-sm text-muted-foreground">{product.unit}</span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            {product.isPremium && (
              <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                <IconPremium />
              </div>
            )}
            <Link href={`tel: ${23948570}`} className="flex items-center gap-1 text-sm text-muted-foreground no-underline hover:underline">
              <Phone className="h-3.5 w-3.5" />
              <span className="text-xs">{product.phone}</span>
            </Link>
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
    </div>
  )
}

function ListProductCard({
                           product,
                           onToggleFavorite,
                         }) {
  return (
    <div className="group bg-card overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.12)] p-2 rounded-xl">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-48 md:w-56 lg:w-64 shrink-0 aspect-[4/3] sm:aspect-auto sm:h-auto bg-muted overflow-hidden rounded-lg">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            {/* Title and Location */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-medium text-brand">{product.title}</h3>
              </div>
              <p className="text-sm text-[#00000033]shrink-0">{product.location}</p>
            </div>

            {/* Price */}
           <div className="mt-3 w-full flex justify-between gap-2">
             <div>
               <span className="text-xl font-bold">{product.price}₾</span>
               {product.unit && (
                 <span className="text-sm text-muted-foreground ml-1">/ {product.unit}</span>
               )}
             </div>

             {/* Stats */}
             <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
               <div className="flex items-center gap-1">
                 <Eye className="h-4 w-4" />
                 <span>{product.views} Просмотров</span>
               </div>
               <div className="flex items-center gap-1">
                 <Calendar className="h-4 w-4" />
                 <span>{product.date}</span>
               </div>
               <div className="flex items-center gap-1">
                 <Heart className="h-4 w-4" />
                 <span>{product.favorites} Фаворитов</span>
               </div>
             </div>
           </div>
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between mt-4 pt-3">
            <div className="flex items-center gap-2">
              {product.isPremium && (
                <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center">
                  <IconPremium />
                </div>
              )}
              <Link href={`tel: ${23948570}`} className="flex items-center gap-2 text-sm text-muted-foreground no-underline hover:underline">
                <Phone className="h-4 w-4" />
                <span>{product.phone}</span>
              </Link>
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
    </div>
  )
}
