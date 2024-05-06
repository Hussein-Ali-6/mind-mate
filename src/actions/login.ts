"use server";

import { signIn } from "@/lib/auth";
import { LoginSchema } from "@/lib/authSchema";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function login(values: z.infer<typeof LoginSchema>) {
  try {
    await signIn("credentials", { ...values, redirect: false });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
      }
    }
    return {
      error: "Something went wrong!",
    };
  }
  redirect("/");
}
