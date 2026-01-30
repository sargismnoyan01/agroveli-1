"use client"

import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryFilters } from "@/components/home/CategoryFilters";
import { ProductCarousel } from "@/components/home/ProductCarusel";
import { AdBanner } from "@/components/home/AddBanner";
import { MobileNavigation } from "@/components/home/MobileNavigation";
import { useGetProductsQuery } from "@/lib/store/services/productApi";
import { Crown, Sparkles, Zap } from "lucide-react";


const adBanners = [
  {
    id: 1,
    image: "/assets/images/ad.png",
  },
  {
    id: 2,
    image: "/assets/images/mandarin.png",
  },
  {
    id: 3,
    image: "/assets/images/ad.png",
  },
]

export default function HomePage() {
  const {data: premiumPlusProducts} = useGetProductsQuery({status: "PREMIUM_PLUS"});
  const {data: premiumProducts} = useGetProductsQuery({status: "PREMIUM"});
  const {data: vipProducts} = useGetProductsQuery({status: "VIP"});

  return (
    <div className="min-h-screen bg-background">
      <HeroBanner />
      <main className="pb-20 md:pb-0">
        <CategoryFilters />
        <div className="container mx-auto px-4 py-6 space-y-8">
          {premiumPlusProducts?.premium_plus?.length > 0 && <ProductCarousel
            title="Premium +"
            products={premiumPlusProducts.premium_plus}
            BadgeIcon={Sparkles}
            badgeColor="bg-[#FF6400]"

          />}

          <AdBanner banners={adBanners} />

          {premiumProducts?.premium?.length > 0 && <ProductCarousel
            title="Premium"
            products={premiumProducts.premium}
            badgeColor="bg-[#FFCC00]"

            BadgeIcon={Crown}
          />}

          <AdBanner banners={adBanners} />

          {vipProducts?.vip?.length > 0 && <ProductCarousel
            title="VIP"
            products={vipProducts.vip}
            badgeColor="bg-[#0F6A4F]"
            BadgeIcon={Zap}

          />}

        </div>
      </main>
      <MobileNavigation />
    </div>
  )
}
