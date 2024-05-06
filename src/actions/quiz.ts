"use server";

import { generateObject, streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
// import { createStreamableValue } from "ai/rsc";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { getChapterById } from "@/model/chapter";
import {
  createQuiz,
  deleteQuizById,
  getAllQuizzesByChapterId,
  getQuizById,
} from "@/model/quiz";
import EditorParser from "editorjs-parser";
import { correctQuestion, createQuestionMany } from "@/model/question";

const parser = new EditorParser();

export async function generateQuiz(chapterId: string) {
  "use server";
  const session = await auth();
  if (!session?.user.id) return null;

  const chapter = await getChapterById(chapterId, session.user.id);
  if (!chapter) return null;

  const quiz = await createQuiz(chapter.id);
  if (!quiz) return null;

  const markup = parser.parse(chapter.content);

  const { object } = await generateObject({
    model: openai("gpt-4-turbo"),
    system:
      "You generate 10 multiple choices questions with 3 wrong options and one only correct answer as a quiz for a student form only and only from the chapter content 'HTML' markup provided. And provide the exact source, without HTML tags, of the answer from the provided chapter content.",
    prompt: `Chapter content HTML: ${markup}`,
    schema: z.object({
      questions: z.array(
        z.object({
          question: z.string().describe("The question"),
          answer: z
            .string()
            .describe("The only correct answer of the question."),
          option1: z.string().describe("A wrong option"),
          option2: z.string().describe("A wrong option"),
          option3: z.string().describe("A wrong option"),
          source: z
            .string()
            .describe(
              "The exact source of the question from the provided chapter content"
            ),
        })
      ),
    }),
  });

  const res = await createQuestionMany(object.questions, quiz.id);
  if (!res)
    return {
      success: false,
    };

  const theQuiz = await getQuizById(quiz.id, session.user.id);

  if (!theQuiz) return null;

  return {
    success: true,
    data: {
      id: theQuiz.id,
    },
  };
}

export async function fetchQuizById(quizId: string) {
  const session = await auth();
  if (!session?.user.id) return null;
  const quiz = await getQuizById(quizId, session.user.id);
  if (!quiz) return null;
  const userQuestions = quiz.questions.map((question) => {
    const { option1, option2, option3 } = question.options as {
      option1: string;
      option2: string;
      option3: string;
    };
    const options = [option1, option2, option3];
    options.splice(Math.floor(Math.random() * 4), 0, question.answer);
    return {
      id: question.id,
      question: question.question,
      options,
      userAnswer: question.userAnswer,
      isCorrect: question.isCorrect,
      source: question.source,
    };
  });

  return {
    ...quiz,
    questions: userQuestions,
  };
}

export async function fetchAllQuizzes(chapterId: string) {
  const session = await auth();
  if (!session?.user.id) return null;
  const quizzes = await getAllQuizzesByChapterId(chapterId, session.user.id);
  if (!quizzes) return null;
  return quizzes;
}

export async function correctQuiz(
  answers: Record<string, string>,
  quizId: string
) {
  const session = await auth();
  if (!session?.user.id) return null;
  const quiz = await getQuizById(quizId, session.user.id);
  if (!quiz) return null;
  const operations = quiz.questions.map(async (question) => {
    const userAnswer = answers[question.id];
    const isCorrect = userAnswer === question.answer;
    await correctQuestion(question.id, isCorrect, userAnswer);
  });

  await Promise.all(operations);

  return {
    success: true,
  };
}

export async function deleteQuiz(quizId: string) {
  const session = await auth();
  if (!session?.user.id) return null;
  const quiz = await deleteQuizById(quizId, session.user.id);
  return quiz;
}
