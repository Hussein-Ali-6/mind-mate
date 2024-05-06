import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { chapterId: string } }
) {
  const chapterId = params.chapterId;
  const session = await auth();
  if (!session?.user.id)
    return Response.json({ message: "Request denied" }, { status: 301 });

  try {
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
      select: {
        Course: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!chapter || chapter.Course.userId !== session.user.id)
      return Response.json({ message: "Request denied" }, { status: 303 });

    const data = await req.json();

    await prisma.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        content: data.editorData,
      },
    });

    return Response.json({});
  } catch (err) {
    return Response.error();
  }
}
