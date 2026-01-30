"use client"

import { useState } from "react"
import { Grid3X3, List, SlidersHorizontal, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { SearchFilters } from "@/components/search/filters";
import { ProductCard } from "@/components/search/product-card";

// Mock data for products
const mockProducts = [
  {
    id: 1,
    image: "/assets/images/mandarin.png",
    title: "Мандарин",
    location: "Марнеули",
    price: "2.5",
    unit: "1kg",
    views: 1244,
    date: "03 ноября 2025",
    favorites: 345,
    phone: "+591 05 05 93",
    isFavorite: false,
    isPremium: true,
  },
  {
    id: 2,
    image: "/assets/images/mandarin.png",
    title: "Молоко",
    location: "Марнеули",
    price: "2",
    unit: "1L",
    views: 1244,
    date: "03 ноября 2025",
    favorites: 345,
    phone: "+591 05 05 93",
    isFavorite: true,
    isPremium: true,
  },
  {
    id: 3,
    image: "/assets/images/mandarin.png",
    title: "Картофель",
    location: "Болниси",
    price: "1.2",
    unit: "1kg",
    views: 1244,
    date: "03 ноября 2025",
    favorites: 345,
    phone: "+591 05 05 93",
    isFavorite: false,
    isPremium: false,
  },
  {
    id: 4,
    image: "/assets/images/mandarin.png",
    title: "Морковь",
    location: "Ахалцихе",
    price: "2.5",
    unit: "1kg",
    views: 1244,
    date: "03 ноября 2025",
    favorites: 345,
    phone: "+591 05 05 93",
    isFavorite: false,
    isPremium: false,
  },
  {
    id: 5,
    image: "/assets/images/mandarin.png",
    title: "Трактор",
    location: "Тбилиси",
    price: "60000",
    views: 1244,
    date: "03 ноября 2025",
    favorites: 345,
    phone: "+591 05 05 93",
    isFavorite: true,
    isPremium: true,
  },
  {
    id: 6,
    image: "/assets/images/mandarin.png",
    title: "Кукуруза",
    location: "Тбилиси",
    price: "2.5",
    unit: "1kg",
    views: 1244,
    date: "03 ноября 2025",
    favorites: 345,
    phone: "+591 05 05 93",
    isFavorite: false,
    isPremium: false,
  },
  {
    id: 7,
    image: "/assets/images/mandarin.png",
    title: "Лопатка",
    location: "Болниси",
    price: "12",
    views: 1244,
    date: "03 ноября 2025",
    favorites: 345,
    phone: "+591 05 05 93",
    isFavorite: false,
    isPremium: false,
  },
  {
    id: 8,
    image: "/assets/images/mandarin.png",
    title: "Морковь",
    location: "Ахалцихе",
    price: "2.5",
    unit: "1kg",
    views: 1244,
    date: "03 ноября 2025",
    favorites: 345,
    phone: "+591 05 05 93",
    isFavorite: false,
    isPremium: false,
  },
  {
    id: 9,
    image: "/assets/images/mandarin.png",
    title: "Мандарин",
    location: "Марнеули",
    price: "2.5",
    unit: "1kg",
    views: 1244,
    date: "03 ноября 2025",
    favorites: 345,
    phone: "+591 05 05 93",
    isFavorite: false,
    isPremium: true,
  },
  {
    id: 10,
    image: "/assets/images/mandarin.png",
    title: "Трактор",
    location: "Тбилиси",
    price: "60000",
    views: 1244,
    date: "03 ноября 2025",
    favorites: 345,
    phone: "+591 05 05 93",
    isFavorite: false,
    isPremium: true,
  },
  {
    id: 11,
    image: "/assets/images/mandarin.png",
    title: "Картофель",
    location: "Болниси",
    price: "1.2",
    unit: "1kg",
    views: 1244,
    date: "03 ноября 2025",
    favorites: 345,
    phone: "+591 05 05 93",
    isFavorite: false,
    isPremium: false,
  },
  {
    id: 12,
    image: "/assets/images/mandarin.png",
    title: "Молоко",
    location: "Марнеули",
    price: "2",
    unit: "1L",
    views: 1244,
    date: "03 ноября 2025",
    favorites: 345,
    phone: "+591 05 05 93",
    isFavorite: false,
    isPremium: false,
  },
]

const initialFilters = {
  price: { min: "", max: "" },
  weight: "",
  location: "",
  type: "",
  usageOrder: "",
}

export default function SearchPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [products, setProducts] = useState(mockProducts)
  const [filters, setFilters] = useState(initialFilters)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const toggleFavorite = (productId) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p))
    )
  }

  const handleSearch = () => {
    // In a real app, this would filter the products based on filters
    setMobileFilterOpen(false)
  }

  const handleReset = () => {
    setFilters(initialFilters)
  }

  const totalResults = products.length

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
                <SlidersHorizontal className="h-4 w-4" />
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
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Results Count & View Toggle */}
        <div className="flex items-center justify-between mb-6">
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
              <Grid3X3 className="h-5 w-5" />
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
              <List className="h-5 w-5" />
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
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
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
                {products.map((product) => (
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
      </main>

      {/*<MobileNavigation />*/}
    </div>
  )
}
