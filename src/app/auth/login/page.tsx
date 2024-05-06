import AuthCard from "@/components/auth/auth-card";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="py-10">
      <AuthCard
        title="Login"
        description="Welcome to MindMate"
        linkHref="/auth/register"
        linkLabel="Don't have an account?"
      >
        <LoginForm />
      </AuthCard>
    </main>
  );
}
