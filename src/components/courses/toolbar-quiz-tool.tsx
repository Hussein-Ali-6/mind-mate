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

export default function ToolbarQuizTool() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  if (searchParams.get("type") === "quiz") return null;

  function handleClick() {
    const params = new URLSearchParams(searchParams);
    params.set("type", "quiz");
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="#000000"
              version="1.1"
              id="Capa_1"
              viewBox="0 0 403.48 403.48"
              xmlSpace="preserve"
              className="size-6"
            >
              <g>
                <path d="M277.271,0H46.176v403.48h311.129V80.035L277.271,0z M281.664,25.607l50.033,50.034h-50.033V25.607z M61.176,388.48V15   h205.489v75.641h75.641v297.84H61.176z" />
                <path d="M101.439,117.58h55.18V62.4h-55.18V117.58z M116.439,77.4h25.18v25.18h-25.18V77.4z" />
                <path d="M101.439,192.08h55.18V136.9h-55.18V192.08z M116.439,151.9h25.18v25.18h-25.18V151.9z" />
                <path d="M101.439,266.581h55.18V211.4h-55.18V266.581z M116.439,226.4h25.18v25.181h-25.18V226.4z" />
                <path d="M101.439,341.081h55.18v-55.18h-55.18V341.081z M116.439,300.901h25.18v25.18h-25.18V300.901z" />
                <rect x="177.835" y="326.081" width="114.688" height="15" />
                <rect x="177.835" y="251.581" width="114.688" height="15" />
                <rect x="177.835" y="177.08" width="114.688" height="15" />
                <rect x="177.835" y="102.58" width="114.688" height="15" />
              </g>
            </svg>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Quizzes</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
