import prisma from "@/lib/db";
import { Chapter } from "@prisma/client";

export async function getChapterById(
  id: string,
  userId: string
): Promise<Chapter | null> {
  try {
    const chapter = await prisma.chapter.findUnique({
      where: {
        id,
        Course: {
          userId,
        },
      },
    });

    if (!chapter) return null;
    return chapter;
  } catch (err) {
    return null;
  }
}

export async function getAllChaptersByCourse(
  courseId: string
): Promise<Pick<Chapter, "id" | "courseId" | "title">[] | null> {
  try {
    const chapters = await prisma.chapter.findMany({
      select: { id: true, courseId: true, title: true },
      where: { courseId },
    });

    return chapters;
  } catch (err) {
    return null;
  }
}

export async function createChapter(title: string, courseId: string) {
  try {
    const chapter = await prisma.chapter.create({
      data: {
        courseId,
        title,
      },
    });
    return chapter;
  } catch (err) {
    return null;
  }
}

export async function deleteChapterById(chapterId: string, userId: string) {
  try {
    const chapter = await prisma.chapter.delete({
      where: {
        id: chapterId,
        Course: {
          userId,
        },
      },
    });
    return chapter;
  } catch (err) {
    return null;
  }
}
