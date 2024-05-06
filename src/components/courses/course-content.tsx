"use client";

import ModuleContentToolbar from "./course-content-toolbar";
import Editor from "@/components/editor";
import { useCourseContent } from "./course-provider";
import Quiz from "./quiz-comp";
import { useSearchParams } from "next/navigation";

export default function CourseContent() {
  const { data } = useCourseContent();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "";

  if (!data) return <p>Something went wrong!</p>;

  return (
    <div className="py-8 px-4 prose">
      <div className="flex justify-between items-center mb-2">
        <h1 className="m-0">{data.title}</h1>
        <div className="flex flex-col gap-1 text-muted-foreground italic text-xs">
          <span>
            Created At{" "}
            <span className="not-italic">
              {data.createdAt.toLocaleDateString()}
            </span>
          </span>
          {"updatedAt" in data ? (
            <span>
              Last Modified{" "}
              <span className="not-italic">
                {data.updatedAt.toLocaleDateString()}
              </span>
            </span>
          ) : null}
        </div>
      </div>
      <ModuleContentToolbar />
      {type === "quiz" ? <Quiz /> : <Editor />}
    </div>
  );
}
