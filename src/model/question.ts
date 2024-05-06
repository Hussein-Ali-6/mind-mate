import prisma from "@/lib/db";
import { Question } from "@prisma/client";

type InputQuestion = {
  question: string;
  answer: string;
  source: string;
  option1: string;
  option2: string;
  option3: string;
};

export async function createQuestionMany(
  questions: InputQuestion[],
  quizId: string
) {
  const fullQuestion: (Omit<
    Question,
    "id" | "isCorrect" | "userAnswer" | "options"
  > & { options: {} })[] = [];
  [...Array(questions.length)].map((_, i) => {
    fullQuestion.push({
      answer: questions[i].answer,
      question: questions[i].question,
      source: questions[i].source,
      options: {
        option1: questions[i].option1,
        option2: questions[i].option2,
        option3: questions[i].option3,
      },
      quizId,
    });
  });

  try {
    const count = await prisma.question.createMany({
      data: fullQuestion,
    });

    // const DBQuestions = await prisma.question.findMany({
    //   where: {
    //     quizId,
    //   },
    // });

    return count;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function correctQuestion(
  questionId: string,
  isCorrect: boolean,
  userAnswer: string
) {
  try {
    await prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        userAnswer,
        isCorrect,
      },
    });
  } catch (err) {
    return null;
  }
}
