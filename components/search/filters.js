"use client"

import { useState } from "react"
import { ChevronDown, SlidersHorizontal, Search, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


const priceOptions = [
  { value: "", label: "Все цены" },
  { value: "0-10", label: "0 - 10₾" },
  { value: "10-50", label: "10 - 50₾" },
  { value: "50-100", label: "50 - 100₾" },
  { value: "100+", label: "100₾+" },
]

const weightOptions = [
  { value: "", label: "Все" },
  { value: "1kg", label: "1 кг" },
  { value: "5kg", label: "5 кг" },
  { value: "10kg", label: "10 кг" },
  { value: "50kg", label: "50 кг" },
]

const locationOptions = [
  { value: "", label: "Все локации" },
  { value: "tbilisi", label: "Тбилиси" },
  { value: "marneuli", label: "Марнеули" },
  { value: "bolnisi", label: "Болниси" },
  { value: "akhaltsikhe", label: "Ахалцихе" },
]

const typeOptions = [
  { value: "", label: "Все типы" },
  { value: "vegetables", label: "Овощи" },
  { value: "fruits", label: "Фрукты" },
  { value: "dairy", label: "Молочные" },
  { value: "grains", label: "Зерновые" },
  { value: "equipment", label: "Техника" },
]

const usageOrderOptions = [
  { value: "", label: "По умолчанию" },
  { value: "newest", label: "Сначала новые" },
  { value: "oldest", label: "Сначала старые" },
  { value: "price-asc", label: "Дешевые сначала" },
  { value: "price-desc", label: "Дорогие сначала" },
]

function FilterDropdown({
                          label,
                          options,
                          value,
                          onChange,
                        }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find(o => o.value === value)


  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border border-border rounded-lg">
      <CollapsibleTrigger className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors bg-transparent border-0 cursor-pointer">


        {selectedOption ? (
          <span className="text-foreground font-medium">
        {selectedOption.label}
      </span>
        ) : (
          <span className="text-sm text-muted-foreground">{label}</span>
        )}
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-3 pb-3 space-y-1">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={cn(
                "w-full text-left px-3 py-2 text-sm rounded-md transition-colors bg-transparent border-0",
                value === option.value
                  ? "bg-emerald-50 text-emerald-700 font-medium"
                  : "hover:bg-muted"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function SearchFilters({
                                filters,
                                onFiltersChange,
                                onSearch,
                                onReset,
                                variant = "sidebar",
                                onClose,
                              }) {
  const [sortOpen, setSortOpen] = useState(false)

  const updateFilter = (key, value) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const isDrawer = variant === "drawer"

  return (
    <div className={cn("flex flex-col h-full", isDrawer ? "p-4" : "")}>
      {/* Header for Drawer */}
      {isDrawer && (
        <div className="flex items-center justify-between mb-6">
          <button onClick={onClose} className="p-1">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
          <h2 className="font-medium text-center flex-1">Детальный фильтр</h2>
          <button
            onClick={onReset}
            className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="flex-1 space-y-4 overflow-y-auto flex flex-col gap-2 shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-lg p-3 mb-4">
        {/* Sort Button */}
        <Collapsible open={sortOpen} onOpenChange={setSortOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between p-3 border bg-transparent border-[#0F6A4F] rounded-lg hover:bg-emerald-50/50 transition-colors cursor-pointer">
            <span className="text-sm font-medium text-[#0F6A4F]">Сортировать</span>
            <SlidersHorizontal className="h-4 w-4 text-[#0F6A4F]" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-3 py-2 space-y-1 mt-1 border border-border rounded-lg">
              {usageOrderOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    updateFilter("usageOrder", option.value)
                    setSortOpen(false)
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm rounded-md transition-colors bg-transparent border-0",
                    filters.usageOrder === option.value
                      ? "bg-emerald-50 text-emerald-700 font-medium"
                      : "hover:bg-muted"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-lg p-3">
        <div className="flex-1 space-y-4 overflow-y-auto flex flex-col gap-2 ">
          {/* Filter Dropdowns */}
          <FilterDropdown
            label="Цена"
            options={priceOptions}
            value={filters.price.min ? `${filters.price.min}-${filters.price.max}` : ""}
            onChange={(value) => {
              if (value) {
                const [min, max] = value.split("-")
                updateFilter("price", { min, max: max || "" })
              } else {
                updateFilter("price", { min: "", max: "" })
              }
            }}
          />

          <FilterDropdown
            label="Вес"
            options={weightOptions}
            value={filters.weight}
            onChange={(value) => updateFilter("weight", value)}
          />

          <FilterDropdown
            label="Локация"
            options={locationOptions}
            value={filters.location}
            onChange={(value) => updateFilter("location", value)}
          />

          <FilterDropdown
            label="Тип"
            options={typeOptions}
            value={filters.type}
            onChange={(value) => updateFilter("type", value)}
          />

          <FilterDropdown
            label="Порядок Использования"
            options={usageOrderOptions}
            value={filters.usageOrder}
            onChange={(value) => updateFilter("usageOrder", value)}
          />
        </div>

        {/* Action Buttons */}
        <div className={cn("flex gap-3 pt-4", isDrawer ? "mt-auto" : "mt-6")}>
          <Button
            onClick={onSearch}
            className="flex-1 px-2 bg-brand text-white gap-2"
          >
            Поиск
            <Search className="h-4 w-4" />

          </Button>
          {!isDrawer && (
            <Button
              onClick={onReset}
              variant="outline"
              className="border-destructive px-2 text-destructive hover:bg-destructive/10 gap-2 bg-[#FF383C0D]"
            >
              Сбросить
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>


    </div>
  )
}
