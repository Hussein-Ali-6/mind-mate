import { BookOpenCheck, BookText, Bot } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2  px-2 md:px-4  py-6">
        <nav className="flex-1 flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="flex text-sm items-center gap-3 rounded py-2  transition-all hover:text-primary  bg-muted px-2 text-primary"
          >
            <BookText className="size-4" />
            Courses
          </Link>
          <Link
            href="/dashboard/quizzes"
            className="flex text-sm items-center gap-3 rounded py-2 text-muted-foreground transition-all hover:text-primary px-2"
          >
            <BookOpenCheck className="size-4" />
            Quizzes
          </Link>
          <Link
            href="#"
            className="flex text-sm items-center gap-3 rounded py-2 text-muted-foreground transition-all hover:text-primary px-2"
          >
            <Bot className="size-4" />
            AI Assistant
          </Link>
        </nav>
        <div className="">
          <Card>
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
