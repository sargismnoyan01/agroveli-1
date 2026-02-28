"use client"

import { Instagram } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link";
import Cookies from "js-cookie";
import { useGetProfileQuery } from "@/lib/store/services/authApi"; // Добавил импорт

export function Footer() {
  const t = useTranslations("Footer"); // Инициализация
  const token = Cookies.get('accessToken');
  const { data } = useGetProfileQuery(undefined, {skip: !token});

  return (
    <footer className="bg-muted/50 border-t border-border mt-auto hidden md:block">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="text-xl font-bold">
              <span className="text-emerald-600">Agro</span>
              <span className="text-foreground">veli</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">{t("navTitle")}</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href={ data?.info ? "/create": "/login"}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline"
              >
                {t("addProduct")}
              </Link>
              {!data?.info && <Link
                href="/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("login")}
              </Link>}
            </nav>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">{t("helpTitle")}</h3>
            <nav className="flex flex-col gap-2">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline"
              >
                {t("sendMessage")}
              </a>
              <a
                href="tel:+995322800045"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline"
              >
                +995 32 280 00 45
              </a>
              <div className="flex items-center gap-3 mt-2">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {t("copyright")}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/privacy-policy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("privacyPolicy")}
            </a>
            <a
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}