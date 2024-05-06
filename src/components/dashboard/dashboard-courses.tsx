import { SquarePlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/dashboard/dashboard-course-card";
import { auth } from "@/lib/auth";
import { getAllCoursesWithNumberOfChapters } from "@/model/course";
import DialogCreateCourse from "./dialog-create-course";

export default async function Courses() {
  const session = await auth();
  if (!session?.user.id) return <p>Something went wrong!</p>;

  const courses = await getAllCoursesWithNumberOfChapters(session.user.id);
  if (!courses) return <p>Something went wrong!</p>;

  return (
    <div className="container py-6">
      <div
        className="relative overflow-hidden w-full h-[100px] rounded-lg object-cover bg-no-repeat bg-center bg-slate-200"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1713101888073-76cc3a9e441a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <div className="absolute inset-0 bg-black/30 flex items-end p-6">
          <div className="text-white font-semibold text-2xl">
            {new Date().toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between border-b pb-2">
        <h2 className="text-primary text-2xl font-semibold">Courses</h2>
        <div className="flex items-center gap-3">
          {/* <Button size="sm" className="flex items-center gap-1">
            <SquarePlus className="size-4" />
            <span className="hidden md:inline-block">Create new</span>
          </Button> */}
          <DialogCreateCourse />
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1"
          >
            <Upload className="size-4" />
            <span className="hidden md:inline-block">Upload</span>
          </Button>
        </div>
      </div>
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 py-6">
        {courses.map((course) => (
          <CourseCard data={course} key={course.id} />
        ))}
      </div>
    </div>
  );
}
