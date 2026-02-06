"use client"

import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryFilters } from "@/components/home/CategoryFilters";
import { ProductCarousel } from "@/components/home/ProductCarusel";
import { AdBanner } from "@/components/home/AddBanner";
import {
  useGetAdsQuery,
  useGetPremiumPlusProductsQuery,
  useGetPremiumProductsQuery,
  useGetVipProductsQuery
} from "@/lib/store/services/productApi";
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
  const {data: premiumPlusProducts} = useGetPremiumPlusProductsQuery({limit: 10});
  const {data: premiumProducts} = useGetPremiumProductsQuery({limit: 10});
  const {data: vipProducts} = useGetVipProductsQuery({limit: 10});
  const {data: adsData} = useGetAdsQuery();

  console.log(adsData, 'ads')

  return (
    <div className="min-h-screen bg-background">
      <HeroBanner />
      <main className="pb-20 md:pb-0">
        <CategoryFilters />
        <div className="container mx-auto px-4 py-6 space-y-8">
          {premiumPlusProducts?.results?.length > 0 && <ProductCarousel
            title="Premium +"
            path="PREMIUM_PLUS"
            products={premiumPlusProducts.results}
            BadgeIcon={Sparkles}
            badgeColor="bg-[#FF6400]"
          />}

          <AdBanner banners={adsData?.filter(ad => ad.status === 'PREMIUM_PLUS') || []} />

          {premiumProducts?.results?.length > 0 && <ProductCarousel
            title="Premium"
            path="PREMIUM"
            products={premiumProducts.results}
            badgeColor="bg-[#FFCC00]"
            BadgeIcon={Crown}
          />}

          <AdBanner banners={adsData?.filter(ad => ad.status === 'PREMIUM') || []} />

          {vipProducts?.results?.length > 0 && <ProductCarousel
            title="VIP"
            path="VIP"
            products={vipProducts.results}
            badgeColor="bg-[#0F6A4F]"
            BadgeIcon={Zap}
          />}

          <AdBanner banners={adsData?.filter(ad => ad.status === 'VIP') || []} />


        </div>
      </main>
    </div>
  )
}
