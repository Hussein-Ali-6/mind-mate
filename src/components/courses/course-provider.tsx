"use client";

import { Chapter, Course } from "@prisma/client";
import { createContext, useContext, useState } from "react";

type CourseContentT = {
  data:
    | Chapter
    | (Course & { chapters: Pick<Chapter, "id" | "title">[] })
    | null;
  type?: "course" | "chapter";
  setEnableEditor: React.Dispatch<React.SetStateAction<boolean>>;
  enableEditor: boolean;
  isSaving: boolean;
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
  newData: {
    isNew: boolean;
    data: {} | null;
  };
  setNewData: React.Dispatch<
    React.SetStateAction<{
      isNew: boolean;
      data: {} | null;
    }>
  >;
};
const CourseContext = createContext<CourseContentT>({} as CourseContentT);

type Props = {
  data:
    | Chapter
    | (Course & { chapters: Pick<Chapter, "id" | "title">[] })
    | null;
  children: React.ReactNode;
  type: "course" | "chapter";
};

export default function CourseProvider({ data, children, type }: Props) {
  const [enableEditor, setEnableEditor] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newData, setNewData] = useState<{ isNew: boolean; data: {} | null }>({
    isNew: false,
    data: null,
  });
  return (
    <CourseContext.Provider
      value={{
        data,
        type,
        enableEditor,
        setEnableEditor,
        isSaving,
        setIsSaving,
        newData,
        setNewData,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourseContent() {
  return useContext(CourseContext);
}
