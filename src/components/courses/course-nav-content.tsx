"use client";

import { Chapter } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { createChapter } from "@/actions/chapter";
import { useFormStatus } from "react-dom";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  chapters: Pick<Chapter, "id" | "title">[];
  courseId: string;
};

export default function CourseNavContent({ chapters, courseId }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramsChapterId = new URLSearchParams(searchParams).get("chapterId");
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <nav className="w-full">
      <div className="flex items-center gap-2 px-3 md:px-4">
        <span className="font-semibold">Chapters</span>
        <span className="h-[1px] flex-1 bg-border"></span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="size-6"
                variant="outline"
                onClick={() => {
                  setIsAdding(true);
                  inputRef.current?.focus();
                }}
              >
                <Plus size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Add a new chapter</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ul className="flex flex-col gap-1 mt-3 w-full">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <Link
              href={`${pathname}?chapterId=${chapter.id}`}
              className={cn(
                " text-sm py-2 px-3 md:px-4 hover:text-primary block w-full",
                paramsChapterId === chapter.id
                  ? "text-blue-500 border-r-blue-500 bg-muted border-r-2 "
                  : "text-muted-foreground"
              )}
            >
              {chapter.title}
            </Link>
          </li>
        ))}
        {isAdding && (
          <form
            className="px-3 md:px-4"
            action={async (formData: FormData) => {
              await createChapter(formData);
              setIsAdding(false);
            }}
          >
            <Input
              className="h-8"
              ref={inputRef}
              autoFocus
              name="title"
              disabled={inputDisabled}
            />
            <input hidden value={courseId} name="courseId" readOnly />
            <input hidden value={pathname} name="pathname" readOnly />
            <AddButton setInputDisabled={setInputDisabled} />
          </form>
        )}
      </ul>
    </nav>
  );
}

function AddButton({
  setInputDisabled,
}: {
  setInputDisabled: Dispatch<SetStateAction<boolean>>;
}) {
  const { pending } = useFormStatus();
  useEffect(() => {
    setInputDisabled(pending);
  }, [pending, setInputDisabled]);

  return <button type="submit" hidden />;
}
