import type { Metadata } from "next";

import ClassPicker from "@/components/tasks/class-picker/class-picker";
import PinnedCourses from "@/components/tasks/pinned-courses/pinned-courses";
import SectionTasksWrapper from "@/components/tasks/section-tasks/section-wrapper";

export const metadata: Metadata = {
  title: "Tasks | Byte Class",
};

export default async function Tasks() {
  return (
    <div className="w-full">
      <h2 className="text-5xl font-bold">Your Tasks</h2>

      <div className="mt-4 flex w-full gap-4">
        <ClassPicker />

        <PinnedCourses />
      </div>

      <div className="ml-auto mr-auto mt-4 h-[40rem] w-11/12 overflow-y-scroll">
        <SectionTasksWrapper />
      </div>
    </div>
  );
}
