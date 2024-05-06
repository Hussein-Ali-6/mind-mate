import Link from "next/link";
import { getCourseAndChaptersById } from "@/model/course";
import { auth } from "@/lib/auth";
import CourseNavContent from "./course-nav-content";

export default async function CourseNav({ courseId }: { courseId: string }) {
  const pathname = `/courses/${courseId}`;
  const session = await auth();
  if (!session?.user.id) return <p>Something went wrong</p>;

  const data = await getCourseAndChaptersById(courseId, session.user.id);

  if (!data) return <p>Something went wrong!</p>;

  return (
    <div>
      <Link href={pathname}>
        <h2 className="font-semibold mb-4 px-3 md:px-4 hover:bg-muted">
          {data.title}
        </h2>
      </Link>
      <CourseNavContent chapters={data.chapters} courseId={courseId} />
    </div>
  );
}
