"use client"

import React, { useState } from "react"
import { BadgeIcon, Crown, Grid3X3, List, SlidersHorizontal, Sparkles, Trash2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { SearchFilters } from "@/components/search/filters";
import { ProductCard } from "@/components/search/product-card";
import { useGetProductsQuery } from "@/lib/store/services/productApi";
import { ProductCardSkeleton } from "@/components/shared/ProductCardSkeleton";
import CustomPagination from "@/components/shared/CustomPagination";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import StatusBadge from "@/components/shared/StatusBadge";

export default function SearchPage() {
  const [page, setPage] = useState(1);
  const params = useParams();
  const status = params.status;

  const { data, isLoading, isFetching } = useGetProductsQuery({
    global: true,
    page,
    status,
  });

  const toggleFavorite = (productId) => {

  }

  const totalResults = data?.total_items;
  const totalPages = data?.total_pages;

  if(!status)return;

  return (
    <div className="min-h-screen flex flex-col bg-background">

      <main className="flex-1 px-8 md:px-10 lg:px-12 mx-auto w-full py-6 pb-24 md:pb-6">

        <StatusBadge status={status} />

        {/* Main Content */}
        <div className="flex gap-6">

          {/* Products Grid/List */}
          <div className="flex-1">
            {!isLoading && !isFetching && !data?.results?.length && <p className="text-center text-xl text-muted-foreground">
              По вашему запросу товары не найдены
            </p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {isLoading || isFetching
                ? Array.from({ length: 12 }, (_, i) => (
                  <ProductCardSkeleton key={i}/>
                ))
                : data?.results?.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode="grid"
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
            </div>
          </div>
        </div>

        {totalPages > 1 && !isLoading &&
          <CustomPagination
            page={page}
            setPage={setPage}
            totalResults={totalResults}
            totalPages={totalPages}
          />
        }
      </main>

      {/*<MobileNavigation />*/}
    </div>
  )
}
