import AuthCard from '@/components/shared/AuthCard';
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthCard size={"lg"}>
      <RegisterForm />
    </AuthCard>
  );
}