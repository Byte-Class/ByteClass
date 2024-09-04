"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { classroom_v1 } from "googleapis";
import { toast } from "react-toastify";
import { trpc } from "@/server/client";
import { useRouter } from "next/navigation";

export default function ClassPickerFilterItem({
  course,
}: {
  course: classroom_v1.Schema$Course;
}) {
  const router = useRouter();

  if (!course.id) {
    toast.error("Google man, why is the course id undefined");
    return;
  }

  const { mutate } = trpc.tasks.togglePin.useMutation({
    onError() {
      toast.error("Unable to toggle pin :(");
    },
    onSuccess() {
      router.refresh();
    },
  });

  const { data } = trpc.tasks.pinnedState.useQuery({
    courseId: course.id,
  });

  return (
    <DropdownMenuSub key={crypto.randomUUID()}>
      <DropdownMenuSubTrigger>
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

              mutate({ courseId: course.id, courseName: course.name });
            }}
          >
            <FontAwesomeIcon icon={faThumbTack} className="mr-2" />
            {data?.pinned ? "Unpin" : "Pin"}
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
