import { cn } from "@/lib/utils";
import { RotateCw } from "lucide-react";

export default function MainLoad({ className }: { className?: string }) {
  return (
    <div
      className={cn("py-4 w-full flex items-center justify-center", className)}
    >
      <RotateCw className="size-10 animate-spin" />
    </div>
  );
}
