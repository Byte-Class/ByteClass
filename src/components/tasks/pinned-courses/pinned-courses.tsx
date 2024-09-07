"use client";
import { toast } from "react-toastify";

import { trpc } from "@/server/client";
import PinnedCoursesItem from "./pinned-item";

import { ToggleGroup } from "@/components/ui/toggle-group";
import { Skeleton } from "@/components/ui/skeleton";

export default function PinnedCourses() {
  const pinned = trpc.pinned.pinned.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const active = trpc.pinned.active.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  if (pinned.isPending || active.isPending) {
    return (
      <div className="flex items-center justify-center gap-1">
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-9 w-14" />
        <Skeleton className="h-9 w-28" />
      </div>
    );
  }

  if (pinned.isError || active.isError || !pinned.data || !active.data) {
    return toast.error("Unable to fetch pinned classes");
  }

  console.log(active.data.map((active) => active.courseId));

  return (
    <ToggleGroup
      type="multiple"
      defaultValue={active.data.map((active) => active.courseId)}
    >
      {pinned.data.map((pin) => {
        return <PinnedCoursesItem key={crypto.randomUUID()} course={pin} />;
      })}
    </ToggleGroup>
  );
}
