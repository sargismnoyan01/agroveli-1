"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl" // Импорт
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
  ChevronRight, Edit2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useParams, useRouter } from "next/navigation";
import { useGetProductQuery, useLikeProductMutation } from "@/lib/store/services/productApi";
import StatusBadge from "@/components/shared/StatusBadge";
import { ProductDetailsSkeleton } from "@/components/shared/ProductDetailsSkeleton";
import Cookies from "js-cookie";
import { ProductCarousel } from "@/components/home/ProductCarusel";

export default function ProductPage() {
  const t = useTranslations("ProductPage"); // Инициализация
  const [like, { isLoading: isLiking }] = useLikeProductMutation();
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const mainSwiperRef = useRef(null);
  const { id } = useParams();
  const { data, isLoading, isFetching } = useGetProductQuery({ id });
  const [isFavorite, setIsFavorite] = useState(data?.is_liked || false);
  const currency = Cookies.get('selected_currency');
  const router = useRouter();
  const token = Cookies.get('accessToken');

  useEffect(() => {
    setIsFavorite(data?.is_liked)
  }, [data])

  const handleCopyArticle = () => {
    if (data?.article) {
      navigator.clipboard.writeText(data.article)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
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

  if (isLoading || isFetching) {
    return <ProductDetailsSkeleton/>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/*Breadcrumb Header*/}
      <div className="bg-background border-b border-border">
        <div className=" mx-auto px-4 py-4 md:px-10 lg:px-12 xl:px-16 2xl:px-48">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground no-underline">
                <ArrowLeft className="h-4 w-4"/>
                <span>{t("home")}</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">{t(`categories.${data.category}`)}</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{data.name}</span>
            </div>

            <div className="flex items-center gap-2">
              {data.me ? <>
                <Button
                  onClick={() => {
                    router.push(`/create?id=${data.id}`)
                  }}
                  variant="outline"
                  className="hidden md:flex rounded-md px-6 h-10 bg-transparent text-[#0F6A4F] border-[#0F6A4F]">
                  <Edit2 className="h-4 w-4 mr-2"/>
                  {t("edit")}
                </Button>
                <button
                  onClick={() => {
                    router.push(`/create?id=${data.id}`)
                  }}
                  className="block md:hidden">
                  <Edit2 className="h-6 w-6 mr-2 text-brand"/>
                </button>
              </> : ""
              }

              {data.status !== "ORDINARY" && <StatusBadge status={data.status}/>}
            </div>

          </div>
        </div>
      </div>


      <main className=" mx-auto px-4 py-8 md:px-10 lg:px-12 xl:px-16 2xl:px-48">
        {/* Desktop/Tablet Layout */}
        <div className="hidden md:grid md:grid-cols-[auto_1fr_380px] lg:grid-cols-[100px_1fr_400px] gap-4 lg:gap-6">
          {/* Thumbnail Gallery */}
          <div className="flex flex-col items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-8 w-8 bg-background"
              onClick={() => scrollThumbs("up")}
            >
              <ChevronUp className="h-4 w-4"/>
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
              <ChevronDown className="h-4 w-4"/>
            </Button>
          </div>

          {/* Main Image Swiper */}
          <div className="relative max-w-[450px] xl:max-w-[750px]">
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

            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 bg-background/80 hover:bg-background"
              onClick={() => mainSwiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="h-5 w-5"/>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 bg-background/80 hover:bg-background"
              onClick={() => mainSwiperRef.current?.slideNext()}
            >
              <ChevronRight className="h-5 w-5"/>
            </Button>
          </div>

          {/* Product Info Panel */}
          <div className="bg-background rounded-xl p-6 h-fit">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-5xl text-brand">
                    {currency === "AMD" ? Number(data.price_dram) : Number(data.price_lari)}
                  </span>
                <div className="flex items-center gap-1">
                  <span
                    className="w-6 h-6 rounded-full bg-muted flex items-center text-2xl justify-center text-xs font-medium text-brand">{currency === "AMD" ? "֏" : "₾"}</span>
                </div>
                <span className="text-muted-foreground">/{data.unit_of_measurement}</span>
              </div>
              <button
                type="button"
                disabled={isLiking}
                onClick={() => {
                  setIsFavorite(!isFavorite);
                  if(token) {
                    like({ id: data.id });
                  }
                }} className="p-2 border-0 bg-transparent cursor-pointer hover:scale-110 transition-all">
                <Heart
                  className={cn("h-6 w-6 transition-colors", isFavorite ? "fill-rose-500 text-rose-500" : "text-muted-foreground")}/>
              </button>
            </div>

            <h1 className="text-2xl font-bold text-foreground mb-1">{data.name}</h1>
            <p className="text-muted-foreground mb-4">{data.location}</p>

            <div
              className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4"/>
                <span>{data.detail.view_count} {t("views")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="h-4 w-4"/>
                <span>{data.detail.like_count} {t("favorites")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4"/>
                <span>{data.created_at} {t("datePlaced")}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Image
                  src={data.user?.img_url || "/assets/images/profile.png"}
                  alt={data.user?.first_name + ' ' + data.user?.last_name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover w-14 h-14"
                />
              </div>
              <span className="font-semibold text-foreground">{data.user.first_name} {data.user.last_name}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <Phone className="h-4 w-4"/>
              <Link className={' text-muted-foreground no-underline'}
                    href={`tel: ${data.user.phone}`}>{data.user.phone}</Link>
            </div>

            <hr className="text-muted-foreground border-t-[#E8E9EA] mb-4"/>

            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">{t("article")}</span>
                <div className="flex-1 mx-2 border-b border-dotted border-muted-foreground/30"/>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{data.article}</span>
                  <button type="button" onClick={handleCopyArticle}
                          className="p-1 hover:bg-muted rounded bg-transparent border-0 cursor-pointer">
                    <Copy className="h-4 w-4 text-muted-foreground"/>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">{t("category")}</span>
                <div className="flex-1 mx-2 border-b border-dotted border-muted-foreground/30"/>
                <span className="font-medium">{t(`categories.${data.category}`)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("origin")}</span>
                <div className="flex-1 mx-2 border-b border-dotted border-muted-foreground/30"/>
                <span className="font-medium">{data.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-4">
          <Swiper
            spaceBetween={10}
            slidesPerView={1.15}
            centeredSlides
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="rounded-xl overflow-visible"
          >
            {data.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src={image.image || "/placeholder.svg"} alt="product" width={600} height={450}
                         className="w-full h-full object-cover"/>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="bg-background rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-emerald-600">
                  {currency === "AMD" ? Number(data.price_dram) : Number(data.price_lari)}
                </span>
                <div className="flex items-center gap-1">
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    {currency === "AMD" ? "֏" : "₾"}
                  </span>
                </div>
                <span className="text-muted-foreground text-sm">
                  /{data.unit_of_measurement} ({t("max")} {data.count} кг)
                </span>
              </div>
              <button type="button"
                      disabled={isLiking}
                      onClick={() => {
                        setIsFavorite(!isFavorite);
                        if(token) {

                          like({ id: data.id });
                        }
                      }}
                      className="p-1 border-0 bg-transparent cursor-pointer hover:scale-110">
                <Heart
                  className={cn("h-6 w-6 transition-colors", isFavorite ? "fill-rose-500 text-rose-500" : "text-muted-foreground")}/>
              </button>
            </div>

            <h1 className="text-xl font-bold text-foreground mb-1">{data.name}</h1>
            <p className="text-muted-foreground text-sm mb-3 pb-3 border-b border-border">{data.location}</p>

            <div
              className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-3 pb-3 border-b border-border">
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4"/>
                <span>{data.detail.view_count} {t("views")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="h-4 w-4"/>
                <span>{data.detail.like_count} {t("favorites")}</span>
              </div>
              <div className="flex items-center gap-1.5 w-full">
                <Calendar className="h-4 w-4"/>
                <span>{t("datePlaced")}: {data.created_at}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Image
                  src={data.user?.img_url || "/assets/images/profile.png"}
                  alt={data.user?.first_name + ' ' + data.user?.last_name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover w-14 h-14"
                />
              </div>
              <span className="font-semibold text-foreground">{data.user.first_name} {data.user.last_name}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground mb-4 pb-4 border-b border-border">
              <Phone className="h-4 w-4"/>
              <Link className={' text-muted-foreground no-underline'}
                    href={`tel: ${data.user.phone}`}>{data.user.phone}</Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground text-sm">{t("article")}</span>
                <div className="flex-1 mx-2 border-b border-dotted border-muted-foreground/30"/>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{data.article}</span>
                  <button type="button" onClick={handleCopyArticle}
                          className="p-1 hover:bg-muted rounded bg-transparent border-0"><Copy
                    className="h-4 w-4 text-muted-foreground"/></button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground text-sm">{t("category")}</span>
                <div className="flex-1 mx-2 border-b border-dotted border-muted-foreground/30"/>
                <span className="font-medium text-sm">{t(`categories.${data.category}`)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">{t("origin")}</span>
                <div className="flex-1 mx-2 border-b border-dotted border-muted-foreground/30"/>
                <span className="font-medium text-sm">{data.location}</span>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-xl p-4 mb-12">
            <h2 className="font-bold text-foreground mb-3">{t("description")}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{data.detail.description}</p>
          </div>
        </div>

        {/* Desktop Description */}
        <div className="hidden md:block mt-6 mb-8 md:shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl">
          <div className="bg-background rounded-xl p-6">
            <h2 className="font-bold text-lg text-foreground mb-3">{t("description")}</h2>
            <p className="text-muted-foreground leading-relaxed">{data.detail.description}</p>
          </div>
        </div>

        <ProductCarousel
          title={t("RelatedAds")}
          products={data.suggestion_products || []}
          badgeColor="bg-[#0F6A4F]"
        />
      </main>

      {copied && (
        <div
          className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2 rounded-lg text-sm z-50">
          {t("copied")}
        </div>
      )}
    </div>
  )
}