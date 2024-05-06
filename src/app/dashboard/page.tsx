import Courses from "@/components/dashboard/dashboard-courses";
import { RotateCw } from "lucide-react";
import React, { Suspense } from "react";

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoad />}>
      <Courses />
    </Suspense>
  );
}

function DashboardLoad() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <RotateCw className="size-10 animate-spin" />
    </div>
  );
}
