"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Thumbs } from "swiper/modules"
import {
  ArrowLeft,
  Heart,
  Eye,
  Calendar,
  Phone,
  Copy,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Crown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation";
import { useGetProductQuery } from "@/lib/store/services/productApi";
import StatusBadge from "@/components/shared/StatusBadge";
import { ProductDetailsSkeleton } from "@/components/shared/ProductDetailsSkeleton";

// import "swiper/css"
// import "swiper/css/navigation"
// import "swiper/css/pagination"
// import "swiper/css/thumbs"

// Mock product data
const productData = {
  id: "1",
  name: "Мандарин",
  location: "Марнеули",
  price: 2.25,
  currency: "GEL",
  unit: "1kg",
  maxQuantity: 400,
  views: 1244,
  favorites: 345,
  date: "03 ноября 2025",
  seller: {
    name: "Sargisi Mnovishvili",
    phone: "+591 05 05 93",
    avatar: null,
  },
  article: "42334432",
  category: "Фрукты",
  country: "Грузия",
  description:
    "Свежие грузинские мандарины, выращенные в солнечных садах региона Марнеули. Отличаются ярким ароматом, тонкой кожурой и естественной сладостью. Плоды созревают без химических добавок, собираются вручную и сразу доставляются к покупателю. Идеальны для употребления в свежем виде, соков и десертов.",
  images: [
    "/assets/images/mandarin.png",
    "/assets/images/mandarin.png",
    "/assets/images/mandarin.png",
    "/assets/images/mandarin.png",
  ],
  isPremium: true,
}

export default function ProductPage() {
  const [isFavorite, setIsFavorite] = useState(true)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const mainSwiperRef = useRef(null);
  const {id} = useParams();
  const {data, isLoading, isFetching} = useGetProductQuery({id});

  console.log(data, 'data')

  const handleCopyArticle = () => {
    navigator.clipboard.writeText(productData.article)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollThumbs = (direction) => {
    if (thumbsSwiper) {
      if (direction === "up") {
        thumbsSwiper.slidePrev()
      } else {
        thumbsSwiper.slideNext()
      }
    }
  }

  if(isLoading || isFetching){
    return <ProductDetailsSkeleton/>;
  }

  if(!data){
    return;
  }

  return (
    <div className="min-h-screen bg-muted/30">
       {/*Breadcrumb Header*/}
      <div className="bg-background border-b border-border">
        <div className=" mx-auto px-4 py-4 md:px-10 lg:px-12 xl:px-16 2xl:px-48">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <span className="text-muted-foreground">Главная</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">{data.category}</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{data.name}</span>
            </div>

            {data.status !== "ORDINARY" && <StatusBadge status={data.status} />}

          </div>
        </div>
      </div>


      <main className=" mx-auto px-4 py-8 md:px-10 lg:px-12 xl:px-16 2xl:px-48">
        {/* Desktop/Tablet Layout */}
        <div className="hidden md:grid md:grid-cols-[auto_1fr_380px] lg:grid-cols-[100px_1fr_400px] gap-4 lg:gap-6">
          {/* Thumbnail Gallery - Desktop/Tablet */}
          <div className="flex flex-col items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-8 w-8 bg-background"
              onClick={() => scrollThumbs("up")}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>

            <div className="h-[400px] overflow-hidden">
              <Swiper
                onSwiper={setThumbsSwiper}
                direction="vertical"
                spaceBetween={8}
                slidesPerView={4}
                watchSlidesProgress
                modules={[Thumbs]}
                className="h-full"
              >
                {data.images.map((image, index) => (
                  <SwiperSlide key={index} className="!h-auto">
                    <button
                      type="button"
                      onClick={() => mainSwiperRef.current?.slideTo(index)}
                      className={cn(
                        "w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all",
                        activeIndex === index ? "border-emerald-500" : "border-transparent"
                      )}
                    >
                      <Image
                        src={image.image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-8 w-8 bg-background"
              onClick={() => scrollThumbs("down")}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Main Image Swiper - Desktop/Tablet */}
          <div className="relative  max-w-[450px] xl:max-w-[750px]">
            <Swiper
              onSwiper={(swiper) => {
                mainSwiperRef.current = swiper
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              modules={[Navigation, Pagination, Thumbs]}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet !bg-white/60 !w-2 !h-2",
                bulletActiveClass: "!bg-white !w-3 !h-3",
              }}
              className="relative h-[420px] w-full max-w-full lg:h-[520px] rounded-xl overflow-hidden"
            >
              {data.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image.image || "/placeholder.svg"}
                    alt={`Product image ${index + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 bg-background/80 hover:bg-background"
              onClick={() => mainSwiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 bg-background/80 hover:bg-background"
              onClick={() => mainSwiperRef.current?.slideNext()}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Product Info Panel - Desktop/Tablet */}
          <div className="bg-background rounded-xl p-6 h-fit">
            {/* Price and Favorite */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-5xl text-brand">{Number(data.price_lari)}</span>
                <div className="flex items-center gap-1">
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center text-2xl justify-center text-xs font-medium text-brand">
                    ₾
                  </span>
                </div>
                <span className="text-muted-foreground">/{data.unit_of_measurement}</span>
              </div>
              <button
                type="button"
                onClick={() => {}}
                className="p-2 border-0 bg-transparent cursor-pointer hover:scale-110 transition-all"
              >
                <Heart
                  className={cn(
                    "h-6 w-6 transition-colors",
                    isFavorite ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
                  )}
                />
              </button>
            </div>

            {/* Name and Location */}
            <h1 className="text-2xl font-bold text-foreground mb-1">{data.name}</h1>
            <p className="text-muted-foreground mb-4">{data.location}</p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                <span>{data.detail.view_count} Просмотров</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="h-4 w-4" />
                <span>{data.detail.like_count} Фаворитов</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{data.created_at} Дата Размещения</span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-lg">
                  {data.user.first_name.charAt(0)}
                </span>
              </div>
              <span className="font-semibold text-foreground">{data.user.first_name} {" "} {data.user.last_name}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <Phone className="h-4 w-4" />
              <Link className={' text-muted-foreground no-underline'} href={`tel: ${data.user.phone}`}>{data.user.phone}</Link>
            </div>

            <hr className="text-muted-foreground border-t-[#E8E9EA] mb-4" />

            {/* Product Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Артикул</span>
                <div className="flex-1 mx-2 border-b border-dotted border-muted-foreground/30" />
                <div className="flex items-center gap-2">
                  <span className="font-medium">{data.article}</span>
                  <button
                    type="button"
                    onClick={handleCopyArticle}
                    className="p-1 hover:bg-muted rounded bg-transparent border-0 cursor-pointer"
                  >
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Категория</span>
                <div className="flex-1 mx-2 border-b border-dotted border-muted-foreground/30" />
                <span className="font-medium">{data.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Страна Происхождения</span>
                <div className="flex-1 mx-2 border-b border-dotted border-muted-foreground/30" />
                <span className="font-medium">{data.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-4">
          {/* Mobile Swiper */}
          <Swiper
            spaceBetween={10}
            slidesPerView={1.15}
            centeredSlides
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-muted-foreground/40 !w-2 !h-2",
              bulletActiveClass: "!bg-emerald-600 !w-2 !h-2",
            }}
            modules={[Pagination]}
            className="rounded-xl overflow-visible"
          >
            {data.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src={image.image || "/placeholder.svg"}
                    alt={`Product image ${index + 1}`}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile Product Info */}
          <div className="bg-background rounded-xl p-4">
            {/* Price and Favorite */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-emerald-600">{data.price_lari}</span>
                <div className="flex items-center gap-1">
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    ₾
                  </span>
                </div>
                <span className="text-muted-foreground text-sm">
                  /{productData.unit_of_measurement} (Макс. {data.count} кг)
                </span>
              </div>
              <button
                type="button"
                onClick={() => {}}
                className="p-1 border-0 bg-transparent cursor-pointer hover:scale-110 transition-all"
              >
                <Heart
                  className={cn(
                    "h-6 w-6 transition-colors",
                    isFavorite ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
                  )}
                />
              </button>
            </div>

            {/* Name and Location */}
            <h1 className="text-xl font-bold text-foreground mb-1">{data.name}</h1>
            <p className="text-muted-foreground text-sm mb-3 pb-3 border-b border-border">
              {data.location}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-3 pb-3 border-b border-border">
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                <span>{data.detail.view_count} Просмотров</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="h-4 w-4" />
                <span>{data.detail.like_count} Фаворитов</span>
              </div>
              <div className="flex items-center gap-1.5 w-full">
                <Calendar className="h-4 w-4" />
                <span>Дата Размещения: {data.created_at}</span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-lg">
                  {data.user.first_name.charAt(0)}
                </span>
              </div>
              <span className="font-semibold text-foreground">{data.user.first_name} {" "} {data.user.last_name}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground mb-4 pb-4 border-b border-border">
              <Phone className="h-4 w-4" />
              <Link className={' text-muted-foreground no-underline'} href={`tel: ${data.user.phone}`}>{data.user.phone}</Link>
            </div>

            {/* Product Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground text-sm">Артикул</span>
                <div className="flex-1 mx-2 border-b border-dotted border-muted-foreground/30" />
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{data.article}</span>
                  <button
                    type="button"
                    onClick={handleCopyArticle}
                    className="p-1 hover:bg-muted rounded"
                  >
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground text-sm">Категория</span>
                <div className="flex-1 mx-2 border-b border-dotted border-muted-foreground/30" />
                <span className="font-medium text-sm">{data.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Страна Происхождения</span>
                <div className="flex-1 mx-2 border-b border-dotted border-muted-foreground/30" />
                <span className="font-medium text-sm">{data.location}</span>
              </div>
            </div>
          </div>

          {/* Mobile Description */}
          <div className="bg-background rounded-xl p-4 mb-12">
            <h2 className="font-bold text-foreground mb-3">Детальное описание</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {data.detail.description}
            </p>
          </div>
        </div>

        {/* Desktop/Tablet Description */}
        <div className="hidden md:block mt-6">
          <div className="bg-background rounded-xl p-6">
            <h2 className="font-bold text-lg text-foreground mb-3">Детальное описание</h2>
            <p className="text-muted-foreground leading-relaxed">{data.detail.description}</p>
          </div>
        </div>
      </main>

      {/* Toast for copy */}
      {copied && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2 rounded-lg text-sm z-50">
          Артикул скопирован
        </div>
      )}

      <style jsx global>{`
        .swiper-pagination {
          position: absolute;
          bottom: 16px !important;
        }
        .swiper-pagination-bullet {
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  )
}
