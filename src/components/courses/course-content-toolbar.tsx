import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Bot, Pencil } from "lucide-react";
import EditorEnableSwitch from "./editor-enable-switch";
import SaveButton from "./save-button";
import ToolbarQuizTool from "./toolbar-quiz-tool";
import ToolbarContent from "./toolbar-content";

export default function CourseContentToolbar() {
  return (
    <div className="py-2 flex justify-between gap-2 border-b mb-4 sticky top-0 bg-background z-10">
      <SaveButton />
      <div className="flex justify-end gap-2">
        <ToolbarQuizTool />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Bot className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Ask AI</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 border border-input bg-background rounded-md px-2">
                <Pencil className="size-5" />
                <EditorEnableSwitch />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <span>Enable Edit</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ToolbarContent />
      </div>
    </div>
  );
}
