"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl" // Импорт
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import PhoneField from "@/components/shared/PhoneField";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/lib/store/services/authApi";
import { profileSchema } from "@/lib/validations/auth";


export default function EditProfilePage() {
  const t = useTranslations("EditProfile"); // Инициализация
  const router = useRouter()
  const fileInputRef = useRef(null)

  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState("/profile-avatar.jpg")
  const [hasCustomAvatar, setHasCustomAvatar] = useState(false)

  const { data: userData } = useGetProfileQuery()
  const [update, { isLoading }] = useUpdateProfileMutation()

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  })

  useEffect(() => {
    if (userData?.info) {
      form.reset({
        firstName: userData.info.first_name,
        lastName: userData.info.last_name,
        email: userData.info.email,
        phone: userData.info.phone,
      })

      if (userData.info.img_url) {
        setAvatarPreview(userData.info.img_url)
        setHasCustomAvatar(true)
      }
    }
  }, [userData, form])

  const handleAvatarUpload = () => fileInputRef.current?.click()

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) return

    setAvatarFile(file)

    const reader = new FileReader()
    reader.onload = (event) => {
      setAvatarPreview(event.target?.result)
      setHasCustomAvatar(true)
    }
    reader.readAsDataURL(file)
  }

  const handleAvatarDelete = () => {
    setAvatarPreview("")
    setAvatarFile(null)
    setHasCustomAvatar(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append("email", data.email)
      formData.append("first_name", data.firstName)
      formData.append("last_name", data.lastName)
      formData.append("phone", data.phone)

      if (avatarFile) {
        formData.append("img_url", avatarFile)
      }

      const res = await update(formData).unwrap();
      if(res && res.data){
        router.push("/profile")
      }
    } catch (err) {
      console.log("Failed to update profile:", err)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-6 pb-24 md:pb-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/profile/products"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t("breadcrumbProfile")}</span>
          </Link>
          <span className="text-sm text-muted-foreground">/</span>
          <span className="text-sm text-foreground font-medium">{t("breadcrumbEdit")}</span>
        </div>

        {/* Form Card */}
        <div className="max-w-[960px]">
          <div className="rounded-xl border border-border bg-card p-4 md:p-8">
            <h1 className="text-xl font-semibold text-foreground mb-6">
              {t("title")}
            </h1>

            {/* Avatar Section */}
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-muted shrink-0">
                {hasCustomAvatar && avatarPreview ? (
                  <Image
                    src={avatarPreview}
                    alt="Avatar"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload avatar"
              />

              <div className="flex items-center gap-3">
                <Button
                  disabled={isLoading}
                  type="button"
                  variant="outline"
                  onClick={handleAvatarUpload}
                  className="rounded-md px-5 h-9 text-sm border-brand text-brand hover:bg-emerald-50 bg-transparent"
                >
                  {t("upload")}
                </Button>
                <Button
                  disabled={isLoading}
                  type="button"
                  variant="outline"
                  onClick={handleAvatarDelete}
                  className="rounded-md px-5 h-9 text-sm border-red-500 text-red-500 bg-[#FF383C0D] hover:bg-transparent hover:border-brand hover:text-brand"
                >
                  {t("delete")}
                </Button>
              </div>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground font-normal">
                          {t("firstName")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-11 border-border focus-visible:ring-emerald-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground font-normal">
                          {t("lastName")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-11 border-border focus-visible:ring-emerald-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground font-normal">
                          {t("email")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="h-11 border-border focus-visible:ring-emerald-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <PhoneField
                    label={t("phone")}
                    name={"phone"}
                    error={form.formState.errors?.phone?.message}
                    {...form.register("phone")}
                    value={form.watch("phone")}
                    onChange={(val) => {
                      form.setValue("phone", val)
                    }}
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-8 h-11"
                  >
                    {t("save")}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  )
}