import React from "react";
import CourseContent from "@/components/courses/course-content";
import CourseHeadings from "@/components/courses/course-headings";
import { getCourseAndChaptersById } from "@/model/course";
import { auth } from "@/lib/auth";
import { getChapterById } from "@/model/chapter";
import CourseProvider from "./course-provider";

type Props = {
  chapterId?: string;
  courseId: string;
};

export default async function CourseMain({ chapterId, courseId }: Props) {
  const session = await auth();
  if (!session?.user.id) return;
  let data;
  let type: "course" | "chapter";

  if (!chapterId) {
    data = await getCourseAndChaptersById(courseId, session.user.id);
    type = "course";
  } else {
    data = await getChapterById(chapterId, session.user.id);
    type = "chapter";
  }

  return (
    <div className="grid md:grid-cols-[1fr_200px] lg:grid-cols-[1fr_280px]">
      <CourseProvider data={data} type={type}>
        <CourseContent />
        {/* <CourseHeadings /> */}
      </CourseProvider>
    </div>
  );
}
