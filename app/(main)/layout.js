import { Geist, Geist_Mono } from "next/font/google"
import { Header } from "@/components/layout/header";

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
    <div>
      <Header />
      {children}
    </div>
  )
}
