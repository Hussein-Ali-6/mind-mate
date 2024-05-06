import { Suspense } from "react";
import CourseNav from "@/components/courses/course-nav";
import CourseMain from "@/components/courses/course-main";
import { Skeleton } from "@/components/ui/skeleton";
import MainLoad from "@/components/main-load";

export default function CoursePage({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: { chapterId?: string };
}) {
  return (
    <div className="grid min-h-screen md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden md:block bg-muted/40 overflow-y-auto border-r py-4 sticky top-0 max-h-svh pt-10">
        <Suspense fallback={<CourseNavSkeleton />}>
          <CourseNav courseId={params.courseId} />
        </Suspense>
      </div>
      {/* Make the following two in one components */}
      <Suspense fallback={<MainLoad />}>
        <CourseMain
          courseId={params.courseId}
          chapterId={searchParams?.chapterId}
        />
      </Suspense>
    </div>
  );
}

function CourseNavSkeleton() {
  return (
    <div className="mb-4 px-3 md:px-4 flex flex-col gap-2 mt-2">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-[20px] w-full bg-muted-foreground/40" />
      ))}
    </div>
  );
}
