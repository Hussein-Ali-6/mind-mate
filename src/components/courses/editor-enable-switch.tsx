"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { useCourseContent } from "./course-provider";

export default function EditorEnableSwitch() {
  const { setEnableEditor } = useCourseContent();
  return <Switch onCheckedChange={() => setEnableEditor((prev) => !prev)} />;
}
