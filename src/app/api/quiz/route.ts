import { auth } from "@/lib/auth";
import { getChapterById } from "@/model/chapter";
import { createQuiz } from "@/model/quiz";
import { NextRequest, NextResponse } from "next/server";
import EditorParser from "editorjs-parser";

const parser = new EditorParser();

export async function POST(
  req: NextRequest,
  { params }: { params: { chapterId: string } }
) {
  const session = await auth();
  if (!session?.user.id)
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });

  const data = await req.json();
  const chapterId = data?.chapterId;
  console.log(chapterId);

  const chapter = await getChapterById(chapterId, session.user.id);
  if (!chapter)
    return NextResponse.json(
      { message: "Chapter ID not available" },
      { status: 400 }
    );

  const quiz = await createQuiz(chapter.id);

  const markup = parser.parse(chapter.content);

  return NextResponse.json({ data: markup });
}
