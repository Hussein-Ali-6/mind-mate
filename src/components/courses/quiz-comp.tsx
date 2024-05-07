"use client";

import { useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ArrowLeft, Delete } from "lucide-react";
import {
  correctQuiz,
  deleteQuiz,
  fetchAllQuizzes,
  fetchQuizById,
  generateQuiz,
} from "@/actions/quiz";
import { Question, Quiz as QuizT } from "@prisma/client";
import MainLoad from "../main-load";
import { Skeleton } from "../ui/skeleton";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Alert } from "../alert";
import { VariantProps } from "class-variance-authority";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function QuizPage() {
  const searchParams = useSearchParams();
  const isQuiz = !!searchParams.get("quizId");

  return (
    <div className="w-full  mx-auto">
      {isQuiz ? <Quiz /> : <PreviousQuizzes />}
    </div>
  );
}

function Quiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<
    QuizT & {
      questions: {
        id: string;
        question: string;
        options: string[];
        userAnswer: string | null;
        isCorrect: boolean | null;
        source: string;
      }[];
    }
  >();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const quizId = searchParams.get("quizId") ?? "";

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("quizId");
    push(`${pathname}?${params.toString()}`);
  };

  const handleSubmit = async () => {
    if (!quiz) return;
    setError(null);
    setIsSubmitting(true);
    const res = await correctQuiz(answers, quiz.id);
    if (!res?.success) {
      setError("Something went wrong");
      return;
    }
    const data = await fetchQuizById(quizId);
    setIsSubmitting(false);
    setAnswers({});
    if (!data) return;

    setQuiz(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      const data = await fetchQuizById(quizId);
      setIsLoading(false);
      if (!data) {
        setError("Something went wrong");
        return;
      }
      setQuiz(data);
    };
    if (quizId) fetchData();
  }, [quizId]);

  if (isLoading) return <MainLoad className="py-6" />;

  if (error || !quiz)
    return (
      <p className="text-center font-semibold">
        {error || "Something went wrong"}
      </p>
    );

  const isCorrected = !!quiz.questions[0].userAnswer;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <Button
          variant="link"
          onClick={handleClick}
          className="text-muted-foreground"
        >
          <ArrowLeft className="size-3 mr-2" />
          All Quizzes
        </Button>
        {isCorrected && <ScoreBadge questions={quiz.questions} />}
      </div>
      <div className="w-full max-w-xl mx-auto">
        {quiz.questions.map((question, i) => {
          return (
            <div className="w-full" key={question.id}>
              <p className="font-semibold mb-3">
                <span>{i + 1}-</span> {question.question}
              </p>
              <div className="space-y-2">
                {question.options.map((option) => (
                  <div
                    key={option}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-md bg-gray-100  dark:bg-gray-700",

                      {
                        "border border-red-500 bg-red-200 hover:bg-red-200":
                          question.userAnswer === option && !question.isCorrect,
                        "border border-green-500 bg-green-200 hover:bg-green-200":
                          question.userAnswer === option && question.isCorrect,
                        "hover:bg-gray-200 cursor-pointer": !isCorrected,
                        "bg-gray-300 hover:bg-gray-300":
                          answers[question.id] === option,
                      }
                    )}
                    onClick={() => {
                      if (isCorrected) return;
                      setAnswers((prev) => ({
                        ...prev,
                        [question.id]: option,
                      }));
                    }}
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {option}
                    </span>
                  </div>
                ))}
              </div>
              {isCorrected && (
                <Accordion type="single" collapsible className="w-full mt-4">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-base py-0">
                      Source
                    </AccordionTrigger>
                    <AccordionContent className="mt-2">
                      {question.source}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          );
        })}
        {!isCorrected && (
          <div className="flex justify-end">
            <Button
              className="px-8 h-8 bg-blue-500 hover:bg-blue-600 transition-colors mt-6"
              disabled={
                Object.keys(answers).length != quiz.questions.length ||
                isSubmitting
              }
              onClick={handleSubmit}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function PreviousQuizzes() {
  const [quizzes, setQuizzes] = useState<
    (QuizT & { questions: Question[] })[] | null
  >();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<string[]>([]);
  const [revalidate, setRevalidate] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const chapterId = searchParams.get("chapterId") || "";

  const handleClick = (id: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("quizId", id);
    push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const res = await fetchAllQuizzes(chapterId);
      setQuizzes(res);
      setIsLoading(false);
    })();
  }, [chapterId, revalidate]);

  if (isLoading)
    return (
      <div className="space-y-2 mt-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );

  if (!quizzes)
    return <p className="font-medium text-center">Something went wrong</p>;

  if (quizzes.length === 0)
    return (
      <div className="w-full min-h-60 border-dashed l border-slate-400 border-[1px] flex flex-col justify-center items-center">
        <div className="font-medium text-center mb-3">There is no quizzes</div>

        <GenerateQuiz />
      </div>
    );

  return (
    <div>
      <Card className="px-0">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden sm:table-cell">
                  N. of Questions
                </TableHead>
                <TableHead className="">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizzes.map((quiz) => {
                console.log(quiz);
                return (
                  <TableRow
                    key={quiz.id}
                    className="group hover:cursor-pointer"
                    onClick={() => handleClick(quiz.id)}
                  >
                    <TableCell className="underline-offset-2 group-hover:underline">
                      {quiz.id}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">MCQ</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {quiz.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">10</TableCell>
                    <TableCell className="">
                      <ScoreBadge questions={quiz.questions} />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={async (e) => {
                          e.stopPropagation();
                          setIsDeleting((prev) => [...prev, quiz.id]);
                          await deleteQuiz(quiz.id);
                          setIsDeleting((prev) =>
                            prev.filter((id) => id !== quiz.id)
                          );
                          setRevalidate((prev) => !prev);
                        }}
                        disabled={isDeleting.some((id) => id === quiz.id)}
                      >
                        {isDeleting.some((id) => id === quiz.id) ? (
                          <div role="status" className="mr-2">
                            <svg
                              aria-hidden="true"
                              className="size-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <Delete className="size-5" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-end">
        <GenerateQuiz triggerVariant={{ variant: "outline" }} />
      </div>
    </div>
  );
}

function ScoreBadge({
  questions,
}: {
  questions: (Pick<Question, "userAnswer" | "isCorrect"> & {
    [key: string]: any;
  })[];
}) {
  const isCorrected = !!questions[0].userAnswer;
  const total = questions.length;
  let nuCorrectQuestions = 0;
  let weight = 0;
  if (isCorrected) {
    nuCorrectQuestions = questions.reduce(
      (total, question) => (question.isCorrect ? total + 1 : total),
      0
    );
    weight = nuCorrectQuestions / total;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center text-primary-foreground whitespace-nowrap  rounded-full  px-2.5 py-0.5 text-xs font-semibold  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "bg-green-500": isCorrected && weight >= 0.8,
          "bg-yellow-500": isCorrected && weight >= 0.5 && weight < 0.8,
          "bg-red-500": isCorrected && weight < 0.5,
          "bg-muted text-muted-foreground": !isCorrected,
        }
      )}
    >
      {isCorrected ? `${nuCorrectQuestions} / ${total}` : "Not graded"}
    </div>
  );
}

function GenerateQuiz({
  triggerVariant,
}: {
  triggerVariant?: VariantProps<typeof buttonVariants>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const chapterId = searchParams.get("chapterId") || "";

  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
      <DialogTrigger asChild>
        <Button className="px-8" {...triggerVariant}>
          Generate new Quiz
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate new Quiz</DialogTitle>
          <DialogDescription>
            Generate a quiz based on your content using AI.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Number of questions
            </Label>
            <Input
              id="nuOfQuestions"
              defaultValue="10"
              type="number"
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Type of questions
            </Label>
            <Select defaultValue="mcq" disabled>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  <SelectItem value="mcq">MCQ</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {error && <Alert message={error} variant="destructive" />}
        {isLoading && (
          <p className="py-4 font-semibold pl-4">It may take some time.</p>
        )}
        <DialogFooter>
          <Button
            type="submit"
            className="px-8"
            onClick={async () => {
              setIsLoading(true);
              setError(null);
              const res = await generateQuiz(chapterId);
              if (!res || !res.success || !res.data)
                setError("Something went wrong!");
              else {
                setDialogOpen(false);
                const params = new URLSearchParams(searchParams);
                params.set("quizId", res.data.id);
                push(`${pathname}?${params.toString()}`);
              }
              setIsLoading(false);
            }}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
