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
import { FullScreenLoader } from "@/components/shared/FullScreenLoader";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const {data: premiumPlusProducts, isLoading: isLoading1} = useGetPremiumPlusProductsQuery({limit: 10});
  const {data: premiumProducts, isLoading: isLoading2} = useGetPremiumProductsQuery({limit: 10});
  const {data: vipProducts, isLoading: isLoading3} = useGetVipProductsQuery({limit: 10});
  const {data: adsData, isLoading: isLoading4} = useGetAdsQuery();
  const hasData = premiumPlusProducts || premiumProducts || vipProducts || adsData;
  const isFetching = isLoading1 || isLoading2 || isLoading3 || isLoading4;
  const t = useTranslations('HomePage');
  const [showLoader, setShowLoader] = useState(!hasData);

  useEffect(() => {
    let timeoutId;

    if (isFetching) {
      setShowLoader(true);
    } else if (hasData) {
      timeoutId = setTimeout(() => {
        setShowLoader(false);
      }, 1200);
    }

    return () => clearTimeout(timeoutId);
  }, [isFetching, hasData]);

  return (
    <div className="min-h-screen bg-background">
      {showLoader && <FullScreenLoader />}
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
