"use client"

import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import Link from "next/link";


export function AdBanner({ banners }) {

  if(!banners.length) return;

  return (
    <section className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <Link href={banner.link} target="_blank" key={banner.id} className="relative group rounded-xl overflow-hidden max-h-[270px] no-underline">
            {/* Ad Label */}
            <div className="absolute top-2 left-2 z-10 bg-[#FFFFFFCC] text-xs px-2 py-1 rounded no-underline decoration-0 text-black">
              Реклама
            </div>

            {/* More Options */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 h-6 w-6 bg-[#FFFFFFCC] cursor-pointer border-none hover:bg-white text-background rounded-full"
            >
              <MoreVertical className="h-3 w-3 text-black " />
            </Button>

            {/* Image */}
            <div className="aspect-[4/3] md:aspect-[3/4]">
              <Image
                src={banner.image || "/placeholder.svg"}
                width={424}
                height={270}
                alt="Advertisement"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
