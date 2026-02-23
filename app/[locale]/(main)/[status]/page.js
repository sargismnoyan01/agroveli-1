"use client"

import React, { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { ProductCard } from "@/components/search/product-card";
import { useGetProductsQuery } from "@/lib/store/services/productApi";
import { ProductCardSkeleton } from "@/components/shared/ProductCardSkeleton";
import CustomPagination from "@/components/shared/CustomPagination";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation"; // Локализованный Link
import StatusBadge, { statusTitles } from "@/components/shared/StatusBadge";
import { useTranslations } from "next-intl";

export default function SearchPage() {
  const t = useTranslations("SearchPage");
  const [page, setPage] = useState(1);
  const params = useParams();
  const status = params.status;

  const { data, isLoading, isFetching } = useGetProductsQuery({
    global: true,
    page,
    status,
  });

  const totalResults = data?.total_items;
  const totalPages = data?.total_pages;

  if(!status) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 px-8 md:px-10 lg:px-12 mx-auto w-full py-6 pb-24 md:pb-6">

        {/* Хлебные крошки */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="flex items-center gap-2 hover:scale-[1.1]">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <span>{t("breadcrumb_home")}</span>
          <span>/</span>
          <span >{statusTitles[status]}</span>
        </div>

        <StatusBadge status={status} />

        <div className="flex gap-6 mt-10">
          <div className="flex-1">
            {/* Сообщение о пустом результате */}
            {!isLoading && !isFetching && !data?.results?.length && (
              <p className="text-center text-xl text-muted-foreground">
                {t("no_results")}
              </p>
            )}

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
    </div>
  )
}