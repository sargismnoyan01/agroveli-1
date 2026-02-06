"use client"

import React, { useState } from "react"
import { ChevronDown, SlidersHorizontal, Search, Trash2, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/constants";
import { initialFilters } from "@/components/search/SearchClient";

const usageOrderOptions = [
  { value: "", label: "По умолчанию" },
  { value: "-created_at", label: "Сначала новые" },       // նորից հին
  { value: "created_at", label: "Сначала старые" },       // հնից նոր
  { value: "price_dram", label: "Дешевые сначала" },     // էժանից թանկ
  { value: "-price_dram", label: "Дорогие сначала" },    // թանկից էժան
  { value: "price_lari", label: "Дешевые сначала" },   // էժանից թանկ
  { value: "-price_lari", label: "Дорогие сначала" },  // թանկից էժան
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
  const [sortOpen, setSortOpen] = useState(false);
  const [innerFilters, setInnerFilters] = useState(filters || initialFilters)


  const updateFilter = (key, value) => {
    setInnerFilters({ ...innerFilters, [key]: value })
  }

  const isDrawer = variant === "drawer"

  return (
    <div className={cn("flex flex-col h-full", isDrawer ? "p-4" : "")}>
      {/* Header for Drawer */}
      {isDrawer && (
        <div className="flex items-center justify-between mb-6">
          <button onClick={onClose} className="p-1 bg-transparent border-0">
            <ChevronLeft className="h-6 w-6 text-muted-foreground" />
          </button>
          <h2 className="font-medium text-center flex-1">Детальный фильтр</h2>
          <button
            onClick={onReset}
            className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors  bg-transparent border-0"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="flex-1 h-fit max-h-fit space-y-4 overflow-y-auto flex flex-col gap-2 shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-lg p-3 mb-4">
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
                    "w-full text-left px-3 py-2 text-sm rounded-md transition-colors bg-transparent border-0 cursor-pointer",
                    innerFilters.usageOrder === option.value
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
        <div className="flex-1 space-y-4 flex flex-col gap-2 ">

          <div className="flex items-center gap-2 justify-between">
            <Input
              placeholder="Цена от "
              value={innerFilters.price_from || ""}
              type="number"
              max={innerFilters.price_to}
              onChange={(e) => updateFilter("price_from", e.target.value)}
              className={cn(
                "h-11 rounded-lg flex-1",
              )}
            />
            -
            <Input
              placeholder="Цена до "
              value={innerFilters.price_to || ""}
              min={innerFilters.price_from}
              type="number"
              onChange={(e) => updateFilter("price_to", e.target.value)}
              className={cn(
                "h-11 rounded-lg flex-1",
              )}
            />
          </div>

          <Input
            placeholder="Локация"
            value={innerFilters.location || ""}
            onChange={(e) => updateFilter("location", e.target.value)}
            className={cn(
              "h-11 rounded-lg flex-1",
            )}
          />


          <FilterDropdown
            label="Категория"
            options={categories}
            value={innerFilters.type}
            onChange={(value) => updateFilter("type", value)}
          />
        </div>

        {/* Action Buttons */}
        <div className={cn("flex gap-3 pt-4", isDrawer ? "mt-auto" : "mt-6")}>
          <Button
            onClick={()=> {
              onFiltersChange(innerFilters)
              onSearch()
            }}
            className="flex-1 px-2 bg-brand text-white gap-2 hover:bg-brand cursor-pointer"
          >
            Поиск
            <Search className="h-4 w-4" />

          </Button>
          {!isDrawer && (
            <Button
              onClick={()=> {
                setInnerFilters(initialFilters);
                onReset()
              }}
              variant="outline"
              className="border-destructive px-2 text-destructive hover:bg-destructive/10 gap-2 bg-[#FF383C0D] cursor-pointer"
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
