"use client"

import { Home, PlusSquare, Heart, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations, useLocale } from "next-intl"
import Cookies from "js-cookie";
import { useGetProfileQuery } from "@/lib/store/services/authApi";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNavigation() {
  const t = useTranslations("MobileNav");
  const locale = "ru"; // Получаем текущую локаль
  const pathname = usePathname();
  const token = Cookies.get('accessToken');

  const { data } = useGetProfileQuery(undefined, { skip: !token });

  const navItems = [
    { id: "/", label: t("home"), icon: Home },
    { id: "/create", label: t("add"), icon: PlusSquare },
    { id: "/profile/favorites", label: t("favorites"), icon: Heart },
    ...(data?.info
        ? [{ id: "/profile/products", label: t("profile"), icon: User }]
        : [{ id: "/login", label: t("login"), icon: User }]
    ),
  ]

  // Функция для точной проверки активного пути с учетом локали
  const isItemActive = (href) => {
    if (pathname === href) return true;
    if (pathname === `/${locale}${href}`) return true;
    // Для главной страницы проверяем отдельно, чтобы /ru не подсвечивал все ссылки
    if (href === "/" && pathname === `/${locale}`) return true;
    return false;
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-background border-t border-border md:hidden z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = isItemActive(item.id);

          return (
            <Link
              href={item.id}
              key={item.id}
              className="flex flex-col items-center justify-center gap-1 min-w-[64px] transition-all no-underline"
            >
              <Icon
                className={cn(
                  "h-6 w-6 transition-colors",
                  isActive ? "text-[#0F6A4F]" : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "text-[10px] transition-colors leading-none",
                  isActive ? "text-[#0F6A4F] font-semibold" : "text-muted-foreground",
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