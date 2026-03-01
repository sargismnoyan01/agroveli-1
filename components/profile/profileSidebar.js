"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Mail,
  Phone,
  Wallet,
  CreditCard,
  PlusCircle,
  LogOut,
  FileText,
  Heart,
  Pencil,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { authApi, useGetProfileQuery } from "@/lib/store/services/authApi";
import {  useTranslations } from "next-intl"; // Добавил импорт
import ProfileSkeleton from "@/components/shared/ProfileSkeleton";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { productApi } from "@/lib/store/services/productApi";

export function ProfileSidebar() {
  const t = useTranslations("ProfileSidebar"); // Инициализация
  const pathname = usePathname();
  const { data: userData, isLoading } = useGetProfileQuery();
  const dispatch = useDispatch();
  const locale = "ru";

  // Перенес navLinks внутрь компонента, чтобы использовать t()
  const navLinks = [
    {
      href: "/profile/products",
      label: t("myAds"),
      icon: FileText,
    },
    {
      href: "/profile/favorites",
      label: t("favorites"),
      icon: Heart,
    },
  ];

  const checkActive = (href) => {
    if (pathname === href) return true;
    if (pathname === `/${locale}${href}`) return true;
    return false;
  };

  if (isLoading || !userData) {
    return <ProfileSkeleton/>
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[320px]">
        <div className="sticky top-20 ">
          <div className="rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.12)] bg-card p-4  mb-4">
            {/* Avatar + Name */}
            <div className="flex items-center gap-4">
              <Image
                src={userData.info?.img_url || "/assets/images/profile.png"}
                alt={userData.info?.first_name + ' ' + userData.info?.last_name}
                width={64}
                height={64}
                className="rounded-full object-cover w-16 h-16 min-w-[64px]"
              />
              <div className="truncate">
                <h2
                  className="font-semibold text-lg text-foreground ">{userData.info?.first_name + " " + userData.info?.last_name}</h2>
                <Link href={'/edit-profile'}
                      className="flex items-center gap-1.5 text-sm text-[#FF6400] mt-0.5 no-underline">
                  <Pencil className="h-3.5 w-3.5"/>
                  <span>{t("editProfile")}</span>
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-5 pt-5 border-t border-border space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                <Mail className="h-4 w-4 shrink-0"/>
                <span>{userData.info?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                <Phone className="h-4 w-4 shrink-0"/>
                <span>{userData.info?.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                <Wallet className="h-4 w-4 shrink-0"/>
                <span>{t("balance")}: {userData.info.coin || 0}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-border space-y-2.5">
              <button
                className="flex items-center gap-3 text-sm text-foreground hover:text-emerald-600 transition-colors mb-2 bg-transparent border-0 cursor-pointer">
                <CreditCard className="h-4 w-4"/>
                <span>{t("topUp")}</span>
              </button>
              <Link
                href="/create"
                className="flex items-center gap-3 text-sm text-foreground hover:text-emerald-600 transition-colors mb-2 no-underline"
              >
                <PlusCircle className="h-4 w-4"/>
                <span>{t("addListing")}</span>
              </Link>
              <button
                onClick={() => {
                  Cookies.remove('accessToken');
                  Cookies.remove('refreshToken');
                  dispatch(authApi.util.resetApiState());
                  dispatch(productApi.util.resetApiState());
                  window.location.href = '/login'
                }}
                className="flex items-center gap-3 text-sm text-red-500 hover:text-red-600 transition-colors bg-transparent border-0 cursor-pointer">
                <LogOut className="h-4 w-4"/>
                <span>{t("logout")}</span>
              </button>
            </div>
          </div>
          <div className="rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.12)] bg-card p-2 top-20">
            {/* Navigation Tabs */}
            <nav className=" space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = checkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors no-underline",
                      isActive
                        ? "text-brand font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className="h-4 w-4"/>
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </aside>

      {/* Tablet / Mobile Sidebar */}
      <div className="lg:hidden">
        <div className="rounded-xl border border-border bg-card p-5">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <Image
              src={userData.info?.img_url || "/assets/images/profile.png"}
              alt={userData.info?.first_name + ' ' + userData.info?.last_name}
              width={56}
              height={56}
              className="rounded-full object-cover w-14 h-14"
            />
            <div className="">
              <h2
                className="font-semibold text-foreground break-all">{userData.info?.first_name + " " + userData.info?.last_name}</h2>
              <Link href={'/edit-profile'} className="flex items-center gap-1.5 text-sm text-[#FF6400]  mt-0.5">
                <Pencil className="h-3.5 w-3.5"/>
                <span>{t("editProfile")}</span>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-4 pt-4 border-t border-border space-y-2.5">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
              <Mail className="h-4 w-4 shrink-0"/>
              <span>{userData.info?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
              <Phone className="h-4 w-4 shrink-0"/>
              <span>{userData.info?.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Wallet className="h-4 w-4 shrink-0"/>
              <span>{t("balance")}: {userData.info?.balance || 0}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 pt-4 border-t border-border space-y-2.5">
            <button
              className="flex items-center gap-3 text-sm text-foreground hover:text-emerald-600 transition-colors mb-2 bg-transparent border-0 cursor-pointer">
              <CreditCard className="h-4 w-4"/>
              <span>{t("topUp")}</span>
            </button>
            <Link
              href="/create"
              className="flex items-center gap-3 text-sm text-foreground hover:text-emerald-600 transition-colors mb-2 no-underline"
            >
              <PlusCircle className="h-4 w-4"/>
              <span>{t("addListing")}</span>
            </Link>
            <button
              onClick={() => {
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');

                window.location.href = '/login'
              }}
              className="flex items-center gap-3 text-sm text-red-500 hover:text-red-600 transition-colors bg-transparent border-0 cursor-pointer">
              <LogOut className="h-4 w-4"/>
              <span>{t("logout")}</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = checkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center justify-center gap-2 flex-1 pb-3 text-sm transition-colors border-b-2",
                      isActive
                        ? "border-emerald-600 text-emerald-600 font-medium"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4"/>
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}