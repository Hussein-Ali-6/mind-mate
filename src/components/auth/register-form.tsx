"use client";

import { RegisterSchema } from "@/lib/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { Alert } from "@/components/alert";
import { RotateCw } from "lucide-react";
import register from "@/actions/register";

export default function RegisterFrom() {
  const [loading, startTransition] = useTransition();
  const [response, setResponse] = useState<any>(null);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setResponse(null);
    startTransition(async () => {
      const res = await register(values);
      setResponse(res);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="john" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {response?.error && (
          <Alert
            message={response.error}
            variant="destructive"
            className="mt-4"
          />
        )}
        {response?.success && (
          <Alert
            message={response.success}
            variant="success"
            className="mt-4"
          />
        )}
        <Button className="w-full mt-6" disabled={loading}>
          {loading ? (
            <>
              {" "}
              <RotateCw
                size={20}
                absoluteStrokeWidth
                className="animate-spin mr-2"
              />
              Signing up...
            </>
          ) : (
            "Sign up"
          )}
        </Button>
      </form>
    </Form>
  );
}
