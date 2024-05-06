"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AccountMenu({ session }: { session: Session | null }) {
  if (!session?.user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center justify-center  gap-2"
        asChild
      >
        <Button variant="ghost">
          <Avatar className="size-8">
            {session.user.image && <AvatarImage src={session.user.image} />}
            <AvatarFallback>
              {session.user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{session.user.username}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2 size-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
