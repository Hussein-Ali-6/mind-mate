import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Username is required",
    })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(6, "Password at least 6 characters"),
});

export const RegisterSchema = z.object({
  email: z
    .string({
      required_error: "Username is required",
    })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(6, "Password at least 6 characters"),
  username: z
    .string({ required_error: "Username is required" })
    .min(1, "Username is required")
    .min(3, "Username should be at least 3 characters"),
});
