import prisma from "@/lib/db";
import { Chapter, Course } from "@prisma/client";

export async function getCourseAndChaptersById(
  id: string,
  userId: string
): Promise<(Course & { chapters: Pick<Chapter, "id" | "title">[] }) | null> {
  try {
    const theCourse = prisma.course.findUnique({
      where: { id, userId },
      include: {
        chapters: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!theCourse) return null;

    return theCourse;
  } catch (err) {
    return null;
  }
}

export async function getAllCourses(userId: string): Promise<Course[] | null> {
  try {
    const theCourses = prisma.course.findMany({
      where: { userId },
    });

    if (!theCourses) return null;

    return theCourses;
  } catch (err) {
    return null;
  }
}

export async function getAllCoursesWithNumberOfChapters(
  userId: string
): Promise<
  | (Course & {
      _count: {
        chapters: number;
      };
    })[]
  | null
> {
  try {
    const courses = prisma.course.findMany({
      where: {
        userId,
      },
      include: {
        _count: {
          select: { chapters: true },
        },
      },
    });
    if (!courses) return null;
    return courses;
  } catch (err) {
    return null;
  }
}

export async function createCourse(title: string, userId: string) {
  try {
    const theCourse = await prisma.course.create({
      data: {
        userId,
        title,
      },
    });
    return theCourse;
  } catch (err) {
    return null;
  }
}
