"use client";
import { toast } from "react-toastify";

import { trpc } from "@/server/client";
import PinnedCoursesItem from "./pinned-item";

import { ToggleGroup } from "@/components/ui/toggle-group";

export default function PinnedCourses() {
  const { data, isPending, isError } = trpc.courses.pinned.useQuery();

  if (isPending) {
    return <h2>Loading...</h2>;
  }

  if (isError || !data) {
    return toast.error("Unable to fetch pinned classes");
  }

  return (
    <ToggleGroup type="multiple">
      {data.map((pin) => {
        return <PinnedCoursesItem key={crypto.randomUUID()} course={pin} />;
      })}
    </ToggleGroup>
  );
}
