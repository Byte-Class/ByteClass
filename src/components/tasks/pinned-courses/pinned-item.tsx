"use client";

import { PinnedType } from "@/core/types/interfaces";

import { ToggleGroupItem } from "@/components/ui/toggle-group";

export default function PinnedCoursesItem({ course }: { course: PinnedType }) {
  console.log(course.courseId);

  return (
    <ToggleGroupItem
      variant={"outline"}
      value={course.courseId ?? ""}
      aria-label="Toggle Calculus"
      defaultChecked={course.isPinned}
    >
      {course.courseName}
    </ToggleGroupItem>
  );
}
