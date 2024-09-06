"use client";

import { auth } from "auth";
import { classroom_v1, google } from "googleapis";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { PropsSectionTasks } from "@/core/types/interfaces";
import Line from "@/components/line";
import { determineBadges } from "@/core/utils/determine-badges";
import { cn } from "@/core/lib/utils";
import { trpc } from "@/server/client";

export default function HandedInSection() {
  const queryActiveCourses = trpc.courses.activeCourses.useQuery();

  const activeCourses = queryActiveCourses.data?.map(
    (course) => course.courseId,
  );

  const { data } = trpc.courses.handedInWorks.useQuery(
    {
      courseIds: activeCourses as string[],
    },
    {
      enabled: !!activeCourses,
    },
  );

  if (!data) {
    return;
  }

  return (
    <div className="mb-12 mt-12">
      <div className="flex w-full justify-between">
        <h3 className="text-4xl font-bold">Handed In</h3>
        <h3 className="text-4xl font-bold">{data.length}</h3>
      </div>

      <Line className="mb-2 ml-0 mr-0 mt-2 w-full" />

      {data.map(async (item: classroom_v1.Schema$StudentSubmission) => {
        const courseId = item.courseId ?? "";
        const id = item.courseWorkId ?? "";

        return (
          <ShowSectionTask
            courseId={courseId}
            id={id}
            key={crypto.randomUUID()}
          />
        );
      })}
    </div>
  );
}
function ShowSectionTask({ courseId, id }: { courseId: string; id: string }) {
  const { data, isPending } = trpc.courses.fetchCourseWork.useQuery({
    courseId,
    id,
  });

  if (isPending) {
    return <h2>Loading...</h2>;
  }

  // const badgesToDisplay = determineBadges({
  //   state: item.state,
  //   late: item.late,
  //   dueDate: courseWork.dueDate,
  // });

  return (
    // h-1 == height: 0.25rem, this is due to h-full not working. Here is stack overflow post https://stackoverflow.com/questions/8468066/child-inside-parent-with-min-height-100-not-inheriting-height
    // <div className="mb-3 mt-3 flex h-1 min-h-40 justify-between rounded-lg bg-lightBlack p-4">
    //   <div className="flex h-full w-11/12 flex-col justify-between gap-4">
    //     <div className="w-full">
    //       <h4 className="text-2xl font-bold">{courseWork.title}</h4>
    //       <p className="text-neutral-400">{courseWork.description}</p>
    //     </div>
    //     <div className="flex items-center gap-4">
    //       <Image
    //         src={"/logos/classroom.svg"}
    //         alt="Google Classroom Image"
    //         width={50}
    //         height={50}
    //       />

    //       <a
    //         href={courseWork.alternateLink!}
    //         target="_blank"
    //         className="text-white underline"
    //       >
    //         See In Google Classroom
    //       </a>
    //     </div>
    //   </div>

    //   <div className="flex h-full w-1/12 flex-col items-center justify-center gap-3">
    //     {badgesToDisplay.map((badge) => (
    //       <Badge
    //         className={cn(badge.bgColour, badge.textColour)}
    //         key={crypto.randomUUID()}
    //       >
    //         {badge.badge}
    //       </Badge>
    //     ))}
    //   </div>
    // </div>
    <h2>e</h2>
  );
}
