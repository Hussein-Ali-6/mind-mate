"use client";

import { Button } from "../ui/button";
import { useCourseContent } from "./course-provider";

export default function SaveButton() {
  const { newData, setNewData, setIsSaving, type, data, isSaving } =
    useCourseContent();

  async function handleSave() {
    setIsSaving(true);
    if (type === "chapter" && newData.isNew) {
      await fetch(`/api/chapter/${data?.id}`, {
        method: "POST",
        body: JSON.stringify({ editorData: newData?.data }),
      });
      setNewData((prev) => ({ ...prev, isNew: false }));
    }
    setIsSaving(false);
  }

  return (
    <Button
      size="md"
      variant="outline"
      className="min-w-[120px]"
      onClick={handleSave}
      disabled={!newData.isNew || isSaving}
    >
      {isSaving ? "Saving..." : "Save"}
    </Button>
  );
}
