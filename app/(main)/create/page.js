"use client"

import React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  FileText,
  Pencil,
  Camera,
  DollarSign,
  Phone,
  Zap,
  Crown,
  Sparkles,
  Check,
  X,
  ArrowLeft,
  Carrot,
  Apple,
  Milk,
  Wheat,
  Sprout,
  Wrench,
  Tractor,
  PawPrint,
  LayoutGrid,
} from "lucide-react"
import Link from "next/link"

const regions = [
  { value: "tbilisi", label: "Тбилиси" },
  { value: "batumi", label: "Батуми" },
  { value: "kutaisi", label: "Кутаиси" },
  { value: "rustavi", label: "Рустави" },
  { value: "marneuli", label: "Марнеули" },
  { value: "bolnisi", label: "Болниси" },
  { value: "akhaltsikhe", label: "Ахалцихе" },
]

const countryCodes = [
  { code: "+995", flag: "🇬🇪", country: "Georgia" },
  { code: "+7", flag: "🇷🇺", country: "Russia" },
  { code: "+1", flag: "🇺🇸", country: "USA" },
  { code: "+44", flag: "🇬🇧", country: "UK" },
]

const categories = [
  { id: "vegetables", label: "Овощи", icon: Carrot },
  { id: "fruits", label: "Фрукты", icon: Apple },
  { id: "dairy", label: "Молочные Продукты", icon: Milk },
  { id: "grains", label: "Зерновые", icon: Wheat },
  { id: "seedlings", label: "Саженцы", icon: Sprout },
  { id: "tools", label: "Инструменты", icon: Wrench },
  { id: "equipment", label: "Техника", icon: Tractor },
  { id: "animals", label: "Животные", icon: PawPrint },
]

const premiumPlans = [
  {
    id: "vip",
    name: "VIP",
    color: "text-brand",
    bgColor: "bg-brand",
    borderColor: "border-[#E8E9EA]",
    hoverBorder: "hover:border-brand",
    icon: Zap,
    priceMonthly: "12.00",
    priceDaily: "3.00",
    features: [
      "Сделай своё объявление быстрее продающимся, чем бесплатные.",
    ],
  },
  {
    id: "premium-plus",
    name: "Premium +",
    color: "text-[#FFCC00]",
    bgColor: "bg-[#FFCC00]",
    borderColor: "border-[#E8E9EA]",
    hoverBorder: "hover:border-[#FFCC00]",
    icon: Crown,
    priceMonthly: "32.00",
    priceDaily: "9.00",
    features: [
      "Покажите объявление в Premium+ карусели на главной странице сайта.",
      "Размести свою рекламу выше всех объявлений.",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    color: "text-[#FF6400]",
    bgColor: "bg-[#FF6400]",
    borderColor: "border-[#E8E9EA]",
    hoverBorder: "hover:border-[#FF6400]",
    icon: Sparkles,
    priceMonthly: "24.00",
    priceDaily: "5.00",
    features: [
      "Покажите объявление в Premium карусели на главной странице сайта.",
      "Размести свою рекламу выше VIP-объявлений.",
    ],
  },
]

export default function CreateProductPage() {
  const [formData, setFormData] = useState({
    region: "",
    productName: "",
    maxQuantity: "",
    description: "",
    price: "",
    phone: "",
    countryCode: "+995",
    currency: "GEL",
  })
  const [selectedCategory, setSelectedCategory] = useState()
  const [errors, setErrors] = useState({})
  const [images, setImages] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const toggleCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setErrors((prev) => ({ ...prev, category: undefined }))
  }

  const handleImageUpload = useCallback((e) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const url = event.target?.result
          setImages((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              url,
              file,
            },
          ])
        }
        reader.readAsDataURL(file)
      }
    })

    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: undefined }))
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [errors.images])

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!selectedCategory) {
      newErrors.category = "Выберите категорию"
    }
    if (!formData.region) {
      newErrors.region = "Выберите регион"
    }
    if (!formData.productName.trim()) {
      newErrors.productName = "Введите название товара"
    }
    if (!formData.maxQuantity.trim()) {
      newErrors.maxQuantity = "Укажите количество"
    } else if (Number.isNaN(Number(formData.maxQuantity)) || Number(formData.maxQuantity) <= 0) {
      newErrors.maxQuantity = "Введите корректное число"
    }
    if (!formData.description.trim()) {
      newErrors.description = "Введите описание"
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Описание должно быть не менее 20 символов"
    }
    if (images.length === 0) {
      newErrors.images = "Добавьте хотя бы одно фото"
    }
    if (!formData.price.trim()) {
      newErrors.price = "Укажите цену"
    } else if (Number.isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Введите корректную цену"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Укажите номер телефона"
    } else if (!/^\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Введите 9-значный номер"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    alert("Товар успешно опубликован!")
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <main className="flex-1 pb-20 md:pb-0">
        <div className=" mx-auto px-8 md:px-10 lg:px-12 py-4 md:py-6">
          {/* Back Button - Mobile */}
          <div className="md:hidden mb-4">
            <Link href="/public" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5"/>
              <span>Назад</span>
            </Link>
          </div>

          <div className="space-y-4">
            {/* Category Selection - Mobile Only */}
            <div className="bg-card rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.12)]  p-4 mb-4">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                <LayoutGrid className="h-4 w-4"/>
                <span>Выбирать Категорию</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  const isSelected = selectedCategory === category.id
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className={cn(
                        "inline-flex rounded-md cursor-pointer items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors border text-brand",
                        isSelected
                          ? "bg-[#0F6A4F] text-white border-[#0F6A4F]"
                          : "bg-background text-foreground border-[#0F6A4F] hover:bg-emerald-50 ",
                      )}
                    >
                      <Icon className={cn("h-3.5 w-3.5", isSelected ? "text-white": "text-brand")}/>
                      <span className={cn("", isSelected ? "text-white": "text-brand")}>{category.label}</span>
                    </button>
                  )
                })}
              </div>
              {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}

            </div>

            {/* Basic Characteristics */}
            <section className="bg-card rounded-xl  shadow-[0_0_20px_rgba(0,0,0,0.12)] p-4 md:p-6 mb-4">
              <div className="flex items-center gap-2 text-foreground font-medium mb-4">
                <FileText className="h-5 w-5"/>
                <span>Основные Характеристики</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Region */}
                <div className="space-y-1.5">
                  <Select value={formData.region} onValueChange={(v) => handleInputChange("region", v)}>
                    <SelectTrigger
                      className={cn(
                        "h-11 rounded-lg",
                        errors.region && "border-red-500 focus:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Страна / Регион"/>
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region.value} value={region.value}>
                          {region.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.region && <p className="text-xs text-red-500">{errors.region}</p>}
                </div>

                {/* Product Name */}
                <div className="space-y-1.5">
                  <Input
                    placeholder="Название товара"
                    value={formData.productName}
                    onChange={(e) => handleInputChange("productName", e.target.value)}
                    className={cn(
                      "h-11 rounded-lg",
                      errors.productName && "border-red-500 focus:ring-red-500"
                    )}
                  />
                  {errors.productName && <p className="text-xs text-red-500">{errors.productName}</p>}
                </div>

                {/* Max Quantity */}
                <div className="space-y-1.5">
                  <Input
                    placeholder="Макс. количество для продажи"
                    value={formData.maxQuantity}
                    onChange={(e) => handleInputChange("maxQuantity", e.target.value)}
                    className={cn(
                      "h-11 rounded-lg",
                      errors.maxQuantity && "border-red-500 focus:ring-red-500"
                    )}
                  />
                  {errors.maxQuantity && <p className="text-xs text-red-500">{errors.maxQuantity}</p>}
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="bg-card rounded-xl  shadow-[0_0_20px_rgba(0,0,0,0.12)] p-4 md:p-6 mb-4">
              <div className="flex items-center gap-2 text-foreground font-medium mb-4">
                <Pencil className="h-5 w-5"/>
                <span>Детальное Описание</span>
              </div>

              <div className="space-y-1.5">
                <Textarea
                  placeholder="Введите описание здесь..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={cn(
                    "min-h-[120px] rounded-lg resize-none",
                    errors.description && "border-red-500 focus:ring-red-500"
                  )}
                />
                {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
              </div>
            </section>

            {/* Price - Mobile Position */}
            <section className="md:hidden bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 text-foreground font-medium mb-4">
                <DollarSign className="h-5 w-5"/>
                <span>Цена</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Укажите цену"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className={cn(
                      "h-11 rounded-lg flex-1",
                      errors.price && "border-red-500 focus:ring-red-500"
                    )}
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleInputChange("currency", "GEL")}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                        formData.currency === "GEL"
                          ? "bg-emerald-600 text-white"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      ₾
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange("currency", "USD")}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                        formData.currency === "USD"
                          ? "bg-emerald-600 text-white"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      $
                    </button>
                    <span className="text-sm text-muted-foreground ml-1">/1kg</span>
                  </div>
                </div>
                {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
              </div>
            </section>

            {/* Contact - Mobile Position */}
            <section className="md:hidden bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 text-foreground font-medium mb-4">
                <Phone className="h-5 w-5"/>
                <span>Контакт</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Select
                    value={formData.countryCode}
                    onValueChange={(v) => handleInputChange("countryCode", v)}
                  >
                    <SelectTrigger className="w-[100px] h-11 rounded-lg">
                      <SelectValue>
                        <span className="flex items-center gap-1.5">
                          <span>{countryCodes.find((c) => c.code === formData.countryCode)?.flag}</span>
                          <span>{formData.countryCode}</span>
                        </span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.code}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Укажите номер телефона"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={cn(
                      "h-11 rounded-lg flex-1",
                      errors.phone && "border-red-500 focus:ring-red-500"
                    )}
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
              </div>
            </section>

            {/* Photos/Videos */}
            <section className="bg-card rounded-xl  shadow-[0_0_20px_rgba(0,0,0,0.12)] p-4 md:p-6 mb-4">
              <div className="flex items-center gap-2 text-foreground font-medium mb-4">
                <Camera className="h-5 w-5"/>
                <span>Фото / Видео</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap gap-3">
                  {/* Uploaded Images */}
                  {images.map((image) => (
                    <div key={image.id} className="relative group">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border border-border">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt="Uploaded preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute -top-2 -right-2 w-6 h-6  cursor-pointer border-0 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3.5 w-3.5"/>
                      </button>
                    </div>
                  ))}

                  {/* Add Photo Button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "w-20 h-20 md:w-24 cursor-pointer md:h-24 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-colors",
                      errors.images
                        ? "border-red-500 bg-red-50"
                        : "border-[#FF6400] bg-[#FFEFE5] "
                    )}
                  >
                    <Camera className={cn("h-6 w-6", errors.images ? "text-red-500" : "text-[#FF6400]")}/>
                    <span className={cn("text-xs font-medium", errors.images ? "text-red-500" : "text-[#FF6400]")}>
                      добавить фото
                    </span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                {errors.images && <p className="text-xs text-red-500">{errors.images}</p>}
              </div>
            </section>

            {/* Price - Desktop Position */}
            <section className="hidden md:block bg-card rounded-xl  shadow-[0_0_20px_rgba(0,0,0,0.12)] p-4 md:p-6 mb-4">
              <div className="flex items-center gap-2 text-foreground font-medium mb-4">
                <DollarSign className="h-5 w-5"/>
                <span>Цена</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <Input
                    placeholder="Укажите цену"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className={cn(
                      "h-11 rounded-lg max-w-xs",
                      errors.price && "border-red-500 focus:ring-red-500"
                    )}
                  />
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleInputChange("currency", "GEL")}
                      className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors border-0 cursor-pointer",
                        formData.currency === "GEL"
                          ? "bg-emerald-600 text-white"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                       ₾
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange("currency", "AMD")}
                      className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors border-0 cursor-pointer",
                        formData.currency === "AMD"
                          ? "bg-emerald-600 text-white"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      ֏
                    </button>
                    <span className="text-sm text-muted-foreground ml-1">/1kg</span>
                  </div>
                </div>
                {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
              </div>
            </section>

            {/* Contact - Desktop Position */}
            <section className="hidden md:block bg-card rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.12)] p-4 md:p-6 mb-4">
              <div className="flex items-center gap-2 text-foreground font-medium mb-4">
                <Phone className="h-5 w-5"/>
                <span>Контакт</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 max-w-md">
                  <Select
                    value={formData.countryCode}
                    onValueChange={(v) => handleInputChange("countryCode", v)}
                  >
                    <SelectTrigger className="w-[110px] h-11 rounded-lg">
                      <SelectValue>
                        <span className="flex items-center gap-1.5">
                          <span>{countryCodes.find((c) => c.code === formData.countryCode)?.flag}</span>
                          <span>{formData.countryCode}</span>
                        </span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.code}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Укажите номер телефона"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={cn(
                      "h-11 rounded-lg flex-1",
                      errors.phone && "border-red-500 focus:ring-red-500"
                    )}
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
              </div>
            </section>

            {/* Quick Sale Plans */}
            <section className="bg-card rounded-xl  shadow-[0_0_20px_rgba(0,0,0,0.12)] p-4 md:p-6 mb-4">
              <div className="flex items-center gap-2 text-foreground font-medium mb-4">
                <Zap className="h-5 w-5"/>
                <span>Быстрая Продажа</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {premiumPlans.map((plan) => {
                  const Icon = plan.icon
                  const isSelected = selectedPlan === plan.id
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlan(isSelected ? null : plan.id)}
                      className={cn(
                        "relative text-left rounded-xl border-2 p-4 transition-all bg-transparent cursor-pointer h-[280px] lg:h-[320px] flex flex-col justify-between",
                        plan.borderColor,
                        plan.hoverBorder,
                        isSelected && "ring-2 ring-offset-2",
                        isSelected && plan.id === "vip" && "ring-brand",
                        isSelected && plan.id === "premium-plus" && "ring-[#FFCC00]",
                        isSelected && plan.id === "premium" && "ring-[#FF6400]"
                      )}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <h3 className={cn("text-2xl font-semibold", plan.color)}>{plan.name}</h3>
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", plan.bgColor)}>
                          <Icon className="h-5 w-5 text-white"/>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2 mb-4 min-h-[80px]">
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div
                              className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="h-2.5 w-2.5 text-[#34C759]"/>
                            </div>
                            <span className="text-sm text-muted-foreground leading-tight">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Price & Selection */}
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div>
                          <span className="text-lg font-bold">{plan.priceDaily}₾</span>
                          <span className="text-sm text-muted-foreground">/День</span>
                        </div>
                        <div
                          className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                            isSelected
                              ? plan.id === "vip"
                                ? "border-brand bg-brand"
                                : plan.id === "premium-plus"
                                  ? "border-[#FFCC00] bg-[#FFCC00]"
                                  : "border-[#FF6400] bg-[#FF6400]"
                              : "border-muted-foreground/30"
                          )}
                        >
                          {isSelected && <Check className="h-3.5 w-3.5 text-white"/>}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Submit Section */}
            <section className="bg-card rounded-xl  shadow-[0_0_20px_rgba(0,0,0,0.12)] p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Проверьте точность данных перед окончательной публикацией.
                </p>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-8 h-11"
                >
                  {isSubmitting ? "Публикация..." : "Опубликовать"}
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>

    </div>
  )
}
