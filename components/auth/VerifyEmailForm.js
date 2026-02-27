'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl'; // Добавил импорт
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function VerifyEmailForm() {
  const t = useTranslations('VerifyEmail'); // Инициализация
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const searchParams = useSearchParams()
  const email = searchParams.get('email');

  useEffect(() => {
    if(!email){
      router.push('/login');
    }
  }, [email]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value[0];
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newCode = [...code];

    pastedData.forEach((char, index) => {
      if (index < 6 && /^\d$/.test(char)) {
        newCode[index] = char;
      }
    });

    setCode(newCode);

    // Focus last filled input or next empty
    const lastFilledIndex = newCode.findLastIndex(c => c !== '');
    if (lastFilledIndex < 5) {
      inputRefs.current[lastFilledIndex + 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Verification code:', code.join(''));

    // Add your verification logic here
  };

  const handleResend = () => {
    console.log('Resending code...');
    // Add resend logic here
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-3">{t('title')}</h2>
      <p className="text-center text-gray-600 text-sm mb-2">
        {t('description')}
      </p>
      <p className="text-center text-[#FF6B2C] text-sm mb-8">
        {email}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-2 justify-center" onPaste={handlePaste}>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-semibold border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent"
            />
          ))}
        </div>

        <div className="text-center my-4">
          <span className="text-sm text-gray-600">{t('resendText')} </span>
          <button
            type="button"
            onClick={handleResend}
            className="text-sm text-[#0F766E] hover:underline font-medium"
          >
            {t('resendButton')}
          </button>
        </div>

        <Button disabled={code.some(item => !item)} type="submit" className="w-full">
          {t('verifyButton')}
          <ArrowRight size={20} />
        </Button>
      </form>
    </div>
  );
}