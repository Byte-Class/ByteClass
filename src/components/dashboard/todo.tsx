"use client";
import { classroom_v1 } from "googleapis";
import { toast } from "react-toastify";

import { trpc } from "@/server/client";

import { Skeleton } from "../ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { intlFormatDistance } from "date-fns";

export default function ToDo() {
  const { data, isPending, isError } = trpc.todo.fetchTasksDue.useQuery(
    {
      n: 7,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  if (isPending) {
    return (
      <div className="flex min-h-96 flex-1 flex-col gap-2 rounded-sm bg-lightBlack p-4">
        <Skeleton className="h-8 w-[40%]" />

        <Skeleton className="ml-[5%] mt-2 h-4 w-[90%]" />
        <Skeleton className="ml-[7.5%] h-4 w-[85%]" />
        <Skeleton className="ml-[2.5%] h-4 w-[95%]" />
      </div>
    );
  }

  if (isError || !data) {
    return toast.error("Error while fetching assignments due soon");
  }

  return (
    <div className="min-h-96 flex-1 rounded-sm bg-lightBlack p-4">
      <h2 className="text-2xl font-bold">Tasks Due Soon</h2>

      <div className="mt-4 flex w-full flex-col items-center justify-center gap-4">
        {data.map((courseWork) => {
          return (
            <DisplayToDo key={crypto.randomUUID()} courseWork={courseWork} />
          );
        })}
      </div>
    </div>
  );
}

function DisplayToDo({
  courseWork,
}: {
  courseWork: classroom_v1.Schema$CourseWork;
}) {
  return (
    <div className="flex h-5 w-full items-center space-x-4 text-sm">
      <div className="mr-auto">
        <a
          href={courseWork.alternateLink ?? ""}
          target="_blank"
          className="underline"
        >
          {courseWork.title}
        </a>
      </div>
      <Separator orientation="vertical" className="bg-white" />
      <div className="w-[15%] text-right">
        {intlFormatDistance(
          new Date(
            courseWork.dueDate?.year!,
            courseWork.dueDate?.month! - 1,
            courseWork.dueDate?.day!,
          ),
          new Date(),
        )}
      </div>
    </div>
  );
}
