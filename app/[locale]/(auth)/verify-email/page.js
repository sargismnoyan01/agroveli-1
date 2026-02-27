import AuthCard from '@/components/shared/AuthCard';
import VerifyEmailForm from '@/components/auth/VerifyEmailForm';
import { Suspense } from "react";

export default function VerifyEmailPage() {
  return (
    <AuthCard>
      <Suspense fallback="">
        <VerifyEmailForm />
      </Suspense>
    </AuthCard>
  );
}