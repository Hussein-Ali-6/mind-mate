import prisma from "@/lib/db";
import { Question, Quiz } from "@prisma/client";

export async function createQuiz(chapterId: string): Promise<Quiz | null> {
  try {
    const quiz = await prisma.quiz.create({
      data: {
        chapterId,
      },
    });
    return quiz;
  } catch (err) {
    return null;
  }
}

export async function getQuizByChapterId(id: string, userId: string) {
  try {
    const quiz = await prisma.quiz.findFirst({
      where: {
        id,
        chapter: {
          Course: {
            userId,
          },
        },
      },
      include: {
        questions: true,
      },
    });
    return quiz;
  } catch (err) {
    return null;
  }
}

export async function getQuizById(quizId: string, userId: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
        chapter: {
          Course: {
            userId,
          },
        },
      },
      include: {
        questions: true,
      },
    });
    return quiz;
  } catch (err) {
    return null;
  }
}

export async function getAllQuizzesByChapterId(
  chapterId: string,
  userId: string
): Promise<(Quiz & { questions: Question[] })[] | null> {
  try {
    const quiz = await prisma.quiz.findMany({
      where: {
        chapterId,
        chapter: {
          Course: {
            userId,
          },
        },
      },
      include: {
        questions: true,
      },
    });
    return quiz;
  } catch (err) {
    return null;
  }
}

export async function deleteQuizById(quizId: string, userId: string) {
  try {
    const quiz = await prisma.quiz.delete({
      where: {
        id: quizId,
      },
    });
    return quiz;
  } catch (err) {
    return null;
  }
}
