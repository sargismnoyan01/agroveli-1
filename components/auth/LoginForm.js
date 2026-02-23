'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl'; // Добавлен импорт
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import TextField from '@/components/shared/TextField';
import PasswordField from '@/components/shared/PasswordField';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight } from 'lucide-react';
import { loginSchema } from "@/lib/validations/auth";
import { useLoginMutation } from "@/lib/store/services/authApi";

export default function LoginForm() {
  const t = useTranslations('LoginForm'); // Инициализация
  const router = useRouter();
  const [login, {isLoading}] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      keepLoggedIn: false,
    },
    mode: 'onBlur',
  });

  const keepLoggedIn = watch('keepLoggedIn');

  const onSubmit = async (data) => {
    const {data: res} = await login(data);

    if(res){
      router.push('/')
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-2">{t('title')}</h2>

      <p className="text-center text-gray-600 text-sm mb-6">
        {t('needAccount')}{' '}
        <Link href="/register" className="text-[#FF6B2C] hover:underline">
          {t('createAccount')}
        </Link>
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
        autoComplete="off"
      >
        {/* Email */}
        <TextField
          label={t('emailLabel')}
          type="email"
          className="mb-4"
          placeholder={t('emailPlaceholder')}
          {...register('email')}
          error={errors.email?.message}
        />

        {/* Password */}
        <PasswordField
          label={t('passwordLabel')}
          placeholder="••••••••••"
          {...register('password')}
          error={errors.password?.message}
        />

        {/* Remember me */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="keepLoggedIn"
              checked={keepLoggedIn}
              onCheckedChange={(checked) =>
                setValue('keepLoggedIn', Boolean(checked))
              }
            />
            <label
              htmlFor="keepLoggedIn"
              className="text-sm text-gray-700 cursor-pointer"
            >
              {t('keepLoggedIn')}
            </label>
          </div>

          <Link
            href="/forgot-password"
            className="text-sm text-[#FF6B2C] hover:underline"
          >
            {t('forgotPassword')}
          </Link>
        </div>

        <Button
          disabled={isLoading || isSubmitting}
          type="submit"
          className="w-full mt-6"
        >
          {t('loginButton')}
          <ArrowRight size={20} />
        </Button>
      </form>
    </div>
  );
}