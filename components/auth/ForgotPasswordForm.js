'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import TextField from '@/components/shared/TextField';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { useForgotPasswordMutation } from "@/lib/store/services/authApi";
// Предполагаем, что у вас есть такой эндпоинт в authApi
// import { useForgotPasswordMutation } from "@/lib/store/services/authApi";

export default function ForgotPasswordForm() {
  const t = useTranslations('ForgotPasswordForm');
  const router = useRouter();
  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    try {
      const res = await forgotPassword(data).unwrap();

      if(res){
        router.push(`/verify-email?email=${data.email}&token=${res.token}&uid=${res.uid}`)
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* Кнопка назад */}
      <Link
        href="/login"
        className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-4 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        {t('backToLogin')}
      </Link>

      <h2 className="text-2xl font-semibold text-center mb-2">{t('title')}</h2>

      <p className="text-center text-gray-600 text-sm mb-6">
        {t('description')}
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
          placeholder={t('emailPlaceholder')}
          {...register('email')}
          error={errors.email?.message}
        />

        <Button
          disabled={isLoading || isSubmitting}
          type="submit"
          className="w-full mt-6"
        >
          {t('submitButton')}
          <ArrowRight size={20} className="ml-2" />
        </Button>
      </form>

      <p className="text-center text-gray-600 text-sm mt-6">
        {t('didNotReceiveEmail')}{' '}
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="text-[#FF6B2C] hover:underline font-medium"
        >
          {t('resend')}
        </button>
      </p>
    </div>
  );
}