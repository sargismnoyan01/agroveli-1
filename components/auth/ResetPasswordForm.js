'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import PasswordField from '@/components/shared/PasswordField';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useVerifyEmailMutation } from "@/lib/store/services/authApi";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { toast } from "react-toastify";

export default function ResetPasswordForm() {
  const t = useTranslations('ResetPasswordForm');
  const router = useRouter();
  const searchParams = useSearchParams()
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const [resetPassword, { isLoading }] = useVerifyEmailMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (!uid || !token) {
      router.push('/login');
      toast.error(t('Errors.somethingWentWrong'));
    }
  }, [ uid, token]);

  const onSubmit = async (data) => {
    const { data: res } = await resetPassword({ uid, token, new_password: data.password });

    if (res) {
      toast.success(t('successMessage'));
      router.push('/login');
    }
  };

  return (
    <div>
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
        {/* New Password */}
        <PasswordField
          className="mb-4"
          label={t('newPasswordLabel')}
          placeholder="••••••••••"
          {...register('password')}
          error={errors.password?.message}
        />

        {/* Password Confirmation */}
        <PasswordField
          label={t('confirmPasswordLabel')}
          placeholder="••••••••••"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <Button
          disabled={isLoading || isSubmitting}
          type="submit"
          className="w-full mt-6"
        >
          {t('resetButton')}
          <ArrowRight size={20}/>
        </Button>
      </form>
    </div>
  );
}