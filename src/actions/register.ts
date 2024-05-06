"use server";

import { RegisterSchema } from "@/lib/authSchema";
import { getUserByEmail, getUserByUsername } from "@/model/user";
import * as z from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedValues = RegisterSchema.safeParse(values);

  if (!validatedValues.success)
    return {
      error: "Invalid values",
      issues: validatedValues.error.issues,
    };

  const { username, email, password } = validatedValues.data;

  const duplicateEmailUser = await getUserByEmail(email);
  const duplicateUsernameUser = await getUserByUsername(username);
  if (duplicateUsernameUser || duplicateEmailUser)
    return {
      error: "Username or email is already exit.",
    };

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });
    await signIn("credentials", { email, password, redirect: false });
  } catch (err) {
    return {
      error: "Something went wrong!",
    };
  }
  redirect("/");
}
