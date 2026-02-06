"use client"

import { Home, PlusSquare, Heart, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Cookies from "js-cookie";
import { useGetProfileQuery } from "@/lib/store/services/authApi";
import Link from "next/link";
import { usePathname } from "next/navigation";



export function MobileNavigation() {
  const pathname = usePathname();
  const token = Cookies.get('accessToken');
  const { data } = useGetProfileQuery({skip: !token});

  const navItems = [
    { id: "/", label: "Главная", icon: Home },
    { id: "/create", label: "Добавить", icon: PlusSquare },
    { id: "/favorites", label: "Фаворит", icon: Heart },
    ...(data?.info
        ? [{ id: "/profile", label: "Профиль", icon: User }]
        : [{ id: "/login", label: "Войти", icon: User }]
    ),
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border md:hidden z-50">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =pathname === item.id;



          return (
            <Link
              href={item.id}
              key={item.id}
              className="flex flex-col items-center gap-1 py-2 px-3 bg-transparent border-0 decoration-0 underline-0 no-underline"
            >
              <Icon
                className={cn("h-5 w-5 transition-colors", isActive ? "text-[#0F6A4F]" : "text-muted-foreground")}
              />
              <span
                className={cn(
                  "text-xs transition-colors",
                  isActive ? "text-[#0F6A4F] font-medium" : "text-muted-foreground",
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
