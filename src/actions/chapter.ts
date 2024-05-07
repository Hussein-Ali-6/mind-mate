"use server";

import { revalidatePath } from "next/cache";
import {
  createChapter as createChapterDb,
  deleteChapterById,
} from "@/model/chapter";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function createChapter(formData: FormData) {
  const title = formData.get("title") as string;
  const courseId = formData.get("courseId") as string;
  const pathname = formData.get("pathname") as string;

  if (!title || !courseId || !pathname) return;

  const chapter = await createChapterDb(title, courseId);

  if (!chapter) return;

  revalidatePath(pathname);
  redirect(`${pathname}?chapterId=${chapter.id}`);
}

export async function deleteChapter(chapterId: string) {
  const session = await auth();
  if (!session?.user.id) return null;
  const chapter = await deleteChapterById(chapterId, session.user.id);

  return chapter;
}
