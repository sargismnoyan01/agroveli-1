"use client"

import { useState } from "react"
import {
  LayoutGrid,
  SlidersHorizontal,
  ListFilter,
  ChevronDown,
  Search,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { categories } from "@/lib/constants"
// ВАЖНО: используем наш роутер с поддержкой локалей
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const initialFilters = {
  price_from: "",
  price_to: "",
  location: "",
  type: "",
  usageOrder: "",
}

export function CategoryFilters() {
  const t = useTranslations("Filters");
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const router = useRouter();

  // Опции сортировки теперь получаем через ключи перевода
  const usageOrderOptions = [
    { value: "", label: t("sort.default") },
    { value: "-created_at", label: t("sort.newest") },
    { value: "created_at", label: t("sort.oldest") },
    { value: "price_dram", label: t("sort.cheap_amd") },
    { value: "-price_dram", label: t("sort.expensive_amd") },
    { value: "price_lari", label: t("sort.cheap_gel") },
    { value: "-price_lari", label: t("sort.expensive_gel") },
  ]

  const updateFilter = (key, value) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  }

  const handleReset = () => {
    setActiveFilters(initialFilters);
  }

  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value);
      }
    });

    const queryString = params.toString();
    // useRouter из i18n автоматически добавит /ru или /hy перед /search
    router.push(queryString ? `/search?${queryString}` : "/search");
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-card rounded-xl border border-border p-4 md:p-6 space-y-4 shadow-md">

          {/* Категории */}
          <div className="flex justify-between flex-wrap items-start gap-3 pb-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground shrink-0 pt-1.5">
              <LayoutGrid className="h-4 w-4"/>
              <span>{t("category_label")}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon
                const isSelected = activeFilters.type === category.id
                return (
                  <button
                    key={category.id}
                    onClick={() => updateFilter("type", isSelected ? "" : category.id)}
                    className={cn(
                      "inline-flex rounded-md cursor-pointer items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors border",
                      isSelected
                        ? "bg-[#0F6A4F] text-white border-[#0F6A4F]"
                        : "bg-background text-foreground border-[#0F6A4F] hover:bg-emerald-50",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5"/>
                    {/* Текст категорий лучше тоже переводить через t(`categories.${category.id}`) */}
                    <span>{t(`categories.${category.id}`)}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Фильтры */}
          <div className="flex justify-between flex-wrap items-center gap-3 border-t border-border pt-3 pb-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground shrink-0">
              <SlidersHorizontal className="h-4 w-4"/>
              <span>{t("filters_label")}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">

              {/* Цена */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline"
                          className="h-9 rounded-lg gap-1 text-sm font-normal border-border bg-transparent">
                    {activeFilters.price_from || activeFilters.price_to
                      ? `${t("price")}: ${activeFilters.price_from || 0} - ${activeFilters.price_to || '...'}`
                      : t("price")}
                    <ChevronDown className="h-3.5 w-3.5"/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="p-3 w-64">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder={t("from")}
                      type="number"
                      value={activeFilters.price_from}
                      onChange={(e) => updateFilter("price_from", e.target.value)}
                      className="h-9"
                    />
                    <span>-</span>
                    <Input
                      placeholder={t("to")}
                      type="number"
                      value={activeFilters.price_to}
                      onChange={(e) => updateFilter("price_to", e.target.value)}
                      className="h-9"
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Локация */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline"
                          className="h-9 rounded-lg gap-1 text-sm font-normal border-border bg-transparent">
                    {activeFilters.location || t("location")}
                    <ChevronDown className="h-3.5 w-3.5"/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="p-3 w-64">
                  <Input
                    placeholder={t("enter_city")}
                    value={activeFilters.location}
                    onChange={(e) => updateFilter("location", e.target.value)}
                    className="h-9"
                  />
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Сортировка */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline"
                          className="h-9 rounded-lg gap-1 text-sm font-normal border-border bg-transparent">
                    {usageOrderOptions.find(o => o.value === activeFilters.usageOrder)?.label || t("sort_label")}
                    <ChevronDown className="h-3.5 w-3.5"/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {usageOrderOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => updateFilter("usageOrder", option.value)}
                      className={cn(activeFilters.usageOrder === option.value && "bg-emerald-50 text-emerald-700")}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
          </div>

          {/* Результаты */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <ListFilter className="h-4 w-4"/>
              <span>{t("results")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleReset}
                className="rounded-lg h-10 border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600 gap-2 bg-transparent"
              >
                {t("reset")}
                <Trash2 className="h-4 w-4"/>
              </Button>
              <Button
                onClick={handleSearch}
                className="rounded-lg h-10 bg-[#0F6A4F] text-white gap-2 hover:bg-[#0D5A43]"
              >
                {t("search_btn")}
                <Search className="h-4 w-4"/>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}