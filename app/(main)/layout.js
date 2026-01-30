import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

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
      <Footer/>
    </div>
  )
}
