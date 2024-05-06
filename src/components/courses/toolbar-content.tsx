"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FileText } from "lucide-react";

export default function ToolbarContent() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  if (!searchParams.get("type")) return null;

  function handleClick() {
    const params = new URLSearchParams(searchParams);
    params.delete("type");
    params.delete("quizId");
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={handleClick}>
            <FileText className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Content</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
