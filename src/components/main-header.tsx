import Link from "next/link";
import AccountMenu from "@/components/auth/account-menu";
import { auth } from "@/lib/auth";
import { Button } from "./ui/button";

export default async function MainHeader() {
  const session = await auth();

  return (
    <header className="py-3 border-b shadow-sm">
      <div className="container flex items-center justify-between">
        <div>
          <Link href="/" className="font-extrabold text-xl">
            MindMate
          </Link>
          <Button variant="ghost" asChild className="ms-8">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
        <AccountMenu session={session} />
      </div>
    </header>
  );
}
