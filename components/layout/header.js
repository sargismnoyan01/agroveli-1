"use client"

import { Suspense, useState } from "react"
import { Search, ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link";
import { useGetProfileQuery } from "@/lib/store/services/authApi";
import Logo from "@/components/shared/Logo";
import Cookies from "js-cookie";
import HeaderSearch from "@/components/layout/Search";

const languages = [
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ka", name: "ქართული", flag: "🇬🇪" },
]

const currencies = [
  { code: "GEL", symbol: "₾" },
  { code: "USD", symbol: "$" },
]

export function Header() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = Cookies.get('accessToken');
  const { data } = useGetProfileQuery({skip: !token});

  return (
    <header className="sticky top-0 z-50 bg-[#E8E9EA] border-b border-border">
      <div className=" mx-auto px-8 md:px-10 lg:px-12">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className={"flex items-center gap-6 lg:w-4/12"}>
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Logo/>
            </Link>

            {/* Search Bar */}
            <Suspense fallback={null}>
              <HeaderSearch />
            </Suspense>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language & Currency Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 rounded-md text-[#0F6A4F] px-4 h-10 border-[#0F6A4F] hover:bg-emerald-50 bg-transparent"
                >
                  <span className="text-lg">{selectedLanguage.flag}</span>
                  <span className="text-sm">
                    {selectedLanguage.name.slice(0, 7)}, {selectedCurrency.symbol}
                  </span>
                  <ChevronDown className="h-4 w-4"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Язык</div>
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => setSelectedLanguage(lang)} className="gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator/>
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Валюта</div>
                {currencies.map((currency) => (
                  <DropdownMenuItem key={currency.code} onClick={() => setSelectedCurrency(currency)} className="gap-2">
                    <span>
                      {currency.code}-{currency.symbol}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Add Listing Button */}
           <Link href={ data?.info ? "/create": "/login"}>
             <Button variant="outline" className="rounded-md px-6 h-10 bg-transparent text-[#0F6A4F] border-[#0F6A4F]">
               Добавить
             </Button>
           </Link>

            {data?.info ?
              <Link href={"/"}>
                <Button className="rounded-md px-6 h-10 bg-[#0F6A4F] text-white">Профиль</Button>
              </Link> :
              <Link href={"/login"}>
                <Button className="rounded-md px-6 h-10 bg-[#0F6A4F] text-white">Войти</Button>
              </Link>
            }
          </div>
        </div>

        {/* Mobile/Tablet Header */}
        <div className="flex md:hidden items-center justify-between h-14 gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Logo/>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 bg-transparent border-0">
              <Search className="h-5 w-5"/>
            </Button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 bg-transparent border-0">
                  <Menu className="h-5 w-5"/>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 pt-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Язык</h3>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`flex items-center gap-3 w-full p-2 rounded-lg border-brand mb-1  ${
                          selectedLanguage.code === lang.code ? "bg-brand text-white" : "bg-transparent hover:bg-muted"
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Валюта</h3>
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => setSelectedCurrency(currency)}
                        className={`flex items-center gap-3 w-full p-2 rounded-lg border-brand mb-1  ${
                          selectedCurrency.code === currency.code ?  "bg-brand text-white"  : "bg-transparent hover:bg-muted"
                        }`}
                      >
                        <span>
                          {currency.code} - {currency.symbol}
                        </span>
                      </button>
                    ))}
                  </div>

                  {data?.info ?
                    <Link className={"block w-full"} href={"/"}>
                      <Button className="rounded-md px-6 h-10 w-full bg-[#0F6A4F] text-white">Профиль</Button>
                    </Link> :
                    <Link className={"block w-full"} href={"/login"}>
                      <Button className="rounded-md w-full px-6 h-10 bg-[#0F6A4F] text-white">Войти</Button>
                    </Link>
                  }

                </div>
              </SheetContent>
            </Sheet>

            <span className="text-lg">🇷🇺</span>
          </div>
        </div>
      </div>
    </header>
  )
}
