"use client";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { CourseList } from "@/core/types/interfaces";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface CourseDropDownFilter {
  id: string | null | undefined;
  name: string | null | undefined;
  index: number;
  checked: boolean;
}

export default function ClassPicker({ courses }: { courses: CourseList[] }) {
  const [showStatusBar, setShowStatusBar] = useState(false);
  const [courseChecked, setCourseChecked] = useState<CourseDropDownFilter[]>(
    courses.map((course, index) => {
      return {
        name: course.name,
        id: course.id,
        index,
        checked: false,
      };
    }),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">Filter Classes</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Classes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {courseChecked.map((course, index) => {
          return (
            <DropdownMenuCheckboxItem
              checked={courseChecked[index].checked}
              onCheckedChange={() => {
                setCourseChecked((prev) => {
                  const notItem = courseChecked.filter(
                    (course_2) => course_2.id !== course.id,
                  );

                  return [
                    {
                      name: course.name,
                      checked: !course.checked,
                      index,
                      id: course.id,
                    },
                    ...notItem,
                  ];
                });
              }}
              key={crypto.randomUUID()}
            >
              {course.name}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
