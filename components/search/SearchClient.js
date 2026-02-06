"use client"

import { useState } from "react"
import { Grid3X3, List, SlidersHorizontal, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { SearchFilters } from "@/components/search/filters";
import { ProductCard } from "@/components/search/product-card";
import { useGetProductsQuery } from "@/lib/store/services/productApi";
import { ProductCardSkeleton } from "@/components/shared/ProductCardSkeleton";
import CustomPagination from "@/components/shared/CustomPagination";
import { useSearchParams } from "next/navigation";

export const initialFilters = {
  price: { min: "", max: "" },
  price_from: "",
  price_to: "",
  weight: "",
  location: "",
  type: "",
  usageOrder: "",
}

export default function SearchClient() {
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid")
  const [filters, setFilters] = useState(initialFilters)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const searchParams = useSearchParams();
  const q = searchParams.get('query')

  const { data, isLoading, isFetching } = useGetProductsQuery({
    global: true,
    page,
    price_lari__gte: filters.price_from,
    price_lari__lte: filters.price_to,
    category: filters.type,
    search: q,
    location: filters.location,
    ordering: filters.usageOrder,
  });

  const toggleFavorite = (productId) => {

  }

  const handleSearch = () => {
    setMobileFilterOpen(false);
  }

  const handleReset = () => {
    setFilters(initialFilters);
  }


  const totalResults = data?.total_items;
  const totalPages = data?.total_pages;

  return (
    <div className="min-h-screen flex flex-col bg-background">

      <main className="flex-1 px-8 md:px-10 lg:px-12 mx-auto w-full py-6 pb-24 md:pb-6">
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4 flex items-center justify-between">
          <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 hover:text-white"
              >
                Детальный фильтр
                <SlidersHorizontal className="h-4 w-4"/>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-[400px] p-0">
              <SearchFilters
                filters={filters}
                onFiltersChange={setFilters}
                onSearch={handleSearch}
                onReset={handleReset}
                variant="drawer"
                onClose={() => setMobileFilterOpen(false)}
              />
            </SheetContent>
          </Sheet>
          <Button
            variant="outline"
            size="icon"
            className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
            onClick={handleReset}
          >
            <Trash2 className="h-4 w-4"/>
          </Button>
        </div>

        {/* Results Count & View Toggle */}
        <div className="hidden md:flex items-center justify-between mb-6">
          <h1 className="text-lg md:text-xl font-semibold">
            {totalResults} Объявление
          </h1>
          <div className="flex items-center gap-2  p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1  transition-colors bg-transparent border-0",
                viewMode === "grid"
                  ? "border-b-[2px] border-b-[#0F6A4F] [&_svg]:stroke-[#0F6A4F]"
                  : "text-muted-foreground  cursor-pointer"
              )}
              aria-label="Grid view"
            >
              <Grid3X3 className="h-5 w-5"/>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1 transition-colors bg-transparent border-0",
                viewMode === "list"
                  ? "border-b-[2px] border-b-[#0F6A4F] [&_svg]:stroke-[#0F6A4F]"
                  : "text-muted-foreground cursor-pointer"
              )}
              aria-label="List view"
            >
              <List className="h-5 w-5"/>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24">
              <SearchFilters
                filters={filters}
                onFiltersChange={setFilters}
                onSearch={handleSearch}
                onReset={handleReset}
              />
            </div>
          </aside>

          {/* Products Grid/List */}
          <div className="flex-1">
            {!isLoading && !isFetching && !data?.results?.length &&
              <p className="text-center text-xl text-muted-foreground">
                По вашему запросу товары не найдены
              </p>}
            {viewMode === "grid" ? (
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
            ) : (
              <div className="flex flex-col gap-4">
                {data?.results?.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode="list"
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
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
