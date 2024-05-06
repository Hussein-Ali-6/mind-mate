import AuthCard from "@/components/auth/auth-card";
import RegisterFrom from "@/components/auth/register-form";
import React from "react";

export default function RegisterPage() {
  return (
    <main className="py-10">
      <AuthCard
        title="Sign up"
        description="Welcome to MindMate"
        linkHref="/auth/login"
        linkLabel="Do you already have an account?"
      >
        <RegisterFrom />
      </AuthCard>
    </main>
  );
}
