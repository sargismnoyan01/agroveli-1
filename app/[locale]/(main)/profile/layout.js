import { ProfileSidebar } from "@/components/profile/profileSidebar";

export default function ProfileLayout({
                                        children,
                                      }) {
  return (
    <div>

      <main className=" mx-auto px-4 md:px-10 lg:px-12 py-6 pb-24 md:pb-6">
        {/* Desktop: side-by-side */}
        <div className="hidden lg:flex gap-6 items-stretch">
          <ProfileSidebar />
          <div className="flex-1 min-w-0">{children}</div>
        </div>

        {/* Tablet / Mobile: stacked */}
        <div className="lg:hidden flex flex-col gap-6">
          <ProfileSidebar />
          {children}
        </div>
      </main>
    </div>
  )
}
