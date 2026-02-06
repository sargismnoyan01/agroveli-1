"use client"

import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailsSkeleton() {
  return (
    <div className=" mx-auto px-4 py-4 md:px-10 lg:px-12 xl:px-16 2xl:px-48 mt-36">
      <div className="flex flex-col lg:flex-row gap-8 p-6">
        {/* Left: Images */}
        <div className="flex gap-4 w-full lg:w-2/3">
          {/* Thumbnails */}
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-16 h-16 rounded-lg"/>
            ))}
          </div>
          {/* Main Image */}
          <Skeleton className="flex-1 h-[400px] rounded-xl"/>
        </div>

        {/* Right: Product Info */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Price & Title */}
          <div className="space-y-2">
            <Skeleton className="w-32 h-8 rounded-md"/> {/* Price */}
            <Skeleton className="w-3/4 h-6 rounded-md"/> {/* Title */}
            <Skeleton className="w-1/2 h-4 rounded-md"/> {/* Location */}
          </div>

          {/* Stats: Views, Favorites, Date */}
          <div className="flex gap-4">
            <Skeleton className="w-20 h-4 rounded-md"/>
            <Skeleton className="w-20 h-4 rounded-md"/>
            <Skeleton className="w-32 h-4 rounded-md"/>
          </div>

          {/* Seller Info */}
          <div className="flex items-center gap-2">
            <Skeleton className="w-12 h-12 rounded-full"/> {/* Avatar */}
            <Skeleton className="w-32 h-4 rounded-md"/> {/* Name */}
          </div>

          {/* Contact */}
          <Skeleton className="w-40 h-4 rounded-md"/> {/* Phone */}

          {/* Additional Info: SKU, Category, Country */}
          <div className="space-y-2">
            <Skeleton className="w-full h-4 rounded-md"/>
            <Skeleton className="w-3/4 h-4 rounded-md"/>
            <Skeleton className="w-1/2 h-4 rounded-md"/>
          </div>

          {/* Favorites Button */}
          <Skeleton className="w-10 h-10 rounded-full self-start"/>
        </div>


      </div>
      {/* Bottom: Description */}
      <div className="mt-6 w-full">
        <Skeleton className="w-40 h-6 rounded-md mb-2"/> {/* "Детальное описание" */}
        <Skeleton className="w-full h-24 rounded-md"/> {/* Description text */}
      </div>
    </div>
  )
}
