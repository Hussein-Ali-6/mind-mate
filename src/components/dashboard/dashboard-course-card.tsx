import { Book } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Course } from "@prisma/client";

type Props = {
  data: Course & { _count: { chapters: number } };
};

export default function CourseCard({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <Book size={40} />
      </CardHeader>
      <CardContent>
        <Button variant="link" className="underline-offset-2 p-0" asChild>
          <Link href={`/courses/${data.id}`}>
            <h4 className="font-semibold text-lg md:text-xl text-primary">
              {data.title}
            </h4>
          </Link>
        </Button>
        <div className="flex justify-between mt-2 items-center text-muted-foreground text-xs">
          <span>{data._count.chapters} Chapters</span>
          <span className="italic">{data.createdAt.toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
