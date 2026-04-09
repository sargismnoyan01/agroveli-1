"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl" // Добавил импорт

import TextField from "@/components/shared/TextField"
import PasswordField from "@/components/shared/PasswordField"
import PhoneField from "@/components/shared/PhoneField"
import { Button } from "@/components/ui/button"
import { registerSchema } from "@/lib/validations/auth";
import { useRegisterMutation } from "@/lib/store/services/authApi";

export default function RegisterForm() {
  const t = useTranslations("RegisterForm"); // Инициализация
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data) => {
    const { data: res } = await registerUser({
      "email": data.email,
      "password": data.password,
      "first_name": data.firstName,
      "last_name": data.lastName,
      "phone": data.phone
    });

    if (res) {
      router.push(`/login`)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-2">{t("title")}</h2>
      <p className="text-center text-gray-600 text-sm mb-6">
        {t("alreadyHaveAccount")}{" "}
        <Link href="/login" className="text-[#FF6B2C] hover:underline">
          {t("logIn")}
        </Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label={t("firstName")}
            placeholder="Damien"
            error={errors.firstName?.message}
            {...register("firstName")}
          />

          <TextField
            label={t("lastName")}
            placeholder="Creation"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label={t("email")}
            type="email"
            placeholder="Email"
            error={errors.email?.message}
            {...register("email")}
          />

          <PhoneField
            label={t("phone")}
            name={"phone"}
            error={errors.phone?.message}
            {...register("phone")}
            onChange={(val) => {
              setValue("phone", val)
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <PasswordField
            label={t("createPassword")}
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />

          <PasswordField
            label={t("confirmPassword")}
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>

        <Button
          disabled={isLoading || isSubmitting}
          type="submit"
          className="w-full mt-6 bg-brand hover:bg-brand-hover"
        >
          {t("registerButton")}
          <ArrowRight size={20}/>
        </Button>
      </form>
    </div>
  )
}