"use server";

import { auth } from "@/lib/auth";
import { createCourse as createCoursePrisma } from "@/model/course";
import { revalidatePath } from "next/cache";

export async function createCourse(formData: FormData) {
  const title = formData.get("title") as string;
  if (!title) return false;
  const session = await auth();
  if (!session?.user.id) return false;

  try {
    await createCoursePrisma(title, session.user.id);
    revalidatePath("/dashboard");
    return true;
  } catch (err) {
    return false;
  }
}
