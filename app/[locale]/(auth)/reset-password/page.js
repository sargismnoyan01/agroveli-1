import AuthCard from "@/components/shared/AuthCard";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Suspense } from "react";

export default function ResetPassword() {
  return(
    <AuthCard>
      <Suspense fallback="">
        <ResetPasswordForm/>
      </Suspense>
    </AuthCard>
  )
}