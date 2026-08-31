import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNavigation } from "@/components/home/MobileNavigation";
import BalanceAnimation from "@/components/profile/BalanceAnimation";


export const viewport = {
  themeColor: "#16a34a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
                                     children,
                                   }) {
  return (
    <div className="pb-12 md:pb-0">
      <Header />
      <Suspense fallback={null}>
        <BalanceAnimation />
      </Suspense>
      {children}
      <MobileNavigation />
      <Footer/>
    </div>
  )
}
