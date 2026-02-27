"use client"

import { Suspense, useState, useEffect } from "react"
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
import { authApi, useGetProfileQuery } from "@/lib/store/services/authApi";
import Logo from "@/components/shared/Logo";
import Cookies from "js-cookie";
import HeaderSearch from "@/components/layout/Search";

import { useLocale, useTranslations } from "next-intl"; // Добавил useTranslations
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { useDispatch } from "react-redux";
import { productApi } from "@/lib/store/services/productApi";

const languages = [
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "hy", name: "Հայերեն", flag: "🇦🇲" },
  { code: "ka", name: "ქართული", flag: "🇬🇪" },
]

const currencies = [
  { code: "GEL", symbol: "₾" },
  { code: "AMD", symbol: "֏" },
]

export function Header() {
  const t = useTranslations("Header"); // Инициализация
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const currentLanguage = languages.find(l => l.code === locale) || languages[0];

  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedCurrencyCode = Cookies.get('selected_currency');
    if (savedCurrencyCode) {
      const found = currencies.find(c => c.code === savedCurrencyCode);
      if (found) setSelectedCurrency(found);
    }
  }, []);

  const token = Cookies.get('accessToken');
  const { data } = useGetProfileQuery({skip: !token});

  const handleLanguageChange = (newLocale) => {
    Cookies.set('NEXT_LOCALE', newLocale, { expires: 365 });
    router.replace(pathname, { locale: newLocale });
    dispatch(authApi.util.resetApiState());
    dispatch(productApi.util.resetApiState());
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    Cookies.set('selected_currency', currency.code, { expires: 365 });
    dispatch(authApi.util.resetApiState());
    dispatch(productApi.util.resetApiState());
  };

  return (
    <header className="sticky top-0 z-50 bg-[#E8E9EA] border-b border-border">
      <div className="mx-auto px-8 md:px-10 lg:px-12">
        <div className="hidden md:flex items-center justify-between h-16 gap-4">
          <div className={"flex items-center gap-6 lg:w-4/12"}>
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Logo/>
            </Link>
            <Suspense fallback={null}>
              <HeaderSearch />
            </Suspense>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 rounded-md text-[#0F6A4F] px-4 h-10 border-[#0F6A4F] hover:bg-emerald-50 bg-transparent"
                >
                  <span className="text-lg">{currentLanguage.flag}</span>
                  <span className="text-sm">
                    {currentLanguage.name.slice(0, 7)}, {selectedCurrency.symbol}
                  </span>
                  <ChevronDown className="h-4 w-4"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{t("language")}</div>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`gap-2 ${locale === lang.code ? "bg-emerald-50 font-bold" : ""}`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator/>
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{t("currency")}</div>
                {currencies.map((currency) => (
                  <DropdownMenuItem
                    key={currency.code}
                    onClick={() => handleCurrencyChange(currency)}
                    className={`gap-2 ${selectedCurrency.code === currency.code ? "bg-emerald-50 font-bold" : ""}`}
                  >
                    <span>{currency.code}-{currency.symbol}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href={ data?.info ? "/create": "/login"}>
              <Button variant="outline" className="rounded-md px-6 h-10 bg-transparent text-[#0F6A4F] border-[#0F6A4F]">
                {t("add")}
              </Button>
            </Link>

            {data?.info ?
              <Link href="/profile">
                <Button className="rounded-md px-6 h-10 bg-[#0F6A4F] text-white">{t("profile")}</Button>
              </Link> :
              <Link href="/login">
                <Button className="rounded-md px-6 h-10 bg-[#0F6A4F] text-white">{t("login")}</Button>
              </Link>
            }
          </div>
        </div>

        {/* Mobile/Tablet Header */}
        <div className="flex md:hidden items-center justify-between h-14 gap-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Logo/>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/search?query=">
              <Button variant="ghost" size="icon" className="h-9 w-9 bg-transparent border-0">
                <Search className="h-5 w-5"/>
              </Button>
            </Link>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 bg-transparent border-0">
                  <Menu className="h-5 w-5"/>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 pt-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">{t("language")}</h3>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          handleLanguageChange(lang.code);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 w-full p-2 rounded-lg border border-transparent mb-1  ${
                          locale === lang.code ? "border-[#0F6A4F] bg-emerald-50" : "bg-transparent hover:bg-muted"
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">{t("currency")}</h3>
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => handleCurrencyChange(currency)}
                        className={`flex items-center gap-3 w-full p-2 rounded-lg border border-transparent mb-1  ${
                          selectedCurrency.code === currency.code ?  "border-[#0F6A4F] bg-emerald-50"  : "bg-transparent hover:bg-muted"
                        }`}
                      >
                        <span>{currency.code} - {currency.symbol}</span>
                      </button>
                    ))}
                  </div>

                  {data?.info ?
                    <Link className={"block w-full"} href={"/profile"}>
                      <Button onClick={()=> setMobileMenuOpen(false)} className="rounded-md px-6 h-10 w-full bg-[#0F6A4F] text-white">{t("profile")}</Button>
                    </Link> :
                    <Link className={"block w-full"} href={"/login"}>
                      <Button onClick={()=> setMobileMenuOpen(false)} className="rounded-md w-full px-6 h-10 bg-[#0F6A4F] text-white">{t("login")}</Button>
                    </Link>
                  }
                </div>
              </SheetContent>
            </Sheet>
            <span className="text-lg">{currentLanguage.flag}</span>
          </div>
        </div>
      </div>
    </header>
  )
}