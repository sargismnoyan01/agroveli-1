"use client"

import { useState } from "react"
import {
  LayoutGrid,
  Carrot,
  Apple,
  Milk,
  Wheat,
  Sprout,
  Wrench,
  Tractor,
  PawPrint,
  SlidersHorizontal,
  ListFilter,
  ChevronDown,
  Search,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { categories } from "@/lib/constants";


const filters = [
  { id: "price", label: "Цена" },
  { id: "weight", label: "Вес" },
  { id: "location", label: "Локация" },
  { id: "type", label: "Тип" },
  { id: "usage", label: "Порядок Использования" },
]

const priceRanges = [
  { from: 1, to: 5 },
  { from: 2, to: 6 },
  { from: 3, to: 7 },
  { from: 4, to: 8 },
]

export function CategoryFilters() {
  const [activeFilters, setActiveFilters] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("")

  const toggleCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  }

  const handleReset = () => {
    setSelectedCategory("")
    setActiveFilters({})
  }

  return (
    <div className="bg-background ">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-card rounded-xl border border-border p-4 md:p-6 space-y-4 shadow-md">
          {/* Categories */}
          <div className="flex justify-between flex-wrap items-start gap-3 pb-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground shrink-0 pt-1.5">
              <LayoutGrid className="h-4 w-4" />
              <span>Категория</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon
                const isSelected = category.id === selectedCategory
                return (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={cn(
                      "inline-flex rounded-md cursor-pointer items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors border",
                      isSelected
                        ? "bg-[#0F6A4F] text-white border-[#0F6A4F]"
                        : "bg-background text-foreground border-[#0F6A4F] hover:bg-emerald-50 ",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{category.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Filters */}
          <div className="flex justify-between flex-wrap items-center gap-3  border-t border-border pt-3 pb-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground shrink-0">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Фильтры</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <FilterDropdown
                    key={filter.id}
                    filter={filter}
                    value={activeFilters[filter.id]}
                    onChange={(value) => setActiveFilters((prev) => ({ ...prev, [filter.id]: value }))}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Results Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <ListFilter className="h-4 w-4" />
              <span>Результаты</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleReset}
                className="rounded-lg h-10 border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600 gap-2 bg-transparent"
              >
                Сбросить
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button className="rounded-lg h-10 bg-[#0F6A4F] text-white gap-2">
                Поиск
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterDropdown({
                          filter,
                          value,
                          onChange,
                        }) {
  if (filter.id === "price") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-9 rounded-lg gap-1 text-sm font-normal border-border bg-transparent">
            {filter.label}
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48 p-3">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-center font-medium border rounded px-2 py-1">От</div>
              <div className="text-center font-medium border rounded px-2 py-1">До</div>
            </div>
            {priceRanges.map((range, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-2 text-sm cursor-pointer hover:bg-muted rounded"
                onClick={() => onChange(`${range.from}-${range.to}`)}
              >
                <div className="text-center py-1">{range.from}</div>
                <div className="text-center py-1">{range.to}</div>
              </div>
            ))}
            <Button size="sm" className="w-full bg-[#0F6A4F]  text-white">
              Выбирать
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 rounded-lg gap-1 text-sm font-normal border-border bg-transparent">
          {filter.label}
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => onChange("option1")}>Опция 1</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("option2")}>Опция 2</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("option3")}>Опция 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
