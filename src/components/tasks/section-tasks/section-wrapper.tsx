"use client";
import { trpc } from "@/server/client";

import OverdueSection from "./overdue-section";
import ReturnedSection from "./returned-section";
import HandedInSection from "./handed-in-section";

export default function SectionTasksWrapper() {
  const { data, isPending } = trpc.courses.activeCourses.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  if (isPending) {
    return <h2>LOADING ALL</h2>;
  }

  if (!data) {
    return <h2>Unknown error while fetching courses</h2>;
  }

  const activeCourses = data.map((course) => course.courseId) ?? [];

  return (
    <>
      <OverdueSection activeCourses={activeCourses} />
      <ReturnedSection activeCourses={activeCourses} />
      <HandedInSection activeCourses={activeCourses} />
    </>
  );
}
