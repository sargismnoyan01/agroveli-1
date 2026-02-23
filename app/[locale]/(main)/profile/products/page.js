"use client"

import Image from "next/image"
import { useGetUserProductsQuery } from "@/lib/store/services/productApi";
import React from "react";
import { useTranslations } from "next-intl"; // Добавил импорт
import { ProductCardSkeleton } from "@/components/shared/ProductCardSkeleton";
import { ProductCard } from "@/components/search/product-card";

export default function MyProductsPage() {
  const t = useTranslations("MyProducts"); // Инициализация

  const { data, isLoading, isFetching } = useGetUserProductsQuery({});

  return (
    <div className="flex items-center justify-center min-h-[400px] lg:min-h-[500px] md:shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl">

      <main className="p-0 md:px-8 md:py-6 flex-1 lg:px-12 mx-auto w-full pb-24 md:pb-6">

        {!isLoading && !isFetching && !data?.length && <div
          className="rounded-xl border border-border bg-card p-8 md:p-12 flex flex-col items-center text-center max-w-md mx-auto">
          <Image
            src="/assets/images/no-products.png"
            alt="Empty box with vegetables"
            width={240}
            height={200}
            className="mb-6"
          />
          <h3 className="text-xl font-bold text-foreground text-balance">
            {t("emptyTitle")}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed text-balance">
            {t("emptyDescription")}
          </p>
        </div>}
        {/* Main Content */}
        <div className="flex gap-6">

          {/* Products Grid/List */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading || isFetching
                ? Array.from({ length: 12 }, (_, i) => (
                  <ProductCardSkeleton key={i}/>
                ))
                : data?.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode="grid"
                  />
                ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}