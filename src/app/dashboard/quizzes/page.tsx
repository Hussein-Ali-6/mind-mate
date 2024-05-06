import MainLoad from "@/components/main-load";
import React, { Suspense } from "react";

function QuizzesPage() {
  return (
    <Suspense fallback={<MainLoad />}>
      <div className="container py-6">Quiz</div>
    </Suspense>
  );
}

export default QuizzesPage;
