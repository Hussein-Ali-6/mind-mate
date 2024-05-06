import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
  linkHref: string;
  linkLabel: string;
};

export default function AuthCard({
  children,
  title,
  description,
  linkHref,
  linkLabel,
}: Props) {
  return (
    <div className="container flex justify-center items-center">
      <Card className="max-w-xl w-full">
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="">
          <Button variant="link" className="px-0 underline-offset-1" asChild>
            <Link href={linkHref}>{linkLabel}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
