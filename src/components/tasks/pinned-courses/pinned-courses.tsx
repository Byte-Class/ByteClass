"use client";
import { toast } from "react-toastify";

import { trpc } from "@/server/client";
import PinnedCoursesItem from "./pinned-item";

import { ToggleGroup } from "@/components/ui/toggle-group";
import { Skeleton } from "@/components/ui/skeleton";

export default function PinnedCourses() {
  const { data, isPending, isError } = trpc.pinned.pinned.useQuery();

  if (isPending) {
    return (
      <div className="flex items-center justify-center gap-1">
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-9 w-14" />
        <Skeleton className="h-9 w-28" />
      </div>
    );
  }

  if (isError || !data) {
    return toast.error("Unable to fetch pinned classes");
  }

  return (
    <ToggleGroup type="multiple" defaultValue={data.map((pin) => pin.courseId)}>
      {data.map((pin) => {
        return <PinnedCoursesItem key={crypto.randomUUID()} course={pin} />;
      })}
    </ToggleGroup>
  );
}
