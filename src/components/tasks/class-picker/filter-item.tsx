"use client";

import { classroom_v1 } from "googleapis";
import { toast } from "react-toastify";

import { trpc } from "@/server/client";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faThumbTack } from "@fortawesome/free-solid-svg-icons";

export default function ClassPickerFilterItem({
  course,
}: {
  course: classroom_v1.Schema$Course;
}) {
  const utils = trpc.useUtils();

  if (!course.id) {
    toast.error("Google man, why is the course id undefined");
    return;
  }

  const togglePin = trpc.tasks.togglePin.useMutation({
    onError() {
      toast.error("Unable to toggle pin :(");
    },
    onSuccess() {
      utils.pinned.pinned.invalidate();
      utils.courses.activeCourses.invalidate();
    },
  });

  const toggleActiveCourse = trpc.tasks.toggleActiveClass.useMutation({
    onError() {
      toast.error("Unable to toggle course :(");
    },
    onSuccess() {
      utils.pinned.pinned.invalidate();
      utils.courses.activeCourses.invalidate();
    },
  });

  const pinnedState = trpc.tasks.pinnedState.useQuery({
    courseId: course.id,
  });

  const activeState = trpc.tasks.activeState.useQuery({
    courseId: course.id,
  });

  return (
    <DropdownMenuSub key={crypto.randomUUID()}>
      <DropdownMenuSubTrigger>
        {pinnedState.data?.pinned ? (
          <FontAwesomeIcon icon={faThumbTack} className="mr-2 text-blue-400" />
        ) : null}

        {activeState.data?.pinned ? (
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="mr-2 text-green-400"
          />
        ) : null}

        <span>{course.name}</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem
            onClick={() => {
              if (!course.id || !course.name) {
                toast.error("Google man, why is the course id undefined");
                return;
              }

              togglePin.mutate({
                courseId: course.id,
                courseName: course.name,
              });
            }}
          >
            <FontAwesomeIcon
              icon={faThumbTack}
              className="mr-2 text-blue-400"
            />
            {pinnedState.data?.pinned ? "Unpin" : "Pin"}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              if (!course.id || !course.name) {
                toast.error("Google man, why is the course id undefined");
                return;
              }

              toggleActiveCourse.mutate({
                courseId: course.id,
                courseName: course.name,
              });
            }}
          >
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="mr-2 text-green-400"
            />
            Toggle
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
