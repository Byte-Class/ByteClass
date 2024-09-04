import { PinnedType } from "@/core/types/interfaces";

import { ToggleGroupItem } from "@/components/ui/toggle-group";

export default function PinnedCoursesItem({ course }: { course: PinnedType }) {
  return (
    <ToggleGroupItem
      variant={"outline"}
      value="calculus"
      aria-label="Toggle Calculus"
    >
      {course.courseName}
    </ToggleGroupItem>
  );
}
