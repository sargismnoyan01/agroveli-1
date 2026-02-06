import { Crown, Sparkles, Zap } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

const badgeIcons = {
  "PREMIUM_PLUS": <Sparkles className="h-5 w-5 text-white"/>,
  "PREMIUM": <Crown className="h-5 w-5 text-white"/>,
  "VIP": <Zap className="h-5 w-5 text-white"/>
}

const titles = {
  "PREMIUM_PLUS": "Premium +",
  "PREMIUM": "Premium",
  "VIP": "VIP"
}

const colors = {
  "PREMIUM_PLUS": "bg-[#FF6400]",
  "PREMIUM":"bg-[#FFCC00]",
  "VIP": "bg-[#0F6A4F]"
}

export default function StatusBadge({status}) {

  return(
    <div
      className={cn(
        "inline-flex h-12 items-center gap-2 px-4 py-2 rounded-md text-white text-sm font-medium no-underline",
        colors[status],
      )}
    >
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", colors[status],)}>
        {badgeIcons[status]}
      </div>
      <span>{titles[status]}</span>
    </div>
  )
}